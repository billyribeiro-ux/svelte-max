<script lang="ts" module>
	let counter = 0;
	const nextId = () => `tf-${++counter}`;
</script>

<script lang="ts">
	interface Props {
		label: string;
		value?: string;
		placeholder?: string;
		type?: 'text' | 'email' | 'tel';
		id?: string;
	}

	let {
		label,
		value = $bindable(''),
		placeholder,
		type = 'text',
		id = nextId()
	}: Props = $props();
</script>

<label class="field" for={id}>
	<span>{label}</span>
	{#if type === 'email'}
		<input {id} type="email" bind:value {placeholder} />
	{:else if type === 'tel'}
		<input {id} type="tel" bind:value {placeholder} />
	{:else}
		<input {id} type="text" bind:value {placeholder} />
	{/if}
</label>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	span {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}

	input {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-1);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		transition:
			border-color var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}

	input::placeholder {
		color: var(--color-text-muted);
	}

	input:focus-visible {
		outline: none;
		border-color: var(--color-brand);
		box-shadow: 0 0 0 3px oklch(65% 0.22 270 / 0.2);
	}
</style>
