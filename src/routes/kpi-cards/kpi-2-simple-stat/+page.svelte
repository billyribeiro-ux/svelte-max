<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import StatCard from '$lib/components/StatCard.svelte';

	const metrics = [
		{ label: 'Requests/sec', value: 12847, unit: 'req/s' },
		{ label: 'Avg Latency', value: 42.3, unit: 'ms' },
		{ label: 'Uptime', value: 99.97, unit: '%' }
	];

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import StatCard from '$lib/components/StatCard.svelte';\n" +
		"\n" +
		"	const metrics = [\n" +
		"		{ label: 'Requests/sec', value: 12847, unit: 'req/s' },\n" +
		"		{ label: 'Avg Latency', value: 42.3, unit: 'ms' },\n" +
		"		{ label: 'Uptime', value: 99.97, unit: '%' }\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.2 — Simple Stat Card\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Start simple — a card that shows one number with a\n" +
		"		label and unit. \u003ccode\u003eIntl.NumberFormat\u003c/code\u003e handles locale-aware formatting\n" +
		"		(commas, decimals). CSS custom properties \u003ccode\u003e--card-bg\u003c/code\u003e and\n" +
		"		\u003ccode\u003e--card-border\u003c/code\u003e let consumers theme the card without touching\n" +
		"		its internals.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eDefault styling\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"card-row\"\u003e\n" +
		"			{#each metrics as m}\n" +
		"				\u003cStatCard label={m.label} value={m.value} unit={m.unit} /\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch2\u003eCustom \u003ccode\u003e--card-bg\u003c/code\u003e overrides\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"card-row\"\u003e\n" +
		"			\u003cdiv style=\"--card-bg: oklch(25% 0.05 270); --card-border: oklch(35% 0.08 270);\"\u003e\n" +
		"				\u003cStatCard label=\"Active Users\" value={8341} unit=\"users\" /\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv style=\"--card-bg: oklch(25% 0.05 150); --card-border: oklch(35% 0.08 150);\"\u003e\n" +
		"				\u003cStatCard label=\"Revenue\" value={284930} unit=\"USD\" /\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv style=\"--card-bg: oklch(25% 0.05 30); --card-border: oklch(35% 0.08 30);\"\u003e\n" +
		"				\u003cStatCard label=\"Error Rate\" value={0.3} unit=\"%\" /\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.2 — Simple Stat Card</h1>
	<p class="concept">
		<strong>Concept.</strong> Start simple — a card that shows one number with a
		label and unit. <code>Intl.NumberFormat</code> handles locale-aware formatting
		(commas, decimals). CSS custom properties <code>--card-bg</code> and
		<code>--card-border</code> let consumers theme the card without touching
		its internals.
	</p>

	<div class="build">
		<h2>Default styling</h2>
		<div class="card-row">
			{#each metrics as m}
				<StatCard label={m.label} value={m.value} unit={m.unit} />
			{/each}
		</div>

		<h2>Custom <code>--card-bg</code> overrides</h2>
		<div class="card-row">
			<div style="--card-bg: oklch(25% 0.05 270); --card-border: oklch(35% 0.08 270);">
				<StatCard label="Active Users" value={8341} unit="users" />
			</div>
			<div style="--card-bg: oklch(25% 0.05 150); --card-border: oklch(35% 0.08 150);">
				<StatCard label="Revenue" value={284930} unit="USD" />
			</div>
			<div style="--card-bg: oklch(25% 0.05 30); --card-border: oklch(35% 0.08 30);">
				<StatCard label="Error Rate" value={0.3} unit="%" />
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">The StatCard component is intentionally simple. Break it to learn what each piece contributes.</p>
	<ol class="experiments">
		<li><strong>Pass a string like <code>"abc"</code> as the <code>value</code> prop.</strong> <code>Intl.NumberFormat</code> will produce <code>NaN</code> in the output. The component trusts its TypeScript interface — runtime validation is your responsibility if the data source is unreliable.</li>
		<li><strong>Remove the <code>--card-bg</code> and <code>--card-border</code> custom properties from the themed cards.</strong> They will fall back to the component's default styling. This demonstrates how CSS custom properties create a theming API without requiring additional props or class manipulation.</li>
		<li><strong>Delete the <code>&lt;dt&gt;</code> element and put the label in a <code>&lt;span&gt;</code> instead.</strong> Visually identical, but screen readers lose the label-value association. The <code>&lt;dt&gt;</code>/<code>&lt;dd&gt;</code> pattern creates an explicit semantic link between the metric name and its value.</li>
		<li><strong>Replace <code>Intl.NumberFormat</code> with a plain <code>.toString()</code> call.</strong> Large numbers like 284930 will display without commas, making them hard to read at a glance. Locale-aware formatting is a small detail that massively improves scannability in dashboards.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>StatCard</code> component accepts <code>label</code>, <code>value</code>, <code>unit</code>, and an optional snippet for footer content. This minimal API covers the vast majority of single-metric display needs. <code>Intl.NumberFormat</code> handles locale-aware formatting automatically — commas for thousands, proper decimal handling — without any manual string manipulation.</p>
	<p class="prose">CSS custom properties like <code>--card-bg</code> and <code>--card-border</code> create a theming API that lets parent context override the card's appearance without prop drilling. The component defines sensible defaults in its scoped styles, and consumers override only what they need by setting custom properties on a wrapper element.</p>
	<p class="prose">Semantic HTML with <code>&lt;dt&gt;</code>/<code>&lt;dd&gt;</code> pairs gives screen readers meaningful label-value associations. This is invisible to sighted users but essential for assistive technologies to convey which number belongs to which metric name.</p>
	<p class="next">Next lesson: KPI.3 adds trend arrows and percent-change deltas to communicate direction.</p>
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
		.card-row { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.card-row { grid-template-columns: repeat(3, 1fr); }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
