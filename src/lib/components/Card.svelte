<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    header?: Snippet;
    footer?: Snippet;
    children: Snippet;
    elevated?: boolean;
  }

  const { header, footer, children, elevated = false }: Props = $props();
</script>

<article class="card" class:elevated>
  {#if header}
    <header class="card-header">
      {@render header()}
    </header>
  {/if}
  <div class="card-body">
    {@render children()}
  </div>
  {#if footer}
    <footer class="card-footer">
      {@render footer()}
    </footer>
  {/if}
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface-1);
    /* light-dark() — theme-aware color function, first value for light mode, second for dark */
    border: 1px solid light-dark(var(--color-border), oklch(30% 0.02 270));
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    color: var(--color-text);
    overflow: hidden;
    transition: box-shadow var(--dur-base) var(--ease-out);
  }

  .card.elevated {
    box-shadow: var(--shadow-md);
  }

  .card-header {
    padding: var(--space-md) var(--space-lg);
    border-block-end: 1px solid var(--color-border);
    font-size: var(--text-lg);
  }

  .card-body {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .card-footer {
    padding: var(--space-md) var(--space-lg);
    border-block-start: 1px solid var(--color-border);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
</style>
