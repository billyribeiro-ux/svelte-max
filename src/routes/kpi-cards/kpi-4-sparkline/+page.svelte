<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import Sparkline from '$lib/components/Sparkline.svelte';
	import StatCard from '$lib/components/StatCard.svelte';

	const rising = [10, 15, 14, 22, 28, 35, 42, 48, 55, 60, 68, 72] as const;
	const falling = [90, 85, 78, 70, 65, 58, 50, 42, 38, 30, 25, 20] as const;
	const volatile = [30, 60, 25, 70, 35, 80, 40, 75, 50, 90, 20, 65] as const;
	const stable = [50, 52, 49, 51, 50, 53, 48, 51, 50, 52, 49, 51] as const;

	const shapes = [
		{ name: 'Rising', data: rising, color: 'var(--color-success)' },
		{ name: 'Falling', data: falling, color: 'var(--color-error)' },
		{ name: 'Volatile', data: volatile, color: 'oklch(70% 0.18 60)' },
		{ name: 'Stable', data: stable, color: 'var(--color-brand)' }
	];

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import Sparkline from '$lib/components/Sparkline.svelte';\n" +
		"	import StatCard from '$lib/components/StatCard.svelte';\n" +
		"\n" +
		"	const rising = [10, 15, 14, 22, 28, 35, 42, 48, 55, 60, 68, 72] as const;\n" +
		"	const falling = [90, 85, 78, 70, 65, 58, 50, 42, 38, 30, 25, 20] as const;\n" +
		"	const volatile = [30, 60, 25, 70, 35, 80, 40, 75, 50, 90, 20, 65] as const;\n" +
		"	const stable = [50, 52, 49, 51, 50, 53, 48, 51, 50, 52, 49, 51] as const;\n" +
		"\n" +
		"	const shapes = [\n" +
		"		{ name: 'Rising', data: rising, color: 'var(--color-success)' },\n" +
		"		{ name: 'Falling', data: falling, color: 'var(--color-error)' },\n" +
		"		{ name: 'Volatile', data: volatile, color: 'oklch(70% 0.18 60)' },\n" +
		"		{ name: 'Stable', data: stable, color: 'var(--color-brand)' }\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.4 — Embedded Sparkline\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A sparkline is a tiny chart that shows trend at a\n" +
		"		glance — no axes, no labels, just the shape. Edward Tufte coined the\n" +
		"		term in 2006. Built from an SVG \u003ccode\u003e&lt;polyline&gt;\u003c/code\u003e with\n" +
		"		normalized data points (min/max scaling via \u003ccode\u003e$derived\u003c/code\u003e).\n" +
		"		A gradient fill area gives visual weight. The component is\n" +
		"		\u003ccode\u003earia-hidden=\"true\"\u003c/code\u003e since the stat value beside it provides\n" +
		"		the accessible meaning.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eFour data shapes\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"sparkline-grid\"\u003e\n" +
		"			{#each shapes as s}\n" +
		"				\u003cdiv class=\"spark-cell\"\u003e\n" +
		"					\u003cspan class=\"spark-name\"\u003e{s.name}\u003c/span\u003e\n" +
		"					\u003cSparkline data={s.data} color={s.color} width={140} height={36} /\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch2\u003eComposed in StatCard\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"card-row\"\u003e\n" +
		"			\u003cStatCard label=\"Throughput\" value={12847} unit=\"req/s\"\u003e\n" +
		"				\u003cSparkline data={rising} color=\"var(--color-success)\" /\u003e\n" +
		"			\u003c/StatCard\u003e\n" +
		"			\u003cStatCard label=\"Error Rate\" value={0.3} unit=\"%\"\u003e\n" +
		"				\u003cSparkline data={falling} color=\"var(--color-error)\" /\u003e\n" +
		"			\u003c/StatCard\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.4 — Embedded Sparkline</h1>
	<p class="concept">
		<strong>Concept.</strong> A sparkline is a tiny chart that shows trend at a
		glance — no axes, no labels, just the shape. Edward Tufte coined the
		term in 2006. Built from an SVG <code>&lt;polyline&gt;</code> with
		normalized data points (min/max scaling via <code>$derived</code>).
		A gradient fill area gives visual weight. The component is
		<code>aria-hidden="true"</code> since the stat value beside it provides
		the accessible meaning.
	</p>

	<div class="build">
		<h2>Four data shapes</h2>
		<div class="sparkline-grid">
			{#each shapes as s}
				<div class="spark-cell">
					<span class="spark-name">{s.name}</span>
					<Sparkline data={s.data} color={s.color} width={140} height={36} />
				</div>
			{/each}
		</div>

		<h2>Composed in StatCard</h2>
		<div class="card-row">
			<StatCard label="Throughput" value={12847} unit="req/s">
				<Sparkline data={rising} color="var(--color-success)" />
			</StatCard>
			<StatCard label="Error Rate" value={0.3} unit="%">
				<Sparkline data={falling} color="var(--color-error)" />
			</StatCard>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Sparklines are deceptively simple. Their power comes from careful normalization and sizing. Break both.</p>
	<ol class="experiments">
		<li><strong>Pass an array where all values are identical (e.g., <code>[50, 50, 50, 50]</code>).</strong> The sparkline will render as a flat horizontal line at the vertical center. The min/max normalization handles this gracefully because the range defaults to 1 when min equals max, avoiding a division by zero.</li>
		<li><strong>Remove the <code>aria-hidden="true"</code> attribute from the sparkline SVG.</strong> Screen readers will attempt to describe the SVG's polyline coordinates, producing meaningless output like "polyline 0,20 12,15 24,8". The attribute correctly marks the sparkline as decorative since the adjacent stat value provides the accessible meaning.</li>
		<li><strong>Pass an empty array <code>[]</code> as the data prop.</strong> The sparkline will render nothing or throw an error because there are no points to normalize. Real-world components need guards for empty or single-element arrays.</li>
		<li><strong>Remove the gradient fill path and keep only the stroke line.</strong> The sparkline loses visual weight and becomes harder to scan at small sizes. The filled area beneath the line is what makes sparklines readable at 60 by 20 pixels — the shape is more perceptible than the line alone.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A sparkline is a tiny inline chart built from an SVG <code>&lt;polyline&gt;</code> with normalized coordinates. Min/max scaling via <code>$derived</code> maps any data range to the available pixel height, so the same component works whether values range from 0 to 1 or from 10,000 to 50,000.</p>
	<p class="prose">The gradient fill path beneath the stroke line adds visual weight that makes the shape perceptible at small sizes. At 60 by 20 pixels, a bare line is almost invisible — the filled area is what gives sparklines their distinctive readability. Edward Tufte's original concept emphasized that sparklines communicate trend through shape, not precision.</p>
	<p class="prose">Marking the sparkline with <code>aria-hidden="true"</code> is correct because the adjacent stat value provides the accessible meaning. Composing <code>Sparkline</code> inside <code>StatCard</code>'s snippet footer creates a complete metric card from two independent, reusable components.</p>
	<p class="next">Next lesson: KPI.5 builds an SVG circular progress ring with animated transitions.</p>
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

	.sparkline-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}

	.spark-cell {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.spark-name {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.card-row {
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.card-row { grid-template-columns: repeat(2, 1fr); }
		.sparkline-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
