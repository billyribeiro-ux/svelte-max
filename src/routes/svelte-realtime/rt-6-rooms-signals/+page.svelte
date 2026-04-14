<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const roomsCode = `// Rooms: high-level multiplayer abstraction
// src/live/room.ts
${"import"} { live } from 'svelte-realtime/server';

export const room = live.room('game', {
  // Room lifecycle
  async onCreate(ctx, roomId, options) {
    return { players: [], state: 'waiting', maxPlayers: options.max || 4 };
  },

  async onJoin(ctx, roomId, roomState) {
    if (roomState.players.length >= roomState.maxPlayers) {
      throw new LiveError('FULL', 'Room is full');
    }
    roomState.players.push({ id: ctx.user.id, name: ctx.user.name });
    return roomState;
  },

  async onLeave(ctx, roomId, roomState) {
    roomState.players = roomState.players.filter(p => p.id !== ctx.user.id);
    if (roomState.players.length === 0) return null; // destroy room
    return roomState;
  },

  async onMessage(ctx, roomId, roomState, type, data) {
    // Handle custom room messages
    if (type === 'move') {
      // Apply game logic
      return roomState; // updated state broadcast to all members
    }
  }
});`;

	const roomClient = `<!-- Using rooms in a component -->
<script>
  ${"import"} { room } from '$live/room';

  // Room hooks shortcut
  const { state, members, send, leave } = room.join(data.roomId, {
    max: 4
  });

  // $state — reactive room state (updated on every onMessage return)
  // $members — reactive member list (updated on join/leave)
  // send(type, data) — send a message to the room
  // leave() — leave the room
<\/script>

<h2>Players ({$members.length})</h2>
{#each $members as player (player.id)}
  <span>{player.name}</span>
{/each}

<button onclick={() => send('move', { x: 1, y: 0 })}>
  Move Right
</button>
<button onclick={leave}>Leave Room</button>`;

	const signalsCode = `// Signals: send events to specific users
// Unlike publish (broadcast to topic), signal targets one user

export const notifyUser = live(async (ctx, targetUserId, message) => {
  ctx.signal(targetUserId, 'notification', {
    from: ctx.user.name,
    text: message,
    timestamp: Date.now()
  });
});

// Client: listen for signals
${"import"} { onSignal } from 'svelte-realtime/client';

onSignal('notification', (data) => {
  showToast(data.from + ': ' + data.text);
});

// Signals are point-to-point — only the target user receives them
// Use cases: DMs, friend requests, game invitations, typing indicators`;

	const webhooksCode = `// Webhooks: HTTP endpoints for external integrations
// src/live/webhooks.ts
${"import"} { live } from 'svelte-realtime/server';

export const webhook = live.webhook('/api/webhooks/stripe', async (ctx, payload) => {
  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(
    payload.body,
    payload.headers['stripe-signature'],
    WEBHOOK_SECRET
  );

  if (event.type === 'payment_intent.succeeded') {
    const order = await db.orders.updateStatus(event.data.object.id, 'paid');
    // Broadcast to the user's dashboard
    ctx.signal(order.userId, 'order:updated', order);
  }
});`;

	const fullCode =
		"<script lang=\"ts\">\n  // Rooms & signals\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.6 — Rooms & Signals</h1></section>";
</script>

<section class="page">
	<h1>RT.6 — Rooms & Signals</h1>
	<p class="concept">
		<strong>Concept.</strong> Rooms provide a high-level multiplayer abstraction with lifecycle hooks
		(<code>onCreate</code>, <code>onJoin</code>, <code>onLeave</code>, <code>onMessage</code>).
		Room state is shared among all members and updates automatically. Signals are point-to-point messages
		targeting a specific user — unlike <code>publish</code> which broadcasts to a topic. Webhooks
		bridge external HTTP events into the realtime system.
	</p>

	<div class="build">
		<h3 class="section-title">Room definition</h3>
		<pre class="code-block"><code>{roomsCode}</code></pre>

		<h3 class="section-title">Room client</h3>
		<pre class="code-block"><code>{roomClient}</code></pre>

		<h3 class="section-title">Signals (user-to-user)</h3>
		<pre class="code-block"><code>{signalsCode}</code></pre>

		<h3 class="section-title">Webhooks (HTTP → WebSocket)</h3>
		<pre class="code-block"><code>{webhooksCode}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Return <code>null</code> from <code>onLeave</code> while other members are still in the room.</strong> Returning <code>null</code> destroys the room — all remaining members are disconnected. Only return <code>null</code> when the room is empty or you intentionally want to force-close it.</li>
		<li><strong>Send a signal to a user who is not connected.</strong> The signal is silently dropped. There's no delivery confirmation or retry. For reliable delivery, use a database-backed notification queue and check on next connection.</li>
		<li><strong>Mutate room state in <code>onMessage</code> without returning it.</strong> The mutation is lost. <code>onMessage</code> must return the new state to trigger a broadcast to all room members. Returning <code>undefined</code> means "no state change."</li>
		<li><strong>Use <code>ctx.publish()</code> inside a room handler instead of returning state.</strong> It works, but bypasses the room's state management. Room members receive the event but the room's canonical state isn't updated. Other members who join later won't see the change.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Rooms are a higher-level abstraction than raw streams. Instead of managing topics and merge strategies manually, you define lifecycle hooks and the room system handles membership, state broadcasting, and cleanup. The client-side <code>room.join()</code> returns reactive stores (<code>$state</code>, <code>$members</code>) and action functions (<code>send</code>, <code>leave</code>) — a complete multiplayer API in one call.</p>
	<p class="prose">Signals fill the gap between broadcast (everyone sees it) and nothing (no one sees it). They deliver events to a specific user across any device or tab, making them ideal for notifications, DMs, and invitations. Webhooks bridge HTTP to WebSocket — external services (Stripe, GitHub) POST to your endpoint, and you route the event into the realtime system via <code>ctx.signal()</code> or <code>ctx.publish()</code>.</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-7-derived-effects">RT.7 — Derived Streams & Effects</a></p>
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
