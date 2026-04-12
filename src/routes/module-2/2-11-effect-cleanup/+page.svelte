<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let seconds = $state(10);
	let running = $state(false);

	$effect(() => {
		if (!running) return;
		if (seconds === 0) {
			running = false;
			return;
		}
		const id = setInterval(() => {
			seconds -= 1;
		}, 1000);
		return () => clearInterval(id);
	});

	function toggle() {
		if (seconds === 0) seconds = 10;
		running = !running;
	}

	function reset() {
		running = false;
		seconds = 10;
	}

	const progress = $derived(seconds / 10);
	const circumference = 2 * Math.PI * 52;
	const dashOffset = $derived(circumference * (1 - progress));

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let seconds = $state(10);\n" +
		"\tlet running = $state(false);\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tif (!running) return;\n" +
		"\t\tif (seconds === 0) {\n" +
		"\t\t\trunning = false;\n" +
		"\t\t\treturn;\n" +
		"\t\t}\n" +
		"\t\tconst id = setInterval(() =\u003e {\n" +
		"\t\t\tseconds -= 1;\n" +
		"\t\t}, 1000);\n" +
		"\t\treturn () =\u003e clearInterval(id);\n" +
		"\t});\n" +
		"\n" +
		"\tfunction toggle() {\n" +
		"\t\tif (seconds === 0) seconds = 10;\n" +
		"\t\trunning = !running;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction reset() {\n" +
		"\t\trunning = false;\n" +
		"\t\tseconds = 10;\n" +
		"\t}\n" +
		"\n" +
		"\tconst progress = $derived(seconds / 10);\n" +
		"\tconst circumference = 2 * Math.PI * 52;\n" +
		"\tconst dashOffset = $derived(circumference * (1 - progress));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.11 — Effect cleanup\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tLong-lived side effects — timers, subscriptions, event listeners, WebSocket connections — must\n" +
		"\t\tclean themselves up when the component unmounts, and also when the effect re-runs due to a\n" +
		"\t\tdependency change. \u003ccode\u003e$effect\u003c/code\u003e supports this by letting you return a cleanup function:\n" +
		"\t\t\u003ccode\u003e$effect(() =&gt; &#123; const id = setInterval(...); return () =&gt; clearInterval(id); &#125;)\u003c/code\u003e.\n" +
		"\t\tSvelte calls that cleanup before the effect re-runs and once more when the component is destroyed.\n" +
		"\t\tIf you forget it, you leak: the interval keeps firing, the listener keeps handling, the socket\n" +
		"\t\tkeeps consuming battery. You can prove leaks exist by opening DevTools Performance → Memory and\n" +
		"\t\twatching heap growth or CPU activity climb after navigating away.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003cdiv class=\"timer\"\u003e\n" +
		"\t\t\t\u003csvg viewBox=\"0 0 120 120\" aria-hidden=\"true\"\u003e\n" +
		"\t\t\t\t\u003ccircle cx=\"60\" cy=\"60\" r=\"52\" class=\"track\" /\u003e\n" +
		"\t\t\t\t\u003ccircle\n" +
		"\t\t\t\t\tcx=\"60\"\n" +
		"\t\t\t\t\tcy=\"60\"\n" +
		"\t\t\t\t\tr=\"52\"\n" +
		"\t\t\t\t\tclass=\"progress\"\n" +
		"\t\t\t\t\tstroke-dasharray={circumference}\n" +
		"\t\t\t\t\tstroke-dashoffset={dashOffset}\n" +
		"\t\t\t\t/\u003e\n" +
		"\t\t\t\u003c/svg\u003e\n" +
		"\t\t\t\u003cspan class=\"digits\"\u003e{seconds}\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={toggle}\u003e\n" +
		"\t\t\t\t{running ? 'Pause' : seconds === 0 ? 'Restart' : 'Start'}\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"secondary\" onclick={reset}\u003eReset\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tThe effect creates the interval when \u003ccode\u003erunning\u003c/code\u003e flips true and returns a cleanup\n" +
		"\t\t\tthat clears it. Pausing, resetting, or unmounting all trigger cleanup — no leaks.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eProve it\u003c/h3\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tTo see a leak: comment out the cleanup \u003ccode\u003ereturn () =&gt; clearInterval(id)\u003c/code\u003e, start the\n" +
		"\t\ttimer, navigate to another page, then check DevTools &rarr; Performance &rarr; Memory. The timer\n" +
		"\t\tkeeps running — CPU never drops. Uncomment the cleanup and repeat — CPU returns to idle immediately.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eReturn a function from \u003ccode\u003e$effect\u003c/code\u003e to register cleanup logic.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eCleanup runs before the effect re-runs \u003cem\u003eand\u003c/em\u003e when the component is destroyed.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tAny long-lived resource — \u003ccode\u003esetInterval\u003c/code\u003e, \u003ccode\u003eaddEventListener\u003c/code\u003e, sockets,\n" +
		"\t\t\tobservers — needs cleanup.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tIf you forget the cleanup, switching to another page leaves the interval running — you can\n" +
		"\t\t\tverify this by doing it and watching the tab's CPU.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDevTools Performance and Memory panels will surface leaks caused by missing cleanups.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.11 — Effect cleanup</h1>

	<p class="concept">
		Long-lived side effects — timers, subscriptions, event listeners, WebSocket connections — must
		clean themselves up when the component unmounts, and also when the effect re-runs due to a
		dependency change. <code>$effect</code> supports this by letting you return a cleanup function:
		<code>$effect(() =&gt; &#123; const id = setInterval(...); return () =&gt; clearInterval(id); &#125;)</code>.
		Svelte calls that cleanup before the effect re-runs and once more when the component is destroyed.
		If you forget it, you leak: the interval keeps firing, the listener keeps handling, the socket
		keeps consuming battery. You can prove leaks exist by opening DevTools Performance → Memory and
		watching heap growth or CPU activity climb after navigating away.
	</p>

	<div class="demo">
		<div class="timer">
			<svg viewBox="0 0 120 120" aria-hidden="true">
				<circle cx="60" cy="60" r="52" class="track" />
				<circle
					cx="60"
					cy="60"
					r="52"
					class="progress"
					stroke-dasharray={circumference}
					stroke-dashoffset={dashOffset}
				/>
			</svg>
			<span class="digits">{seconds}</span>
		</div>

		<div class="controls">
			<button type="button" onclick={toggle}>
				{running ? 'Pause' : seconds === 0 ? 'Restart' : 'Start'}
			</button>
			<button type="button" class="secondary" onclick={reset}>Reset</button>
		</div>

		<p class="hint">
			The effect creates the interval when <code>running</code> flips true and returns a cleanup
			that clears it. Pausing, resetting, or unmounting all trigger cleanup — no leaks.
		</p>
	</div>

	<h3>Prove it</h3>
	<p class="concept">
		To see a leak: comment out the cleanup <code>return () =&gt; clearInterval(id)</code>, start the
		timer, navigate to another page, then check DevTools &rarr; Performance &rarr; Memory. The timer
		keeps running — CPU never drops. Uncomment the cleanup and repeat — CPU returns to idle immediately.
	</p>

	<h2>Break it on purpose</h2>

	<p class="prose">
		Deliberately leak resources and then fix them to build an instinct for cleanup. Try each experiment, observe the leak, then restore the cleanup.
	</p>

	<ol class="experiments">
		<li>
			<strong>Start a <code>setInterval</code> without cleanup.</strong> Comment out the
			<code>return () => clearInterval(id)</code> line, start the timer, navigate away,
			then come back. Open DevTools and watch — the old interval is still firing. Navigate
			away five more times and you have five intervals stacking on top of each other, all
			consuming CPU.
		</li>
		<li>
			<strong>Add a return function that calls <code>clearInterval</code>.</strong>
			Uncomment the cleanup. Now start the timer and navigate away — the timer stops
			immediately. Come back, start it again, navigate away — still clean. A single
			interval, properly cleared, every time.
		</li>
		<li>
			<strong><code>addEventListener</code> without cleanup.</strong> Add
			<code>window.addEventListener('resize', handler)</code> inside an effect with no
			cleanup return. Every time the effect re-runs (because a dependency changed), a new
			listener stacks on top of the old one. Resize the window and you see the handler
			fire multiple times per resize event.
		</li>
		<li>
			<strong>Return cleanup that calls <code>removeEventListener</code>.</strong> Return
			<code>() => window.removeEventListener('resize', handler)</code> from the effect.
			Now each re-run removes the old listener before adding the new one. Resize the
			window — the handler fires exactly once. Clean.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		Every <code>$effect</code> that allocates a long-lived resource MUST return a cleanup
		function. This is the single most important pattern in effect-based programming.
		Timers, event listeners, WebSocket connections, IntersectionObservers, ResizeObservers
		— anything that persists beyond a single function call needs explicit teardown. The
		cleanup function you return is called in two situations: before the effect re-runs
		(because a dependency changed) and when the component is destroyed.
	</p>

	<p class="prose">
		Without cleanup, resources stack. Each time the effect re-runs, it creates a new
		interval or listener without removing the old one. Five re-runs means five intervals
		firing simultaneously. Navigating away means those intervals keep running in the
		background, consuming CPU and memory. This is a leak, and it is one of the most
		common bugs in reactive UI code. DevTools Performance and Memory panels will surface
		these leaks if you know where to look.
	</p>

	<p class="prose">
		The cleanup pattern is always the same: allocate the resource, return a function that
		releases it. <code>setInterval</code> pairs with <code>clearInterval</code>.
		<code>addEventListener</code> pairs with <code>removeEventListener</code>.
		<code>new WebSocket()</code> pairs with <code>socket.close()</code>. Build this as a
		reflex: if you create something persistent in an effect, you return its destructor.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-12-reactive-map-set">2.12 — SvelteMap and SvelteSet</a> — reactive
		wrappers for Map and Set that plug into the dependency graph.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 56rem;
		margin-inline: auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
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
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
		padding: var(--space-xl);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.timer {
		position: relative;
		inline-size: 12rem;
		block-size: 12rem;
	}

	.timer svg {
		inline-size: 100%;
		block-size: 100%;
		transform: rotate(-90deg);
	}

	.track {
		fill: none;
		stroke: var(--color-surface-2);
		stroke-inline-size: 8;
	}

	.progress {
		fill: none;
		stroke: var(--color-brand);
		stroke-inline-size: 8;
		stroke-linecap: round;
		transition: stroke-dashoffset var(--dur-slow) var(--ease-out);
	}

	.digits {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		font-family: var(--font-mono);
		font-size: var(--text-hero);
		color: var(--color-text);
		font-variant-numeric: tabular-nums;
	}

	.controls {
		display: flex;
		gap: var(--space-sm);
	}

	button {
		font: inherit;
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}

	button:hover {
		background: var(--color-brand-dim);
	}

	button.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	button.secondary:hover {
		background: var(--color-surface);
	}

	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-align: center;
		max-inline-size: 36rem;
	}

	@media (min-inline-size: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.timer {
			inline-size: 14rem;
			block-size: 14rem;
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
	@media (min-inline-size: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
