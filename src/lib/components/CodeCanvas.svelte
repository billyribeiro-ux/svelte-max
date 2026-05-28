<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		filename: string;
		code: string;
		collapsed?: boolean;
		children?: Snippet;
	}

	let { filename, code, collapsed = false }: Props = $props();

	let copied = $state(false);

	async function copy(): Promise<void> {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			// Clipboard API not available (SSR or insecure context)
		}
	}

	const lines = $derived(code.split('\n'));
</script>

<div class="canvas">
	<header class="canvas-bar">
		<span class="canvas-filename">{filename}</span>
		<button type="button" class="canvas-copy" onclick={copy}>
			{copied ? 'Copied!' : 'Copy'}
		</button>
	</header>

	{#if collapsed}
		<details>
			<summary class="canvas-expand">Show full code ({lines.length} lines)</summary>
			<div class="canvas-scroll">
				<pre><code>{#each lines as line, i (i)}<span class="ln">{String(i + 1).padStart(3, ' ')}</span>  {line}
{/each}</code></pre>
			</div>
		</details>
	{:else}
		<div class="canvas-scroll">
			<pre><code>{#each lines as line, i (i)}<span class="ln">{String(i + 1).padStart(3, ' ')}</span>  {line}
{/each}</code></pre>
		</div>
	{/if}
</div>

<style>
	.canvas {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-surface-2);
		margin-block: var(--space-sm);
	}

	.canvas-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface);
		border-block-end: 1px solid var(--color-border);
	}

	.canvas-filename {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.canvas-copy {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-1);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-brand);
			color: var(--color-surface);
			border-color: var(--color-brand);
		}
	}

	.canvas-expand {
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-brand);
		cursor: pointer;
		font-weight: 600;
	}

	.canvas-scroll {
		overflow-x: auto;
		max-block-size: 32rem;
		overflow-y: auto;
	}

	pre {
		margin: 0;
		padding: var(--space-md);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-text);
		background: transparent;
		border: none;
		border-radius: 0;
	}

	code {
		background: transparent;
		padding: 0;
		font-size: inherit;
		border-radius: 0;
	}

	.ln {
		color: var(--color-text-muted);
		user-select: none;
		opacity: 0.5;
	}

	@media (min-inline-size: 768px) {
		.canvas-scroll {
			max-block-size: 48rem;
		}
	}
</style>
