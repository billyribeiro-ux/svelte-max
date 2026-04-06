<script lang="ts">
	let eventLog = $state<string[]>([]);

	function simulateEvent(name: string) {
		eventLog = [...eventLog, `${new Date().toLocaleTimeString()} — ${name} dispatched`];
	}

	function clearLog() {
		eventLog = [];
	}

	const stepperExample = `<!-- MyStepper.svelte -->
\u003csvelte:options customElement="my-stepper" /\u003e

\u003cscript lang="ts"\u003e
  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
  }

  let { value = 0, min = 0, max = 100, step = 1 }: Props = $props();
  let current = $state(value);

  function inc() {
    if (current + step <= max) {
      current += step;
      $host().dispatchEvent(
        new CustomEvent('increment', {
          detail: { value: current },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  function dec() {
    if (current - step >= min) {
      current -= step;
      $host().dispatchEvent(
        new CustomEvent('decrement', {
          detail: { value: current },
          bubbles: true,
          composed: true
        })
      );
    }
  }
\u003c/script\u003e

<div class="stepper">
  <button onclick={dec} disabled={current <= min}>-</button>
  <output>{current}</output>
  <button onclick={inc} disabled={current >= max}>+</button>
</div>`;

	const consumingExample = `<my-stepper value="10" min="0" max="50" step="5"></my-stepper>

\u003cscript type="module"\u003e
  import './my-stepper.js';

  const stepper = document.querySelector('my-stepper');

  stepper.addEventListener('increment', (e) => {
    console.log('Incremented to:', e.detail.value);
  });

  stepper.addEventListener('decrement', (e) => {
    console.log('Decremented to:', e.detail.value);
  });
\u003c/script\u003e`;
</script>

<section class="page">
	<h1>14.4 — The $host() Rune</h1>

	<p class="concept">
		The <strong><code>$host()</code></strong> rune gives you a reference to the custom element's
		host node from inside the component. Its primary use case is <strong>dispatching
		CustomEvents</strong> that bubble out of the shadow DOM so consumers can listen with
		<code>addEventListener</code>. It only works in components compiled with the
		<code>customElement</code> option.
	</p>

	<h3>How It Works</h3>
	<ul>
		<li><code>$host()</code> returns the <code>HTMLElement</code> instance (the custom element itself)</li>
		<li>You call <code>$host().dispatchEvent(new CustomEvent(...))</code> to emit events</li>
		<li>Events can carry typed payloads via the <code>detail</code> property</li>
		<li>Set <code>bubbles: true</code> and <code>composed: true</code> to cross shadow DOM boundaries</li>
		<li>Only available inside components with <code>customElement</code> set — errors otherwise</li>
	</ul>

	<h3>Mini-Build: A Stepper Custom Element</h3>
	<div class="build">
		<p class="concept">
			This <code>&lt;my-stepper&gt;</code> component dispatches <code>increment</code> and
			<code>decrement</code> custom events. The parent page listens for them without any
			framework coupling.
		</p>

		<pre><code>{stepperExample}</code></pre>

		<h3>Consuming in Plain HTML</h3>
		<pre><code>{consumingExample}</code></pre>
	</div>

	<h3>Try the Event Flow</h3>
	<p class="concept">
		Since we cannot use <code>$host()</code> outside a custom element context, here is a
		simulation of how the events would flow. Click the buttons to see events logged.
	</p>

	<div class="build">
		<div class="stepper-demo">
			<button class="step-btn" onclick={() => simulateEvent('decrement')}>-</button>
			<span class="step-value">Simulated Stepper</span>
			<button class="step-btn" onclick={() => simulateEvent('increment')}>+</button>
		</div>

		<div class="event-log">
			<div class="log-header">
				<strong>Event Log</strong>
				<button class="clear-btn" onclick={clearLog}>Clear</button>
			</div>
			{#if eventLog.length === 0}
				<p class="concept">No events yet. Click the stepper buttons above.</p>
			{:else}
				{#each eventLog as entry}
					<div class="log-entry"><code>{entry}</code></div>
				{/each}
			{/if}
		</div>
	</div>

	<h3>Key Points</h3>
	<ul>
		<li><code>$host()</code> is a compile-time rune — it has zero runtime cost</li>
		<li>Use <code>composed: true</code> so events escape the shadow root</li>
		<li>Type the <code>detail</code> property for consumer-side type safety</li>
		<li>Prefer CustomEvents over callback props for framework-agnostic interop</li>
	</ul>

	<h3>What you learned</h3>
	<ul>
		<li><code>$host()</code> returns a reference to the custom element's host node from inside the component.</li>
		<li>Use <code>$host().dispatchEvent(new CustomEvent(...))</code> to emit events that cross shadow DOM boundaries.</li>
		<li>Set <code>bubbles: true</code> and <code>composed: true</code> so events propagate to parent DOM listeners.</li>
		<li><code>$host()</code> is a compile-time rune with zero runtime cost, available only in custom element components.</li>
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

	.stepper-demo {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		justify-content: center;
	}
	.step-btn {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		border: 1px solid var(--color-border);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-size: var(--text-base);
		cursor: pointer;
		display: grid;
		place-items: center;
	}
	.step-btn:hover { background: var(--color-primary); }
	.step-value { font-weight: 600; color: var(--color-text); }

	.event-log {
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		max-height: 12rem;
		overflow-y: auto;
	}
	.log-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-block-end: var(--space-sm);
	}
	.log-entry {
		padding: var(--space-xs) 0;
		border-block-end: 1px solid var(--color-border);
		font-size: var(--text-sm);
	}
	.clear-btn {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-sm);
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
