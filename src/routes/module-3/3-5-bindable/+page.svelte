<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import TextField from '$lib/components/TextField.svelte';

	let name = $state('');
	let email = $state('');

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import TextField from '$lib/components/TextField.svelte';\n" +
		"\n" +
		"\tlet name = $state('');\n" +
		"\tlet email = $state('');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e3.5 — $bindable()\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Props flow down by default. When a child needs to update state that\n" +
		"\t\tlives in the parent, mark the prop with \u003ccode\u003e$bindable()\u003c/code\u003e. The parent then writes\n" +
		"\t\t\u003ccode\u003e&lt;TextField bind:value={'{myState}'} /&gt;\u003c/code\u003e, and any mutation inside\n" +
		"\t\t\u003ccode\u003eTextField\u003c/code\u003e propagates back up. This replaces the dispatch-event-and-handle-it\n" +
		"\t\tdance from Svelte 4. Use \u003ccode\u003e$bindable\u003c/code\u003e sparingly — one-way data flow is still\n" +
		"\t\tclearer when the child doesn't own the state.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cTextField label=\"Your name\" bind:value={name} placeholder=\"Ada Rivera\" /\u003e\n" +
		"\t\t\u003cTextField label=\"Email\" type=\"email\" bind:value={email} placeholder=\"ada@example.com\" /\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"preview\"\u003e\n" +
		"\t\t\t\u003cp\u003eHello, \u003cstrong\u003e{name || 'stranger'}\u003c/strong\u003e!\u003c/p\u003e\n" +
		"\t\t\t\u003cp class=\"muted\"\u003e\n" +
		"\t\t\t\tWe'll reach you at \u003cstrong\u003e{email || 'nowhere yet'}\u003c/strong\u003e.\n" +
		"\t\t\t\u003c/p\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhen to bind vs when to callback\u003c/h3\u003e\n" +
		"\t\u003cdiv class=\"comparison\"\u003e\n" +
		"\t\t\u003cp\u003e\n" +
		"\t\t\t\u003cstrong\u003eBind (\u003ccode\u003e$bindable\u003c/code\u003e):\u003c/strong\u003e When the child IS the editor of the value\n" +
		"\t\t\t(TextField, Select, Slider). The child owns the UI for editing; the parent owns the source of truth.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\t\u003cp\u003e\n" +
		"\t\t\t\u003cstrong\u003eCallback prop:\u003c/strong\u003e When the child NOTIFIES the parent of an event\n" +
		"\t\t\t(Button click, item selection). The child doesn't own the value — it reports what happened.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003ctable class=\"compare-table\"\u003e\n" +
		"\t\t\t\u003cthead\u003e\n" +
		"\t\t\t\t\u003ctr\u003e\n" +
		"\t\t\t\t\t\u003cth\u003ePattern\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eWhen\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eExample\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eModule ref\u003c/th\u003e\n" +
		"\t\t\t\t\u003c/tr\u003e\n" +
		"\t\t\t\u003c/thead\u003e\n" +
		"\t\t\t\u003ctbody\u003e\n" +
		"\t\t\t\t\u003ctr\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003e\u003ccode\u003e$bindable\u003c/code\u003e\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003eChild edits the value\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003eTextField, Slider, Select\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003e3.5\u003c/td\u003e\n" +
		"\t\t\t\t\u003c/tr\u003e\n" +
		"\t\t\t\t\u003ctr\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003eCallback prop\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003eChild reports an event\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003eButton onclick, list onselect\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003ctd\u003e3.3\u003c/td\u003e\n" +
		"\t\t\t\t\u003c/tr\u003e\n" +
		"\t\t\t\u003c/tbody\u003e\n" +
		"\t\t\u003c/table\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$bindable()\u003c/code\u003e lets a child write back to a parent-owned piece of state.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThe parent opts in with \u003ccode\u003ebind:value={'{state}'}\u003c/code\u003e at the call site.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eNo dispatchers, no \u003ccode\u003eon:change\u003c/code\u003e + setter pairs — it just flows.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003ePrefer one-way props when the child is purely presentational.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>3.5 — $bindable()</h1>
	<p class="concept">
		<strong>Concept.</strong> Props flow down by default. When a child needs to update state that
		lives in the parent, mark the prop with <code>$bindable()</code>. The parent then writes
		<code>&lt;TextField bind:value={'{myState}'} /&gt;</code>, and any mutation inside
		<code>TextField</code> propagates back up. This replaces the dispatch-event-and-handle-it
		dance from Svelte 4. Use <code>$bindable</code> sparingly — one-way data flow is still
		clearer when the child doesn't own the state.
	</p>

	<div class="build">
		<TextField label="Your name" bind:value={name} placeholder="Ada Rivera" />
		<TextField label="Email" type="email" bind:value={email} placeholder="ada@example.com" />

		<div class="preview">
			<p>Hello, <strong>{name || 'stranger'}</strong>!</p>
			<p class="muted">
				We'll reach you at <strong>{email || 'nowhere yet'}</strong>.
			</p>
		</div>
	</div>

	<h3>When to bind vs when to callback</h3>
	<div class="comparison">
		<p>
			<strong>Bind (<code>$bindable</code>):</strong> When the child IS the editor of the value
			(TextField, Select, Slider). The child owns the UI for editing; the parent owns the source of truth.
		</p>
		<p>
			<strong>Callback prop:</strong> When the child NOTIFIES the parent of an event
			(Button click, item selection). The child doesn't own the value — it reports what happened.
		</p>

		<table class="compare-table">
			<thead>
				<tr>
					<th>Pattern</th>
					<th>When</th>
					<th>Example</th>
					<th>Module ref</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>$bindable</code></td>
					<td>Child edits the value</td>
					<td>TextField, Slider, Select</td>
					<td>3.5</td>
				</tr>
				<tr>
					<td>Callback prop</td>
					<td>Child reports an event</td>
					<td>Button onclick, list onselect</td>
					<td>3.3</td>
				</tr>
			</tbody>
		</table>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments reveal the boundary between one-way and two-way data flow in Svelte 5.</p>
	<ol class="experiments">
		<li><strong>Use <code>bind:value</code> on a prop that is NOT marked <code>$bindable()</code>.</strong> Svelte will emit a warning telling you the prop cannot be bound. The <code>$bindable()</code> marker is an explicit opt-in — without it, the component author signals that two-way binding is not intended.</li>
		<li><strong>Mark a prop as <code>$bindable()</code> but do not use <code>bind:</code> at the call site.</strong> It works perfectly as a normal one-way prop. The <code>$bindable()</code> declaration is permissive, not prescriptive — it says "binding is allowed here" without requiring it.</li>
		<li><strong>Bind the same <code>$state</code> variable to two different components via <code>bind:value</code>.</strong> Both components stay in sync because they share the same reactive source through the parent. Typing in one immediately updates the other, demonstrating that the parent is the single source of truth.</li>
		<li><strong>Try to bind to a <code>$derived</code> value.</strong> You will get an error because derived values are read-only. Binding requires a writable source, and <code>$derived</code> is computed from other state — it cannot accept writes from a child.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>$bindable()</code> rune creates a two-way binding channel between parent and child. When the child marks a prop as bindable, it signals that mutations to that prop should propagate back to the parent. The parent then opts in by writing <code>bind:value={'{state}'}</code> at the call site, linking the child's internal changes to the parent's reactive state.</p>
	<p class="prose">This replaces the old Svelte 4 pattern of dispatching events and writing manual setter handlers. Instead of <code>on:change</code> plus a callback that updates state, the binding does the wiring for you — one declaration in the child, one <code>bind:</code> in the parent, and data flows both ways automatically.</p>
	<p class="prose">Two-way binding is best reserved for components that are editors of a value — text fields, sliders, selects, and similar form controls where the child inherently owns the UI for editing. For purely presentational components, one-way props remain the better choice because they keep the data flow simple and predictable.</p>
	<p class="next">Next lesson: <a href="/module-3/3-6-function-bindings">3.6 — Function bindings</a></p>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}

	.concept strong {
		color: var(--color-text);
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

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.preview p {
		margin: 0;
		font-size: var(--text-base);
	}

	.preview .muted {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.comparison {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block: var(--space-md);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.comparison p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.compare-table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
		margin-block-start: var(--space-sm);
	}

	.compare-table th,
	.compare-table td {
		padding: var(--space-sm) var(--space-md);
		text-align: start;
		border-block-end: 1px solid var(--color-border);
	}

	.compare-table th {
		font-weight: 600;
		color: var(--color-text);
		background: var(--color-surface-2);
	}

	.compare-table td {
		color: var(--color-text-muted);
	}

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
