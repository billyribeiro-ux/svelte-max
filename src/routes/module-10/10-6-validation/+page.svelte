<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
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

	<h3>What you learned</h3>
	<ul>
		<li><code>fail(status, data)</code> returns a validation failure that shows up as <code>form</code>.</li>
		<li>Prefill submitted values (but never passwords) so users don't retype on error.</li>
		<li><code>ActionData</code> is a typed union — narrow it with <code>form?.errors</code> or <code>form?.success</code>.</li>
		<li>Always validate on the server; client validation is only for UX polish.</li>
	</ul>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
</style>
