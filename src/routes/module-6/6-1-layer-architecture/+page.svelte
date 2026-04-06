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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Layer order beats specificity and source order.</li>
    <li>Declare the order once at the top with <code>@layer a, b, c;</code>.</li>
    <li>Typical PE7 order: reset, tokens, base, layout, components, animations.</li>
    <li>Unlayered styles win over layered ones — use that for true overrides.</li>
  </ul>
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
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  h4 { margin: 0; color: var(--color-text); }
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
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
