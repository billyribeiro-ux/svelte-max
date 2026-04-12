<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let eventLog = $state\u003cstring[]\u003e([]);\n" +
		"\n" +
		"	function simulateEvent(name: string) {\n" +
		"		eventLog = [...eventLog, `${new Date().toLocaleTimeString()} — ${name} dispatched`];\n" +
		"	}\n" +
		"\n" +
		"	function clearLog() {\n" +
		"		eventLog = [];\n" +
		"	}\n" +
		"\n" +
		"	const stepperExample = `\u003c!-- MyStepper.svelte --\u003e\n" +
		"\\u003csvelte:options customElement=\"my-stepper\" /\\u003e\n" +
		"\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  interface Props {\n" +
		"    value?: number;\n" +
		"    min?: number;\n" +
		"    max?: number;\n" +
		"    step?: number;\n" +
		"  }\n" +
		"\n" +
		"  let { value = 0, min = 0, max = 100, step = 1 }: Props = $props();\n" +
		"  let current = $state(value);\n" +
		"\n" +
		"  function inc() {\n" +
		"    if (current + step \u003c= max) {\n" +
		"      current += step;\n" +
		"      $host().dispatchEvent(\n" +
		"        new CustomEvent('increment', {\n" +
		"          detail: { value: current },\n" +
		"          bubbles: true,\n" +
		"          composed: true\n" +
		"        })\n" +
		"      );\n" +
		"    }\n" +
		"  }\n" +
		"\n" +
		"  function dec() {\n" +
		"    if (current - step \u003e= min) {\n" +
		"      current -= step;\n" +
		"      $host().dispatchEvent(\n" +
		"        new CustomEvent('decrement', {\n" +
		"          detail: { value: current },\n" +
		"          bubbles: true,\n" +
		"          composed: true\n" +
		"        })\n" +
		"      );\n" +
		"    }\n" +
		"  }\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cdiv class=\"stepper\"\u003e\n" +
		"  \u003cbutton onclick={dec} disabled={current \u003c= min}\u003e-\u003c/button\u003e\n" +
		"  \u003coutput\u003e{current}\u003c/output\u003e\n" +
		"  \u003cbutton onclick={inc} disabled={current \u003e= max}\u003e+\u003c/button\u003e\n" +
		"\u003c/div\u003e`;\n" +
		"\n" +
		"	const consumingExample = `\u003cmy-stepper value=\"10\" min=\"0\" max=\"50\" step=\"5\"\u003e\u003c/my-stepper\u003e\n" +
		"\n" +
		"\\u003cscript type=\"module\"\\u003e\n" +
		"  import './my-stepper.js';\n" +
		"\n" +
		"  const stepper = document.querySelector('my-stepper');\n" +
		"\n" +
		"  stepper.addEventListener('increment', (e) =\u003e {\n" +
		"    console.log('Incremented to:', e.detail.value);\n" +
		"  });\n" +
		"\n" +
		"  stepper.addEventListener('decrement', (e) =\u003e {\n" +
		"    console.log('Decremented to:', e.detail.value);\n" +
		"  });\n" +
		"\\u003c/script\\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e14.4 — The $host() Rune\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		The \u003cstrong\u003e\u003ccode\u003e$host()\u003c/code\u003e\u003c/strong\u003e rune gives you a reference to the custom element's\n" +
		"		host node from inside the component. Its primary use case is \u003cstrong\u003edispatching\n" +
		"		CustomEvents\u003c/strong\u003e that bubble out of the shadow DOM so consumers can listen with\n" +
		"		\u003ccode\u003eaddEventListener\u003c/code\u003e. It only works in components compiled with the\n" +
		"		\u003ccode\u003ecustomElement\u003c/code\u003e option.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eHow It Works\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$host()\u003c/code\u003e returns the \u003ccode\u003eHTMLElement\u003c/code\u003e instance (the custom element itself)\u003c/li\u003e\n" +
		"		\u003cli\u003eYou call \u003ccode\u003e$host().dispatchEvent(new CustomEvent(...))\u003c/code\u003e to emit events\u003c/li\u003e\n" +
		"		\u003cli\u003eEvents can carry typed payloads via the \u003ccode\u003edetail\u003c/code\u003e property\u003c/li\u003e\n" +
		"		\u003cli\u003eSet \u003ccode\u003ebubbles: true\u003c/code\u003e and \u003ccode\u003ecomposed: true\u003c/code\u003e to cross shadow DOM boundaries\u003c/li\u003e\n" +
		"		\u003cli\u003eOnly available inside components with \u003ccode\u003ecustomElement\u003c/code\u003e set — errors otherwise\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: A Stepper Custom Element\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			This \u003ccode\u003e&lt;my-stepper&gt;\u003c/code\u003e component dispatches \u003ccode\u003eincrement\u003c/code\u003e and\n" +
		"			\u003ccode\u003edecrement\u003c/code\u003e custom events. The parent page listens for them without any\n" +
		"			framework coupling.\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003cpre\u003e\u003ccode\u003e{stepperExample}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch3\u003eConsuming in Plain HTML\u003c/h3\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{consumingExample}\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eTry the Event Flow\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Since we cannot use \u003ccode\u003e$host()\u003c/code\u003e outside a custom element context, here is a\n" +
		"		simulation of how the events would flow. Click the buttons to see events logged.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"stepper-demo\"\u003e\n" +
		"			\u003cbutton class=\"step-btn\" onclick={() =\u003e simulateEvent('decrement')}\u003e-\u003c/button\u003e\n" +
		"			\u003cspan class=\"step-value\"\u003eSimulated Stepper\u003c/span\u003e\n" +
		"			\u003cbutton class=\"step-btn\" onclick={() =\u003e simulateEvent('increment')}\u003e+\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"event-log\"\u003e\n" +
		"			\u003cdiv class=\"log-header\"\u003e\n" +
		"				\u003cstrong\u003eEvent Log\u003c/strong\u003e\n" +
		"				\u003cbutton class=\"clear-btn\" onclick={clearLog}\u003eClear\u003c/button\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			{#if eventLog.length === 0}\n" +
		"				\u003cp class=\"concept\"\u003eNo events yet. Click the stepper buttons above.\u003c/p\u003e\n" +
		"			{:else}\n" +
		"				{#each eventLog as entry}\n" +
		"					\u003cdiv class=\"log-entry\"\u003e\u003ccode\u003e{entry}\u003c/code\u003e\u003c/div\u003e\n" +
		"				{/each}\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Points\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$host()\u003c/code\u003e is a compile-time rune — it has zero runtime cost\u003c/li\u003e\n" +
		"		\u003cli\u003eUse \u003ccode\u003ecomposed: true\u003c/code\u003e so events escape the shadow root\u003c/li\u003e\n" +
		"		\u003cli\u003eType the \u003ccode\u003edetail\u003c/code\u003e property for consumer-side type safety\u003c/li\u003e\n" +
		"		\u003cli\u003ePrefer CustomEvents over callback props for framework-agnostic interop\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$host()\u003c/code\u003e returns a reference to the custom element's host node from inside the component.\u003c/li\u003e\n" +
		"		\u003cli\u003eUse \u003ccode\u003e$host().dispatchEvent(new CustomEvent(...))\u003c/code\u003e to emit events that cross shadow DOM boundaries.\u003c/li\u003e\n" +
		"		\u003cli\u003eSet \u003ccode\u003ebubbles: true\u003c/code\u003e and \u003ccode\u003ecomposed: true\u003c/code\u003e so events propagate to parent DOM listeners.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$host()\u003c/code\u003e is a compile-time rune with zero runtime cost, available only in custom element components.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a custom event boundary issue. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove <code>composed: true</code> from the CustomEvent options.</strong> The event fires but stays trapped inside the shadow root. Parent DOM listeners never receive it because non-composed events do not cross shadow DOM boundaries. The event log in the simulation stays empty, demonstrating that <code>composed: true</code> is essential for inter-component communication.</li>
		<li><strong>Remove <code>bubbles: true</code> from the CustomEvent options.</strong> The event dispatches on the host element but does not bubble up the DOM tree. A listener on a parent <code>{'<div>'}</code> never receives it. Without bubbling, only listeners attached directly to the custom element instance can hear the event, which limits the flexibility of event delegation patterns.</li>
		<li><strong>Try to use <code>$host()</code> in a regular Svelte component that is not compiled as a custom element.</strong> The compiler throws an error because <code>$host()</code> is only valid inside components with the <code>customElement</code> option set. It is a compile-time rune that resolves to the host element reference, and that reference does not exist in regular component mode.</li>
		<li><strong>Dispatch a CustomEvent without a <code>detail</code> payload and try to read <code>event.detail</code> in the listener.</strong> The <code>detail</code> property is <code>null</code> (the default), not <code>undefined</code>. If the consumer expects a typed payload and does not check for null, it will throw a runtime error when accessing properties on the detail object. Always include a detail payload or document that it may be null.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>$host()</code> rune gives custom element components a reference to their host <code>HTMLElement</code> node. Its primary use case is dispatching <code>CustomEvent</code> instances that bubble out of the shadow DOM so consumers can listen with standard <code>addEventListener</code> calls. The rune is resolved at compile time with zero runtime cost, making it as efficient as a direct property access.</p>
	<p class="prose">For events to reach parent DOM listeners, two flags are essential: <code>bubbles: true</code> makes the event propagate up the DOM tree, and <code>composed: true</code> allows it to cross shadow DOM boundaries. Without both flags, the event stays trapped inside the shadow root or on the host element, invisible to the outside world. The <code>detail</code> property carries a typed payload that consumers can access from <code>event.detail</code>.</p>
	<p class="prose">This event-dispatch pattern replaces Svelte's callback-prop pattern for framework-agnostic communication. A React, Angular, or vanilla JavaScript consumer listens for custom events the same way they listen for native events like <code>click</code> or <code>input</code>. The stepper example in this lesson demonstrates the complete flow: the component dispatches <code>increment</code> and <code>decrement</code> events with value payloads, and any parent page can react without knowing that Svelte is involved.</p>
	<p class="next">Next, you will learn how to package a Svelte component library for npm using <code>@sveltejs/package</code>.</p>
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

	.stepper-demo {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		justify-content: center;
	}
	.step-btn {
		inline-size: 2.5rem;
		block-size: 2.5rem;
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
		max-block-size: 12rem;
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

	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
