<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	interface ButtonSample {
		variant: Variant;
		size: Size;
		label: string;
	}

	const variants: readonly Variant[] = ['primary', 'secondary', 'ghost', 'danger'];
	const sizes: readonly Size[] = ['sm', 'md', 'lg'];

	const samples: ButtonSample[] = variants.flatMap((variant) =>
		sizes.map((size) => ({ variant, size, label: `${variant} ${size}` }))
	);
</script>

<section class="page">
	<h1>3.3 — Typed props with interfaces</h1>
	<p class="concept">
		<strong>Concept.</strong> Every component gets an <code>interface Props</code> describing its
		shape, and you destructure into it:
		<code>let {'{ variant, size }'}: Props = $props()</code>. TypeScript then catches mismatches
		at compile time — a typo like <code>variant="prmary"</code> becomes an error instead of a
		silent visual bug. Union string literals give you exhaustive, autocompleted variants, and
		changing the interface lights up every call site that's wrong.
	</p>

	<div class="build">
		<p class="note">
			Four variants &times; three sizes = twelve buttons, all driven by a typed
			<code>ButtonSample[]</code>.
		</p>
		<div class="grid">
			{#each samples as sample (sample.label)}
				<Button variant={sample.variant} size={sample.size}>
					{sample.label}
				</Button>
			{/each}
		</div>
		<p class="ts-note">
			If you wrote <code>variant="primry"</code>, TypeScript would flag:
			<em>Type '"primry"' is not assignable to type '"primary" | "secondary" | "ghost" | "danger"'</em>.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Declare an <code>interface Props</code> and destructure <code>$props()</code> into it.</li>
		<li>Union string literals create exhaustive, autocompleted variants.</li>
		<li>Typos in prop values become compile errors instead of runtime surprises.</li>
		<li>Renaming or narrowing a prop cascades through every consumer at once.</li>
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

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
		align-items: center;
		justify-items: start;
	}

	.ts-note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		margin: 0;
	}

	.ts-note em {
		color: var(--color-error);
		font-style: normal;
		font-family: var(--font-mono);
		font-size: 0.9em;
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

		.grid {
			grid-template-columns: repeat(3, auto);
			justify-items: center;
		}
	}
</style>
