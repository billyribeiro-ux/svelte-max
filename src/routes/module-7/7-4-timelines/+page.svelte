<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let titleEl: HTMLHeadingElement | null = $state(null);
  let subtitleEl: HTMLParagraphElement | null = $state(null);
  let ctaEl: HTMLButtonElement | null = $state(null);

  function playTimeline() {
    if (!titleEl || !subtitleEl || !ctaEl) return;

    gsap.set([titleEl, subtitleEl, ctaEl], { clearProps: 'all' });

    const tl = gsap.timeline();
    tl.from(titleEl, { x: -100, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from(subtitleEl, { x: -60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .from(ctaEl, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '>');
  }

  $effect(() => {
    if (!containerEl || !titleEl) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(titleEl!, { x: -100, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(subtitleEl!, { x: -60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from(ctaEl!, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '>');
    }, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"  let titleEl: HTMLHeadingElement | null = $state(null);\n" +
		"  let subtitleEl: HTMLParagraphElement | null = $state(null);\n" +
		"  let ctaEl: HTMLButtonElement | null = $state(null);\n" +
		"\n" +
		"  function playTimeline() {\n" +
		"    if (!titleEl || !subtitleEl || !ctaEl) return;\n" +
		"\n" +
		"    gsap.set([titleEl, subtitleEl, ctaEl], { clearProps: 'all' });\n" +
		"\n" +
		"    const tl = gsap.timeline();\n" +
		"    tl.from(titleEl, { x: -100, opacity: 0, duration: 0.6, ease: 'power3.out' })\n" +
		"      .from(subtitleEl, { x: -60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')\n" +
		"      .from(ctaEl, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '\u003e');\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || !titleEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      const tl = gsap.timeline({ delay: 0.3 });\n" +
		"      tl.from(titleEl!, { x: -100, opacity: 0, duration: 0.6, ease: 'power3.out' })\n" +
		"        .from(subtitleEl!, { x: -60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')\n" +
		"        .from(ctaEl!, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '\u003e');\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.4 — Timelines\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e A \u003ccode\u003egsap.timeline()\u003c/code\u003e sequences multiple tweens one after another. The position parameter controls overlap: \u003ccode\u003e&quot;&lt;&quot;\u003c/code\u003e means \"at the start of the previous\", \u003ccode\u003e&quot;&gt;&quot;\u003c/code\u003e means \"after the previous ends\", and \u003ccode\u003e&quot;-=0.2&quot;\u003c/code\u003e means \"0.2s before the previous ends\".\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cdiv class=\"stage\"\u003e\n" +
		"      \u003ch2 class=\"stage-title\" bind:this={titleEl}\u003eWelcome to GSAP\u003c/h2\u003e\n" +
		"      \u003cp class=\"stage-subtitle\" bind:this={subtitleEl}\u003ePowerful timeline sequencing\u003c/p\u003e\n" +
		"      \u003cbutton class=\"stage-cta\" bind:this={ctaEl}\u003eGet Started\u003c/button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cbutton class=\"replay-btn\" onclick={playTimeline}\u003eReplay Timeline\u003c/button\u003e\n" +
		"\n" +
		"    \u003cpre\u003e{`const tl = gsap.timeline();\n" +
		"\n" +
		"tl.from(title, \\{\n" +
		"    x: -100, opacity: 0, duration: 0.6\n" +
		"  \\})\n" +
		"  .from(subtitle, \\{\n" +
		"    x: -60, opacity: 0, duration: 0.5\n" +
		"  \\}, '-=0.2')   // overlap by 0.2s\n" +
		"  .from(cta, \\{\n" +
		"    scale: 0, opacity: 0, duration: 0.4\n" +
		"  \\}, '\u003e');       // after previous ends`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"position-guide\"\u003e\n" +
		"      \u003ch4\u003ePosition Parameter Cheatsheet\u003c/h4\u003e\n" +
		"      \u003cdiv class=\"param\"\u003e\u003ccode\u003e\"&gt;\"\u003c/code\u003e — after the previous tween ends (default)\u003c/div\u003e\n" +
		"      \u003cdiv class=\"param\"\u003e\u003ccode\u003e\"&lt;\"\u003c/code\u003e — at the start of the previous tween\u003c/div\u003e\n" +
		"      \u003cdiv class=\"param\"\u003e\u003ccode\u003e\"-=0.2\"\u003c/code\u003e — 0.2s before the previous tween ends\u003c/div\u003e\n" +
		"      \u003cdiv class=\"param\"\u003e\u003ccode\u003e\"+=0.5\"\u003c/code\u003e — 0.5s gap after the previous tween ends\u003c/div\u003e\n" +
		"      \u003cdiv class=\"param\"\u003e\u003ccode\u003e1.5\u003c/code\u003e — at exactly 1.5 seconds on the timeline\u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egsap.timeline()\u003c/code\u003e creates a sequence of tweens that play one after another.\u003c/li\u003e\n" +
		"    \u003cli\u003eThe position parameter controls timing overlaps between tweens.\u003c/li\u003e\n" +
		"    \u003cli\u003eTimelines can be paused, reversed, and controlled programmatically.\u003c/li\u003e\n" +
		"    \u003cli\u003eChaining \u003ccode\u003e.from()\u003c/code\u003e, \u003ccode\u003e.to()\u003c/code\u003e, and \u003ccode\u003e.fromTo()\u003c/code\u003e on a timeline keeps animations organized.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.4 — Timelines</h1>
  <p class="concept"><strong>Concept.</strong> A <code>gsap.timeline()</code> sequences multiple tweens one after another. The position parameter controls overlap: <code>&quot;&lt;&quot;</code> means "at the start of the previous", <code>&quot;&gt;&quot;</code> means "after the previous ends", and <code>&quot;-=0.2&quot;</code> means "0.2s before the previous ends".</p>

  <div class="build" bind:this={containerEl}>
    <div class="stage">
      <h2 class="stage-title" bind:this={titleEl}>Welcome to GSAP</h2>
      <p class="stage-subtitle" bind:this={subtitleEl}>Powerful timeline sequencing</p>
      <button class="stage-cta" bind:this={ctaEl}>Get Started</button>
    </div>

    <button class="replay-btn" onclick={playTimeline}>Replay Timeline</button>

    <pre>{`const tl = gsap.timeline();

tl.from(title, \{
    x: -100, opacity: 0, duration: 0.6
  \})
  .from(subtitle, \{
    x: -60, opacity: 0, duration: 0.5
  \}, '-=0.2')   // overlap by 0.2s
  .from(cta, \{
    scale: 0, opacity: 0, duration: 0.4
  \}, '>');       // after previous ends`}</pre>

    <div class="position-guide">
      <h4>Position Parameter Cheatsheet</h4>
      <div class="param"><code>"&gt;"</code> — after the previous tween ends (default)</div>
      <div class="param"><code>"&lt;"</code> — at the start of the previous tween</div>
      <div class="param"><code>"-=0.2"</code> — 0.2s before the previous tween ends</div>
      <div class="param"><code>"+=0.5"</code> — 0.5s gap after the previous tween ends</div>
      <div class="param"><code>1.5</code> — at exactly 1.5 seconds on the timeline</div>
    </div>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>gsap.timeline()</code> creates a sequence of tweens that play one after another.</li>
    <li>The position parameter controls timing overlaps between tweens.</li>
    <li>Timelines can be paused, reversed, and controlled programmatically.</li>
    <li>Chaining <code>.from()</code>, <code>.to()</code>, and <code>.fromTo()</code> on a timeline keeps animations organized.</li>
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

  .stage { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-xl); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); }
  .stage-title { font-size: var(--text-xl); color: var(--color-text); margin: 0; }
  .stage-subtitle { font-size: var(--text-base); color: var(--color-text-muted); margin: 0; }
  .stage-cta { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-sm) var(--space-lg); border-radius: var(--radius-md); font-size: var(--text-base); font-weight: 600; cursor: pointer; }

  .replay-btn { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  .replay-btn:hover { background: var(--color-brand-dim); }

  .position-guide { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
  .position-guide h4 { margin: 0 0 var(--space-sm); color: var(--color-text); font-size: var(--text-sm); }
  .param { font-size: var(--text-sm); color: var(--color-text-muted); padding: var(--space-xs) 0; }

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
