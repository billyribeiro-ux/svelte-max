<script lang="ts">
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
</style>
