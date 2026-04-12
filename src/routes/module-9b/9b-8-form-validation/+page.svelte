<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import * as v from 'valibot';

	const validateCode = `// Programmatic validation
import { submitContact } from './contact.remote';

// Validate without submitting
const issues = submitContact.validate();
if (issues) {
  console.log(issues); // field-level errors
}`;

	const preflightCode = `// Preflight: client-side validation before server call
import { form } from '$app/server';
import * as v from 'valibot';

const Schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

export const signup = form(Schema, async ({ data }) => {
  // Only runs if preflight passes on client
  await createUser(data);
});

// In component:
// preflight(Schema) runs Valibot on the client BEFORE
// the form is sent to the server — instant feedback!`;

	const enhanceCode = `// Custom submission behavior with enhance()
\u003cscript lang="ts"\u003e
  import { signup } from './auth.remote';
\u003c/script\u003e

<form
  {...signup}
  enhance={() => {
    // Runs before submission
    return async ({ result, update }) => {
      if (result.type === 'success') {
        goto('/dashboard');
      } else {
        await update(); // Apply default behavior
      }
    };
  }}
>
  ...
</form>`;

	const invalidCode = `// invalid() helper for returning field errors
import { form, invalid } from '$app/server';

export const signup = form(Schema, async ({ data }) => {
  const existing = await db.users.findByEmail(data.email);
  if (existing) {
    return invalid({ email: 'This email is already registered' });
  }
  await createUser(data);
});`;

	const SignupSchema = v.object({
		email: v.pipe(v.string(), v.nonEmpty('Email is required'), v.email('Must be a valid email')),
		password: v.pipe(
			v.string(),
			v.nonEmpty('Password is required'),
			v.minLength(8, 'Must be at least 8 characters')
		),
		confirmPassword: v.pipe(v.string(), v.nonEmpty('Please confirm your password')),
	});

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	type FieldErrors = { email?: string; password?: string; confirmPassword?: string };
	let errors = $state<FieldErrors>({});
	let submitted = $state(false);

	function validateField(field: 'email' | 'password' | 'confirmPassword') {
		const data = { email, password, confirmPassword };
		const result = v.safeParse(SignupSchema, data);
		if (!result.success) {
			const issue = result.issues.find(
				(i) => i.path?.[0] && 'key' in i.path[0] && i.path[0].key === field
			);
			errors = { ...errors, [field]: issue?.message };
		} else {
			errors = { ...errors, [field]: undefined };
		}
		if (field === 'confirmPassword' && confirmPassword && password !== confirmPassword) {
			errors = { ...errors, confirmPassword: 'Passwords do not match' };
		}
	}

	function handleSubmit() {
		const data = { email, password, confirmPassword };
		const result = v.safeParse(SignupSchema, data);
		if (!result.success) {
			const newErrors: FieldErrors = {};
			for (const issue of result.issues) {
				const key = issue.path?.[0] && 'key' in issue.path[0] ? issue.path[0].key : null;
				if (key && (key === 'email' || key === 'password' || key === 'confirmPassword')) {
					if (!newErrors[key]) newErrors[key] = issue.message;
				}
			}
			errors = newErrors;
			return;
		}
		if (password !== confirmPassword) {
			errors = { confirmPassword: 'Passwords do not match' };
			return;
		}
		errors = {};
		submitted = true;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import * as v from 'valibot';\n" +
		"\n" +
		"	const validateCode = `// Programmatic validation\n" +
		"import { submitContact } from './contact.remote';\n" +
		"\n" +
		"// Validate without submitting\n" +
		"const issues = submitContact.validate();\n" +
		"if (issues) {\n" +
		"  console.log(issues); // field-level errors\n" +
		"}`;\n" +
		"\n" +
		"	const preflightCode = `// Preflight: client-side validation before server call\n" +
		"import { form } from '$app/server';\n" +
		"import * as v from 'valibot';\n" +
		"\n" +
		"const Schema = v.object({\n" +
		"  email: v.pipe(v.string(), v.email()),\n" +
		"  password: v.pipe(v.string(), v.minLength(8)),\n" +
		"});\n" +
		"\n" +
		"export const signup = form(Schema, async ({ data }) =\u003e {\n" +
		"  // Only runs if preflight passes on client\n" +
		"  await createUser(data);\n" +
		"});\n" +
		"\n" +
		"// In component:\n" +
		"// preflight(Schema) runs Valibot on the client BEFORE\n" +
		"// the form is sent to the server — instant feedback!`;\n" +
		"\n" +
		"	const enhanceCode = `// Custom submission behavior with enhance()\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { signup } from './auth.remote';\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cform\n" +
		"  {...signup}\n" +
		"  enhance={() =\u003e {\n" +
		"    // Runs before submission\n" +
		"    return async ({ result, update }) =\u003e {\n" +
		"      if (result.type === 'success') {\n" +
		"        goto('/dashboard');\n" +
		"      } else {\n" +
		"        await update(); // Apply default behavior\n" +
		"      }\n" +
		"    };\n" +
		"  }}\n" +
		"\u003e\n" +
		"  ...\n" +
		"\u003c/form\u003e`;\n" +
		"\n" +
		"	const invalidCode = `// invalid() helper for returning field errors\n" +
		"import { form, invalid } from '$app/server';\n" +
		"\n" +
		"export const signup = form(Schema, async ({ data }) =\u003e {\n" +
		"  const existing = await db.users.findByEmail(data.email);\n" +
		"  if (existing) {\n" +
		"    return invalid({ email: 'This email is already registered' });\n" +
		"  }\n" +
		"  await createUser(data);\n" +
		"});`;\n" +
		"\n" +
		"	const SignupSchema = v.object({\n" +
		"		email: v.pipe(v.string(), v.nonEmpty('Email is required'), v.email('Must be a valid email')),\n" +
		"		password: v.pipe(\n" +
		"			v.string(),\n" +
		"			v.nonEmpty('Password is required'),\n" +
		"			v.minLength(8, 'Must be at least 8 characters')\n" +
		"		),\n" +
		"		confirmPassword: v.pipe(v.string(), v.nonEmpty('Please confirm your password')),\n" +
		"	});\n" +
		"\n" +
		"	let email = $state('');\n" +
		"	let password = $state('');\n" +
		"	let confirmPassword = $state('');\n" +
		"\n" +
		"	type FieldErrors = { email?: string; password?: string; confirmPassword?: string };\n" +
		"	let errors = $state\u003cFieldErrors\u003e({});\n" +
		"	let submitted = $state(false);\n" +
		"\n" +
		"	function validateField(field: 'email' | 'password' | 'confirmPassword') {\n" +
		"		const data = { email, password, confirmPassword };\n" +
		"		const result = v.safeParse(SignupSchema, data);\n" +
		"		if (!result.success) {\n" +
		"			const issue = result.issues.find(\n" +
		"				(i) =\u003e i.path?.[0] && 'key' in i.path[0] && i.path[0].key === field\n" +
		"			);\n" +
		"			errors = { ...errors, [field]: issue?.message };\n" +
		"		} else {\n" +
		"			errors = { ...errors, [field]: undefined };\n" +
		"		}\n" +
		"		if (field === 'confirmPassword' && confirmPassword && password !== confirmPassword) {\n" +
		"			errors = { ...errors, confirmPassword: 'Passwords do not match' };\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	function handleSubmit() {\n" +
		"		const data = { email, password, confirmPassword };\n" +
		"		const result = v.safeParse(SignupSchema, data);\n" +
		"		if (!result.success) {\n" +
		"			const newErrors: FieldErrors = {};\n" +
		"			for (const issue of result.issues) {\n" +
		"				const key = issue.path?.[0] && 'key' in issue.path[0] ? issue.path[0].key : null;\n" +
		"				if (key && (key === 'email' || key === 'password' || key === 'confirmPassword')) {\n" +
		"					if (!newErrors[key]) newErrors[key] = issue.message;\n" +
		"				}\n" +
		"			}\n" +
		"			errors = newErrors;\n" +
		"			return;\n" +
		"		}\n" +
		"		if (password !== confirmPassword) {\n" +
		"			errors = { confirmPassword: 'Passwords do not match' };\n" +
		"			return;\n" +
		"		}\n" +
		"		errors = {};\n" +
		"		submitted = true;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.8 — Validation, Preflight, Enhance\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003evalidate()\u003c/code\u003e checks form data programmatically.\n" +
		"		\u003ccode\u003epreflight(schema)\u003c/code\u003e runs Valibot on the client before sending to the server.\n" +
		"		\u003ccode\u003eenhance()\u003c/code\u003e customizes submission behavior. \u003ccode\u003einvalid()\u003c/code\u003e returns\n" +
		"		field-level errors from the server.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eProgrammatic validation\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{validateCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003ePreflight (client-side validation)\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{preflightCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eCustom enhance\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{enhanceCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eServer-side invalid() helper\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{invalidCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eLive preflight demo\u003c/h2\u003e\n" +
		"		\u003cp\u003eValibot validates on blur before \"submitting\" — demonstrating the preflight concept:\u003c/p\u003e\n" +
		"\n" +
		"		{#if submitted}\n" +
		"			\u003cdiv class=\"success\"\u003e\n" +
		"				\u003cp\u003ePreflight passed! Form would be sent to server.\u003c/p\u003e\n" +
		"				\u003cbutton class=\"btn\" onclick={() =\u003e { submitted = false; email = ''; password = ''; confirmPassword = ''; }}\u003e\n" +
		"					Reset\n" +
		"				\u003c/button\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{:else}\n" +
		"			\u003cform class=\"demo-form\" onsubmit={(e) =\u003e { e.preventDefault(); handleSubmit(); }}\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput type=\"email\" bind:value={email} onblur={() =\u003e validateField('email')} placeholder=\"you@example.com\" /\u003e\n" +
		"					{#if errors.email}\n" +
		"						\u003cspan class=\"field-error\"\u003e{errors.email}\u003c/span\u003e\n" +
		"					{/if}\n" +
		"				\u003c/label\u003e\n" +
		"\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003ePassword\u003c/span\u003e\n" +
		"					\u003cinput type=\"password\" bind:value={password} onblur={() =\u003e validateField('password')} placeholder=\"At least 8 characters\" /\u003e\n" +
		"					{#if errors.password}\n" +
		"						\u003cspan class=\"field-error\"\u003e{errors.password}\u003c/span\u003e\n" +
		"					{/if}\n" +
		"				\u003c/label\u003e\n" +
		"\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eConfirm Password\u003c/span\u003e\n" +
		"					\u003cinput type=\"password\" bind:value={confirmPassword} onblur={() =\u003e validateField('confirmPassword')} placeholder=\"Repeat password\" /\u003e\n" +
		"					{#if errors.confirmPassword}\n" +
		"						\u003cspan class=\"field-error\"\u003e{errors.confirmPassword}\u003c/span\u003e\n" +
		"					{/if}\n" +
		"				\u003c/label\u003e\n" +
		"\n" +
		"				\u003cbutton class=\"btn\" type=\"submit\"\u003eSign Up\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003evalidate()\u003c/code\u003e checks form data without submitting\u003c/li\u003e\n" +
		"		\u003cli\u003ePreflight runs Valibot on the client for instant feedback before the server round trip\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eenhance()\u003c/code\u003e gives full control over submission behavior (redirects, custom error handling)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003einvalid()\u003c/code\u003e returns structured field errors from server-side validation logic\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9B.8 — Validation, Preflight, Enhance</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>validate()</code> checks form data programmatically.
		<code>preflight(schema)</code> runs Valibot on the client before sending to the server.
		<code>enhance()</code> customizes submission behavior. <code>invalid()</code> returns
		field-level errors from the server.
	</p>

	<div class="build">
		<h2>Programmatic validation</h2>
		<pre><code>{validateCode}</code></pre>

		<h2>Preflight (client-side validation)</h2>
		<pre><code>{preflightCode}</code></pre>

		<h2>Custom enhance</h2>
		<pre><code>{enhanceCode}</code></pre>

		<h2>Server-side invalid() helper</h2>
		<pre><code>{invalidCode}</code></pre>

		<h2>Live preflight demo</h2>
		<p>Valibot validates on blur before "submitting" — demonstrating the preflight concept:</p>

		{#if submitted}
			<div class="success">
				<p>Preflight passed! Form would be sent to server.</p>
				<button class="btn" onclick={() => { submitted = false; email = ''; password = ''; confirmPassword = ''; }}>
					Reset
				</button>
			</div>
		{:else}
			<form class="demo-form" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
				<label class="field">
					<span>Email</span>
					<input type="email" bind:value={email} onblur={() => validateField('email')} placeholder="you@example.com" />
					{#if errors.email}
						<span class="field-error">{errors.email}</span>
					{/if}
				</label>

				<label class="field">
					<span>Password</span>
					<input type="password" bind:value={password} onblur={() => validateField('password')} placeholder="At least 8 characters" />
					{#if errors.password}
						<span class="field-error">{errors.password}</span>
					{/if}
				</label>

				<label class="field">
					<span>Confirm Password</span>
					<input type="password" bind:value={confirmPassword} onblur={() => validateField('confirmPassword')} placeholder="Repeat password" />
					{#if errors.confirmPassword}
						<span class="field-error">{errors.confirmPassword}</span>
					{/if}
				</label>

				<button class="btn" type="submit">Sign Up</button>
			</form>
		{/if}
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>onblur</code> validation and rely only on submit-time validation.</strong> Users type entire forms before seeing any errors. The feedback loop is much slower, and users often have to fix multiple fields after submission instead of correcting each one as they go.</li>
		<li><strong>Skip the preflight and send invalid data directly to the server.</strong> The server still rejects it because Valibot validation runs server-side regardless. But the user waited for a round trip to discover the error, adding unnecessary latency compared to instant client-side preflight.</li>
		<li><strong>Return a plain string from the <code>form()</code> handler instead of using <code>invalid()</code>.</strong> The client cannot map the error to a specific field. Users see a generic error message instead of the targeted per-field feedback that <code>invalid()</code> provides.</li>
		<li><strong>Remove the <code>enhance()</code> callback and let the form use default behavior.</strong> The form still works, but after submission the page does a full navigation instead of staying in place. Custom <code>enhance</code> logic is what enables SPA-like behavior with redirects and inline updates.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The validation layer in remote forms has three tiers. First, <code>validate()</code> lets you check form data programmatically at any time without submitting. Second, preflight runs the same Valibot schema on the client before the form is sent to the server, giving users instant feedback. Third, the server always validates regardless, ensuring security even if the client is bypassed.</p>
	<p class="prose">The <code>enhance()</code> callback gives you full control over what happens when a form is submitted. You can redirect to a dashboard on success, show a custom error toast on failure, or apply optimistic updates. Without <code>enhance</code>, forms fall back to default progressive enhancement behavior with full-page navigation.</p>
	<p class="prose">When server-side validation catches errors that cannot be detected on the client (like a duplicate email), the <code>invalid()</code> helper returns structured field-level errors that the form fields API can display inline. This keeps the error handling consistent whether the issue is caught by preflight or by the server.</p>
	<p class="next">Next up: server-side mutations with <code>command()</code>.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.demo-form { display: flex; flex-direction: column; gap: var(--space-sm); }
	.field { display: flex; flex-direction: column; gap: var(--space-xs); }
	.field span { font-size: var(--text-sm); font-weight: 500; }
	.field input {
		padding: var(--space-sm); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); font-size: var(--text-base);
		background: var(--color-surface-2); color: var(--color-text);
	}
	.field-error { font-size: var(--text-sm); color: oklch(60% 0.2 25); }
	.btn {
		padding: var(--space-sm) var(--space-md); border: none;
		border-radius: var(--radius-md); font-weight: 600;
		background: var(--color-text); color: var(--color-surface-1);
		cursor: pointer; font-size: var(--text-base);
	}
	.success { text-align: center; padding: var(--space-lg); }
	.success p { color: oklch(60% 0.15 145); font-weight: 600; margin: 0 0 var(--space-md) 0; }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
