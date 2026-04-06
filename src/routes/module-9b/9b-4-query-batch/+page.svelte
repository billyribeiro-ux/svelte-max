<script lang="ts">
	const problemCode = `// Without batching: 4 widgets = 4 HTTP requests
// Widget 1: getStats('revenue')   → HTTP POST
// Widget 2: getStats('users')     → HTTP POST
// Widget 3: getStats('orders')    → HTTP POST
// Widget 4: getStats('inventory') → HTTP POST
// Total: 4 round trips!`;

	const batchCode = `// stats.remote.ts
import { query } from '$app/server';

// query.batch() coalesces multiple calls into one request
export const getStats = query.batch(async (keys: string[]) => {
  // 'keys' is an array of all arguments from all callers
  // e.g., ['revenue', 'users', 'orders', 'inventory']
  const results = await db.stats.getMany(keys);

  // Return a resolver function
  return (key: string) => results.get(key);
});`;

	const usageBatchCode = `\u003cscript lang="ts"\u003e
  // Each widget calls getStats independently
  import { getStats } from './stats.remote';
\u003c/script\u003e

<!-- These 4 calls become 1 HTTP request -->
<Widget title="Revenue" data={getStats('revenue')} />
<Widget title="Users"   data={getStats('users')} />
<Widget title="Orders"  data={getStats('orders')} />
<Widget title="Stock"   data={getStats('inventory')} />`;

	type WidgetData = {
		label: string;
		value: string;
		trend: string;
		trendUp: boolean;
	};

	const widgetConfigs: WidgetData[] = [
		{ label: 'Revenue', value: '$48,290', trend: '+12.5%', trendUp: true },
		{ label: 'Users', value: '3,847', trend: '+8.2%', trendUp: true },
		{ label: 'Orders', value: '1,204', trend: '-2.1%', trendUp: false },
		{ label: 'Inventory', value: '15,603', trend: '+0.8%', trendUp: true },
	];

	let loading = $state(true);
	let widgets = $state<WidgetData[]>([]);

	$effect(() => {
		const timer = setTimeout(() => {
			widgets = widgetConfigs;
			loading = false;
		}, 600);
		return () => clearTimeout(timer);
	});
</script>

<section class="page">
	<h1>9B.4 — query.batch()</h1>
	<p class="concept">
		<strong>Concept.</strong> The N+1 problem: 4 widgets calling the same query with different
		arguments means 4 HTTP requests. <code>query.batch()</code> coalesces them into a single
		request. The server callback receives an array of all arguments and returns a resolver.
	</p>

	<div class="build">
		<h2>The N+1 problem</h2>
		<pre><code>{problemCode}</code></pre>

		<h2>The batch solution</h2>
		<pre><code>{batchCode}</code></pre>

		<h2>Component usage</h2>
		<pre><code>{usageBatchCode}</code></pre>

		<h2>Simulated dashboard</h2>
		<p>These 4 widgets load from a single <code>Promise.all</code> — simulating batch behavior:</p>

		{#if loading}
			<div class="widget-grid">
				{#each Array(4) as _}
					<div class="widget skeleton">
						<div class="skel-label"></div>
						<div class="skel-value"></div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="widget-grid">
				{#each widgets as widget}
					<div class="widget">
						<span class="widget-label">{widget.label}</span>
						<span class="widget-value">{widget.value}</span>
						<span class="widget-trend" class:up={widget.trendUp} class:down={!widget.trendUp}>
							{widget.trend}
						</span>
					</div>
				{/each}
			</div>
		{/if}

		<div class="note">
			<strong>Key insight:</strong> With <code>query.batch()</code>, SvelteKit collects all pending
			query calls in the current tick, sends them as one request, then distributes results back to
			each caller.
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>query.batch()</code> solves the N+1 problem by coalescing multiple calls into one request</li>
		<li>The server receives an array of all arguments from all callers</li>
		<li>A resolver function maps each argument back to its result</li>
		<li>Components call the function normally — batching is transparent</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.widget-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); }
	.widget {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs);
	}
	.widget-label { font-size: var(--text-sm); color: var(--color-text-muted); }
	.widget-value { font-size: var(--text-xl); font-weight: 700; }
	.widget-trend { font-size: var(--text-sm); font-weight: 600; }
	.widget-trend.up { color: oklch(60% 0.15 145); }
	.widget-trend.down { color: oklch(60% 0.15 25); }
	.skeleton { animation: pulse 1.2s ease-in-out infinite; }
	.skel-label { width: 60%; height: 1rem; background: var(--color-border); border-radius: var(--radius-xs); }
	.skel-value { width: 80%; height: 1.5rem; background: var(--color-border); border-radius: var(--radius-xs); }
	.note { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); font-size: var(--text-sm); }
	@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
