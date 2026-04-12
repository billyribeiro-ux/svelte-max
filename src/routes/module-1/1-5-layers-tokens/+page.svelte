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

	<!-- ═══════════════════════════════════════════════════════════════
	     SECTION 1: WHY THIS MATTERS
	     ═══════════════════════════════════════════════════════════════ -->

	<p class="prose">
		This is the most important CSS lesson in the entire course. Everything you style from this point
		forward — every component, every page, every project — sits on top of the foundation you build
		here. If you understand this lesson deeply, CSS will never feel random or frustrating again. If
		you skip it or skim it, you will spend the rest of the course fighting specificity bugs you
		cannot diagnose.
	</p>

	<p class="prose">
		Think of CSS like a courtroom. Every style rule is a lawyer making an argument: "This heading
		should be red." "No, it should be blue." When two rules conflict, the browser has to pick a
		winner. Normally it uses <strong>specificity</strong> — whichever selector is more "specific"
		wins. An ID beats a class. A class beats an element. And when specificity ties, the rule that
		appears <em>last</em> in the stylesheet wins. This system works for small projects. It collapses
		for large ones. You end up with <code>!important</code> everywhere, selectors four levels deep,
		and styles that break when you move a file.
	</p>

	<p class="prose">
		<strong>Cascade layers fix this permanently.</strong> Instead of relying on selector specificity,
		you declare an explicit priority order at the very top of your stylesheet. Rules in a later layer
		always beat rules in an earlier layer — regardless of how specific the selectors are. A simple
		<code>.card</code> in the <code>components</code> layer beats an <code>#app .main .card</code>
		in the <code>base</code> layer. No <code>!important</code>. No specificity math. Just order.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════
	     SECTION 2: THE SIX LAYERS
	     ═══════════════════════════════════════════════════════════════ -->

	<h2>The six layers</h2>

	<p class="prose">
		The PE7 architecture declares exactly six layers in this order. This single line appears at the
		very top of <code>src/app.css</code> — before any other CSS:
	</p>

	<pre class="code-block"><code>@layer reset, tokens, base, layout, components, animations;</code></pre>

	<p class="prose">
		The order is the priority. <code>animations</code> beats everything. <code>reset</code> loses
		to everything. Here is what each layer does and why it exists:
	</p>

	<table class="layer-table">
		<thead>
			<tr>
				<th>Layer</th>
				<th>Priority</th>
				<th>Purpose</th>
				<th>What goes in it</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>reset</code></td>
				<td>1 (lowest)</td>
				<td>Normalize browser defaults</td>
				<td><code>box-sizing</code>, margin reset, <code>img</code> block display</td>
			</tr>
			<tr>
				<td><code>tokens</code></td>
				<td>2</td>
				<td>Design system values</td>
				<td>All <code>--color-*</code>, <code>--text-*</code>, <code>--space-*</code> custom properties</td>
			</tr>
			<tr>
				<td><code>base</code></td>
				<td>3</td>
				<td>Element defaults</td>
				<td><code>body</code> font, heading sizes, link colors, focus styles</td>
			</tr>
			<tr>
				<td><code>layout</code></td>
				<td>4</td>
				<td>Page-level utilities</td>
				<td><code>.page</code> max-width, <code>.stack</code> flex column</td>
			</tr>
			<tr>
				<td><code>components</code></td>
				<td>5</td>
				<td>Component styles</td>
				<td>Svelte scoped <code>&lt;style&gt;</code> blocks land here</td>
			</tr>
			<tr>
				<td><code>animations</code></td>
				<td>6 (highest)</td>
				<td>Motion</td>
				<td><code>@keyframes</code>, transition overrides</td>
			</tr>
		</tbody>
	</table>

	<p class="prose">
		When you write a <code>&lt;style&gt;</code> block inside a Svelte component, those styles
		effectively live in the <code>components</code> layer. They will always beat <code>base</code>
		styles (like the default heading size) without you needing to write a more specific selector.
		That is the entire point.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════
	     SECTION 3: OKLCH COLOR SPACE
	     ═══════════════════════════════════════════════════════════════ -->

	<h2>OKLCH — the color space that makes sense</h2>

	<p class="prose">
		Every color in the PE7 system is written in <strong>OKLCH</strong>. Not hex. Not RGB. Not HSL.
		OKLCH stands for <strong>OK Lightness Chroma Hue</strong>. The "OK" means it is
		<em>perceptually uniform</em> — a 10% change in lightness <em>looks</em> like a 10% change to
		your eyes, regardless of the hue. This is not true of HSL. In HSL, yellow at 50% lightness
		looks much brighter than blue at 50% lightness. Your eyes are lying to you because HSL is based
		on math, not human perception. OKLCH fixes this.
	</p>

	<p class="prose">
		The three values are: <strong>Lightness</strong> (0% = black, 100% = white),
		<strong>Chroma</strong> (0 = grey, 0.4 = maximum saturation), and <strong>Hue</strong>
		(0-360 degrees around the color wheel, like a clock: 0 = red, 90 = yellow, 180 = green,
		270 = blue). For example, our brand purple is:
	</p>

	<pre class="code-block"><code>--color-brand: oklch(65% 0.22 270);
/*                    ↑     ↑    ↑
                 lightness chroma hue (blue) */</code></pre>

	<p class="prose">
		Why does this matter for you as a developer? Because you can build entire color palettes
		<em>mathematically</em>. Need a darker version? Lower the lightness. Need a muted version?
		Lower the chroma. Need a complementary color? Add 180 to the hue. You never have to eyeball
		anything or use a color picker. The math just works because OKLCH is perceptually linear.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════
	     SECTION 4: FLUID TYPOGRAPHY WITH CLAMP()
	     ═══════════════════════════════════════════════════════════════ -->

	<h2>Fluid typography with clamp()</h2>

	<p class="prose">
		Traditional responsive typography uses media queries: "At 768px, make the heading 2rem. At
		1024px, make it 3rem." This creates hard jumps. The text is one size, then suddenly it is
		another. <code>clamp()</code> eliminates those jumps entirely.
	</p>

	<pre class="code-block"><code>--text-lg: clamp(1.125rem, 3vw, 1.5rem);
/*               ↑          ↑      ↑
            minimum    preferred  maximum  */</code></pre>

	<p class="prose">
		The minimum is a safety floor — text never gets smaller than <code>1.125rem</code>, even on a
		320px phone. The maximum is a safety ceiling — text never gets larger than <code>1.5rem</code>,
		even on a 4K monitor. The preferred value (<code>3vw</code>) scales with the viewport width.
		Between the floor and ceiling, the text grows smoothly. No breakpoints. No jumps. Resize your
		browser window right now and watch the headings on this page scale — that is <code>clamp()</code>
		at work.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════
	     SECTION 5: SEE THE TOKENS IN ACTION
	     ═══════════════════════════════════════════════════════════════ -->

	<h2>See the tokens in action</h2>

	<p class="prose">
		Below is every token category in the PE7 system, rendered live. These are not images — they are
		real CSS custom properties resolved by your browser right now. Resize the window to see the
		spacing tokens change (they use <code>clamp()</code> too).
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

	<!-- ═══════════════════════════════════════════════════════════════
	     BREAK IT ON PURPOSE
	     ═══════════════════════════════════════════════════════════════ -->

	<h2>Break it on purpose</h2>

	<p class="prose">
		You learn more from breaking things than from reading about them working. Try each of these
		experiments in your own <code>app.css</code> file, observe the result, then undo before
		trying the next.
	</p>

	<ol class="experiments">
		<li>
			<strong>Write a style OUTSIDE any <code>@layer</code>.</strong> Add
			<code>h1 {'{'} color: red; {'}'}</code> at the bottom of <code>app.css</code>, outside all
			layer blocks. It will beat every layered rule — even <code>components</code>. Unlayered
			styles have higher priority than all layers. This is why you must never write CSS outside
			a layer in the PE7 system.
		</li>
		<li>
			<strong>Swap two layers in the declaration.</strong> Change the order to
			<code>@layer reset, base, tokens, layout, components, animations;</code> (tokens and base
			swapped). Now your token definitions in <code>tokens</code> have lower priority than
			<code>base</code>. If base styles reference tokens, nothing breaks visually — but if base
			ever overrides a token-level rule, it wins unexpectedly. Swap them back.
		</li>
		<li>
			<strong>Replace an OKLCH color with hex.</strong> Change
			<code>--color-brand: oklch(65% 0.22 270)</code> to <code>--color-brand: #7c5cfc</code>.
			The page looks the same — hex still works. But now try to derive a "dimmer" version by
			math. With OKLCH you lower lightness by 10. With hex… you cannot. That is why OKLCH is
			the PE7 standard.
		</li>
		<li>
			<strong>Remove the <code>clamp()</code> bounds.</strong> Change
			<code>--text-hero: clamp(2.5rem, 8vw, 5rem)</code> to <code>--text-hero: 8vw</code>.
			Now resize your browser very wide — the text becomes absurdly large. Resize very narrow —
			it becomes unreadable. The <code>clamp()</code> min/max are safety rails. Put them back.
		</li>
	</ol>

	<!-- ═══════════════════════════════════════════════════════════════
	     HAVING ISSUES? COMPLETE CODE
	     ═══════════════════════════════════════════════════════════════ -->

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- ═══════════════════════════════════════════════════════════════
	     WHAT YOU LEARNED
	     ═══════════════════════════════════════════════════════════════ -->

	<h2>What you learned</h2>

	<p class="prose">
		Cascade layers are the foundation of the PE7 CSS architecture. The declaration
		<code>@layer reset, tokens, base, layout, components, animations</code> at the top of your
		stylesheet establishes a priority order that eliminates specificity wars permanently. You will
		never need <code>!important</code> in this system. If a rule in the <code>components</code>
		layer conflicts with one in <code>base</code>, the component wins — always — regardless of
		selector specificity.
	</p>

	<p class="prose">
		Every color in the PE7 system is expressed in OKLCH, which is perceptually uniform. Unlike hex
		or HSL, changing the lightness value by 10% in OKLCH actually <em>looks</em> like a 10% change
		to your eyes. This means you can derive entire color palettes mathematically — darker variants
		by lowering lightness, muted variants by lowering chroma, complementary colors by rotating the
		hue by 180 degrees.
	</p>

	<p class="prose">
		Tokens are CSS custom properties (<code>--color-brand</code>, <code>--space-lg</code>,
		<code>--text-xl</code>) that serve as a contract between the design system and every component.
		You reference the token name, not the value. When a token changes — say, the brand color shifts
		from purple to teal — every component that reads <code>var(--color-brand)</code> updates
		automatically. No find-and-replace. No missed files.
	</p>

	<p class="prose">
		Fluid typography uses <code>clamp(min, preferred, max)</code> to scale text smoothly between a
		floor and a ceiling. The preferred value (usually in <code>vw</code> units) grows with the
		viewport. The min prevents unreadable text on small screens. The max prevents absurd text on
		large screens. Together they eliminate most typography-related media queries.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-1/1-6-fluid-typography">1.6 — Fluid typography</a> — you will build a complete
		typography specimen page and see every text token scaling live.
	</p>
</section>

<style>
	/* ── Prose paragraphs — deep teaching text ── */
	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}

		& strong {
			color: var(--color-text);
			font-weight: 700;
		}

		& em {
			font-style: italic;
		}
	}

	/* ── Inline code blocks ── */
	.code-block {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
		margin-block: var(--space-md);
		max-inline-size: 68ch;

		& code {
			background: transparent;
			padding: 0;
			font-size: inherit;
		}
	}

	/* ── Layer reference table ── */
	.layer-table {
		inline-size: 100%;
		max-inline-size: 68ch;
		border-collapse: collapse;
		margin-block: var(--space-lg);
		font-size: var(--text-sm);

		& th {
			background: var(--color-surface-2);
			color: var(--color-text);
			font-weight: 700;
			text-align: start;
			padding: var(--space-sm) var(--space-md);
			border-block-end: 2px solid var(--color-border);
		}

		& td {
			padding: var(--space-sm) var(--space-md);
			border-block-end: 1px solid var(--color-border);
			color: var(--color-text);
			vertical-align: top;
		}

		& code {
			font-family: var(--font-mono);
			font-size: 0.85em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	/* ── Break-it experiments list ── */
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		margin-block: var(--space-md);
		color: var(--color-text);
		line-height: 1.6;

		& li {
			margin-block: var(--space-xs);
		}

		& strong {
			color: var(--color-text);
		}

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	/* ── Next lesson link ── */
	.next {
		margin-block-start: var(--space-xl);
		color: var(--color-text);
	}

	.specimen {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xl);
		margin-block: var(--space-xl);

		@media (min-inline-size: 768px) {
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

		@media (min-inline-size: 768px) {
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
		inline-size: 100%;
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
		inline-size: 2.5rem;
		font-family: var(--font-mono, monospace);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.bar-row__bar {
		display: inline-block;
		block-size: 0.75rem;
		background: var(--color-brand);
		border-radius: var(--radius-xs);
	}

	.radii {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);

		@media (min-inline-size: 768px) {
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
		inline-size: 100%;
		aspect-ratio: 1 / 1;
		background: var(--color-brand-dim);
		border: 2px solid var(--color-brand);
	}

	.radius figcaption {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono, monospace);
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

	@media (min-inline-size: 480px) {
		.prose { max-inline-size: 68ch; }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.prose { max-inline-size: 72ch; }
		.layer-table { font-size: var(--text-base); }
	}

	@media (min-inline-size: 1024px) {
		.prose { max-inline-size: 80ch; }
	}
</style>
