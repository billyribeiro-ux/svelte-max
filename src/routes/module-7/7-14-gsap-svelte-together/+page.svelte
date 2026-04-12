<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import { ScrollTrigger } from 'gsap/ScrollTrigger';\n" +
		"  import { fly, fade } from 'svelte/transition';\n" +
		"\n" +
		"  gsap.registerPlugin(ScrollTrigger);\n" +
		"\n" +
		"  let containerEl: HTMLElement | null = $state(null);\n" +
		"  let showModal = $state(false);\n" +
		"\n" +
		"  function openModal() {\n" +
		"    showModal = true;\n" +
		"  }\n" +
		"\n" +
		"  function closeModal() {\n" +
		"    showModal = false;\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.utils.toArray\u003cHTMLElement\u003e('.scroll-card').forEach((card) =\u003e {\n" +
		"        gsap.from(card, {\n" +
		"          opacity: 0,\n" +
		"          y: 60,\n" +
		"          duration: 0.8,\n" +
		"          ease: 'power3.out',\n" +
		"          scrollTrigger: {\n" +
		"            trigger: card,\n" +
		"            start: 'top 85%',\n" +
		"            toggleActions: 'play none none reverse'\n" +
		"          }\n" +
		"        });\n" +
		"      });\n" +
		"\n" +
		"      gsap.fromTo('.parallax-bg', { y: 0 }, {\n" +
		"        y: -60,\n" +
		"        ease: 'none',\n" +
		"        scrollTrigger: {\n" +
		"          trigger: '.parallax-section',\n" +
		"          start: 'top bottom',\n" +
		"          end: 'bottom top',\n" +
		"          scrub: true\n" +
		"        }\n" +
		"      });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\" bind:this={containerEl}\u003e\n" +
		"  \u003ch1\u003e7.14 — GSAP + Svelte Together\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e GSAP and Svelte transitions are not competitors — they complement each other. Use Svelte transitions for mount/unmount animations (modals, toasts, conditional UI) and GSAP for scroll-driven effects, complex timelines, and choreographed sequences. They coexist cleanly on the same page.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eWhen to Use Each\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"guide-grid\"\u003e\n" +
		"      \u003cdiv class=\"guide-card svelte-side\"\u003e\n" +
		"        \u003ch4\u003eSvelte Transitions\u003c/h4\u003e\n" +
		"        \u003cul class=\"guide-list\"\u003e\n" +
		"          \u003cli\u003eModal open/close\u003c/li\u003e\n" +
		"          \u003cli\u003eToast notifications\u003c/li\u003e\n" +
		"          \u003cli\u003eConditional UI elements\u003c/li\u003e\n" +
		"          \u003cli\u003eList item add/remove\u003c/li\u003e\n" +
		"        \u003c/ul\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"guide-card gsap-side\"\u003e\n" +
		"        \u003ch4\u003eGSAP\u003c/h4\u003e\n" +
		"        \u003cul class=\"guide-list\"\u003e\n" +
		"          \u003cli\u003eScroll-driven animations\u003c/li\u003e\n" +
		"          \u003cli\u003eComplex timelines\u003c/li\u003e\n" +
		"          \u003cli\u003eStaggered sequences\u003c/li\u003e\n" +
		"          \u003cli\u003ePhysics & advanced easing\u003c/li\u003e\n" +
		"        \u003c/ul\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003ch2\u003eTry It: Svelte Modal + GSAP Scroll\u003c/h2\u003e\n" +
		"    \u003cbutton onclick={openModal}\u003eOpen Modal (Svelte transition)\u003c/button\u003e\n" +
		"    \u003cp class=\"scroll-hint\"\u003eThen scroll down for GSAP scroll animations.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  {#if showModal}\n" +
		"    \u003cdiv class=\"overlay\" transition:fade={{ duration: 200 }}\u003e\n" +
		"      \u003cdiv class=\"modal\" in:fly={{ y: 50, duration: 300 }}\u003e\n" +
		"        \u003ch2\u003eSvelte-Powered Modal\u003c/h2\u003e\n" +
		"        \u003cp\u003eThis modal uses \u003ccode\u003etransition:fade\u003c/code\u003e on the overlay and \u003ccode\u003ein:fly\u003c/code\u003e on the content. Svelte handles the mount/unmount animation naturally.\u003c/p\u003e\n" +
		"        \u003cbutton onclick={closeModal}\u003eClose\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  {/if}\n" +
		"\n" +
		"  \u003cdiv class=\"spacer\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"scroll-card\"\u003e\n" +
		"    \u003ch4\u003eGSAP Scroll Card 1\u003c/h4\u003e\n" +
		"    \u003cp\u003eThis card animates in with GSAP ScrollTrigger as you scroll down.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"scroll-card\"\u003e\n" +
		"    \u003ch4\u003eGSAP Scroll Card 2\u003c/h4\u003e\n" +
		"    \u003cp\u003eEach card has its own ScrollTrigger instance for independent timing.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"parallax-section\"\u003e\n" +
		"    \u003cdiv class=\"parallax-bg\"\u003e\u003c/div\u003e\n" +
		"    \u003cdiv class=\"parallax-content\"\u003e\n" +
		"      \u003ch2\u003eParallax Section\u003c/h2\u003e\n" +
		"      \u003cp\u003eThe background moves slower than the foreground using GSAP scrub.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"scroll-card\"\u003e\n" +
		"    \u003ch4\u003eGSAP Scroll Card 3\u003c/h4\u003e\n" +
		"    \u003cp\u003eBoth animation systems coexist without conflict on the same page.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer-sm\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eSvelte transitions are best for mount/unmount animations (modals, toasts).\u003c/li\u003e\n" +
		"    \u003cli\u003eGSAP excels at scroll-driven, timeline-based, and continuous animations.\u003c/li\u003e\n" +
		"    \u003cli\u003eBoth systems coexist on the same page with zero conflict.\u003c/li\u003e\n" +
		"    \u003cli\u003eChoosing the right tool for each job leads to cleaner, more maintainable code.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments clarify the boundary between Svelte transitions and GSAP, and what happens when you cross it.</p>
	<ol class="experiments">
		<li><strong>Replace the Svelte <code>transition:fade</code> on the overlay with a GSAP <code>gsap.from()</code> call.</strong> The overlay appears instantly because GSAP does not block the mount -- the element is in the DOM immediately and then animates. Svelte transitions, by contrast, delay the element's visual appearance until the transition completes, creating a smoother mount experience.</li>
		<li><strong>Add a Svelte <code>out:fly</code> transition to a scroll card that also has a GSAP ScrollTrigger.</strong> The Svelte transition and GSAP both try to control the element's opacity and transform simultaneously. They fight, producing jittery or incomplete animations -- proving that you should not mix both systems on the same element for the same properties.</li>
		<li><strong>Remove <code>return () =&gt; ctx.revert()</code> from the <code>$effect</code> and open/close the modal several times.</strong> Each modal open triggers <code>ScrollTrigger.refresh()</code> internally (because the DOM layout changes), but the orphaned ScrollTrigger instances from previous mounts are still alive, leading to duplicated or mis-timed scroll animations.</li>
		<li><strong>Move the parallax GSAP animation into a Svelte <code>use:</code> action instead of <code>$effect</code>.</strong> The animation still works, but now cleanup is handled per-element via <code>destroy()</code> rather than per-component via <code>ctx.revert()</code>. For a single parallax section this is fine, but for many elements the <code>gsap.context()</code> approach is more ergonomic.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">GSAP and Svelte transitions solve different problems and should be used accordingly. Svelte's <code>transition:</code>, <code>in:</code>, and <code>out:</code> directives are tightly integrated with the component lifecycle -- they animate elements during mount and unmount, blocking DOM removal until the out-transition completes. This makes them ideal for modals, toasts, conditional UI, and any element controlled by <code>{'{#if}'}</code> or <code>{'{#each}'}</code> blocks. GSAP, by contrast, is a runtime animation engine that operates on elements already in the DOM, making it the right choice for scroll-driven effects, complex timelines, staggered sequences, and continuous animations.</p>
	<p class="prose">The critical rule is to avoid mixing both systems on the same element for the same CSS properties. If a Svelte transition is animating <code>opacity</code> and <code>transform</code> during mount, a simultaneous GSAP tween targeting those same properties will create conflicts. The solution is architectural: use Svelte transitions for lifecycle-bound animations and GSAP for everything else, keeping each system's scope clearly defined.</p>
	<p class="prose">This lesson completes the GSAP module. You now have the vocabulary to choose the right animation layer for any requirement: CSS for simple states, Svelte transitions for mount/unmount, and GSAP for timeline choreography, scroll-driven motion, stagger sequences, and physics-based easing. The module project will bring all of these patterns together into a single, polished, production-quality page.</p>
	<p class="next">Next, apply everything you have learned in the Module 7 project.</p>
</section>

<style>
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
  @media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

  .guide-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-inline-size: 768px) { .guide-grid { grid-template-columns: 1fr 1fr; } }

  .guide-card { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
  .guide-card h4 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .guide-list { font-size: var(--text-sm); }
  .svelte-side { border-inline-start: 3px solid var(--color-success); }
  .gsap-side { border-inline-start: 3px solid var(--color-brand); }

  .scroll-hint { font-size: var(--text-sm); color: var(--color-brand); font-weight: 500; margin: 0; }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }

  .overlay { position: fixed; inset: 0; background: oklch(0% 0 0 / 0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: var(--space-md); }
  .modal { background: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); max-inline-size: 480px; inline-size: 100%; box-shadow: var(--shadow-lg); }
  .modal h2 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .modal p { margin: 0 0 var(--space-md); color: var(--color-text-muted); font-size: var(--text-sm); }

  .spacer { block-size: 30vh; }
  .spacer-sm { block-size: 10vh; }

  .scroll-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-xl); margin-block-end: var(--space-lg); box-shadow: var(--shadow-sm); }
  .scroll-card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .scroll-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

  .parallax-section { position: relative; overflow: hidden; border-radius: var(--radius-lg); min-block-size: 300px; margin-block-end: var(--space-lg); }
  .parallax-bg { position: absolute; inset: -60px 0; background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dim) 100%); z-index: 0; }
  .parallax-content { position: relative; z-index: 1; padding: var(--space-2xl) var(--space-xl); color: var(--color-surface); }
  .parallax-content h2 { margin: 0 0 var(--space-sm); }
  .parallax-content p { margin: 0; opacity: 0.9; }

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
