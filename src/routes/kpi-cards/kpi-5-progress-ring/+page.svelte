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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Two SVG <code>&lt;circle&gt;</code> elements create the ring: a background track and a foreground arc.</li>
		<li><code>stroke-dasharray</code> sets the full circumference; <code>stroke-dashoffset</code> controls how much arc is visible.</li>
		<li><code>Tween</code> from <code>svelte/motion</code> smoothly interpolates the offset value.</li>
		<li><code>prefersReducedMotion.current</code> lets you set <code>duration: 0</code> to skip animation for users who prefer it.</li>
		<li>A reactive slider bound to the <code>value</code> prop shows how the ring animates on every change.</li>
	</ul>
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
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

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
		width: 200px;
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
