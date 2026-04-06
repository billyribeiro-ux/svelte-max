<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  interface Stat {
    icon: string;
    label: string;
    value: string;
    delta: string;
  }

  const stat: Stat = {
    icon: '▲',
    label: 'Monthly revenue',
    value: '$42,180',
    delta: '+12.4% vs last month'
  };

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Stat {\n" +
		"    icon: string;\n" +
		"    label: string;\n" +
		"    value: string;\n" +
		"    delta: string;\n" +
		"  }\n" +
		"\n" +
		"  const stat: Stat = {\n" +
		"    icon: '▲',\n" +
		"    label: 'Monthly revenue',\n" +
		"    value: '$42,180',\n" +
		"    delta: '+12.4% vs last month'\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e3.11 — Responsive components\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Media queries target the viewport, but container queries target the\n" +
		"    element's own parent. That means the same component can lay out horizontally in a wide sidebar\n" +
		"    and vertically in a narrow column — on the same page. Enable with\n" +
		"    \u003ccode\u003econtainer-type: inline-size\u003c/code\u003e on the parent, then write\n" +
		"    \u003ccode\u003e@container (min-width: 30rem)\u003c/code\u003e in the child's scoped styles.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"demo\"\u003e\n" +
		"      \u003cdiv class=\"wrapper narrow\"\u003e\n" +
		"        \u003cspan class=\"label\"\u003eContainer: 15rem\u003c/span\u003e\n" +
		"        \u003cdiv class=\"stat-card\"\u003e\n" +
		"          \u003cdiv class=\"icon\"\u003e{stat.icon}\u003c/div\u003e\n" +
		"          \u003cdiv class=\"text\"\u003e\n" +
		"            \u003cspan class=\"stat-label\"\u003e{stat.label}\u003c/span\u003e\n" +
		"            \u003cstrong class=\"value\"\u003e{stat.value}\u003c/strong\u003e\n" +
		"            \u003cspan class=\"delta\"\u003e{stat.delta}\u003c/span\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003cdiv class=\"wrapper wide\"\u003e\n" +
		"        \u003cspan class=\"label\"\u003eContainer: 40rem\u003c/span\u003e\n" +
		"        \u003cdiv class=\"stat-card\"\u003e\n" +
		"          \u003cdiv class=\"icon\"\u003e{stat.icon}\u003c/div\u003e\n" +
		"          \u003cdiv class=\"text\"\u003e\n" +
		"            \u003cspan class=\"stat-label\"\u003e{stat.label}\u003c/span\u003e\n" +
		"            \u003cstrong class=\"value\"\u003e{stat.value}\u003c/strong\u003e\n" +
		"            \u003cspan class=\"delta\"\u003e{stat.delta}\u003c/span\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cp class=\"note\"\u003e\n" +
		"      Same markup, same data — the layout responds to the container, not the viewport.\n" +
		"    \u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eSet \u003ccode\u003econtainer-type: inline-size\u003c/code\u003e on a parent to query its width.\u003c/li\u003e\n" +
		"    \u003cli\u003eUse \u003ccode\u003e@container (min-width: ...)\u003c/code\u003e inside the child's scoped styles.\u003c/li\u003e\n" +
		"    \u003cli\u003eThe same component can render differently in different slots of the same page.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>3.11 — Responsive components</h1>
  <p class="concept">
    <strong>Concept.</strong> Media queries target the viewport, but container queries target the
    element's own parent. That means the same component can lay out horizontally in a wide sidebar
    and vertically in a narrow column — on the same page. Enable with
    <code>container-type: inline-size</code> on the parent, then write
    <code>@container (min-width: 30rem)</code> in the child's scoped styles.
  </p>

  <div class="build">
    <div class="demo">
      <div class="wrapper narrow">
        <span class="label">Container: 15rem</span>
        <div class="stat-card">
          <div class="icon">{stat.icon}</div>
          <div class="text">
            <span class="stat-label">{stat.label}</span>
            <strong class="value">{stat.value}</strong>
            <span class="delta">{stat.delta}</span>
          </div>
        </div>
      </div>

      <div class="wrapper wide">
        <span class="label">Container: 40rem</span>
        <div class="stat-card">
          <div class="icon">{stat.icon}</div>
          <div class="text">
            <span class="stat-label">{stat.label}</span>
            <strong class="value">{stat.value}</strong>
            <span class="delta">{stat.delta}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="note">
      Same markup, same data — the layout responds to the container, not the viewport.
    </p>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Set <code>container-type: inline-size</code> on a parent to query its width.</li>
    <li>Use <code>@container (min-width: ...)</code> inside the child's scoped styles.</li>
    <li>The same component can render differently in different slots of the same page.</li>
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

  .demo {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .wrapper {
    container-type: inline-size;
    background: var(--color-surface-2);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
  }

  .icon {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    display: grid;
    place-items: center;
    background: var(--color-brand-dim);
    color: var(--color-brand);
    border-radius: var(--radius-sm);
    font-size: var(--text-lg);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-label {
    color: var(--color-text-muted);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value {
    color: var(--color-text);
    font-size: var(--text-xl);
  }

  .delta {
    color: var(--color-success);
    font-size: var(--text-xs);
  }

  @container (min-width: 20rem) {
    .stat-card {
      flex-direction: row;
      align-items: center;
      gap: var(--space-md);
    }
  }

  /* Container style() queries — respond to a custom property value for variant styling */
  @container style(--variant: compact) {
    .stat-card {
      padding: var(--space-sm);
    }
    .value {
      font-size: var(--text-lg);
    }
  }

  .note {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--color-text-muted);
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

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .demo {
      flex-direction: row;
      align-items: flex-start;
    }
    .wrapper.narrow { inline-size: 15rem; flex: 0 0 15rem; }
    .wrapper.wide { inline-size: 40rem; flex: 0 0 40rem; }
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
