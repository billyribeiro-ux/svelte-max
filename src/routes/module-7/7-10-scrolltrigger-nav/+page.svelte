<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { afterNavigate } from '$app/navigation';

  gsap.registerPlugin(ScrollTrigger);

  let containerEl: HTMLDivElement | null = $state(null);

  afterNavigate(() => {
    ScrollTrigger.refresh();
  });

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.nav-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        });
      });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.10 — ScrollTrigger + Navigation</h1>
  <p class="concept"><strong>Concept.</strong> SvelteKit uses client-side navigation, which means the page DOM changes without a full reload. ScrollTrigger caches scroll positions, so you must call <code>ScrollTrigger.refresh()</code> after navigation. Use <code>afterNavigate</code> from <code>$app/navigation</code> and clean up with <code>gsap.context()</code>.</p>

  <div class="build" bind:this={containerEl}>
    <pre>{`import \{ afterNavigate \} from '$app/navigation';
import \{ ScrollTrigger \} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Refresh ScrollTrigger after SvelteKit navigation
afterNavigate(() => \{
  ScrollTrigger.refresh();
\});

// Setup animations with proper cleanup
$effect(() => \{
  if (!containerEl) return;
  const ctx = gsap.context(() => \{
    gsap.from('.card', \{
      opacity: 0, y: 50,
      scrollTrigger: \{
        trigger: '.card',
        start: 'top 85%'
      \}
    \});
  \}, containerEl);
  return () => ctx.revert();
\});`}</pre>

    <p class="scroll-hint">Scroll down to see cards animate in.</p>
  </div>

  <div class="spacer"></div>

  <div class="card-stack">
    <div class="nav-card">
      <h4>Step 1: Register Plugin</h4>
      <p><code>gsap.registerPlugin(ScrollTrigger)</code> at the module level.</p>
    </div>
    <div class="nav-card">
      <h4>Step 2: afterNavigate</h4>
      <p>Call <code>ScrollTrigger.refresh()</code> inside <code>afterNavigate</code> to recalculate positions.</p>
    </div>
    <div class="nav-card">
      <h4>Step 3: gsap.context()</h4>
      <p>Scope all animations inside <code>gsap.context()</code> for clean teardown.</p>
    </div>
    <div class="nav-card">
      <h4>Step 4: ctx.revert()</h4>
      <p>Return <code>ctx.revert()</code> from <code>$effect</code> to kill all scoped ScrollTriggers on unmount.</p>
    </div>
  </div>

  <div class="spacer-sm"></div>

  <h3>What you learned</h3>
  <ul>
    <li>ScrollTrigger caches DOM positions — call <code>ScrollTrigger.refresh()</code> after navigation.</li>
    <li><code>afterNavigate</code> fires after every SvelteKit client-side navigation.</li>
    <li>Combine <code>afterNavigate</code> + <code>gsap.context()</code> for leak-free scroll animations.</li>
    <li>Without cleanup, old ScrollTriggers accumulate and cause erratic behavior.</li>
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

  .spacer { height: 30vh; }
  .spacer-sm { height: 10vh; }
  .scroll-hint { font-size: var(--text-sm); color: var(--color-brand); font-weight: 500; margin: 0; }

  .card-stack { display: flex; flex-direction: column; gap: var(--space-md); }
  .nav-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
  .nav-card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .nav-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
</style>
