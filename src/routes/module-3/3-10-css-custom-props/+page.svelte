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

  <h2>Break it on purpose</h2>
  <p class="prose">These experiments show how CSS custom properties cascade into components and where the mechanism has edges.</p>
  <ol class="experiments">
    <li><strong>Set <code>--card-bg</code> from the parent but do not use <code>var(--card-bg)</code> inside the child.</strong> Nothing happens — the property cascades into the child's DOM subtree, but if no rule references it, it has no visual effect. Custom properties are passive; they only matter when consumed.</li>
    <li><strong>Set a custom property directly on a component tag: <code>&lt;Card --card-bg="red"&gt;</code>.</strong> Svelte wraps the component in a <code>&lt;div style="--card-bg: red"&gt;</code> so the property scopes to that instance. This is convenient syntax but adds an extra wrapper element to the DOM.</li>
    <li><strong>Override a global design token at the component level.</strong> The local override wins because CSS custom properties follow the cascade — a value set closer to the element beats one set higher up. This is exactly how theming systems work: global tokens provide defaults, local overrides customize.</li>
    <li><strong>Set a custom property to an invalid value for the property that consumes it.</strong> CSS silently falls back to the inherited or initial value. There is no error, no warning — the browser simply ignores the invalid value and uses whatever the next fallback in the <code>var()</code> chain provides.</li>
  </ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h2>What you learned</h2>
  <p class="prose">CSS custom properties provide a theming bridge between parent and child without breaking encapsulation. The child component reads values like <code>var(--btn-bg, fallback)</code> in its scoped styles, and the parent overrides those properties from the outside using its own scoped CSS or inline styles. No new props are needed — the styling contract lives entirely in CSS.</p>
  <p class="prose">Svelte offers a shorthand for per-instance overrides: writing <code>--prop="value"</code> directly on a component tag. Under the hood, Svelte creates a wrapper <code>&lt;div&gt;</code> with the custom property set as an inline style, scoping the override to that single instance. This is convenient for one-off tweaks without adding a wrapper class yourself.</p>
  <p class="prose">Design tokens combined with custom properties form a complete theming system. Global tokens define the defaults — colors, spacing, radii — and any component or page can override individual tokens at any level of the tree. The cascade ensures that the most specific override wins, giving you fine-grained control without modifying the component's internals.</p>
  <p class="next">Next lesson: <a href="/module-3/3-11-responsive-components">3.11 — Responsive components</a></p>
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
