<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { TransitionConfig } from 'svelte/transition';

	interface TypewriterParams {
		speed?: number;
	}

	function typewriter(node: Element, { speed = 1 }: TypewriterParams = {}): TransitionConfig {
		const text = node.textContent ?? '';
		const duration = text.length / (speed * 0.05);
		return {
			duration,
			tick: (t: number) => {
				const i = Math.floor(text.length * t);
				(node as HTMLElement).textContent = text.slice(0, i);
			}
		};
	}

	let show = $state(true);
	let showSlow = $state(true);

	const sample =
		'Custom transitions let you express motion that built-ins cannot — like this character-by-character reveal.';
	const sampleSlow =
		'Slower speed means more dramatic reveal. Same function, different parameter.';

	function replay() {
		show = false;
		setTimeout(() => {
			show = true;
		}, 30);
	}

	function replaySlow() {
		showSlow = false;
		setTimeout(() => {
			showSlow = true;
		}, 30);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import type { TransitionConfig } from 'svelte/transition';\n" +
		"\n" +
		"\tinterface TypewriterParams {\n" +
		"\t\tspeed?: number;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction typewriter(node: Element, { speed = 1 }: TypewriterParams = {}): TransitionConfig {\n" +
		"\t\tconst text = node.textContent ?? '';\n" +
		"\t\tconst duration = text.length / (speed * 0.05);\n" +
		"\t\treturn {\n" +
		"\t\t\tduration,\n" +
		"\t\t\ttick: (t: number) =\u003e {\n" +
		"\t\t\t\tconst i = Math.floor(text.length * t);\n" +
		"\t\t\t\t(node as HTMLElement).textContent = text.slice(0, i);\n" +
		"\t\t\t}\n" +
		"\t\t};\n" +
		"\t}\n" +
		"\n" +
		"\tlet show = $state(true);\n" +
		"\tlet showSlow = $state(true);\n" +
		"\n" +
		"\tconst sample =\n" +
		"\t\t'Custom transitions let you express motion that built-ins cannot — like this character-by-character reveal.';\n" +
		"\tconst sampleSlow =\n" +
		"\t\t'Slower speed means more dramatic reveal. Same function, different parameter.';\n" +
		"\n" +
		"\tfunction replay() {\n" +
		"\t\tshow = false;\n" +
		"\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\tshow = true;\n" +
		"\t\t}, 30);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction replaySlow() {\n" +
		"\t\tshowSlow = false;\n" +
		"\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\tshowSlow = true;\n" +
		"\t\t}, 30);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.16 — Custom transition functions\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Built-in transitions like \u003ccode\u003efade\u003c/code\u003e, \u003ccode\u003efly\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003eslide\u003c/code\u003e, \u003ccode\u003escale\u003c/code\u003e cover most cases. For unique effects, write your own. A\n" +
		"\t\ttransition function takes \u003ccode\u003e(node, params)\u003c/code\u003e and returns a config with\n" +
		"\t\t\u003ccode\u003eduration\u003c/code\u003e, \u003ccode\u003eeasing\u003c/code\u003e, and either \u003ccode\u003ecss(t, u)\u003c/code\u003e for\n" +
		"\t\tCSS-expressible animations or \u003ccode\u003etick(t, u)\u003c/code\u003e for JS-driven animation when CSS cannot\n" +
		"\t\texpress the effect (e.g. text splitting).\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={replay}\u003eReplay (speed 1)\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t{#if show}\n" +
		"\t\t\t\u003cp class=\"typed\" in:typewriter={{ speed: 1 }}\u003e{sample}\u003c/p\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cp class=\"typed placeholder\"\u003e&nbsp;\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={replaySlow}\u003eReplay slower (speed 0.5)\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t{#if showSlow}\n" +
		"\t\t\t\u003cp class=\"typed\" in:typewriter={{ speed: 0.5 }}\u003e{sampleSlow}\u003c/p\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cp class=\"typed placeholder\"\u003e&nbsp;\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eCustom transitions are just functions returning a \u003ccode\u003eTransitionConfig\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003ecss(t, u)\u003c/code\u003e for CSS-expressible animations.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003etick(t, u)\u003c/code\u003e when you need to touch the DOM directly each frame.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eParameterize with a typed params object for reusability.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.16 — Custom transition functions</h1>
	<p class="concept">
		<strong>Concept.</strong> Built-in transitions like <code>fade</code>, <code>fly</code>,
		<code>slide</code>, <code>scale</code> cover most cases. For unique effects, write your own. A
		transition function takes <code>(node, params)</code> and returns a config with
		<code>duration</code>, <code>easing</code>, and either <code>css(t, u)</code> for
		CSS-expressible animations or <code>tick(t, u)</code> for JS-driven animation when CSS cannot
		express the effect (e.g. text splitting).
	</p>

	<div class="build">
		<div class="row">
			<button type="button" onclick={replay}>Replay (speed 1)</button>
		</div>
		{#if show}
			<p class="typed" in:typewriter={{ speed: 1 }}>{sample}</p>
		{:else}
			<p class="typed placeholder">&nbsp;</p>
		{/if}

		<div class="row">
			<button type="button" onclick={replaySlow}>Replay slower (speed 0.5)</button>
		</div>
		{#if showSlow}
			<p class="typed" in:typewriter={{ speed: 0.5 }}>{sampleSlow}</p>
		{:else}
			<p class="typed placeholder">&nbsp;</p>
		{/if}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Experiment with custom transition function signatures to understand the difference between CSS and JS animation paths.</p>
	<ol class="experiments">
		<li><strong>Return only <code>css</code></strong> — works for CSS-animatable properties. The <code>css(t, u)</code> function returns a CSS string that Svelte compiles into a <code>@keyframes</code> rule, running the animation on the compositor thread for maximum performance.</li>
		<li><strong>Return only <code>tick</code></strong> — works for JS-driven animation (canvas, WebGL). The <code>tick(t, u)</code> callback fires every frame on the main thread, allowing direct DOM manipulation that CSS keyframes cannot express.</li>
		<li><strong>Forget to return <code>{'{ duration }'}</code></strong> — transition runs for 0ms. Without a duration in the returned config, Svelte defaults to zero, causing the transition to complete instantly with no visible animation.</li>
		<li><strong>Use <code>easing: cubicOut</code></strong> — smoother than linear. Adding an easing function to the returned config transforms the linear <code>t</code> progression into a curve, making the animation feel more natural.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Custom transitions unlock unlimited animation possibilities beyond what Svelte's built-in transitions provide. A custom transition is simply a function with the signature <code>(node: Element, params: object) => TransitionConfig</code>. The returned config object specifies <code>duration</code>, optionally <code>delay</code> and <code>easing</code>, and either a <code>css(t, u)</code> function for CSS-expressible animations or a <code>tick(t, u)</code> callback for JavaScript-driven effects. The parameter <code>t</code> progresses from 0 to 1 during entry and from 1 to 0 during exit; <code>u</code> is always <code>1 - t</code>, provided as a convenience.</p>
	<p class="prose">The choice between <code>css</code> and <code>tick</code> has significant performance implications. When you return a <code>css</code> function, Svelte samples it at several points along the duration, generates a <code>@keyframes</code> rule, and applies it as a CSS animation. This runs entirely on the browser's compositor thread, meaning it will not jank even if the main thread is busy with JavaScript. The <code>tick</code> callback, by contrast, runs on the main thread every animation frame, giving you direct access to the DOM node but at the cost of potential jank under load. Use <code>css</code> whenever the effect can be expressed as CSS properties; reserve <code>tick</code> for effects that require DOM manipulation, like the typewriter effect that progressively reveals text content character by character.</p>
	<p class="prose">Parameterizing custom transitions with a typed interface makes them reusable across your application. The typewriter transition in this lesson accepts a <code>speed</code> parameter that controls how quickly characters appear, and the duration is computed dynamically based on the text length. This pattern -- measuring the node, computing duration from content, and exposing tuning knobs via parameters -- is how production transition libraries are built. You can create transitions for text scramble effects, pixel dissolves, SVG path drawing, and any other creative animation, all with the same declarative <code>in:</code> / <code>out:</code> / <code>transition:</code> syntax that Svelte developers already know.</p>
	<p class="next"><a href="/module-6/6-17-stagger-patterns">Next lesson: 6.17 Stagger patterns</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72rem;
		margin-inline: auto;
		color: var(--color-text);
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
	.row {
		display: flex;
		gap: var(--space-sm);
	}
	button {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.typed {
		margin: 0;
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: var(--text-base);
		line-height: 1.6;
		min-block-size: 4em;
	}
	.placeholder {
		color: var(--color-text-muted);
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
