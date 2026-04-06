<script lang="ts">
	interface Props {
		challenge: string;
		starter: string;
		expected: readonly string[];
		hints: readonly string[];
	}

	let { challenge, starter, expected, hints }: Props = $props();

	let code = $state(starter);
	let result = $state<'idle' | 'correct' | 'wrong'>('idle');
	let hintIndex = $state(0);

	function check(): void {
		const trimmed = code.replace(/\s+/g, ' ').trim();
		const allFound = expected.every((pattern) => trimmed.includes(pattern.replace(/\s+/g, ' ').trim()));
		result = allFound ? 'correct' : 'wrong';
		if (result === 'wrong' && hintIndex < hints.length - 1) {
			hintIndex += 1;
		}
	}

	function reset(): void {
		code = starter;
		result = 'idle';
		hintIndex = 0;
	}
</script>

<div class="editor">
	<div class="editor-prompt">
		<h4>Challenge</h4>
		<p>{challenge}</p>
	</div>

	<div class="editor-area">
		<label class="sr-only" for="code-editor">Code editor</label>
		<textarea
			id="code-editor"
			class="editor-textarea"
			bind:value={code}
			spellcheck="false"
			autocomplete="off"
			autocapitalize="off"
		></textarea>
	</div>

	<div class="editor-controls">
		<button type="button" class="btn-check" onclick={check}>Check my code</button>
		<button type="button" class="btn-reset" onclick={reset}>Reset</button>
	</div>

	{#if result === 'correct'}
		<div class="feedback correct" role="status">
			<strong>Correct!</strong> You've got it. Move on to the next section.
		</div>
	{:else if result === 'wrong'}
		<div class="feedback wrong" role="status">
			<strong>Not quite.</strong>
			{#if hintIndex < hints.length}
				<span>Hint: {hints[hintIndex]}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.editor {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-surface-1);
	}

	.editor-prompt {
		padding: var(--space-md);
		border-block-end: 1px solid var(--color-border);

		& h4 {
			margin: 0 0 var(--space-xs);
			font-size: var(--text-sm);
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: var(--color-brand);
			font-weight: 700;
		}

		& p {
			margin: 0;
			font-size: var(--text-base);
			color: var(--color-text);
			line-height: 1.5;
		}
	}

	.editor-textarea {
		display: block;
		inline-size: 100%;
		min-block-size: 12rem;
		padding: var(--space-md);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-text);
		background: var(--color-surface-2);
		border: none;
		resize: vertical;
		tab-size: 2;

		&:focus {
			outline: 2px solid var(--color-brand);
			outline-offset: -2px;
		}
	}

	.editor-controls {
		display: flex;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		border-block-start: 1px solid var(--color-border);
	}

	.btn-check {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-md);
		font-weight: 600;
		cursor: pointer;

		&:hover {
			background: var(--color-brand-dim);
		}
	}

	.btn-reset {
		background: var(--color-surface);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-md);
		cursor: pointer;

		&:hover {
			background: var(--color-surface-2);
		}
	}

	.feedback {
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		line-height: 1.5;

		& strong {
			display: inline;
			margin-inline-end: var(--space-xs);
		}
	}

	.correct {
		background: oklch(92% 0.05 145);
		color: oklch(25% 0.08 145);
	}

	.wrong {
		background: oklch(92% 0.05 25);
		color: oklch(30% 0.08 25);
	}

	.sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
