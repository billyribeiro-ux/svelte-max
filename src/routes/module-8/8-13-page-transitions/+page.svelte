<script lang="ts">
	import { onNavigate } from '$app/navigation';

	let hasVT = $state(false);

	$effect(() => {
		hasVT = typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
	});

	onNavigate((navigation) => {
		if (typeof document.startViewTransition !== 'function') return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<section class="page">
	<h1>8.13 — Page transitions</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>onNavigate</code> from <code>$app/navigation</code> lets you hook into every
		client-side navigation. Combined with the browser's View Transitions API
		(<code>document.startViewTransition</code>), you get smooth morph transitions between routes.
		Fall back gracefully when the API isn't available.
	</p>

	<div class="build">
		<div class="status">
			<span>View Transitions API:</span>
			<span class="pill" class:ok={hasVT} class:no={!hasVT}>
				{hasVT ? 'Supported' : 'Not supported'}
			</span>
		</div>

		<p class="hint">Click a link below — if supported, the page morphs smoothly.</p>

		<nav class="links">
			<a href="/module-8/8-11-shallow-routing">→ 8.11 Shallow routing</a>
			<a href="/module-8/8-12-snapshots">→ 8.12 Snapshots</a>
			<a href="/module-8/8-14-rendering-modes">→ 8.14 Rendering modes</a>
		</nav>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>onNavigate</code> can return a promise to delay the DOM update.</li>
		<li><code>document.startViewTransition</code> snapshots, morphs, and animates.</li>
		<li>Add <code>view-transition-name</code> to elements that should morph across routes.</li>
		<li>Feature-detect — not every browser supports it yet.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
	}
	h1 {
		view-transition-name: lesson-title;
	}
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
	.status {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	.pill {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		border: 1px solid var(--color-border);
	}
	.pill.ok {
		background: var(--color-success);
		color: var(--color-surface);
		border-color: var(--color-success);
	}
	.pill.no {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}
	.hint {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	.links {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	a {
		color: var(--color-brand);
		text-decoration: none;
		font-size: var(--text-sm);
	}
	a:hover {
		text-decoration: underline;
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
