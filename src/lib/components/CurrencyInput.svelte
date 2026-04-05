<script lang="ts" module>
	let counter = 0;
	const nextId = () => `ci-${++counter}`;
</script>

<script lang="ts">
	interface Props {
		value?: number;
		currency?: string;
		label: string;
		id?: string;
	}

	let {
		value = $bindable(0),
		currency = 'USD',
		label,
		id = nextId()
	}: Props = $props();

	const formatter = $derived(
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
			maximumFractionDigits: 2
		})
	);

	const formattedDisplay = $derived(formatter.format(value));

	function parseRaw(raw: string): number {
		const cleaned = raw.replace(/[^0-9.]/g, '');
		const parts = cleaned.split('.');
		const normalized = parts.length > 1 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
		const parsed = Number.parseFloat(normalized);
		return Number.isFinite(parsed) ? parsed : 0;
	}
</script>

<label class="field" for={id}>
	<span>{label}</span>
	<input
		{id}
		type="text"
		inputmode="decimal"
		bind:value={
			() => formattedDisplay,
			(raw: string) => {
				value = parseRaw(raw);
			}
		}
	/>
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
		font-size: var(--text-base);
		font-family: var(--font-mono);
		transition:
			border-color var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}

	input:focus-visible {
		outline: none;
		border-color: var(--color-brand);
		box-shadow: 0 0 0 3px oklch(65% 0.22 270 / 0.2);
	}
</style>
