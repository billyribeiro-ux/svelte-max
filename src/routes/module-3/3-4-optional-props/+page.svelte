<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
</script>

<section class="page">
	<h1>3.4 — Optional props and defaults</h1>
	<p class="concept">
		<strong>Concept.</strong> A <code>?</code> in an <code>interface</code> marks a prop as
		optional. In the destructuring, you give it a default:
		<code>let {'{ tone = "neutral", rounded = false }'} = $props()</code>. This lets consumers
		pass only what matters — the rest falls back to sensible defaults. <code>Badge</code> uses
		this pattern: you rarely need to specify <code>tone</code>, but when you do it overrides the
		default.
	</p>

	<div class="build">
		<div class="group">
			<p class="label">No props — everything defaulted</p>
			<div class="row">
				<Badge>Default</Badge>
				<Badge>Also default</Badge>
				<Badge>All neutral</Badge>
			</div>
			<p class="annot">Both <code>tone</code> and <code>rounded</code> fell back to their defaults.</p>
		</div>

		<div class="group">
			<p class="label">Explicit tones — one prop provided</p>
			<div class="row">
				<Badge tone="neutral">neutral</Badge>
				<Badge tone="brand">brand</Badge>
				<Badge tone="success">success</Badge>
				<Badge tone="warning">warning</Badge>
				<Badge tone="error">error</Badge>
			</div>
			<p class="annot">Only <code>tone</code> was passed; <code>rounded</code> defaulted to false.</p>
		</div>

		<div class="group">
			<p class="label">Both props provided</p>
			<div class="row">
				<Badge tone="brand" rounded>rounded brand</Badge>
				<Badge tone="success" rounded>rounded success</Badge>
				<Badge tone="error" rounded>rounded error</Badge>
			</div>
			<p class="annot">Both <code>tone</code> and <code>rounded</code> were explicitly overridden.</p>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>?</code> in an interface marks a prop as optional.</li>
		<li>Defaults live at the destructuring site, not inside the interface.</li>
		<li>Consumers can pass only what matters — the rest falls back automatically.</li>
		<li>Sensible defaults let a component feel zero-config while still being configurable.</li>
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
		gap: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
		margin: 0;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}

	.annot {
		font-size: var(--text-xs);
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
