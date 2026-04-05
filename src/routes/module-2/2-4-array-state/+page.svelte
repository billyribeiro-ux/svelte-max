<script lang="ts">
	let tags = $state<string[]>(['svelte', 'typescript', 'pe7']);
	let draft = $state<string>('');

	function addTag(event: SubmitEvent): void {
		event.preventDefault();
		const value = draft.trim().toLowerCase();
		if (!value) return;
		if (tags.some((t) => t === value)) {
			draft = '';
			return;
		}
		tags.push(value);
		draft = '';
	}

	function removeTag(tag: string): void {
		tags = tags.filter((t) => t !== tag);
	}

	function clearAll(): void {
		tags = [];
	}
</script>

<section class="page">
	<h1>2.4 — Array $state</h1>

	<p class="lede">
		Lists are everywhere — todos, tags, messages, rows in a table. In Svelte 5, arrays in
		<code>$state</code> are deep-reactive, so you can use the array API you already know.
	</p>

	<p>
		<code>tags.push('new')</code>, <code>tags.splice(2, 1)</code>, and even
		<code>tags[0] = 'first'</code> all trigger updates because the array is a proxy. You do
		<em>not</em> need to reassign the whole array the way React forces you to with
		<code>setTags([...tags, 'new'])</code> — though reassigning still works, and is often
		clearer when you're building a new list with <code>filter</code> or <code>map</code>.
	</p>

	<p>
		The methods that come up most in UI code are <code>.filter()</code> (remove items that
		don't match), <code>.map()</code> (transform every item), and <code>.some()</code>
		(check whether any item matches — perfect for duplicate detection). And when you want
		the first item plus the rest, array destructuring reads like English:
		<code>const [first, ...rest] = tags</code>.
	</p>

	<div class="demo">
		<form class="add-form" onsubmit={addTag}>
			<label class="sr-only" for="tag-input">New tag</label>
			<input
				id="tag-input"
				type="text"
				placeholder="Add a tag…"
				bind:value={draft}
				autocomplete="off"
			/>
			<button type="submit" class="btn primary">Add</button>
		</form>

		{#if tags.length > 0}
			<ul class="tag-list">
				{#each tags as tag (tag)}
					<li class="tag">
						<span>{tag}</span>
						<button
							type="button"
							class="remove"
							aria-label={`Remove ${tag}`}
							onclick={() => removeTag(tag)}
						>
							×
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="empty">No tags yet — add one above.</p>
		{/if}

		<div class="footer">
			<span class="count">
				{tags.length} tag{tags.length === 1 ? '' : 's'}
			</span>
			<button type="button" class="btn ghost" onclick={clearAll} disabled={tags.length === 0}>
				Clear all
			</button>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Arrays in <code>$state</code> are deep-reactive — <code>push</code>, <code>splice</code>, and index assignment all update the UI.</li>
		<li>Reassigning with <code>.filter()</code> or <code>.map()</code> also works and is often clearer.</li>
		<li><code>.some()</code> is the idiomatic duplicate check before adding to a list.</li>
		<li>Keyed <code>{`{#each}`}</code> blocks keep DOM nodes stable as items come and go.</li>
		<li>Array destructuring like <code>[first, ...rest]</code> pairs naturally with reactive lists.</li>
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

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
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

	.add-form {
		display: flex;
		gap: var(--space-xs);
	}

	input[type='text'] {
		flex: 1;
		font: inherit;
		font-size: var(--text-base);
		padding: var(--space-sm);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		transition: border-color var(--dur-fast) var(--ease-out);

		&:focus {
			outline: none;
			border-color: var(--color-brand);
		}
	}

	.btn {
		font: inherit;
		font-size: var(--text-sm);
		font-weight: 600;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid transparent;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);

		&:active {
			transform: translateY(1px);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.primary {
			background: var(--color-brand);
			color: var(--color-surface-1);

			&:hover:not(:disabled) {
				background: var(--color-brand-dim);
			}
		}

		&.ghost {
			background: transparent;
			color: var(--color-text-muted);
			border-color: var(--color-border);

			&:hover:not(:disabled) {
				color: var(--color-text);
				background: var(--color-surface-2);
			}
		}
	}

	.tag-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		padding: 0.35em 0.6em 0.35em 0.8em;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		font-size: var(--text-sm);
		color: var(--color-text);
		animation: pop var(--dur-base) var(--ease-spring);
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.85);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.35em;
		height: 1.35em;
		border-radius: var(--radius-full);
		border: none;
		background: transparent;
		color: var(--color-text-muted);
		font-size: var(--text-base);
		line-height: 1;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-error);
			color: var(--color-surface-1);
		}
	}

	.empty {
		font-size: var(--text-sm);
		font-style: italic;
		margin: 0;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		padding-top: var(--space-xs);
		border-top: 1px solid var(--color-border);
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	h3 {
		font-size: var(--text-lg);
		margin-top: var(--space-sm);
	}

	ul:not(.tag-list) {
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
