<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type Widget = { icon: string; title: string; body: string };

  const widget: Widget = {
    icon: 'W',
    title: 'Weather Widget',
    body: 'Adapts to its container, not the viewport.'
  };

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Widget = { icon: string; title: string; body: string };\n" +
		"\n" +
		"  const widget: Widget = {\n" +
		"    icon: 'W',\n" +
		"    title: 'Weather Widget',\n" +
		"    body: 'Adapts to its container, not the viewport.'\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.8 — Container queries\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Media queries target the viewport — but a \"card\" component doesn't\n" +
		"    know whether it lives in a narrow sidebar or a wide main column. Container queries target the\n" +
		"    component's \u003cem\u003eown\u003c/em\u003e container. You set \u003ccode\u003econtainer-type: inline-size\u003c/code\u003e on a parent\n" +
		"    and the child uses \u003ccode\u003e@container (min-width: 30rem)\u003c/code\u003e in its scoped styles. The same\n" +
		"    component now adapts to its container, not the viewport — true reusability.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"demo\"\u003e\n" +
		"      \u003cdiv class=\"narrow\"\u003e\n" +
		"        \u003cp class=\"caption\"\u003eInside a 240px column\u003c/p\u003e\n" +
		"        \u003cdiv class=\"container\"\u003e\n" +
		"          \u003carticle class=\"widget\"\u003e\n" +
		"            \u003cdiv class=\"icon\"\u003e{widget.icon}\u003c/div\u003e\n" +
		"            \u003cdiv class=\"content\"\u003e\n" +
		"              \u003ch4\u003e{widget.title}\u003c/h4\u003e\n" +
		"              \u003cp\u003e{widget.body}\u003c/p\u003e\n" +
		"            \u003c/div\u003e\n" +
		"          \u003c/article\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003cdiv class=\"wide\"\u003e\n" +
		"        \u003cp class=\"caption\"\u003eInside a full-width row\u003c/p\u003e\n" +
		"        \u003cdiv class=\"container\"\u003e\n" +
		"          \u003carticle class=\"widget\"\u003e\n" +
		"            \u003cdiv class=\"icon\"\u003e{widget.icon}\u003c/div\u003e\n" +
		"            \u003cdiv class=\"content\"\u003e\n" +
		"              \u003ch4\u003e{widget.title}\u003c/h4\u003e\n" +
		"              \u003cp\u003e{widget.body}\u003c/p\u003e\n" +
		"            \u003c/div\u003e\n" +
		"          \u003c/article\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003econtainer-type: inline-size\u003c/code\u003e turns a parent into a query target.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003e@container (min-width: ...)\u003c/code\u003e reacts to the parent, not the viewport.\u003c/li\u003e\n" +
		"    \u003cli\u003eSame component markup, different layout per container — true reuse.\u003c/li\u003e\n" +
		"    \u003cli\u003eName containers with \u003ccode\u003econtainer-name\u003c/code\u003e to disambiguate ancestors.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.8 — Container queries</h1>
  <p class="concept">
    <strong>Concept.</strong> Media queries target the viewport — but a "card" component doesn't
    know whether it lives in a narrow sidebar or a wide main column. Container queries target the
    component's <em>own</em> container. You set <code>container-type: inline-size</code> on a parent
    and the child uses <code>@container (min-width: 30rem)</code> in its scoped styles. The same
    component now adapts to its container, not the viewport — true reusability.
  </p>

  <div class="build">
    <div class="demo">
      <div class="narrow">
        <p class="caption">Inside a 240px column</p>
        <div class="container">
          <article class="widget">
            <div class="icon">{widget.icon}</div>
            <div class="content">
              <h4>{widget.title}</h4>
              <p>{widget.body}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="wide">
        <p class="caption">Inside a full-width row</p>
        <div class="container">
          <article class="widget">
            <div class="icon">{widget.icon}</div>
            <div class="content">
              <h4>{widget.title}</h4>
              <p>{widget.body}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Experiment with container queries to understand the relationship between containment context and query behavior.</p>
	<ol class="experiments">
		<li><strong>Use <code>@container</code> without <code>container-type</code></strong> — query doesn't work. The browser needs an explicit containment context to measure; without <code>container-type: inline-size</code>, the query has nothing to evaluate against.</li>
		<li><strong>Add <code>container-type: inline-size</code></strong> — queries work. Setting containment on the parent establishes a measurement context, and the child's <code>@container</code> rules now fire based on the parent's actual width.</li>
		<li><strong>Use <code>@container style(--variant: compact)</code></strong> — style-based queries. Container style queries let you respond to custom property values on an ancestor, enabling variant-driven styling without JavaScript.</li>
		<li><strong>Nest containers</strong> — inner measures nearest container ancestor. When multiple ancestors have <code>container-type</code>, <code>@container</code> queries match the closest one unless you specify a <code>container-name</code>.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Container queries solve a problem that media queries fundamentally cannot: making a component responsive to its own context rather than the viewport. A card component placed in a narrow sidebar should display vertically, while the same card in a wide main column should display horizontally. Media queries cannot distinguish between these two contexts because they only measure the viewport. Container queries measure the component's own parent container, enabling truly reusable components that adapt their layout to wherever they are placed in the DOM tree.</p>
	<p class="prose">The mechanism requires two parts: a containment context and a query. Setting <code>container-type: inline-size</code> on a parent element tells the browser to track that element's inline dimension and make it available for queries. Child elements can then use <code>@container (min-width: 20rem)</code> to conditionally apply styles based on the container's actual width. You can name containers with <code>container-name: card-wrapper</code> and target them explicitly with <code>@container card-wrapper (min-width: 30rem)</code>, which prevents ambiguity when multiple containment contexts are nested.</p>
	<p class="prose">Container style queries extend this model beyond dimensions. The <code>@container style(--variant: compact)</code> syntax lets you query the computed value of a custom property on an ancestor container. This opens a powerful pattern where a parent sets a custom property like <code>--variant: compact</code>, and descendant components automatically adjust their padding, font sizes, and layout density in response. Combined with Svelte's scoped styles, container queries make it possible to build component libraries that are genuinely context-independent, adapting seamlessly to any layout context without prop drilling or JavaScript-based resize observers.</p>
	<p class="next"><a href="/module-6/6-9-page-personalities">Next lesson: 6.9 Page personalities</a></p>
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

  .demo {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }
  .narrow { inline-size: 240px; max-inline-size: 100%; }
  .wide { inline-size: 100%; }
  .caption {
    margin: 0 0 var(--space-xs);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }

  .container {
    container-type: inline-size;
    background: var(--color-surface-2);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
  }

  .widget {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    align-items: center;
    text-align: center;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
  }
  .icon {
    inline-size: 3rem;
    block-size: 3rem;
    border-radius: var(--radius-full);
    background: var(--color-brand);
    color: var(--color-surface-1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    font-weight: 700;
    flex-shrink: 0;
  }
  .content { display: flex; flex-direction: column; gap: var(--space-xs); }
  .content h4 { margin: 0; color: var(--color-text); font-size: var(--text-base); }
  .content p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  @container (min-inline-size: 20rem) {
    .widget {
      flex-direction: row;
      text-align: start;
      align-items: center;
    }
    .content h4 { font-size: var(--text-lg); }
  }

  /* Container style() queries — respond to a custom property value on the container, not just size */
  @container style(--variant: compact) {
    .widget {
      padding: var(--space-sm);
      gap: var(--space-xs);
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
