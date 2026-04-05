<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<section class="page">
  <h1>3.10 — CSS custom properties bridge</h1>
  <p class="concept">
    <strong>Concept.</strong> Scoped styles encapsulate a component, but sometimes a caller needs to
    tweak its appearance without a prop for every variant. CSS custom properties are the bridge: the
    component reads <code>var(--btn-bg, default)</code>, and a parent's scoped CSS or an inline
    <code>style</code> attribute overrides it. Per-instance theming, zero prop explosion.
  </p>

  <div class="build">
    <p>All four buttons use <code>variant="primary"</code> — only the parent's scoped CSS differs.</p>
    <div class="row">
      <div class="btn-brand-default">
        <Button variant="primary">Default</Button>
      </div>
      <div class="btn-brand-teal">
        <Button variant="primary">Teal</Button>
      </div>
      <div class="btn-brand-amber">
        <Button variant="primary">Amber</Button>
      </div>
      <div class="btn-brand-rose">
        <Button variant="primary">Rose</Button>
      </div>
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Expose a component's theme via custom properties, not props.</li>
    <li>Parents override using scoped CSS targeting descendant elements.</li>
    <li>The component stays closed — internals never change.</li>
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

  .row {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }

  .btn-brand-default {
    --btn-bg: var(--color-brand);
    --btn-border: var(--color-brand);
  }
  .btn-brand-teal {
    --btn-bg: oklch(66% 0.13 190);
    --btn-border: oklch(56% 0.13 190);
  }
  .btn-brand-amber {
    --btn-bg: oklch(78% 0.15 75);
    --btn-border: oklch(68% 0.15 75);
  }
  .btn-brand-rose {
    --btn-bg: oklch(66% 0.18 15);
    --btn-border: oklch(56% 0.18 15);
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

  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
