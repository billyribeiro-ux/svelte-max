<script lang="ts">
	import { goto, preloadData, beforeNavigate, afterNavigate } from '$app/navigation';

	let log = $state<string[]>([]);

	function push(entry: string) {
		log = [...log, `${new Date().toLocaleTimeString()} · ${entry}`].slice(-6);
	}

	beforeNavigate((nav) => {
		push(`beforeNavigate → ${nav.to?.url.pathname ?? '(unknown)'}`);
	});

	afterNavigate((nav) => {
		push(`afterNavigate ← ${nav.from?.url.pathname ?? '(none)'} → ${nav.to?.url.pathname ?? '(unknown)'}`);
	});

	function goHome() {
		goto('/');
	}

	function goPrev() {
		goto('/module-8/8-7-app-state');
	}

	function warmHome() {
		preloadData('/');
		push('preloadData("/") triggered');
	}
</script>

<section class="page">
	<h1>8.8 — $app/navigation</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'goto(url)'}</code> navigates programmatically.
		<code>invalidate(key)</code> re-runs loads that depend on a key.
		<code>invalidateAll()</code> re-runs every active load.
		<code>{'preloadData(url)'}</code> warms a route's data without navigating.
		<code>beforeNavigate</code>, <code>afterNavigate</code>, and <code>onNavigate</code> are
		lifecycle hooks that fire around every client-side navigation — this is SvelteKit's
		replacement for imperative router APIs.
	</p>

	<div class="build">
		<div class="row">
			<button type="button" onclick={goHome}>Go home</button>
			<button type="button" onclick={goPrev}>Go to 8.7</button>
			<button type="button" onpointerenter={warmHome} onclick={warmHome}>
				Preload home on hover
			</button>
		</div>

		<div class="log">
			<strong>Navigation lifecycle log</strong>
			{#if log.length === 0}
				<p class="empty">No navigations yet. Click a button above, then come back.</p>
			{:else}
				<ul class="log-list">
					{#each log as entry (entry)}
						<li>{entry}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'goto(url)'}</code> is the programmatic equivalent of clicking a link.</li>
		<li><code>{'preloadData(url)'}</code> warms a route's data before the user commits.</li>
		<li><code>beforeNavigate</code> / <code>afterNavigate</code> are your lifecycle hooks.</li>
		<li><code>invalidate</code> and <code>invalidateAll</code> re-run active <code>load</code> functions.</li>
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	button {
		font: inherit;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.log {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}
	.log-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.empty {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
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
		.row {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
</style>
