<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';

	// Spring — alternative physics-based number animation for the first counter
	const springCounter = new Spring(0, { stiffness: 0.05, damping: 0.4 });
	$effect(() => {
		if (prefersReducedMotion.current) {
			springCounter.set(targets[0], { instant: true });
		} else {
			springCounter.target = targets[0];
		}
	});

	let targets = $state([1234, 98.7, 42500, 2_500_000]);

	function randomize(): void {
		targets = [
			Math.round(Math.random() * 5000),
			Math.round(Math.random() * 1000) / 10,
			Math.round(Math.random() * 100_000),
			Math.round(Math.random() * 5_000_000)
		];
	}

	const formats: Intl.NumberFormatOptions[] = [
		{ maximumFractionDigits: 0 },
		{ minimumFractionDigits: 1, maximumFractionDigits: 1, style: 'percent', useGrouping: false },
		{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
		{ notation: 'compact', maximumFractionDigits: 1 }
	];

	const labels = ['Users Online', 'Conversion', 'Revenue', 'Page Views'];

	/* IntersectionObserver demo */
	let observed = $state(false);
	let observerTarget: HTMLElement | undefined = $state(undefined);

	$effect(() => {
		if (!observerTarget) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) observed = true;
			},
			{ threshold: 0.5 }
		);
		observer.observe(observerTarget);
		return () => observer.disconnect();
	});

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';\n" +
		"	import { prefersReducedMotion } from 'svelte/motion';\n" +
		"\n" +
		"	let targets = $state([1234, 98.7, 42500, 2_500_000]);\n" +
		"\n" +
		"	function randomize(): void {\n" +
		"		targets = [\n" +
		"			Math.round(Math.random() * 5000),\n" +
		"			Math.round(Math.random() * 1000) / 10,\n" +
		"			Math.round(Math.random() * 100_000),\n" +
		"			Math.round(Math.random() * 5_000_000)\n" +
		"		];\n" +
		"	}\n" +
		"\n" +
		"	const formats: Intl.NumberFormatOptions[] = [\n" +
		"		{ maximumFractionDigits: 0 },\n" +
		"		{ minimumFractionDigits: 1, maximumFractionDigits: 1 },\n" +
		"		{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 },\n" +
		"		{ notation: 'compact', maximumFractionDigits: 1 }\n" +
		"	];\n" +
		"\n" +
		"	const labels = ['Users Online', 'Conversion', 'Revenue', 'Page Views'];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.6 — Animated Number Counter\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"counter-grid\"\u003e\n" +
		"			{#each targets as target, i}\n" +
		"				\u003cdiv class=\"counter-cell\"\u003e\n" +
		"					\u003cspan class=\"counter-label\"\u003e{labels[i]}\u003c/span\u003e\n" +
		"					\u003cAnimatedCounter value={target} format={formats[i]} /\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cbutton onclick={randomize}\u003eRandomize\u003c/button\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.6 — Animated Number Counter</h1>
	<p class="concept">
		<strong>Concept.</strong> Numbers that snap from one value to another feel dead.
		Numbers that tween feel alive. Use <code>Tween</code> from <code>svelte/motion</code>
		for smooth interpolation. Use <code>IntersectionObserver</code> to trigger
		the count only when scrolled into view. Format with <code>Intl.NumberFormat</code>
		for locale-aware display — currency, percentages, compact notation.
	</p>

	<div class="build">
		<h2>Four formatted counters</h2>
		<div class="counter-grid">
			{#each targets as target, i}
				<div class="counter-cell">
					<span class="counter-label">{labels[i]}</span>
					<span class="counter-value">
						<AnimatedCounter value={target} format={formats[i]} />
					</span>
				</div>
			{/each}
		</div>

		<button class="btn" type="button" onclick={randomize}>Randomize All</button>

		<h2>IntersectionObserver trigger</h2>
		<p class="hint">Scroll down — the counter starts at 0 and counts up when visible.</p>
		<div class="scroll-box">
			<div class="scroll-spacer">Scroll down to reveal the counter...</div>
			<div class="observer-target" bind:this={observerTarget}>
				<span class="counter-label">Triggered on View</span>
				<span class="counter-value">
					<AnimatedCounter value={observed ? 8472 : 0} format={{ maximumFractionDigits: 0 }} />
				</span>
			</div>
		</div>

		<p class="motion-note">
			Reduced motion: <strong>{prefersReducedMotion.current ? 'ON' : 'OFF'}</strong>
			— {prefersReducedMotion.current ? 'tween duration is 0, values snap instantly.' : 'tween animates over 600ms with cubicOut easing.'}
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>Tween</code> from <code>svelte/motion</code> smoothly interpolates between numeric values with configurable easing.</li>
		<li><code>Intl.NumberFormat</code> handles locale-aware formatting: currency, percentages, compact notation ("2.5M").</li>
		<li><code>IntersectionObserver</code> triggers the count animation only when the element scrolls into view.</li>
		<li><code>prefersReducedMotion</code> lets you set <code>duration: 0</code> so the value snaps instantly for users who need it.</li>
		<li><code>font-variant-numeric: tabular-nums</code> prevents layout shift as digits change.</li>
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

	.counter-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}

	.counter-cell {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.counter-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.counter-value {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-text);
		line-height: 1;
	}

	.btn {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition: opacity var(--dur-fast) var(--ease-out);
	}

	.btn:hover {
		opacity: 0.85;
	}

	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.scroll-box {
		max-block-size: 200px;
		overflow-y: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
	}

	.scroll-spacer {
		padding: var(--space-xl) var(--space-md);
		min-block-size: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.observer-target {
		padding: var(--space-lg) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		align-items: center;
		background: var(--color-surface-1);
		border-block-start: 1px solid var(--color-border);
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
		.counter-grid { grid-template-columns: repeat(4, 1fr); }
		.counter-value { font-size: var(--text-4xl); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
