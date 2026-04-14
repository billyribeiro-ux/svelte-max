<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let activeTab = $state<'server' | 'client' | 'hooks'>('server');

	const serverCode = `// src/live/chat.ts — Complete chat module
${"import"} { live, LiveError } from 'svelte-realtime/server';
${"import"} { db } from '$lib/server/db';

// Auth guard for this module
export const auth = (ctx) => {
  if (!ctx.user) throw new LiveError('UNAUTHORIZED', 'Login required');
};

// Messages stream with CRUD merge
export const messages = live.stream(
  (ctx, roomId) => 'chat:' + roomId,
  async (ctx, roomId) => db.messages.forRoom(roomId, { limit: 50 }),
  { merge: 'crud', key: 'id', prepend: true, max: 200 }
);

// Presence tracking
export const presence = live.stream(
  (ctx, roomId) => 'chat:' + roomId + ':presence',
  async (ctx, roomId) => [],
  { merge: 'presence' }
);

// Typing indicator
export const typing = live.stream(
  (ctx, roomId) => 'chat:' + roomId + ':typing',
  async () => [],
  { merge: 'cursor' }
);

// RPC: send message
export const sendMessage = live(async (ctx, roomId, text) => {
  if (!text.trim()) throw new LiveError('VALIDATION', 'Message required');
  const msg = await db.messages.insert({
    roomId, userId: ctx.user.id, userName: ctx.user.name, text: text.trim()
  });
  ctx.publish('chat:' + roomId, 'created', msg);
  return msg;
}, { rateLimit: { max: 20, window: '1m' } });

// RPC: join/leave room
export const joinRoom = live(async (ctx, roomId) => {
  ctx.publish('chat:' + roomId + ':presence', 'join', {
    key: ctx.user.id, name: ctx.user.name
  });
});

export const leaveRoom = live(async (ctx, roomId) => {
  ctx.publish('chat:' + roomId + ':presence', 'leave', { key: ctx.user.id });
  ctx.publish('chat:' + roomId + ':typing', 'remove', { key: ctx.user.id });
});

// RPC: typing indicator
export const setTyping = live(async (ctx, roomId, isTyping) => {
  const event = isTyping ? 'update' : 'remove';
  ctx.throttle('chat:' + roomId + ':typing', event, {
    key: ctx.user.id, name: ctx.user.name
  }, 500);
});`;

	const clientCode = `<!-- src/routes/chat/[roomId]/+page.svelte -->
<script lang="ts">
  ${"import"} {
    messages, presence, typing,
    sendMessage, joinRoom, leaveRoom, setTyping
  } from '$live/chat';
  ${"import"} { onMount } from 'svelte';
  ${"import"} { page } from '$app/stores';

  const roomId = $derived($page.params.roomId);
  const msgs = messages(roomId);
  const users = presence(roomId);
  const typers = typing(roomId);

  let text = $state('');
  let sending = $state(false);

  onMount(() => {
    joinRoom(roomId);
    return () => leaveRoom(roomId);
  });

  async function send() {
    if (!text.trim() || sending) return;
    sending = true;
    try {
      await sendMessage(roomId, text);
      text = '';
    } finally {
      sending = false;
    }
  }
<\/script>

<aside class="sidebar">
  <h3>Online ({$users?.length ?? 0})</h3>
  {#each $users ?? [] as user (user.key)}
    <span class="user">{user.name}</span>
  {/each}
</aside>

<main class="chat">
  {#if $msgs === undefined}
    <p>Loading...</p>
  {:else}
    {#each $msgs as msg (msg.id)}
      <div class="message">
        <strong>{msg.userName}</strong>
        <p>{msg.text}</p>
      </div>
    {/each}
  {/if}

  {#if $typers?.length}
    <p class="typing">
      {$typers.map(t => t.name).join(', ')}
      {$typers.length === 1 ? 'is' : 'are'} typing...
    </p>
  {/if}

  <form onsubmit|preventDefault={send}>
    <input
      bind:value={text}
      oninput={() => setTyping(roomId, text.length > 0)}
      placeholder="Type a message..."
    />
    <button disabled={sending}>Send</button>
  </form>
</main>`;

	const hooksCode = `// src/hooks.ws.ts
export { message } from 'svelte-realtime/server';

export function upgrade({ cookies }) {
  const session = validateSession(cookies.get('session_id'));
  if (!session) return false;
  return { id: session.userId, name: session.name };
}

// src/hooks.server.ts
export async function handle({ event, resolve }) {
  const session = await getSession(event.cookies.get('session_id'));
  event.locals.user = session?.user ?? null;
  return resolve(event);
}`;

	const fullCode =
		"// svelte-realtime project: realtime chat with presence + typing";
</script>

<section class="page">
	<h1>svelte-realtime — Module Project</h1>
	<p class="concept">
		<strong>Module project.</strong> A complete realtime chat application with message streaming,
		online presence tracking, typing indicators, rate limiting, and optimistic sends. Demonstrates
		<code>live()</code> for RPC, <code>live.stream()</code> with three merge strategies
		(<code>crud</code>, <code>presence</code>, <code>cursor</code>), dynamic topics per room,
		and <code>ctx.throttle()</code> for typing debounce. OKLCH personality <code>oklch(58% 0.22 160)</code>
		(emerald green).
	</p>

	<div class="tab-bar">
		<button class:active={activeTab === 'server'} onclick={() => activeTab = 'server'}>Server</button>
		<button class:active={activeTab === 'client'} onclick={() => activeTab = 'client'}>Client</button>
		<button class:active={activeTab === 'hooks'} onclick={() => activeTab = 'hooks'}>Hooks</button>
	</div>

	<div class="project-build">
		{#if activeTab === 'server'}
			<h3 class="section-title">src/live/chat.ts</h3>
			<pre class="code-block"><code>{serverCode}</code></pre>
		{:else if activeTab === 'client'}
			<h3 class="section-title">Chat page component</h3>
			<pre class="code-block"><code>{clientCode}</code></pre>
		{:else}
			<h3 class="section-title">WebSocket & server hooks</h3>
			<pre class="code-block"><code>{hooksCode}</code></pre>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="project" code={fullCode} />
	</details>

	<h2>What this project proves</h2>
	<p class="prose">This chat application uses every core svelte-realtime feature: <code>live()</code> for sending messages and managing presence, <code>live.stream()</code> with <code>crud</code> for messages, <code>presence</code> for online users, and <code>cursor</code> for typing indicators. Dynamic topics (<code>'chat:' + roomId</code>) isolate rooms. Rate limiting prevents spam. Throttled typing indicators reduce network traffic. The entire server module is 50 lines — the library handles serialization, routing, reconnection, and merge logic.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.tab-bar { display: flex; gap: var(--space-xs); & button { padding: var(--space-xs) var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm); cursor: pointer; color: var(--color-text-muted); &.active { background: var(--color-surface-2); color: var(--color-text); border-color: var(--color-brand); } } }
	.project-build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; max-block-size: 500px; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
