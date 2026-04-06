<script lang="ts">
	const textFieldCode = `// Text field
<input {...fields.name.as('text')} />

// Read current value
<p>Hello, {fields.name.value()}</p>

// Show validation issues
{#if fields.name.issues()}
  <span class="error">{fields.name.issues()}</span>
{/if}`;

	const checkboxCode = `// Checkbox
<input {...fields.agree.as('checkbox')} />

// Radio buttons
<input {...fields.size.as('radio', 'small')} /> Small
<input {...fields.size.as('radio', 'medium')} /> Medium
<input {...fields.size.as('radio', 'large')} /> Large`;

	const selectFileCode = `// Select
<select {...fields.country.as('select')}>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>

// File upload
<input {...fields.avatar.as('file')} />`;

	const nestedCode = `// Nested fields for complex objects
// Schema: { info: { height: number, weight: number } }
<input {...fields.info.height.as('number')} />
<input {...fields.info.weight.as('number')} />`;

	const fullExampleCode = `// profile.remote.ts
import { form } from '$app/server';
import * as v from 'valibot';

const ProfileSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  age: v.pipe(v.number(), v.minValue(13)),
  newsletter: v.boolean(),
  plan: v.picklist(['free', 'pro', 'enterprise']),
});

export const updateProfile = form(ProfileSchema, async ({ data }) => {
  await db.profiles.update(data);
});`;

	let name = $state('');
	let email = $state('');
	let age = $state('');
	let newsletter = $state(false);
	let plan = $state('free');

	let nameError = $derived(name.length > 0 && name.length < 2 ? 'Name must be at least 2 characters' : '');
	let emailError = $derived(email.length > 0 && !email.includes('@') ? 'Invalid email address' : '');
	let ageError = $derived(age !== '' && (Number(age) < 13 || isNaN(Number(age))) ? 'Must be at least 13' : '');
</script>

<section class="page">
	<h1>9B.7 — Form Fields API</h1>
	<p class="concept">
		<strong>Concept.</strong> The form fields API provides helpers like <code>.as('text')</code>,
		<code>.as('checkbox')</code>, <code>.as('radio', value)</code>, <code>.as('select')</code>,
		and <code>.as('file')</code>. Use <code>.issues()</code> for per-field validation and
		<code>.value()</code> for reading. Nested fields use dot notation:
		<code>fields.info.height.as('number')</code>.
	</p>

	<div class="build">
		<h2>Text fields with validation</h2>
		<pre><code>{textFieldCode}</code></pre>

		<h2>Checkbox and radio</h2>
		<pre><code>{checkboxCode}</code></pre>

		<h2>Select and file</h2>
		<pre><code>{selectFileCode}</code></pre>

		<h2>Nested fields</h2>
		<pre><code>{nestedCode}</code></pre>

		<h2>Full example</h2>
		<pre><code>{fullExampleCode}</code></pre>

		<h2>Simulated form fields demo</h2>
		<p>A profile form demonstrating each field type with inline validation:</p>

		<form class="demo-form" onsubmit={(e) => e.preventDefault()}>
			<label class="field">
				<span>Name <code>.as('text')</code></span>
				<input type="text" bind:value={name} placeholder="Your name" />
				{#if nameError}
					<span class="field-error">{nameError}</span>
				{/if}
			</label>

			<label class="field">
				<span>Email <code>.as('text')</code></span>
				<input type="email" bind:value={email} placeholder="you@example.com" />
				{#if emailError}
					<span class="field-error">{emailError}</span>
				{/if}
			</label>

			<label class="field">
				<span>Age <code>.as('number')</code></span>
				<input type="number" bind:value={age} placeholder="13+" />
				{#if ageError}
					<span class="field-error">{ageError}</span>
				{/if}
			</label>

			<label class="field-inline">
				<input type="checkbox" bind:checked={newsletter} />
				<span>Subscribe to newsletter <code>.as('checkbox')</code></span>
			</label>

			<label class="field">
				<span>Plan <code>.as('select')</code></span>
				<select bind:value={plan}>
					<option value="free">Free</option>
					<option value="pro">Pro</option>
					<option value="enterprise">Enterprise</option>
				</select>
			</label>

			<div class="preview">
				<strong>Current values:</strong>
				<p>name: {name || '(empty)'}, email: {email || '(empty)'}, age: {age || '(empty)'}, newsletter: {newsletter}, plan: {plan}</p>
			</div>
		</form>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>.as()</code> binds form fields to schema properties with the correct input type</li>
		<li><code>.issues()</code> returns per-field validation errors</li>
		<li><code>.value()</code> reads the current value reactively</li>
		<li>Nested schemas map to nested field accessors via dot notation</li>
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
	.field input, .field select {
		padding: var(--space-sm); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); font-size: var(--text-base);
		background: var(--color-surface-2); color: var(--color-text);
	}
	.field-inline { display: flex; align-items: center; gap: var(--space-sm); }
	.field-inline input[type="checkbox"] { width: 1.2rem; height: 1.2rem; }
	.field-error { font-size: var(--text-sm); color: oklch(60% 0.2 25); }
	.preview { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-sm); font-size: var(--text-sm); }
	.preview p { margin: var(--space-xs) 0 0 0; font-family: var(--font-mono); color: var(--color-text-muted); word-break: break-all; }
	.preview strong { display: block; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
