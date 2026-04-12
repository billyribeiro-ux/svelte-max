<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { Snapshot } from './$types';

	interface Captured {
		draft: string;
		notes: string;
	}

	let draft = $state('');
	let notes = $state('');

	export const snapshot: Snapshot<Captured> = {
		capture: () => ({ draft, notes }),
		restore: (value) => {
			draft = value.draft;
			notes = value.notes;
		}
	};

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import type { Snapshot } from './$types';\n" +
		"\n" +
		"\tinterface Captured {\n" +
		"\t\tdraft: string;\n" +
		"\t\tnotes: string;\n" +
		"\t}\n" +
		"\n" +
		"\tlet draft = $state('');\n" +
		"\tlet notes = $state('');\n" +
		"\n" +
		"\texport const snapshot: Snapshot\u003cCaptured\u003e = {\n" +
		"\t\tcapture: () =\u003e ({ draft, notes }),\n" +
		"\t\trestore: (value) =\u003e {\n" +
		"\t\t\tdraft = value.draft;\n" +
		"\t\t\tnotes = value.notes;\n" +
		"\t\t}\n" +
		"\t};\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.12 — Snapshots\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{'export const snapshot = { capture, restore }'}\u003c/code\u003e at the top of a\n" +
		"\t\t\u003ccode\u003e+page.svelte\u003c/code\u003e or \u003ccode\u003e+layout.svelte\u003c/code\u003e preserves ephemeral state (form\n" +
		"\t\tdrafts, scroll, textareas) across client-side navigation. \u003ccode\u003ecapture\u003c/code\u003e runs before\n" +
		"\t\tleaving and returns a JSON-serializable value; \u003ccode\u003erestore\u003c/code\u003e runs when you return and\n" +
		"\t\treceives it back. The data is stored in \u003ccode\u003esessionStorage\u003c/code\u003e, so it survives reloads\n" +
		"\t\twithin the session.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\u003cspan\u003eDraft\u003c/span\u003e\n" +
		"\t\t\t\u003ctextarea bind:value={draft} rows=\"4\" placeholder=\"Type a draft...\"\u003e\u003c/textarea\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\u003cspan\u003eNotes\u003c/span\u003e\n" +
		"\t\t\t\u003ctextarea bind:value={notes} rows=\"4\" placeholder=\"Type some notes...\"\u003e\u003c/textarea\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tType something above, click a different sidebar lesson, then press browser back.\n" +
		"\t\t\tBoth fields are restored.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esnapshot.capture\u003c/code\u003e returns a JSON-serializable value on leave.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esnapshot.restore\u003c/code\u003e receives that value on return.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eState persists in \u003ccode\u003esessionStorage\u003c/code\u003e for the session.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003e$state.snapshot()\u003c/code\u003e if you capture complex reactive state.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.12 — Snapshots</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'export const snapshot = { capture, restore }'}</code> at the top of a
		<code>+page.svelte</code> or <code>+layout.svelte</code> preserves ephemeral state (form
		drafts, scroll, textareas) across client-side navigation. <code>capture</code> runs before
		leaving and returns a JSON-serializable value; <code>restore</code> runs when you return and
		receives it back. The data is stored in <code>sessionStorage</code>, so it survives reloads
		within the session.
	</p>

	<div class="build">
		<label class="field">
			<span>Draft</span>
			<textarea bind:value={draft} rows="4" placeholder="Type a draft..."></textarea>
		</label>

		<label class="field">
			<span>Notes</span>
			<textarea bind:value={notes} rows="4" placeholder="Type some notes..."></textarea>
		</label>

		<p class="hint">
			Type something above, click a different sidebar lesson, then press browser back.
			Both fields are restored.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment exposes a limitation or requirement of the snapshot API. Undo before continuing.</p>
	<ol class="experiments">
		<li><strong>Return a value containing a circular reference from <code>capture</code> (e.g., an object that references itself).</strong> The snapshot fails to serialize and throws a <code>TypeError</code> because SvelteKit stores snapshot data in <code>sessionStorage</code>, which requires JSON-serializable values. This proves that <code>capture</code> must return a plain, acyclic data structure.</li>
		<li><strong>Return a very large string (e.g., 10 MB of text) from <code>capture</code>.</strong> Depending on the browser, <code>sessionStorage</code> throws a quota-exceeded error and the snapshot is silently lost. When the user navigates back, the fields are empty instead of restored. This reveals the storage limits of the snapshot mechanism and why it should only be used for small, ephemeral state.</li>
		<li><strong>Remove the <code>restore</code> function but keep <code>capture</code>.</strong> TypeScript errors because the <code>Snapshot</code> type requires both methods. Even if you bypass the type check, SvelteKit has no way to apply the saved data on return. This shows that capture and restore are a matched pair — one without the other is meaningless.</li>
		<li><strong>Navigate away using a full page reload (e.g., via <code>data-sveltekit-reload</code>) instead of a client-side navigation, then press back.</strong> The snapshot is still restored because the data lives in <code>sessionStorage</code>, which persists across reloads within the same browser session. This demonstrates that snapshots are more durable than in-memory state but less durable than <code>localStorage</code>.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit's snapshot API solves a common problem: preserving ephemeral form state — text drafts, scroll positions, toggle states — when the user navigates away and then returns. By exporting a <code>snapshot</code> object with <code>capture</code> and <code>restore</code> methods from a <code>+page.svelte</code> or <code>+layout.svelte</code>, you tell SvelteKit to serialize your chosen state before leaving and rehydrate it on return. The API is minimal by design: <code>capture</code> returns any JSON-serializable value, and <code>restore</code> receives it back.</p>
	<p class="prose">Under the hood, snapshot data is stored in the browser's <code>sessionStorage</code>, keyed by the history entry index. This means snapshots survive page reloads and full navigations within the same browser session, but they do not persist across sessions or across tabs. The <code>sessionStorage</code> quota (typically 5-10 MB depending on the browser) imposes a practical size limit, so snapshots should capture only the minimum state needed to restore the user's context — not large datasets or binary blobs.</p>
	<p class="prose">When working with Svelte 5's deeply reactive state (created via <code>$state</code>), the captured value may be a reactive proxy rather than a plain object. Passing a proxy to <code>sessionStorage</code> serialization can produce unexpected results. The solution is to call <code>$state.snapshot()</code> inside <code>capture</code> to produce a plain, non-reactive copy of the state tree. This one-line addition ensures clean serialization and is a best practice whenever reactive state participates in snapshot capture.</p>
	<p class="next">Next, you will learn how to add smooth page transitions using the View Transitions API and <code>onNavigate</code>.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
	}
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
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field span {
		font-size: var(--text-sm);
		color: var(--color-text);
		font-weight: 600;
	}
	textarea {
		font: inherit;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		resize: vertical;
	}
	textarea:focus {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.hint {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 768px) {
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
