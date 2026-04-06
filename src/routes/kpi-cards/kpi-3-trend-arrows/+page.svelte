<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import TrendArrow from '$lib/components/TrendArrow.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import type { TrendDirection } from '$lib/types/kpi';

	const trends: { label: string; direction: TrendDirection; percent: number }[] = [
		{ label: 'Revenue', direction: 'up', percent: 12.4 },
		{ label: 'New Users', direction: 'up', percent: 8.7 },
		{ label: 'Conversion', direction: 'up', percent: 2.1 },
		{ label: 'Error Rate', direction: 'down', percent: 34.2 },
		{ label: 'Latency', direction: 'down', percent: 15.8 },
		{ label: 'CPU Usage', direction: 'neutral', percent: 0.0 }
	];

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import TrendArrow from '$lib/components/TrendArrow.svelte';\n" +
		"	import StatCard from '$lib/components/StatCard.svelte';\n" +
		"	import type { TrendDirection } from '$lib/types/kpi';\n" +
		"\n" +
		"	const trends: { label: string; direction: TrendDirection; percent: number }[] = [\n" +
		"		{ label: 'Revenue', direction: 'up', percent: 12.4 },\n" +
		"		{ label: 'New Users', direction: 'up', percent: 8.7 },\n" +
		"		{ label: 'Conversion', direction: 'up', percent: 2.1 },\n" +
		"		{ label: 'Error Rate', direction: 'down', percent: 34.2 },\n" +
		"		{ label: 'Latency', direction: 'down', percent: 15.8 },\n" +
		"		{ label: 'CPU Usage', direction: 'neutral', percent: 0.0 }\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.3 — Trend Arrows & Deltas\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A percent-change delta tells the story behind a number.\n" +
		"		But direction alone isn't enough: \"up\" means good for revenue, bad for\n" +
		"		error rate. The \u003ccode\u003eTrendArrow\u003c/code\u003e component uses OKLCH colors —\n" +
		"		green (\u003ccode\u003e--color-success\u003c/code\u003e) for up, red (\u003ccode\u003e--color-error\u003c/code\u003e)\n" +
		"		for down, gray for neutral. An \u003ccode\u003earia-label\u003c/code\u003e describes the trend\n" +
		"		for screen readers: \"Up 12.4%\" or \"Down 34.2%\".\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eAll trend states\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"trend-grid\"\u003e\n" +
		"			{#each trends as t}\n" +
		"				\u003cdiv class=\"trend-cell\"\u003e\n" +
		"					\u003cspan class=\"trend-label\"\u003e{t.label}\u003c/span\u003e\n" +
		"					\u003cTrendArrow direction={t.direction} percent={t.percent} /\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch2\u003eComposed in a StatCard footer\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"card-row\"\u003e\n" +
		"			\u003cStatCard label=\"Revenue\" value={284930} unit=\"USD\"\u003e\n" +
		"				\u003cTrendArrow direction=\"up\" percent={12.4} size=\"sm\" /\u003e\n" +
		"				\u003cspan class=\"vs-text\"\u003evs last month\u003c/span\u003e\n" +
		"			\u003c/StatCard\u003e\n" +
		"			\u003cStatCard label=\"Error Rate\" value={0.3} unit=\"%\"\u003e\n" +
		"				\u003cTrendArrow direction=\"down\" percent={34.2} size=\"sm\" /\u003e\n" +
		"				\u003cspan class=\"vs-text\"\u003evs last month\u003c/span\u003e\n" +
		"			\u003c/StatCard\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.3 — Trend Arrows & Deltas</h1>
	<p class="concept">
		<strong>Concept.</strong> A percent-change delta tells the story behind a number.
		But direction alone is not enough: "up" means good for revenue, bad for
		error rate. The <code>TrendArrow</code> component uses OKLCH colors —
		green (<code>--color-success</code>) for up, red (<code>--color-error</code>)
		for down, gray for neutral. An <code>aria-label</code> describes the trend
		for screen readers: "Up 12.4%" or "Down 34.2%".
	</p>

	<div class="build">
		<h2>All trend states</h2>
		<div class="trend-grid">
			{#each trends as t}
				<div class="trend-cell">
					<span class="trend-label">{t.label}</span>
					<TrendArrow direction={t.direction} percent={t.percent} />
				</div>
			{/each}
		</div>

		<h2>Composed in a StatCard footer</h2>
		<div class="card-row">
			<StatCard label="Revenue" value={284930} unit="USD">
				<TrendArrow direction="up" percent={12.4} size="sm" />
				<span class="vs-text">vs last month</span>
			</StatCard>
			<StatCard label="Error Rate" value={0.3} unit="%">
				<TrendArrow direction="down" percent={34.2} size="sm" />
				<span class="vs-text">vs last month</span>
			</StatCard>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>TrendArrow</code> renders an inline SVG arrow with color-coded direction (up/down/neutral).</li>
		<li>The <code>aria-label</code> gives screen readers a textual description of the trend.</li>
		<li>OKLCH color tokens (<code>--color-success</code>, <code>--color-error</code>) keep the palette perceptually uniform.</li>
		<li>Snippets let you compose <code>TrendArrow</code> inside <code>StatCard</code>'s footer slot.</li>
		<li>Context matters: "down" is good for error rate but bad for revenue — the component shows direction, the developer chooses meaning.</li>
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

	.trend-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}

	.trend-cell {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.trend-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.card-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.vs-text {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-inline-start: var(--space-xs);
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
		.trend-grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.card-row { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
