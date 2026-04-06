<script lang="ts">
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let gridEl: HTMLDivElement | null = $state(null);

  const gridItems = Array.from({ length: 8 }, (_, i) => i + 1);

  function replay() {
    if (!gridEl) return;
    const items = gridEl.querySelectorAll('.grid-item');
    gsap.set(items, { clearProps: 'all' });
    gsap.from(items, {
      opacity: 0,
      scale: 0,
      y: 30,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: { each: 0.08, from: 'center' }
    });
  }

  function replayEdges() {
    if (!gridEl) return;
    const items = gridEl.querySelectorAll('.grid-item');
    gsap.set(items, { clearProps: 'all' });
    gsap.from(items, {
      opacity: 0,
      scale: 0,
      rotation: 90,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      stagger: { each: 0.1, from: 'edges' }
    });
  }

  function replayRandom() {
    if (!gridEl) return;
    const items = gridEl.querySelectorAll('.grid-item');
    gsap.set(items, { clearProps: 'all' });
    gsap.from(items, {
      opacity: 0,
      y: -50,
      duration: 0.4,
      ease: 'power2.out',
      stagger: { each: 0.06, from: 'random' }
    });
  }

  $effect(() => {
    if (!containerEl || !gridEl) return;
    const ctx = gsap.context(() => {
      gsap.from('.grid-item', {
        opacity: 0,
        scale: 0,
        y: 30,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: { each: 0.08, from: 'center' },
        delay: 0.3
      });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.8 — Stagger</h1>
  <p class="concept"><strong>Concept.</strong> The <code>stagger</code> property offsets the start time of each element in a set. Combined with <code>from</code> options like <code>'center'</code>, <code>'edges'</code>, or <code>'random'</code>, stagger creates polished, coordinated entrance animations.</p>

  <div class="build" bind:this={containerEl}>
    <div class="grid" bind:this={gridEl}>
      {#each gridItems as item}
        <div class="grid-item">{item}</div>
      {/each}
    </div>

    <div class="controls">
      <button onclick={replay}>From Center</button>
      <button onclick={replayEdges}>From Edges</button>
      <button onclick={replayRandom}>Random</button>
    </div>

    <pre>{`gsap.from('.grid-item', \{
  opacity: 0,
  scale: 0,
  y: 30,
  duration: 0.5,
  ease: 'back.out(1.7)',
  stagger: \{
    each: 0.08,     // delay between each
    from: 'center'  // start from middle
  \}
\});

// Other 'from' values:
// 'start', 'end', 'center',
// 'edges', 'random', or a number (index)`}</pre>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>stagger</code> offsets animation start times across multiple elements.</li>
    <li><code>stagger.each</code> sets the delay between consecutive elements.</li>
    <li><code>stagger.from</code> controls the origin point: <code>'center'</code>, <code>'edges'</code>, <code>'random'</code>, etc.</li>
    <li>Stagger turns simple animations into coordinated choreography.</li>
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

  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-sm); }
  @media (min-width: 768px) { .grid { grid-template-columns: repeat(4, 1fr); } }

  .grid-item { background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-md); padding: var(--space-lg); text-align: center; font-weight: 700; font-size: var(--text-lg); aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }

  .controls { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; }
  button:hover { background: var(--color-brand-dim); }
</style>
