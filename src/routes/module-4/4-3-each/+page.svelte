<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Contact {
		id: number;
		name: string;
		role: string;
		email: string;
	}

	const contacts: readonly Contact[] = [
		{ id: 1, name: 'Ada Lovelace', role: 'Engineering Lead', email: 'ada@example.com' },
		{ id: 2, name: 'Grace Hopper', role: 'Compiler Architect', email: 'grace@example.com' },
		{ id: 3, name: 'Alan Turing', role: 'Research Fellow', email: 'alan@example.com' },
		{ id: 4, name: 'Katherine Johnson', role: 'Trajectory Analyst', email: 'katherine@example.com' },
		{ id: 5, name: 'Linus Torvalds', role: 'Kernel Maintainer', email: 'linus@example.com' }
	];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Contact {\n" +
		"\t\tid: number;\n" +
		"\t\tname: string;\n" +
		"\t\trole: string;\n" +
		"\t\temail: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst contacts: readonly Contact[] = [\n" +
		"\t\t{ id: 1, name: 'Ada Lovelace', role: 'Engineering Lead', email: 'ada@example.com' },\n" +
		"\t\t{ id: 2, name: 'Grace Hopper', role: 'Compiler Architect', email: 'grace@example.com' },\n" +
		"\t\t{ id: 3, name: 'Alan Turing', role: 'Research Fellow', email: 'alan@example.com' },\n" +
		"\t\t{ id: 4, name: 'Katherine Johnson', role: 'Trajectory Analyst', email: 'katherine@example.com' },\n" +
		"\t\t{ id: 5, name: 'Linus Torvalds', role: 'Kernel Maintainer', email: 'linus@example.com' }\n" +
		"\t];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.3 — {'{#each}'} with destructuring\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{'{#each array as item}'}\u003c/code\u003e iterates any array. You can destructure inline —\n" +
		"\t\t\u003ccode\u003e{'{#each contacts as { id, name, email }}'}\u003c/code\u003e — to pull fields straight out. A\n" +
		"\t\tsecond parameter gives you the index: \u003ccode\u003e{'{#each items as item, i}'}\u003c/code\u003e. The block\n" +
		"\t\tbody is a template that runs once per element.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t{#each contacts as { id, name, role, email }, i (id)}\n" +
		"\t\t\t\t\u003carticle class=\"card\"\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"badge\"\u003e{i + 1}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003ch4\u003e{name}\u003c/h4\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"role\"\u003e{role}\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003ca class=\"mail\" href=\"mailto:{email}\"\u003e{email}\u003c/a\u003e\n" +
		"\t\t\t\t\u003c/article\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{'{#each array as item}'}\u003c/code\u003e renders its body once per element.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eInline destructuring: \u003ccode\u003e{'{#each contacts as { name, email }}'}\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSecond parameter is the zero-based index: \u003ccode\u003e{'as item, i'}\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThe body has full access to component scope — great for calling handlers.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.3 — {'{#each}'} with destructuring</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{#each array as item}'}</code> iterates any array. You can destructure inline —
		<code>{'{#each contacts as { id, name, email }}'}</code> — to pull fields straight out. A
		second parameter gives you the index: <code>{'{#each items as item, i}'}</code>. The block
		body is a template that runs once per element.
	</p>

	<div class="build">
		<div class="grid">
			{#each contacts as { id, name, role, email }, i (id)}
				<article class="card">
					<span class="badge">{i + 1}</span>
					<h4>{name}</h4>
					<p class="role">{role}</p>
					<a class="mail" href="mailto:{email}">{email}</a>
				</article>
			{/each}
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Pass a non-array value like a string or number to <code>{'{#each}'}</code>.</strong> Svelte expects an iterable, so a plain number will crash at runtime with a "not iterable" error. Strings technically work because they are iterable, but you will get one iteration per character -- almost certainly not what you intended.</li>
		<li><strong>Mutate the array inside the <code>{'{#each}'}</code> body.</strong> Pushing to the array while iterating it can cause an infinite loop or duplicate renders. Always create a new array reference outside the template and assign it back to the reactive variable to trigger a clean re-render.</li>
		<li><strong>Use the array index as the key expression.</strong> When you reorder or filter items, index-based keys cause Svelte to patch DOM nodes by position rather than identity. Input values, focus, and animations will appear to "jump" to the wrong item because the key no longer represents the data.</li>
		<li><strong>Destructure directly in the each clause: <code>{'{#each items as { name, price }}'}</code>.</strong> This works perfectly and is the idiomatic pattern for accessing specific fields. It keeps your template cleaner by avoiding <code>item.name</code> and <code>item.price</code> everywhere inside the block body.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>{'{#each}'}</code> block is Svelte's iteration primitive. It takes any array (or iterable) and renders its body once per element, binding each element to a local variable via the <code>as</code> clause. The block body is a full template with access to everything in the component's scope, so you can call functions, reference other state, and compose nested components freely inside the loop.</p>
	<p class="prose">Inline destructuring is one of the most productive patterns in Svelte templates. Writing <code>{'{#each contacts as { id, name, email }}'}</code> pulls fields out at the iteration boundary, eliminating repetitive <code>contact.name</code> references throughout the block. You can also grab the zero-based index as a second parameter -- <code>{'{#each items as item, i}'}</code> -- which is useful for numbering rows, applying alternating styles, or detecting the first and last items.</p>
	<p class="prose">For any list that will change over time -- items added, removed, reordered, or filtered -- always provide a keyed expression like <code>(item.id)</code>. Keys tell Svelte which DOM node belongs to which data item, enabling efficient move-based updates instead of destructive patch-by-position reconciliation. Without keys, Svelte defaults to index-based matching, which works for static lists but breaks the moment the list changes shape.</p>
	<p class="next">Next lesson: <a href="/module-4/4-4-each-keyed">4.4 — {'{#each}'} with keys</a></p>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong { color: var(--color-text); }

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


	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.card {
		position: relative;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.badge {
		position: absolute;
		inset-block-start: var(--space-sm);
		inset-inline-end: var(--space-sm);
		background: var(--color-brand);
		color: var(--color-surface);
		font-size: var(--text-xs);
		font-weight: 700;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		border-radius: var(--radius-full);
		display: grid;
		place-items: center;
	}

	.card h4 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	.role {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.mail {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-brand);
		text-decoration: none;
	}
	.mail:hover { text-decoration: underline; }

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.grid { grid-template-columns: 1fr 1fr; }
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

	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

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
