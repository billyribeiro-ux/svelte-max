<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let containerEl: HTMLDivElement | null = $state(null);

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {
      gsap.from('.reveal-box', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-box',
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo('.scrub-bar', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scrub-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page">
  <h1>7.9 — ScrollTrigger</h1>
  <p class="concept"><strong>Concept.</strong> ScrollTrigger is a GSAP plugin that triggers or scrubs animations based on scroll position. Import it from <code>gsap/ScrollTrigger</code> and register it with <code>gsap.registerPlugin(ScrollTrigger)</code>. The <code>start</code> and <code>end</code> properties define the scroll range.</p>

  <div class="build" bind:this={containerEl}>
    <pre>{`import \{ ScrollTrigger \} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

gsap.from('.box', \{
  opacity: 0, y: 60,
  scrollTrigger: \{
    trigger: '.box',
    start: 'top 80%',   // when top of box hits 80% viewport
    end: 'top 20%',     // when top of box hits 20% viewport
    scrub: true          // link progress to scroll position
  \}
\});`}</pre>

    <p class="scroll-hint">Scroll down to see the animations trigger.</p>
  </div>

  <div class="spacer"></div>

  <div class="reveal-box">
    <h2>Revealed on Scroll</h2>
    <p>This box animates in when it enters the viewport. It uses <code>toggleActions</code> to play on enter and reverse on leave.</p>
  </div>

  <div class="spacer-sm"></div>

  <div class="scrub-section">
    <h2>Scrub Progress Bar</h2>
    <p>This bar fills as you scroll through this section. <code>scrub: true</code> links the animation directly to scroll position.</p>
    <div class="bar-track">
      <div class="scrub-bar"></div>
    </div>
  </div>

  <div class="spacer-sm"></div>

  <h3>What you learned</h3>
  <ul>
    <li>ScrollTrigger connects GSAP animations to scroll position.</li>
    <li><code>start</code> and <code>end</code> define the scroll range in viewport-relative terms.</li>
    <li><code>scrub: true</code> links animation progress directly to scroll position.</li>
    <li><code>toggleActions</code> defines behavior for enter, leave, enterBack, and leaveBack.</li>
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

  .spacer { height: 40vh; }
  .spacer-sm { height: 20vh; }

  .scroll-hint { font-size: var(--text-sm); color: var(--color-brand); font-weight: 500; margin: 0; }

  .reveal-box { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-xl); box-shadow: var(--shadow-md); }
  .reveal-box h2 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .reveal-box p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  .scrub-section { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-xl); }
  .scrub-section h2 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .scrub-section p { margin: 0 0 var(--space-md); color: var(--color-text-muted); font-size: var(--text-sm); }

  .bar-track { background: var(--color-surface-2); border-radius: var(--radius-full); height: 12px; overflow: hidden; }
  .scrub-bar { height: 100%; background: var(--color-brand); border-radius: var(--radius-full); transform-origin: left; }
</style>
