<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const problemCode = `// Without batching: 4 widgets = 4 HTTP requests\n" +
		"// Widget 1: getStats('revenue')   → HTTP POST\n" +
		"// Widget 2: getStats('users')     → HTTP POST\n" +
		"// Widget 3: getStats('orders')    → HTTP POST\n" +
		"// Widget 4: getStats('inventory') → HTTP POST\n" +
		"// Total: 4 round trips!`;\n" +
		"\n" +
		"	const batchCode = `// stats.remote.ts\n" +
		"import { query } from '$app/server';\n" +
		"\n" +
		"// query.batch() coalesces multiple calls into one request\n" +
		"export const getStats = query.batch(async (keys: string[]) =\u003e {\n" +
		"  // 'keys' is an array of all arguments from all callers\n" +
		"  // e.g., ['revenue', 'users', 'orders', 'inventory']\n" +
		"  const results = await db.stats.getMany(keys);\n" +
		"\n" +
		"  // Return a resolver function\n" +
		"  return (key: string) =\u003e results.get(key);\n" +
		"});`;\n" +
		"\n" +
		"	const usageBatchCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  // Each widget calls getStats independently\n" +
		"  import { getStats } from './stats.remote';\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003c!-- These 4 calls become 1 HTTP request --\u003e\n" +
		"\u003cWidget title=\"Revenue\" data={getStats('revenue')} /\u003e\n" +
		"\u003cWidget title=\"Users\"   data={getStats('users')} /\u003e\n" +
		"\u003cWidget title=\"Orders\"  data={getStats('orders')} /\u003e\n" +
		"\u003cWidget title=\"Stock\"   data={getStats('inventory')} /\u003e`;\n" +
		"\n" +
		"	type WidgetData = {\n" +
		"		label: string;\n" +
		"		value: string;\n" +
		"		trend: string;\n" +
		"		trendUp: boolean;\n" +
		"	};\n" +
		"\n" +
		"	const widgetConfigs: WidgetData[] = [\n" +
		"		{ label: 'Revenue', value: '$48,290', trend: '+12.5%', trendUp: true },\n" +
		"		{ label: 'Users', value: '3,847', trend: '+8.2%', trendUp: true },\n" +
		"		{ label: 'Orders', value: '1,204', trend: '-2.1%', trendUp: false },\n" +
		"		{ label: 'Inventory', value: '15,603', trend: '+0.8%', trendUp: true },\n" +
		"	];\n" +
		"\n" +
		"	let loading = $state(true);\n" +
		"	let widgets = $state\u003cWidgetData[]\u003e([]);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const timer = setTimeout(() =\u003e {\n" +
		"			widgets = widgetConfigs;\n" +
		"			loading = false;\n" +
		"		}, 600);\n" +
		"		return () =\u003e clearTimeout(timer);\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.4 — query.batch()\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e The N+1 problem: 4 widgets calling the same query with different\n" +
		"		arguments means 4 HTTP requests. \u003ccode\u003equery.batch()\u003c/code\u003e coalesces them into a single\n" +
		"		request. The server callback receives an array of all arguments and returns a resolver.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eThe N+1 problem\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{problemCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eThe batch solution\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{batchCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eComponent usage\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{usageBatchCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated dashboard\u003c/h2\u003e\n" +
		"		\u003cp\u003eThese 4 widgets load from a single \u003ccode\u003ePromise.all\u003c/code\u003e — simulating batch behavior:\u003c/p\u003e\n" +
		"\n" +
		"		{#if loading}\n" +
		"			\u003cdiv class=\"widget-grid\"\u003e\n" +
		"				{#each Array(4) as _}\n" +
		"					\u003cdiv class=\"widget skeleton\"\u003e\n" +
		"						\u003cdiv class=\"skel-label\"\u003e\u003c/div\u003e\n" +
		"						\u003cdiv class=\"skel-value\"\u003e\u003c/div\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{/each}\n" +
		"			\u003c/div\u003e\n" +
		"		{:else}\n" +
		"			\u003cdiv class=\"widget-grid\"\u003e\n" +
		"				{#each widgets as widget}\n" +
		"					\u003cdiv class=\"widget\"\u003e\n" +
		"						\u003cspan class=\"widget-label\"\u003e{widget.label}\u003c/span\u003e\n" +
		"						\u003cspan class=\"widget-value\"\u003e{widget.value}\u003c/span\u003e\n" +
		"						\u003cspan class=\"widget-trend\" class:up={widget.trendUp} class:down={!widget.trendUp}\u003e\n" +
		"							{widget.trend}\n" +
		"						\u003c/span\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{/each}\n" +
		"			\u003c/div\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003cdiv class=\"note\"\u003e\n" +
		"			\u003cstrong\u003eKey insight:\u003c/strong\u003e With \u003ccode\u003equery.batch()\u003c/code\u003e, SvelteKit collects all pending\n" +
		"			query calls in the current tick, sends them as one request, then distributes results back to\n" +
		"			each caller.\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003equery.batch()\u003c/code\u003e solves the N+1 problem by coalescing multiple calls into one request\u003c/li\u003e\n" +
		"		\u003cli\u003eThe server receives an array of all arguments from all callers\u003c/li\u003e\n" +
		"		\u003cli\u003eA resolver function maps each argument back to its result\u003c/li\u003e\n" +
		"		\u003cli\u003eComponents call the function normally — batching is transparent\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Replace <code>query.batch()</code> with four separate <code>query()</code> calls.</strong> The network tab now shows four individual HTTP requests instead of one. The page still works but uses four times the round trips, demonstrating the N+1 problem batch was designed to solve.</li>
		<li><strong>Return <code>undefined</code> from the resolver for one of the keys.</strong> That specific widget receives no data and renders empty or throws, while the others work fine. The resolver must handle every key in the input array.</li>
		<li><strong>Add a fifth widget calling <code>getStats('conversion')</code> without updating the server handler.</strong> The resolver does not recognize the key and returns <code>undefined</code>. Batch resolvers must be prepared for any argument the client might send.</li>
		<li><strong>Delay one of the widget renders with <code>setTimeout</code> so it calls <code>getStats</code> in the next tick.</strong> It gets its own separate HTTP request because batching only coalesces calls within the same microtask. Calls in different ticks become separate batches.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>query.batch()</code> solves the N+1 problem for remote functions. When multiple components on the same page call the same query with different arguments, SvelteKit collects all pending calls within the current microtask and sends them as a single HTTP request. The server callback receives an array of all arguments and returns a resolver function that maps each argument back to its result.</p>
	<p class="prose">From the component's perspective, nothing changes. Each widget calls <code>getStats('revenue')</code> independently, unaware that its call is being batched with others. The batching is entirely transparent to consumers, which means you can add or remove widgets without changing the data-fetching logic.</p>
	<p class="prose">The key insight is that batching happens per-tick. Calls made in the same synchronous render cycle are coalesced, but calls deferred to a later tick (via <code>setTimeout</code> or <code>await</code>) become separate batches. Design your components to make all their query calls eagerly during initialization for maximum batching efficiency.</p>
	<p class="next">Next up: prerendering remote function results at build time.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
	.skel-label { inline-size: 60%; block-size: 1rem; background: var(--color-border); border-radius: var(--radius-xs); }
	.skel-value { inline-size: 80%; block-size: 1.5rem; background: var(--color-border); border-radius: var(--radius-xs); }
	.note { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); font-size: var(--text-sm); }
	@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
