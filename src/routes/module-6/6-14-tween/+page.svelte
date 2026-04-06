<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = new Tween(0, { duration: 800, easing: cubicOut });

	const stops: number[] = [0, 25, 50, 75, 100];

	function setTo(value: number): void {
		progress.target = value;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { Tween } from 'svelte/motion';\n" +
		"\timport { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"\tconst progress = new Tween(0, { duration: 800, easing: cubicOut });\n" +
		"\n" +
		"\tconst stops: number[] = [0, 25, 50, 75, 100];\n" +
		"\n" +
		"\tfunction setTo(value: number): void {\n" +
		"\t\tprogress.target = value;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.14 — Tween class\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003eTween\u003c/code\u003e from \u003ccode\u003esvelte/motion\u003c/code\u003e is the Svelte 5\n" +
		"\t\treplacement for the deprecated \u003ccode\u003etweened\u003c/code\u003e store. Instantiate:\n" +
		"\t\t\u003ccode\u003econst progress = new Tween(0, &lbrace; duration: 600, easing: cubicOut &rbrace;)\u003c/code\u003e.\n" +
		"\t\tRead the current value via \u003ccode\u003eprogress.current\u003c/code\u003e (reactive). Set a new target via\n" +
		"\t\t\u003ccode\u003eprogress.target = 0.75\u003c/code\u003e — it smoothly animates. Differs from CSS transitions in\n" +
		"\t\tthat it works on JS numbers, not CSS properties — useful for SVG path lengths, counting text,\n" +
		"\t\tand anything that isn't CSS-animatable.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"bar\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"fill\" style:width=\"{progress.current}%\"\u003e\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cdiv class=\"count\"\u003e{Math.round(progress.current)}%\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t{#each stops as value}\n" +
		"\t\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e setTo(value)}\u003e{value}%\u003c/button\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"reset\" onclick={() =\u003e setTo(0)}\u003eReset\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eUse the \u003ccode\u003eTween\u003c/code\u003e class, not the deprecated \u003ccode\u003etweened\u003c/code\u003e store.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRead \u003ccode\u003e.current\u003c/code\u003e for the reactive interpolated value.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eAssign \u003ccode\u003e.target\u003c/code\u003e to animate toward a new value.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eIdeal for non-CSS values like counters, SVG paths, and canvas.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.14 — Tween class</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>Tween</code> from <code>svelte/motion</code> is the Svelte 5
		replacement for the deprecated <code>tweened</code> store. Instantiate:
		<code>const progress = new Tween(0, &lbrace; duration: 600, easing: cubicOut &rbrace;)</code>.
		Read the current value via <code>progress.current</code> (reactive). Set a new target via
		<code>progress.target = 0.75</code> — it smoothly animates. Differs from CSS transitions in
		that it works on JS numbers, not CSS properties — useful for SVG path lengths, counting text,
		and anything that isn't CSS-animatable.
	</p>

	<div class="build">
		<div class="bar">
			<div class="fill" style:width="{progress.current}%"></div>
		</div>
		<div class="count">{Math.round(progress.current)}%</div>

		<div class="controls">
			{#each stops as value}
				<button type="button" onclick={() => setTo(value)}>{value}%</button>
			{/each}
			<button type="button" class="reset" onclick={() => setTo(0)}>Reset</button>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Experiment with the Tween class to understand its reactive behavior and how it handles interruption.</p>
	<ol class="experiments">
		<li><strong>Use <code>new Tween()</code> without <code>$state</code></strong> — it's already reactive (class-based). The Tween class manages its own reactivity internally; you don't need to wrap it in <code>$state</code> because <code>.current</code> is already a reactive property.</li>
		<li><strong>Set duration to 0</strong> — instant snap, no animation. With zero duration, the tween jumps immediately to the target value, which is useful for bypassing animation when reduced motion is preferred.</li>
		<li><strong>Change <code>.target</code> while animating</strong> — smoothly redirects. If you set a new target before the current animation completes, the tween recalculates from its current interpolated position, creating natural-feeling interruptions.</li>
		<li><strong>Use with <code>prefersReducedMotion</code></strong> — skip animation, snap to target. Check <code>prefersReducedMotion.current</code> and set duration to 0 or use <code>.set(value, &lbrace; instant: true &rbrace;)</code> to respect accessibility preferences.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>Tween</code> class from <code>svelte/motion</code> is the Svelte 5 replacement for the deprecated <code>tweened</code> store, providing duration-based interpolation for JavaScript values that cannot be animated with CSS transitions. While CSS transitions handle property changes on DOM elements, many UI effects require animating raw numbers -- progress bars driven by data, counting text that increments from 0 to a target, SVG path lengths, canvas draw coordinates, and any computed value that feeds into a template expression. Tween fills this gap by interpolating between a starting value and a target value over a specified duration with a chosen easing curve.</p>
	<p class="prose">The API is class-based and reactive by design. You construct a tween with <code>new Tween(initialValue, &lbrace; duration, easing &rbrace;)</code>, read the interpolated value through <code>.current</code> (which updates reactively every animation frame), and drive animation by assigning to <code>.target</code>. This two-property interface -- target in, current out -- makes the data flow explicit and predictable. When you set a new target while the tween is mid-animation, it does not restart from the initial value; instead, it smoothly redirects from wherever <code>.current</code> is at that moment, creating natural-feeling interruptions that never jerk or teleport.</p>
	<p class="prose">Tween differs from Spring in a fundamental way: Tween uses duration and easing (time-based), while Spring uses stiffness and damping (physics-based). Choose Tween when you need precise timing control -- a progress bar should take exactly 800ms to fill, a counter should increment over exactly 1.2 seconds. Choose Spring when the animation should feel physically natural regardless of the distance traveled -- a dragged element should bounce with consistent energy whether it moved 10 pixels or 200. Both classes share the same <code>.target</code> / <code>.current</code> API, making them interchangeable if you change your mind about which motion model better suits the interaction.</p>
	<p class="next"><a href="/module-6/6-15-spring">Next lesson: 6.15 Spring</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.bar {
		inline-size: 100%;
		block-size: 16px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	.fill {
		block-size: 100%;
		background: var(--color-brand);
		border-radius: var(--radius-full);
	}
	.count {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		color: var(--color-text);
		text-align: center;
	}
	.controls {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.controls button {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-sm);
		font-family: var(--font-mono);
	}
	.controls button.reset {
		background: var(--color-surface-2);
		color: var(--color-text);
		border-color: var(--color-border);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}

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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
