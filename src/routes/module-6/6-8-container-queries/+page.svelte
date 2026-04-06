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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>container-type: inline-size</code> turns a parent into a query target.</li>
    <li><code>@container (min-width: ...)</code> reacts to the parent, not the viewport.</li>
    <li>Same component markup, different layout per container — true reuse.</li>
    <li>Name containers with <code>container-name</code> to disambiguate ancestors.</li>
  </ul>
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

  @container (min-width: 20rem) {
    .widget {
      flex-direction: row;
      text-align: start;
      align-items: center;
    }
    .content h4 { font-size: var(--text-lg); }
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
