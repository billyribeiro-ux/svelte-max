<script lang="ts">
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let cardEl: HTMLDivElement | null = $state(null);

  function replay() {
    if (!cardEl) return;
    gsap.set(cardEl, { clearProps: 'all' });
    gsap.from(cardEl, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' });
  }

  $effect(() => {
    if (!containerEl || !cardEl) return;
    const ctx = gsap.context(() => {
      gsap.from(cardEl!, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.5 — bind:this for DOM Refs</h1>
  <p class="concept"><strong>Concept.</strong> GSAP needs real DOM elements to animate. In Svelte 5, use <code>bind:this</code> to capture a reference into a typed <code>$state</code> variable. Always guard with <code>if (!el) return;</code> inside <code>$effect</code> since the ref is <code>null</code> before mount.</p>

  <div class="build" bind:this={containerEl}>
    <pre>{`let cardEl: HTMLDivElement | null = $state(null);

// In template:
// <div bind:this=\{cardEl\}>...</div>

$effect(() => \{
  if (!cardEl) return;
  const ctx = gsap.context(() => \{
    gsap.from(cardEl!, \{
      y: 60, opacity: 0, scale: 0.9,
      duration: 0.8, ease: 'power3.out'
    \});
  \}, containerEl!);
  return () => ctx.revert();
\});`}</pre>

    <div class="card" bind:this={cardEl}>
      <h4>Animated Card</h4>
      <p>This card is referenced via <code>bind:this</code> and animated with GSAP.</p>
    </div>

    <button onclick={replay}>Replay</button>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>bind:this</code> captures a DOM element reference into a Svelte variable.</li>
    <li>Type the ref as <code>HTMLDivElement | null = $state(null)</code> for TypeScript safety.</li>
    <li>Always null-check the ref inside <code>$effect</code> before passing it to GSAP.</li>
    <li>Using element refs instead of CSS selectors avoids class name collisions.</li>
  </ul>
</section>

<style>
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .card { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-lg); }
  .card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }
</style>
