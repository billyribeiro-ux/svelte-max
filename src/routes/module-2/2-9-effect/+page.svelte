<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let siteName = $state('svelte-max');
	let pageTopic = $state('Reactivity');
	let unread = $state(0);

	const title = $derived(
		unread > 0 ? `(${unread}) ${pageTopic} — ${siteName}` : `${pageTopic} — ${siteName}`
	);

	// $inspect — dev-only reactive value logging to see effect tracking
	$inspect(title);

	$effect(() => {
		document.title = title;
	});

	function increment() {
		unread += 1;
	}

	function decrement() {
		if (unread > 0) unread -= 1;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let siteName = $state('svelte-max');\n" +
		"\tlet pageTopic = $state('Reactivity');\n" +
		"\tlet unread = $state(0);\n" +
		"\n" +
		"\tconst title = $derived(\n" +
		"\t\tunread \u003e 0 ? `(${unread}) ${pageTopic} — ${siteName}` : `${pageTopic} — ${siteName}`\n" +
		"\t);\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tdocument.title = title;\n" +
		"\t});\n" +
		"\n" +
		"\tfunction increment() {\n" +
		"\t\tunread += 1;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction decrement() {\n" +
		"\t\tif (unread \u003e 0) unread -= 1;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.9 — $effect\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tA side effect is anything that affects the world outside the component's reactive graph —\n" +
		"\t\twriting to \u003ccode\u003edocument.title\u003c/code\u003e, saving to localStorage, making a fetch call, even a\n" +
		"\t\t\u003ccode\u003econsole.log\u003c/code\u003e. The \u003ccode\u003e$effect(() =&gt; &#123; ... &#125;)\u003c/code\u003e rune runs after the\n" +
		"\t\tDOM updates and re-runs whenever any reactive value \u003cem\u003eread\u003c/em\u003e inside it changes. Svelte tracks\n" +
		"\t\tthose dependencies automatically — you never declare them. Crucially, \u003ccode\u003e$effect\u003c/code\u003e only runs\n" +
		"\t\tin the browser, never during SSR, which is why it's safe to touch \u003ccode\u003edocument\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003ewindow\u003c/code\u003e, and friends in here. Three rules keep you out of trouble: use\n" +
		"\t\t\u003ccode\u003e$derived\u003c/code\u003e for computed values, use \u003ccode\u003e$effect\u003c/code\u003e for side effects, and never write\n" +
		"\t\tto state inside an effect — that's an infinite loop.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eLook at your browser tab title as you type below — it updates live.\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003eSite name\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"text\" bind:value={siteName} /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003ePage topic\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"text\" bind:value={pageTopic} /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"unread\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"unread-label\"\u003eUnread\u003c/span\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"unread-row\"\u003e\n" +
		"\t\t\t\t\t\u003cbutton type=\"button\" onclick={decrement} aria-label=\"Decrease unread\"\u003e−\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"number\" bind:value={unread} min=\"0\" /\u003e\n" +
		"\t\t\t\t\t\u003cbutton type=\"button\" onclick={increment} aria-label=\"Increase unread\"\u003e+\u003c/button\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"preview\"\u003e\n" +
		"\t\t\t\u003cspan class=\"preview-label\"\u003edocument.title\u003c/span\u003e\n" +
		"\t\t\t\u003cpre\u003e{title}\u003c/pre\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e runs after the DOM updates and re-runs when its reactive reads change.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDependencies are tracked automatically — you never list them.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eEffects are the right place for \u003ccode\u003edocument\u003c/code\u003e, \u003ccode\u003ewindow\u003c/code\u003e, fetch, and logging.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e is browser-only, so it's SSR-safe.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eNever assign to state inside an effect — use \u003ccode\u003e$derived\u003c/code\u003e instead.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.9 — $effect</h1>

	<p class="concept">
		A side effect is anything that affects the world outside the component's reactive graph —
		writing to <code>document.title</code>, saving to localStorage, making a fetch call, even a
		<code>console.log</code>. The <code>$effect(() =&gt; &#123; ... &#125;)</code> rune runs after the
		DOM updates and re-runs whenever any reactive value <em>read</em> inside it changes. Svelte tracks
		those dependencies automatically — you never declare them. Crucially, <code>$effect</code> only runs
		in the browser, never during SSR, which is why it's safe to touch <code>document</code>,
		<code>window</code>, and friends in here. Three rules keep you out of trouble: use
		<code>$derived</code> for computed values, use <code>$effect</code> for side effects, and never write
		to state inside an effect — that's an infinite loop.
	</p>

	<div class="demo">
		<p class="hint">Look at your browser tab title as you type below — it updates live.</p>

		<div class="controls">
			<label>
				<span>Site name</span>
				<input type="text" bind:value={siteName} />
			</label>

			<label>
				<span>Page topic</span>
				<input type="text" bind:value={pageTopic} />
			</label>

			<div class="unread">
				<span class="unread-label">Unread</span>
				<div class="unread-row">
					<button type="button" onclick={decrement} aria-label="Decrease unread">−</button>
					<input type="number" bind:value={unread} min="0" />
					<button type="button" onclick={increment} aria-label="Increase unread">+</button>
				</div>
			</div>
		</div>

		<div class="preview">
			<span class="preview-label">document.title</span>
			<pre>{title}</pre>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>$effect</code> runs after the DOM updates and re-runs when its reactive reads change.</li>
		<li>Dependencies are tracked automatically — you never list them.</li>
		<li>Effects are the right place for <code>document</code>, <code>window</code>, fetch, and logging.</li>
		<li><code>$effect</code> is browser-only, so it's SSR-safe.</li>
		<li>Never assign to state inside an effect — use <code>$derived</code> instead.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 56rem;
		margin-inline: auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
	}

	input[type='text'],
	input[type='number'] {
		font: inherit;
		font-family: var(--font-mono);
		padding: var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	input:focus {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}

	.unread {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.unread-label {
		font-size: var(--text-sm);
	}

	.unread-row {
		display: flex;
		gap: var(--space-sm);
		align-items: center;
	}

	.unread-row input {
		inline-size: 6rem;
		text-align: center;
	}

	button {
		font: inherit;
		inline-size: 2.5rem;
		block-size: 2.5rem;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}

	button:hover {
		background: var(--color-brand-dim);
	}

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
	}

	.preview-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	pre {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-brand);
		overflow-x: auto;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.controls {
			flex-direction: row;
			align-items: flex-end;
		}

		label {
			flex: 1;
		}
	}

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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
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
