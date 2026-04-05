<script lang="ts">
  type Link = { id: string; label: string };

  const links: Link[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' }
  ];

  let active = $state<string>('dashboard');
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
</style>
