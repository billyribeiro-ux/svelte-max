<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type Card = { id: number; title: string; body: string };

  const cards: Card[] = [
    { id: 1, title: 'Perception', body: 'OKLCH keeps lightness steady across hues.' },
    { id: 2, title: 'Layers', body: 'Cascade order beats specificity every time.' },
    { id: 3, title: 'Tokens', body: 'Design contract encoded as custom properties.' },
    { id: 4, title: 'Nesting', body: 'Native browser nesting, no preprocessor.' },
    { id: 5, title: 'Logical', body: 'Direction-aware sides for global UIs.' },
    { id: 6, title: 'Intrinsic', body: 'Grids that size themselves to content.' }
  ];

  let minSize = $state<number>(16);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Card = { id: number; title: string; body: string };\n" +
		"\n" +
		"  const cards: Card[] = [\n" +
		"    { id: 1, title: 'Perception', body: 'OKLCH keeps lightness steady across hues.' },\n" +
		"    { id: 2, title: 'Layers', body: 'Cascade order beats specificity every time.' },\n" +
		"    { id: 3, title: 'Tokens', body: 'Design contract encoded as custom properties.' },\n" +
		"    { id: 4, title: 'Nesting', body: 'Native browser nesting, no preprocessor.' },\n" +
		"    { id: 5, title: 'Logical', body: 'Direction-aware sides for global UIs.' },\n" +
		"    { id: 6, title: 'Intrinsic', body: 'Grids that size themselves to content.' }\n" +
		"  ];\n" +
		"\n" +
		"  let minSize = $state\u003cnumber\u003e(16);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.6 — CSS Grid patterns\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Grid excels at 2D layouts and intrinsic responsive grids.\n" +
		"    \u003ccode\u003egrid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))\u003c/code\u003e creates a grid that\n" +
		"    auto-fits as many columns as will fit, with each column at least 16rem wide, stretching to fill\n" +
		"    remaining space. This eliminates most media queries for card grids. \u003ccode\u003eauto-fill\u003c/code\u003e\n" +
		"    creates empty tracks if there is extra space; \u003ccode\u003eauto-fit\u003c/code\u003e collapses empty tracks so\n" +
		"    existing items stretch. \u003ccode\u003eminmax()\u003c/code\u003e sets a floor and a ceiling.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003clabel class=\"control\"\u003e\n" +
		"      \u003cspan\u003eMin column size: {minSize}rem\u003c/span\u003e\n" +
		"      \u003cinput type=\"range\" min=\"10\" max=\"30\" step=\"1\" bind:value={minSize} /\u003e\n" +
		"    \u003c/label\u003e\n" +
		"\n" +
		"    \u003cp class=\"hint\"\u003e\n" +
		"      Resize the window — no media queries. Drag the slider to change the\n" +
		"      \u003ccode\u003eminmax()\u003c/code\u003e floor live.\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"grid\" style:--grid-min={`${minSize}rem`}\u003e\n" +
		"      {#each cards as card (card.id)}\n" +
		"        \u003carticle class=\"card\"\u003e\n" +
		"          \u003ch4\u003e{card.title}\u003c/h4\u003e\n" +
		"          \u003cp\u003e{card.body}\u003c/p\u003e\n" +
		"        \u003c/article\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eauto-fit + minmax()\u003c/code\u003e is the intrinsic responsive grid recipe.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eauto-fit\u003c/code\u003e collapses empty tracks; \u003ccode\u003eauto-fill\u003c/code\u003e keeps them.\u003c/li\u003e\n" +
		"    \u003cli\u003eOne rule replaces three or four breakpoints for card grids.\u003c/li\u003e\n" +
		"    \u003cli\u003eFeed the min size via a custom property to animate the breakpoints.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.6 — CSS Grid patterns</h1>
  <p class="concept">
    <strong>Concept.</strong> Grid excels at 2D layouts and intrinsic responsive grids.
    <code>grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))</code> creates a grid that
    auto-fits as many columns as will fit, with each column at least 16rem wide, stretching to fill
    remaining space. This eliminates most media queries for card grids. <code>auto-fill</code>
    creates empty tracks if there is extra space; <code>auto-fit</code> collapses empty tracks so
    existing items stretch. <code>minmax()</code> sets a floor and a ceiling.
  </p>

  <div class="build">
    <label class="control">
      <span>Min column size: {minSize}rem</span>
      <input type="range" min="10" max="30" step="1" bind:value={minSize} />
    </label>

    <p class="hint">
      Resize the window — no media queries. Drag the slider to change the
      <code>minmax()</code> floor live.
    </p>

    <div class="grid" style:--grid-min={`${minSize}rem`}>
      {#each cards as card (card.id)}
        <article class="card">
          <h4>{card.title}</h4>
          <p>{card.body}</p>
        </article>
      {/each}
    </div>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Stress-test CSS Grid to learn how track sizing, overlap, and subgrid behave under real conditions.</p>
	<ol class="experiments">
		<li><strong>Use <code>fr</code> with no min</strong> — columns can shrink to 0. Without a minimum width constraint, <code>1fr</code> columns will collapse to nothing if the container is too narrow.</li>
		<li><strong>Use <code>minmax(0, 1fr)</code> vs <code>minmax(auto, 1fr)</code></strong> — different overflow behavior. With <code>auto</code> as the minimum, content sets a floor; with <code>0</code>, content can overflow its track.</li>
		<li><strong>Overlap grid items</strong> — later items layer on top. Place two items in the same grid cell and the later one in source order paints on top, or use <code>z-index</code> to control stacking.</li>
		<li><strong>Use subgrid</strong> — child inherits parent's tracks. <code>grid-template-columns: subgrid</code> on a nested grid makes it align to the parent's column lines, solving the "aligned card headers" problem.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">CSS Grid's <code>repeat(auto-fit, minmax(16rem, 1fr))</code> pattern is one of the most powerful single lines in modern CSS. It creates a responsive grid that automatically determines how many columns fit at the current container width, wrapping items to new rows as needed, all without a single media query. The <code>auto-fit</code> keyword collapses empty tracks so existing items stretch to fill the space, while <code>auto-fill</code> preserves empty tracks as blank space. The <code>minmax()</code> function sets a floor and ceiling for each track, ensuring columns never shrink below readability or stretch beyond usability.</p>
	<p class="prose">Grid excels at two-dimensional layouts because it controls both rows and columns simultaneously. Unlike flexbox, which distributes space along a single axis and lets the cross axis handle itself, Grid lets you define explicit track sizes for both dimensions. This makes it the natural choice for card grids, dashboard layouts, and any design where items need to align both horizontally and vertically. Feeding the minimum column size through a custom property like <code>--grid-min</code> gives you runtime control over the grid's breakpoints, allowing interactive demos or user preferences to reshape the layout dynamically.</p>
	<p class="prose">Advanced Grid features like subgrid, named grid lines, and the <code>round()</code> function extend its capabilities further. Subgrid allows a nested grid container to inherit its parent's track definitions, solving the persistent problem of aligning internal elements across sibling grid items -- such as making all card titles sit at the same height. Named lines (<code>[sidebar-start]</code>) make complex layouts self-documenting. The <code>round()</code> function snaps computed values to clean increments, preventing fractional pixel rendering artifacts in fluid grid calculations.</p>
	<p class="next"><a href="/module-6/6-7-flexbox">Next lesson: 6.7 Flexbox</a></p>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-lg);
    max-inline-size: 72rem;
    margin-inline: auto;
  }
  .concept {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-inline-size: 65ch;
    line-height: 1.6;
    margin: 0;
  }
  .concept strong { color: var(--color-text); }
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

  .control {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text);
    font-size: var(--text-sm);
  }
  .hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  .grid {
    --grid-min: 16rem;
    display: grid;
    /* round() — CSS math function that snaps the min column width to the nearest 1rem increment */
    grid-template-columns: repeat(auto-fit, minmax(round(nearest, var(--grid-min), 1rem), 1fr));
    gap: var(--space-md);
  }
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .card h4 { margin: 0; color: var(--color-text); }
  .card p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
