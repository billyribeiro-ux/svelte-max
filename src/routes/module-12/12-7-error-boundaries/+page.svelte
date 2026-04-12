<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let crashTriggered = $state(false);\n" +
		"	let asyncLoading = $state(false);\n" +
		"	let asyncDone = $state(false);\n" +
		"	let errorKey = $state(0);\n" +
		"\n" +
		"	function triggerCrash() {\n" +
		"		crashTriggered = true;\n" +
		"	}\n" +
		"\n" +
		"	function resetCrash() {\n" +
		"		crashTriggered = false;\n" +
		"		errorKey++;\n" +
		"	}\n" +
		"\n" +
		"	function startAsync() {\n" +
		"		asyncLoading = true;\n" +
		"		asyncDone = false;\n" +
		"		setTimeout(() =\u003e {\n" +
		"			asyncLoading = false;\n" +
		"			asyncDone = true;\n" +
		"		}, 2000);\n" +
		"	}\n" +
		"\n" +
		"	function resetAsync() {\n" +
		"		asyncLoading = false;\n" +
		"		asyncDone = false;\n" +
		"	}\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		if (crashTriggered) {\n" +
		"			throw new Error('Widget crashed intentionally!');\n" +
		"		}\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.7 — Error Boundaries\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003e\u003ccode\u003e&lt;svelte:boundary&gt;\u003c/code\u003e\u003c/strong\u003e catches errors thrown in a component\n" +
		"		subtree and renders fallback UI instead of crashing the whole page. The \u003ccode\u003efailed\u003c/code\u003e\n" +
		"		snippet receives the error and a \u003ccode\u003ereset\u003c/code\u003e function. This is essential for\n" +
		"		production apps where individual widgets should fail gracefully.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eHow It Works\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e{`\u003csvelte:boundary\u003e\n" +
		"  \u003cDangerousWidget /\u003e\n" +
		"\n" +
		"  {#snippet failed(error, reset)}\n" +
		"    \u003cp\u003eSomething went wrong: {error.message}\u003c/p\u003e\n" +
		"    \u003cbutton onclick={reset}\u003eTry again\u003c/button\u003e\n" +
		"  {/snippet}\n" +
		"\u003c/svelte:boundary\u003e`}\u003c/pre\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003efailed\u003c/code\u003e snippet\u003c/strong\u003e — renders when a child component throws an error\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003eerror\u003c/code\u003e\u003c/strong\u003e — the thrown Error object\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003ereset\u003c/code\u003e\u003c/strong\u003e — function to re-mount the crashed subtree\u003c/li\u003e\n" +
		"			\u003cli\u003eErrors \u003cstrong\u003edo not propagate\u003c/strong\u003e past the boundary\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo 1: Crashing Widget\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Click \"Crash Widget\" to throw an error inside the boundary. The fallback UI appears\n" +
		"			with the error message and a reset button.\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		{#key errorKey}\n" +
		"			\u003csvelte:boundary\u003e\n" +
		"				\u003cdiv class=\"widget\"\u003e\n" +
		"					\u003ch4\u003eWidget A (Crashable)\u003c/h4\u003e\n" +
		"					{#if crashTriggered}\n" +
		"						{(() =\u003e { throw new Error('Widget A crashed intentionally!'); })()}\n" +
		"					{/if}\n" +
		"					\u003cp class=\"widget-text\"\u003eThis widget is working normally.\u003c/p\u003e\n" +
		"					\u003cbutton class=\"demo-btn danger\" onclick={triggerCrash}\u003eCrash Widget\u003c/button\u003e\n" +
		"				\u003c/div\u003e\n" +
		"\n" +
		"				{#snippet failed(error)}\n" +
		"					\u003cdiv class=\"widget error-widget\"\u003e\n" +
		"						\u003ch4\u003eWidget A (Crashed)\u003c/h4\u003e\n" +
		"						\u003cp class=\"error-msg\"\u003eError: {(error as Error).message}\u003c/p\u003e\n" +
		"						\u003cbutton class=\"demo-btn\" onclick={resetCrash}\u003eReset Widget\u003c/button\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{/snippet}\n" +
		"			\u003c/svelte:boundary\u003e\n" +
		"		{/key}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo 2: Async Loading Widget\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>&lt;svelte:boundary&gt;</code> wrapper around a crashing component.</strong> The error propagates up and crashes the entire page instead of just the widget, proving that without a boundary the blast radius is unlimited.</li>
		<li><strong>Throw an error in a <code>load()</code> function instead of a component.</strong> The boundary does not catch it because <code>svelte:boundary</code> only catches errors during rendering and effects, not during server-side data loading.</li>
		<li><strong>Call <code>reset()</code> without fixing the underlying cause of the error.</strong> The component re-mounts, hits the same error immediately, and the boundary catches it again, creating an infinite crash-reset loop.</li>
		<li><strong>Wrap an entire page in a single boundary instead of individual widgets.</strong> When one widget crashes, the entire page content is replaced with the error fallback, hiding all the other working content.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>&lt;svelte:boundary&gt;</code> catches errors thrown during rendering or in effects within its subtree, replacing the crashed content with a <code>failed</code> snippet. This prevents a single broken widget from taking down the entire page, giving you the same error boundary pattern that React popularised but built into Svelte's template syntax.</p>
	<p class="prose">The <code>failed</code> snippet receives the <code>error</code> object for display and a <code>reset</code> function that re-mounts the crashed subtree. This is useful for transient errors like network failures where a retry might succeed. For persistent errors, show a meaningful fallback and log the error to your monitoring service.</p>
	<p class="prose">Granularity matters: wrap individual widgets, third-party components, and data-fetching sections in their own boundaries. A single page-level boundary hides all content on any error, while per-widget boundaries let the rest of the page continue working normally.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-8-accessibility">12.8 — Accessibility</a> — build applications that work for everyone.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

	.widget {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		background: var(--color-surface-2);
	}
	.widget h4 { margin: 0 0 var(--space-sm); }
	.widget-text { margin: 0 0 var(--space-sm); color: var(--color-text-muted); }
	.error-widget {
		border-color: var(--color-error);
		background: var(--color-error)0d;
	}
	.error-msg {
		color: var(--color-error);
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
		background: var(--color-error);
	}
	.loading-state {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text-muted);
	}
	.spinner {
		display: inline-block;
		inline-size: 18px;
		block-size: 18px;
		border: 2px solid var(--color-border);
		border-block-start-color: var(--color-primary);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }
	.success-state {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-success);
		font-weight: 600;
		margin-block-end: var(--space-sm);
	}
	.check { font-size: 1.2em; }


	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
