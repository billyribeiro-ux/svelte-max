<script lang="ts">
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
</style>
