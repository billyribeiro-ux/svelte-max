<script lang="ts">
  import Card from '$lib/components/Card.svelte';
</script>

<section class="page">
  <h1>3.8 — Snippets as props</h1>
  <p class="concept">
    <strong>Concept.</strong> Snippets become first-class props. Import the <code>Snippet</code> type from
    <code>svelte</code> and declare them on your <code>interface Props</code>. A child snippet passed
    directly between tags is the implicit <code>children</code>; named ones like <code>header</code>
    are passed explicitly. Parameterized versions use <code>Snippet&lt;[arg: T]&gt;</code>.
  </p>

  <div class="build">
    <Card>
      {#snippet children()}
        <p>This card only uses the default <code>children</code> snippet.</p>
        <p>Any markup the parent places here ends up inside the body.</p>
      {/snippet}
    </Card>

    <Card>
      {#snippet header()}
        <h2>Featured</h2>
      {/snippet}
      {#snippet children()}
        <p>This card adds a named <code>header</code> snippet above the body.</p>
      {/snippet}
    </Card>

    <Card elevated>
      {#snippet header()}
        <h2>Subscription</h2>
      {/snippet}
      {#snippet children()}
        <p>Full coverage with three snippets: header, children, footer.</p>
        <p>Each slot accepts arbitrary markup from the caller.</p>
      {/snippet}
      {#snippet footer()}
        <span>Updated today · Free trial available</span>
      {/snippet}
    </Card>

    <h3 class="sub-heading">Parameterized snippets</h3>
    <p class="param-intro">
      Snippets can accept parameters via <code>Snippet&lt;[arg: T]&gt;</code>.
      The parent defines the snippet with typed arguments, and the child renders it
      by passing values at the call site.
    </p>

    <Card>
      {#snippet header()}
        <h2>Order Summary</h2>
      {/snippet}
      {#snippet children()}
        <p>This card demonstrates a parameterized footer snippet.</p>
        <p>The parent defines <code>{'{#snippet footer(total: number)}'}</code> and
           the Card renders it with <code>{'{@render footer(42)}'}</code>.</p>
      {/snippet}
      {#snippet footer()}
        <p class="param-total">Total: $42</p>
      {/snippet}
    </Card>

    <pre class="code-sample">{`// In the child component's Props interface:
interface Props {
  footer?: Snippet<[total: number]>;
}

// The child renders the snippet with a value:
{@render footer?.(42)}

// The parent defines the snippet with a typed parameter:
{#snippet footer(total: number)}
  <p>Total: \${total}</p>
{/snippet}`}</pre>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Declare snippet props with the <code>Snippet</code> type from <code>svelte</code>.</li>
    <li><code>children</code> is the implicit default snippet.</li>
    <li>Named snippets are passed inside the component tags.</li>
    <li>Use <code>{`{@render name?.()}`}</code> for optional snippets.</li>
    <li><code>Snippet&lt;[arg: T]&gt;</code> types snippet parameters for full type safety.</li>
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

  .sub-heading {
    margin-block-start: var(--space-lg);
    margin-block-end: var(--space-xs);
    font-size: var(--text-lg);
    color: var(--color-text);
  }

  .param-intro {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0 0 var(--space-md) 0;
  }

  .param-total {
    margin: 0;
    font-weight: 700;
    font-size: var(--text-lg);
    color: var(--color-brand, var(--color-text));
  }

  .code-sample {
    margin-block-start: var(--space-md);
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    overflow-x: auto;
    line-height: 1.6;
    white-space: pre;
    color: var(--color-text);
  }

  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
