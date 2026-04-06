<script lang="ts">
  import gsap from 'gsap';
  import type { Action } from 'svelte/action';

  const fadeIn: Action<HTMLElement, { duration?: number; y?: number } | undefined> = (node, params) => {
    const opts = params ?? {};
    const dur = opts.duration ?? 0.6;
    const yOffset = opts.y ?? 20;

    gsap.from(node, { opacity: 0, y: yOffset, duration: dur, ease: 'power2.out' });

    return {
      destroy() {
        gsap.killTweensOf(node);
      }
    };
  };

  const scaleIn: Action<HTMLElement> = (node) => {
    gsap.from(node, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });

    return {
      destroy() {
        gsap.killTweensOf(node);
      }
    };
  };

  const slideRight: Action<HTMLElement> = (node) => {
    gsap.from(node, { x: -80, opacity: 0, duration: 0.7, ease: 'power3.out' });

    return {
      destroy() {
        gsap.killTweensOf(node);
      }
    };
  };

  let show = $state(true);

  function replay() {
    show = false;
    setTimeout(() => { show = true; }, 50);
  }
</script>

<section class="page">
  <h1>7.11 — Svelte Actions with GSAP</h1>
  <p class="concept"><strong>Concept.</strong> Svelte <code>use:</code> actions are functions that run when an element is mounted. They are the perfect place to encapsulate GSAP animations as reusable directives. Return a <code>destroy</code> method to clean up tweens when the element is removed.</p>

  <div class="build">
    <pre>{`import type \{ Action \} from 'svelte/action';

const fadeIn: Action<HTMLElement> = (node) => \{
  gsap.from(node, \{
    opacity: 0, y: 20, duration: 0.6
  \});
  return \{
    destroy() \{ gsap.killTweensOf(node); \}
  \};
\};

// Usage: <div use:fadeIn>...</div>`}</pre>

    <button onclick={replay}>Replay All</button>

    {#if show}
      <div class="demo-cards">
        <div class="demo-card" use:fadeIn={{ duration: 0.6, y: 30 }}>
          <h4>use:fadeIn</h4>
          <p>Fades in from below with opacity and y translation.</p>
        </div>

        <div class="demo-card" use:scaleIn>
          <h4>use:scaleIn</h4>
          <p>Scales in from zero with a bouncy back ease.</p>
        </div>

        <div class="demo-card" use:slideRight>
          <h4>use:slideRight</h4>
          <p>Slides in from the left with power3 easing.</p>
        </div>
      </div>
    {/if}
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Svelte <code>use:</code> actions run GSAP animations when an element mounts.</li>
    <li>Returning <code>destroy()</code> calls <code>gsap.killTweensOf(node)</code> for cleanup.</li>
    <li>Actions make GSAP animations reusable across any element with <code>use:actionName</code>.</li>
    <li>Actions can accept parameters for configurable animations.</li>
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

  .demo-cards { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .demo-cards { grid-template-columns: repeat(3, 1fr); } }

  .demo-card { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-lg); }
  .demo-card h4 { margin: 0 0 var(--space-xs); color: var(--color-brand); font-family: var(--font-mono); }
  .demo-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }
</style>
