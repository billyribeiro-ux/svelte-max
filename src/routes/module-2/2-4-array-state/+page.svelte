<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let tags = $state\u003cstring[]\u003e(['svelte', 'typescript', 'pe7']);\n" +
		"\tlet draft = $state\u003cstring\u003e('');\n" +
		"\n" +
		"\tfunction addTag(event: SubmitEvent): void {\n" +
		"\t\tevent.preventDefault();\n" +
		"\t\tconst value = draft.trim().toLowerCase();\n" +
		"\t\tif (!value) return;\n" +
		"\t\tif (tags.some((t) =\u003e t === value)) {\n" +
		"\t\t\tdraft = '';\n" +
		"\t\t\treturn;\n" +
		"\t\t}\n" +
		"\t\ttags.push(value);\n" +
		"\t\tdraft = '';\n" +
		"\t}\n" +
		"\n" +
		"\tfunction removeTag(tag: string): void {\n" +
		"\t\ttags = tags.filter((t) =\u003e t !== tag);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction clearAll(): void {\n" +
		"\t\ttags = [];\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.4 — Array $state\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"lede\"\u003e\n" +
		"\t\tLists are everywhere — todos, tags, messages, rows in a table. In Svelte 5, arrays in\n" +
		"\t\t\u003ccode\u003e$state\u003c/code\u003e are deep-reactive, so you can use the array API you already know.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\t\u003ccode\u003etags.push('new')\u003c/code\u003e, \u003ccode\u003etags.splice(2, 1)\u003c/code\u003e, and even\n" +
		"\t\t\u003ccode\u003etags[0] = 'first'\u003c/code\u003e all trigger updates because the array is a proxy. You do\n" +
		"\t\t\u003cem\u003enot\u003c/em\u003e need to reassign the whole array the way React forces you to with\n" +
		"\t\t\u003ccode\u003esetTags([...tags, 'new'])\u003c/code\u003e — though reassigning still works, and is often\n" +
		"\t\tclearer when you're building a new list with \u003ccode\u003efilter\u003c/code\u003e or \u003ccode\u003emap\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\tThe methods that come up most in UI code are \u003ccode\u003e.filter()\u003c/code\u003e (remove items that\n" +
		"\t\tdon't match), \u003ccode\u003e.map()\u003c/code\u003e (transform every item), and \u003ccode\u003e.some()\u003c/code\u003e\n" +
		"\t\t(check whether any item matches — perfect for duplicate detection). And when you want\n" +
		"\t\tthe first item plus the rest, array destructuring reads like English:\n" +
		"\t\t\u003ccode\u003econst [first, ...rest] = tags\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003cform class=\"add-form\" onsubmit={addTag}\u003e\n" +
		"\t\t\t\u003clabel class=\"sr-only\" for=\"tag-input\"\u003eNew tag\u003c/label\u003e\n" +
		"\t\t\t\u003cinput\n" +
		"\t\t\t\tid=\"tag-input\"\n" +
		"\t\t\t\ttype=\"text\"\n" +
		"\t\t\t\tplaceholder=\"Add a tag…\"\n" +
		"\t\t\t\tbind:value={draft}\n" +
		"\t\t\t\tautocomplete=\"off\"\n" +
		"\t\t\t/\u003e\n" +
		"\t\t\t\u003cbutton type=\"submit\" class=\"btn primary\"\u003eAdd\u003c/button\u003e\n" +
		"\t\t\u003c/form\u003e\n" +
		"\n" +
		"\t\t{#if tags.length \u003e 0}\n" +
		"\t\t\t\u003cul class=\"tag-list\"\u003e\n" +
		"\t\t\t\t{#each tags as tag (tag)}\n" +
		"\t\t\t\t\t\u003cli class=\"tag\"\u003e\n" +
		"\t\t\t\t\t\t\u003cspan\u003e{tag}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\t\t\tclass=\"remove\"\n" +
		"\t\t\t\t\t\t\taria-label={`Remove ${tag}`}\n" +
		"\t\t\t\t\t\t\tonclick={() =\u003e removeTag(tag)}\n" +
		"\t\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\t×\n" +
		"\t\t\t\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/ul\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cp class=\"empty\"\u003eNo tags yet — add one above.\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cdiv class=\"footer\"\u003e\n" +
		"\t\t\t\u003cspan class=\"count\"\u003e\n" +
		"\t\t\t\t{tags.length} tag{tags.length === 1 ? '' : 's'}\n" +
		"\t\t\t\u003c/span\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn ghost\" onclick={clearAll} disabled={tags.length === 0}\u003e\n" +
		"\t\t\t\tClear all\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eArrays in \u003ccode\u003e$state\u003c/code\u003e are deep-reactive — \u003ccode\u003epush\u003c/code\u003e, \u003ccode\u003esplice\u003c/code\u003e, and index assignment all update the UI.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eReassigning with \u003ccode\u003e.filter()\u003c/code\u003e or \u003ccode\u003e.map()\u003c/code\u003e also works and is often clearer.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e.some()\u003c/code\u003e is the idiomatic duplicate check before adding to a list.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eKeyed \u003ccode\u003e{`{#each}`}\u003c/code\u003e blocks keep DOM nodes stable as items come and go.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eArray destructuring like \u003ccode\u003e[first, ...rest]\u003c/code\u003e pairs naturally with reactive lists.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<h2>Break it on purpose</h2>

	<p class="prose">
		The best way to internalize how array reactivity works is to deliberately break things and watch what happens. Try each experiment below, observe the result, then undo it.
	</p>

	<ol class="experiments">
		<li>
			<strong>Push to a non-<code>$state</code> array.</strong> Declare a plain
			<code>let items: string[] = ['a', 'b']</code> without <code>$state</code>, then call
			<code>items.push('c')</code> from a button. The UI never updates because Svelte has no
			proxy to intercept the mutation. Only arrays wrapped in <code>$state</code> get the
			deep-reactive treatment.
		</li>
		<li>
			<strong>Use <code>items[idx] = newItem</code> direct assignment.</strong> Replace the
			second tag with <code>tags[1] = 'replaced'</code>. It works — the proxy intercepts
			indexed writes just like it intercepts method calls. Direct index assignment is a
			perfectly valid way to update a single element in a reactive array.
		</li>
		<li>
			<strong>Forget the key in <code>{`{#each items as item}`}</code>.</strong> Remove the
			<code>(tag)</code> key expression from the each block. Now add a few tags, then delete
			one from the middle. You may see animations glitch or the wrong item disappear.
			Without a key, Svelte reuses DOM nodes by index, so reordering breaks identity.
		</li>
		<li>
			<strong>Spread into a new array <code>items = [...items, newItem]</code>.</strong> Replace
			the <code>tags.push(value)</code> call with <code>tags = [...tags, value]</code>. It
			works because reassignment is always detected. The spread approach creates a brand-new
			array each time, which is less efficient than <code>.push()</code> for large lists but
			equally correct.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		Arrays wrapped in <code>$state</code> are deeply reactive through Svelte's proxy system.
		Every mutating method you already know — <code>push</code>, <code>pop</code>,
		<code>splice</code>, <code>shift</code>, <code>unshift</code> — triggers a UI update
		automatically. You do not need to replace the entire array to notify the framework, though
		reassignment with <code>filter</code> or <code>map</code> works too because Svelte
		detects top-level reassignment as well as deep mutations.
	</p>

	<p class="prose">
		Keyed <code>{`{#each}`}</code> blocks are critical for maintaining DOM identity when items
		move, arrive, or leave. Without a key, Svelte maps items to DOM nodes by index, which
		breaks animations and causes stale state in nested components. The key should be a stable,
		unique identifier — a database ID, a slug, or even the item itself if the values are
		unique strings.
	</p>

	<p class="prose">
		Methods like <code>.filter()</code> and <code>.map()</code> return new arrays, so they
		trigger updates through reassignment rather than mutation. Meanwhile, <code>.some()</code>
		is the idiomatic way to check for duplicates before inserting, and array destructuring
		like <code>const [first, ...rest] = tags</code> pairs naturally with reactive lists to
		extract portions of the data without mutation.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-5-state-raw">2.5 — $state.raw</a> — skip deep proxying for large,
		immutable datasets you replace wholesale.
	</p>
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
		inline-size: 1px;
		block-size: 1px;
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
		inline-size: 1.35em;
		block-size: 1.35em;
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
		padding-block-start: var(--space-xs);
		border-block-start: 1px solid var(--color-border);
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	@media (min-inline-size: 768px) {
		.demo {
			padding: var(--space-lg);
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
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
