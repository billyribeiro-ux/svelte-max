<script lang="ts">
	import type { ActionData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { form }: { form: ActionData } = $props();


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { ActionData } from './$types';\n" +
		"\n" +
		"	let { form }: { form: ActionData } = $props();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.6 — Server-side validation and ActionData\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Client-side validation is just UX. Servers \u003cem\u003emust\u003c/em\u003e revalidate because\n" +
		"		clients can't be trusted — browsers are attacker-controlled. In a form action, validate the\n" +
		"		\u003ccode\u003eformData\u003c/code\u003e, return \u003ccode\u003efail(400, &lbrace; errors &rbrace;)\u003c/code\u003e for invalid input,\n" +
		"		and the returned object becomes \u003ccode\u003eform\u003c/code\u003e on the page. \u003ccode\u003eActionData\u003c/code\u003e is the\n" +
		"		typed union of every shape your action can return.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch3\u003eRegister\u003c/h3\u003e\n" +
		"\n" +
		"		{#if form?.success}\n" +
		"			\u003cspan class=\"success-pill\"\u003eAccount created for {form.email}. Check your inbox.\u003c/span\u003e\n" +
		"		{:else}\n" +
		"			\u003cform method=\"POST\" class=\"stack\"\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput\n" +
		"						type=\"email\"\n" +
		"						name=\"email\"\n" +
		"						autocomplete=\"email\"\n" +
		"						value={form?.email ?? ''}\n" +
		"						placeholder=\"you@example.com\"\n" +
		"					/\u003e\n" +
		"					{#if form?.errors?.email}\n" +
		"						\u003cspan class=\"error-pill\"\u003e{form.errors.email}\u003c/span\u003e\n" +
		"					{/if}\n" +
		"				\u003c/label\u003e\n" +
		"\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003ePassword\u003c/span\u003e\n" +
		"					\u003cinput type=\"password\" name=\"password\" autocomplete=\"new-password\" /\u003e\n" +
		"					{#if form?.errors?.password}\n" +
		"						\u003cspan class=\"error-pill\"\u003e{form.errors.password}\u003c/span\u003e\n" +
		"					{/if}\n" +
		"				\u003c/label\u003e\n" +
		"\n" +
		"				\u003cbutton class=\"cta\" type=\"submit\"\u003eCreate account\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003cp class=\"hint\"\u003e\n" +
		"			Try submitting with \u003ccode\u003ebad-email\u003c/code\u003e, a short password, or a password with no digits to\n" +
		"			see each server-side rule fire independently.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003efail(status, data)\u003c/code\u003e returns a validation failure that shows up as \u003ccode\u003eform\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003ePrefill submitted values (but never passwords) so users don't retype on error.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eActionData\u003c/code\u003e is a typed union — narrow it with \u003ccode\u003eform?.errors\u003c/code\u003e or \u003ccode\u003eform?.success\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eAlways validate on the server; client validation is only for UX polish.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.6 — Server-side validation and ActionData</h1>
	<p class="concept">
		<strong>Concept.</strong> Client-side validation is just UX. Servers <em>must</em> revalidate because
		clients can't be trusted — browsers are attacker-controlled. In a form action, validate the
		<code>formData</code>, return <code>fail(400, &lbrace; errors &rbrace;)</code> for invalid input,
		and the returned object becomes <code>form</code> on the page. <code>ActionData</code> is the
		typed union of every shape your action can return.
	</p>

	<div class="build">
		<h3>Register</h3>

		{#if form?.success}
			<span class="success-pill">Account created for {form.email}. Check your inbox.</span>
		{:else}
			<form method="POST" class="stack">
				<label class="field">
					<span>Email</span>
					<input
						type="email"
						name="email"
						autocomplete="email"
						value={form?.email ?? ''}
						placeholder="you@example.com"
					/>
					{#if form?.errors?.email}
						<span class="error-pill">{form.errors.email}</span>
					{/if}
				</label>

				<label class="field">
					<span>Password</span>
					<input type="password" name="password" autocomplete="new-password" />
					{#if form?.errors?.password}
						<span class="error-pill">{form.errors.password}</span>
					{/if}
				</label>

				<button class="cta" type="submit">Create account</button>
			</form>
		{/if}

		<p class="hint">
			Try submitting with <code>bad-email</code>, a short password, or a password with no digits to
			see each server-side rule fire independently.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove all server-side validation and accept any input.</strong> The form always succeeds regardless of what you type, proving that client-side <code>required</code> and <code>minlength</code> attributes are trivially bypassed with DevTools.</li>
		<li><strong>Replace <code>fail(400, ...)</code> with a plain <code>return</code> of the same error object.</strong> SvelteKit treats the return as a success (status 200), resets the form fields, and the user loses their input even though the data was invalid.</li>
		<li><strong>Prefill the password field with <code>value={'{form?.password ?? ""}'}</code>.</strong> The password is now round-tripped through the server response and visible in the page source, creating a security vulnerability where sensitive input leaks into HTML.</li>
		<li><strong>Remove the <code>email</code> prefill so the field starts blank after a validation error.</strong> Submitting with a valid email but a bad password wipes the email, forcing the user to retype it, demonstrating why preserving non-sensitive fields matters for UX.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Server-side validation is the only validation that matters for security. Client-side checks like <code>required</code> and <code>pattern</code> improve the user experience but can be removed by anyone with DevTools. The server must independently verify every field before acting on the data.</p>
	<p class="prose">SvelteKit's <code>fail(status, data)</code> function is how you signal validation errors. It sets the HTTP status to a 4xx code and returns the data as <code>ActionData</code>, which the page receives as the <code>form</code> prop. The status code matters: returning a plain object treats the action as a success, which triggers form reset and data invalidation.</p>
	<p class="prose">A well-designed validation response prefills every non-sensitive field so the user only needs to correct their mistake, never retype everything. Passwords are the exception: they should never be included in the response because they would appear in the HTML source. The typed <code>ActionData</code> union ensures your template handles both success and error branches correctly at compile time.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-10/10-7-env-vars">10.7 — Environment variables</a> — keep secrets out of client bundles.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.stack { display: flex; flex-direction: column; gap: var(--space-md); }
	.field { display: flex; flex-direction: column; gap: var(--space-xs); }
	.field > span { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; }
	.field input { font: inherit; font-size: var(--text-sm); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); }
	.field input:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }
	.error-pill { background: var(--color-error); color: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); align-self: flex-start; }
	.success-pill { background: var(--color-success); color: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); align-self: flex-start; }
	button.cta { background: var(--color-brand); color: var(--color-surface); border: none; border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: 600; cursor: pointer; align-self: flex-start; }
	button.cta:hover:not(:disabled) { background: var(--color-brand-dim); }
	.hint { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }


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
