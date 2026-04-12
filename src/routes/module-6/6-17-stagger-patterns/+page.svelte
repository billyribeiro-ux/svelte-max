<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';

	interface Card {
		id: number;
		title: string;
		description: string;
	}

	const cards: Card[] = [
		{ id: 1, title: 'Fast', description: 'Zero-config dev server with instant HMR.' },
		{ id: 2, title: 'Typed', description: 'First-class TypeScript support everywhere.' },
		{ id: 3, title: 'Reactive', description: 'Runes make state transparent and simple.' },
		{ id: 4, title: 'Small', description: 'Compile-time optimizations keep bundles lean.' },
		{ id: 5, title: 'Accessible', description: 'A11y warnings baked into the compiler.' },
		{ id: 6, title: 'Animated', description: 'Transitions and motion built into the framework.' },
		{ id: 7, title: 'Routed', description: 'SvelteKit gives you file-based routing.' },
		{ id: 8, title: 'Deployable', description: 'Adapters for every platform you target.' }
	];

	let visible = $state(true);

	function replay() {
		visible = false;
		setTimeout(() => {
			visible = true;
		}, 30);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { fly, fade } from 'svelte/transition';\n" +
		"\timport { cubicOut } from 'svelte/easing';\n" +
		"\timport { prefersReducedMotion } from 'svelte/motion';\n" +
		"\n" +
		"\tinterface Card {\n" +
		"\t\tid: number;\n" +
		"\t\ttitle: string;\n" +
		"\t\tdescription: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst cards: Card[] = [\n" +
		"\t\t{ id: 1, title: 'Fast', description: 'Zero-config dev server with instant HMR.' },\n" +
		"\t\t{ id: 2, title: 'Typed', description: 'First-class TypeScript support everywhere.' },\n" +
		"\t\t{ id: 3, title: 'Reactive', description: 'Runes make state transparent and simple.' },\n" +
		"\t\t{ id: 4, title: 'Small', description: 'Compile-time optimizations keep bundles lean.' },\n" +
		"\t\t{ id: 5, title: 'Accessible', description: 'A11y warnings baked into the compiler.' },\n" +
		"\t\t{ id: 6, title: 'Animated', description: 'Transitions and motion built into the framework.' },\n" +
		"\t\t{ id: 7, title: 'Routed', description: 'SvelteKit gives you file-based routing.' },\n" +
		"\t\t{ id: 8, title: 'Deployable', description: 'Adapters for every platform you target.' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet visible = $state(true);\n" +
		"\n" +
		"\tfunction replay() {\n" +
		"\t\tvisible = false;\n" +
		"\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\tvisible = true;\n" +
		"\t\t}, 30);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.17 — Stagger patterns\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e When many items enter at once, give each a small delay offset based on\n" +
		"\t\tits index so they sequence in instead of arriving simultaneously. In Svelte this is a single\n" +
		"\t\tline inside an \u003ccode\u003e{'{#each}'}\u003c/code\u003e: \u003ccode\u003etransition:fly={'{{ delay: i * 50, y: 20 }}'}\u003c/code\u003e.\n" +
		"\t\tStagger creates visual hierarchy and rhythm without extra code.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={replay}\u003ePlay\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t{#if visible}\n" +
		"\t\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t\t{#each cards as card, i (card.id)}\n" +
		"\t\t\t\t\t\u003cdiv\n" +
		"\t\t\t\t\t\tclass=\"card\"\n" +
		"\t\t\t\t\t\tin:fly={prefersReducedMotion.current\n" +
		"\t\t\t\t\t\t\t? { y: 0, delay: 0, duration: 150 }\n" +
		"\t\t\t\t\t\t\t: { y: 30, delay: i * 80, duration: 500, easing: cubicOut }}\n" +
		"\t\t\t\t\t\tout:fade={{ duration: prefersReducedMotion.current ? 150 : 200 }}\n" +
		"\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\u003ch4\u003e{card.title}\u003c/h4\u003e\n" +
		"\t\t\t\t\t\t\u003cp\u003e{card.description}\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eStagger = per-index delay offset inside a loop.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eCapture the index in \u003ccode\u003e{'{#each items as item, i}'}\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eKeep each item keyed so re-mounts retrigger the transition.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSeparate \u003ccode\u003ein:\u003c/code\u003e and \u003ccode\u003eout:\u003c/code\u003e directives for entrance vs. exit.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eStagger \u003cstrong\u003emust\u003c/strong\u003e respect \u003ccode\u003eprefersReducedMotion\u003c/code\u003e — repeated delayed motion is a vestibular trigger. When reduced motion is active, drop delays and use short fades instead.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.17 — Stagger patterns</h1>
	<p class="concept">
		<strong>Concept.</strong> When many items enter at once, give each a small delay offset based on
		its index so they sequence in instead of arriving simultaneously. In Svelte this is a single
		line inside an <code>{'{#each}'}</code>: <code>transition:fly={'{{ delay: i * 50, y: 20 }}'}</code>.
		Stagger creates visual hierarchy and rhythm without extra code.
	</p>

	<div class="build">
		<div class="row">
			<button type="button" onclick={replay}>Play</button>
		</div>
		{#if visible}
			<div class="grid">
				{#each cards as card, i (card.id)}
					<div
						class="card"
						in:fly={prefersReducedMotion.current
							? { y: 0, delay: 0, duration: 150 }
							: { y: 30, delay: i * 80, duration: 500, easing: cubicOut }}
						out:fade={{ duration: prefersReducedMotion.current ? 150 : 200 }}
					>
						<h4>{card.title}</h4>
						<p>{card.description}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Modify stagger timing to understand how delay offsets create visual rhythm and when they become problematic.</p>
	<ol class="experiments">
		<li><strong>Same delay for all items</strong> — they all animate together. Without per-index delay offsets, every item enters simultaneously, creating a single flash rather than a cascading sequence.</li>
		<li><strong>Add <code>index * 50ms</code> delay</strong> — sequential cascade effect. Each successive item enters 50ms after the previous one, creating the characteristic stagger waterfall that draws the eye through the content.</li>
		<li><strong>Reverse the stagger</strong> — items animate from bottom to top. Using <code>(cards.length - i) * 50ms</code> inverts the sequence, which can create interesting effects for exit animations or upward-flowing content.</li>
		<li><strong>Use GSAP <code>stagger.from</code></strong> — center, edges, random patterns. While Svelte's built-in stagger uses index math, libraries like GSAP offer stagger patterns that originate from the center, edges, or random positions.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Stagger is the technique of adding incrementally increasing delays to items in a list so they animate sequentially rather than simultaneously. In Svelte, this is achieved with a single expression inside a keyed each block: <code>in:fly={'{{ delay: i * 80, y: 30 }}'}</code>, where <code>i</code> is the loop index. The effect transforms a sudden batch appearance into a flowing cascade that guides the user's eye through the content in a deliberate order. The delay increment (typically 40-100ms per item) controls the speed of the cascade -- too fast and items blur together, too slow and the user waits impatiently for the last item to appear.</p>
	<p class="prose">Stagger creates visual hierarchy and rhythm without any additional markup or state management. The first item appears immediately, drawing the eye to the top of the list, and subsequent items follow in sequence, reinforcing the reading order. This is particularly effective for card grids, feature lists, dashboard widgets, and any collection of items that benefit from progressive disclosure. Separating <code>in:</code> and <code>out:</code> directives allows the entrance to use a staggered fly while the exit uses a simultaneous fade, avoiding the awkward reverse-stagger that would occur with a bidirectional <code>transition:</code> directive.</p>
	<p class="prose">Stagger animations require careful attention to accessibility. Repeated delayed spatial movement is a known vestibular trigger -- the kind of motion that causes nausea or discomfort for users with motion sensitivities. When <code>prefersReducedMotion.current</code> is true, the correct approach is to drop all delays and replace spatial transitions (fly, slide) with a short, simultaneous fade. The conditional expression <code>prefersReducedMotion.current ? {'{ y: 0, delay: 0, duration: 150 }'} : {'{ y: 30, delay: i * 80, duration: 500 }'}</code> provides a complete alternative branch that delivers the content without any spatial movement or sequential timing.</p>
	<p class="next"><a href="/module-6/6-18-reduced-motion">Next lesson: 6.18 Reduced motion</a></p>
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
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}
	.card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.card h4 {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
	}
	.card p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.grid {
			grid-template-columns: repeat(4, 1fr);
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
