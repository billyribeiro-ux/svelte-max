<script lang="ts">
	const formRemoteCode = `// contact.remote.ts
import { form } from '$app/server';
import * as v from 'valibot';

const ContactSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  message: v.pipe(v.string(), v.minLength(10)),
});

export const submitContact = form(ContactSchema, async ({ data }) => {
  // 'data' is fully validated and typed
  await db.contacts.create(data);
  return { success: true };
});`;

	const usageCode = `\u003cscript lang="ts"\u003e
  import { submitContact } from './contact.remote';
\u003c/script\u003e

<!-- Spread the form onto the <form> element -->
<form {...submitContact}>
  <input name="name" required />
  <input name="email" type="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>

<!-- Progressive enhancement: works without JS! -->
<!-- With JS: no full page reload, validation feedback -->`;

	const peNote = `// Progressive enhancement is built in:
// 1. Without JS → standard form POST, server handles it
// 2. With JS → AJAX submission, no page reload
// 3. Validation errors are returned and displayed inline
// 4. The form state is reactive`;

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitted = $state(false);
	let submitting = $state(false);

	function handleSubmit() {
		submitting = true;
		setTimeout(() => {
			submitted = true;
			submitting = false;
		}, 500);
	}

	function reset() {
		name = '';
		email = '';
		message = '';
		submitted = false;
	}
</script>

<section class="page">
	<h1>9B.6 — form() Remote Functions</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>form</code> from <code>$app/server</code> handles form
		submissions server-side. It spreads onto the <code>&lt;form&gt;</code> element, providing
		progressive enhancement and Valibot validation out of the box.
	</p>

	<div class="build">
		<h2>Remote form definition</h2>
		<pre><code>{formRemoteCode}</code></pre>

		<h2>Component usage</h2>
		<pre><code>{usageCode}</code></pre>

		<h2>Progressive enhancement</h2>
		<pre><code>{peNote}</code></pre>

		<h2>Simulated form demo</h2>
		<p>This demonstrates the pattern using client-side state (as taught in Module 10):</p>

		{#if submitted}
			<div class="success-msg">
				<p>Form submitted successfully!</p>
				<button class="btn" onclick={reset}>Send another</button>
			</div>
		{:else}
			<form class="demo-form" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
				<label class="field">
					<span>Name</span>
					<input type="text" bind:value={name} required minlength={2} />
				</label>
				<label class="field">
					<span>Email</span>
					<input type="email" bind:value={email} required />
				</label>
				<label class="field">
					<span>Message</span>
					<textarea bind:value={message} required minlength={10} rows={3}></textarea>
				</label>
				<button class="btn" type="submit" disabled={submitting}>
					{submitting ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>form()</code> defines a server-side form handler in a <code>.remote.ts</code> file</li>
		<li>Spreading onto <code>&lt;form&gt;</code> wires up action, method, and enhancement</li>
		<li>Progressive enhancement works automatically — forms function without JavaScript</li>
		<li>Valibot schemas validate input server-side with typed results</li>
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
	.field input, .field textarea {
		padding: var(--space-sm); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); font-size: var(--text-base);
		background: var(--color-surface-2); color: var(--color-text);
		font-family: inherit;
	}
	.btn {
		padding: var(--space-sm) var(--space-md); border: none;
		border-radius: var(--radius-md); font-weight: 600;
		background: var(--color-text); color: var(--color-surface-1);
		cursor: pointer; font-size: var(--text-base);
	}
	.btn:disabled { opacity: 0.6; cursor: not-allowed; }
	.success-msg { text-align: center; padding: var(--space-lg); }
	.success-msg p { color: oklch(60% 0.15 145); font-weight: 600; margin: 0 0 var(--space-md) 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
