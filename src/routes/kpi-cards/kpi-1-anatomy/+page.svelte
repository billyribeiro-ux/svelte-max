<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { KpiMetric, TrendInfo } from '$lib/types/kpi';

	const sampleMetric: KpiMetric = {
		id: 'latency-p99',
		label: 'P99 Latency',
		value: 142,
		previousValue: 158,
		target: 150,
		unit: 'ms',
		history: [180, 170, 165, 158, 155, 150, 148, 142]
	};

	const sampleTrend: TrendInfo = {
		direction: 'down',
		delta: sampleMetric.value - sampleMetric.previousValue,
		percent:
			((sampleMetric.value - sampleMetric.previousValue) / sampleMetric.previousValue) * 100
	};

	const regions = [
		{ name: 'Header / Label', color: 'oklch(70% 0.18 270)', key: 'label' },
		{ name: 'Value + Unit', color: 'oklch(70% 0.18 150)', key: 'value' },
		{ name: 'Trend Delta', color: 'oklch(70% 0.18 30)', key: 'trend' },
		{ name: 'Sparkline', color: 'oklch(70% 0.18 330)', key: 'sparkline' },
		{ name: 'Footer / Target', color: 'oklch(70% 0.18 60)', key: 'footer' }
	];

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import type { KpiMetric, TrendInfo } from '$lib/types/kpi';\n" +
		"\n" +
		"	const sampleMetric: KpiMetric = {\n" +
		"		id: 'latency-p99',\n" +
		"		label: 'P99 Latency',\n" +
		"		value: 142,\n" +
		"		previousValue: 158,\n" +
		"		target: 150,\n" +
		"		unit: 'ms',\n" +
		"		history: [180, 170, 165, 158, 155, 150, 148, 142]\n" +
		"	};\n" +
		"\n" +
		"	const sampleTrend: TrendInfo = {\n" +
		"		direction: 'down',\n" +
		"		delta: sampleMetric.value - sampleMetric.previousValue,\n" +
		"		percent:\n" +
		"			((sampleMetric.value - sampleMetric.previousValue) / sampleMetric.previousValue) * 100\n" +
		"	};\n" +
		"\n" +
		"	const regions = [\n" +
		"		{ name: 'Header / Label', color: 'oklch(70% 0.18 270)', key: 'label' },\n" +
		"		{ name: 'Value + Unit', color: 'oklch(70% 0.18 150)', key: 'value' },\n" +
		"		{ name: 'Trend Delta', color: 'oklch(70% 0.18 30)', key: 'trend' },\n" +
		"		{ name: 'Sparkline', color: 'oklch(70% 0.18 330)', key: 'sparkline' },\n" +
		"		{ name: 'Footer / Target', color: 'oklch(70% 0.18 60)', key: 'footer' }\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.1 — Anatomy of a KPI Card\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A KPI card is more than a big number. An effective\n" +
		"		card shows five regions: a \u003cstrong\u003elabel\u003c/strong\u003e that names the metric, the\n" +
		"		\u003cstrong\u003evalue + unit\u003c/strong\u003e as the visual anchor, a \u003cstrong\u003etrend delta\u003c/strong\u003e\n" +
		"		(percent change with direction), a \u003cstrong\u003esparkline\u003c/strong\u003e giving context over\n" +
		"		time, and a \u003cstrong\u003efooter\u003c/strong\u003e with target or secondary info. We model this\n" +
		"		with the \u003ccode\u003eKpiMetric\u003c/code\u003e interface. Semantic HTML matters:\n" +
		"		\u003ccode\u003e&lt;article&gt;\u003c/code\u003e wraps the card, \u003ccode\u003e&lt;dl&gt;\u003c/code\u003e /\n" +
		"		\u003ccode\u003e&lt;dt&gt;\u003c/code\u003e / \u003ccode\u003e&lt;dd&gt;\u003c/code\u003e pair the label with its value.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003carticle class=\"anatomy-card\"\u003e\n" +
		"			{#each regions as region}\n" +
		"				\u003cdiv class=\"region region--{region.key}\" style:border-color={region.color}\u003e\n" +
		"					\u003cspan class=\"region-badge\" style:background={region.color}\u003e{region.name}\u003c/span\u003e\n" +
		"					{#if region.key === 'label'}\n" +
		"						\u003cdt\u003e{sampleMetric.label}\u003c/dt\u003e\n" +
		"					{:else if region.key === 'value'}\n" +
		"						\u003cdd class=\"big-value\"\u003e{sampleMetric.value}\u003cspan class=\"unit\"\u003e{sampleMetric.unit}\u003c/span\u003e\u003c/dd\u003e\n" +
		"					{:else if region.key === 'trend'}\n" +
		"						\u003cdd class=\"trend-text\"\u003e{sampleTrend.direction === 'down' ? '\\u2193' : '\\u2191'} {Math.abs(sampleTrend.percent).toFixed(1)}%\u003c/dd\u003e\n" +
		"					{:else if region.key === 'sparkline'}\n" +
		"						\u003cdiv class=\"sparkline-placeholder\"\u003e\n" +
		"							{#each sampleMetric.history as v, i}\n" +
		"								\u003cdiv class=\"bar\" style:height=\"{(v / 200) * 100}%\" style:opacity={0.4 + (i / sampleMetric.history.length) * 0.6}\u003e\u003c/div\u003e\n" +
		"							{/each}\n" +
		"						\u003c/div\u003e\n" +
		"					{:else}\n" +
		"						\u003cdd class=\"target-text\"\u003eTarget: {sampleMetric.target} {sampleMetric.unit}\u003c/dd\u003e\n" +
		"					{/if}\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/article\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"legend\"\u003e\n" +
		"			{#each regions as region}\n" +
		"				\u003cspan class=\"legend-item\"\u003e\n" +
		"					\u003cspan class=\"legend-dot\" style:background={region.color}\u003e\u003c/span\u003e\n" +
		"					{region.name}\n" +
		"				\u003c/span\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.1 — Anatomy of a KPI Card</h1>
	<p class="concept">
		<strong>Concept.</strong> A KPI card is more than a big number. An effective
		card shows five regions: a <strong>label</strong> that names the metric, the
		<strong>value + unit</strong> as the visual anchor, a <strong>trend delta</strong>
		(percent change with direction), a <strong>sparkline</strong> giving context over
		time, and a <strong>footer</strong> with target or secondary info. We model this
		with the <code>KpiMetric</code> interface. Semantic HTML matters:
		<code>&lt;article&gt;</code> wraps the card, <code>&lt;dl&gt;</code> /
		<code>&lt;dt&gt;</code> / <code>&lt;dd&gt;</code> pair the label with its value.
	</p>

	<div class="build">
		<article class="anatomy-card">
			{#each regions as region}
				<div class="region region--{region.key}" style:border-color={region.color}>
					<span class="region-badge" style:background={region.color}>{region.name}</span>
					{#if region.key === 'label'}
						<dt>{sampleMetric.label}</dt>
					{:else if region.key === 'value'}
						<dd class="big-value">{sampleMetric.value}<span class="unit">{sampleMetric.unit}</span></dd>
					{:else if region.key === 'trend'}
						<dd class="trend-text">{sampleTrend.direction === 'down' ? '\u2193' : '\u2191'} {Math.abs(sampleTrend.percent).toFixed(1)}%</dd>
					{:else if region.key === 'sparkline'}
						<div class="sparkline-placeholder">
							{#each sampleMetric.history as v, i}
								<div class="bar" style:height="{(v / 200) * 100}%" style:opacity={0.4 + (i / sampleMetric.history.length) * 0.6}></div>
							{/each}
						</div>
					{:else}
						<dd class="target-text">Target: {sampleMetric.target} {sampleMetric.unit}</dd>
					{/if}
				</div>
			{/each}
		</article>

		<div class="legend">
			{#each regions as region}
				<span class="legend-item">
					<span class="legend-dot" style:background={region.color}></span>
					{region.name}
				</span>
			{/each}
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Understanding the anatomy means knowing what each region does when it is missing. Remove them one at a time.</p>
	<ol class="experiments">
		<li><strong>Remove the label region entirely.</strong> The card becomes a meaningless number — 142ms of what? The label is the single most important element because it tells the reader which metric they are looking at.</li>
		<li><strong>Remove the unit from the value display.</strong> "142" could be milliseconds, seconds, or errors per hour. Units eliminate ambiguity and are essential for any metric that is not a pure count or percentage.</li>
		<li><strong>Replace the <code>&lt;article&gt;</code> wrapper with a plain <code>&lt;div&gt;</code>.</strong> Visually nothing changes, but screen readers lose the semantic landmark. The <code>&lt;article&gt;</code> element signals that this is a self-contained piece of content, making it discoverable in assistive technology navigation.</li>
		<li><strong>Remove the sparkline region and observe the card.</strong> The card still shows the current value and trend, but you lose all temporal context. Without the sparkline, you cannot tell whether the current value is part of a steady trend or a sudden spike.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A well-designed KPI card has five functional regions: a label that names the metric, a value with its unit as the visual anchor, a trend delta showing direction and magnitude of change, a sparkline for temporal context, and a footer with target or secondary information. Each region serves a distinct purpose and removing any one degrades the card's usefulness.</p>
	<p class="prose">The <code>KpiMetric</code> interface models the data shape needed for a full card, while <code>TrendInfo</code> is derived from current and previous values. This separation of raw data from computed presentation values is a pattern that scales — the same interface works whether the data comes from a REST API, WebSocket, or mock store.</p>
	<p class="prose">Semantic HTML matters for accessibility. Wrapping cards in <code>&lt;article&gt;</code> and pairing labels with values using <code>&lt;dl&gt;</code>/<code>&lt;dt&gt;</code>/<code>&lt;dd&gt;</code> gives screen readers meaningful structure. Each region can be independently styled and composed from smaller Svelte components, enabling mix-and-match assembly in later lessons.</p>
	<p class="next">Next lesson: KPI.2 builds a reusable StatCard component with locale-aware number formatting.</p>
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
		gap: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
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

	/* ── Anatomy card ── */
	.anatomy-card {
		display: flex;
		flex-direction: column;
		gap: 0;
		max-inline-size: 360px;
	}

	.region {
		border: 2px dashed;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		position: relative;
		margin-block-end: var(--space-xs);
	}

	.region-badge {
		position: absolute;
		inset-block-start: -0.6em;
		inset-inline-start: var(--space-sm);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--color-surface);
		padding: 0.1em 0.5em;
		border-radius: var(--radius-sm);
		line-height: 1.4;
	}

	dt {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding-block-start: var(--space-xs);
	}

	.big-value {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-text);
		margin: 0;
		padding-block-start: var(--space-xs);
		line-height: 1;
	}

	.unit {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-inline-start: var(--space-xs);
	}

	.trend-text {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-success);
		margin: 0;
		padding-block-start: var(--space-xs);
	}

	.sparkline-placeholder {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		block-size: 28px;
		padding-block-start: var(--space-xs);
	}

	.bar {
		flex: 1;
		background: var(--color-brand);
		border-radius: 1px;
		min-block-size: 2px;
	}

	.target-text {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		padding-block-start: var(--space-xs);
	}

	/* ── Legend ── */
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm) var(--space-md);
	}

	.legend-item {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.legend-dot {
		inline-size: 10px;
		block-size: 10px;
		border-radius: var(--radius-full);
		flex-shrink: 0;
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
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
