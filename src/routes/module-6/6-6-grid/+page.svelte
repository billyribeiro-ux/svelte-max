<script lang="ts">
  type Card = { id: number; title: string; body: string };

  const cards: Card[] = [
    { id: 1, title: 'Perception', body: 'OKLCH keeps lightness steady across hues.' },
    { id: 2, title: 'Layers', body: 'Cascade order beats specificity every time.' },
    { id: 3, title: 'Tokens', body: 'Design contract encoded as custom properties.' },
    { id: 4, title: 'Nesting', body: 'Native browser nesting, no preprocessor.' },
    { id: 5, title: 'Logical', body: 'Direction-aware sides for global UIs.' },
    { id: 6, title: 'Intrinsic', body: 'Grids that size themselves to content.' }
  ];

  let minSize = $state<number>(16);
</script>

<section class="page">
  <h1>6.6 — CSS Grid patterns</h1>
  <p class="concept">
    <strong>Concept.</strong> Grid excels at 2D layouts and intrinsic responsive grids.
    <code>grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))</code> creates a grid that
    auto-fits as many columns as will fit, with each column at least 16rem wide, stretching to fill
    remaining space. This eliminates most media queries for card grids. <code>auto-fill</code>
    creates empty tracks if there is extra space; <code>auto-fit</code> collapses empty tracks so
    existing items stretch. <code>minmax()</code> sets a floor and a ceiling.
  </p>

  <div class="build">
    <label class="control">
      <span>Min column size: {minSize}rem</span>
      <input type="range" min="10" max="30" step="1" bind:value={minSize} />
    </label>

    <p class="hint">
      Resize the window — no media queries. Drag the slider to change the
      <code>minmax()</code> floor live.
    </p>

    <div class="grid" style:--grid-min={`${minSize}rem`}>
      {#each cards as card (card.id)}
        <article class="card">
          <h4>{card.title}</h4>
          <p>{card.body}</p>
        </article>
      {/each}
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>auto-fit + minmax()</code> is the intrinsic responsive grid recipe.</li>
    <li><code>auto-fit</code> collapses empty tracks; <code>auto-fill</code> keeps them.</li>
    <li>One rule replaces three or four breakpoints for card grids.</li>
    <li>Feed the min size via a custom property to animate the breakpoints.</li>
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

  .control {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text);
    font-size: var(--text-sm);
  }
  .hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  .grid {
    --grid-min: 16rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--grid-min), 1fr));
    gap: var(--space-md);
  }
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .card h4 { margin: 0; color: var(--color-text); }
  .card p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
  }
</style>
