<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const forkCode = `\u003cscript lang="ts"\u003e
  import { fork } from 'svelte';
  import { getProductDetails } from './products.remote';

  let productId = $state('abc');

  // fork() preloads async work without applying it
  const pending = fork(() => {
    // This runs the async boundary eagerly
    return getProductDetails(productId);
  });

  function handleHover() {
    // Start preloading on hover
    pending.start();
  }

  function handleClick() {
    // Apply the preloaded result
    pending.commit();
  }

  function handleCancel() {
    // Abandon the preloaded work
    pending.discard();
  }
\u003c/script\u003e

<button
  onmouseenter={handleHover}
  onclick={handleClick}
>
  View Details
</button>`;

	const useCaseCode = `// Use cases for fork():
//
// 1. Preload on hover, apply on click
//    → Start loading product details when user hovers
//    → Show instantly when they click
//
// 2. Speculative prefetching
//    → Load the next page while user reads current
//    → Commit when they navigate
//
// 3. Preview before commit
//    → Load a preview state
//    → commit() to apply, discard() to abandon
//
// 4. Optimistic navigation
//    → Fork the target page data
//    → Commit on navigation, discard on cancel`;

	let preloadState = $state<'idle' | 'loading' | 'ready' | 'shown'>('idle');
	let contentLoaded = $state(false);

	const detailContent = {
		title: 'Premium Widget Pro',
		description: 'A high-quality widget with advanced features for professional use.',
		specs: ['Titanium build', '48-hour battery', 'IP68 waterproof', 'USB-C fast charge'],
		price: '$299.99',
	};

	function handleHover() {
		if (preloadState === 'idle') {
			preloadState = 'loading';
			setTimeout(() => {
				contentLoaded = true;
				preloadState = 'ready';
			}, 600);
		}
	}

	function handleCommit() {
		if (preloadState === 'ready') {
			preloadState = 'shown';
		}
	}

	function handleDiscard() {
		preloadState = 'idle';
		contentLoaded = false;
	}

	function handleReset() {
		preloadState = 'idle';
		contentLoaded = false;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const forkCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { fork } from 'svelte';\n" +
		"  import { getProductDetails } from './products.remote';\n" +
		"\n" +
		"  let productId = $state('abc');\n" +
		"\n" +
		"  // fork() preloads async work without applying it\n" +
		"  const pending = fork(() =\u003e {\n" +
		"    // This runs the async boundary eagerly\n" +
		"    return getProductDetails(productId);\n" +
		"  });\n" +
		"\n" +
		"  function handleHover() {\n" +
		"    // Start preloading on hover\n" +
		"    pending.start();\n" +
		"  }\n" +
		"\n" +
		"  function handleClick() {\n" +
		"    // Apply the preloaded result\n" +
		"    pending.commit();\n" +
		"  }\n" +
		"\n" +
		"  function handleCancel() {\n" +
		"    // Abandon the preloaded work\n" +
		"    pending.discard();\n" +
		"  }\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cbutton\n" +
		"  onmouseenter={handleHover}\n" +
		"  onclick={handleClick}\n" +
		"\u003e\n" +
		"  View Details\n" +
		"\u003c/button\u003e`;\n" +
		"\n" +
		"	const useCaseCode = `// Use cases for fork():\n" +
		"//\n" +
		"// 1. Preload on hover, apply on click\n" +
		"//    → Start loading product details when user hovers\n" +
		"//    → Show instantly when they click\n" +
		"//\n" +
		"// 2. Speculative prefetching\n" +
		"//    → Load the next page while user reads current\n" +
		"//    → Commit when they navigate\n" +
		"//\n" +
		"// 3. Preview before commit\n" +
		"//    → Load a preview state\n" +
		"//    → commit() to apply, discard() to abandon\n" +
		"//\n" +
		"// 4. Optimistic navigation\n" +
		"//    → Fork the target page data\n" +
		"//    → Commit on navigation, discard on cancel`;\n" +
		"\n" +
		"	let preloadState = $state\u003c'idle' | 'loading' | 'ready' | 'shown'\u003e('idle');\n" +
		"	let contentLoaded = $state(false);\n" +
		"\n" +
		"	const detailContent = {\n" +
		"		title: 'Premium Widget Pro',\n" +
		"		description: 'A high-quality widget with advanced features for professional use.',\n" +
		"		specs: ['Titanium build', '48-hour battery', 'IP68 waterproof', 'USB-C fast charge'],\n" +
		"		price: '$299.99',\n" +
		"	};\n" +
		"\n" +
		"	function handleHover() {\n" +
		"		if (preloadState === 'idle') {\n" +
		"			preloadState = 'loading';\n" +
		"			setTimeout(() =\u003e {\n" +
		"				contentLoaded = true;\n" +
		"				preloadState = 'ready';\n" +
		"			}, 600);\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	function handleCommit() {\n" +
		"		if (preloadState === 'ready') {\n" +
		"			preloadState = 'shown';\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	function handleDiscard() {\n" +
		"		preloadState = 'idle';\n" +
		"		contentLoaded = false;\n" +
		"	}\n" +
		"\n" +
		"	function handleReset() {\n" +
		"		preloadState = 'idle';\n" +
		"		contentLoaded = false;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.13 — fork()\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003efork()\u003c/code\u003e preloads async work without applying it.\n" +
		"		\u003ccode\u003epending.commit()\u003c/code\u003e applies the result. \u003ccode\u003epending.discard()\u003c/code\u003e abandons it.\n" +
		"		Use case: preload on hover, apply on click — instant perceived performance.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003efork() API\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{forkCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eUse cases\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{useCaseCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated preload demo\u003c/h2\u003e\n" +
		"		\u003cp\u003eHover the button to preload. Click to commit (show). Or discard to cancel:\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"demo-area\"\u003e\n" +
		"			\u003cdiv class=\"status-bar\"\u003e\n" +
		"				Status: \u003cstrong\u003e{preloadState}\u003c/strong\u003e\n" +
		"				{#if preloadState === 'loading'}\n" +
		"					\u003cspan class=\"spinner\"\u003e\u003c/span\u003e\n" +
		"				{/if}\n" +
		"			\u003c/div\u003e\n" +
		"\n" +
		"			\u003cdiv class=\"button-row\"\u003e\n" +
		"				\u003cbutton\n" +
		"					class=\"action-btn primary\"\n" +
		"					onmouseenter={handleHover}\n" +
		"					onclick={handleCommit}\n" +
		"					disabled={preloadState === 'shown'}\n" +
		"				\u003e\n" +
		"					{#if preloadState === 'idle'}\n" +
		"						Hover to preload\n" +
		"					{:else if preloadState === 'loading'}\n" +
		"						Loading...\n" +
		"					{:else if preloadState === 'ready'}\n" +
		"						Click to commit\n" +
		"					{:else}\n" +
		"						Committed!\n" +
		"					{/if}\n" +
		"				\u003c/button\u003e\n" +
		"\n" +
		"				{#if preloadState === 'ready'}\n" +
		"					\u003cbutton class=\"action-btn secondary\" onclick={handleDiscard}\u003e\n" +
		"						Discard\n" +
		"					\u003c/button\u003e\n" +
		"				{/if}\n" +
		"\n" +
		"				{#if preloadState === 'shown'}\n" +
		"					\u003cbutton class=\"action-btn secondary\" onclick={handleReset}\u003e\n" +
		"						Reset\n" +
		"					\u003c/button\u003e\n" +
		"				{/if}\n" +
		"			\u003c/div\u003e\n" +
		"\n" +
		"			{#if preloadState === 'shown'}\n" +
		"				\u003cdiv class=\"detail-card\"\u003e\n" +
		"					\u003ch4\u003e{detailContent.title}\u003c/h4\u003e\n" +
		"					\u003cp class=\"detail-desc\"\u003e{detailContent.description}\u003c/p\u003e\n" +
		"					\u003cul class=\"spec-list\"\u003e\n" +
		"						{#each detailContent.specs as spec}\n" +
		"							\u003cli\u003e{spec}\u003c/li\u003e\n" +
		"						{/each}\n" +
		"					\u003c/ul\u003e\n" +
		"					\u003cp class=\"detail-price\"\u003e{detailContent.price}\u003c/p\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003efork()\u003c/code\u003e starts async work without applying it to the UI\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ecommit()\u003c/code\u003e applies the preloaded result instantly\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ediscard()\u003c/code\u003e abandons preloaded work without side effects\u003c/li\u003e\n" +
		"		\u003cli\u003eHover-to-preload, click-to-show provides perceived instant navigation\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9B.13 — fork()</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>fork()</code> preloads async work without applying it.
		<code>pending.commit()</code> applies the result. <code>pending.discard()</code> abandons it.
		Use case: preload on hover, apply on click — instant perceived performance.
	</p>

	<div class="build">
		<h2>fork() API</h2>
		<pre><code>{forkCode}</code></pre>

		<h2>Use cases</h2>
		<pre><code>{useCaseCode}</code></pre>

		<h2>Simulated preload demo</h2>
		<p>Hover the button to preload. Click to commit (show). Or discard to cancel:</p>

		<div class="demo-area">
			<div class="status-bar">
				Status: <strong>{preloadState}</strong>
				{#if preloadState === 'loading'}
					<span class="spinner"></span>
				{/if}
			</div>

			<div class="button-row">
				<button
					class="action-btn primary"
					onmouseenter={handleHover}
					onclick={handleCommit}
					disabled={preloadState === 'shown'}
				>
					{#if preloadState === 'idle'}
						Hover to preload
					{:else if preloadState === 'loading'}
						Loading...
					{:else if preloadState === 'ready'}
						Click to commit
					{:else}
						Committed!
					{/if}
				</button>

				{#if preloadState === 'ready'}
					<button class="action-btn secondary" onclick={handleDiscard}>
						Discard
					</button>
				{/if}

				{#if preloadState === 'shown'}
					<button class="action-btn secondary" onclick={handleReset}>
						Reset
					</button>
				{/if}
			</div>

			{#if preloadState === 'shown'}
				<div class="detail-card">
					<h4>{detailContent.title}</h4>
					<p class="detail-desc">{detailContent.description}</p>
					<ul class="spec-list">
						{#each detailContent.specs as spec}
							<li>{spec}</li>
						{/each}
					</ul>
					<p class="detail-price">{detailContent.price}</p>
				</div>
			{/if}
		</div>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>fork()</code> starts async work without applying it to the UI</li>
		<li><code>commit()</code> applies the preloaded result instantly</li>
		<li><code>discard()</code> abandons preloaded work without side effects</li>
		<li>Hover-to-preload, click-to-show provides perceived instant navigation</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.demo-area { display: flex; flex-direction: column; gap: var(--space-md); }
	.status-bar {
		display: flex; align-items: center; gap: var(--space-sm);
		font-size: var(--text-sm); color: var(--color-text-muted);
	}
	.spinner {
		display: inline-block; width: 1rem; height: 1rem;
		border: 2px solid var(--color-border); border-top-color: var(--color-text);
		border-radius: 50%; animation: spin 0.6s linear infinite;
	}
	.button-row { display: flex; gap: var(--space-sm); }
	.action-btn {
		padding: var(--space-sm) var(--space-lg); border: none;
		border-radius: var(--radius-md); font-weight: 600; cursor: pointer;
		font-size: var(--text-base);
	}
	.action-btn.primary { background: var(--color-text); color: var(--color-surface-1); }
	.action-btn.primary:disabled { opacity: 0.5; cursor: default; }
	.action-btn.secondary { background: var(--color-surface-2); color: var(--color-text); border: 1px solid var(--color-border); }
	.detail-card {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); animation: fadeIn 0.2s ease-out;
	}
	.detail-card h4 { margin: 0 0 var(--space-xs) 0; }
	.detail-desc { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }
	.spec-list { margin: var(--space-sm) 0; font-size: var(--text-sm); }
	.detail-price { margin: var(--space-sm) 0 0 0; font-size: var(--text-lg); font-weight: 700; }
	@keyframes spin { to { transform: rotate(360deg); } }
	@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }


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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
