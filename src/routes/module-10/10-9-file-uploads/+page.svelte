<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { form }: { form: ActionData } = $props();
	let uploading = $state(false);

	function formatBytes(n: number): string {
		if (n < 1024) return `${n} B`;
		if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
		return `${(n / 1024 / 1024).toFixed(2)} MB`;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { ActionData } from './$types';\n" +
		"	import { enhance } from '$app/forms';\n" +
		"\n" +
		"	let { form }: { form: ActionData } = $props();\n" +
		"	let uploading = $state(false);\n" +
		"\n" +
		"	function formatBytes(n: number): string {\n" +
		"		if (n \u003c 1024) return `${n} B`;\n" +
		"		if (n \u003c 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;\n" +
		"		return `${(n / 1024 / 1024).toFixed(2)} MB`;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.9 — File uploads via form actions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Set \u003ccode\u003eenctype=\"multipart/form-data\"\u003c/code\u003e on the form and\n" +
		"		\u003ccode\u003erequest.formData()\u003c/code\u003e will hand you real \u003ccode\u003eFile\u003c/code\u003e objects — with\n" +
		"		\u003ccode\u003e.name\u003c/code\u003e, \u003ccode\u003e.size\u003c/code\u003e, \u003ccode\u003e.type\u003c/code\u003e, and \u003ccode\u003e.arrayBuffer()\u003c/code\u003e.\n" +
		"		Server-side validation is non-negotiable: enforce a max size, an allow-list of MIME types, and\n" +
		"		(for the truly paranoid) a magic-byte sniff. This demo hashes the bytes and returns the\n" +
		"		metadata instead of persisting anything.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch3\u003eUpload an avatar\u003c/h3\u003e\n" +
		"		\u003cform\n" +
		"			method=\"POST\"\n" +
		"			enctype=\"multipart/form-data\"\n" +
		"			use:enhance={() =\u003e {\n" +
		"				uploading = true;\n" +
		"				return async ({ update }) =\u003e {\n" +
		"					await update();\n" +
		"					uploading = false;\n" +
		"				};\n" +
		"			}}\n" +
		"			class=\"stack\"\n" +
		"		\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eImage (PNG, JPEG, WebP, SVG — max 2 MB)\u003c/span\u003e\n" +
		"				\u003cinput type=\"file\" name=\"avatar\" accept=\"image/*\" /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003cbutton class=\"cta\" type=\"submit\" disabled={uploading}\u003e\n" +
		"				{uploading ? 'Uploading…' : 'Upload'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/form\u003e\n" +
		"\n" +
		"		{#if form && 'error' in form && form.error}\n" +
		"			\u003cspan class=\"error-pill\"\u003e{form.error}\u003c/span\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		{#if form && 'success' in form && form.success && form.meta}\n" +
		"			\u003cdiv class=\"meta\"\u003e\n" +
		"				\u003cspan class=\"success-pill\"\u003eReceived\u003c/span\u003e\n" +
		"				\u003cdl\u003e\n" +
		"					\u003cdt\u003eName\u003c/dt\u003e\u003cdd\u003e{form.meta.name}\u003c/dd\u003e\n" +
		"					\u003cdt\u003eSize\u003c/dt\u003e\u003cdd\u003e{formatBytes(form.meta.sizeBytes)}\u003c/dd\u003e\n" +
		"					\u003cdt\u003eType\u003c/dt\u003e\u003cdd\u003e\u003ccode\u003e{form.meta.type}\u003c/code\u003e\u003c/dd\u003e\n" +
		"					\u003cdt\u003eSHA-256 (short)\u003c/dt\u003e\u003cdd\u003e\u003ccode\u003e{form.meta.hash}\u003c/code\u003e\u003c/dd\u003e\n" +
		"				\u003c/dl\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003cp class=\"hint\"\u003e\n" +
		"			\u003cstrong\u003eNote.\u003c/strong\u003e \u003ccode\u003eenctype=\"multipart/form-data\"\u003c/code\u003e is required — without it,\n" +
		"			the browser sends the file name as a plain string and \u003ccode\u003eformData.get('avatar')\u003c/code\u003e\n" +
		"			returns a string, not a \u003ccode\u003eFile\u003c/code\u003e.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003erequest.formData()\u003c/code\u003e yields \u003ccode\u003eFile\u003c/code\u003e objects when the form is multipart.\u003c/li\u003e\n" +
		"		\u003cli\u003eAlways enforce size and MIME-type limits on the server.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003efile.arrayBuffer()\u003c/code\u003e gives you the raw bytes for hashing, storage, or sniffing.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003euse:enhance\u003c/code\u003e keeps uploads feeling instant without losing progressive enhancement.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.9 — File uploads via form actions</h1>
	<p class="concept">
		<strong>Concept.</strong> Set <code>enctype="multipart/form-data"</code> on the form and
		<code>request.formData()</code> will hand you real <code>File</code> objects — with
		<code>.name</code>, <code>.size</code>, <code>.type</code>, and <code>.arrayBuffer()</code>.
		Server-side validation is non-negotiable: enforce a max size, an allow-list of MIME types, and
		(for the truly paranoid) a magic-byte sniff. This demo hashes the bytes and returns the
		metadata instead of persisting anything.
	</p>

	<div class="build">
		<h3>Upload an avatar</h3>
		<form
			method="POST"
			enctype="multipart/form-data"
			use:enhance={() => {
				uploading = true;
				return async ({ update }) => {
					await update();
					uploading = false;
				};
			}}
			class="stack"
		>
			<label class="field">
				<span>Image (PNG, JPEG, WebP, SVG — max 2 MB)</span>
				<input type="file" name="avatar" accept="image/*" />
			</label>
			<button class="cta" type="submit" disabled={uploading}>
				{uploading ? 'Uploading…' : 'Upload'}
			</button>
		</form>

		{#if form && 'error' in form && form.error}
			<span class="error-pill">{form.error}</span>
		{/if}

		{#if form && 'success' in form && form.success && form.meta}
			<div class="meta">
				<span class="success-pill">Received</span>
				<dl>
					<dt>Name</dt><dd>{form.meta.name}</dd>
					<dt>Size</dt><dd>{formatBytes(form.meta.sizeBytes)}</dd>
					<dt>Type</dt><dd><code>{form.meta.type}</code></dd>
					<dt>SHA-256 (short)</dt><dd><code>{form.meta.hash}</code></dd>
				</dl>
			</div>
		{/if}

		<p class="hint">
			<strong>Note.</strong> <code>enctype="multipart/form-data"</code> is required — without it,
			the browser sends the file name as a plain string and <code>formData.get('avatar')</code>
			returns a string, not a <code>File</code>.
		</p>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>request.formData()</code> yields <code>File</code> objects when the form is multipart.</li>
		<li>Always enforce size and MIME-type limits on the server.</li>
		<li><code>file.arrayBuffer()</code> gives you the raw bytes for hashing, storage, or sniffing.</li>
		<li><code>use:enhance</code> keeps uploads feeling instant without losing progressive enhancement.</li>
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
	button.cta:disabled { opacity: 0.5; cursor: not-allowed; }
	.meta { display: flex; flex-direction: column; gap: var(--space-sm); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); }
	dl { display: grid; grid-template-columns: max-content 1fr; gap: var(--space-xs) var(--space-md); margin: 0; font-size: var(--text-sm); }
	dt { color: var(--color-text-muted); font-weight: 600; }
	dd { color: var(--color-text); margin: 0; word-break: break-all; }
	.hint { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; line-height: 1.6; }
	.hint strong { color: var(--color-text); }
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
