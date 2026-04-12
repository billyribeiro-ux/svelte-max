<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import ProgressRing from '$lib/components/ProgressRing.svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	let sliderValue = $state(62);

	const presets = [
		{ value: 25, color: 'var(--color-error)', label: 'Critical' },
		{ value: 50, color: 'oklch(70% 0.18 60)', label: 'Warning' },
		{ value: 75, color: 'var(--color-brand)', label: 'Good' },
		{ value: 100, color: 'var(--color-success)', label: 'Perfect' }
	];

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import ProgressRing from '$lib/components/ProgressRing.svelte';\n" +
		"	import { prefersReducedMotion } from 'svelte/motion';\n" +
		"\n" +
		"	let sliderValue = $state(62);\n" +
		"\n" +
		"	const presets = [\n" +
		"		{ value: 25, color: 'var(--color-error)', label: 'Critical' },\n" +
		"		{ value: 50, color: 'oklch(70% 0.18 60)', label: 'Warning' },\n" +
		"		{ value: 75, color: 'var(--color-brand)', label: 'Good' },\n" +
		"		{ value: 100, color: 'var(--color-success)', label: 'Perfect' }\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.5 — SVG Circular Progress Ring\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A progress ring shows how close a metric is to its\n" +
		"		target — percentage visualized as an arc. Built from two SVG\n" +
		"		\u003ccode\u003e&lt;circle&gt;\u003c/code\u003e elements: a background track and a foreground arc.\n" +
		"		The arc length is controlled by \u003ccode\u003estroke-dasharray\u003c/code\u003e (full\n" +
		"		circumference) and \u003ccode\u003estroke-dashoffset\u003c/code\u003e (how much to hide).\n" +
		"		Animated with \u003ccode\u003eTween\u003c/code\u003e from \u003ccode\u003esvelte/motion\u003c/code\u003e.\n" +
		"		When \u003ccode\u003eprefersReducedMotion\u003c/code\u003e is active, the tween duration\n" +
		"		drops to zero — the value updates instantly.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003ePreset values\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"ring-row\"\u003e\n" +
		"			{#each presets as p}\n" +
		"				\u003cdiv class=\"ring-cell\"\u003e\n" +
		"					\u003cProgressRing value={p.value} color={p.color} /\u003e\n" +
		"					\u003cspan class=\"ring-label\"\u003e{p.label}\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch2\u003eReactive slider\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"slider-demo\"\u003e\n" +
		"			\u003cProgressRing value={sliderValue} size={120} strokeWidth={8} /\u003e\n" +
		"			\u003clabel class=\"slider-label\"\u003e\n" +
		"				\u003cspan\u003eValue: {sliderValue}%\u003c/span\u003e\n" +
		"				\u003cinput type=\"range\" min=\"0\" max=\"100\" step=\"1\" bind:value={sliderValue} /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cp class=\"motion-note\"\u003e\n" +
		"			Reduced motion: \u003cstrong\u003e{prefersReducedMotion.current ? 'ON' : 'OFF'}\u003c/strong\u003e\n" +
		"			— {prefersReducedMotion.current ? 'tween duration is 0, values snap instantly.' : 'tween animates over 600ms.'}\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.5 — SVG Circular Progress Ring</h1>
	<p class="concept">
		<strong>Concept.</strong> A progress ring shows how close a metric is to its
		target — percentage visualized as an arc. Built from two SVG
		<code>&lt;circle&gt;</code> elements: a background track and a foreground arc.
		The arc length is controlled by <code>stroke-dasharray</code> (full
		circumference) and <code>stroke-dashoffset</code> (how much to hide).
		Animated with <code>Tween</code> from <code>svelte/motion</code>.
		When <code>prefersReducedMotion</code> is active, the tween duration
		drops to zero — the value updates instantly.
	</p>

	<div class="build">
		<h2>Preset values</h2>
		<div class="ring-row">
			{#each presets as p}
				<div class="ring-cell">
					<ProgressRing value={p.value} color={p.color} />
					<span class="ring-label-text">{p.label}</span>
				</div>
			{/each}
		</div>

		<h2>Reactive slider</h2>
		<div class="slider-demo">
			<ProgressRing value={sliderValue} size={120} strokeWidth={8} />
			<label class="slider-label">
				<span>Value: {sliderValue}%</span>
				<input type="range" min="0" max="100" step="1" bind:value={sliderValue} />
			</label>
		</div>

		<p class="motion-note">
			Reduced motion: <strong>{prefersReducedMotion.current ? 'ON' : 'OFF'}</strong>
			— {prefersReducedMotion.current ? 'tween duration is 0, values snap instantly.' : 'tween animates over 600ms.'}
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Progress rings use a clever SVG trick with dash arrays. Break the math to see how it works under the hood.</p>
	<ol class="experiments">
		<li><strong>Set <code>stroke-dasharray</code> to half the circumference instead of the full value.</strong> The ring will draw a partial track that repeats in a dashed pattern instead of showing a clean arc. The dasharray must equal the full circumference so that a single dash covers the entire ring.</li>
		<li><strong>Set <code>stroke-dashoffset</code> to <code>0</code> regardless of the value.</strong> The ring will always show as 100% full. The offset is what hides the portion of the stroke that should not be visible — setting it to zero means nothing is hidden.</li>
		<li><strong>Remove the <code>transform="rotate(-90)"</code> from the foreground circle.</strong> The arc will start drawing from the 3 o'clock position instead of 12 o'clock. SVG circles start their stroke at the rightmost point by default, and the rotation corrects this to match conventional progress indicators.</li>
		<li><strong>Pass a value greater than 100 (e.g., <code>150</code>).</strong> The arc will wrap past its starting point, creating an overlapping visual artifact. Production components should clamp the value between 0 and 100 to prevent this.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A progress ring is built from two SVG <code>&lt;circle&gt;</code> elements: a background track drawn at full opacity and a foreground arc whose visible length is controlled by the <code>stroke-dasharray</code> and <code>stroke-dashoffset</code> properties. The dasharray equals the full circumference, and the offset hides the undrawn portion.</p>
	<p class="prose">The <code>Tween</code> class from <code>svelte/motion</code> smoothly interpolates the dashoffset value, creating fluid arc animations when the percentage changes. When <code>prefersReducedMotion.current</code> is true, the tween duration drops to zero so the ring updates instantly — this is not optional for accessibility.</p>
	<p class="prose">A reactive slider bound to the <code>value</code> prop demonstrates the ring's real-time responsiveness. Every slider change triggers the tween, and the arc smoothly grows or shrinks. This same binding pattern works with any reactive data source — API responses, WebSocket messages, or derived computations.</p>
	<p class="next">Next lesson: KPI.6 builds an animated number counter with locale-aware formatting.</p>
</section>

<style>
	/* @property — typed custom property for the interactive slider demo */
	@property --demo-progress {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}

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
	.build h2 {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0;
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

	.ring-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-lg);
		align-items: center;
	}

	.ring-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
	}

	.ring-label-text {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.slider-demo {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		flex-wrap: wrap;
	}

	.slider-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.slider-label input[type='range'] {
		inline-size: 200px;
		accent-color: var(--color-brand);
	}

	.motion-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
