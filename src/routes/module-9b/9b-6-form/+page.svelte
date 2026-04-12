<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const formRemoteCode = `// contact.remote.ts\n" +
		"import { form } from '$app/server';\n" +
		"import * as v from 'valibot';\n" +
		"\n" +
		"const ContactSchema = v.object({\n" +
		"  name: v.pipe(v.string(), v.minLength(2)),\n" +
		"  email: v.pipe(v.string(), v.email()),\n" +
		"  message: v.pipe(v.string(), v.minLength(10)),\n" +
		"});\n" +
		"\n" +
		"export const submitContact = form(ContactSchema, async ({ data }) =\u003e {\n" +
		"  // 'data' is fully validated and typed\n" +
		"  await db.contacts.create(data);\n" +
		"  return { success: true };\n" +
		"});`;\n" +
		"\n" +
		"	const usageCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { submitContact } from './contact.remote';\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003c!-- Spread the form onto the \u003cform\u003e element --\u003e\n" +
		"\u003cform {...submitContact}\u003e\n" +
		"  \u003cinput name=\"name\" required /\u003e\n" +
		"  \u003cinput name=\"email\" type=\"email\" required /\u003e\n" +
		"  \u003ctextarea name=\"message\" required\u003e\u003c/textarea\u003e\n" +
		"  \u003cbutton type=\"submit\"\u003eSend\u003c/button\u003e\n" +
		"\u003c/form\u003e\n" +
		"\n" +
		"\u003c!-- Progressive enhancement: works without JS! --\u003e\n" +
		"\u003c!-- With JS: no full page reload, validation feedback --\u003e`;\n" +
		"\n" +
		"	const peNote = `// Progressive enhancement is built in:\n" +
		"// 1. Without JS → standard form POST, server handles it\n" +
		"// 2. With JS → AJAX submission, no page reload\n" +
		"// 3. Validation errors are returned and displayed inline\n" +
		"// 4. The form state is reactive`;\n" +
		"\n" +
		"	let name = $state('');\n" +
		"	let email = $state('');\n" +
		"	let message = $state('');\n" +
		"	let submitted = $state(false);\n" +
		"	let submitting = $state(false);\n" +
		"\n" +
		"	function handleSubmit() {\n" +
		"		submitting = true;\n" +
		"		setTimeout(() =\u003e {\n" +
		"			submitted = true;\n" +
		"			submitting = false;\n" +
		"		}, 500);\n" +
		"	}\n" +
		"\n" +
		"	function reset() {\n" +
		"		name = '';\n" +
		"		email = '';\n" +
		"		message = '';\n" +
		"		submitted = false;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.6 — form() Remote Functions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003eform\u003c/code\u003e from \u003ccode\u003e$app/server\u003c/code\u003e handles form\n" +
		"		submissions server-side. It spreads onto the \u003ccode\u003e&lt;form&gt;\u003c/code\u003e element, providing\n" +
		"		progressive enhancement and Valibot validation out of the box.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eRemote form definition\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{formRemoteCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eComponent usage\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{usageCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eProgressive enhancement\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{peNote}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated form demo\u003c/h2\u003e\n" +
		"		\u003cp\u003eThis demonstrates the pattern using client-side state (as taught in Module 10):\u003c/p\u003e\n" +
		"\n" +
		"		{#if submitted}\n" +
		"			\u003cdiv class=\"success-msg\"\u003e\n" +
		"				\u003cp\u003eForm submitted successfully!\u003c/p\u003e\n" +
		"				\u003cbutton class=\"btn\" onclick={reset}\u003eSend another\u003c/button\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{:else}\n" +
		"			\u003cform class=\"demo-form\" onsubmit={(e) =\u003e { e.preventDefault(); handleSubmit(); }}\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eName\u003c/span\u003e\n" +
		"					\u003cinput type=\"text\" bind:value={name} required minlength={2} /\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput type=\"email\" bind:value={email} required /\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eMessage\u003c/span\u003e\n" +
		"					\u003ctextarea bind:value={message} required minlength={10} rows={3}\u003e\u003c/textarea\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				\u003cbutton class=\"btn\" type=\"submit\" disabled={submitting}\u003e\n" +
		"					{submitting ? 'Sending...' : 'Send Message'}\n" +
		"				\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eform()\u003c/code\u003e defines a server-side form handler in a \u003ccode\u003e.remote.ts\u003c/code\u003e file\u003c/li\u003e\n" +
		"		\u003cli\u003eSpreading onto \u003ccode\u003e&lt;form&gt;\u003c/code\u003e wires up action, method, and enhancement\u003c/li\u003e\n" +
		"		\u003cli\u003eProgressive enhancement works automatically — forms function without JavaScript\u003c/li\u003e\n" +
		"		\u003cli\u003eValibot schemas validate input server-side with typed results\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the spread <code>{'{...submitContact}'}</code> from the form element.</strong> The form becomes a plain HTML form with no server wiring. Submitting it either does nothing or navigates to a non-existent action URL, proving that the spread is what connects the form to the remote function.</li>
		<li><strong>Disable JavaScript in the browser and submit the form.</strong> It still works because <code>form()</code> provides progressive enhancement. The form submits as a standard POST request, the server validates and processes it, and the page reloads with the result.</li>
		<li><strong>Send a field value that fails Valibot validation (e.g., a 1-character name).</strong> The server rejects the submission and returns field-level errors. The form does not process the handler body because validation happens before your async function runs.</li>
		<li><strong>Add a field to the HTML form that is not in the Valibot schema.</strong> The extra field is silently stripped during validation. The server handler never sees it, preventing injection of unexpected data through form manipulation.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>form()</code> function from <code>$app/server</code> defines a server-side form handler in a <code>.remote.ts</code> file. You pass it a Valibot schema and an async handler. Spreading the result onto a <code>&lt;form&gt;</code> element wires up the action URL, HTTP method, and progressive enhancement in one step.</p>
	<p class="prose">Progressive enhancement is the standout feature. Without JavaScript, the form submits as a standard POST and the server returns a full page response. With JavaScript enabled, the submission happens via AJAX with no page reload, and validation errors appear inline without losing form state.</p>
	<p class="prose">Valibot validation runs server-side before your handler executes, ensuring that the <code>data</code> parameter is always fully validated and typed. Unknown fields are stripped, required fields are enforced, and format constraints like email or minimum length are checked automatically.</p>
	<p class="next">Next up: the form fields API for binding schema properties to input elements.</p>
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
