<script lang="ts">
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
</style>
