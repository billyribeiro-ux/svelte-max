<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Complete code for CodeCanvas ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"  interface Swatch {\n" +
		"    token: string;\n" +
		"    label: string;\n" +
		"  }\n" +
		"\n" +
		"  interface SpaceBar {\n" +
		"    token: string;\n" +
		"    label: string;\n" +
		"  }\n" +
		"\n" +
		"  interface RadiusBox {\n" +
		"    token: string;\n" +
		"    label: string;\n" +
		"  }\n" +
		"\n" +
		"  const swatches: readonly Swatch[] = [\n" +
		"    { token: '--color-brand', label: 'brand' },\n" +
		"    { token: '--color-brand-dim', label: 'brand-dim' },\n" +
		"    { token: '--color-surface-2', label: 'surface-2' },\n" +
		"    { token: '--color-text', label: 'text' },\n" +
		"    { token: '--color-text-muted', label: 'text-muted' },\n" +
		"    { token: '--color-error', label: 'error' },\n" +
		"    { token: '--color-success', label: 'success' },\n" +
		"    { token: '--color-warning', label: 'warning' }\n" +
		"  ];\n" +
		"\n" +
		"  const spaces: readonly SpaceBar[] = [\n" +
		"    { token: '--space-xs', label: 'xs' },\n" +
		"    { token: '--space-sm', label: 'sm' },\n" +
		"    { token: '--space-md', label: 'md' },\n" +
		"    { token: '--space-lg', label: 'lg' },\n" +
		"    { token: '--space-xl', label: 'xl' },\n" +
		"    { token: '--space-2xl', label: '2xl' }\n" +
		"  ];\n" +
		"\n" +
		"  const radii: readonly RadiusBox[] = [\n" +
		"    { token: '--radius-xs', label: 'xs' },\n" +
		"    { token: '--radius-sm', label: 'sm' },\n" +
		"    { token: '--radius-md', label: 'md' },\n" +
		"    { token: '--radius-lg', label: 'lg' },\n" +
		"    { token: '--radius-full', label: 'full' }\n" +
		"  ];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e1.5 — @layer & tokens\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"specimen\"\u003e\n" +
		"    \u003csection\u003e\n" +
		"      \u003ch2\u003eColors\u003c/h2\u003e\n" +
		"      \u003cdiv class=\"swatches\"\u003e\n" +
		"        {#each swatches as swatch (swatch.token)}\n" +
		"          \u003cfigure class=\"swatch\"\u003e\n" +
		"            \u003cdiv class=\"swatch__chip\" style:background=\"var({swatch.token})\"\u003e\u003c/div\u003e\n" +
		"            \u003cfigcaption\u003e{swatch.label}\u003c/figcaption\u003e\n" +
		"          \u003c/figure\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/section\u003e\n" +
		"    \u003c!-- Spacing and Radii sections follow the same pattern --\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e";

	interface Swatch {
		token: string;
		label: string;
	}

	interface SpaceBar {
		token: string;
		label: string;
	}

	interface RadiusBox {
		token: string;
		label: string;
	}

	const swatches: readonly Swatch[] = [
		{ token: '--color-brand', label: 'brand' },
		{ token: '--color-brand-dim', label: 'brand-dim' },
		{ token: '--color-surface-2', label: 'surface-2' },
		{ token: '--color-text', label: 'text' },
		{ token: '--color-text-muted', label: 'text-muted' },
		{ token: '--color-error', label: 'error' },
		{ token: '--color-success', label: 'success' },
		{ token: '--color-warning', label: 'warning' }
	];

	const spaces: readonly SpaceBar[] = [
		{ token: '--space-xs', label: 'xs' },
		{ token: '--space-sm', label: 'sm' },
		{ token: '--space-md', label: 'md' },
		{ token: '--space-lg', label: 'lg' },
		{ token: '--space-xl', label: 'xl' },
		{ token: '--space-2xl', label: '2xl' }
	];

	const radii: readonly RadiusBox[] = [
		{ token: '--radius-xs', label: 'xs' },
		{ token: '--radius-sm', label: 'sm' },
		{ token: '--radius-md', label: 'md' },
		{ token: '--radius-lg', label: 'lg' },
		{ token: '--radius-full', label: 'full' }
	];
</script>

<section class="page">
	<h1>1.5 — @layer & tokens</h1>

	<p class="concept">
		The PE7 CSS architecture cascades through six explicit layers:
		<code>@layer reset, tokens, base, layout, components, animations</code>. Layers give you predictable
		order without specificity wars — anything in <code>components</code> always wins over
		<code>base</code>, no <code>!important</code> required. Tokens live in their own layer as CSS custom
		properties in <strong>OKLCH</strong>, which is perceptually uniform: unlike hex, stepping the
		lightness value actually looks like equal steps to the eye. Typography uses <code>clamp()</code> for
		fluid sizing, so text scales smoothly between mobile and desktop with no breakpoint jumps.
	</p>

	<div class="specimen">
		<section>
			<h2>Colors</h2>
			<div class="swatches">
				{#each swatches as swatch (swatch.token)}
					<figure class="swatch" aria-label="Color token {swatch.token}">
						<div class="swatch__chip" style:background="var({swatch.token})" aria-hidden="true"></div>
						<figcaption>{swatch.label}</figcaption>
					</figure>
				{/each}
			</div>
		</section>

		<section>
			<h2>Spacing</h2>
			<div class="bars">
				{#each spaces as space (space.token)}
					<div class="bar-row">
						<span class="bar-row__label">{space.label}</span>
						<span class="bar-row__bar" style:width="var({space.token})"></span>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h2>Radii</h2>
			<div class="radii">
				{#each radii as r (r.token)}
					<figure class="radius">
						<div class="radius__box" style:border-radius="var({r.token})"></div>
						<figcaption>{r.label}</figcaption>
					</figure>
				{/each}
			</div>
		</section>
	</div>

	<!-- HAVING ISSUES? COMPLETE CODE -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>@layer</code> creates predictable cascade order without specificity fights.</li>
		<li>OKLCH is perceptually uniform — use it instead of hex.</li>
		<li>Tokens are CSS custom properties scoped to a layer.</li>
		<li><code>clamp()</code> makes typography fluid across viewport sizes.</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		max-width: 60ch;
		line-height: 1.6;

		& code {
			color: var(--color-brand);
		}
	}

	.specimen {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xl);
		margin-block: var(--space-xl);

		@media (min-width: 768px) {
			grid-template-columns: repeat(3, 1fr);
			align-items: start;
		}
	}

	.specimen section {
		background: var(--color-surface-2);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);

		& h2 {
			margin: 0 0 var(--space-md) 0;
			color: var(--color-brand);
			font-size: var(--text-lg);
		}
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.swatch {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.swatch__chip {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-surface-1);
	}

	.swatch figcaption {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono, monospace);
		text-align: center;
	}

	.bars {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.bar-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.bar-row__label {
		width: 2.5rem;
		font-family: var(--font-mono, monospace);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.bar-row__bar {
		display: inline-block;
		height: 0.75rem;
		background: var(--color-brand);
		border-radius: var(--radius-xs);
	}

	.radii {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.radius {
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
	}

	.radius__box {
		width: 100%;
		aspect-ratio: 1 / 1;
		background: var(--color-brand-dim);
		border: 2px solid var(--color-brand);
	}

	.radius figcaption {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono, monospace);
	}

	ul {
		color: var(--color-text);
		line-height: 1.8;

		& code {
			color: var(--color-brand);
		}
	}
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */

	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}

	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
