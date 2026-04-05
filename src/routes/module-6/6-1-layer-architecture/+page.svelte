<script lang="ts">
  type LayerRow = { source: string; layer: string; property: string; value: string };

  const rows: LayerRow[] = [
    { source: 'line 1 in source', layer: 'low', property: 'color', value: 'error red' },
    { source: 'line 2 in source', layer: 'low', property: 'font-size', value: '--text-base' },
    { source: 'line 3 in source', layer: 'high', property: 'color', value: 'success green (wins)' },
    { source: 'line 4 in source', layer: 'high', property: 'font-size', value: '--text-xl (wins)' }
  ];
</script>

<section class="page">
  <h1>6.1 — @layer architecture in depth</h1>
  <p class="concept">
    <strong>Concept.</strong>
    <code>@layer reset, tokens, base, layout, components, animations</code> declares a cascade order.
    Later layers <em>always</em> win over earlier layers, regardless of selector specificity or source
    position. This permanently solves the "my utility class got overridden by some random card"
    problem. Each layer has a job: <code>reset</code> normalizes browser defaults, <code>tokens</code>
    holds <code>:root</code> variables, <code>base</code> sets element defaults, <code>layout</code>
    has page-level utilities, <code>components</code> holds component styles, and
    <code>animations</code> holds keyframes.
  </p>

  <div class="build">
    <p class="lead">The same <code>.sample</code> is targeted from two layers. The high layer wins.</p>

    <div class="sample">Hello from the cascade</div>

    <h4>Reading order vs layer order</h4>
    <table>
      <thead>
        <tr><th>Source</th><th>Layer</th><th>Property</th><th>Declared value</th></tr>
      </thead>
      <tbody>
        {#each rows as r (r.source + r.property)}
          <tr>
            <td><code>{r.source}</code></td>
            <td><code>{r.layer}</code></td>
            <td><code>{r.property}</code></td>
            <td>{r.value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Layer order beats specificity and source order.</li>
    <li>Declare the order once at the top with <code>@layer a, b, c;</code>.</li>
    <li>Typical PE7 order: reset, tokens, base, layout, components, animations.</li>
    <li>Unlayered styles win over layered ones — use that for true overrides.</li>
  </ul>
</section>

<style>
  @layer low, high;

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
  .lead { margin: 0; color: var(--color-text-muted); }
  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-2);
    padding: 0 var(--space-xs);
    border-radius: var(--radius-xs);
  }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  h4 { margin: 0; color: var(--color-text); }
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
  table {
    inline-size: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
  }
  th, td {
    text-align: start;
    padding: var(--space-sm);
    border-block-end: 1px solid var(--color-border);
    color: var(--color-text);
  }
  th { color: var(--color-text-muted); font-weight: 600; }

  @layer low {
    .sample {
      color: var(--color-error);
      font-size: var(--text-base);
      padding: var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-2);
    }
  }

  @layer high {
    .sample {
      color: var(--color-success);
      font-size: var(--text-xl);
    }
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
  }
</style>
