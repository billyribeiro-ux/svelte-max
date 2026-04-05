<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { form }: { form: ActionData } = $props();
	let uploading = $state(false);

	function formatBytes(n: number): string {
		if (n < 1024) return `${n} B`;
		if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
		return `${(n / 1024 / 1024).toFixed(2)} MB`;
	}
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
</style>
