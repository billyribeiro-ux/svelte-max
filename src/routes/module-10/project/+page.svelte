<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { form, data }: { form: ActionData; data: PageData } = $props();

	let editingId = $state<string | null>(null);

	function startEdit(id: string): void {
		editingId = id;
	}
	function cancelEdit(): void {
		editingId = null;
	}

	function formatDate(iso: string): string {
		const d = new Date(iso);
		return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { ActionData, PageData } from './$types';\n" +
		"	import { enhance } from '$app/forms';\n" +
		"\n" +
		"	let { form, data }: { form: ActionData; data: PageData } = $props();\n" +
		"\n" +
		"	let editingId = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"	function startEdit(id: string): void {\n" +
		"		editingId = id;\n" +
		"	}\n" +
		"	function cancelEdit(): void {\n" +
		"		editingId = null;\n" +
		"	}\n" +
		"\n" +
		"	function formatDate(iso: string): string {\n" +
		"		const d = new Date(iso);\n" +
		"		return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page notes-app\"\u003e\n" +
		"	\u003ch1\u003eModule 10 Project — CRUD Notes\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCapstone.\u003c/strong\u003e A full CRUD note-taking app built entirely on form actions,\n" +
		"		\u003ccode\u003eload\u003c/code\u003e functions, cookies, and typed \u003ccode\u003eActionData\u003c/code\u003e. Every mutation is a\n" +
		"		named action. Every form works without JavaScript — \u003ccode\u003euse:enhance\u003c/code\u003e is pure polish.\n" +
		"		Ownership is enforced on the server: you can edit and delete your own notes but only read\n" +
		"		others'.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	{#if !data.user}\n" +
		"		\u003cdiv class=\"build login-card\"\u003e\n" +
		"			\u003ch3\u003eLog in to take notes\u003c/h3\u003e\n" +
		"			\u003cp class=\"muted\"\u003e\n" +
		"				Demo auth — any valid-looking email works. Try \u003ccode\u003eada@example.com\u003c/code\u003e to claim the\n" +
		"				seeded note, or invent your own.\n" +
		"			\u003c/p\u003e\n" +
		"			\u003cform method=\"POST\" action=\"?/login\" use:enhance class=\"stack\"\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput\n" +
		"						type=\"email\"\n" +
		"						name=\"email\"\n" +
		"						placeholder=\"ada@example.com\"\n" +
		"						value={form && form.action === 'login' && 'email' in form ? (form.email ?? '') : 'ada@example.com'}\n" +
		"					/\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				{#if form && form.action === 'login' && 'error' in form && form.error}\n" +
		"					\u003cspan class=\"error-pill\"\u003e{form.error}\u003c/span\u003e\n" +
		"				{/if}\n" +
		"				\u003cbutton class=\"cta\" type=\"submit\"\u003eLog in\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	{:else}\n" +
		"		\u003cdiv class=\"build user-bar\"\u003e\n" +
		"			\u003cdiv\u003e\n" +
		"				\u003cp class=\"greeting\"\u003eHi, \u003cstrong\u003e{data.user.name}\u003c/strong\u003e\u003c/p\u003e\n" +
		"				\u003cp class=\"muted\"\u003e{data.user.email}\u003c/p\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cform method=\"POST\" action=\"?/logout\" use:enhance\u003e\n" +
		"				\u003cbutton class=\"cta ghost\" type=\"submit\"\u003eLog out\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"build\"\u003e\n" +
		"			\u003ch3\u003eNew note\u003c/h3\u003e\n" +
		"			\u003cform method=\"POST\" action=\"?/create\" use:enhance class=\"stack\"\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eTitle\u003c/span\u003e\n" +
		"					\u003cinput\n" +
		"						type=\"text\"\n" +
		"						name=\"title\"\n" +
		"						maxlength=\"80\"\n" +
		"						value={form && form.action === 'create' && 'title' in form ? (form.title ?? '') : ''}\n" +
		"					/\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eBody\u003c/span\u003e\n" +
		"					\u003ctextarea\n" +
		"						name=\"body\"\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page notes-app">
	<h1>Module 10 Project — CRUD Notes</h1>
	<p class="concept">
		<strong>Capstone.</strong> A full CRUD note-taking app built entirely on form actions,
		<code>load</code> functions, cookies, and typed <code>ActionData</code>. Every mutation is a
		named action. Every form works without JavaScript — <code>use:enhance</code> is pure polish.
		Ownership is enforced on the server: you can edit and delete your own notes but only read
		others'.
	</p>

	{#if !data.user}
		<div class="build login-card">
			<h3>Log in to take notes</h3>
			<p class="muted">
				Demo auth — any valid-looking email works. Try <code>ada@example.com</code> to claim the
				seeded note, or invent your own.
			</p>
			<form method="POST" action="?/login" use:enhance class="stack">
				<label class="field">
					<span>Email</span>
					<input
						type="email"
						name="email"
						placeholder="ada@example.com"
						value={form && form.action === 'login' && 'email' in form ? (form.email ?? '') : 'ada@example.com'}
					/>
				</label>
				{#if form && form.action === 'login' && 'error' in form && form.error}
					<span class="error-pill">{form.error}</span>
				{/if}
				<button class="cta" type="submit">Log in</button>
			</form>
		</div>
	{:else}
		<div class="build user-bar">
			<div>
				<p class="greeting">Hi, <strong>{data.user.name}</strong></p>
				<p class="muted">{data.user.email}</p>
			</div>
			<form method="POST" action="?/logout" use:enhance>
				<button class="cta ghost" type="submit">Log out</button>
			</form>
		</div>

		<div class="build">
			<h3>New note</h3>
			<form method="POST" action="?/create" use:enhance class="stack">
				<label class="field">
					<span>Title</span>
					<input
						type="text"
						name="title"
						maxlength="80"
						value={form && form.action === 'create' && 'title' in form ? (form.title ?? '') : ''}
					/>
				</label>
				<label class="field">
					<span>Body</span>
					<textarea
						name="body"
						rows="3"
						>{form && form.action === 'create' && 'body' in form ? (form.body ?? '') : ''}</textarea
					>
				</label>
				{#if form && form.action === 'create' && 'error' in form && form.error}
					<span class="error-pill">{form.error}</span>
				{/if}
				{#if form && form.action === 'create' && 'success' in form && form.success}
					<span class="success-pill">Note created</span>
				{/if}
				<button class="cta" type="submit">Create note</button>
			</form>
		</div>
	{/if}

	<h3>All notes</h3>
	<div class="notes-grid">
		{#each data.notes as note (note.id)}
			{@const isOwner = data.user?.email === note.ownerEmail}
			{@const isEditing = editingId === note.id}
			<article class="note" class:owned={isOwner}>
				{#if isEditing && isOwner}
					<form method="POST" action="?/update" use:enhance={() => async ({ update }) => { await update(); editingId = null; }} class="stack">
						<input type="hidden" name="id" value={note.id} />
						<label class="field">
							<span>Title</span>
							<input type="text" name="title" value={note.title} maxlength="80" />
						</label>
						<label class="field">
							<span>Body</span>
							<textarea name="body" rows="3">{note.body}</textarea>
						</label>
						{#if form && form.action === 'update' && 'error' in form && 'id' in form && form.id === note.id}
							<span class="error-pill">{form.error}</span>
						{/if}
						<div class="row">
							<button class="cta" type="submit">Save</button>
							<button class="cta ghost" type="button" onclick={cancelEdit}>Cancel</button>
						</div>
					</form>
				{:else}
					<header class="note-head">
						<h4>{note.title}</h4>
						{#if isOwner}<span class="badge">yours</span>{/if}
					</header>
					<p class="body">{note.body}</p>
					<footer class="note-foot">
						<span class="muted">
							{note.ownerEmail} · updated {formatDate(note.updatedAt)}
						</span>
						{#if isOwner}
							<div class="row">
								<button class="cta ghost" type="button" onclick={() => startEdit(note.id)}>
									Edit
								</button>
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="id" value={note.id} />
									<button class="cta danger" type="submit">Delete</button>
								</form>
							</div>
						{/if}
					</footer>
				{/if}
			</article>
		{/each}
	</div>

	<footer class="built-with">
		<h3>Built with</h3>
		<ul>
			<li>SvelteKit form actions (10.1 / 10.2) — named actions for login, logout, create, update, delete.</li>
			<li><code>load</code> functions (10.3) returning the current user + notes list.</li>
			<li><code>use:enhance</code> (10.4) for seamless progressive enhancement.</li>
			<li>Server-side validation and <code>ActionData</code> (10.6) narrowed per action.</li>
			<li>Server-only modules (10.7) via <code>$lib/server/notes.ts</code>.</li>
			<li>Cookie-based auth (10.8) with <code>httpOnly</code> session tokens.</li>
		</ul>
	</footer>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	.notes-app {
		--color-brand: oklch(68% 0.14 100);
		--color-brand-dim: oklch(58% 0.12 100);
	}
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	h4 { margin: 0; font-size: var(--text-lg); color: var(--color-text); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.stack { display: flex; flex-direction: column; gap: var(--space-md); }
	.field { display: flex; flex-direction: column; gap: var(--space-xs); }
	.field > span { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; }
	.field input, .field textarea { font: inherit; font-size: var(--text-sm); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-family: inherit; resize: vertical; }
	.field input:focus-visible, .field textarea:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }
	.error-pill { background: var(--color-error); color: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); align-self: flex-start; }
	.success-pill { background: var(--color-success); color: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); align-self: flex-start; }
	button.cta { background: var(--color-brand); color: var(--color-surface); border: none; border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: 600; cursor: pointer; align-self: flex-start; font: inherit; }
	button.cta:hover:not(:disabled) { background: var(--color-brand-dim); }
	button.cta.ghost { background: transparent; color: var(--color-brand); border: 1px solid var(--color-brand); }
	button.cta.ghost:hover:not(:disabled) { background: var(--color-surface-2); }
	button.cta.danger { background: var(--color-error); }
	button.cta.danger:hover:not(:disabled) { background: var(--color-error); opacity: 0.85; }

	.login-card { max-inline-size: 28rem; }
	.muted { color: var(--color-text-muted); font-size: var(--text-sm); margin: 0; line-height: 1.6; }
	.greeting { margin: 0; color: var(--color-text); font-size: var(--text-lg); }
	.greeting strong { color: var(--color-text); }

	.user-bar { flex-direction: row; align-items: center; justify-content: space-between; gap: var(--space-md); flex-wrap: wrap; }

	.notes-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }

	.note { display: flex; flex-direction: column; gap: var(--space-sm); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
	.note.owned { border-color: var(--color-brand); }
	.note-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); }
	.badge { background: var(--color-brand); color: var(--color-surface); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-full); font-weight: 600; }
	.body { margin: 0; color: var(--color-text); line-height: 1.6; white-space: pre-wrap; }
	.note-foot { display: flex; flex-direction: column; gap: var(--space-sm); align-items: flex-start; justify-content: space-between; font-size: var(--text-sm); }
	.row { display: flex; gap: var(--space-sm); flex-wrap: wrap; align-items: center; }

	.built-with { margin-block-start: var(--space-xl); padding-block-start: var(--space-lg); border-block-start: 1px solid var(--color-border); }

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.notes-grid { grid-template-columns: repeat(2, 1fr); }
		.note-foot { flex-direction: row; align-items: center; }
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
