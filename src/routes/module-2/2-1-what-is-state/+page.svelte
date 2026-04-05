<script lang="ts">
	let text = $state<string>('');
	const count = $derived<number>(text.length);
	const status = $derived<'ok' | 'long'>(count < 80 ? 'ok' : 'long');
</script>

<section class="page">
	<h1>2.1 — What state is</h1>

	<p class="lede">
		State is data that changes over time and causes your UI to re-render when it does. A
		user's name, the current tab, whether a dropdown is open, the items in a cart — all state.
		Anything that isn't constant for the life of the page is a candidate.
	</p>

	<p>
		In Svelte 5 you declare state with the <code>$state</code> rune. The compiler sees the
		rune at build time, wraps your value in a proxy, and from that moment on every read is
		tracked and every write schedules the UI to update. There is no <em>setState</em>, no
		dependency array, no hook rules — you just mutate the variable.
	</p>

	<p>
		This is why Svelte uses explicit runes instead of React's implicit model: the compiler
		has to <em>see</em> what is reactive to generate efficient update code. A plain
		<code>let count = 0</code> stays plain; a <code>let count = $state(0)</code> becomes a
		reactive cell. And because <code>$state</code> returns a proxy, the humble
		<code>count++</code> still works — the proxy intercepts the assignment and notifies
		anything that depends on it.
	</p>

	<div class="demo">
		<label class="field" for="note">Write a note</label>
		<textarea
			id="note"
			bind:value={text}
			rows="4"
			placeholder="Start typing and watch the counter react…"
		></textarea>

		<div class="readout">
			<span class="count">{count} character{count === 1 ? '' : 's'}</span>
			<span class="pill" data-status={status}>
				{status === 'ok' ? 'Nice and short' : 'Getting long'}
			</span>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>State is any value whose change should update the UI.</li>
		<li><code>$state(initial)</code> creates a reactive, proxy-wrapped cell.</li>
		<li>Mutating the variable (<code>count++</code>, reassigning, etc.) triggers re-renders.</li>
		<li><code>$derived(expr)</code> recomputes automatically whenever its inputs change.</li>
		<li>Svelte needs explicit runes so the compiler can generate fine-grained updates.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.lede {
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	p {
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--color-surface-2);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.field {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	textarea {
		width: 100%;
		font: inherit;
		font-size: var(--text-base);
		padding: var(--space-sm);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		resize: vertical;
		transition: border-color var(--dur-fast) var(--ease-out);

		&:focus {
			outline: none;
			border-color: var(--color-brand);
		}
	}

	.readout {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.pill {
		font-size: var(--text-xs);
		font-weight: 600;
		padding: 0.3em 0.8em;
		border-radius: var(--radius-full);
		transition: background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);

		&[data-status='ok'] {
			background: oklch(92% 0.09 145);
			color: oklch(30% 0.12 145);
		}

		&[data-status='long'] {
			background: oklch(90% 0.12 60);
			color: oklch(35% 0.14 60);
		}
	}

	h3 {
		font-size: var(--text-lg);
		margin-top: var(--space-sm);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-left: var(--space-md);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.demo {
			padding: var(--space-lg);
		}
	}
</style>
