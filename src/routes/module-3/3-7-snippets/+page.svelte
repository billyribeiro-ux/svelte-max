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

  <h2>Break it on purpose</h2>
  <p class="prose">These experiments clarify how snippets work under the hood and where they differ from the old slot system.</p>
  <ol class="experiments">
    <li><strong>Use <code>&lt;slot&gt;</code> in a Svelte 5 component instead of a snippet.</strong> Svelte will emit a deprecation warning. Slots are the Svelte 4 mechanism — in Svelte 5, snippets replace them with a more flexible, fully typed alternative that supports parameters and conditional rendering.</li>
    <li><strong>Define a snippet but never <code>{`{@render}`}</code> it.</strong> No error occurs — the snippet simply never appears in the DOM. This is harmless but wasteful; it is like declaring a function you never call. Svelte does not warn about unused snippets, so you must spot them yourself.</li>
    <li><strong>Try to <code>{`{@render}`}</code> a snippet name that does not exist.</strong> You will get a runtime error because the variable is undefined. Unlike optional chaining with <code>{`{@render name?.()}`}</code>, a bare render call assumes the snippet is always defined.</li>
    <li><strong>Define two snippets with the same name in the same scope.</strong> The second definition silently overwrites the first — last one wins. This is the same behavior as declaring two variables with the same name using <code>let</code> in JavaScript.</li>
  </ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h2>What you learned</h2>
  <p class="prose">Snippets are Svelte 5's replacement for slots. You define a reusable fragment of markup with <code>{`{#snippet name(params)}`}</code> and render it with <code>{`{@render name(args)}`}</code>. Unlike slots, snippets are first-class values — they can accept typed parameters, be stored in variables, and be rendered conditionally or repeatedly.</p>
  <p class="prose">Because snippets live in the parent's scope, they have access to all the parent's variables and reactive state. This makes them ideal for small, reusable pieces of markup that do not need their own file. When a snippet grows complex enough to need its own styles or its own props, you promote it to a standalone component.</p>
  <p class="prose">The same snippet can be rendered multiple times with different arguments, just like calling a function. This is more flexible than named slots, which could only appear once per component. Snippets bring the composability of functions to your template layer, closing the gap between logic and markup.</p>
  <p class="next">Next lesson: <a href="/module-3/3-8-snippet-props">3.8 — Snippets as props</a></p>
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

  @media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

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

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
