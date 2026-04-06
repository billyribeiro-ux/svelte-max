<script lang="ts">
	let crashTriggered = $state(false);
	let asyncLoading = $state(false);
	let asyncDone = $state(false);
	let errorKey = $state(0);

	function triggerCrash() {
		crashTriggered = true;
	}

	function resetCrash() {
		crashTriggered = false;
		errorKey++;
	}

	function startAsync() {
		asyncLoading = true;
		asyncDone = false;
		setTimeout(() => {
			asyncLoading = false;
			asyncDone = true;
		}, 2000);
	}

	function resetAsync() {
		asyncLoading = false;
		asyncDone = false;
	}

	$effect(() => {
		if (crashTriggered) {
			throw new Error('Widget crashed intentionally!');
		}
	});
</script>

<section class="page">
	<h1>12.7 — Error Boundaries</h1>

	<p class="concept">
		<strong><code>&lt;svelte:boundary&gt;</code></strong> catches errors thrown in a component
		subtree and renders fallback UI instead of crashing the whole page. The <code>failed</code>
		snippet receives the error and a <code>reset</code> function. This is essential for
		production apps where individual widgets should fail gracefully.
	</p>

	<h3>How It Works</h3>
	<div class="build">
		<pre>{`<svelte:boundary>
  <DangerousWidget />

  {#snippet failed(error, reset)}
    <p>Something went wrong: {error.message}</p>
    <button onclick={reset}>Try again</button>
  {/snippet}
</svelte:boundary>`}</pre>
		<ul>
			<li><strong><code>failed</code> snippet</strong> — renders when a child component throws an error</li>
			<li><strong><code>error</code></strong> — the thrown Error object</li>
			<li><strong><code>reset</code></strong> — function to re-mount the crashed subtree</li>
			<li>Errors <strong>do not propagate</strong> past the boundary</li>
		</ul>
	</div>

	<h3>Demo 1: Crashing Widget</h3>
	<div class="build">
		<p class="concept">
			Click "Crash Widget" to throw an error inside the boundary. The fallback UI appears
			with the error message and a reset button.
		</p>

		{#key errorKey}
			<svelte:boundary>
				<div class="widget">
					<h4>Widget A (Crashable)</h4>
					{#if crashTriggered}
						{(() => { throw new Error('Widget A crashed intentionally!'); })()}
					{/if}
					<p class="widget-text">This widget is working normally.</p>
					<button class="demo-btn danger" onclick={triggerCrash}>Crash Widget</button>
				</div>

				{#snippet failed(error)}
					<div class="widget error-widget">
						<h4>Widget A (Crashed)</h4>
						<p class="error-msg">Error: {(error as Error).message}</p>
						<button class="demo-btn" onclick={resetCrash}>Reset Widget</button>
					</div>
				{/snippet}
			</svelte:boundary>
		{/key}
	</div>

	<h3>Demo 2: Async Loading Widget</h3>
	<div class="build">
		<p class="concept">
			This widget simulates an async operation with a loading state. The boundary wraps it
			for safety. Click "Load Data" to see the loading spinner, then the result.
		</p>

		<svelte:boundary>
			<div class="widget">
				<h4>Widget B (Async)</h4>
				{#if asyncLoading}
					<div class="loading-state">
						<span class="spinner"></span>
						Loading data...
					</div>
				{:else if asyncDone}
					<div class="success-state">
						<span class="check">&#10003;</span>
						Data loaded successfully! Widget is healthy.
					</div>
					<button class="demo-btn secondary" onclick={resetAsync}>Reset</button>
				{:else}
					<p class="widget-text">Widget is idle. Click to simulate async data loading.</p>
					<button class="demo-btn" onclick={startAsync}>Load Data</button>
				{/if}
			</div>

			{#snippet failed(error)}
				<div class="widget error-widget">
					<h4>Widget B (Failed)</h4>
					<p class="error-msg">Async error: {(error as Error).message}</p>
				</div>
			{/snippet}
		</svelte:boundary>
	</div>

	<h3>Best Practices</h3>
	<ul>
		<li><strong>Wrap third-party components</strong> — you cannot control what they throw</li>
		<li><strong>Wrap data-fetching widgets</strong> — network errors should not crash the page</li>
		<li><strong>Provide meaningful fallbacks</strong> — show what went wrong and how to recover</li>
		<li><strong>Log errors</strong> — send error details to your monitoring service in the failed snippet</li>
		<li><strong>Keep boundaries granular</strong> — wrap individual widgets, not entire pages</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.widget {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		background: var(--color-surface-2);
	}
	.widget h4 { margin: 0 0 var(--space-sm); }
	.widget-text { margin: 0 0 var(--space-sm); color: var(--color-text-muted); }
	.error-widget {
		border-color: #cc3333;
		background: #cc33330d;
	}
	.error-msg {
		color: #cc3333;
		font-weight: 600;
		margin: 0 0 var(--space-sm);
	}
	.demo-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
	}
	.demo-btn.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.demo-btn.danger {
		background: #cc3333;
	}
	.loading-state {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text-muted);
	}
	.spinner {
		display: inline-block;
		width: 18px;
		height: 18px;
		border: 2px solid var(--color-border);
		border-top-color: var(--color-primary);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }
	.success-state {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: #2d8a4e;
		font-weight: 600;
		margin-bottom: var(--space-sm);
	}
	.check { font-size: 1.2em; }
</style>
