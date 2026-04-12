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

  <h2>Break it on purpose</h2>
  <p class="prose">These experiments clarify the difference between viewport-based and container-based responsive design.</p>
  <ol class="experiments">
    <li><strong>Use <code>@media</code> for component-level responsiveness.</strong> The component responds to the viewport width, not its own container. Resize the browser and notice that a narrow sidebar card switches layout at the same breakpoint as a full-width card — that is wrong because the sidebar card is always narrow regardless of viewport size.</li>
    <li><strong>Switch to <code>@container</code> queries.</strong> Now the component responds to the width of its parent container, not the viewport. The sidebar card stays in its narrow layout even on a wide screen, while the full-width card switches to horizontal. This is true component-level responsiveness.</li>
    <li><strong>Forget to set <code>container-type: inline-size</code> on the parent element.</strong> The <code>@container</code> query silently does nothing because there is no containment context to query against. This is the most common container query mistake — the rule requires an explicit opt-in on an ancestor.</li>
    <li><strong>Nest containers by setting <code>container-type</code> on both a grandparent and a parent.</strong> The inner <code>@container</code> query measures the nearest ancestor with <code>container-type</code>. This is useful for compound layouts but can be confusing if you forget which ancestor is being measured.</li>
  </ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h2>What you learned</h2>
  <p class="prose">Responsive components use <code>@container</code> queries instead of <code>@media</code> queries. While media queries respond to the viewport — the browser window — container queries respond to the size of the nearest ancestor that has <code>container-type: inline-size</code>. This distinction is what makes components truly reusable: the same card can lay out vertically in a narrow sidebar and horizontally in a wide content area, on the same page, at the same viewport width.</p>
  <p class="prose">To enable container queries, you must set <code>container-type: inline-size</code> on the parent element. Without this declaration, <code>@container</code> rules silently have no effect. Inside the child's scoped styles, you write <code>@container (min-width: 20rem)</code> to define breakpoints relative to the container's width rather than the screen's width.</p>
  <p class="prose">Container queries complete the encapsulation story for Svelte components. Scoped styles keep CSS from leaking out, custom properties let parents theme from the outside, and container queries let the component adapt its own layout to wherever it is placed. Together, these three features make a component a truly portable, self-contained unit of UI.</p>
  <p class="next">Next up: <a href="/module-3/project">Module 3 Project</a></p>
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

  @container (min-inline-size: 20rem) {
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

  @media (min-inline-size: 768px) {
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
