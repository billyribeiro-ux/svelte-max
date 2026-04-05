<script lang="ts">
	let siteName = $state('svelte-max');
	let pageTopic = $state('Reactivity');
	let unread = $state(0);

	const title = $derived(
		unread > 0 ? `(${unread}) ${pageTopic} — ${siteName}` : `${pageTopic} — ${siteName}`
	);

	$effect(() => {
		document.title = title;
	});

	function increment() {
		unread += 1;
	}

	function decrement() {
		if (unread > 0) unread -= 1;
	}
</script>

<section class="page">
	<h1>2.9 — $effect</h1>

	<p class="concept">
		A side effect is anything that affects the world outside the component's reactive graph —
		writing to <code>document.title</code>, saving to localStorage, making a fetch call, even a
		<code>console.log</code>. The <code>$effect(() =&gt; &#123; ... &#125;)</code> rune runs after the
		DOM updates and re-runs whenever any reactive value <em>read</em> inside it changes. Svelte tracks
		those dependencies automatically — you never declare them. Crucially, <code>$effect</code> only runs
		in the browser, never during SSR, which is why it's safe to touch <code>document</code>,
		<code>window</code>, and friends in here. Three rules keep you out of trouble: use
		<code>$derived</code> for computed values, use <code>$effect</code> for side effects, and never write
		to state inside an effect — that's an infinite loop.
	</p>

	<div class="demo">
		<p class="hint">Look at your browser tab title as you type below — it updates live.</p>

		<div class="controls">
			<label>
				<span>Site name</span>
				<input type="text" bind:value={siteName} />
			</label>

			<label>
				<span>Page topic</span>
				<input type="text" bind:value={pageTopic} />
			</label>

			<div class="unread">
				<span class="unread-label">Unread</span>
				<div class="unread-row">
					<button type="button" onclick={decrement} aria-label="Decrease unread">−</button>
					<input type="number" bind:value={unread} min="0" />
					<button type="button" onclick={increment} aria-label="Increase unread">+</button>
				</div>
			</div>
		</div>

		<div class="preview">
			<span class="preview-label">document.title</span>
			<pre>{title}</pre>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$effect</code> runs after the DOM updates and re-runs when its reactive reads change.</li>
		<li>Dependencies are tracked automatically — you never list them.</li>
		<li>Effects are the right place for <code>document</code>, <code>window</code>, fetch, and logging.</li>
		<li><code>$effect</code> is browser-only, so it's SSR-safe.</li>
		<li>Never assign to state inside an effect — use <code>$derived</code> instead.</li>
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

	.controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
	}

	input[type='text'],
	input[type='number'] {
		font: inherit;
		font-family: var(--font-mono);
		padding: var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	input:focus {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}

	.unread {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.unread-label {
		font-size: var(--text-sm);
	}

	.unread-row {
		display: flex;
		gap: var(--space-sm);
		align-items: center;
	}

	.unread-row input {
		inline-size: 6rem;
		text-align: center;
	}

	button {
		font: inherit;
		inline-size: 2.5rem;
		block-size: 2.5rem;
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

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
	}

	.preview-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	pre {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-brand);
		overflow-x: auto;
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

		.controls {
			flex-direction: row;
			align-items: flex-end;
		}

		label {
			flex: 1;
		}
	}
</style>
