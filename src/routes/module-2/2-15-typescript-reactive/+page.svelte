<script lang="ts">
	// Explicit union type — the whole component's shape hangs off this.
	type Status = 'idle' | 'loading' | 'success' | 'error';

	interface Result {
		title: string;
		description: string;
	}

	// When the initial value is narrower than the intended type (null here),
	// we annotate $state explicitly so later assignments of Result are allowed.
	let status = $state<Status>('idle');
	let result = $state<Result | null>(null);
	let error = $state<string | null>(null);

	const samplePayloads: Result[] = [
		{
			title: 'Weekly digest ready',
			description: 'Seven new articles, three new videos, and two community highlights.'
		},
		{
			title: 'Deployment succeeded',
			description: 'Release v2.3.1 is live in production with zero failing health checks.'
		},
		{
			title: 'Profile synchronized',
			description: 'Your preferences are now available on all connected devices.'
		}
	];

	async function fetchIt(): Promise<void> {
		status = 'loading';
		result = null;
		error = null;

		await new Promise((res) => setTimeout(res, 1200));

		// 70% success / 30% error — enough variety to exercise both branches.
		if (Math.random() < 0.7) {
			result = samplePayloads[Math.floor(Math.random() * samplePayloads.length)];
			status = 'success';
		} else {
			error = 'Network request failed — please retry.';
			status = 'error';
		}
	}
</script>

<section class="page">
	<h1>2.15 — Typed reactive state</h1>

	<p class="concept">
		Strict TypeScript types for runes keep refactors safe. When the initial value of
		<code>$state</code> doesn't describe the full shape — e.g., starting with <code>null</code> and
		populating later — annotate explicitly with <code>$state&lt;User | null&gt;(null)</code>.
		<code>$derived</code> infers from its expression, so it rarely needs a manual type. Union types
		model state machines cleanly: <code>type Status = 'idle' | 'loading' | 'success' | 'error'</code>.
		TypeScript narrows unions inside template <code>{`{#if}`}</code> blocks, so branches see the
		correct non-null types automatically.
	</p>

	<div class="build stack">
		<h2>Typed async fetch machine</h2>

		{#if status === 'idle'}
			<div class="card idle">
				<p>Press the button to simulate an async request.</p>
				<button type="button" class="primary" onclick={fetchIt}>Fetch</button>
			</div>
		{:else if status === 'loading'}
			<div class="card loading" aria-live="polite">
				<span class="dot" aria-hidden="true"></span>
				<p>Loading…</p>
			</div>
		{:else if status === 'success' && result}
			<!--
				Narrowing: the `&& result` guard tells TypeScript that `result` is
				`Result`, not `Result | null`, inside this branch. No `!` needed.
			-->
			<div class="card success">
				<h3>{result.title}</h3>
				<p>{result.description}</p>
				<button type="button" class="secondary" onclick={fetchIt}>Fetch another</button>
			</div>
		{:else if status === 'error' && error}
			<!-- Same trick — `error` is narrowed to `string` here. -->
			<div class="card error" role="alert">
				<h3>Something went wrong</h3>
				<p>{error}</p>
				<button type="button" class="primary" onclick={fetchIt}>Retry</button>
			</div>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>
			Use <code>$state&lt;T&gt;(initial)</code> when the initial value is narrower than the desired
			type (e.g., <code>null</code>).
		</li>
		<li>
			<code>$derived</code> infers from its expression — no annotation needed in most cases.
		</li>
		<li>Union types model finite state machines exactly and exhaustively.</li>
		<li>
			Template <code>{`{#if}`}</code> conditions narrow types inside their branches, eliminating
			non-null assertions.
		</li>
		<li>Zero <code>any</code>. Every assignment is type-checked.</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		font-size: var(--text-base);
		margin-block: var(--space-md) var(--space-lg);
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	h2 {
		font-size: var(--text-lg);
	}

	.card {
		padding: var(--space-lg);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: flex-start;
	}

	.card h3 {
		font-size: var(--text-lg);
	}

	.card p {
		color: var(--color-text-muted);
	}

	.card.loading {
		flex-direction: row;
		align-items: center;
	}

	.card.success {
		border-color: var(--color-success);
		background: color-mix(in oklch, var(--color-success) 10%, var(--color-surface));
	}

	.card.error {
		border-color: var(--color-error);
		background: color-mix(in oklch, var(--color-error) 12%, var(--color-surface));
	}

	.card.error h3 {
		color: var(--color-error);
	}

	.dot {
		inline-size: 0.9rem;
		block-size: 0.9rem;
		border-radius: var(--radius-full);
		background: var(--color-brand);
		animation: pulse 1s var(--ease-in-out) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.6;
		}
		50% {
			transform: scale(1.4);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
			opacity: 0.9;
		}
	}

	button {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-spring);
	}

	button:hover {
		transform: translateY(-1px);
	}

	.primary {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}

	.primary:hover {
		background: var(--color-brand-dim);
	}

	.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.95em;
	}

	ul {
		margin-block-start: var(--space-md);
		padding-inline-start: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		color: var(--color-text-muted);
	}

	h3 {
		margin-block-start: var(--space-xl);
	}

	.build h3 {
		margin-block-start: 0;
	}
</style>
