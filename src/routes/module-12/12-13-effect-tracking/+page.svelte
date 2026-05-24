<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let count = $state(0);
	let logs = $state<string[]>([]);

	function log(msg: string) {
		logs = [msg, ...logs].slice(0, 12);
	}

	// A function that checks whether it's called inside a reactive context
	function safeSubscribe(label: string): string {
		const isTracking = $effect.tracking();
		log(`safeSubscribe("${label}"): tracking = ${isTracking}`);
		if (!isTracking) {
			log(`  WARNING: "${label}" called outside reactive context!`);
		}
		return `${label} (tracking: ${isTracking})`;
	}

	// Called inside a $derived — reactive context (tracking = true)
	let derivedResult = $derived(safeSubscribe('derived-call'));

	// Called at top level during setup — NOT a reactive context (tracking = false)
	const setupResult = safeSubscribe('setup-call');

	function handleClick() {
		count += 1;
		// Called inside an event handler — NOT a reactive context
		safeSubscribe('click-handler');
	}

	$effect(() => {
		// Called inside $effect — reactive context (tracking = true)
		safeSubscribe(`effect-call (count=${count})`);
	});

	function clearLogs() {
		logs = [];
	}

	/* -- Complete code for CodeCanvas -- */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  let count = $state(0);\n" +
		"  let logs = $state<string[]>([]);\n" +
		"\n" +
		"  function log(msg: string) {\n" +
		"    logs = [msg, ...logs].slice(0, 12);\n" +
		"  }\n" +
		"\n" +
		"  // A function that checks whether it's inside a reactive context\n" +
		"  function safeSubscribe(label: string): string {\n" +
		"    const isTracking = $effect.tracking();\n" +
		"    log(`safeSubscribe(\"${label}\"): tracking = ${isTracking}`);\n" +
		"    if (!isTracking) {\n" +
		"      log(`  WARNING: \"${label}\" called outside reactive context!`);\n" +
		"    }\n" +
		"    return `${label} (tracking: ${isTracking})`;\n" +
		"  }\n" +
		"\n" +
		"  // Inside $derived — reactive context (tracking = true)\n" +
		"  let derivedResult = $derived(safeSubscribe('derived-call'));\n" +
		"\n" +
		"  // Top level setup — NOT reactive (tracking = false)\n" +
		"  const setupResult = safeSubscribe('setup-call');\n" +
		"\n" +
		"  function handleClick() {\n" +
		"    count += 1;\n" +
		"    // Event handler — NOT reactive\n" +
		"    safeSubscribe('click-handler');\n" +
		"  }\n" +
		"\n" +
		"  $effect(() => {\n" +
		"    // Inside $effect — reactive context (tracking = true)\n" +
		"    safeSubscribe(`effect-call (count=${count})`);\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>$effect.tracking()</h1>\n" +
		"  <button onclick={handleClick}>count: {count}</button>\n" +
		"  <p>Derived: {derivedResult}</p>\n" +
		"  <p>Setup: {setupResult}</p>\n" +
		"  <div class=\"log\">\n" +
		"    {#each logs as entry}\n" +
		"      <code>{entry}</code>\n" +
		"    {/each}\n" +
		"  </div>\n" +
		"</section>";
</script>

<section class="page">
	<h1>12.13 — <code>$effect.tracking()</code></h1>

	<p class="prose">
		Think of a security badge system in an office building. Some rooms require you to scan
		your badge before entering — if you forget, an alarm sounds. <code>$effect.tracking()</code>
		is that badge scanner for Svelte's reactive system. It returns <code>true</code> when your
		code is running inside a "tracked" room (an <code>$effect</code>, a <code>$derived</code>,
		or the template) and <code>false</code> when it is running in the lobby (component setup,
		event handlers, <code>setTimeout</code> callbacks). This lets library authors build
		functions that warn or behave differently depending on whether they are being observed
		by Svelte's reactivity engine.
	</p>

	<p class="prose">
		The primary use case is for library authors building custom reactive utilities. If you
		create a function that sets up a subscription or creates a reactive binding, you want to
		know whether Svelte will actually track the result. If the function is called outside a
		reactive context, the subscription might leak or the reactive value will never update
		the UI. <code>$effect.tracking()</code> lets you detect this and warn the consumer.
	</p>

	<h2>Where tracking is true vs false</h2>

	<div class="build">
		<pre>{`// Component setup — tracking: false
console.log($effect.tracking()); // false

$effect(() => {
  // Inside $effect — tracking: true
  console.log($effect.tracking()); // true
});

let x = $derived.by(() => {
  // Inside $derived — tracking: true
  console.log($effect.tracking()); // true
  return count * 2;
});

function handleClick() {
  // Event handler — tracking: false
  console.log($effect.tracking()); // false
}

// In the template — tracking: true
// <p>{$effect.tracking()}</p>  <!-- renders "true" -->`}</pre>
	</div>

	<h2>Live demo</h2>

	<p class="prose">
		The function <code>safeSubscribe</code> below calls <code>$effect.tracking()</code> and
		logs whether it was called inside a reactive context. Watch the log panel as the page loads
		and as you click the button — setup and event handler calls show <code>false</code>, while
		<code>$derived</code> and <code>$effect</code> calls show <code>true</code>.
	</p>

	<div class="build">
		<div class="stats">
			<div class="stat">
				<span class="label">count</span>
				<span class="value">{count}</span>
			</div>
			<div class="stat">
				<span class="label">derived result</span>
				<span class="value result-text">{derivedResult}</span>
			</div>
			<div class="stat">
				<span class="label">setup result</span>
				<span class="value result-text">{setupResult}</span>
			</div>
			<div class="stat">
				<span class="label">template tracking</span>
				<span class="value">{$effect.tracking()}</span>
			</div>
		</div>

		<div class="controls">
			<button type="button" onclick={handleClick}>count++ (event handler)</button>
			<button type="button" class="ghost" onclick={clearLogs}>clear log</button>
		</div>

		<div class="log" aria-label="Tracking log">
			<h4>Call log</h4>
			{#if logs.length === 0}
				<p class="empty">Interact with the demo to see tracking results.</p>
			{:else}
				<ul>
					{#each logs as entry (entry)}
						<li>
							<code class:warn={entry.includes('WARNING')}>{entry}</code>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<h2>The library author pattern</h2>

	<div class="build">
		<CodeCanvas
			filename="createCounter.svelte.ts"
			code={`import { createSubscriber } from 'svelte/reactivity';

// A reactive utility that only subscribes when tracked
export function createExternalCounter() {
  let value = 0;
  let listeners = new Set<() => void>();

  const subscribe = createSubscriber((update) => {
    listeners.add(update);
    return () => listeners.delete(update);
  });

  return {
    get count() {
      // createSubscriber uses $effect.tracking() internally
      // to only subscribe when inside a reactive context
      subscribe();
      return value;
    },
    increment() {
      value += 1;
      listeners.forEach(fn => fn());
    }
  };
}`}
		/>

		<p class="prose">
			Svelte's own <code>createSubscriber</code> utility (from <code>svelte/reactivity</code>)
			uses <code>$effect.tracking()</code> internally. When a getter is called inside an
			<code>$effect</code> or template, it subscribes for updates. When called in an event
			handler, it just returns the value without subscribing — no leaked listeners, no wasted
			work.
		</p>
	</div>

	<h2>Break it on purpose</h2>

	<ol class="experiments">
		<li>
			<strong>Call a tracking-aware function inside <code>setTimeout</code>.</strong> Even
			if the <code>setTimeout</code> is inside an <code>$effect</code>, the callback runs
			asynchronously — outside the tracking context. <code>$effect.tracking()</code> returns
			<code>false</code> inside the timeout because Svelte finished tracking the effect's
			synchronous body before the callback fires.
		</li>
		<li>
			<strong>Read <code>$effect.tracking()</code> directly in the template markup.</strong>
			It renders <code>true</code> — the template is itself a reactive tracking context.
			Svelte's template expressions are compiled into effects internally, which is why
			<code>{'{count}'}</code> in your markup updates when <code>count</code> changes.
		</li>
		<li>
			<strong>Call <code>$effect.tracking()</code> inside a plain function called from an <code>onclick</code>.</strong>
			It returns <code>false</code>. Event handlers are not reactive contexts — they run
			imperatively in response to user interaction, not as part of Svelte's dependency
			tracking graph. This is expected and correct behavior.
		</li>
		<li>
			<strong>Use <code>$effect.tracking()</code> to conditionally create a subscription.</strong>
			Write <code>if ($effect.tracking()) {'{ /* subscribe */ }'}</code> in a getter. When
			the getter is read in a template, the subscription is created and the UI updates.
			When the getter is read in a click handler, no subscription is created — the value
			is just returned as-is. This is the exact pattern <code>createSubscriber</code> uses.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		<code>$effect.tracking()</code> is a boolean signal that tells you whether the current
		code is executing inside a reactive tracking context — an <code>$effect</code>, a
		<code>$derived</code>, or the component template. It returns <code>false</code> during
		component setup, in event handlers, and inside asynchronous callbacks like
		<code>setTimeout</code>. This distinction is critical for writing reactive utilities
		that behave correctly in every calling context.
	</p>

	<p class="prose">
		The primary consumer of this rune is library code. When you build a reactive abstraction
		that wraps an external data source — a WebSocket, an event emitter, or a browser API — you
		need to know whether Svelte will observe the return value. If tracking is active, you set
		up a subscription so the UI updates. If tracking is inactive, you skip the subscription
		to avoid leaked listeners. Svelte's own <code>createSubscriber</code> utility is built
		on exactly this pattern.
	</p>

	<p class="prose">
		For application developers, <code>$effect.tracking()</code> is rarely needed directly.
		But understanding that it exists clarifies <em>why</em> reactive values behave differently
		in different contexts — why a <code>$derived</code> value updates the template but reading
		the same value in a click handler does not trigger a re-render. The reactive system only
		tracks dependencies synchronously within tracked scopes, and <code>$effect.tracking()</code>
		is the mechanism that makes this boundary explicit.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-12/project">Module 12 Project</a> — apply performance patterns to a
		production-grade application.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
		line-height: 1.5;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: var(--space-sm);
		margin-block-end: var(--space-md);
	}

	.stat {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.stat .label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat .value {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
		font-variant-numeric: tabular-nums;
		font-family: var(--font-mono);
	}

	.stat .result-text {
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-block-end: var(--space-md);
	}

	.controls button {
		font: inherit;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: var(--color-surface);
		cursor: pointer;
		font-weight: 600;
	}

	.controls button:hover { opacity: 0.9; }

	.controls button.ghost {
		background: transparent;
		color: var(--color-text-muted);
	}

	.controls button.ghost:hover {
		background: var(--color-surface-1);
		color: var(--color-text);
	}

	.log {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.log h4 {
		margin: 0 0 var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.log ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		max-block-size: 16rem;
		overflow: auto;
	}

	.log li { font-size: var(--text-xs); }

	.log li code {
		display: block;
		background: var(--color-surface);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		font-family: var(--font-mono);
	}

	.log li code.warn {
		color: var(--color-warning);
		border-color: var(--color-warning);
	}

	.log .empty {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-style: italic;
	}

	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	@media (min-width: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}
</style>
