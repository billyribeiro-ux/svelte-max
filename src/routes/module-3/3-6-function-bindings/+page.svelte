<script lang="ts">
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';

	let price = $state(1250);

	const displayFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});
</script>

<section class="page">
	<h1>3.6 — Function bindings</h1>
	<p class="concept">
		<strong>Concept.</strong> Since Svelte 5.9, <code>bind:</code> accepts a tuple of a getter and
		a setter instead of a plain variable:
		<code>bind:value={'{() => state, (v) => state = v.toLowerCase()}'}</code>. That lets you
		transform values on read, on write, or both — without stitching together a separate
		<code>$effect</code>. It's ideal for masking, formatting, and sanitizing user input, and
		works for readonly bindings too (a null getter with a setter for things like
		<code>clientWidth</code>).
	</p>

	<div class="build">
		<CurrencyInput label="Monthly cost" bind:value={price} />

		<div class="preview">
			<p>
				<span class="label">Stored value</span>
				<code>{price}</code>
			</p>
			<p>
				<span class="label">Formatted</span>
				<strong>{displayFormatter.format(price)}</strong>
			</p>
		</div>

		<p class="note">
			The input shows a formatted currency string, but the parent's <code>price</code> stays a
			plain <code>number</code> — the getter formats on read and the setter parses on write.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>bind:value={'{getter, setter}'}</code> lets you transform values as they cross the boundary.</li>
		<li>The child sees formatted strings; the parent keeps a clean typed value.</li>
		<li>No extra <code>$effect</code> is needed — the binding itself does the work.</li>
		<li>Function bindings also unlock readonly props like <code>clientWidth</code>.</li>
	</ul>
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
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.preview p {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		margin: 0;
		font-size: var(--text-sm);
	}

	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.preview code {
		background: var(--color-surface-1);
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
