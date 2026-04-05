<script lang="ts">
  const prices: number[] = [99, 1299, 24999];
</script>

<section class="page">
  <h1>3.7 — Snippets</h1>
  <p class="concept">
    <strong>Concept.</strong> Snippets replace Svelte 4 slots. You define a reusable fragment with
    <code>{`{#snippet name()}...{/snippet}`}</code> and invoke it with <code>{`{@render name()}`}</code>.
    They are fully typed, parameterized, and behave like values — you can store them, pass them, and
    render them conditionally.
  </p>

  {#snippet priceTag(price: number)}
    <span class="price">${price.toLocaleString()}</span>
  {/snippet}

  {#snippet divider()}
    <hr class="divider" />
  {/snippet}

  <div class="build">
    <h2>Product prices</h2>
    <ul class="prices">
      {#each prices as price}
        <li>
          <span class="label">Item {price}</span>
          {@render priceTag(price)}
        </li>
      {/each}
    </ul>

    {@render divider()}

    <p class="note">
      Snippets are like mini-components that live inside the parent's scope — when you outgrow one,
      you promote it to a file.
    </p>

    {@render divider()}

    <p>The same <code>priceTag</code> snippet, reused inline: {@render priceTag(42)} and {@render priceTag(777)}.</p>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Define reusable markup with <code>{`{#snippet}`}</code> and invoke with <code>{`{@render}`}</code>.</li>
    <li>Snippets accept typed parameters like a function.</li>
    <li>Same snippet can be rendered any number of times with different arguments.</li>
    <li>They live in the parent scope — promote to a component when they grow.</li>
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

  .build h2 {
    margin: 0;
    font-size: var(--text-lg);
  }

  .prices {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .prices li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface-2);
    border-radius: var(--radius-sm);
  }

  .label { color: var(--color-text-muted); }

  .price {
    font-family: var(--font-mono);
    color: var(--color-brand);
    font-weight: 600;
  }

  .divider {
    border: none;
    border-block-start: 1px dashed var(--color-border);
    margin: 0;
  }

  .note {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
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

  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
