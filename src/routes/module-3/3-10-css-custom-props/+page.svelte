<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import Button from '$lib/components/Button.svelte';

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Button from '$lib/components/Button.svelte';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e3.10 — CSS custom properties bridge\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Scoped styles encapsulate a component, but sometimes a caller needs to\n" +
		"    tweak its appearance without a prop for every variant. CSS custom properties are the bridge: the\n" +
		"    component reads \u003ccode\u003evar(--btn-bg, default)\u003c/code\u003e, and a parent's scoped CSS or an inline\n" +
		"    \u003ccode\u003estyle\u003c/code\u003e attribute overrides it. Per-instance theming, zero prop explosion.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cp\u003eAll four buttons use \u003ccode\u003evariant=\"primary\"\u003c/code\u003e — only the parent's scoped CSS differs.\u003c/p\u003e\n" +
		"    \u003cdiv class=\"row\"\u003e\n" +
		"      \u003cdiv class=\"btn-brand-default\"\u003e\n" +
		"        \u003cButton variant=\"primary\"\u003eDefault\u003c/Button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"btn-brand-teal\"\u003e\n" +
		"        \u003cButton variant=\"primary\"\u003eTeal\u003c/Button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"btn-brand-amber\"\u003e\n" +
		"        \u003cButton variant=\"primary\"\u003eAmber\u003c/Button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"btn-brand-rose\"\u003e\n" +
		"        \u003cButton variant=\"primary\"\u003eRose\u003c/Button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eExpose a component's theme via custom properties, not props.\u003c/li\u003e\n" +
		"    \u003cli\u003eParents override using scoped CSS targeting descendant elements.\u003c/li\u003e\n" +
		"    \u003cli\u003eThe component stays closed — internals never change.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>3.10 — CSS custom properties bridge</h1>
  <p class="concept">
    <strong>Concept.</strong> Scoped styles encapsulate a component, but sometimes a caller needs to
    tweak its appearance without a prop for every variant. CSS custom properties are the bridge: the
    component reads <code>var(--btn-bg, default)</code>, and a parent's scoped CSS or an inline
    <code>style</code> attribute overrides it. Per-instance theming, zero prop explosion.
  </p>

  <div class="build">
    <p>All four buttons use <code>variant="primary"</code> — only the parent's scoped CSS differs.</p>
    <div class="row">
      <div class="btn-brand-default">
        <Button variant="primary">Default</Button>
      </div>
      <div class="btn-brand-teal">
        <Button variant="primary">Teal</Button>
      </div>
      <div class="btn-brand-amber">
        <Button variant="primary">Amber</Button>
      </div>
      <div class="btn-brand-rose">
        <Button variant="primary">Rose</Button>
      </div>
    </div>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Expose a component's theme via custom properties, not props.</li>
    <li>Parents override using scoped CSS targeting descendant elements.</li>
    <li>The component stays closed — internals never change.</li>
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

  .row {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }

  /* @scope — CSS scoping at-rule for variant isolation, styles only apply within each brand wrapper */
  @scope (.btn-brand-teal) {
    :scope {
      --btn-text: oklch(100% 0 0);
    }
  }

  .btn-brand-default {
    --btn-bg: var(--color-brand);
    --btn-border: var(--color-brand);
  }
  /*
    These OKLCH values are not global tokens — they're per-instance overrides
    demonstrating the CSS custom property bridge. In production, you might
    derive these from a theme configuration.
  */
  .btn-brand-teal {
    --btn-bg: oklch(66% 0.13 190);
    --btn-border: oklch(56% 0.13 190);
  }
  .btn-brand-amber {
    --btn-bg: oklch(78% 0.15 75);
    --btn-border: oklch(68% 0.15 75);
  }
  .btn-brand-rose {
    --btn-bg: oklch(66% 0.18 15);
    --btn-border: oklch(56% 0.18 15);
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
