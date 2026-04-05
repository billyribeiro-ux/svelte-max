<script lang="ts">
  type Theme = { id: 'teal' | 'rose' | 'amber'; name: string; description: string };

  const themes: Theme[] = [
    { id: 'teal', name: 'Teal', description: 'Calm, trustworthy, technical.' },
    { id: 'rose', name: 'Rose', description: 'Warm, human, editorial.' },
    { id: 'amber', name: 'Amber', description: 'Energetic, premium, sunny.' }
  ];
</script>

<section class="page">
  <h1>6.9 — Per-page color personalities</h1>
  <p class="concept">
    <strong>Concept.</strong> A course or product-listing site often wants distinct visual identity
    per section while sharing components. The trick: override semantic color tokens
    (<code>--color-brand</code>, <code>--color-brand-dim</code>) on a page-level class in a scoped
    <code>&lt;style&gt;</code> block. Every component that reads those tokens automatically gets
    the new palette, with no component changes. You saw this pattern in Modules 1–4 — this lesson
    formalizes it.
  </p>

  <div class="build">
    {#each themes as theme (theme.id)}
      <section class="mini theme-{theme.id}">
        <h4>{theme.name} personality</h4>
        <p>{theme.description}</p>
        <div class="row">
          <button class="btn">Primary action</button>
          <a class="link" href="#learn">Learn more</a>
        </div>
        <article class="card">
          <h5>Feature card</h5>
          <p>Same markup, different brand tokens. Zero component edits.</p>
        </article>
      </section>
    {/each}
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Override <code>--color-brand</code> at a page-level class, not the component.</li>
    <li>Every consumer re-reads the custom property — instant retheming.</li>
    <li>OKLCH makes it trivial to derive <code>brand-dim</code> from <code>brand</code>.</li>
    <li>Keep components token-consuming, not color-hardcoding.</li>
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

  .mini {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-lg);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-inline-start: 6px solid var(--color-brand);
  }
  .mini h4 {
    margin: 0;
    color: var(--color-brand);
    font-size: var(--text-xl);
  }
  .mini > p { margin: 0; color: var(--color-text-muted); }

  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-md);
  }
  .btn {
    background: var(--color-brand);
    color: var(--color-surface-1);
    border: none;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
    transition: background var(--dur-fast) var(--ease-out);
  }
  .btn:hover { background: var(--color-brand-dim); }
  .link {
    color: var(--color-brand);
    text-decoration: underline;
    text-underline-offset: 3px;
    font-size: var(--text-sm);
  }
  .card {
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-block-start: 3px solid var(--color-brand);
    border-radius: var(--radius-sm);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .card h5 { margin: 0; color: var(--color-text); }
  .card p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  .theme-teal {
    --color-brand: oklch(62% 0.19 180);
    --color-brand-dim: oklch(52% 0.15 180);
  }
  .theme-rose {
    --color-brand: oklch(62% 0.19 0);
    --color-brand-dim: oklch(52% 0.15 0);
  }
  .theme-amber {
    --color-brand: oklch(72% 0.18 60);
    --color-brand-dim: oklch(62% 0.15 60);
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
  }
</style>
