<script lang="ts">
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let toBox: HTMLDivElement | null = $state(null);
  let fromBox: HTMLDivElement | null = $state(null);
  let fromToBox: HTMLDivElement | null = $state(null);

  function playTo() {
    if (!toBox) return;
    gsap.set(toBox, { x: 0 });
    gsap.to(toBox, { x: 200, duration: 0.8, ease: 'power3.out' });
  }

  function playFrom() {
    if (!fromBox) return;
    gsap.from(fromBox, { opacity: 0, y: -40, duration: 0.8, ease: 'bounce.out' });
  }

  function playFromTo() {
    if (!fromToBox) return;
    gsap.fromTo(fromToBox, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
  }

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {}, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.3 — to, from, and fromTo</h1>
  <p class="concept"><strong>Concept.</strong> GSAP provides three core tween methods. <code>gsap.to()</code> animates from the current state to your target. <code>gsap.from()</code> animates from your values to the current state. <code>gsap.fromTo()</code> gives you explicit control over both start and end states. Each accepts an easing function.</p>

  <div class="build" bind:this={containerEl}>
    <div class="demo-row">
      <div class="demo">
        <h4><code>gsap.to()</code> — moves right</h4>
        <div class="track">
          <div class="box to" bind:this={toBox}>to</div>
        </div>
        <button onclick={playTo}>Play .to()</button>
      </div>

      <div class="demo">
        <h4><code>gsap.from()</code> — fades in</h4>
        <div class="track">
          <div class="box from" bind:this={fromBox}>from</div>
        </div>
        <button onclick={playFrom}>Play .from()</button>
      </div>

      <div class="demo">
        <h4><code>gsap.fromTo()</code> — scales up</h4>
        <div class="track center">
          <div class="box fromto" bind:this={fromToBox}>fromTo</div>
        </div>
        <button onclick={playFromTo}>Play .fromTo()</button>
      </div>
    </div>

    <pre>{`// .to() — animate TO these values
gsap.to(el, \{ x: 200, ease: 'power3.out' \});

// .from() — animate FROM these values
gsap.from(el, \{ opacity: 0, y: -40, ease: 'bounce.out' \});

// .fromTo() — explicit start & end
gsap.fromTo(el,
  \{ scale: 0, rotation: -180 \},
  \{ scale: 1, rotation: 0, ease: 'elastic.out(1, 0.5)' \}
);`}</pre>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>gsap.to()</code> tweens from the element's current state to the target values.</li>
    <li><code>gsap.from()</code> tweens from the specified values back to the current state — great for entrance animations.</li>
    <li><code>gsap.fromTo()</code> gives full control over both the start and end states.</li>
    <li>GSAP ships with many easing functions: <code>power3.out</code>, <code>bounce.out</code>, <code>elastic.out</code>, and more.</li>
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

  .demo-row { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .demo-row { grid-template-columns: repeat(3, 1fr); } }

  .demo { display: flex; flex-direction: column; gap: var(--space-sm); }
  .demo h4 { margin: 0; font-size: var(--text-sm); color: var(--color-text); }

  .track { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); min-height: 70px; display: flex; align-items: center; }
  .track.center { justify-content: center; }

  .box { width: 56px; height: 56px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--color-surface); font-weight: 700; font-size: var(--text-xs); }
  .box.to { background: var(--color-brand); }
  .box.from { background: var(--color-success); }
  .box.fromto { background: var(--color-warning); }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }
</style>
