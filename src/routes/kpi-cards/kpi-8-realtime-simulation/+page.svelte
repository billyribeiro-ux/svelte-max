<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { dashboard } from '$lib/stores/dashboard.svelte';

	let running = $state(true);

	$effect(() => {
		if (!running) return;
		const id = setInterval(() => dashboard.tick(), 2000);
		return () => clearInterval(id);
	});

	function toggleRunning(): void {
		running = !running;
	}

	function formatTime(date: Date): string {
		return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	}

	const levelColor: Record<string, string> = {
		info: 'var(--color-text-muted)',
		warning: 'oklch(70% 0.18 60)',
		error: 'var(--color-error)'
	};

	const recentActivities = $derived(dashboard.activities.slice(-10).reverse());

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import KpiCard from '$lib/components/KpiCard.svelte';\n" +
		"	import { dashboard } from '$lib/stores/dashboard.svelte';\n" +
		"\n" +
		"	let running = $state(true);\n" +
		"\n" +
		"	$effect(() => {\n" +
		"		if (!running) return;\n" +
		"		const id = setInterval(() => dashboard.tick(), 2000);\n" +
		"		return () => clearInterval(id);\n" +
		"	});\n" +
		"\n" +
		"	function toggleRunning(): void {\n" +
		"		running = !running;\n" +
		"	}\n" +
		"\n" +
		"	const recentActivities = $derived(\n" +
		"		dashboard.activities.slice(-10).reverse()\n" +
		"	);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.8 — Real-Time Data Simulation\u003c/h1\u003e\n" +
		"	\u003cdiv class=\"kpi-grid\"\u003e\n" +
		"		{#each dashboard.metrics as metric (metric.id)}\n" +
		"			\u003cKpiCard {metric} /\u003e\n" +
		"		{/each}\n" +
		"	\u003c/div\u003e\n" +
		"	\u003cbutton onclick={toggleRunning}\u003e\n" +
		"		{running ? 'Pause' : 'Resume'}\n" +
		"	\u003c/button\u003e\n" +
		"	\u003cbutton onclick={() =\u003e dashboard.reset()}\u003eReset\u003c/button\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.8 — Real-Time Data Simulation</h1>
	<p class="concept">
		<strong>Concept.</strong> Real dashboards update continuously. Build a reactive
		store class in <code>.svelte.ts</code> that simulates server metrics. Use
		<code>$effect</code> with <code>setInterval</code> for periodic ticks.
		The cleanup function returned by <code>$effect</code> clears the interval on
		destroy. Window data arrays to prevent unbounded growth — keep the last 20
		data points.
	</p>

	<div class="build">
		<h2>Live KPI cards (ticking every 2s)</h2>
		<div class="controls">
			<button class="btn" type="button" onclick={toggleRunning}>
				{running ? 'Pause' : 'Resume'}
			</button>
			<button class="btn btn-secondary" type="button" onclick={() => dashboard.reset()}>
				Reset
			</button>
			<span class="status-badge" class:active={running}>
				{running ? 'LIVE' : 'PAUSED'}
			</span>
		</div>

		<div class="kpi-grid">
			{#each dashboard.metrics as metric (metric.id)}
				<KpiCard {metric} />
			{/each}
		</div>

		<h2>Activity feed (last 10 events)</h2>
		<div class="activity-feed" role="log" aria-label="Dashboard activity feed">
			{#each recentActivities as event (event.id)}
				<div class="activity-item">
					<span class="activity-dot" style:background={levelColor[event.level]}></span>
					<span class="activity-text">{event.text}</span>
					<time class="activity-time">{formatTime(event.at)}</time>
				</div>
			{/each}
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>A <code>.svelte.ts</code> module can export reactive classes with <code>$state</code> fields that drive UI updates across components.</li>
		<li><code>$effect</code> with <code>setInterval</code> creates periodic ticks; the returned cleanup function prevents memory leaks.</li>
		<li>Gaussian noise on each <code>tick()</code> creates realistic-looking metric fluctuation.</li>
		<li>Windowing data arrays (keeping the last N points) prevents unbounded memory growth.</li>
		<li>A single store instance shared across components keeps the entire dashboard in sync.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	.build h2 {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition: opacity var(--dur-fast) var(--ease-out);
	}

	.btn:hover {
		opacity: 0.85;
	}

	.btn-secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.status-badge {
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}

	.status-badge.active {
		background: oklch(45% 0.15 145);
		color: oklch(95% 0.03 145);
	}

	.kpi-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.activity-feed {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		max-block-size: 300px;
		overflow-y: auto;
		padding: var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.activity-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
	}

	.activity-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.activity-text {
		flex: 1;
		color: var(--color-text);
	}

	.activity-time {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.kpi-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
		.kpi-grid { grid-template-columns: repeat(4, 1fr); }
	}
</style>
