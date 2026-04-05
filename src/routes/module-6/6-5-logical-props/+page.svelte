<script lang="ts">
  type Dir = 'ltr' | 'rtl';

  let dir = $state<Dir>('ltr');

  const toggle = (): void => {
    dir = dir === 'ltr' ? 'rtl' : 'ltr';
  };
</script>

<section class="page">
  <h1>6.5 — Logical properties</h1>
  <p class="concept">
    <strong>Concept.</strong> <code>margin-left</code> and <code>padding-right</code> break in
    right-to-left languages. Logical properties — <code>margin-inline-start</code>,
    <code>padding-block-end</code>, <code>inset-inline-end</code> — are direction-aware. In LTR
    they map to left/right; in RTL they mirror automatically. The same applies to
    <code>border-inline-*</code> and <code>border-block-*</code>. Use logical properties for
    <em>every</em> new CSS rule — it costs nothing and future-proofs your UI.
  </p>

  <div class="build">
    <button class="toggle" onclick={toggle}>
      Current direction: <code>{dir}</code> — click to flip
    </button>

    <div class="card" dir={dir}>
      <div class="avatar">AB</div>
      <div class="body">
        <h4>Ada Byron</h4>
        <p>Logical props mirror this layout with zero CSS changes.</p>
      </div>
      <button class="close" aria-label="Close">×</button>
    </div>

    <div class="card" dir={dir}>
      <div class="avatar">GH</div>
      <div class="body">
        <h4>Grace Hopper</h4>
        <p>Border-inline-start becomes the accent in both directions.</p>
      </div>
      <button class="close" aria-label="Close">×</button>
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Logical properties follow writing-mode, not physical sides.</li>
    <li><code>inline-start</code> / <code>inline-end</code> flip for RTL automatically.</li>
    <li><code>block-start</code> / <code>block-end</code> are top/bottom in horizontal writing.</li>
    <li>Use them everywhere — <code>max-inline-size</code> instead of <code>max-width</code>.</li>
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

  .toggle {
    align-self: flex-start;
    background: var(--color-brand);
    color: var(--color-surface-1);
    border: none;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
  }
  .toggle code {
    background: rgb(0 0 0 / 0.2);
    color: inherit;
  }

  .card {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    padding-inline-start: var(--space-lg);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-inline-start: 4px solid var(--color-brand);
    border-start-start-radius: var(--radius-md);
    border-end-start-radius: var(--radius-md);
    border-start-end-radius: var(--radius-md);
    border-end-end-radius: var(--radius-md);
  }
  .avatar {
    flex-shrink: 0;
    inline-size: 3rem;
    block-size: 3rem;
    border-radius: var(--radius-full);
    background: var(--color-brand-dim);
    color: var(--color-surface-1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .body h4 {
    margin: 0;
    color: var(--color-text);
    text-align: start;
  }
  .body p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    text-align: start;
  }
  .close {
    flex-shrink: 0;
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-border);
    background: var(--color-surface-2);
    color: var(--color-text);
    cursor: pointer;
    font-size: var(--text-lg);
    margin-inline-start: auto;
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
  }
</style>
