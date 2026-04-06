<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type Link = { id: string; label: string };

  const links: Link[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' }
  ];

  let active = $state<string>('dashboard');

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Link = { id: string; label: string };\n" +
		"\n" +
		"  const links: Link[] = [\n" +
		"    { id: 'dashboard', label: 'Dashboard' },\n" +
		"    { id: 'projects', label: 'Projects' },\n" +
		"    { id: 'team', label: 'Team' },\n" +
		"    { id: 'reports', label: 'Reports' },\n" +
		"    { id: 'settings', label: 'Settings' }\n" +
		"  ];\n" +
		"\n" +
		"  let active = $state\u003cstring\u003e('dashboard');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.7 — Flexbox patterns\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Flexbox excels at 1D layouts and intrinsic wrapping.\n" +
		"    \u003ccode\u003eflex-wrap: wrap\u003c/code\u003e combined with \u003ccode\u003eflex: 1 1 16rem\u003c/code\u003e gives you a responsive\n" +
		"    row of equal-ish items. \u003ccode\u003egap\u003c/code\u003e replaces the old margin hack. The holy-grail layout\n" +
		"    (header / sidebar / main / footer) is a classic flexbox pattern. Use flex for navbars, button\n" +
		"    rows, and inline groups.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"layout\"\u003e\n" +
		"      \u003caside class=\"sidebar\"\u003e\n" +
		"        \u003ch4\u003eMenu\u003c/h4\u003e\n" +
		"        \u003cnav\u003e\n" +
		"          {#each links as link (link.id)}\n" +
		"            \u003cbutton\n" +
		"              class:active={active === link.id}\n" +
		"              onclick={() =\u003e { active = link.id; }}\n" +
		"            \u003e\n" +
		"              {link.label}\n" +
		"            \u003c/button\u003e\n" +
		"          {/each}\n" +
		"        \u003c/nav\u003e\n" +
		"      \u003c/aside\u003e\n" +
		"\n" +
		"      \u003cmain class=\"main\"\u003e\n" +
		"        \u003ch4\u003e{links.find((l) =\u003e l.id === active)?.label ?? ''}\u003c/h4\u003e\n" +
		"        \u003cp\u003e\n" +
		"          On mobile the sidebar becomes a horizontal scrollable strip at the top. At 768px+ it\n" +
		"          snaps to the inline-start as a 240px column.\n" +
		"        \u003c/p\u003e\n" +
		"        \u003cp\u003e\n" +
		"          The entire layout is one flex container — the only media query flips\n" +
		"          \u003ccode\u003eflex-direction\u003c/code\u003e from \u003ccode\u003ecolumn\u003c/code\u003e to \u003ccode\u003erow\u003c/code\u003e.\n" +
		"        \u003c/p\u003e\n" +
		"        \u003cp\u003e\n" +
		"          Use flex for this kind of thing; reach for Grid when you need real 2D alignment across\n" +
		"          rows and columns.\n" +
		"        \u003c/p\u003e\n" +
		"      \u003c/main\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eflex-direction\u003c/code\u003e + one media query delivers the sidebar pattern.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eflex: 1 1 16rem\u003c/code\u003e means grow, shrink, basis — the wrap recipe.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egap\u003c/code\u003e on flex containers finally kills the margin hack.\u003c/li\u003e\n" +
		"    \u003cli\u003eFlex for 1D; Grid for 2D. Don't fight either one.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.7 — Flexbox patterns</h1>
  <p class="concept">
    <strong>Concept.</strong> Flexbox excels at 1D layouts and intrinsic wrapping.
    <code>flex-wrap: wrap</code> combined with <code>flex: 1 1 16rem</code> gives you a responsive
    row of equal-ish items. <code>gap</code> replaces the old margin hack. The holy-grail layout
    (header / sidebar / main / footer) is a classic flexbox pattern. Use flex for navbars, button
    rows, and inline groups.
  </p>

  <div class="build">
    <div class="layout">
      <aside class="sidebar">
        <h4>Menu</h4>
        <nav>
          {#each links as link (link.id)}
            <button
              class:active={active === link.id}
              onclick={() => { active = link.id; }}
            >
              {link.label}
            </button>
          {/each}
        </nav>
      </aside>

      <main class="main">
        <h4>{links.find((l) => l.id === active)?.label ?? ''}</h4>
        <p>
          On mobile the sidebar becomes a horizontal scrollable strip at the top. At 768px+ it
          snaps to the inline-start as a 240px column.
        </p>
        <p>
          The entire layout is one flex container — the only media query flips
          <code>flex-direction</code> from <code>column</code> to <code>row</code>.
        </p>
        <p>
          Use flex for this kind of thing; reach for Grid when you need real 2D alignment across
          rows and columns.
        </p>
      </main>
    </div>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Push flexbox to its limits to understand the subtle behaviors of shrinking, wrapping, and gap spacing.</p>
	<ol class="experiments">
		<li><strong><code>flex:1</code> without <code>min-width:0</code></strong> — flex items refuse to shrink below content. The default <code>min-width: auto</code> prevents flex items from shrinking smaller than their content, causing overflow.</li>
		<li><strong>Add <code>min-width:0</code></strong> — items shrink properly. Overriding the automatic minimum size allows flex items to compress past their content width, enabling text truncation and overflow control.</li>
		<li><strong>Use <code>gap</code> vs margin</strong> — gap only adds space between items. Unlike margins, <code>gap</code> never creates unwanted space at the edges of the container, eliminating the need for negative margin hacks.</li>
		<li><strong><code>flex-wrap:wrap</code></strong> — items reflow to new lines. Combined with a flex-basis, wrapping creates a responsive layout where items maintain a minimum size and flow to the next row when space runs out.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Flexbox is the layout model optimized for one-dimensional distribution of space. It excels at aligning items along a single axis -- whether that's a horizontal navigation bar, a vertical sidebar menu, or a row of buttons with equal spacing. The <code>flex</code> shorthand (<code>flex: grow shrink basis</code>) controls how each item claims space: <code>flex: 1 1 16rem</code> means the item will grow to fill available space, shrink if necessary, and starts with a preferred width of 16rem. Combined with <code>flex-wrap: wrap</code>, this creates a responsive row where items flow to new lines when the container is too narrow.</p>
	<p class="prose">The <code>gap</code> property on flex containers solved one of CSS's longest-standing pain points. Before <code>gap</code>, developers used margin on every item and then applied a negative margin on the container to compensate for the unwanted margin at the edges, or used <code>:last-child</code> selectors to strip trailing margins. The <code>gap</code> property only creates space between items, never at the edges, making it clean, predictable, and composable. It works identically on both flex and grid containers, reducing cognitive overhead when switching between layout modes.</p>
	<p class="prose">Knowing when to choose flexbox over grid is a critical design decision. Flexbox is the right tool when you have a single row or column of items that need to distribute space among themselves -- navbars, button groups, card rows that wrap, and sidebar-plus-content layouts. Grid is the right tool when you need to control alignment across both rows and columns simultaneously. The sidebar pattern in this lesson demonstrates flexbox's sweet spot: a single <code>flex-direction</code> flip from column to row at a breakpoint transforms a mobile-stacked layout into a desktop sidebar, with no structural markup changes required.</p>
	<p class="next"><a href="/module-6/6-8-container-queries">Next lesson: 6.8 Container queries</a></p>
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

  .layout {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    min-block-size: 20rem;
  }
  .sidebar {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .sidebar h4 { margin: 0; color: var(--color-text); }
  .sidebar nav {
    display: flex;
    flex-direction: row;
    gap: var(--space-xs);
    overflow-x: auto;
  }
  .sidebar button {
    flex-shrink: 0;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: var(--text-sm);
    transition: background var(--dur-fast) var(--ease-out);
  }
  .sidebar button:hover { background: var(--color-surface-1); color: var(--color-text); }
  .sidebar button.active {
    background: var(--color-brand);
    color: var(--color-surface-1);
    border-color: var(--color-brand);
  }
  .main {
    flex: 1;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .main h4 { margin: 0; color: var(--color-text); }
  .main p { margin: 0; color: var(--color-text-muted); line-height: 1.6; }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .layout { flex-direction: row; }
    .sidebar { flex: 0 0 240px; }
    .sidebar nav { flex-direction: column; overflow-x: visible; }
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
