<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type LayerRow = { source: string; layer: string; property: string; value: string };

  const rows: LayerRow[] = [
    { source: 'line 1 in source', layer: 'low', property: 'color', value: 'error red' },
    { source: 'line 2 in source', layer: 'low', property: 'font-size', value: '--text-base' },
    { source: 'line 3 in source', layer: 'high', property: 'color', value: 'success green (wins)' },
    { source: 'line 4 in source', layer: 'high', property: 'font-size', value: '--text-xl (wins)' }
  ];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type LayerRow = { source: string; layer: string; property: string; value: string };\n" +
		"\n" +
		"  const rows: LayerRow[] = [\n" +
		"    { source: 'line 1 in source', layer: 'low', property: 'color', value: 'error red' },\n" +
		"    { source: 'line 2 in source', layer: 'low', property: 'font-size', value: '--text-base' },\n" +
		"    { source: 'line 3 in source', layer: 'high', property: 'color', value: 'success green (wins)' },\n" +
		"    { source: 'line 4 in source', layer: 'high', property: 'font-size', value: '--text-xl (wins)' }\n" +
		"  ];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.1 — @layer architecture in depth\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"    \u003ccode\u003e@layer reset, tokens, base, layout, components, animations\u003c/code\u003e declares a cascade order.\n" +
		"    Later layers \u003cem\u003ealways\u003c/em\u003e win over earlier layers, regardless of selector specificity or source\n" +
		"    position. This permanently solves the \"my utility class got overridden by some random card\"\n" +
		"    problem. Each layer has a job: \u003ccode\u003ereset\u003c/code\u003e normalizes browser defaults, \u003ccode\u003etokens\u003c/code\u003e\n" +
		"    holds \u003ccode\u003e:root\u003c/code\u003e variables, \u003ccode\u003ebase\u003c/code\u003e sets element defaults, \u003ccode\u003elayout\u003c/code\u003e\n" +
		"    has page-level utilities, \u003ccode\u003ecomponents\u003c/code\u003e holds component styles, and\n" +
		"    \u003ccode\u003eanimations\u003c/code\u003e holds keyframes.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cp class=\"lead\"\u003eThe same \u003ccode\u003e.sample\u003c/code\u003e is targeted from two layers. The high layer wins.\u003c/p\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"sample\"\u003eHello from the cascade\u003c/div\u003e\n" +
		"\n" +
		"    \u003ch4\u003eReading order vs layer order\u003c/h4\u003e\n" +
		"    \u003ctable\u003e\n" +
		"      \u003cthead\u003e\n" +
		"        \u003ctr\u003e\u003cth\u003eSource\u003c/th\u003e\u003cth\u003eLayer\u003c/th\u003e\u003cth\u003eProperty\u003c/th\u003e\u003cth\u003eDeclared value\u003c/th\u003e\u003c/tr\u003e\n" +
		"      \u003c/thead\u003e\n" +
		"      \u003ctbody\u003e\n" +
		"        {#each rows as r (r.source + r.property)}\n" +
		"          \u003ctr\u003e\n" +
		"            \u003ctd\u003e\u003ccode\u003e{r.source}\u003c/code\u003e\u003c/td\u003e\n" +
		"            \u003ctd\u003e\u003ccode\u003e{r.layer}\u003c/code\u003e\u003c/td\u003e\n" +
		"            \u003ctd\u003e\u003ccode\u003e{r.property}\u003c/code\u003e\u003c/td\u003e\n" +
		"            \u003ctd\u003e{r.value}\u003c/td\u003e\n" +
		"          \u003c/tr\u003e\n" +
		"        {/each}\n" +
		"      \u003c/tbody\u003e\n" +
		"    \u003c/table\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eLayer order beats specificity and source order.\u003c/li\u003e\n" +
		"    \u003cli\u003eDeclare the order once at the top with \u003ccode\u003e@layer a, b, c;\u003c/code\u003e.\u003c/li\u003e\n" +
		"    \u003cli\u003eTypical PE7 order: reset, tokens, base, layout, components, animations.\u003c/li\u003e\n" +
		"    \u003cli\u003eUnlayered styles win over layered ones — use that for true overrides.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.1 — @layer architecture in depth</h1>
  <p class="concept">
    <strong>Concept.</strong>
    <code>@layer reset, tokens, base, layout, components, animations</code> declares a cascade order.
    Later layers <em>always</em> win over earlier layers, regardless of selector specificity or source
    position. This permanently solves the "my utility class got overridden by some random card"
    problem. Each layer has a job: <code>reset</code> normalizes browser defaults, <code>tokens</code>
    holds <code>:root</code> variables, <code>base</code> sets element defaults, <code>layout</code>
    has page-level utilities, <code>components</code> holds component styles, and
    <code>animations</code> holds keyframes.
  </p>

  <div class="build">
    <p class="lead">The same <code>.sample</code> is targeted from two layers. The high layer wins.</p>

    <div class="sample">Hello from the cascade</div>

    <h4>Reading order vs layer order</h4>
    <table>
      <thead>
        <tr><th>Source</th><th>Layer</th><th>Property</th><th>Declared value</th></tr>
      </thead>
      <tbody>
        {#each rows as r (r.source + r.property)}
          <tr>
            <td><code>{r.source}</code></td>
            <td><code>{r.layer}</code></td>
            <td><code>{r.property}</code></td>
            <td>{r.value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try these experiments to see how cascade layers actually resolve conflicts and why the declaration order matters more than you might expect.</p>
	<ol class="experiments">
		<li><strong>Put a rule outside any @layer</strong> — it beats EVERYTHING. Unlayered styles have higher priority than any layer, regardless of specificity or source order.</li>
		<li><strong>Swap two layer declarations</strong> — watch specificity order change. The order in the <code>@layer</code> statement determines which layer wins, so reordering flips the outcome.</li>
		<li><strong>Delete the reset layer</strong> — browser defaults leak through. Without a reset layer normalizing element styles, you get inconsistent margins, padding, and font sizes across browsers.</li>
		<li><strong>Add !important in the tokens layer</strong> — it overrides higher layers. Important declarations in lower layers actually beat normal declarations in higher layers, inverting the usual cascade.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Cascade layers fundamentally change how CSS specificity conflicts are resolved. Instead of relying on selector weight or source order to determine which rule wins, <code>@layer</code> introduces a new, higher-priority axis to the cascade. When you declare <code>@layer reset, tokens, base, layout, components, animations;</code> at the top of your stylesheet, you establish a deterministic order that no amount of selector specificity can override. A simple <code>.card</code> selector in the components layer will always beat an <code>#app .wrapper .card</code> selector in the base layer. This eliminates the entire class of bugs where utility classes lose to deeply nested component selectors.</p>
	<p class="prose">The architecture behind layering mirrors how professional design systems separate concerns. The reset layer strips away browser defaults so every element starts from a known baseline. The tokens layer defines all design tokens as custom properties on <code>:root</code>. The base layer applies those tokens to bare HTML elements. Layout handles page-level structures, components encapsulate scoped styles, and animations hold keyframes. Each layer has a single responsibility, and the cascade order ensures that more specific layers naturally override more general ones without any developer intervention.</p>
	<p class="prose">One subtle but critical behavior is that unlayered styles always beat layered ones. This means any CSS written outside of a <code>@layer</code> block sits at the very top of the cascade hierarchy, making it the ideal escape hatch for one-off overrides during development or debugging. Additionally, <code>!important</code> declarations inside layers invert the layer order -- an important rule in a lower layer beats an important rule in a higher layer. Understanding these edge cases prevents confusion when layered architectures interact with third-party CSS that may use importance liberally.</p>
	<p class="next"><a href="/module-6/6-2-oklch-deep">Next lesson: 6.2 OKLCH in depth</a></p>
</section>

<style>
  @layer low, high;

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
  .lead { margin: 0; color: var(--color-text-muted); }
  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-2);
    padding: 0 var(--space-xs);
    border-radius: var(--radius-xs);
  }
  h4 { margin: 0; color: var(--color-text); }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
  table {
    inline-size: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
  }
  th, td {
    text-align: start;
    padding: var(--space-sm);
    border-block-end: 1px solid var(--color-border);
    color: var(--color-text);
  }
  th { color: var(--color-text-muted); font-weight: 600; }

  @layer low {
    .sample {
      color: var(--color-error);
      font-size: var(--text-base);
      padding: var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-2);
    }
  }

  @layer high {
    .sample {
      color: var(--color-success);
      font-size: var(--text-xl);
    }
  }

  @media (min-inline-size: 768px) {
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
