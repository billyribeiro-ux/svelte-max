<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>Return a function from <code>$effect</code> to register cleanup logic.</li>
		<li>Cleanup runs before the effect re-runs <em>and</em> when the component is destroyed.</li>
		<li>
			Any long-lived resource — <code>setInterval</code>, <code>addEventListener</code>, sockets,
			observers — needs cleanup.
		</li>
		<li>
			If you forget the cleanup, switching to another page leaves the interval running — you can
			verify this by doing it and watching the tab's CPU.
		</li>
		<li>DevTools Performance and Memory panels will surface leaks caused by missing cleanups.</li>
	</ul>
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

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

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
		stroke-width: 8;
	}

	.progress {
		fill: none;
		stroke: var(--color-brand);
		stroke-width: 8;
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

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
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
</style>
