<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { flip } from 'svelte/animate';
	import type { KpiMetric } from '$lib/types/kpi';

	const metrics: KpiMetric[] = [
		{
			id: 'requests', label: 'Requests/sec',
			value: 2437, previousValue: 2280, target: 3000, unit: 'req/s',
			history: [2100, 2200, 2350, 2280, 2400, 2380, 2437]
		},
		{
			id: 'latency', label: 'P99 Latency',
			value: 182, previousValue: 195, target: 150, unit: 'ms',
			history: [210, 205, 198, 195, 188, 185, 182]
		},
		{
			id: 'errors', label: 'Error Rate',
			value: 0.82, previousValue: 1.1, target: 0.5, unit: '%',
			history: [1.4, 1.3, 1.1, 1.1, 0.95, 0.88, 0.82]
		},
		{
			id: 'users', label: 'Active Users',
			value: 12438, previousValue: 11200, target: 15000, unit: 'users',
			history: [10800, 11000, 11200, 11200, 11800, 12100, 12438]
		}
	];

	const fullCode =
		"\u003cstyle\u003e\n" +
		"	.dashboard-layout {\n" +
		"		display: grid;\n" +
		"		grid-template-columns: 1fr;\n" +
		"		grid-template-areas:\n" +
		"			'header'\n" +
		"			'kpi-row'\n" +
		"			'main'\n" +
		"			'activity';\n" +
		"		gap: var(--space-md);\n" +
		"	}\n" +
		"\n" +
		"	.kpi-row {\n" +
		"		grid-area: kpi-row;\n" +
		"		display: grid;\n" +
		"		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n" +
		"		gap: var(--space-md);\n" +
		"	}\n" +
		"\n" +
		"	@media (min-width: 768px) {\n" +
		"		.dashboard-layout {\n" +
		"			grid-template-columns: 1fr 280px;\n" +
		"			grid-template-areas:\n" +
		"				'header header'\n" +
		"				'kpi-row kpi-row'\n" +
		"				'main activity';\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	@media (min-width: 1024px) {\n" +
		"		.kpi-row {\n" +
		"			grid-template-columns: repeat(4, 1fr);\n" +
		"		}\n" +
		"	}\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>KPI.9 — Dashboard Grid Layout</h1>
	<p class="concept">
		<strong>Concept.</strong> Dashboard grids must reflow beautifully from phone to
		ultrawide. Use CSS Grid <code>auto-fill</code> + <code>minmax()</code> for
		the KPI row. Use named grid areas for the full dashboard layout — header,
		kpi-row, charts, activity. Container queries enable card-level
		responsiveness independent of the viewport.
	</p>

	<div class="build">
		<h2>Full dashboard layout</h2>
		<p class="hint">Resize your browser to watch the reflow at 480px, 768px, and 1024px breakpoints.</p>

		<div class="dashboard-layout">
			<header class="dash-header">
				<h3 class="dash-title">Operations Dashboard</h3>
				<div class="dash-filters">
					<span class="filter-pill">Production</span>
					<span class="filter-pill">Last 1h</span>
				</div>
			</header>

			<div class="kpi-row">
				<!-- animate:flip — smooth reorder when cards are sorted or filtered -->
				{#each metrics as metric (metric.id)}
					<div animate:flip={{ duration: 300 }}>
						<KpiCard {metric} />
					</div>
				{/each}
			</div>

			<main class="dash-main">
				<div class="chart-placeholder">
					<span>Main content area</span>
					<span class="chart-sub">Charts, tables, or detail views go here</span>
				</div>
			</main>

			<aside class="dash-activity">
				<h4 class="activity-title">Recent Activity</h4>
				<div class="placeholder-list">
					{#each Array(5) as _, i}
						<div class="placeholder-item">
							<span class="placeholder-dot"></span>
							<span class="placeholder-line" style:width="{60 + Math.random() * 30}%"></span>
						</div>
					{/each}
				</div>
			</aside>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Dashboard layouts must work from phone to ultrawide. Break the grid to see what makes it resilient.</p>
	<ol class="experiments">
		<li><strong>Replace <code>auto-fill</code> with a fixed column count like <code>repeat(4, 1fr)</code> in the KPI row.</strong> On mobile, four columns will squeeze each card to an unreadable width. <code>auto-fill</code> with <code>minmax()</code> is what allows the grid to wrap cards to fewer columns at narrow widths.</li>
		<li><strong>Remove the named <code>grid-template-areas</code> and use line-based placement instead.</strong> The layout still works but becomes much harder to read and maintain. Named areas make the dashboard structure self-documenting — you can see "header, kpi-row, main, activity" at a glance.</li>
		<li><strong>Remove the 768px media query that changes the grid to a two-column layout.</strong> The activity sidebar will remain stacked below the main content even on wide screens, wasting horizontal space. Breakpoint-driven area rearrangement is how dashboards utilize available width.</li>
		<li><strong>Remove <code>animate:flip</code> from the KPI card wrappers.</strong> If you add sorting or filtering logic later, cards will jump to new positions instead of sliding smoothly. The flip animation provides visual continuity during reordering, helping users track which card went where.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">CSS Grid with <code>auto-fill</code> and <code>minmax(220px, 1fr)</code> creates a fluid KPI row that adapts to any container width. Cards wrap to fewer columns on narrow screens and expand to fill available space on wide ones — all without JavaScript. Named grid areas like <code>header</code>, <code>kpi-row</code>, <code>main</code>, and <code>activity</code> make the layout self-documenting and easy to rearrange at breakpoints.</p>
	<p class="prose">At 768px, the grid switches to a two-column layout where the activity sidebar sits beside the main content. At 1024px, the KPI row locks to four equal columns. These breakpoint-driven area rearrangements are the standard pattern for professional dashboards that must work from mobile to ultrawide monitors.</p>
	<p class="prose">Svelte's <code>animate:flip</code> directive provides smooth reordering animations when cards are sorted or filtered. Container queries enable card-level responsiveness independent of the viewport, allowing individual cards to adapt their layout based on how much space they actually have rather than the screen width.</p>
	<p class="next">Next lesson: KPI.10 covers production dashboard patterns — loading states, error handling, and keyboard navigation.</p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	/* ── Dashboard Layout Demo ── */
	.dashboard-layout {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas:
			'header'
			'kpi-row'
			'main'
			'activity';
		gap: var(--space-md);
	}

	.dash-header {
		grid-area: header;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.dash-title {
		font-size: var(--text-lg);
		color: var(--color-text);
		margin: 0;
	}

	.dash-filters {
		display: flex;
		gap: var(--space-xs);
	}

	.filter-pill {
		font-size: var(--text-xs);
		font-weight: 600;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
	}

	.kpi-row {
		grid-area: kpi-row;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: var(--space-md);
	}

	/* @scope — CSS scoping at-rule, card styles only apply within .dashboard-layout */
	@scope (.dashboard-layout) {
		.filter-pill {
			font-variant-numeric: tabular-nums;
		}
	}

	/* Container style() queries — cards respond to parent's --variant custom property */
	@container style(--variant: compact) {
		.kpi-row {
			gap: var(--space-sm);
		}
	}

	.dash-main {
		grid-area: main;
	}

	.chart-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		min-block-size: 200px;
		background: var(--color-surface-2);
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text-muted);
		font-size: var(--text-base);
		font-weight: 600;
	}

	.chart-sub {
		font-size: var(--text-sm);
		font-weight: 400;
	}

	.dash-activity {
		grid-area: activity;
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.activity-title {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0 0 var(--space-sm) 0;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.placeholder-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.placeholder-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.placeholder-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-border);
		flex-shrink: 0;
	}

	.placeholder-line {
		height: 10px;
		background: var(--color-border);
		border-radius: var(--radius-xs);
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

		.dashboard-layout {
			grid-template-columns: 1fr 280px;
			grid-template-areas:
				'header header'
				'kpi-row kpi-row'
				'main activity';
		}
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }

		.kpi-row {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
