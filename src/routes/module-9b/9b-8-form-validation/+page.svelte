<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li><code>validate()</code> checks form data without submitting</li>
		<li>Preflight runs Valibot on the client for instant feedback before the server round trip</li>
		<li><code>enhance()</code> gives full control over submission behavior (redirects, custom error handling)</li>
		<li><code>invalid()</code> returns structured field errors from server-side validation logic</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
