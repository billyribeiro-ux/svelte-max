<script lang="ts">
	import type { ActionData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { form }: { form: ActionData } = $props();

	const loginForm = $derived(form?.action === 'login' ? form : null);
	const registerForm = $derived(form?.action === 'register' ? form : null);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { ActionData } from './$types';\n" +
		"\n" +
		"	let { form }: { form: ActionData } = $props();\n" +
		"\n" +
		"	const loginForm = $derived(form?.action === 'login' ? form : null);\n" +
		"	const registerForm = $derived(form?.action === 'register' ? form : null);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.4 — Named actions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A page can have multiple forms — login, register, delete-account, etc.\n" +
		"		Give each a named action:\n" +
		"		\u003ccode\u003e{\"actions: { login: async (e) =\u003e {}, register: async (e) =\u003e {} }\"}\u003c/code\u003e. Route a form to a\n" +
		"		named action with \u003ccode\u003e{'action=\"?/login\"'}\u003c/code\u003e. The default action is called\n" +
		"		\u003ccode\u003edefault\u003c/code\u003e. Only ONE action runs per submit.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"forms\"\u003e\n" +
		"			\u003cform method=\"POST\" action=\"?/login\"\u003e\n" +
		"				\u003ch3\u003eLog in\u003c/h3\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput type=\"email\" name=\"email\" value={loginForm?.email ?? ''} required /\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003ePassword\u003c/span\u003e\n" +
		"					\u003cinput type=\"password\" name=\"password\" required /\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003cbutton type=\"submit\" class=\"cta\"\u003eLog in\u003c/button\u003e\n" +
		"				\u003cp class=\"hint\"\u003eTry password: \u003ccode\u003edemo\u003c/code\u003e\u003c/p\u003e\n" +
		"				{#if loginForm?.error}\n" +
		"					\u003cp class=\"pill error\"\u003e{loginForm.error}\u003c/p\u003e\n" +
		"				{/if}\n" +
		"				{#if loginForm?.success}\n" +
		"					\u003cp class=\"pill success\"\u003e{loginForm.message}\u003c/p\u003e\n" +
		"				{/if}\n" +
		"			\u003c/form\u003e\n" +
		"\n" +
		"			\u003cform method=\"POST\" action=\"?/register\"\u003e\n" +
		"				\u003ch3\u003eRegister\u003c/h3\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput type=\"email\" name=\"email\" value={registerForm?.email ?? ''} required /\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003ePassword\u003c/span\u003e\n" +
		"					\u003cinput type=\"password\" name=\"password\" required minlength=\"6\" /\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003cbutton type=\"submit\" class=\"cta\"\u003eCreate account\u003c/button\u003e\n" +
		"				\u003cp class=\"hint\"\u003eAt least 6 characters.\u003c/p\u003e\n" +
		"				{#if registerForm?.error}\n" +
		"					\u003cp class=\"pill error\"\u003e{registerForm.error}\u003c/p\u003e\n" +
		"				{/if}\n" +
		"				{#if registerForm?.success}\n" +
		"					\u003cp class=\"pill success\"\u003e{registerForm.message}\u003c/p\u003e\n" +
		"				{/if}\n" +
		"			\u003c/form\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eName actions inside the \u003ccode\u003eactions\u003c/code\u003e object — any key other than \u003ccode\u003edefault\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eTarget them with \u003ccode\u003e{'action=\"?/name\"'}\u003c/code\u003e on the \u003ccode\u003e&lt;form&gt;\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eReturn a discriminant like \u003ccode\u003e{\"{ action: 'login' as const }\"}\u003c/code\u003e so TS narrows correctly.\u003c/li\u003e\n" +
		"		\u003cli\u003eOnly one action runs per submit — the rest are untouched.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.4 — Named actions</h1>
	<p class="concept">
		<strong>Concept.</strong> A page can have multiple forms — login, register, delete-account, etc.
		Give each a named action:
		<code>{"actions: { login: async (e) => {}, register: async (e) => {} }"}</code>. Route a form to a
		named action with <code>{'action="?/login"'}</code>. The default action is called
		<code>default</code>. Only ONE action runs per submit.
	</p>

	<div class="build">
		<div class="forms">
			<form method="POST" action="?/login">
				<h3>Log in</h3>
				<label class="field">
					<span>Email</span>
					<input type="email" name="email" value={loginForm?.email ?? ''} required />
				</label>
				<label class="field">
					<span>Password</span>
					<input type="password" name="password" required />
				</label>
				<button type="submit" class="cta">Log in</button>
				<p class="hint">Try password: <code>demo</code></p>
				{#if loginForm?.error}
					<p class="pill error">{loginForm.error}</p>
				{/if}
				{#if loginForm?.success}
					<p class="pill success">{loginForm.message}</p>
				{/if}
			</form>

			<form method="POST" action="?/register">
				<h3>Register</h3>
				<label class="field">
					<span>Email</span>
					<input type="email" name="email" value={registerForm?.email ?? ''} required />
				</label>
				<label class="field">
					<span>Password</span>
					<input type="password" name="password" required minlength="6" />
				</label>
				<button type="submit" class="cta">Create account</button>
				<p class="hint">At least 6 characters.</p>
				{#if registerForm?.error}
					<p class="pill error">{registerForm.error}</p>
				{/if}
				{#if registerForm?.success}
					<p class="pill success">{registerForm.message}</p>
				{/if}
			</form>
		</div>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Name actions inside the <code>actions</code> object — any key other than <code>default</code>.</li>
		<li>Target them with <code>{'action="?/name"'}</code> on the <code>&lt;form&gt;</code>.</li>
		<li>Return a discriminant like <code>{"{ action: 'login' as const }"}</code> so TS narrows correctly.</li>
		<li>Only one action runs per submit — the rest are untouched.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
		margin-inline: auto;
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
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	.forms {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		flex: 1;
	}
	form h3 {
		margin: 0 0 var(--space-xs);
		color: var(--color-text);
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field > span {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.field input {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-text);
	}
	.field input:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	button.cta {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		cursor: pointer;
		align-self: flex-start;
	}
	button.cta:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	.hint {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}
	.pill {
		margin: 0;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
	}
	.pill.error {
		background: var(--color-surface-2);
		color: var(--color-error);
		border: 1px solid var(--color-error);
	}
	.pill.success {
		background: var(--color-surface-2);
		color: var(--color-success);
		border: 1px solid var(--color-success);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.forms {
			flex-direction: row;
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

	/* === RESPONSIVE BREAKPOINTS === */
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
