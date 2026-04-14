<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const perModuleAuth = `// Per-module auth: restrict access at the module level
// src/live/admin.ts
${"import"} { live, LiveError } from 'svelte-realtime/server';

// Module-level auth guard
export const auth = (ctx) => {
  if (!ctx.user) throw new LiveError('UNAUTHORIZED', 'Login required');
  if (ctx.user.role !== 'admin') throw new LiveError('FORBIDDEN', 'Admin only');
};

// All functions in this module require admin access
export const getUsers = live(async (ctx) => {
  // auth() already ran — ctx.user is guaranteed to be an admin
  return db.users.all();
});

export const deleteUser = live(async (ctx, userId) => {
  await db.users.delete(userId);
  ctx.publish('admin:users', 'deleted', { id: userId });
});`;

	const dynamicTopics = `// Dynamic topics: parameterized subscriptions
// src/live/chat.ts

// Topic is a function of the arguments
export const messages = live.stream(
  (ctx, roomId) => 'chat:' + roomId,  // dynamic topic
  async (ctx, roomId) => {
    return db.messages.forRoom(roomId);
  },
  { merge: 'crud', key: 'id', prepend: true }
);

// Client subscribes to a specific room:
// <script>
//   import { messages } from '$live/chat';
//   const msgs = messages(data.roomId);
// </script>
//
// Each roomId creates a separate subscription
// with its own initial data and live events.`;

	const channels = `// Channels: namespace related topics
// src/live/game.ts
${"import"} { live } from 'svelte-realtime/server';

// All topics under 'game:lobby:*' share a namespace
export const lobbyPresence = live.stream(
  (ctx, lobbyId) => \`game:lobby:\${lobbyId}:presence\`,
  async (ctx, lobbyId) => [],
  { merge: 'presence' }
);

export const lobbyChat = live.stream(
  (ctx, lobbyId) => \`game:lobby:\${lobbyId}:chat\`,
  async (ctx, lobbyId) => db.chat.forLobby(lobbyId),
  { merge: 'crud', key: 'id' }
);

// Server-side: ctx.publish targets specific channels
export const sendLobbyMessage = live(async (ctx, lobbyId, text) => {
  const msg = await db.chat.insert({ lobbyId, userId: ctx.user.id, text });
  ctx.publish(\`game:lobby:\${lobbyId}:chat\`, 'created', msg);
  return msg;
});`;

	const accessControl = `// Access control on streams
export const privateNotes = live.stream(
  'notes',
  async (ctx) => db.notes.forUser(ctx.user.id),
  {
    merge: 'crud',
    key: 'id',
    // access: filter which events each subscriber receives
    access: (ctx, event, data) => {
      // Only receive events for own notes
      return data.userId === ctx.user.id;
    }
  }
);

// Without access control: all subscribers see all events
// With access control: each subscriber sees only their data
// The filter runs server-side — unauthorized data never reaches the client`;

	const schemaValidation = `// Schema validation with Valibot
${"import"} { live } from 'svelte-realtime/server';
${"import"} * as v from 'valibot';

const MessageSchema = v.object({
  text: v.pipe(v.string(), v.minLength(1), v.maxLength(500)),
  roomId: v.string()
});

export const sendMessage = live(async (ctx, input) => {
  // Validate input against schema
  const { text, roomId } = v.parse(MessageSchema, input);
  // ... rest of the function
}, { schema: MessageSchema });`;

	const fullCode =
		"<script lang=\"ts\">\n  // Auth & channels\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.5 — Auth & Channels</h1></section>";
</script>

<section class="page">
	<h1>RT.5 — Auth & Channels</h1>
	<p class="concept">
		<strong>Concept.</strong> Authentication happens at two levels: connection-level in <code>hooks.ws.ts</code>
		(who can connect?) and module-level via <code>auth</code> exports (who can call this function?).
		Dynamic topics parameterize subscriptions by room, user, or entity ID. Channels namespace related
		topics. Access control filters which pub/sub events each subscriber receives — unauthorized data
		never leaves the server.
	</p>

	<div class="build">
		<h3 class="section-title">Per-module auth</h3>
		<pre class="code-block"><code>{perModuleAuth}</code></pre>

		<h3 class="section-title">Dynamic topics</h3>
		<pre class="code-block"><code>{dynamicTopics}</code></pre>

		<h3 class="section-title">Channels (topic namespacing)</h3>
		<pre class="code-block"><code>{channels}</code></pre>

		<h3 class="section-title">Access control</h3>
		<pre class="code-block"><code>{accessControl}</code></pre>

		<h3 class="section-title">Schema validation</h3>
		<pre class="code-block"><code>{schemaValidation}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Skip the <code>auth</code> export in a module with sensitive functions.</strong> Any connected user can call any function in that module. Connection-level auth (in <code>upgrade</code>) only guarantees the user is authenticated — it doesn't check roles or permissions.</li>
		<li><strong>Use a string literal instead of a function for a dynamic topic.</strong> All subscribers share the same topic regardless of the argument. Room A and Room B see each other's messages. The topic function must include the parameter to create isolated subscriptions.</li>
		<li><strong>Omit the <code>access</code> filter on a multi-user stream.</strong> All subscribers receive all events. User A sees User B's private notes. The <code>access</code> filter is the server-side gate — without it, pub/sub is broadcast-to-all.</li>
		<li><strong>Send an invalid payload without schema validation.</strong> The server function receives raw, unvalidated input. A malicious client can send any shape of data. Schema validation with Valibot rejects bad input before the function body runs.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Security in svelte-realtime is layered: connection auth (who connects), module auth (who calls), access control (who sees what), and schema validation (what's valid input). Dynamic topics isolate subscriptions by parameter — <code>'chat:' + roomId</code> means each room is an independent pub/sub channel. The <code>access</code> filter runs server-side on every event before delivery, ensuring unauthorized data never reaches the client.</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-6-rooms-signals">RT.6 — Rooms & Signals</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
