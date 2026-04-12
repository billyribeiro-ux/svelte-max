<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	// ── Comparison data ─────────────────────────────────────────────────
	const rows: { svelte4: string; svelte5: string; notes: string }[] = [
		{
			svelte4: 'export let count',
			svelte5: 'let { count } = $props()',
			notes: 'Props are destructured from the $props() rune. Defaults use JS defaults: { count = 0 } = $props().'
		},
		{
			svelte4: '$: doubled = count * 2',
			svelte5: 'const doubled = $derived(count * 2)',
			notes: 'Single-expression reactivity. For multi-statement, use $derived.by(() => { ... }).'
		},
		{
			svelte4: '$: { console.log(count) }',
			svelte5: '$effect(() => { console.log(count) })',
			notes: 'Side effects. Runs after DOM update. Use $effect.pre for before-update timing.'
		},
		{
			svelte4: 'on:click={handler}',
			svelte5: 'onclick={handler}',
			notes: 'Standard DOM event attributes replace the on: directive. Works with all events.'
		},
		{
			svelte4: '<slot />\n<slot name="header" />',
			svelte5: '{@render children()}\n{@render header()}',
			notes: 'Parent passes {#snippet children()} or uses implicit children. Named slots become named snippets.'
		},
		{
			svelte4: 'createEventDispatcher()',
			svelte5: 'Callback props',
			notes: 'Pass an onclick or onchange prop (a plain function) instead of dispatch("click"). Simpler, type-safe.'
		},
		{
			svelte4: 'import { writable } from "svelte/store"',
			svelte5: '.svelte.ts files with $state',
			notes: 'Create a .svelte.ts module, export let count = $state(0). Importers get reactive state without subscribe.'
		},
		{
			svelte4: 'use:action={params}',
			svelte5: '{@attach fn} / use:action',
			notes: 'Attachments are the new declarative pattern. use: actions still work. fromAction() converts actions to attachments. createAttachmentKey() for programmatic use.'
		},
		{
			svelte4: 'import { page } from "$app/stores"',
			svelte5: 'import { page } from "$app/state"',
			notes: '$app/stores is deprecated. $app/state exports a reactive object — no $ prefix, no store subscription needed.'
		},
		{
			svelte4: 'Manual fetch + loading state',
			svelte5: 'Remote functions + await in markup',
			notes: 'query/form/command/prerender from $app/server. Type-safe, no manual fetch. await directly in templates with experimental.async.'
		}
	];

	// ── CodeCanvas strings ──────────────────────────────────────────────
	const fullTableCode: string = `\u003cscript lang="ts"\u003e
  // Each row maps a Svelte 4 pattern to its Svelte 5 equivalent.
  const rows: { svelte4: string; svelte5: string; notes: string }[] = [
    {
      svelte4: 'export let count',
      svelte5: 'let { count } = $props()',
      notes: 'Props destructured from $props() rune.'
    },
    {
      svelte4: '$: doubled = count * 2',
      svelte5: 'const doubled = $derived(count * 2)',
      notes: 'Single-expression derived value.'
    },
    {
      svelte4: '$: { console.log(count) }',
      svelte5: '$effect(() => { console.log(count) })',
      notes: 'Side effects after DOM update.'
    },
    {
      svelte4: 'on:click={handler}',
      svelte5: 'onclick={handler}',
      notes: 'Standard DOM event attributes.'
    },
    {
      svelte4: '<slot />',
      svelte5: '{@render children()}',
      notes: 'Snippets replace slots.'
    },
    {
      svelte4: 'createEventDispatcher()',
      svelte5: 'Callback props',
      notes: 'Plain functions replace dispatch.'
    },
    {
      svelte4: 'writable from "svelte/store"',
      svelte5: '.svelte.ts files with $state',
      notes: 'Rune-based shared state.'
    },
    {
      svelte4: 'use:action={params}',
      svelte5: '{@attach fn} / use:action',
      notes: 'Attachments are the new declarative pattern.'
    },
    {
      svelte4: 'import { page } from "$app/stores"',
      svelte5: 'import { page } from "$app/state"',
      notes: '$app/stores deprecated — use $app/state.'
    },
    {
      svelte4: 'Manual fetch + loading state',
      svelte5: 'Remote functions + await in markup',
      notes: 'Type-safe server functions from $app/server.'
    }
  ];
\u003c/script\u003e

<!-- Render the comparison table -->
<table>
  <thead>
    <tr>
      <th>Svelte 4</th>
      <th>Svelte 5</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    {#each rows as row}
      <tr>
        <td><code>{row.svelte4}</code></td>
        <td><code>{row.svelte5}</code></td>
        <td>{row.notes}</td>
      </tr>
    {/each}
  </tbody>
</table>`;

	const propsBeforeCode: string = `<!-- SVELTE 4 — export let for each prop -->
\u003cscript\u003e
  // Each prop is a separate "export let" declaration.
  // Defaults are assigned with "=".
  export let count = 0;       // number prop, defaults to 0
  export let label = 'Click'; // string prop, defaults to 'Click'
\u003c/script\u003e

<button on:click={() => count++}>
  {label}: {count}
</button>`;

	const propsAfterCode: string = `<!-- SVELTE 5 — $props() rune with destructuring -->
\u003cscript lang="ts"\u003e
  // All props come from a single $props() call.
  // Destructure the ones you need. Defaults use JS syntax.
  let { count = 0, label = 'Click' }: {
    count?: number;   // optional, defaults to 0
    label?: string;   // optional, defaults to 'Click'
  } = $props();
\u003c/script\u003e

<button onclick={() => count++}>
  {label}: {count}
</button>`;

	const derivedBeforeCode: string = `<!-- SVELTE 4 — $: reactive statement -->
\u003cscript\u003e
  let count = 0;

  // $: makes this re-run whenever "count" changes.
  // It looks like a JavaScript label — unusual syntax.
  $: doubled = count * 2;
  $: quadrupled = doubled * 2;
\u003c/script\u003e

<p>{count} x 2 = {doubled}, x 4 = {quadrupled}</p>`;

	const derivedAfterCode: string = `<!-- SVELTE 5 — $derived rune -->
\u003cscript lang="ts"\u003e
  let count: number = $state(0);

  // $derived() is explicit and composable.
  // It re-evaluates whenever its dependencies change.
  const doubled: number = $derived(count * 2);
  const quadrupled: number = $derived(doubled * 2);
\u003c/script\u003e

<p>{count} x 2 = {doubled}, x 4 = {quadrupled}</p>`;

	const effectBeforeCode: string = `<!-- SVELTE 4 — $: block for side effects -->
\u003cscript\u003e
  let count = 0;

  // $: block runs whenever "count" changes.
  // Hard to tell: is this a derived value or a side effect?
  $: {
    console.log('Count changed to', count);
    document.title = 'Count: ' + count;
  }
\u003c/script\u003e`;

	const effectAfterCode: string = `<!-- SVELTE 5 — $effect rune -->
\u003cscript lang="ts"\u003e
  let count: number = $state(0);

  // $effect() is explicitly a side effect.
  // Runs after DOM update. Tracks dependencies automatically.
  $effect(() => {
    console.log('Count changed to', count);
    document.title = 'Count: ' + count;
  });
\u003c/script\u003e`;

	const eventsBeforeCode: string = `<!-- SVELTE 4 — on: directive -->
<button on:click={handleClick}>Click me</button>
<input on:input={handleInput} />

<!-- Event modifiers with | -->
<button on:click|preventDefault={handleSubmit}>Submit</button>`;

	const eventsAfterCode: string = `<!-- SVELTE 5 — standard DOM attributes -->
<button onclick={handleClick}>Click me</button>
<input oninput={handleInput} />

<!-- No modifier syntax — use the event object instead -->
<button onclick={(e) => { e.preventDefault(); handleSubmit(e); }}>
  Submit
</button>`;

	const slotsBeforeCode: string = `<!-- SVELTE 4 — <slot> elements -->
<!-- Parent: -->
<Card>
  <h2 slot="header">Title</h2>
  <p>Default slot content</p>
</Card>

<!-- Card.svelte: -->
<div class="card">
  <slot name="header" />
  <slot />
</div>`;

	const slotsAfterCode: string = `<!-- SVELTE 5 — snippets and @render -->
<!-- Parent: -->
<Card>
  {#snippet header()}
    <h2>Title</h2>
  {/snippet}
  <p>Children content</p>
</Card>

<!-- Card.svelte: -->
\u003cscript lang="ts"\u003e
  import type { Snippet } from 'svelte';
  let { header, children }: {
    header?: Snippet;
    children?: Snippet;
  } = $props();
\u003c/script\u003e

<div class="card">
  {#if header}{@render header()}{/if}
  {#if children}{@render children()}{/if}
</div>`;

	const storesBeforeCode: string = `<!-- SVELTE 4 — writable stores -->
\u003cscript\u003e
  import { writable } from 'svelte/store';

  // Create a writable store
  const count = writable(0);

  // Subscribe with $ prefix (auto-subscription)
  // $count gives the current value
\u003c/script\u003e

<button on:click={() => $count++}>{$count}</button>`;

	const storesAfterCode: string = `<!-- SVELTE 5 — .svelte.ts rune modules -->

<!-- counter.svelte.ts (shared state file): -->
// Export reactive state using $state rune
export let count: number = $state(0);
export function increment(): void { count++; }

<!-- Any component that imports it gets reactive state: -->
\u003cscript lang="ts"\u003e
  import { count, increment } from './counter.svelte.ts';
\u003c/script\u003e

<button onclick={increment}>{count}</button>`;

	const wrongCode: string = `<!-- WRONG — mixing Svelte 4 and 5 syntax -->
\u003cscript lang="ts"\u003e
  // Svelte 4 prop syntax — does NOT work in Svelte 5
  export let count = 0;

  // Svelte 4 reactive statement — does NOT work in Svelte 5
  $: doubled = count * 2;
\u003c/script\u003e

<!-- Svelte 4 event directive — does NOT work in Svelte 5 -->
<button on:click={() => count++}>{doubled}</button>`;

	const rightCode: string = `<!-- RIGHT — pure Svelte 5 runes syntax -->
\u003cscript lang="ts"\u003e
  // Svelte 5: $props() for incoming props
  let { count = 0 }: { count?: number } = $props();

  // Svelte 5: $derived() for computed values
  const doubled: number = $derived(count * 2);
\u003c/script\u003e

<!-- Svelte 5: standard DOM event attribute -->
<button onclick={() => count++}>{doubled}</button>`;

	// ── Practice challenge ──────────────────────────────────────────────
	const practiceChallenge: string =
		'The code below is written in Svelte 4 syntax. Rewrite it using Svelte 5 runes ($props, $state, $derived, onclick).';

	const practiceStarter: string = `\u003cscript\u003e
  export let name = 'World';
  export let excited = false;

  $: greeting = excited ? name.toUpperCase() + '!!!' : name;
\u003c/script\u003e

<button on:click={() => excited = !excited}>
  Hello, {greeting}
</button>`;

	const practiceExpected: readonly string[] = [
		'$props()',
		'$derived(',
		'onclick='
	];

	const fullCode = fullTableCode;

	const practiceHints: readonly string[] = [
		'Replace "export let" with destructuring from $props().',
		'Replace "$: greeting = ..." with "const greeting = $derived(...)".',
		'Replace "on:click" with "onclick".'
	];
</script>

<section class="page">
	<!-- 1. Title + Learning Objectives -->
	<h1>1.10 — Svelte 5 Changes</h1>
	<ul class="objectives">
		<li>Know the key differences between Svelte 4 and Svelte 5 runes syntax</li>
		<li>Recognize legacy Svelte 4 code and know how to convert it</li>
		<li>Understand why runes are more explicit and composable than the old magic syntax</li>
	</ul>

	<!-- 2. Why this matters -->
	<h2>Why this matters</h2>
	<p class="analogy">
		<strong>Imagine upgrading from a car with hidden controls to one with a clear dashboard.</strong>
		Svelte 4 had "magic" syntax — <code>$:</code> labels, <code>export let</code>, auto-subscriptions
		— that worked but hid what was actually happening. Svelte 5 replaces all of that with
		<em>runes</em>: explicit functions like <code>$state()</code>, <code>$derived()</code>, and
		<code>$props()</code> that clearly show what is reactive, what is derived, and what comes from
		the parent. The dashboard is now visible.
	</p>
	<p class="concept">
		Svelte 5 replaced most of Svelte 4's special syntax with <em>runes</em> — explicit, composable
		primitives that work inside and outside components. If you encounter legacy code or older
		tutorials, this page maps every major Svelte 4 pattern to its Svelte 5 equivalent.
	</p>

	<!-- 3. The complete code -->
	<h2>The complete code</h2>
	<CodeCanvas filename="+page.svelte" code={fullTableCode} />

	<!-- 4. Step-by-step walkthrough -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1 — Props: export let to $props()</h3>
	<p class="step-text">
		In Svelte 4, each prop was a separate <code>export let</code> declaration. In Svelte 5, all
		props come from a single <code>$props()</code> call and are destructured with standard
		JavaScript syntax.
	</p>
	<div class="comparison">
		<CodeCanvas filename="Svelte 4 (before)" code={propsBeforeCode} />
		<CodeCanvas filename="Svelte 5 (after)" code={propsAfterCode} />
	</div>

	<h3>Step 2 — Derived values: $: to $derived()</h3>
	<p class="step-text">
		The <code>$:</code> label was Svelte 4's way to create reactive statements. It looked like a
		JavaScript label (unusual syntax). Svelte 5's <code>$derived()</code> is explicit about what
		it does.
	</p>
	<div class="comparison">
		<CodeCanvas filename="Svelte 4 (before)" code={derivedBeforeCode} />
		<CodeCanvas filename="Svelte 5 (after)" code={derivedAfterCode} />
	</div>

	<h3>Step 3 — Side effects: $: blocks to $effect()</h3>
	<p class="step-text">
		In Svelte 4, <code>$:</code> was used for both derived values and side effects — confusing.
		Svelte 5 separates them: <code>$derived()</code> for values, <code>$effect()</code> for side
		effects.
	</p>
	<div class="comparison">
		<CodeCanvas filename="Svelte 4 (before)" code={effectBeforeCode} />
		<CodeCanvas filename="Svelte 5 (after)" code={effectAfterCode} />
	</div>

	<h3>Step 4 — Events, slots, and stores</h3>
	<p class="step-text">
		Three more changes complete the picture: events use standard DOM attributes, slots become
		snippets, and stores are replaced by <code>.svelte.ts</code> rune modules.
	</p>
	<div class="comparison">
		<CodeCanvas filename="Svelte 4 events" code={eventsBeforeCode} />
		<CodeCanvas filename="Svelte 5 events" code={eventsAfterCode} />
	</div>

	<!-- 5. See it in action -->
	<h2>See it in action</h2>
	<p class="hint">The full comparison table — reference this whenever you encounter Svelte 4 code.</p>

	<div class="build">
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Svelte 4</th>
						<th>Svelte 5</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each rows as row}
						<tr>
							<td><code>{row.svelte4}</code></td>
							<td><code>{row.svelte5}</code></td>
							<td>{row.notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- 6. Your turn -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge={practiceChallenge}
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. More examples -->
	<h2>More examples</h2>

	<details>
		<summary>Slots to snippets (full example)</summary>
		<p class="detail-text">
			Svelte 4's <code>&lt;slot&gt;</code> elements are replaced by snippets and <code>{'{@render}'}</code>.
		</p>
		<div class="comparison">
			<CodeCanvas filename="Svelte 4 slots" code={slotsBeforeCode} />
			<CodeCanvas filename="Svelte 5 snippets" code={slotsAfterCode} />
		</div>
	</details>

	<details>
		<summary>Stores to .svelte.ts rune modules</summary>
		<p class="detail-text">
			Svelte 4's <code>writable</code> stores are replaced by <code>.svelte.ts</code> files
			that export <code>$state</code> values.
		</p>
		<div class="comparison">
			<CodeCanvas filename="Svelte 4 stores" code={storesBeforeCode} />
			<CodeCanvas filename="Svelte 5 rune module" code={storesAfterCode} />
		</div>
	</details>

	<details>
		<summary>Event modifiers gone — use the event object</summary>
		<p class="detail-text">
			Svelte 4 had modifier syntax like <code>on:click|preventDefault</code>. In Svelte 5,
			call methods on the event object directly.
		</p>
		<CodeCanvas
			filename="Event handling"
			code={`<!-- Svelte 4: -->\n<form on:submit|preventDefault={handleSubmit}>\n\n<!-- Svelte 5: -->\n<form onsubmit={(e) => {\n  e.preventDefault();  // call it yourself\n  handleSubmit(e);\n}}>`}
		/>
	</details>

	<!-- 8. Common mistakes -->
	<h2>Common mistakes</h2>
	<div class="mistakes">
		<div class="mistake-wrong">
			<h4>Wrong — mixing Svelte 4 and 5 syntax</h4>
			<CodeCanvas filename="wrong.svelte" code={wrongCode} />
		</div>
		<div class="mistake-right">
			<h4>Right — pure Svelte 5 runes</h4>
			<CodeCanvas filename="right.svelte" code={rightCode} />
		</div>
	</div>

	<!-- Break it on purpose -->
	<h2>Break it on purpose</h2>

	<p class="concept">
		The best way to internalize these changes is to try the OLD syntax and watch it fail.
	</p>

	<ol class="experiments">
		<li>
			<strong>Write <code>export let name = 'test'</code> in a runes-mode component.</strong>
			Svelte errors immediately — <code>export let</code> is not allowed when runes mode is
			enabled. The replacement is <code>let {'{'} name {'}'} = $props()</code>.
		</li>
		<li>
			<strong>Write <code>$: doubled = count * 2</code>.</strong> The <code>$:</code> reactive
			label does not exist in Svelte 5 runes mode. The replacement is
			<code>const doubled = $derived(count * 2)</code>.
		</li>
		<li>
			<strong>Use <code>on:click</code> instead of <code>onclick</code>.</strong> The
			<code>on:</code> directive syntax was removed in Svelte 5. Use the native HTML event
			attribute directly: <code>onclick={'{handler}'}</code>.
		</li>
		<li>
			<strong>Try <code>&lt;slot /&gt;</code> in a component.</strong> Svelte 5 replaces
			slots with snippets. Use <code>{'{#snippet children()}'}</code> and
			<code>{'{@render children()}'}</code> instead.
		</li>
	</ol>

	<!-- HAVING ISSUES? COMPLETE CODE -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- 9. What you learned -->
	<h2>What you learned</h2>

	<p class="concept">
		Svelte 5 is a ground-up rewrite of the reactivity system. The old implicit reactivity
		(<code>$:</code> labels, <code>export let</code> props, stores) is replaced by explicit
		runes (<code>$state</code>, <code>$derived</code>, <code>$effect</code>, <code>$props</code>).
		Runes are clearer because they tell both the developer and the compiler exactly what is
		reactive and why. There is no magic — every piece of reactive state is explicitly declared.
	</p>

	<p class="concept">
		Events switched from the <code>on:</code> directive to native HTML attributes
		(<code>onclick</code>). Slots were replaced by snippets (<code>{'{#snippet}'}</code> and
		<code>{'{@render}'}</code>), which are more flexible because they can accept parameters
		and be passed as typed props. <code>createEventDispatcher</code> was replaced by simple
		callback props — just pass a function.
	</p>

	<p class="concept">
		If you encounter Svelte 4 code in the wild (blog posts, Stack Overflow, older tutorials),
		you now know exactly how to translate it to Svelte 5 runes syntax. The table above is your
		translation dictionary. Every pattern has a 1:1 replacement.
	</p>

	<!-- 10. Next steps -->
	<p class="next">
		Next: <a href="/module-1/project">Module 1 Project</a> — build a personal portfolio card
		using everything you have learned.
	</p>
</section>

<style>
	/* ── Page layout ─────────────────────────────────────── */
	.page {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* consistent spacing */
		max-inline-size: 72rem;              /* max content width */
	}

	/* ── Learning objectives ─────────────────────────────── */
	.objectives {
		padding-inline-start: 1.25rem;       /* indent bullets */
		color: var(--color-text-muted);      /* secondary text */
		line-height: 1.6;                    /* readable */

		& li {
			margin-block: 0.25rem;             /* item gap */
		}
	}

	/* ── Analogy block ───────────────────────────────────── */
	.analogy {
		font-size: var(--text-lg);           /* emphasis */
		color: var(--color-text);            /* full contrast */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
		border-inline-start: 4px solid var(--color-brand); /* accent */
		padding-inline-start: 1rem;          /* space after bar */
	}

	/* ── Concept paragraph ───────────────────────────────── */
	.concept {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
	}

	/* ── Headings ────────────────────────────────────────── */
	h2 {
		font-size: var(--text-xl);           /* section heading */
		margin-block-start: 2rem;            /* space above */
	}

	h3 {
		font-size: var(--text-lg);           /* sub-section */
		margin-block-start: 1.5rem;          /* space above */
	}

	/* ── Step text ───────────────────────────────────────── */
	.step-text {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
	}

	/* ── Hint ────────────────────────────────────────────── */
	.hint {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-brand);           /* accent */
		font-style: italic;                  /* distinction */
	}

	/* ── Before/after comparison ─────────────────────────── */
	.comparison {
		display: flex;                       /* side by side */
		flex-direction: column;              /* stack on mobile */
		gap: 1rem;                           /* spacing */
		margin-block: 0.5rem;                /* vertical spacing */
	}

	/* ── Table section ───────────────────────────────────── */
	.build {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* spacing */
		background: var(--color-surface-1);  /* card background */
		border: 1px solid var(--color-border); /* border */
		border-radius: var(--radius-lg);     /* rounded */
		padding: var(--space-lg);            /* inner spacing */
		box-shadow: var(--shadow-sm);        /* subtle shadow */
		margin-block: var(--space-lg);       /* vertical spacing */
	}

	.table-wrap {
		overflow-x: auto;                    /* scroll on small screens */
	}

	table {
		width: 100%;                         /* full width */
		border-collapse: collapse;           /* no double borders */
		font-size: var(--text-sm);           /* small text */
	}

	th {
		text-align: start;                   /* left-align headers */
		padding: var(--space-sm) var(--space-md); /* cell padding */
		background: var(--color-surface-2);  /* header background */
		border-block-end: 2px solid var(--color-border); /* bottom border */
		font-size: var(--text-xs);           /* extra small */
		text-transform: uppercase;           /* all caps */
		letter-spacing: 0.06em;              /* slight tracking */
		color: var(--color-text-muted);      /* secondary */
		white-space: nowrap;                 /* no wrap */
	}

	td {
		padding: var(--space-sm) var(--space-md); /* cell padding */
		border-block-end: 1px solid var(--color-border); /* row border */
		vertical-align: top;                 /* top-align content */
		line-height: 1.5;                    /* readable */
	}

	td:last-child {
		color: var(--color-text-muted);      /* secondary for notes */
		font-size: var(--text-xs);           /* smaller notes */
		max-inline-size: 28ch;               /* constrain width */
	}

	/* ── Mistakes section ────────────────────────────────── */
	.mistakes {
		display: flex;                       /* side by side */
		flex-direction: column;              /* stack on mobile */
		gap: 1.5rem;                         /* spacing */

		& h4 {
			font-size: var(--text-sm);         /* small heading */
			margin-block-end: 0.5rem;          /* space before code */
		}
	}

	.mistake-wrong h4 {
		color: oklch(55% 0.15 25);           /* red-ish */
	}

	.mistake-right h4 {
		color: oklch(55% 0.15 145);          /* green-ish */
	}

	/* ── Details blocks ──────────────────────────────────── */
	details {
		border: 1px solid var(--color-border); /* boundary */
		border-radius: 0.5rem;               /* rounded */
		padding: 1rem;                       /* inner spacing */

		& summary {
			cursor: pointer;                   /* clickable */
			font-weight: 600;                  /* bold */
			color: var(--color-brand);         /* accent */
			font-size: var(--text-base);       /* body size */
		}
	}

	.detail-text {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-text-muted);      /* secondary */
		margin-block: 0.5rem;                /* spacing */
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

	/* ── Next link ───────────────────────────────────────── */
	.next {
		font-size: var(--text-base);         /* body size */
		margin-block-start: 2rem;            /* space above */
		padding: 1rem;                       /* inner padding */
		background: var(--color-surface);    /* subtle bg */
		border-radius: 0.5rem;               /* rounded */
		border: 1px solid var(--color-border); /* boundary */

		& a {
			color: var(--color-brand);         /* brand link */
			font-weight: 600;                  /* bold */
			text-decoration: underline;        /* clarity */
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

	/* ── Responsive ──────────────────────────────────────── */
	@media (min-width: 768px) {
		.comparison {
			flex-direction: row;               /* side by side */

			& > :global(*) {
				flex: 1;                         /* equal width */
			}
		}

		.mistakes {
			flex-direction: row;               /* side by side */

			& > div {
				flex: 1;                         /* equal width */
			}
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */

	@media (min-width: 480px) {
		.analogy, .concept, .hint { max-inline-size: 65ch; }
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.analogy, .concept, .hint { max-inline-size: 72ch; }
	}

	@media (min-width: 1024px) {
		.analogy, .concept, .hint { max-inline-size: 80ch; }
	}
</style>
