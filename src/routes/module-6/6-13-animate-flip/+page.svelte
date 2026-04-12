<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';

	interface Task {
		id: number;
		title: string;
		priority: number;
	}

	let tasks = $state<Task[]>([
		{ id: 1, title: 'Write docs', priority: 3 },
		{ id: 2, title: 'Fix login bug', priority: 1 },
		{ id: 3, title: 'Ship release', priority: 2 },
		{ id: 4, title: 'Review PRs', priority: 4 },
		{ id: 5, title: 'Plan roadmap', priority: 5 }
	]);

	function sortByPriority(): void {
		tasks = [...tasks].sort((a, b) => a.priority - b.priority);
	}

	function shuffle(): void {
		const next = [...tasks];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[next[i], next[j]] = [next[j], next[i]];
		}
		tasks = next;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { flip } from 'svelte/animate';\n" +
		"\timport { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"\tinterface Task {\n" +
		"\t\tid: number;\n" +
		"\t\ttitle: string;\n" +
		"\t\tpriority: number;\n" +
		"\t}\n" +
		"\n" +
		"\tlet tasks = $state\u003cTask[]\u003e([\n" +
		"\t\t{ id: 1, title: 'Write docs', priority: 3 },\n" +
		"\t\t{ id: 2, title: 'Fix login bug', priority: 1 },\n" +
		"\t\t{ id: 3, title: 'Ship release', priority: 2 },\n" +
		"\t\t{ id: 4, title: 'Review PRs', priority: 4 },\n" +
		"\t\t{ id: 5, title: 'Plan roadmap', priority: 5 }\n" +
		"\t]);\n" +
		"\n" +
		"\tfunction sortByPriority(): void {\n" +
		"\t\ttasks = [...tasks].sort((a, b) =\u003e a.priority - b.priority);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction shuffle(): void {\n" +
		"\t\tconst next = [...tasks];\n" +
		"\t\tfor (let i = next.length - 1; i \u003e 0; i--) {\n" +
		"\t\t\tconst j = Math.floor(Math.random() * (i + 1));\n" +
		"\t\t\t[next[i], next[j]] = [next[j], next[i]];\n" +
		"\t\t}\n" +
		"\t\ttasks = next;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.13 — animate:flip\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e When items in a keyed\n" +
		"\t\t\u003ccode\u003e&lbrace;#each&rbrace;\u003c/code\u003e reorder, Svelte normally jumps them instantly.\n" +
		"\t\t\u003ccode\u003eanimate:flip=&lbrace;&lbrace; duration: 300 &rbrace;&rbrace;\u003c/code\u003e enables the FLIP\n" +
		"\t\ttechnique (First, Last, Invert, Play) — Svelte measures old and new positions, then smoothly\n" +
		"\t\tanimates each item from its first position to its last. Magical for sortable lists. Requires a\n" +
		"\t\tkeyed each block.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={sortByPriority}\u003eSort by priority\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={shuffle}\u003eShuffle\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cul class=\"tasks\"\u003e\n" +
		"\t\t\t{#each tasks as task (task.id)}\n" +
		"\t\t\t\t\u003cli class=\"task\" animate:flip={{ duration: 400, easing: cubicOut }}\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"title\"\u003e{task.title}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"priority\"\u003eP{task.priority}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/ul\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tThe key \u003ccode\u003e(task.id)\u003c/code\u003e is required — Svelte uses it to track identity across reorders.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul class=\"learned\"\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eanimate:flip\u003c/code\u003e smoothly tweens reordered items.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eOnly works inside keyed \u003ccode\u003e&lbrace;#each&rbrace;\u003c/code\u003e blocks.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eImport \u003ccode\u003eflip\u003c/code\u003e from \u003ccode\u003esvelte/animate\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eGreat for sortable lists, drag-to-reorder, and filtering UIs.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.13 — animate:flip</h1>
	<p class="concept">
		<strong>Concept.</strong> When items in a keyed
		<code>&lbrace;#each&rbrace;</code> reorder, Svelte normally jumps them instantly.
		<code>animate:flip=&lbrace;&lbrace; duration: 300 &rbrace;&rbrace;</code> enables the FLIP
		technique (First, Last, Invert, Play) — Svelte measures old and new positions, then smoothly
		animates each item from its first position to its last. Magical for sortable lists. Requires a
		keyed each block.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={sortByPriority}>Sort by priority</button>
			<button type="button" onclick={shuffle}>Shuffle</button>
		</div>

		<ul class="tasks">
			{#each tasks as task (task.id)}
				<li class="task" animate:flip={{ duration: 400, easing: cubicOut }}>
					<span class="title">{task.title}</span>
					<span class="priority">P{task.priority}</span>
				</li>
			{/each}
		</ul>

		<p class="note">
			The key <code>(task.id)</code> is required — Svelte uses it to track identity across reorders.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Push the FLIP animation system to its limits to understand its requirements and how it composes with transitions.</p>
	<ol class="experiments">
		<li><strong>Use <code>animate:</code> without a keyed <code>{'{#each}'}</code></strong> — error. The <code>animate:</code> directive requires a keyed each block because it needs stable identity to track which item moved from which position to which.</li>
		<li><strong>Add <code>animate:flip</code></strong> — items smoothly reposition on sort. FLIP measures each item's position before and after the DOM update, then animates the transform to create the illusion of smooth movement.</li>
		<li><strong>Combine with <code>in:</code>/<code>out:</code></strong> — new items fly in, removed items fade out, remaining items flip. All three animation systems compose: transitions handle enter/exit while animate handles repositioning.</li>
		<li><strong>Set duration too high (2000ms)</strong> — feels sluggish, use 200-400ms. Reorder animations should feel snappy and responsive; long durations make the interface feel laggy and unresponsive to user actions.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The FLIP technique (First, Last, Invert, Play) is a performance optimization pattern for animating layout changes. When items in a list reorder, the naive approach would be to animate each item's CSS properties directly, which triggers expensive layout recalculations every frame. FLIP avoids this by measuring each item's position before the change (First), allowing the DOM to update instantly to the new positions (Last), applying a CSS transform that moves each item back to its old position (Invert), and then animating that transform to zero (Play). Because transforms are compositor-accelerated, the entire animation runs at 60fps without triggering layout recalculation.</p>
	<p class="prose">Svelte's <code>animate:flip</code> directive automates this entire process. You import <code>flip</code> from <code>svelte/animate</code>, add <code>animate:flip={'{{ duration: 400, easing: cubicOut }}'}</code> to items inside a keyed each block, and Svelte handles the measurement, inversion, and playback automatically. The key requirement is that the each block must be keyed with a stable identifier -- <code>(task.id)</code>, not <code>(index)</code> -- because Svelte needs to match items before and after the reorder to calculate their position deltas. Without stable keys, Svelte cannot determine which item moved where.</p>
	<p class="prose">The animate directive composes naturally with <code>in:</code> and <code>out:</code> transitions. When you add a new item to the list, it can fly in with <code>in:fly</code>. When you remove an item, it can fade out with <code>out:fade</code>. Meanwhile, all remaining items smoothly slide to their new positions via <code>animate:flip</code>. This three-layer animation system -- enter, exit, and reposition -- creates the polished list interactions seen in production applications like task managers, email clients, and kanban boards. Duration values between 200ms and 400ms hit the sweet spot of feeling responsive while still being perceptible.</p>
	<p class="next"><a href="/module-6/6-14-tween">Next lesson: 6.14 Tween</a></p>
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
	}
	.tasks {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.task {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text);
	}
	.title {
		font-size: var(--text-base);
	}
	.priority {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-brand);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	@media (min-inline-size: 768px) {
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
