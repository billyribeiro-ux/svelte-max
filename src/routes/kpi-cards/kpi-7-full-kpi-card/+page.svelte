<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import type { KpiMetric } from '$lib/types/kpi';

	const metrics: KpiMetric[] = [
		{
			id: 'requests',
			label: 'Requests/sec',
			value: 2437,
			previousValue: 2280,
			target: 3000,
			unit: 'req/s',
			history: [2100, 2200, 2350, 2280, 2400, 2380, 2437]
		},
		{
			id: 'latency',
			label: 'P99 Latency',
			value: 182,
			previousValue: 195,
			target: 150,
			unit: 'ms',
			history: [210, 205, 198, 195, 188, 185, 182]
		},
		{
			id: 'errors',
			label: 'Error Rate',
			value: 0.82,
			previousValue: 1.1,
			target: 0.5,
			unit: '%',
			history: [1.4, 1.3, 1.1, 1.1, 0.95, 0.88, 0.82]
		},
		{
			id: 'users',
			label: 'Active Users',
			value: 12438,
			previousValue: 11200,
			target: 15000,
			unit: 'users',
			history: [10800, 11000, 11200, 11200, 11800, 12100, 12438]
		}
	];

	let showSparkline = $state(true);
	let showProgress = $state(true);
	let showTrend = $state(true);

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import KpiCard from '$lib/components/KpiCard.svelte';\n" +
		"	import type { KpiMetric } from '$lib/types/kpi';\n" +
		"\n" +
		"	const metrics: KpiMetric[] = [\n" +
		"		{\n" +
		"			id: 'requests', label: 'Requests/sec',\n" +
		"			value: 2437, previousValue: 2280, target: 3000,\n" +
		"			unit: 'req/s',\n" +
		"			history: [2100, 2200, 2350, 2280, 2400, 2380, 2437]\n" +
		"		},\n" +
		"		// ...3 more metrics\n" +
		"	];\n" +
		"\n" +
		"	let showSparkline = $state(true);\n" +
		"	let showProgress = $state(true);\n" +
		"	let showTrend = $state(true);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.7 — Full KPI Card Composition\u003c/h1\u003e\n" +
		"	\u003cdiv class=\"kpi-grid\"\u003e\n" +
		"		{#each metrics as metric (metric.id)}\n" +
		"			\u003cKpiCard {metric} {showSparkline} {showProgress} {showTrend} /\u003e\n" +
		"		{/each}\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.7 — Full KPI Card Composition</h1>
	<p class="concept">
		<strong>Concept.</strong> The full KPI card composes <code>StatCard</code> +
		<code>AnimatedCounter</code> + <code>TrendArrow</code> + <code>Sparkline</code> +
		<code>ProgressRing</code> into one cohesive component. This is the PE7
		composition pattern at its peak — small, typed primitives assembled into a
		rich UI. Each sub-component does one thing well. The composed card does
		everything together.
	</p>

	<div class="build">
		<h2>Toggleable card features</h2>
		<div class="toggles">
			<label class="toggle-label">
				<input type="checkbox" bind:checked={showSparkline} />
				<span>Sparkline</span>
			</label>
			<label class="toggle-label">
				<input type="checkbox" bind:checked={showProgress} />
				<span>Progress Ring</span>
			</label>
			<label class="toggle-label">
				<input type="checkbox" bind:checked={showTrend} />
				<span>Trend Arrow</span>
			</label>
		</div>

		<div class="kpi-grid">
			{#each metrics as metric (metric.id)}
				<KpiCard {metric} {showSparkline} {showProgress} {showTrend} />
			{/each}
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">The full KPI card is a composition of five sub-components. Toggle them to understand the value of each layer.</p>
	<ol class="experiments">
		<li><strong>Uncheck all three toggles (Sparkline, Progress Ring, Trend Arrow).</strong> The card reduces to just a label and a number — the same as a basic StatCard. Each additional component adds a layer of context: trend direction, temporal shape, and target proximity.</li>
		<li><strong>Set <code>previousValue</code> equal to <code>value</code> in one of the metrics.</strong> The trend arrow will show 0.0% change with a neutral direction. The derived <code>TrendInfo</code> handles this edge case correctly — division by the previous value produces zero, and the direction logic maps zero change to "neutral".</li>
		<li><strong>Set a metric's <code>target</code> to a very small value like <code>1</code>.</strong> The progress ring will show as completely full (or overflowing), which misrepresents the data. Target values must be meaningful — a ring at 100% tells the user the goal is met, even if the actual value is far above it.</li>
		<li><strong>Pass an empty <code>history</code> array to a metric.</strong> The sparkline will either vanish or render incorrectly. The KpiCard should guard against edge cases like empty arrays, but this experiment reveals whether the current implementation handles them gracefully.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>KpiCard</code> component composes five sub-components — <code>AnimatedCounter</code>, <code>TrendArrow</code>, <code>Sparkline</code>, <code>ProgressRing</code>, and a card shell — into a single cohesive unit. Each sub-component handles one concern and is independently testable and reusable outside the card.</p>
	<p class="prose">The <code>$derived</code> rune computes <code>TrendInfo</code> from <code>metric.value</code> and <code>metric.previousValue</code>, calculating direction, delta, and percent change. Boolean props like <code>showSparkline</code>, <code>showProgress</code>, and <code>showTrend</code> let consumers configure which parts to render, creating a flexible component that adapts to different dashboard contexts.</p>
	<p class="prose">This composition pattern — small, typed primitives assembled into a rich UI — is the hallmark of professional component architecture. Rather than building one monolithic card component, you build five simple ones and compose them. When requirements change, you swap or extend individual pieces without touching the others.</p>
	<p class="next">Next lesson: KPI.8 connects these cards to a real-time data simulation with reactive stores.</p>
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

	.toggles {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.toggle-label input[type='checkbox'] {
		accent-color: var(--color-brand);
	}

	.kpi-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.kpi-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
		.kpi-grid { grid-template-columns: repeat(4, 1fr); }
	}
</style>
