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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>flex-direction</code> + one media query delivers the sidebar pattern.</li>
    <li><code>flex: 1 1 16rem</code> means grow, shrink, basis — the wrap recipe.</li>
    <li><code>gap</code> on flex containers finally kills the margin hack.</li>
    <li>Flex for 1D; Grid for 2D. Don't fight either one.</li>
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
