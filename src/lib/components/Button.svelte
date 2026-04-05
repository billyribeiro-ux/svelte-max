<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		type?: 'button' | 'submit';
		onclick?: () => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		onclick,
		children
	}: Props = $props();
</script>

<button {type} {disabled} {onclick} class="btn variant-{variant} size-{size}">
	{@render children()}
</button>

<style>
	.btn {
		--btn-bg: var(--color-brand);
		--btn-fg: var(--color-surface-1);
		--btn-border: var(--color-brand);

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		background: var(--btn-bg);
		color: var(--btn-fg);
		border: 1px solid var(--btn-border);
		border-radius: var(--radius-md);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
	}

	.btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}

	.variant-primary {
		--btn-bg: var(--color-brand);
		--btn-fg: var(--color-surface-1);
		--btn-border: var(--color-brand);
	}

	.variant-secondary {
		--btn-bg: var(--color-surface-2);
		--btn-fg: var(--color-text);
		--btn-border: var(--color-border);
	}

	.variant-ghost {
		--btn-bg: transparent;
		--btn-fg: var(--color-text);
		--btn-border: transparent;
	}

	.variant-ghost:hover:not(:disabled) {
		--btn-bg: var(--color-surface-2);
	}

	.variant-danger {
		--btn-bg: var(--color-error);
		--btn-fg: var(--color-surface-1);
		--btn-border: var(--color-error);
	}

	.size-sm {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
	}

	.size-md {
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
	}

	.size-lg {
		padding: var(--space-md) var(--space-lg);
		font-size: var(--text-base);
	}
</style>
