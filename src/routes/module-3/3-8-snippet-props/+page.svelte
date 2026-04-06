<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import Card from '$lib/components/Card.svelte';

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Card from '$lib/components/Card.svelte';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e3.8 — Snippets as props\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Snippets become first-class props. Import the \u003ccode\u003eSnippet\u003c/code\u003e type from\n" +
		"    \u003ccode\u003esvelte\u003c/code\u003e and declare them on your \u003ccode\u003einterface Props\u003c/code\u003e. A child snippet passed\n" +
		"    directly between tags is the implicit \u003ccode\u003echildren\u003c/code\u003e; named ones like \u003ccode\u003eheader\u003c/code\u003e\n" +
		"    are passed explicitly. Parameterized versions use \u003ccode\u003eSnippet&lt;[arg: T]&gt;\u003c/code\u003e.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cCard\u003e\n" +
		"      {#snippet children()}\n" +
		"        \u003cp\u003eThis card only uses the default \u003ccode\u003echildren\u003c/code\u003e snippet.\u003c/p\u003e\n" +
		"        \u003cp\u003eAny markup the parent places here ends up inside the body.\u003c/p\u003e\n" +
		"      {/snippet}\n" +
		"    \u003c/Card\u003e\n" +
		"\n" +
		"    \u003cCard\u003e\n" +
		"      {#snippet header()}\n" +
		"        \u003ch2\u003eFeatured\u003c/h2\u003e\n" +
		"      {/snippet}\n" +
		"      {#snippet children()}\n" +
		"        \u003cp\u003eThis card adds a named \u003ccode\u003eheader\u003c/code\u003e snippet above the body.\u003c/p\u003e\n" +
		"      {/snippet}\n" +
		"    \u003c/Card\u003e\n" +
		"\n" +
		"    \u003cCard elevated\u003e\n" +
		"      {#snippet header()}\n" +
		"        \u003ch2\u003eSubscription\u003c/h2\u003e\n" +
		"      {/snippet}\n" +
		"      {#snippet children()}\n" +
		"        \u003cp\u003eFull coverage with three snippets: header, children, footer.\u003c/p\u003e\n" +
		"        \u003cp\u003eEach slot accepts arbitrary markup from the caller.\u003c/p\u003e\n" +
		"      {/snippet}\n" +
		"      {#snippet footer()}\n" +
		"        \u003cspan\u003eUpdated today · Free trial available\u003c/span\u003e\n" +
		"      {/snippet}\n" +
		"    \u003c/Card\u003e\n" +
		"\n" +
		"    \u003ch3 class=\"sub-heading\"\u003eParameterized snippets\u003c/h3\u003e\n" +
		"    \u003cp class=\"param-intro\"\u003e\n" +
		"      Snippets can accept parameters via \u003ccode\u003eSnippet&lt;[arg: T]&gt;\u003c/code\u003e.\n" +
		"      The parent defines the snippet with typed arguments, and the child renders it\n" +
		"      by passing values at the call site.\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    \u003cCard\u003e\n" +
		"      {#snippet header()}\n" +
		"        \u003ch2\u003eOrder Summary\u003c/h2\u003e\n" +
		"      {/snippet}\n" +
		"      {#snippet children()}\n" +
		"        \u003cp\u003eThis card demonstrates a parameterized footer snippet.\u003c/p\u003e\n" +
		"        \u003cp\u003eThe parent defines \u003ccode\u003e{'{#snippet footer(total: number)}'}\u003c/code\u003e and\n" +
		"           the Card renders it with \u003ccode\u003e{'{@render footer(42)}'}\u003c/code\u003e.\u003c/p\u003e\n" +
		"      {/snippet}\n" +
		"      {#snippet footer()}\n" +
		"        \u003cp class=\"param-total\"\u003eTotal: $42\u003c/p\u003e\n" +
		"      {/snippet}\n" +
		"    \u003c/Card\u003e\n" +
		"\n" +
		"    \u003cpre class=\"code-sample\"\u003e{`// In the child component's Props interface:\n" +
		"interface Props {\n" +
		"  footer?: Snippet\u003c[total: number]\u003e;\n" +
		"}\n" +
		"\n" +
		"// The child renders the snippet with a value:\n" +
		"{@render footer?.(42)}\n" +
		"\n" +
		"// The parent defines the snippet with a typed parameter:\n" +
		"{#snippet footer(total: number)}\n" +
		"  \u003cp\u003eTotal: \\${total}\u003c/p\u003e\n" +
		"{/snippet}`}\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eDeclare snippet props with the \u003ccode\u003eSnippet\u003c/code\u003e type from \u003ccode\u003esvelte\u003c/code\u003e.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003echildren\u003c/code\u003e is the implicit default snippet.\u003c/li\u003e\n" +
		"    \u003cli\u003eNamed snippets are passed inside the component tags.\u003c/li\u003e\n" +
		"    \u003cli\u003eUse \u003ccode\u003e{`{@render name?.()}`}\u003c/code\u003e for optional snippets.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eSnippet&lt;[arg: T]&gt;\u003c/code\u003e types snippet parameters for full type safety.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>3.8 — Snippets as props</h1>
  <p class="concept">
    <strong>Concept.</strong> Snippets become first-class props. Import the <code>Snippet</code> type from
    <code>svelte</code> and declare them on your <code>interface Props</code>. A child snippet passed
    directly between tags is the implicit <code>children</code>; named ones like <code>header</code>
    are passed explicitly. Parameterized versions use <code>Snippet&lt;[arg: T]&gt;</code>.
  </p>

  <div class="build">
    <Card>
      {#snippet children()}
        <p>This card only uses the default <code>children</code> snippet.</p>
        <p>Any markup the parent places here ends up inside the body.</p>
      {/snippet}
    </Card>

    <Card>
      {#snippet header()}
        <h2>Featured</h2>
      {/snippet}
      {#snippet children()}
        <p>This card adds a named <code>header</code> snippet above the body.</p>
      {/snippet}
    </Card>

    <Card elevated>
      {#snippet header()}
        <h2>Subscription</h2>
      {/snippet}
      {#snippet children()}
        <p>Full coverage with three snippets: header, children, footer.</p>
        <p>Each slot accepts arbitrary markup from the caller.</p>
      {/snippet}
      {#snippet footer()}
        <span>Updated today · Free trial available</span>
      {/snippet}
    </Card>

    <h3 class="sub-heading">Parameterized snippets</h3>
    <p class="param-intro">
      Snippets can accept parameters via <code>Snippet&lt;[arg: T]&gt;</code>.
      The parent defines the snippet with typed arguments, and the child renders it
      by passing values at the call site.
    </p>

    <Card>
      {#snippet header()}
        <h2>Order Summary</h2>
      {/snippet}
      {#snippet children()}
        <p>This card demonstrates a parameterized footer snippet.</p>
        <p>The parent defines <code>{'{#snippet footer(total: number)}'}</code> and
           the Card renders it with <code>{'{@render footer(42)}'}</code>.</p>
      {/snippet}
      {#snippet footer()}
        <p class="param-total">Total: $42</p>
      {/snippet}
    </Card>

    <pre class="code-sample">{`// In the child component's Props interface:
interface Props {
  footer?: Snippet<[total: number]>;
}

// The child renders the snippet with a value:
{@render footer?.(42)}

// The parent defines the snippet with a typed parameter:
{#snippet footer(total: number)}
  <p>Total: \${total}</p>
{/snippet}`}</pre>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Declare snippet props with the <code>Snippet</code> type from <code>svelte</code>.</li>
    <li><code>children</code> is the implicit default snippet.</li>
    <li>Named snippets are passed inside the component tags.</li>
    <li>Use <code>{`{@render name?.()}`}</code> for optional snippets.</li>
    <li><code>Snippet&lt;[arg: T]&gt;</code> types snippet parameters for full type safety.</li>
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

  .sub-heading {
    margin-block-start: var(--space-lg);
    margin-block-end: var(--space-xs);
    font-size: var(--text-lg);
    color: var(--color-text);
  }

  .param-intro {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0 0 var(--space-md) 0;
  }

  .param-total {
    margin: 0;
    font-weight: 700;
    font-size: var(--text-lg);
    color: var(--color-brand, var(--color-text));
  }

  .code-sample {
    margin-block-start: var(--space-md);
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    overflow-x: auto;
    line-height: 1.6;
    white-space: pre;
    color: var(--color-text);
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
