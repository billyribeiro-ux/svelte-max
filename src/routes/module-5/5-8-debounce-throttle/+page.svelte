<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let query = $state('');
	let committed = $state('');
	let pending = $state(false);
	let commitCount = $state(0);

	const DEBOUNCE_MS = 300;

	$effect(() => {
		// Read query so the effect re-runs on every keystroke.
		const current = query;
		if (current === committed) {
			pending = false;
			return;
		}
		pending = true;
		const handle = setTimeout(() => {
			committed = current;
			pending = false;
			commitCount += 1;
		}, DEBOUNCE_MS);
		return () => clearTimeout(handle);
	});

	function clear(): void {
		query = '';
	}

	// --- Throttle ---
	function throttle<T extends (...args: any[]) => void>(fn: T, ms: number): T {
		let lastCall = 0;
		let timer: ReturnType<typeof setTimeout> | null = null;
		return ((...args: any[]) => {
			const now = Date.now();
			const remaining = ms - (now - lastCall);
			if (remaining <= 0) {
				if (timer) { clearTimeout(timer); timer = null; }
				lastCall = now;
				fn(...args);
			} else if (!timer) {
				timer = setTimeout(() => {
					lastCall = Date.now();
					timer = null;
					fn(...args);
				}, remaining);
			}
		}) as T;
	}

	let rawClicks = $state(0);
	let throttledClicks = $state(0);
	const THROTTLE_MS = 500;

	const handleThrottledClick = throttle(() => {
		throttledClicks += 1;
	}, THROTTLE_MS);

	function onRapidClick(): void {
		rawClicks += 1;
		handleThrottledClick();
	}

	function resetThrottle(): void {
		rawClicks = 0;
		throttledClicks = 0;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let query = $state('');\n" +
		"\tlet committed = $state('');\n" +
		"\tlet pending = $state(false);\n" +
		"\tlet commitCount = $state(0);\n" +
		"\n" +
		"\tconst DEBOUNCE_MS = 300;\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\t// Read query so the effect re-runs on every keystroke.\n" +
		"\t\tconst current = query;\n" +
		"\t\tif (current === committed) {\n" +
		"\t\t\tpending = false;\n" +
		"\t\t\treturn;\n" +
		"\t\t}\n" +
		"\t\tpending = true;\n" +
		"\t\tconst handle = setTimeout(() =\u003e {\n" +
		"\t\t\tcommitted = current;\n" +
		"\t\t\tpending = false;\n" +
		"\t\t\tcommitCount += 1;\n" +
		"\t\t}, DEBOUNCE_MS);\n" +
		"\t\treturn () =\u003e clearTimeout(handle);\n" +
		"\t});\n" +
		"\n" +
		"\tfunction clear(): void {\n" +
		"\t\tquery = '';\n" +
		"\t}\n" +
		"\n" +
		"\t// --- Throttle ---\n" +
		"\tfunction throttle\u003cT extends (...args: any[]) =\u003e void\u003e(fn: T, ms: number): T {\n" +
		"\t\tlet lastCall = 0;\n" +
		"\t\tlet timer: ReturnType\u003ctypeof setTimeout\u003e | null = null;\n" +
		"\t\treturn ((...args: any[]) =\u003e {\n" +
		"\t\t\tconst now = Date.now();\n" +
		"\t\t\tconst remaining = ms - (now - lastCall);\n" +
		"\t\t\tif (remaining \u003c= 0) {\n" +
		"\t\t\t\tif (timer) { clearTimeout(timer); timer = null; }\n" +
		"\t\t\t\tlastCall = now;\n" +
		"\t\t\t\tfn(...args);\n" +
		"\t\t\t} else if (!timer) {\n" +
		"\t\t\t\ttimer = setTimeout(() =\u003e {\n" +
		"\t\t\t\t\tlastCall = Date.now();\n" +
		"\t\t\t\t\ttimer = null;\n" +
		"\t\t\t\t\tfn(...args);\n" +
		"\t\t\t\t}, remaining);\n" +
		"\t\t\t}\n" +
		"\t\t}) as T;\n" +
		"\t}\n" +
		"\n" +
		"\tlet rawClicks = $state(0);\n" +
		"\tlet throttledClicks = $state(0);\n" +
		"\tconst THROTTLE_MS = 500;\n" +
		"\n" +
		"\tconst handleThrottledClick = throttle(() =\u003e {\n" +
		"\t\tthrottledClicks += 1;\n" +
		"\t}, THROTTLE_MS);\n" +
		"\n" +
		"\tfunction onRapidClick(): void {\n" +
		"\t\trawClicks += 1;\n" +
		"\t\thandleThrottledClick();\n" +
		"\t}\n" +
		"\n" +
		"\tfunction resetThrottle(): void {\n" +
		"\t\trawClicks = 0;\n" +
		"\t\tthrottledClicks = 0;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.8 — Debounce and throttle\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Firing a handler on every keystroke is expensive if it hits the network or\n" +
		"\t\tdoes heavy work. \u003ccode\u003eDebounce\u003c/code\u003e waits until the user stops typing for N ms, then fires once.\n" +
		"\t\t\u003ccode\u003eThrottle\u003c/code\u003e fires at most every N ms regardless. Both use \u003ccode\u003esetTimeout\u003c/code\u003e under the\n" +
		"\t\thood. Debounce suits search-as-you-type; throttle suits scroll or resize listeners.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\u003cspan class=\"label\"\u003eSearch (debounced 300ms)\u003c/span\u003e\n" +
		"\t\t\t\u003cinput type=\"text\" bind:value={query} placeholder=\"Type to search…\" /\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"k\"\u003eLive query\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"v\"\u003e{query || '—'}\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"k\"\u003eCommitted\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"v brand\"\u003e{committed || '—'}\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"k\"\u003eCommits\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"v brand\"\u003e{commitCount}\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"status\"\u003e\n" +
		"\t\t\t{#if pending}\n" +
		"\t\t\t\t\u003cspan class=\"pill pending\"\u003esearching…\u003c/span\u003e\n" +
		"\t\t\t{:else if committed}\n" +
		"\t\t\t\t\u003cspan class=\"pill idle\"\u003eidle\u003c/span\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"clear\" onclick={clear}\u003eClear\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eThrottle Demo\u003c/h3\u003e\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"build-desc\"\u003e\n" +
		"\t\t\tClick the button as fast as you can. The \u003cstrong\u003ethrottled handler\u003c/strong\u003e fires at most\n" +
		"\t\t\tonce every {THROTTLE_MS}ms, no matter how many raw clicks happen.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cbutton type=\"button\" class=\"rapid-btn\" onclick={onRapidClick}\u003e\n" +
		"\t\t\tClick rapidly!\n" +
		"\t\t\u003c/button\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"k\"\u003eRaw clicks\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"v\"\u003e{rawClicks}\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"k\"\u003eThrottled fires\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"v brand\"\u003e{throttledClicks}\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"stat\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"k\"\u003eThrottle window\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"v\"\u003e{THROTTLE_MS}ms\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"status\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"clear\" onclick={resetThrottle}\u003eReset\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003e$effect\u003c/code\u003e + \u003ccode\u003esetTimeout\u003c/code\u003e + a cleanup for debounce.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eReturn \u003ccode\u003e() =&gt; clearTimeout(handle)\u003c/code\u003e so stale timers never fire.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDebounce for typing; throttle for continuous streams like scroll.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003cstrong\u003eDebounce\u003c/strong\u003e waits until input is idle for N ms, then fires once.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003cstrong\u003eThrottle\u003c/strong\u003e fires at most once every N ms, regardless of input frequency.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThrottle is ideal for scroll, resize, or rapid-click handlers where you need periodic updates, not just the final value.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.8 — Debounce and throttle</h1>
	<p class="concept">
		<strong>Concept.</strong> Firing a handler on every keystroke is expensive if it hits the network or
		does heavy work. <code>Debounce</code> waits until the user stops typing for N ms, then fires once.
		<code>Throttle</code> fires at most every N ms regardless. Both use <code>setTimeout</code> under the
		hood. Debounce suits search-as-you-type; throttle suits scroll or resize listeners.
	</p>

	<div class="build">
		<label class="field">
			<span class="label">Search (debounced 300ms)</span>
			<input type="text" bind:value={query} placeholder="Type to search…" />
		</label>

		<div class="row">
			<div class="stat">
				<span class="k">Live query</span>
				<span class="v">{query || '—'}</span>
			</div>
			<div class="stat">
				<span class="k">Committed</span>
				<span class="v brand">{committed || '—'}</span>
			</div>
			<div class="stat">
				<span class="k">Commits</span>
				<span class="v brand">{commitCount}</span>
			</div>
		</div>

		<div class="status">
			{#if pending}
				<span class="pill pending">searching…</span>
			{:else if committed}
				<span class="pill idle">idle</span>
			{/if}
			<button type="button" class="clear" onclick={clear}>Clear</button>
		</div>
	</div>

	<h3>Throttle Demo</h3>
	<div class="build">
		<p class="build-desc">
			Click the button as fast as you can. The <strong>throttled handler</strong> fires at most
			once every {THROTTLE_MS}ms, no matter how many raw clicks happen.
		</p>

		<button type="button" class="rapid-btn" onclick={onRapidClick}>
			Click rapidly!
		</button>

		<div class="row">
			<div class="stat">
				<span class="k">Raw clicks</span>
				<span class="v">{rawClicks}</span>
			</div>
			<div class="stat">
				<span class="k">Throttled fires</span>
				<span class="v brand">{throttledClicks}</span>
			</div>
			<div class="stat">
				<span class="k">Throttle window</span>
				<span class="v">{THROTTLE_MS}ms</span>
			</div>
		</div>

		<div class="status">
			<button type="button" class="clear" onclick={resetThrottle}>Reset</button>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		Debounce and throttle are essential performance tools. Break them to feel the difference between uncontrolled and controlled event rates.
	</p>
	<ol class="experiments">
		<li><strong>Type in the search box without debounce.</strong> Remove the <code>setTimeout</code> logic and commit the query directly on every keystroke. If this were connected to a real API, you would fire a network request per character — typing "svelte" would send six requests in under a second. The UI also updates frantically, causing unnecessary re-renders and potential race conditions if responses arrive out of order.</li>
		<li><strong>Add debounce back (300ms).</strong> Restore the <code>$effect</code> with <code>setTimeout</code> and a 300ms delay. Now the committed value only updates after the user stops typing for 300 milliseconds. Six keystrokes produce one commit instead of six. The cleanup function <code>clearTimeout(handle)</code> cancels the previous timer each time the effect re-runs, ensuring only the final pause triggers the action.</li>
		<li><strong>Click the rapid-click button without throttle.</strong> Replace the throttled handler with a raw increment. Click as fast as you can — every single click registers. For scroll or resize events, this means 60+ handler executions per second, which can cause layout thrashing, dropped frames, and a frozen UI on slower devices.</li>
		<li><strong>Add throttle back (500ms).</strong> Restore the throttled handler. Now no matter how fast you click, the handler fires at most once every 500 milliseconds. The raw click count climbs rapidly, but the throttled count rises at a steady, controlled pace. Always clean up throttle timers when the component is destroyed to prevent leaked callbacks.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		Debounce delays execution until a burst of activity stops. The classic implementation uses <code>setTimeout</code>: each new event clears the previous timer and starts a fresh one. Only when the delay expires without interruption does the handler fire. In Svelte, the idiomatic pattern is a <code>$effect</code> that reads the reactive input, sets a timeout, and returns a cleanup that clears it. The effect's automatic cleanup on re-run handles the "cancel previous timer" logic for free.
	</p>
	<p class="prose">
		Throttle limits execution to at most once per time window, regardless of how many events arrive. Unlike debounce, throttle guarantees periodic updates during sustained activity — the user sees intermediate feedback (a scroll position indicator, a partial result) rather than waiting for the activity to stop entirely. A trailing-edge throttle also fires once after the last event, ensuring the final state is always captured. Throttle is the right choice for scroll, resize, mousemove, and any high-frequency continuous event.
	</p>
	<p class="prose">
		Both techniques rely on <code>setTimeout</code>, which means both create pending callbacks that outlive the component if not cleaned up. In Svelte, always return a cleanup function from <code>$effect</code> that calls <code>clearTimeout</code>. For throttle, clear any pending trailing-edge timer in the cleanup as well. Forgetting this step leads to handlers that fire after the component is destroyed, writing to stale state or causing errors in the console. Timer hygiene is non-negotiable in component-based architectures.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-9-callback-props">5.9 — Callback props</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
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
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	input {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-base);
		min-block-size: 44px;
	}
	input:focus {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.k {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.v {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.v.brand {
		color: var(--color-brand);
	}
	.status {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		padding: 2px var(--space-sm);
		border-radius: var(--radius-full);
		font-family: var(--font-mono);
	}
	.pill.pending {
		background: var(--color-warning);
		color: var(--color-surface);
	}
	.pill.idle {
		background: var(--color-success);
		color: var(--color-surface);
	}
	.clear {
		margin-inline-start: auto;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 36px;
	}
	.build-desc {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}
	.build-desc strong {
		color: var(--color-text);
	}
	.rapid-btn {
		align-self: flex-start;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		min-block-size: 44px;
		transition: transform 0.1s ease;
	}
	.rapid-btn:active {
		transform: scale(0.96);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.row {
			grid-template-columns: repeat(3, 1fr);
		}
	}

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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
