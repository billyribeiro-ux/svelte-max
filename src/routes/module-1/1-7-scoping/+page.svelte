<script lang="ts">
	const labelA: string = 'Primary action';
	const labelB: string = 'Ghost action';
</script>

<section class="page">
	<h1>Lesson 1.7 — Scoped Styles</h1>

	<p class="concept">
		<strong>Concept.</strong> Every class you write inside a Svelte component's
		<code>&lt;style&gt;</code> block is rewritten at build time with a unique hash suffix. A plain
		<code>.button</code> here becomes something like
		<code>.button.svelte-abc123</code> in the compiled output. That means a
		<code>.button</code> defined in this file cannot collide with a <code>.button</code> in any
		other file — ever. Open DevTools, inspect one of the buttons below, and you will literally see
		the hash class on the element. Use <code>:global()</code> only when you genuinely need to reach
		outside the component (e.g., styling markdown rendered with <code>&#123;@html&#125;</code>);
		reaching for it to "just make it work" almost always means you are fighting the system instead
		of leveraging it.
	</p>

	<div class="demo">
		<div class="card card-a">
			<h2>Card A</h2>
			<p>This card uses the brand look.</p>
			<button class="button" type="button">{labelA}</button>
		</div>

		<div class="card card-b">
			<h2>Card B</h2>
			<p>This card uses a ghost look.</p>
			<button class="button" type="button">{labelB}</button>
		</div>
	</div>

	<p class="note">
		Inspect each button in DevTools — the class hash proves Svelte scoped these styles. In Lesson
		3.1 we split these into real child components with their own scoped blocks, and the hash
		protection applies across files automatically.
	</p>

	<h2>What you learned</h2>
	<ul class="learned">
		<li>Svelte hashes every class in a component's <code>&lt;style&gt;</code> block at compile time.</li>
		<li>Identical class names in different components cannot collide.</li>
		<li>DevTools shows the hash suffix on the element — go look.</li>
		<li><code>:global()</code> is an escape hatch, not a default.</li>
	</ul>
</section>

<style>
	.page {
		& .concept,
		& .note {
			max-inline-size: 65ch;
			color: var(--color-fg-muted);
		}

		& .note {
			font-size: var(--text-sm);
			padding: 1rem;
			border-inline-start: 3px solid var(--color-brand);
			background: var(--color-surface);
			border-radius: 0.5rem;
			margin-block-start: 1.5rem;
		}

		& h2 {
			font-size: var(--text-xl);
			margin-block-start: 2rem;
		}
	}

	.demo {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-block: 2rem;
	}

	.card {
		padding: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid var(--color-border);

		& h2 {
			font-size: var(--text-lg);
			margin-block: 0 0.5rem;
		}

		& p {
			font-size: var(--text-base);
			color: var(--color-fg-muted);
			margin-block: 0 1rem;
		}
	}

	.card-a {
		background: var(--color-surface);

		& .button {
			background: var(--color-brand);
			color: var(--color-bg);
			border: none;
			padding: 0.65rem 1.2rem;
			border-radius: 0.5rem;
			font-size: var(--text-base);
			font-weight: 600;
			cursor: pointer;
			transition: transform 0.15s ease;

			&:hover {
				transform: translateY(-1px);
			}
		}
	}

	.card-b {
		background: var(--color-bg);

		& .button {
			background: transparent;
			color: var(--color-brand);
			border: 2px solid var(--color-brand);
			padding: 0.55rem 1.1rem;
			border-radius: 999px;
			font-size: var(--text-base);
			font-weight: 600;
			cursor: pointer;
			letter-spacing: 0.02em;

			&:hover {
				background: var(--color-brand-dim);
			}
		}
	}

	.learned {
		padding-inline-start: 1.25rem;
		color: var(--color-fg-muted);

		& li {
			margin-block: 0.25rem;
		}
	}

	@media (min-width: 768px) {
		.demo {
			flex-direction: row;

			& .card {
				flex: 1;
			}
		}
	}
</style>
