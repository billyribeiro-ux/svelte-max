<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Local demo state ── */
	let selectedFiles: FileList | null = $state(null);
	let previewUrl = $state('');
	let dragOver = $state(false);
	let droppedFileName = $state('');

	function formatBytes(n: number): string {
		if (n < 1024) return `${n} B`;
		if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
		return `${(n / 1024 / 1024).toFixed(2)} MB`;
	}

	function handleFileSelect() {
		if (selectedFiles && selectedFiles.length > 0) {
			const file = selectedFiles[0];
			if (file.type.startsWith('image/')) {
				previewUrl = URL.createObjectURL(file);
			} else {
				previewUrl = '';
			}
		}
	}

	function handleDrop(e: DragEvent) {
		dragOver = false;
		if (e.dataTransfer?.files.length) {
			droppedFileName = e.dataTransfer.files[0].name;
		}
	}


	/* ── CodeCanvas examples ── */
	const exampleFileInput =
		"\u003cscript lang=\"ts\">\n" +
		"  // bind:files gives you a reactive FileList\n" +
		"  let selectedFiles: FileList | null = $state(null);\n" +
		"\u003c/script>\n" +
		"\n" +
		"<!-- Basic file input -->\n" +
		"<input type=\"file\" bind:files={selectedFiles} />\n" +
		"\n" +
		"<!-- Accept only images -->\n" +
		"<input type=\"file\" accept=\"image/*\" bind:files={selectedFiles} />\n" +
		"\n" +
		"<!-- Accept specific types -->\n" +
		"<input type=\"file\" accept=\".pdf,.doc,.docx\" bind:files={selectedFiles} />\n" +
		"\n" +
		"<!-- Allow multiple files -->\n" +
		"<input type=\"file\" multiple bind:files={selectedFiles} />\n" +
		"\n" +
		"<!-- Show file info reactively -->\n" +
		"{#if selectedFiles}\n" +
		"  {#each Array.from(selectedFiles) as file}\n" +
		"    <p>{file.name} — {file.type} — {file.size} bytes</p>\n" +
		"  {/each}\n" +
		"{/if}\n" +
		"\n" +
		"<!-- Preview an uploaded image -->\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  let previewUrl = $state('');\n" +
		"\n" +
		"  function handleSelect() {\n" +
		"    if (selectedFiles?.[0]?.type.startsWith('image/')) {\n" +
		"      previewUrl = URL.createObjectURL(selectedFiles[0]);\n" +
		"    }\n" +
		"  }\n" +
		"\u003c/script>\n" +
		"\n" +
		"<input type=\"file\" accept=\"image/*\"\n" +
		"  bind:files={selectedFiles}\n" +
		"  onchange={handleSelect}\n" +
		"/>\n" +
		"\n" +
		"{#if previewUrl}\n" +
		"  <img src={previewUrl} alt=\"Preview\" width=\"200\" height=\"200\" />\n" +
		"{/if}";

	const exampleFormAction =
		"<!-- +page.svelte -->\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  import { enhance } from '$app/forms';\n" +
		"  import type { ActionData } from './$types';\n" +
		"\n" +
		"  let { form }: { form: ActionData } = $props();\n" +
		"  let uploading = $state(false);\n" +
		"\u003c/script>\n" +
		"\n" +
		"<!-- enctype=\"multipart/form-data\" is REQUIRED for file uploads.\n" +
		"     Without it, the browser sends file.name as a string,\n" +
		"     not the actual bytes. -->\n" +
		"<form\n" +
		"  method=\"POST\"\n" +
		"  enctype=\"multipart/form-data\"\n" +
		"  use:enhance={() => {\n" +
		"    uploading = true;\n" +
		"    return async ({ update }) => {\n" +
		"      await update();\n" +
		"      uploading = false;\n" +
		"    };\n" +
		"  }}\n" +
		">\n" +
		"  <input type=\"file\" name=\"avatar\" accept=\"image/*\" />\n" +
		"  <button type=\"submit\" disabled={uploading}>\n" +
		"    {uploading ? 'Uploading...' : 'Upload'}\n" +
		"  </button>\n" +
		"</form>\n" +
		"\n" +
		"{#if form?.error}\n" +
		"  <p class=\"error\">{form.error}</p>\n" +
		"{/if}\n" +
		"{#if form?.success}\n" +
		"  <p class=\"success\">File uploaded: {form.filename}</p>\n" +
		"{/if}";

	const exampleServerAction =
		"// +page.server.ts\n" +
		"import { fail } from '@sveltejs/kit';\n" +
		"import type { Actions } from './$types';\n" +
		"\n" +
		"const MAX_SIZE = 2 * 1024 * 1024; // 2 MB\n" +
		"const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];\n" +
		"\n" +
		"export const actions: Actions = {\n" +
		"  default: async ({ request }) => {\n" +
		"    const data = await request.formData();\n" +
		"    const file = data.get('avatar');\n" +
		"\n" +
		"    // 1. Check that it's actually a File, not a string\n" +
		"    if (!(file instanceof File) || file.size === 0) {\n" +
		"      return fail(400, { error: 'Please select a file.' });\n" +
		"    }\n" +
		"\n" +
		"    // 2. Validate file size\n" +
		"    if (file.size > MAX_SIZE) {\n" +
		"      return fail(400, {\n" +
		"        error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)} MB. Max is 2 MB.`\n" +
		"      });\n" +
		"    }\n" +
		"\n" +
		"    // 3. Validate MIME type\n" +
		"    if (!ALLOWED_TYPES.includes(file.type)) {\n" +
		"      return fail(400, {\n" +
		"        error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(', ')}`\n" +
		"      });\n" +
		"    }\n" +
		"\n" +
		"    // 4. Read the file bytes\n" +
		"    const buffer = Buffer.from(await file.arrayBuffer());\n" +
		"\n" +
		"    // 5. Process the file (save to disk, upload to S3, etc.)\n" +
		"    // For a real app, you'd do something like:\n" +
		"    // await writeFile(`./uploads/${sanitize(file.name)}`, buffer);\n" +
		"    // or: await s3.upload({ Bucket: 'my-bucket', Key: file.name, Body: buffer });\n" +
		"\n" +
		"    // 6. Return success metadata (NOT the file bytes)\n" +
		"    return {\n" +
		"      success: true,\n" +
		"      filename: file.name,\n" +
		"      size: file.size,\n" +
		"      type: file.type\n" +
		"    };\n" +
		"  }\n" +
		"};";

	const exampleServerProcessing =
		"// Advanced server processing patterns\n" +
		"import { writeFile } from 'node:fs/promises';\n" +
		"import { join } from 'node:path';\n" +
		"import crypto from 'node:crypto';\n" +
		"\n" +
		"// Pattern 1: Save to disk with sanitized filename\n" +
		"function sanitizeFilename(name: string): string {\n" +
		"  // Remove path separators to prevent path traversal\n" +
		"  return name\n" +
		"    .replace(/[/\\\\]/g, '')\n" +
		"    .replace(/\\.\\.+/g, '.')\n" +
		"    .replace(/[^a-zA-Z0-9._-]/g, '_');\n" +
		"}\n" +
		"\n" +
		"async function saveToLocal(file: File): Promise<string> {\n" +
		"  const buffer = Buffer.from(await file.arrayBuffer());\n" +
		"  // Use a hash as filename to prevent collisions\n" +
		"  const hash = crypto.createHash('sha256')\n" +
		"    .update(buffer).digest('hex').slice(0, 16);\n" +
		"  const ext = file.name.split('.').pop() || 'bin';\n" +
		"  const filename = `${hash}.${ext}`;\n" +
		"  const path = join('static', 'uploads', filename);\n" +
		"  await writeFile(path, buffer);\n" +
		"  return `/uploads/${filename}`;\n" +
		"}\n" +
		"\n" +
		"// Pattern 2: Presigned URL upload (S3 pattern)\n" +
		"// Client uploads directly to S3, skipping your server.\n" +
		"// Step 1: Server generates a presigned PUT URL\n" +
		"// Step 2: Client uploads directly to S3 using that URL\n" +
		"// Step 3: Client tells server the upload is complete\n" +
		"//\n" +
		"// Benefits: no server memory/bandwidth, scales to any file size.\n" +
		"// Trade-off: more complex flow, need CORS on the bucket.";

	const exampleDragDrop =
		"\u003cscript lang=\"ts\">\n" +
		"  let dragOver = $state(false);\n" +
		"  let droppedFiles: File[] = $state([]);\n" +
		"\n" +
		"  function handleDragOver(e: DragEvent) {\n" +
		"    e.preventDefault(); // Required to allow drop\n" +
		"    dragOver = true;\n" +
		"  }\n" +
		"\n" +
		"  function handleDragLeave() {\n" +
		"    dragOver = false;\n" +
		"  }\n" +
		"\n" +
		"  function handleDrop(e: DragEvent) {\n" +
		"    e.preventDefault();\n" +
		"    dragOver = false;\n" +
		"\n" +
		"    if (e.dataTransfer?.files) {\n" +
		"      droppedFiles = Array.from(e.dataTransfer.files);\n" +
		"    }\n" +
		"  }\n" +
		"\u003c/script>\n" +
		"\n" +
		"<!-- Drop zone -->\n" +
		"<div\n" +
		"  class=\"drop-zone\"\n" +
		"  class:active={dragOver}\n" +
		"  role=\"button\"\n" +
		"  tabindex=\"0\"\n" +
		"  ondragover={handleDragOver}\n" +
		"  ondragleave={handleDragLeave}\n" +
		"  ondrop={handleDrop}\n" +
		">\n" +
		"  {#if droppedFiles.length}\n" +
		"    {#each droppedFiles as file}\n" +
		"      <p>{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>\n" +
		"    {/each}\n" +
		"  {:else}\n" +
		"    <p>Drag files here, or click to browse</p>\n" +
		"  {/if}\n" +
		"</div>\n" +
		"\n" +
		"<style>\n" +
		"  .drop-zone {\n" +
		"    border: 2px dashed var(--color-border);\n" +
		"    border-radius: var(--radius-lg);\n" +
		"    padding: var(--space-2xl);\n" +
		"    text-align: center;\n" +
		"    transition: border-color 0.2s, background 0.2s;\n" +
		"    cursor: pointer;\n" +
		"  }\n" +
		"  .drop-zone.active {\n" +
		"    border-color: var(--color-brand);\n" +
		"    background: oklch(from var(--color-brand) l c h / 0.05);\n" +
		"  }\n" +
		"</style>";

	const exampleSecurity =
		"// Security checklist for file uploads\n" +
		"\n" +
		"// 1. NEVER trust client-side validation alone\n" +
		"// The accept attribute is a UI hint, not a security boundary.\n" +
		"// Users can bypass it with curl, Postman, or browser DevTools.\n" +
		"\n" +
		"// 2. Check MIME type on the server\n" +
		"if (!ALLOWED_TYPES.includes(file.type)) {\n" +
		"  return fail(400, { error: 'Invalid file type' });\n" +
		"}\n" +
		"\n" +
		"// 3. Check magic bytes (file signature) for extra safety\n" +
		"const buffer = Buffer.from(await file.arrayBuffer());\n" +
		"const header = buffer.slice(0, 4).toString('hex');\n" +
		"// JPEG: ffd8ff, PNG: 89504e47, WebP: 52494646\n" +
		"const MAGIC = {\n" +
		"  'ffd8ff': 'image/jpeg',\n" +
		"  '89504e47': 'image/png',\n" +
		"  '52494646': 'image/webp'\n" +
		"};\n" +
		"\n" +
		"// 4. Sanitize filenames — NEVER use file.name directly in a path\n" +
		"// A filename like '../../../etc/passwd' could cause path traversal.\n" +
		"const safeName = file.name\n" +
		"  .replace(/[/\\\\]/g, '') // remove path separators\n" +
		"  .replace(/\\.\\.+/g, '.'); // remove directory traversal\n" +
		"\n" +
		"// 5. Limit file size on the server\n" +
		"// Don't rely on the client's Content-Length header.\n" +
		"// Read into a buffer and check buffer.length.\n" +
		"if (buffer.length > MAX_SIZE) {\n" +
		"  return fail(400, { error: 'File too large' });\n" +
		"}\n" +
		"\n" +
		"// 6. Use unique filenames (hash or UUID) to prevent overwrites\n" +
		"// 7. Store uploads outside the static directory in production\n" +
		"// 8. Scan for malware if accepting uploads from untrusted users";

	const exampleEnhanceProgress =
		"\u003cscript lang=\"ts\">\n" +
		"  import { enhance } from '$app/forms';\n" +
		"  import type { ActionData } from './$types';\n" +
		"\n" +
		"  let { form }: { form: ActionData } = $props();\n" +
		"  let uploading = $state(false);\n" +
		"  let selectedFiles: FileList | null = $state(null);\n" +
		"\n" +
		"  function formatBytes(n: number): string {\n" +
		"    if (n < 1024) return `${n} B`;\n" +
		"    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;\n" +
		"    return `${(n / 1024 / 1024).toFixed(2)} MB`;\n" +
		"  }\n" +
		"\u003c/script>\n" +
		"\n" +
		"<form\n" +
		"  method=\"POST\"\n" +
		"  enctype=\"multipart/form-data\"\n" +
		"  use:enhance={() => {\n" +
		"    uploading = true;\n" +
		"    return async ({ update }) => {\n" +
		"      await update();\n" +
		"      uploading = false;\n" +
		"    };\n" +
		"  }}\n" +
		">\n" +
		"  <label class=\"field\">\n" +
		"    <span>Choose a file</span>\n" +
		"    <input type=\"file\" name=\"document\"\n" +
		"      bind:files={selectedFiles}\n" +
		"      accept=\"image/*,.pdf\" />\n" +
		"  </label>\n" +
		"\n" +
		"  <!-- Show file info before uploading -->\n" +
		"  {#if selectedFiles?.[0]}\n" +
		"    <p>\n" +
		"      {selectedFiles[0].name} — {formatBytes(selectedFiles[0].size)}\n" +
		"    </p>\n" +
		"  {/if}\n" +
		"\n" +
		"  <button type=\"submit\" disabled={uploading || !selectedFiles?.[0]}>\n" +
		"    {uploading ? 'Uploading...' : 'Upload'}\n" +
		"  </button>\n" +
		"</form>\n" +
		"\n" +
		"<!-- Success state -->\n" +
		"{#if form?.success}\n" +
		"  <div class=\"success\">\n" +
		"    File uploaded successfully: {form.filename}\n" +
		"  </div>\n" +
		"{/if}";


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"  let selectedFiles: FileList | null = $state(null);\n" +
		"  let previewUrl = $state('');\n" +
		"  let dragOver = $state(false);\n" +
		"  let droppedFileName = $state('');\n" +
		"\n" +
		"  function formatBytes(n: number): string {\n" +
		"    if (n < 1024) return `${n} B`;\n" +
		"    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;\n" +
		"    return `${(n / 1024 / 1024).toFixed(2)} MB`;\n" +
		"  }\n" +
		"\n" +
		"  function handleFileSelect() {\n" +
		"    if (selectedFiles && selectedFiles.length > 0) {\n" +
		"      const file = selectedFiles[0];\n" +
		"      if (file.type.startsWith('image/')) {\n" +
		"        previewUrl = URL.createObjectURL(file);\n" +
		"      } else {\n" +
		"        previewUrl = '';\n" +
		"      }\n" +
		"    }\n" +
		"  }\n" +
		"\n" +
		"  function handleDrop(e: DragEvent) {\n" +
		"    dragOver = false;\n" +
		"    if (e.dataTransfer?.files.length) {\n" +
		"      droppedFileName = e.dataTransfer.files[0].name;\n" +
		"    }\n" +
		"  }\n" +
		"\u003c/script>\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>10.10 — File Uploads</h1>\n" +
		"  <p class=\"prose\">A comprehensive guide to file uploads in SvelteKit.</p>\n" +
		"\n" +
		"  <h2>Section 1 — HTML file input</h2>\n" +
		"  <p class=\"prose\">bind:files for reactive FileList.</p>\n" +
		"\n" +
		"  <h2>Section 2 — Form actions</h2>\n" +
		"  <p class=\"prose\">enctype multipart/form-data.</p>\n" +
		"\n" +
		"  <h2>Section 3 — Server processing</h2>\n" +
		"  <p class=\"prose\">Save to disk or S3.</p>\n" +
		"\n" +
		"  <h2>Section 4 — Progress and UX</h2>\n" +
		"  <p class=\"prose\">Drag and drop, previews.</p>\n" +
		"\n" +
		"  <h2>Section 5 — Security</h2>\n" +
		"  <p class=\"prose\">Sanitize filenames, check magic bytes.</p>\n" +
		"</section>";
</script>

<section class="page">
	<h1>10.10 — File Uploads</h1>

	<p class="prose">
		File uploads are one of the most common features in real web applications — profile
		photos, document attachments, CSV imports, image galleries. SvelteKit handles them
		through the same form action system you already know, with one critical addition:
		<code>enctype="multipart/form-data"</code>. This lesson covers everything from the
		HTML file input to server-side security, including patterns you will use in
		production every day.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 1 — HTML FILE INPUT
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 1 — HTML file input</h2>

	<p class="prose">
		The <code>&lt;input type="file"&gt;</code> element is the browser's native file picker.
		In Svelte, you can bind its <code>files</code> property to a reactive variable using
		<code>bind:files</code>, giving you a reactive <code>FileList</code> that updates
		whenever the user selects files. Each <code>File</code> object in the list has
		<code>.name</code>, <code>.size</code>, <code>.type</code>, and
		<code>.arrayBuffer()</code> — everything you need to validate and preview files
		before uploading.
	</p>

	<div class="build">
		<CodeCanvas filename="+page.svelte" code={exampleFileInput} />
	</div>

	<div class="build">
		<h3>Live demo — file selection and preview</h3>
		<p class="note">
			Select an image file below. The component uses <code>URL.createObjectURL()</code>
			to generate a local preview URL without uploading anything.
		</p>
		<label class="field">
			<span>Choose an image</span>
			<input
				type="file"
				accept="image/*"
				bind:files={selectedFiles}
				onchange={handleFileSelect}
			/>
		</label>

		{#if selectedFiles && selectedFiles.length > 0}
			<div class="meta">
				<dl>
					<dt>Name</dt><dd>{selectedFiles[0].name}</dd>
					<dt>Size</dt><dd>{formatBytes(selectedFiles[0].size)}</dd>
					<dt>Type</dt><dd><code>{selectedFiles[0].type}</code></dd>
				</dl>
			</div>
		{/if}

		{#if previewUrl}
			<div class="preview-container">
				<img src={previewUrl} alt="Preview of selected file" width="300" height="200" />
			</div>
		{/if}
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 2 — SUBMITTING VIA FORM ACTIONS
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 2 — Submitting via form actions</h2>

	<p class="prose">
		To send a file to the server, you need a <code>&lt;form&gt;</code> with two critical
		attributes: <code>method="POST"</code> and <code>enctype="multipart/form-data"</code>.
		Without the <code>enctype</code>, the browser sends the <em>filename as a string</em>
		instead of the actual file bytes — this is the single most common file upload bug
		and the first "break it on purpose" experiment below.
	</p>

	<div class="build">
		<h3>Client-side form</h3>
		<CodeCanvas filename="+page.svelte" code={exampleFormAction} />
	</div>

	<div class="build">
		<h3>Server-side action</h3>
		<CodeCanvas filename="+page.server.ts" code={exampleServerAction} />
		<div class="key-point">
			<strong>Key pattern:</strong> The server action receives the file via
			<code>data.get('avatar')</code>. If <code>enctype</code> is correct, this returns
			a <code>File</code> object. Always check <code>instanceof File</code> before
			accessing file properties — if the enctype is wrong or the field is empty, you
			get a string or null instead.
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 3 — PROCESSING ON THE SERVER
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 3 — Processing on the server</h2>

	<p class="prose">
		Once you have the <code>File</code> object on the server, you need to do something
		with it: save to disk, upload to cloud storage, or stream to a processing pipeline.
		The file's bytes are accessed via <code>await file.arrayBuffer()</code>, which returns
		an <code>ArrayBuffer</code> you can convert to a Node.js <code>Buffer</code> for
		file system operations.
	</p>

	<div class="build">
		<CodeCanvas filename="upload-utils.ts" code={exampleServerProcessing} />
		<div class="key-point">
			<strong>Production recommendation:</strong> For most applications, use the
			presigned URL pattern. Your server generates a short-lived upload URL pointing
			directly to S3/GCS/R2, and the client uploads the file there without your server
			ever touching the bytes. This eliminates server memory pressure and scales to
			arbitrarily large files.
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 4 — PROGRESS AND UX
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 4 — Progress and UX</h2>

	<p class="prose">
		A good file upload experience shows the user what's happening at every step: the
		file name and size before upload, a loading state during submission, and a success
		or error state after. SvelteKit's <code>use:enhance</code> handles the submission
		in the background while keeping the form accessible and progressively enhanced.
	</p>

	<div class="build">
		<h3>Enhanced upload with file info and loading state</h3>
		<CodeCanvas filename="+page.svelte" code={exampleEnhanceProgress} />
	</div>

	<div class="build">
		<h3>Drag and drop zone</h3>
		<p class="note">
			A drag-and-drop zone provides a more natural upload experience on desktop.
			The pattern uses three DOM events: <code>ondragover</code> (must call
			<code>preventDefault()</code> to allow the drop), <code>ondragleave</code>
			(reset the visual state), and <code>ondrop</code> (receive the files).
		</p>
		<CodeCanvas filename="+page.svelte" code={exampleDragDrop} />
	</div>

	<div class="build">
		<h3>Live demo — drop zone</h3>
		<div
			class="drop-zone"
			class:active={dragOver}
			role="button"
			tabindex="0"
			ondragover={(e) => { e.preventDefault(); dragOver = true; }}
			ondragleave={() => { dragOver = false; }}
			ondrop={(e) => { e.preventDefault(); handleDrop(e); }}
		>
			{#if droppedFileName}
				<p class="dropped-name">Dropped: {droppedFileName}</p>
			{:else}
				<p>Drag a file here to see the drop zone in action</p>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 5 — SECURITY
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 5 — Security</h2>

	<p class="prose">
		File uploads are one of the most dangerous features in any web application if not
		handled carefully. The <code>accept</code> attribute on <code>&lt;input type="file"&gt;</code>
		is a UI hint — it filters the file picker dialog but provides <strong>zero</strong>
		security. A user can bypass it trivially with curl, Postman, or even browser DevTools.
		All validation must happen on the server, and you must assume every upload is
		potentially malicious.
	</p>

	<div class="build">
		<CodeCanvas filename="security.ts" code={exampleSecurity} />
		<h3>The security checklist</h3>
		<ol>
			<li><strong>Never trust client-side validation alone.</strong> The <code>accept</code>
				attribute and JavaScript checks are UX improvements, not security boundaries.
				Duplicate every check on the server.</li>
			<li><strong>Check MIME type on the server.</strong> Validate <code>file.type</code>
				against an allow-list. But don't stop there — MIME types can be spoofed.</li>
			<li><strong>Check magic bytes for critical uploads.</strong> The first few bytes of a
				file reveal its true format. JPEG starts with <code>ff d8 ff</code>, PNG with
				<code>89 50 4e 47</code>. This is harder to fake than a MIME type header.</li>
			<li><strong>Sanitize filenames.</strong> Never use <code>file.name</code> directly
				in a file path. A filename like <code>../../../etc/passwd</code> could cause
				path traversal. Strip path separators, remove <code>..</code>, or better yet,
				generate your own filename with a hash or UUID.</li>
			<li><strong>Limit file size on the server.</strong> Don't trust the
				<code>Content-Length</code> header. Read the bytes and check the actual
				buffer length. Set a hard limit (e.g., 2 MB for avatars, 10 MB for documents).</li>
			<li><strong>Use unique filenames</strong> to prevent one user's upload from
				overwriting another's.</li>
			<li><strong>Store uploads outside the static directory</strong> in production,
				behind an authenticated route or a CDN with signed URLs.</li>
		</ol>
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     BREAK IT ON PURPOSE
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>enctype="multipart/form-data"</code> from the form.</strong> Submit a file and check the server action. Instead of a <code>File</code> object with <code>.name</code>, <code>.size</code>, and <code>.arrayBuffer()</code>, <code>formData.get('avatar')</code> returns the string <code>"[object File]"</code> or the filename as plain text. The <code>instanceof File</code> check fails, and no file bytes are transmitted. This is the most common file upload bug — the form silently sends garbage data instead of the file.</li>
		<li><strong>Remove the server-side size limit and upload a 100 MB file.</strong> Without a size check, the server reads the entire file into memory via <code>file.arrayBuffer()</code>. On a server with limited RAM (common in serverless/edge deployments), this can cause an out-of-memory crash. In production, always enforce a max size on the server — the client's <code>accept</code> attribute and JavaScript checks are trivially bypassed.</li>
		<li><strong>Trust <code>file.type</code> without server validation — rename a <code>.exe</code> to <code>.jpg</code> and upload it.</strong> The browser may report the MIME type as <code>image/jpeg</code> based on the file extension, but the actual bytes are an executable. Only a magic-byte check on the server would catch this. In a real application, serving this file back to other users could be a security vulnerability.</li>
		<li><strong>Use <code>file.name</code> directly in a file path: <code>writeFile('./uploads/' + file.name, ...)</code>.</strong> If a user sends a file named <code>../../.env</code>, the path resolves to <code>./uploads/../../.env</code>, potentially overwriting your environment file. This is a path traversal attack. Always sanitize filenames by stripping path separators and <code>..</code> sequences, or generate unique filenames using hashes or UUIDs.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>


	<!-- ═══════════════════════════════════════════════════════════════════
	     WHAT YOU LEARNED
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>What you learned</h2>

	<p class="prose">
		File uploads in SvelteKit build on the same form action system as any other
		mutation, with one essential addition: <code>enctype="multipart/form-data"</code>
		on the <code>&lt;form&gt;</code> element. Without it, the browser URL-encodes the
		form and sends filenames as strings instead of file bytes. On the server,
		<code>request.formData()</code> gives you real <code>File</code> objects with
		<code>.name</code>, <code>.size</code>, <code>.type</code>, and
		<code>.arrayBuffer()</code> — the same Web API you know from the browser, running
		on Node.js. Svelte's <code>bind:files</code> makes the client-side experience
		reactive, and <code>URL.createObjectURL()</code> enables instant previews without
		touching the network.
	</p>

	<p class="prose">
		Server-side security is non-negotiable for file uploads. Every validation you
		perform on the client (the <code>accept</code> attribute, JavaScript size checks)
		must be duplicated on the server because client-side controls are trivially
		bypassed. The server must enforce a maximum file size, validate the MIME type
		against an allow-list, and ideally check magic bytes to detect disguised files.
		Filenames must be sanitized to prevent path traversal attacks — never use
		<code>file.name</code> directly in a file system path. Use hashed or UUID-based
		filenames to prevent collisions and overwrites.
	</p>

	<p class="prose">
		For production applications, the presigned URL pattern is the gold standard: your
		server generates a short-lived upload URL pointing directly to cloud storage
		(S3, GCS, R2), and the client uploads the file there without your server ever
		touching the bytes. This eliminates server memory pressure, avoids upload size
		limits on your application server, and scales to files of any size.
		<code>use:enhance</code> keeps the upload experience smooth with a pending spinner
		while maintaining progressive enhancement — the same action code handles both
		JavaScript-enhanced uploads and traditional full-page form submissions.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-10/project">Module 10 Project</a> — build a complete API with
		form actions, validation, and authentication.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		font-style: italic;
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

	.key-point {
		background: var(--color-surface-2);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text);
		line-height: 1.5;

		& strong { color: var(--color-brand); }
		& code { font-size: 0.85em; }
	}

	/* ── Form fields ── */
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
		background: var(--color-surface);
		color: var(--color-text);
	}

	.field input:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}

	/* ── Metadata ── */
	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--space-xs) var(--space-md);
		margin: 0;
		font-size: var(--text-sm);
	}

	dt { color: var(--color-text-muted); font-weight: 600; }
	dd { color: var(--color-text); margin: 0; word-break: break-all; }

	/* ── Preview ── */
	.preview-container {
		max-inline-size: 300px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.preview-container img {
		display: block;
		inline-size: 100%;
		block-size: auto;
		object-fit: cover;
	}

	/* ── Drop zone ── */
	.drop-zone {
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-2xl);
		text-align: center;
		transition: border-color 0.2s, background 0.2s;
		cursor: pointer;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.drop-zone.active {
		border-color: var(--color-brand);
		background: var(--color-surface-2);
	}

	.drop-zone p { margin: 0; }

	.dropped-name {
		color: var(--color-brand);
		font-weight: 600;
	}

	/* ── Experiments ── */
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	/* ── Having issues ── */
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.meta dl { grid-template-columns: max-content 1fr; }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.preview-container { max-inline-size: 400px; }
	}
</style>
