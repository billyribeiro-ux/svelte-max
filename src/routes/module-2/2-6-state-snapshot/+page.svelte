<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Contact {
		name: string;
		email: string;
		topic: 'bug' | 'feature' | 'help';
		message: string;
	}

	let form = $state<Contact>({
		name: '',
		email: '',
		topic: 'help',
		message: ''
	});

	let snapshot = $state<Contact | null>(null);
	let submitted = $state<boolean>(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function preview(): void {
		const payload = $state.snapshot(form);
		console.log('payload:', payload);
		snapshot = payload;
	}

	function submit(): void {
		const payload = $state.snapshot(form);
		console.log('submit:', payload);
		submitted = true;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			submitted = false;
		}, 2000);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Contact {\n" +
		"\t\tname: string;\n" +
		"\t\temail: string;\n" +
		"\t\ttopic: 'bug' | 'feature' | 'help';\n" +
		"\t\tmessage: string;\n" +
		"\t}\n" +
		"\n" +
		"\tlet form = $state\u003cContact\u003e({\n" +
		"\t\tname: '',\n" +
		"\t\temail: '',\n" +
		"\t\ttopic: 'help',\n" +
		"\t\tmessage: ''\n" +
		"\t});\n" +
		"\n" +
		"\tlet snapshot = $state\u003cContact | null\u003e(null);\n" +
		"\tlet submitted = $state\u003cboolean\u003e(false);\n" +
		"\tlet timer: ReturnType\u003ctypeof setTimeout\u003e | null = null;\n" +
		"\n" +
		"\tfunction preview(): void {\n" +
		"\t\tconst payload = $state.snapshot(form);\n" +
		"\t\tconsole.log('payload:', payload);\n" +
		"\t\tsnapshot = payload;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction submit(): void {\n" +
		"\t\tconst payload = $state.snapshot(form);\n" +
		"\t\tconsole.log('submit:', payload);\n" +
		"\t\tsubmitted = true;\n" +
		"\t\tif (timer) clearTimeout(timer);\n" +
		"\t\ttimer = setTimeout(() =\u003e {\n" +
		"\t\t\tsubmitted = false;\n" +
		"\t\t}, 2000);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.6 — $state.snapshot\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tReactive state in Svelte 5 is backed by a Proxy so every read and write can be tracked. That\n" +
		"\t\tProxy is an implementation detail most code never sees — but the moment you try to\n" +
		"\t\t\u003ccode\u003eJSON.stringify\u003c/code\u003e state, hand it to a fetch body, structurally clone it, or compare it\n" +
		"\t\tagainst a previous value, the wrapper can confuse downstream code. \u003ccode\u003e$state.snapshot(value)\u003c/code\u003e\n" +
		"\t\treturns a deep plain-object copy with every Proxy stripped away. You usually don't need it, but\n" +
		"\t\tyou'll reach for it in three specific situations: logging for debugging, submitting to an API,\n" +
		"\t\tand diffing against a previous value.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cform class=\"form\" onsubmit={(e) =\u003e e.preventDefault()}\u003e\n" +
		"\t\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\t\u003cspan\u003eName\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"text\" bind:value={form.name} placeholder=\"Ada Lovelace\" /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\t\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"email\" bind:value={form.email} placeholder=\"ada@example.com\" /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\t\u003cfieldset class=\"field radios\"\u003e\n" +
		"\t\t\t\t\u003clegend\u003eTopic\u003c/legend\u003e\n" +
		"\t\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"radio\" bind:group={form.topic} value=\"bug\" /\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003eBug\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"radio\" bind:group={form.topic} value=\"feature\" /\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003eFeature\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"radio\" bind:group={form.topic} value=\"help\" /\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003eHelp\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003c/fieldset\u003e\n" +
		"\n" +
		"\t\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\t\u003cspan\u003eMessage\u003c/span\u003e\n" +
		"\t\t\t\t\u003ctextarea rows=\"4\" bind:value={form.message} placeholder=\"Tell us what's on your mind...\"\u003e\u003c/textarea\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"actions\"\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"ghost\" onclick={preview}\u003ePreview payload\u003c/button\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"primary\" onclick={submit}\u003eSubmit (pretend)\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\t{#if submitted}\n" +
		"\t\t\t\t\u003cp class=\"success\" role=\"status\"\u003eThanks — we received your message.\u003c/p\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/form\u003e\n" +
		"\n" +
		"\t\t{#if snapshot}\n" +
		"\t\t\t\u003cdiv class=\"snapshot\"\u003e\n" +
		"\t\t\t\t\u003ch4\u003eSnapshot payload\u003c/h4\u003e\n" +
		"\t\t\t\t\u003cpre\u003e{JSON.stringify(snapshot, null, 2)}\u003c/pre\u003e\n" +
		"\t\t\t\t\u003cp class=\"note\"\u003eNotice: plain object. No \u003ccode\u003eProxy(...)\u003c/code\u003e wrapper anywhere.\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$state.snapshot\u003c/code\u003e returns a deep, plain-object clone of reactive state.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse it before serializing, logging, or sending state across a network boundary.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThe snapshot is a one-shot copy — it does not stay in sync with the source.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eMost application code never needs it; reach for it at integration boundaries.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.6 — $state.snapshot</h1>

	<p class="concept">
		Reactive state in Svelte 5 is backed by a Proxy so every read and write can be tracked. That
		Proxy is an implementation detail most code never sees — but the moment you try to
		<code>JSON.stringify</code> state, hand it to a fetch body, structurally clone it, or compare it
		against a previous value, the wrapper can confuse downstream code. <code>$state.snapshot(value)</code>
		returns a deep plain-object copy with every Proxy stripped away. You usually don't need it, but
		you'll reach for it in three specific situations: logging for debugging, submitting to an API,
		and diffing against a previous value.
	</p>

	<div class="build">
		<form class="form" onsubmit={(e) => e.preventDefault()}>
			<label class="field">
				<span>Name</span>
				<input type="text" bind:value={form.name} placeholder="Ada Lovelace" />
			</label>

			<label class="field">
				<span>Email</span>
				<input type="email" bind:value={form.email} placeholder="ada@example.com" />
			</label>

			<fieldset class="field radios">
				<legend>Topic</legend>
				<label>
					<input type="radio" bind:group={form.topic} value="bug" />
					<span>Bug</span>
				</label>
				<label>
					<input type="radio" bind:group={form.topic} value="feature" />
					<span>Feature</span>
				</label>
				<label>
					<input type="radio" bind:group={form.topic} value="help" />
					<span>Help</span>
				</label>
			</fieldset>

			<label class="field">
				<span>Message</span>
				<textarea rows="4" bind:value={form.message} placeholder="Tell us what's on your mind..."></textarea>
			</label>

			<div class="actions">
				<button type="button" class="ghost" onclick={preview}>Preview payload</button>
				<button type="button" class="primary" onclick={submit}>Submit (pretend)</button>
			</div>

			{#if submitted}
				<p class="success" role="status">Thanks — we received your message.</p>
			{/if}
		</form>

		{#if snapshot}
			<div class="snapshot">
				<h4>Snapshot payload</h4>
				<pre>{JSON.stringify(snapshot, null, 2)}</pre>
				<p class="note">Notice: plain object. No <code>Proxy(...)</code> wrapper anywhere.</p>
			</div>
		{/if}
	</div>

	<h2>Break it on purpose</h2>

	<p class="prose">
		Try these experiments to understand exactly when you need <code>$state.snapshot</code> and what happens when you skip it.
	</p>

	<ol class="experiments">
		<li>
			<strong>Pass a <code>$state</code> proxy to <code>JSON.stringify</code>.</strong>
			Try <code>console.log(JSON.stringify(form))</code> directly. It works in most cases
			because <code>JSON.stringify</code> reads properties through the proxy. However, some
			devtools display the Proxy wrapper in the console, and structured-clone algorithms may
			behave unexpectedly with proxied objects.
		</li>
		<li>
			<strong>Pass a <code>$state</code> proxy to a third-party library that checks <code>typeof</code>.</strong>
			Some libraries perform identity checks or use <code>Object.getPrototypeOf</code> and
			may see unexpected behavior with a Proxy. The proxy is transparent for most operations,
			but edge cases exist in serialization libraries, deep-equality checkers, and immutability
			utilities.
		</li>
		<li>
			<strong>Take a snapshot and mutate IT.</strong> Call
			<code>const snap = $state.snapshot(form); snap.name = 'changed'</code>. The original
			<code>form</code> state is completely unaffected because the snapshot is a deep clone.
			It has no connection back to the reactive source — mutations to the clone are invisible
			to Svelte.
		</li>
		<li>
			<strong>Compare <code>$state.snapshot(a) === a</code>.</strong> This is always
			<code>false</code> because snapshot creates a brand-new plain object. It is not the
			same reference — it is a deep copy with all Proxy wrappers stripped away. Use deep
			equality checks if you need to compare snapshots.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		<code>$state.snapshot(value)</code> creates a plain JavaScript clone of reactive state
		with every Proxy wrapper stripped away. The result is a regular object (or array, or
		primitive) that you can safely pass to <code>JSON.stringify</code>, send in a
		<code>fetch</code> body, store in <code>localStorage</code>, or hand to any third-party
		library that expects plain data. It is the escape hatch from Svelte's reactive system.
	</p>

	<p class="prose">
		The snapshot is a point-in-time deep copy. It does not stay in sync with the source
		state — if you take a snapshot and then modify the original, the snapshot still reflects
		the old values. This makes it perfect for "freeze and send" patterns: preview a form
		payload before submitting, log the current state for debugging, or diff the current
		state against a previously saved version.
	</p>

	<p class="prose">
		Most day-to-day Svelte code never needs <code>$state.snapshot</code> because the proxy
		is transparent for reading and rendering. You reach for it specifically at integration
		boundaries — the edges where reactive state meets non-reactive systems like network
		APIs, browser storage, or libraries that perform their own object inspection. If you
		find yourself using it everywhere, that is a sign you may be over-thinking the proxy.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-7-derived">2.7 — $derived</a> — compute values automatically from
		reactive state with zero manual syncing.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	h4 {
		font-size: var(--text-sm);
		margin: 0 0 var(--space-sm) 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
	}

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.build {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.field > span,
	.field > legend {
		font-weight: 600;
		color: var(--color-text);
	}

	input[type='text'],
	input[type='email'],
	textarea {
		font: inherit;
		font-size: var(--text-base);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-text);
		transition: border-color var(--dur-base) var(--ease-out);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-brand);
	}

	textarea {
		resize: vertical;
		font-family: inherit;
	}

	.radios {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.radios label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
		cursor: pointer;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	button {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		cursor: pointer;
		transition: background var(--dur-base) var(--ease-out);
	}

	.ghost {
		background: var(--color-surface-1);
		color: var(--color-text);
	}

	.ghost:hover {
		background: var(--color-surface-2);
	}

	.primary {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}

	.primary:hover {
		background: var(--color-brand-dim);
	}

	.success {
		font-size: var(--text-sm);
		color: var(--color-success);
		margin: 0;
	}

	.snapshot {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	pre {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface-1);
		color: var(--color-text);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		overflow-x: auto;
		margin: 0;
		line-height: 1.5;
	}

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@media (min-inline-size: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.build {
			grid-template-columns: 1fr 1fr;
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
