<script lang="ts">
  import gsap from 'gsap';
  import { fly } from 'svelte/transition';

  let cssCard: HTMLDivElement | null = $state(null);
  let gsapCard: HTMLDivElement | null = $state(null);
  let containerEl: HTMLDivElement | null = $state(null);

  let showSvelteCard = $state(false);
  let played = $state(false);

  function playCss() {
    cssCard?.classList.remove('css-enter');
    void cssCard?.offsetWidth;
    cssCard?.classList.add('css-enter');
  }

  function playSvelte() {
    showSvelteCard = false;
    setTimeout(() => { showSvelteCard = true; }, 50);
  }

  function playGsap() {
    if (!gsapCard) return;
    gsap.fromTo(gsapCard, { opacity: 0, y: 40, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' });
  }

  $effect(() => {
    if (!containerEl || played) return;
    played = true;
    const ctx = gsap.context(() => {
      gsap.fromTo('.layer-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, delay: 0.3 });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.1 — What Is GSAP?</h1>
  <p class="concept"><strong>Concept.</strong> The GreenSock Animation Platform (GSAP) is the industry-standard JavaScript animation library. It handles complex timelines, scroll-driven effects, and physics-based motion that go far beyond what CSS or Svelte transitions can do alone. Understanding when to use each layer is key.</p>

  <div class="build" bind:this={containerEl}>
    <h2>The 4 Animation Layers</h2>
    <div class="layers">
      <div class="layer">
        <span class="layer-label">1. CSS Transitions</span>
        <p>Simple hover/state changes. Zero JS needed.</p>
      </div>
      <div class="layer">
        <span class="layer-label">2. CSS @keyframes</span>
        <p>Looping or multi-step CSS-only animations.</p>
      </div>
      <div class="layer">
        <span class="layer-label">3. Svelte Transitions</span>
        <p>Mount/unmount animations with <code>transition:</code> directives.</p>
      </div>
      <div class="layer">
        <span class="layer-label">4. GSAP</span>
        <p>Complex timelines, scroll-driven, stagger, physics.</p>
      </div>
    </div>

    <h2>Compare: Same Card Entrance</h2>
    <div class="demos">
      <div class="demo-col">
        <h4>CSS Transition</h4>
        <div class="card css-card" bind:this={cssCard}>Hello CSS</div>
        <button onclick={playCss}>Replay</button>
      </div>

      <div class="demo-col">
        <h4>Svelte Transition</h4>
        {#if showSvelteCard}
          <div class="card svelte-card" in:fly={{ y: 40, duration: 400 }}>Hello Svelte</div>
        {:else}
          <div class="card-placeholder"></div>
        {/if}
        <button onclick={playSvelte}>Replay</button>
      </div>

      <div class="demo-col">
        <h4>GSAP</h4>
        <div class="card gsap-card" bind:this={gsapCard}>Hello GSAP</div>
        <button onclick={playGsap}>Replay</button>
      </div>
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>GSAP is a professional JavaScript animation library for complex motion.</li>
    <li>There are 4 layers of web animation: CSS transitions, CSS keyframes, Svelte transitions, and GSAP.</li>
    <li>Use the simplest layer that gets the job done — reach for GSAP when you need timelines, scroll effects, or fine-grained control.</li>
    <li>GSAP and Svelte transitions complement each other rather than compete.</li>
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
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .layers { display: flex; flex-direction: column; gap: var(--space-sm); }
  .layer { background: var(--color-surface-2); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border-left: 3px solid var(--color-brand); }
  .layer p { margin: var(--space-xs) 0 0; font-size: var(--text-sm); color: var(--color-text-muted); }
  .layer-label { font-weight: 600; color: var(--color-text); }

  .demos { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .demos { grid-template-columns: repeat(3, 1fr); } }

  .demo-col { display: flex; flex-direction: column; gap: var(--space-sm); align-items: center; }
  .demo-col h4 { margin: 0; font-size: var(--text-sm); color: var(--color-text); }

  .card { background: var(--color-brand); color: var(--color-surface); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); font-weight: 600; text-align: center; min-height: 60px; display: flex; align-items: center; justify-content: center; }
  .card-placeholder { min-height: 60px; }

  .css-card { animation: cssSlideIn 0.6s ease-out; }
  :global(.css-enter) { animation: cssSlideIn 0.6s ease-out; }
  @keyframes cssSlideIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; }
  button:hover { background: var(--color-brand-dim); }
</style>
