<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  const prices: number[] = [99, 1299, 24999];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"const prices: number[] = [99, 1299, 24999];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e3.7 — Snippets\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Snippets replace Svelte 4 slots. You define a reusable fragment with\n" +
		"    \u003ccode\u003e{`{#snippet name()}...{/snippet}`}\u003c/code\u003e and invoke it with \u003ccode\u003e{`{@render name()}`}\u003c/code\u003e.\n" +
		"    They are fully typed, parameterized, and behave like values — you can store them, pass them, and\n" +
		"    render them conditionally.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  {#snippet priceTag(price: number)}\n" +
		"    \u003cspan class=\"price\"\u003e${price.toLocaleString()}\u003c/span\u003e\n" +
		"  {/snippet}\n" +
		"\n" +
		"  {#snippet divider()}\n" +
		"    \u003chr class=\"divider\" /\u003e\n" +
		"  {/snippet}\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eProduct prices\u003c/h2\u003e\n" +
		"    \u003cul class=\"prices\"\u003e\n" +
		"      {#each prices as price}\n" +
		"        \u003cli\u003e\n" +
		"          \u003cspan class=\"label\"\u003eItem {price}\u003c/span\u003e\n" +
		"          {@render priceTag(price)}\n" +
		"        \u003c/li\u003e\n" +
		"      {/each}\n" +
		"    \u003c/ul\u003e\n" +
		"\n" +
		"    {@render divider()}\n" +
		"\n" +
		"    \u003cp class=\"note\"\u003e\n" +
		"      Snippets are like mini-components that live inside the parent's scope — when you outgrow one,\n" +
		"      you promote it to a file.\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    {@render divider()}\n" +
		"\n" +
		"    \u003cp\u003eThe same \u003ccode\u003epriceTag\u003c/code\u003e snippet, reused inline: {@render priceTag(42)} and {@render priceTag(777)}.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eDefine reusable markup with \u003ccode\u003e{`{#snippet}`}\u003c/code\u003e and invoke with \u003ccode\u003e{`{@render}`}\u003c/code\u003e.\u003c/li\u003e\n" +
		"    \u003cli\u003eSnippets accept typed parameters like a function.\u003c/li\u003e\n" +
		"    \u003cli\u003eSame snippet can be rendered any number of times with different arguments.\u003c/li\u003e\n" +
		"    \u003cli\u003eThey live in the parent scope — promote to a component when they grow.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>3.7 — Snippets</h1>
  <p class="concept">
    <strong>Concept.</strong> Snippets replace Svelte 4 slots. You define a reusable fragment with
    <code>{`{#snippet name()}...{/snippet}`}</code> and invoke it with <code>{`{@render name()}`}</code>.
    They are fully typed, parameterized, and behave like values — you can store them, pass them, and
    render them conditionally.
  </p>

  {#snippet priceTag(price: number)}
    <span class="price">${price.toLocaleString()}</span>
  {/snippet}

  {#snippet divider()}
    <hr class="divider" />
  {/snippet}

  <div class="build">
    <h2>Product prices</h2>
    <ul class="prices">
      {#each prices as price}
        <li>
          <span class="label">Item {price}</span>
          {@render priceTag(price)}
        </li>
      {/each}
    </ul>

    {@render divider()}

    <p class="note">
      Snippets are like mini-components that live inside the parent's scope — when you outgrow one,
      you promote it to a file.
    </p>

    {@render divider()}

    <p>The same <code>priceTag</code> snippet, reused inline: {@render priceTag(42)} and {@render priceTag(777)}.</p>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Define reusable markup with <code>{`{#snippet}`}</code> and invoke with <code>{`{@render}`}</code>.</li>
    <li>Snippets accept typed parameters like a function.</li>
    <li>Same snippet can be rendered any number of times with different arguments.</li>
    <li>They live in the parent scope — promote to a component when they grow.</li>
  </ul>
</section>

<style>
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

  .build h2 {
    margin: 0;
    font-size: var(--text-lg);
  }

  .prices {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .prices li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface-2);
    border-radius: var(--radius-sm);
  }

  .label { color: var(--color-text-muted); }

  .price {
    font-family: var(--font-mono);
    color: var(--color-brand);
    font-weight: 600;
  }

  .divider {
    border: none;
    border-block-start: 1px dashed var(--color-border);
    margin: 0;
  }

  .note {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    font-style: italic;
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-2);
    padding: 0 var(--space-xs);
    border-radius: var(--radius-xs);
  }

  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

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

  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
