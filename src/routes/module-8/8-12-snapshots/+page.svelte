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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>snapshot.capture</code> returns a JSON-serializable value on leave.</li>
		<li><code>snapshot.restore</code> receives that value on return.</li>
		<li>State persists in <code>sessionStorage</code> for the session.</li>
		<li>Use <code>$state.snapshot()</code> if you capture complex reactive state.</li>
	</ul>
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
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
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
