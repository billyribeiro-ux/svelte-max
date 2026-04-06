<script lang="ts">
	import CodeCanvas from './CodeCanvas.svelte';

	interface FileEntry {
		name: string;
		code: string;
	}

	interface Props {
		files: readonly FileEntry[];
		title?: string;
	}

	let { files, title = 'View reference solution' }: Props = $props();

	let open = $state(false);
</script>

<div class="reference">
	<button type="button" class="toggle" onclick={() => (open = !open)} aria-expanded={open}>
		<span class="icon" aria-hidden="true">{open ? '▼' : '▶'}</span>
		{title}
		<span class="count">({files.length} file{files.length === 1 ? '' : 's'})</span>
	</button>

	{#if open}
		<div class="files">
			{#each files as file (file.name)}
				<CodeCanvas filename={file.name} code={file.code} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.reference {
		margin-block: var(--space-lg);
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		inline-size: 100%;
		padding: var(--space-md) var(--space-lg);
		background: var(--color-surface-1);
		border: none;
		font-size: var(--text-base);
		font-weight: 700;
		color: var(--color-brand);
		cursor: pointer;
		text-align: start;
		transition: background var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-surface-2);
		}
	}

	.icon {
		font-size: var(--text-xs);
	}

	.count {
		font-weight: 400;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.files {
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		border-block-start: 1px solid var(--color-border);
	}
</style>
