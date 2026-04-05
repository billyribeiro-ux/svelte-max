<script lang="ts">
  type NavItem = { id: string; label: string };

  const items: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'docs', label: 'Docs' },
    { id: 'blog', label: 'Blog' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' }
  ];

  let current = $state<string>('home');

  const select = (id: string): void => {
    current = id;
  };

  const cssSource: string = `.nav {
  display: flex;
  gap: var(--space-xs);

  & a {
    color: var(--color-text-muted);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    transition: all var(--dur-fast) var(--ease-out);

    &:hover {
      background: var(--color-surface-2);
      color: var(--color-text);
    }

    &:focus-visible {
      outline: 2px solid var(--color-brand);
    }

    &.current {
      background: var(--color-brand);
      color: var(--color-surface-1);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}`;
</script>

<section class="page">
  <h1>6.4 — Native CSS nesting in Svelte</h1>
  <p class="concept">
    <strong>Concept.</strong> CSS nesting is a native browser feature (2023+). The <code>&amp;</code>
    selector refers to the parent rule. You can nest selectors, pseudo-classes, media queries, and
    state selectors inside one block — no preprocessor needed. Svelte's scoped styles and native
    nesting compose perfectly. Keep nesting shallow (2–3 levels) to stay readable.
  </p>

  <div class="build">
    <nav class="nav" aria-label="Primary">
      {#each items as item (item.id)}
        <a
          href="#{item.id}"
          class:current={current === item.id}
          onclick={(e) => { e.preventDefault(); select(item.id); }}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <p class="hint">Hover, focus with Tab, click — all states live in one nested block.</p>

    <pre><code>{cssSource}</code></pre>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>&amp;</code> is the parent reference — required for pseudo-class nesting.</li>
    <li>You can nest state, media, and descendant rules in one block.</li>
    <li>Shallow nesting (2–3 levels) is still best practice for readability.</li>
    <li>Svelte's scoped styles wrap nested CSS without any extra config.</li>
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

  .hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);

    & a {
      color: var(--color-text-muted);
      text-decoration: none;
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-md);
      transition: background var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out),
                  transform var(--dur-fast) var(--ease-out);

      &:hover {
        background: var(--color-surface-2);
        color: var(--color-text);
      }

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      &.current {
        background: var(--color-brand);
        color: var(--color-surface-1);
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }

  pre {
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    overflow-x: auto;
    margin: 0;
  }
  pre code {
    background: transparent;
    padding: 0;
    font-size: var(--text-sm);
    color: var(--color-text);
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
  }
</style>
