<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { fade } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';
  import type { Action } from 'svelte/action';

  gsap.registerPlugin(ScrollTrigger);

  let containerEl: HTMLElement | null = $state(null);
  let heroEl: HTMLElement | null = $state(null);
  let showNewsletter = $state(false);
  let email = $state('');
  let submitted = $state(false);

  function openNewsletter() {
    showNewsletter = true;
  }

  function closeNewsletter() {
    showNewsletter = false;
  }

  function handleSubmit() {
    if (email.trim()) {
      submitted = true;
      setTimeout(() => {
        showNewsletter = false;
        submitted = false;
        email = '';
      }, 2000);
    }
  }

  const revealOnScroll: Action<HTMLElement, { y?: number; delay?: number } | undefined> = (node, params) => {
    const opts = params ?? {};
    const y = opts.y ?? 40;
    const delay = opts.delay ?? 0;

    if (prefersReducedMotion.current) {
      return { destroy() {} };
    }

    gsap.set(node, { opacity: 0, y });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(node, { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
        gsap.killTweensOf(node);
      }
    };
  };

  $effect(() => {
    if (!containerEl || !heroEl) return;
    if (prefersReducedMotion.current) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl
        .from('.hero-title', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' })
        .from('.hero-subtitle', { opacity: 0, x: -40, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from('.hero-cta', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
        .from('.hero-badge', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1');

      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        });
      });

      gsap.fromTo('.testimonial-inner', { y: 30 }, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.testimonial-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerEl);

    return () => ctx.revert();
  });
</script>

<section class="page project-page" bind:this={containerEl}>
  <h1>Module 7 Project — Marketing Page</h1>

  <div class="hero" bind:this={heroEl}>
    <div class="hero-glow"></div>
    <span class="hero-badge">Powered by GSAP + Svelte</span>
    <h2 class="hero-title">Build stunning<br />web experiences</h2>
    <p class="hero-subtitle">Combine the power of GSAP animations with Svelte's reactivity for production-grade motion design.</p>
    <div class="hero-actions">
      <button class="hero-cta" onclick={openNewsletter}>Get Early Access</button>
    </div>
  </div>

  <div class="features-section">
    <h2 class="section-heading" use:revealOnScroll>Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">&#9889;</div>
        <h3 class="feature-title">Timeline Sequencing</h3>
        <p>Orchestrate complex multi-step animations with precise timing using GSAP timelines.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128640;</div>
        <h3 class="feature-title">Scroll-Driven</h3>
        <p>ScrollTrigger connects animations to scroll position for immersive scrollytelling.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#127912;</div>
        <h3 class="feature-title">Stagger Effects</h3>
        <p>Choreograph arrays of elements with stagger for polished, coordinated entrances.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#9881;</div>
        <h3 class="feature-title">Svelte Actions</h3>
        <p>Wrap GSAP animations in reusable <code>use:</code> actions for clean, composable code.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128274;</div>
        <h3 class="feature-title">Context Cleanup</h3>
        <p><code>gsap.context()</code> ensures all animations are properly cleaned up on unmount.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#9851;</div>
        <h3 class="feature-title">Reactive Bridge</h3>
        <p><code>$effect</code> bridges Svelte state to GSAP timelines for state-driven motion.</p>
      </div>
    </div>
  </div>

  <div class="testimonial-section">
    <div class="testimonial-inner">
      <blockquote class="testimonial">
        <p>"The combination of GSAP's power and Svelte's simplicity made our landing page feel like a native app. Build time was cut in half."</p>
        <footer>
          <strong>Alex Chen</strong>
          <span>Lead Developer, Acme Corp</span>
        </footer>
      </blockquote>
    </div>
  </div>

  <div class="stats-section">
    <h2 class="section-heading" use:revealOnScroll>By the Numbers</h2>
    <div class="stats-grid">
      <div class="stat" use:revealOnScroll={{ delay: 0 }}>
        <span class="stat-number">60fps</span>
        <span class="stat-label">Smooth Animation</span>
      </div>
      <div class="stat" use:revealOnScroll={{ delay: 0.1 }}>
        <span class="stat-number">14</span>
        <span class="stat-label">Lessons Covered</span>
      </div>
      <div class="stat" use:revealOnScroll={{ delay: 0.2 }}>
        <span class="stat-number">0</span>
        <span class="stat-label">Memory Leaks</span>
      </div>
      <div class="stat" use:revealOnScroll={{ delay: 0.3 }}>
        <span class="stat-number">A11y</span>
        <span class="stat-label">Reduced Motion Safe</span>
      </div>
    </div>
  </div>

  {#if showNewsletter}
    <div class="overlay" transition:fade={{ duration: 200 }}>
      <div class="modal" role="dialog" aria-label="Newsletter signup">
        {#if submitted}
          <div class="success-msg">
            <span class="check">&#10003;</span>
            <h3>You're in!</h3>
            <p>Check your inbox for confirmation.</p>
          </div>
        {:else}
          <h2>Get Early Access</h2>
          <p>Join our newsletter for GSAP + Svelte tips and tutorials.</p>
          <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <input
              type="email"
              placeholder="you@example.com"
              bind:value={email}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          <button class="close-btn" onclick={closeNewsletter} aria-label="Close">&times;</button>
        {/if}
      </div>
    </div>
  {/if}

  <footer class="project-footer">
    <h3>Built With</h3>
    <div class="tech-tags">
      <span class="tag">GSAP Timelines</span>
      <span class="tag">ScrollTrigger</span>
      <span class="tag">Stagger</span>
      <span class="tag">bind:this</span>
      <span class="tag">$effect Bridge</span>
      <span class="tag">gsap.context() Cleanup</span>
      <span class="tag">use: Actions</span>
      <span class="tag">revealOnScroll</span>
      <span class="tag">Svelte Transitions</span>
      <span class="tag">Reduced Motion</span>
      <span class="tag">afterNavigate</span>
      <span class="tag">IntersectionObserver</span>
    </div>
    <p class="footer-note">Module 7: GSAP Integration — all concepts applied.</p>
  </footer>
</section>

<style>
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .project-page { display: flex; flex-direction: column; gap: var(--space-2xl); }

  /* Hero */
  .hero { position: relative; background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-2xl) var(--space-lg); text-align: center; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
  .hero-glow { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 400px; height: 400px; background: oklch(60% 0.20 320 / 0.15); border-radius: var(--radius-full); filter: blur(80px); pointer-events: none; }
  .hero-badge { position: relative; z-index: 1; font-size: var(--text-xs); font-weight: 600; color: oklch(60% 0.20 320); background: oklch(60% 0.20 320 / 0.1); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-full); border: 1px solid oklch(60% 0.20 320 / 0.3); }
  .hero-title { position: relative; z-index: 1; font-size: var(--text-2xl); color: var(--color-text); margin: 0; line-height: 1.2; }
  @media (min-width: 768px) { .hero-title { font-size: var(--text-hero); } }
  .hero-subtitle { position: relative; z-index: 1; font-size: var(--text-base); color: var(--color-text-muted); max-width: 50ch; margin: 0; line-height: 1.6; }
  .hero-actions { position: relative; z-index: 1; }
  .hero-cta { background: oklch(60% 0.20 320); color: white; border: none; padding: var(--space-sm) var(--space-xl); border-radius: var(--radius-md); font-size: var(--text-base); font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px oklch(60% 0.20 320 / 0.3); }

  /* Features */
  .features-section { display: flex; flex-direction: column; gap: var(--space-lg); }
  .section-heading { text-align: center; font-size: var(--text-xl); color: var(--color-text); margin: 0; }
  @media (min-width: 768px) { .section-heading { font-size: var(--text-2xl); } }

  .features-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }

  .feature-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); transition: box-shadow 0.3s, transform 0.3s; }
  .feature-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }
  .feature-icon { font-size: var(--text-2xl); margin-bottom: var(--space-sm); }
  .feature-title { margin: 0 0 var(--space-xs); color: var(--color-text); font-size: var(--text-base); }
  .feature-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }

  /* Testimonial */
  .testimonial-section { position: relative; overflow: hidden; background: oklch(60% 0.20 320); border-radius: var(--radius-lg); min-height: 280px; display: flex; align-items: center; justify-content: center; }
  .testimonial-inner { padding: var(--space-2xl) var(--space-lg); }
  .testimonial { margin: 0; text-align: center; max-width: 55ch; margin-inline: auto; }
  .testimonial p { font-size: var(--text-lg); color: white; font-style: italic; line-height: 1.6; margin: 0 0 var(--space-md); }
  .testimonial footer { color: rgba(255, 255, 255, 0.8); display: flex; flex-direction: column; gap: var(--space-xs); }
  .testimonial footer strong { color: white; font-size: var(--text-base); }
  .testimonial footer span { font-size: var(--text-sm); }

  /* Stats */
  .stats-section { display: flex; flex-direction: column; gap: var(--space-lg); }
  .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
  @media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }

  .stat { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); text-align: center; display: flex; flex-direction: column; gap: var(--space-xs); }
  .stat-number { font-size: var(--text-2xl); font-weight: 700; color: oklch(60% 0.20 320); }
  .stat-label { font-size: var(--text-sm); color: var(--color-text-muted); }

  /* Newsletter Modal */
  .overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 100; padding: var(--space-md); }
  .modal { position: relative; background: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); max-width: 440px; width: 100%; box-shadow: var(--shadow-lg); text-align: center; }
  .modal h2 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .modal p { margin: 0 0 var(--space-md); color: var(--color-text-muted); font-size: var(--text-sm); }
  .modal form { display: flex; flex-direction: column; gap: var(--space-sm); }
  .modal input { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: var(--space-sm) var(--space-md); font-size: var(--text-base); color: var(--color-text); outline: none; }
  .modal input:focus { border-color: oklch(60% 0.20 320); }
  .modal button[type="submit"] { background: oklch(60% 0.20 320); color: white; border: none; padding: var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-base); font-weight: 600; cursor: pointer; }
  .close-btn { position: absolute; top: var(--space-sm); right: var(--space-sm); background: none; border: none; font-size: var(--text-xl); color: var(--color-text-muted); cursor: pointer; padding: var(--space-xs); line-height: 1; }

  .success-msg { padding: var(--space-lg); display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); }
  .success-msg .check { font-size: var(--text-2xl); color: var(--color-success); }
  .success-msg h3 { margin: 0; color: var(--color-text); }
  .success-msg p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }

  /* Footer */
  .project-footer { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; }
  .project-footer h3 { margin: 0 0 var(--space-md); color: var(--color-text); }
  .tech-tags { display: flex; flex-wrap: wrap; gap: var(--space-xs); justify-content: center; margin-bottom: var(--space-md); }
  .tag { font-size: var(--text-xs); background: oklch(60% 0.20 320 / 0.1); color: oklch(60% 0.20 320); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-full); border: 1px solid oklch(60% 0.20 320 / 0.2); font-weight: 500; }
  .footer-note { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
</style>
