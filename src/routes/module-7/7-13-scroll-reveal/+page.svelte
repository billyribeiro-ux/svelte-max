<script lang="ts">
  import gsap from 'gsap';
  import type { Action } from 'svelte/action';

  interface RevealOptions {
    y?: number;
    duration?: number;
    threshold?: number;
    delay?: number;
  }

  const revealOnScroll: Action<HTMLElement, RevealOptions | undefined> = (node, params) => {
    const opts = params ?? {};
    const y = opts.y ?? 40;
    const duration = opts.duration ?? 0.8;
    const threshold = opts.threshold ?? 0.2;
    const delay = opts.delay ?? 0;

    gsap.set(node, { opacity: 0, y });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(node, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power3.out'
            });
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
        gsap.killTweensOf(node);
      }
    };
  };
</script>

<section class="page">
  <h1>7.13 — Scroll Reveal Action</h1>
  <p class="concept"><strong>Concept.</strong> A production-grade <code>use:revealOnScroll</code> action combines IntersectionObserver with GSAP. The observer watches for the element to enter the viewport; once visible, it triggers a GSAP animation and disconnects. This is more performant than ScrollTrigger for simple reveal effects.</p>

  <div class="build">
    <pre>{`const revealOnScroll: Action<HTMLElement, Options> = (node, params) => \{
  gsap.set(node, \{ opacity: 0, y: 40 \});

  const observer = new IntersectionObserver(
    (entries) => \{
      entries.forEach((entry) => \{
        if (entry.isIntersecting) \{
          gsap.to(node, \{ opacity: 1, y: 0, duration: 0.8 \});
          observer.disconnect(); // one-shot
        \}
      \});
    \},
    \{ threshold: 0.2 \}
  );
  observer.observe(node);

  return \{
    destroy() \{
      observer.disconnect();
      gsap.killTweensOf(node);
    \}
  \};
\};

// Usage: <div use:revealOnScroll>...</div>
// With options: <div use:revealOnScroll=\{\{ y: 60, delay: 0.2 \}\}>...</div>`}</pre>

    <p class="scroll-hint">Scroll down to see the cards reveal one by one.</p>
  </div>

  <div class="spacer"></div>

  <div class="reveal-grid">
    <div class="reveal-card" use:revealOnScroll>
      <div class="icon">&#9733;</div>
      <h4>Performance</h4>
      <p>IntersectionObserver is more efficient than scroll event listeners. No layout thrashing.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ delay: 0.1 }}>
      <div class="icon">&#9881;</div>
      <h4>One-Shot</h4>
      <p>Observer disconnects after triggering, so no ongoing overhead.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ delay: 0.2 }}>
      <div class="icon">&#9889;</div>
      <h4>Reusable</h4>
      <p>Apply <code>use:revealOnScroll</code> to any element — no component coupling.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ y: 60, delay: 0.1 }}>
      <div class="icon">&#128736;</div>
      <h4>Configurable</h4>
      <p>Pass custom <code>y</code>, <code>duration</code>, <code>threshold</code>, and <code>delay</code> options.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ y: 60, delay: 0.2 }}>
      <div class="icon">&#9855;</div>
      <h4>Clean Teardown</h4>
      <p>The <code>destroy</code> method disconnects the observer and kills GSAP tweens.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ y: 60, delay: 0.3 }}>
      <div class="icon">&#127919;</div>
      <h4>Production-Ready</h4>
      <p>This pattern is used on real marketing pages and landing pages worldwide.</p>
    </div>
  </div>

  <div class="spacer-sm"></div>

  <h3>What you learned</h3>
  <ul>
    <li>IntersectionObserver detects when elements enter the viewport without scroll listeners.</li>
    <li>Combining IntersectionObserver with GSAP gives performant, one-shot reveal animations.</li>
    <li>Disconnecting the observer after the first intersection prevents unnecessary work.</li>
    <li>Wrapping this pattern in a <code>use:</code> action makes it reusable across any element.</li>
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

  .reveal-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .reveal-grid { grid-template-columns: repeat(3, 1fr); } }

  .reveal-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
  .reveal-card .icon { font-size: var(--text-2xl); margin-bottom: var(--space-sm); }
  .reveal-card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .reveal-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }
</style>
