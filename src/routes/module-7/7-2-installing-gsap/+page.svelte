<script lang="ts">
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let boxEl: HTMLDivElement | null = $state(null);

  function replay() {
    if (!boxEl) return;
    gsap.set(boxEl, { x: 0 });
    gsap.to(boxEl, { x: 200, duration: 1, ease: 'power2.out' });
  }

  $effect(() => {
    if (!containerEl || !boxEl) return;
    const ctx = gsap.context(() => {
      gsap.to(boxEl!, { x: 200, duration: 1, ease: 'power2.out' });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.2 — Installing GSAP</h1>
  <p class="concept"><strong>Concept.</strong> GSAP is installed via <code>pnpm add gsap</code>. The most basic building block is <code>gsap.to()</code>, which tweens an element from its current state to a new state. All GSAP calls must live inside <code>$effect</code> to ensure they only run in the browser.</p>

  <div class="build" bind:this={containerEl}>
    <h2>Your First Tween</h2>

    <pre>{`import gsap from 'gsap';

// Inside $effect — safe for SSR
$effect(() => \{
  gsap.to('.box', \{ x: 200, duration: 1 \});
\});`}</pre>

    <div class="track">
      <div class="box" bind:this={boxEl}>
        <span class="arrow">&#8594;</span>
      </div>
    </div>

    <button onclick={replay}>Replay</button>

    <p class="note">The box moves 200px to the right over 1 second using <code>power2.out</code> easing.</p>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>GSAP is installed with <code>pnpm add gsap</code> — it ships as a standard npm package.</li>
    <li><code>gsap.to(target, vars)</code> is the fundamental tween method.</li>
    <li>All GSAP calls must be inside <code>$effect</code> for SSR safety.</li>
    <li>Properties like <code>x</code>, <code>y</code>, <code>scale</code>, <code>rotation</code>, and <code>opacity</code> are GSAP shorthand for CSS transforms.</li>
    <li>Always check <code>prefersReducedMotion.current</code> before running GSAP animations. Module 7 project demonstrates the full pattern. In production, wrap every GSAP animation in an <code>if (!prefersReducedMotion.current)</code> guard.</li>
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

  .track { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); min-height: 80px; display: flex; align-items: center; }
  .box { width: 60px; height: 60px; background: var(--color-brand); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--color-surface); font-size: var(--text-lg); font-weight: 700; }
  .arrow { line-height: 1; }
  .note { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; }
  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }
</style>
