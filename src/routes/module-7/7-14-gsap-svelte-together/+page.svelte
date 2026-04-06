<script lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { fly, fade } from 'svelte/transition';

  gsap.registerPlugin(ScrollTrigger);

  let containerEl: HTMLElement | null = $state(null);
  let showModal = $state(false);

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scroll-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      gsap.fromTo('.parallax-bg', { y: 0 }, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerEl);
    return () => ctx.revert();
  });
</script>

<section class="page" bind:this={containerEl}>
  <h1>7.14 — GSAP + Svelte Together</h1>
  <p class="concept"><strong>Concept.</strong> GSAP and Svelte transitions are not competitors — they complement each other. Use Svelte transitions for mount/unmount animations (modals, toasts, conditional UI) and GSAP for scroll-driven effects, complex timelines, and choreographed sequences. They coexist cleanly on the same page.</p>

  <div class="build">
    <h2>When to Use Each</h2>
    <div class="guide-grid">
      <div class="guide-card svelte-side">
        <h4>Svelte Transitions</h4>
        <ul class="guide-list">
          <li>Modal open/close</li>
          <li>Toast notifications</li>
          <li>Conditional UI elements</li>
          <li>List item add/remove</li>
        </ul>
      </div>
      <div class="guide-card gsap-side">
        <h4>GSAP</h4>
        <ul class="guide-list">
          <li>Scroll-driven animations</li>
          <li>Complex timelines</li>
          <li>Staggered sequences</li>
          <li>Physics & advanced easing</li>
        </ul>
      </div>
    </div>

    <h2>Try It: Svelte Modal + GSAP Scroll</h2>
    <button onclick={openModal}>Open Modal (Svelte transition)</button>
    <p class="scroll-hint">Then scroll down for GSAP scroll animations.</p>
  </div>

  {#if showModal}
    <div class="overlay" transition:fade={{ duration: 200 }}>
      <div class="modal" in:fly={{ y: 50, duration: 300 }}>
        <h2>Svelte-Powered Modal</h2>
        <p>This modal uses <code>transition:fade</code> on the overlay and <code>in:fly</code> on the content. Svelte handles the mount/unmount animation naturally.</p>
        <button onclick={closeModal}>Close</button>
      </div>
    </div>
  {/if}

  <div class="spacer"></div>

  <div class="scroll-card">
    <h4>GSAP Scroll Card 1</h4>
    <p>This card animates in with GSAP ScrollTrigger as you scroll down.</p>
  </div>

  <div class="scroll-card">
    <h4>GSAP Scroll Card 2</h4>
    <p>Each card has its own ScrollTrigger instance for independent timing.</p>
  </div>

  <div class="parallax-section">
    <div class="parallax-bg"></div>
    <div class="parallax-content">
      <h2>Parallax Section</h2>
      <p>The background moves slower than the foreground using GSAP scrub.</p>
    </div>
  </div>

  <div class="scroll-card">
    <h4>GSAP Scroll Card 3</h4>
    <p>Both animation systems coexist without conflict on the same page.</p>
  </div>

  <div class="spacer-sm"></div>

  <h3>What you learned</h3>
  <ul>
    <li>Svelte transitions are best for mount/unmount animations (modals, toasts).</li>
    <li>GSAP excels at scroll-driven, timeline-based, and continuous animations.</li>
    <li>Both systems coexist on the same page with zero conflict.</li>
    <li>Choosing the right tool for each job leads to cleaner, more maintainable code.</li>
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

  .guide-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .guide-grid { grid-template-columns: 1fr 1fr; } }

  .guide-card { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
  .guide-card h4 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .guide-list { font-size: var(--text-sm); }
  .svelte-side { border-left: 3px solid var(--color-success); }
  .gsap-side { border-left: 3px solid var(--color-brand); }

  .scroll-hint { font-size: var(--text-sm); color: var(--color-brand); font-weight: 500; margin: 0; }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }

  .overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: var(--space-md); }
  .modal { background: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); max-width: 480px; width: 100%; box-shadow: var(--shadow-lg); }
  .modal h2 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .modal p { margin: 0 0 var(--space-md); color: var(--color-text-muted); font-size: var(--text-sm); }

  .spacer { height: 30vh; }
  .spacer-sm { height: 10vh; }

  .scroll-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-xl); margin-bottom: var(--space-lg); box-shadow: var(--shadow-sm); }
  .scroll-card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .scroll-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

  .parallax-section { position: relative; overflow: hidden; border-radius: var(--radius-lg); min-height: 300px; margin-bottom: var(--space-lg); }
  .parallax-bg { position: absolute; inset: -60px 0; background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dim) 100%); z-index: 0; }
  .parallax-content { position: relative; z-index: 1; padding: var(--space-2xl) var(--space-xl); color: var(--color-surface); }
  .parallax-content h2 { margin: 0 0 var(--space-sm); }
  .parallax-content p { margin: 0; opacity: 0.9; }
</style>
