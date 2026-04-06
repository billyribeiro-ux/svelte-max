<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let items = $state<string[]>([
		'Message 1 — hello there',
		'Message 2 — how are you',
		'Message 3 — working on Svelte',
		'Message 4 — love the runes',
		'Message 5 — this is the bottom'
	]);

	let listEl: HTMLDivElement | null = $state(null);

	// Captured BEFORE the DOM mutates so we can restore scroll after.
	let prevScrollHeight = 0;
	let prevScrollTop = 0;

	// $effect.pre runs BEFORE the DOM updates. We touch items.length so this
	// pre-effect re-runs whenever the list mutates, giving us a chance to
	// snapshot the current scroll geometry just before the new DOM lands.
	$effect.pre(() => {
		// Track items.length so the pre-effect has a dependency to re-run on.
		items.length;
		if (!listEl) return;
		prevScrollHeight = listEl.scrollHeight;
		prevScrollTop = listEl.scrollTop;
	});

	// Regular $effect runs AFTER the DOM updates. Now we can measure the new
	// scrollHeight, compute how much taller the list got, and shift the
	// scrollTop by exactly that delta so the user sees the same content.
	$effect(() => {
		items.length;
		if (!listEl) return;
		const delta = listEl.scrollHeight - prevScrollHeight;
		if (delta > 0) {
			listEl.scrollTop = prevScrollTop + delta;
		}
	});

	let nextId = 6;

	function prepend() {
		const incoming = [
			`Message ${nextId++} — newest`,
			`Message ${nextId++} — fresh`,
			`Message ${nextId++} — just in`
		];
		items = [...incoming, ...items];
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let items = $state\u003cstring[]\u003e([\n" +
		"\t\t'Message 1 — hello there',\n" +
		"\t\t'Message 2 — how are you',\n" +
		"\t\t'Message 3 — working on Svelte',\n" +
		"\t\t'Message 4 — love the runes',\n" +
		"\t\t'Message 5 — this is the bottom'\n" +
		"\t]);\n" +
		"\n" +
		"\tlet listEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"\t// Captured BEFORE the DOM mutates so we can restore scroll after.\n" +
		"\tlet prevScrollHeight = 0;\n" +
		"\tlet prevScrollTop = 0;\n" +
		"\n" +
		"\t// $effect.pre runs BEFORE the DOM updates. We touch items.length so this\n" +
		"\t// pre-effect re-runs whenever the list mutates, giving us a chance to\n" +
		"\t// snapshot the current scroll geometry just before the new DOM lands.\n" +
		"\t$effect.pre(() =\u003e {\n" +
		"\t\t// Track items.length so the pre-effect has a dependency to re-run on.\n" +
		"\t\titems.length;\n" +
		"\t\tif (!listEl) return;\n" +
		"\t\tprevScrollHeight = listEl.scrollHeight;\n" +
		"\t\tprevScrollTop = listEl.scrollTop;\n" +
		"\t});\n" +
		"\n" +
		"\t// Regular $effect runs AFTER the DOM updates. Now we can measure the new\n" +
		"\t// scrollHeight, compute how much taller the list got, and shift the\n" +
		"\t// scrollTop by exactly that delta so the user sees the same content.\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\titems.length;\n" +
		"\t\tif (!listEl) return;\n" +
		"\t\tconst delta = listEl.scrollHeight - prevScrollHeight;\n" +
		"\t\tif (delta \u003e 0) {\n" +
		"\t\t\tlistEl.scrollTop = prevScrollTop + delta;\n" +
		"\t\t}\n" +
		"\t});\n" +
		"\n" +
		"\tlet nextId = 6;\n" +
		"\n" +
		"\tfunction prepend() {\n" +
		"\t\tconst incoming = [\n" +
		"\t\t\t`Message ${nextId++} — newest`,\n" +
		"\t\t\t`Message ${nextId++} — fresh`,\n" +
		"\t\t\t`Message ${nextId++} — just in`\n" +
		"\t\t];\n" +
		"\t\titems = [...incoming, ...items];\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.10 — $effect.pre\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003ccode\u003e$effect\u003c/code\u003e runs \u003cem\u003eafter\u003c/em\u003e the DOM updates — by the time it fires, the new layout\n" +
		"\t\tis already painted. \u003ccode\u003e$effect.pre\u003c/code\u003e runs \u003cem\u003ebefore\u003c/em\u003e the DOM updates, which gives\n" +
		"\t\tyou one last chance to read the \u003cem\u003eold\u003c/em\u003e layout — scroll positions, element sizes, anything\n" +
		"\t\tyou need to preserve across a mutation. It's very niche. The classic use case is a chat log\n" +
		"\t\twhere new messages get prepended: if you naively insert them, the content the user was looking\n" +
		"\t\tat gets shoved downward. By capturing \u003ccode\u003escrollHeight\u003c/code\u003e and \u003ccode\u003escrollTop\u003c/code\u003e in\n" +
		"\t\t\u003ccode\u003e$effect.pre\u003c/code\u003e and restoring them in a follow-up \u003ccode\u003e$effect\u003c/code\u003e, the viewport\n" +
		"\t\tstays locked on the same content. Most of the time you want \u003ccode\u003e$effect\u003c/code\u003e — reach for\n" +
		"\t\t\u003ccode\u003e$effect.pre\u003c/code\u003e only when you need the pre-mutation snapshot.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tScroll the list to the middle, then click \u003cstrong\u003ePrepend 3 items\u003c/strong\u003e. The scroll\n" +
		"\t\t\tposition stays anchored to the content you were reading instead of jumping.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"list\" bind:this={listEl}\u003e\n" +
		"\t\t\t{#each items as item (item)}\n" +
		"\t\t\t\t\u003cdiv class=\"card\"\u003e{item}\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cbutton type=\"button\" onclick={prepend}\u003ePrepend 3 items\u003c/button\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e runs after the DOM updates; \u003ccode\u003e$effect.pre\u003c/code\u003e runs before.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tUse \u003ccode\u003e$effect.pre\u003c/code\u003e to snapshot layout values that the imminent update will\n" +
		"\t\t\tinvalidate.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003ePair it with a regular \u003ccode\u003e$effect\u003c/code\u003e to apply corrections after the new DOM lands.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eScroll preservation in prepend-style lists is the canonical example.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tReach for \u003ccode\u003e$effect.pre\u003c/code\u003e rarely — most effects belong in plain \u003ccode\u003e$effect\u003c/code\u003e.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.10 — $effect.pre</h1>

	<p class="concept">
		<code>$effect</code> runs <em>after</em> the DOM updates — by the time it fires, the new layout
		is already painted. <code>$effect.pre</code> runs <em>before</em> the DOM updates, which gives
		you one last chance to read the <em>old</em> layout — scroll positions, element sizes, anything
		you need to preserve across a mutation. It's very niche. The classic use case is a chat log
		where new messages get prepended: if you naively insert them, the content the user was looking
		at gets shoved downward. By capturing <code>scrollHeight</code> and <code>scrollTop</code> in
		<code>$effect.pre</code> and restoring them in a follow-up <code>$effect</code>, the viewport
		stays locked on the same content. Most of the time you want <code>$effect</code> — reach for
		<code>$effect.pre</code> only when you need the pre-mutation snapshot.
	</p>

	<div class="demo">
		<p class="hint">
			Scroll the list to the middle, then click <strong>Prepend 3 items</strong>. The scroll
			position stays anchored to the content you were reading instead of jumping.
		</p>

		<div class="list" bind:this={listEl}>
			{#each items as item (item)}
				<div class="card">{item}</div>
			{/each}
		</div>

		<button type="button" onclick={prepend}>Prepend 3 items</button>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>$effect</code> runs after the DOM updates; <code>$effect.pre</code> runs before.</li>
		<li>
			Use <code>$effect.pre</code> to snapshot layout values that the imminent update will
			invalidate.
		</li>
		<li>Pair it with a regular <code>$effect</code> to apply corrections after the new DOM lands.</li>
		<li>Scroll preservation in prepend-style lists is the canonical example.</li>
		<li>
			Reach for <code>$effect.pre</code> rarely — most effects belong in plain <code>$effect</code>.
		</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 56rem;
		margin-inline: auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		overflow-y: auto;
		max-block-size: 18rem;
	}

	.card {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	button {
		font: inherit;
		align-self: flex-start;
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}

	button:hover {
		background: var(--color-brand-dim);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.list {
			max-block-size: 22rem;
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
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
