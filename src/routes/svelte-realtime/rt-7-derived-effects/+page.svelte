<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const derivedStream = `// Derived streams: server-side computed streams
// src/live/dashboard.ts
${"import"} { live } from 'svelte-realtime/server';

// A derived stream recomputes when its source streams change
export const orderStats = live.derived(
  ['orders'],  // source topics
  async (ctx, orders) => {
    // Recomputes whenever 'orders' topic receives an event
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      revenue: orders.reduce((sum, o) => sum + o.total, 0)
    };
  },
  { merge: 'set' }
);

// Dynamic derived streams: topic depends on arguments
export const userActivity = live.derived(
  (ctx, userId) => ['orders:' + userId, 'messages:' + userId],
  async (ctx, userId, orders, messages) => {
    return {
      orderCount: orders.length,
      messageCount: messages.length,
      lastActive: Math.max(
        orders[0]?.createdAt || 0,
        messages[0]?.createdAt || 0
      )
    };
  },
  { merge: 'set' }
);`;

	const effectsCode = `// Effects: server-side reactions to stream events
// src/live/effects.ts
${"import"} { live } from 'svelte-realtime/server';

// Effects run on the server when a topic receives an event
export const orderNotification = live.effect('orders', async (ctx, event, data) => {
  if (event === 'created') {
    // Send push notification
    await pushService.send(data.userId, {
      title: 'New order',
      body: 'Order #' + data.id + ' placed'
    });

    // Update stats
    ctx.publish('stats', 'set', await computeStats());

    // Signal the assigned staff member
    ctx.signal(data.assignedTo, 'order:new', data);
  }
});

// Effects are fire-and-forget — they don't return data to subscribers
// They run after the event is published, not before
// Use for: notifications, side effects, cross-stream updates`;

	const aggregatesCode = `// Aggregates: maintain running server-side state
// src/live/stats.ts
${"import"} { live } from 'svelte-realtime/server';

export const liveStats = live.aggregate('orders', {
  // Initial state
  init: () => ({ count: 0, revenue: 0, avgOrder: 0 }),

  // Reduce each event into state
  reduce: (state, event, data) => {
    if (event === 'created') {
      state.count++;
      state.revenue += data.total;
      state.avgOrder = state.revenue / state.count;
    }
    if (event === 'deleted') {
      state.count--;
      state.revenue -= data.total;
      state.avgOrder = state.count > 0 ? state.revenue / state.count : 0;
    }
    return state;
  }
});

// Client:
// import { liveStats } from '$live/stats';
// $liveStats → { count: 42, revenue: 12500, avgOrder: 297.62 }`;

	const gatesAndPipes = `// Gates: conditional event forwarding
export const premiumGate = live.gate('content', (ctx, event, data) => {
  // Only forward to premium subscribers
  return ctx.user.plan === 'premium';
});

// Pipes: transform events between topics
export const pricePipe = live.pipe(
  'raw-prices',      // source topic
  'display-prices',  // target topic
  (event, data) => ({
    ...data,
    displayPrice: formatCurrency(data.price),
    change: data.price > data.previousPrice ? 'up' : 'down'
  })
);`;

	const fullCode =
		"<script lang=\"ts\">\n  // Derived streams & effects\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.7 — Derived Streams & Effects</h1></section>";
</script>

<section class="page">
	<h1>RT.7 — Derived Streams & Effects</h1>
	<p class="concept">
		<strong>Concept.</strong> Derived streams recompute server-side when source streams change —
		like <code>$derived()</code> but for realtime data. Effects are server-side reactions to events
		(notifications, cross-stream updates). Aggregates maintain running state with a reducer pattern.
		Gates filter events conditionally, and pipes transform events between topics. Together, these
		primitives build reactive server-side data pipelines.
	</p>

	<div class="build">
		<h3 class="section-title">Derived streams</h3>
		<pre class="code-block"><code>{derivedStream}</code></pre>

		<h3 class="section-title">Effects (server-side reactions)</h3>
		<pre class="code-block"><code>{effectsCode}</code></pre>

		<h3 class="section-title">Aggregates (running state)</h3>
		<pre class="code-block"><code>{aggregatesCode}</code></pre>

		<h3 class="section-title">Gates & pipes</h3>
		<pre class="code-block"><code>{gatesAndPipes}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Create a circular derived stream (A derives from B, B derives from A).</strong> Infinite loop. Each update triggers the other, which triggers the first again. The server detects cycles at registration time and throws a configuration error.</li>
		<li><strong>Throw an error inside an effect.</strong> Effects are fire-and-forget. The error is logged but doesn't propagate to the publisher or subscribers. The event that triggered the effect is already delivered. Use try/catch inside effects for graceful degradation.</li>
		<li><strong>Mutate the aggregate state without returning it.</strong> The <code>reduce</code> function must return the new state. If you mutate in-place without returning, the aggregate keeps the old reference and subscribers see no change.</li>
		<li><strong>Use a pipe to transform events between the same source and target topic.</strong> This creates a feedback loop — the transformed event triggers the pipe again. The pipe detects same-topic routing and throws a configuration error.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Server-side reactive primitives mirror client-side patterns: derived streams are <code>$derived()</code> for realtime data, effects are <code>$effect()</code> for side effects, and aggregates are reducers that maintain running state. Gates and pipes add conditional routing and transformation. This creates a reactive data pipeline on the server — events flow through gates, pipes, effects, and derived computations, all triggered by a single <code>ctx.publish()</code> call.</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-8-scaling-production">RT.8 — Scaling & Production</a></p>
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
