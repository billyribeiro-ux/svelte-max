<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import { ScrollTrigger } from 'gsap/ScrollTrigger';\n" +
		"\n" +
		"  gsap.registerPlugin(ScrollTrigger);\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.from('.reveal-box', {\n" +
		"        opacity: 0,\n" +
		"        y: 60,\n" +
		"        duration: 1,\n" +
		"        ease: 'power3.out',\n" +
		"        scrollTrigger: {\n" +
		"          trigger: '.reveal-box',\n" +
		"          start: 'top 80%',\n" +
		"          end: 'top 20%',\n" +
		"          scrub: false,\n" +
		"          toggleActions: 'play none none reverse'\n" +
		"        }\n" +
		"      });\n" +
		"\n" +
		"      gsap.fromTo('.scrub-bar', { scaleX: 0 }, {\n" +
		"        scaleX: 1,\n" +
		"        ease: 'none',\n" +
		"        scrollTrigger: {\n" +
		"          trigger: '.scrub-section',\n" +
		"          start: 'top 80%',\n" +
		"          end: 'bottom 20%',\n" +
		"          scrub: true\n" +
		"        }\n" +
		"      });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.9 — ScrollTrigger\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e ScrollTrigger is a GSAP plugin that triggers or scrubs animations based on scroll position. Import it from \u003ccode\u003egsap/ScrollTrigger\u003c/code\u003e and register it with \u003ccode\u003egsap.registerPlugin(ScrollTrigger)\u003c/code\u003e. The \u003ccode\u003estart\u003c/code\u003e and \u003ccode\u003eend\u003c/code\u003e properties define the scroll range.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cpre\u003e{`import \\{ ScrollTrigger \\} from 'gsap/ScrollTrigger';\n" +
		"gsap.registerPlugin(ScrollTrigger);\n" +
		"\n" +
		"gsap.from('.box', \\{\n" +
		"  opacity: 0, y: 60,\n" +
		"  scrollTrigger: \\{\n" +
		"    trigger: '.box',\n" +
		"    start: 'top 80%',   // when top of box hits 80% viewport\n" +
		"    end: 'top 20%',     // when top of box hits 20% viewport\n" +
		"    scrub: true          // link progress to scroll position\n" +
		"  \\}\n" +
		"\\});`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cp class=\"scroll-hint\"\u003eScroll down to see the animations trigger.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"reveal-box\"\u003e\n" +
		"    \u003ch2\u003eRevealed on Scroll\u003c/h2\u003e\n" +
		"    \u003cp\u003eThis box animates in when it enters the viewport. It uses \u003ccode\u003etoggleActions\u003c/code\u003e to play on enter and reverse on leave.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer-sm\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"scrub-section\"\u003e\n" +
		"    \u003ch2\u003eScrub Progress Bar\u003c/h2\u003e\n" +
		"    \u003cp\u003eThis bar fills as you scroll through this section. \u003ccode\u003escrub: true\u003c/code\u003e links the animation directly to scroll position.\u003c/p\u003e\n" +
		"    \u003cdiv class=\"bar-track\"\u003e\n" +
		"      \u003cdiv class=\"scrub-bar\"\u003e\u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer-sm\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eScrollTrigger connects GSAP animations to scroll position.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003estart\u003c/code\u003e and \u003ccode\u003eend\u003c/code\u003e define the scroll range in viewport-relative terms.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003escrub: true\u003c/code\u003e links animation progress directly to scroll position.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003etoggleActions\u003c/code\u003e defines behavior for enter, leave, enterBack, and leaveBack.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
