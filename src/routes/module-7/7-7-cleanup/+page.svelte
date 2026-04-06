<script lang="ts">
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let items = $state(['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']);
  let count = $state(5);

  function addItem() {
    count += 1;
    items = [...items, `Item ${count}`];
  }

  function removeItem() {
    if (items.length > 0) {
      items = items.slice(0, -1);
    }
  }

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {
      gsap.from('.anim-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.7 — GSAP Context Cleanup</h1>
  <p class="concept"><strong>Concept.</strong> GSAP animations create internal references to DOM elements. If you navigate away or unmount components without cleaning up, those references become memory leaks. <code>gsap.context()</code> scopes all animations and <code>ctx.revert()</code> kills them all at once.</p>

  <div class="build" bind:this={containerEl}>
    <div class="controls">
      <button onclick={addItem}>Add Item</button>
      <button onclick={removeItem}>Remove Item</button>
    </div>

    <div class="item-list">
      {#each items as item (item)}
        <div class="anim-item">{item}</div>
      {/each}
    </div>

    <pre>{`$effect(() => \{
  if (!containerEl) return;

  // gsap.context scopes ALL animations inside
  const ctx = gsap.context(() => \{
    gsap.from('.item', \{
      opacity: 0, y: 30,
      stagger: 0.1
    \});
  \}, containerEl);

  // Cleanup: revert kills all scoped animations
  return () => ctx.revert();
\});`}</pre>

    <div class="warning-box">
      <h4>Without cleanup, you get:</h4>
      <ul class="warning-list">
        <li>Orphaned tweens referencing removed DOM nodes</li>
        <li>Memory leaks that grow on every navigation</li>
        <li>Animations that fight or glitch after re-mount</li>
      </ul>
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>gsap.context(fn, scope)</code> scopes all animations created inside the callback.</li>
    <li>Returning <code>ctx.revert()</code> from <code>$effect</code> ensures cleanup on unmount or re-run.</li>
    <li>Without cleanup, GSAP holds references to removed DOM nodes, causing memory leaks.</li>
    <li>Always pair <code>gsap.context()</code> with <code>ctx.revert()</code> in every <code>$effect</code>.</li>
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

  .controls { display: flex; gap: var(--space-sm); }
  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; }
  button:hover { background: var(--color-brand-dim); }

  .item-list { display: flex; flex-direction: column; gap: var(--space-xs); }
  .anim-item { background: var(--color-surface-2); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); color: var(--color-text); font-weight: 500; border-left: 3px solid var(--color-brand); }

  .warning-box { background: var(--color-surface-2); border-left: 3px solid var(--color-error); border-radius: var(--radius-md); padding: var(--space-md); }
  .warning-box h4 { margin: 0 0 var(--space-sm); color: var(--color-error); font-size: var(--text-sm); }
  .warning-list { color: var(--color-text-muted); font-size: var(--text-sm); }
</style>
