<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type NavItem = { id: string; label: string };

  const items: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'docs', label: 'Docs' },
    { id: 'blog', label: 'Blog' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' }
  ];

  let current = $state<string>('home');

  const select = (id: string): void => {
    current = id;
  };

  const cssSource: string = `.nav {
  display: flex;
  gap: var(--space-xs);

  & a {
    color: var(--color-text-muted);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    transition: all var(--dur-fast) var(--ease-out);

    &:hover {
      background: var(--color-surface-2);
      color: var(--color-text);
    }

    &:focus-visible {
      outline: 2px solid var(--color-brand);
    }

    &.current {
      background: var(--color-brand);
      color: var(--color-surface-1);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}`;

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type NavItem = { id: string; label: string };\n" +
		"\n" +
		"  const items: NavItem[] = [\n" +
		"    { id: 'home', label: 'Home' },\n" +
		"    { id: 'docs', label: 'Docs' },\n" +
		"    { id: 'blog', label: 'Blog' },\n" +
		"    { id: 'pricing', label: 'Pricing' },\n" +
		"    { id: 'about', label: 'About' }\n" +
		"  ];\n" +
		"\n" +
		"  let current = $state\u003cstring\u003e('home');\n" +
		"\n" +
		"  const select = (id: string): void =\u003e {\n" +
		"    current = id;\n" +
		"  };\n" +
		"\n" +
		"  const cssSource: string = `.nav {\n" +
		"  display: flex;\n" +
		"  gap: var(--space-xs);\n" +
		"\n" +
		"  & a {\n" +
		"    color: var(--color-text-muted);\n" +
		"    padding: var(--space-sm) var(--space-md);\n" +
		"    border-radius: var(--radius-md);\n" +
		"    transition: all var(--dur-fast) var(--ease-out);\n" +
		"\n" +
		"    &:hover {\n" +
		"      background: var(--color-surface-2);\n" +
		"      color: var(--color-text);\n" +
		"    }\n" +
		"\n" +
		"    &:focus-visible {\n" +
		"      outline: 2px solid var(--color-brand);\n" +
		"    }\n" +
		"\n" +
		"    &.current {\n" +
		"      background: var(--color-brand);\n" +
		"      color: var(--color-surface-1);\n" +
		"    }\n" +
		"\n" +
		"    &:active {\n" +
		"      transform: translateY(1px);\n" +
		"    }\n" +
		"  }\n" +
		"}`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.4 — Native CSS nesting in Svelte\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e CSS nesting is a native browser feature (2023+). The \u003ccode\u003e&amp;\u003c/code\u003e\n" +
		"    selector refers to the parent rule. You can nest selectors, pseudo-classes, media queries, and\n" +
		"    state selectors inside one block — no preprocessor needed. Svelte's scoped styles and native\n" +
		"    nesting compose perfectly. Keep nesting shallow (2–3 levels) to stay readable.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cnav class=\"nav\" aria-label=\"Primary\"\u003e\n" +
		"      {#each items as item (item.id)}\n" +
		"        \u003ca\n" +
		"          href=\"#{item.id}\"\n" +
		"          class:current={current === item.id}\n" +
		"          onclick={(e) =\u003e { e.preventDefault(); select(item.id); }}\n" +
		"        \u003e\n" +
		"          {item.label}\n" +
		"        \u003c/a\u003e\n" +
		"      {/each}\n" +
		"    \u003c/nav\u003e\n" +
		"\n" +
		"    \u003cp class=\"hint\"\u003eHover, focus with Tab, click — all states live in one nested block.\u003c/p\u003e\n" +
		"\n" +
		"    \u003cpre\u003e\u003ccode\u003e{cssSource}\u003c/code\u003e\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003e&amp;\u003c/code\u003e is the parent reference — required for pseudo-class nesting.\u003c/li\u003e\n" +
		"    \u003cli\u003eYou can nest state, media, and descendant rules in one block.\u003c/li\u003e\n" +
		"    \u003cli\u003eShallow nesting (2–3 levels) is still best practice for readability.\u003c/li\u003e\n" +
		"    \u003cli\u003eSvelte's scoped styles wrap nested CSS without any extra config.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.4 — Native CSS nesting in Svelte</h1>
  <p class="concept">
    <strong>Concept.</strong> CSS nesting is a native browser feature (2023+). The <code>&amp;</code>
    selector refers to the parent rule. You can nest selectors, pseudo-classes, media queries, and
    state selectors inside one block — no preprocessor needed. Svelte's scoped styles and native
    nesting compose perfectly. Keep nesting shallow (2–3 levels) to stay readable.
  </p>

  <div class="build">
    <nav class="nav" aria-label="Primary">
      {#each items as item (item.id)}
        <a
          href="#{item.id}"
          class:current={current === item.id}
          onclick={(e) => { e.preventDefault(); select(item.id); }}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <p class="hint">Hover, focus with Tab, click — all states live in one nested block.</p>

    <pre><code>{cssSource}</code></pre>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Push CSS nesting to its limits to understand where it shines and where it creates maintainability problems.</p>
	<ol class="experiments">
		<li><strong>Nest too deep (4+ levels)</strong> — specificity compounds. Each nesting level adds to the generated selector's specificity, making overrides progressively harder and your CSS more brittle.</li>
		<li><strong>Use <code>&amp;</code> explicitly vs implicitly</strong> — <code>&amp;</code> refers to the parent selector. Writing <code>&amp;:hover</code> is required for pseudo-classes, while <code>&amp; .child</code> and <code>.child</code> (without <code>&amp;</code>) produce the same descendant selector in most cases.</li>
		<li><strong>Nest <code>@media</code> inside a rule</strong> — works in modern CSS. You can place a media query inside a selector block to keep responsive adjustments co-located with the styles they modify.</li>
		<li><strong>Nest <code>@scope</code></strong> — scoped nesting for isolation. The <code>@scope</code> at-rule limits style application to a subtree, and nesting it inside a rule block produces highly targeted styles.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Native CSS nesting, available in all major browsers since 2023, eliminates the need for preprocessors like Sass or Less for one of their most popular features. The <code>&amp;</code> selector refers to the enclosing rule's selector, allowing you to write pseudo-classes (<code>&amp;:hover</code>), pseudo-elements (<code>&amp;::before</code>), compound selectors (<code>&amp;.active</code>), and descendant selectors (<code>&amp; .child</code>) all within a single block. This co-location of related styles dramatically improves readability because you can see every state, variant, and responsive adjustment for a component in one place.</p>
	<p class="prose">Svelte's scoped style system and native CSS nesting compose without friction. When Svelte adds its scoping hash to selectors, nested rules inherit the scope automatically. This means you get the organizational benefits of nesting while retaining Svelte's guarantee that styles cannot leak to other components. You can even nest <code>@media</code> queries inside selector blocks, keeping responsive adjustments physically close to the base styles they modify rather than scattered at the bottom of the file.</p>
	<p class="prose">The discipline of shallow nesting remains important even with native support. Every level of nesting increases the specificity of the generated selector, which compounds quickly. A three-level nest like <code>.nav &amp; a &amp;:hover</code> produces a selector with the combined specificity of all three levels. When you later need to override that style, you must match or exceed that specificity. Professional practice limits nesting to two or three levels and uses it primarily for states and pseudo-classes, not for expressing deep DOM hierarchies that are better served by flat class selectors.</p>
	<p class="next"><a href="/module-6/6-5-logical-props">Next lesson: 6.5 Logical properties</a></p>
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

  .hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);

    & a {
      color: var(--color-text-muted);
      text-decoration: none;
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-md);
      transition: background var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out),
                  transform var(--dur-fast) var(--ease-out);

      &:hover {
        background: var(--color-surface-2);
        color: var(--color-text);
      }

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      &.current {
        background: var(--color-brand);
        color: var(--color-surface-1);
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }

  pre {
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    overflow-x: auto;
    margin: 0;
  }

  /* @scope — CSS scoping at-rule, limits styles to .nav subtree but excludes .external links */
  @scope (.nav) to (.external) {
    a {
      font-weight: 600;
    }
  }
  pre code {
    background: transparent;
    padding: 0;
    font-size: var(--text-sm);
    color: var(--color-text);
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
