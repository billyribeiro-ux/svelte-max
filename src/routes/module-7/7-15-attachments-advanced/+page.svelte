<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fromAction, createAttachmentKey } from 'svelte/attachments';
	import type { Attachment } from 'svelte/attachments';

	// A legacy-style use: action — takes a node and options, returns { destroy }
	function tooltipAction(node: HTMLElement, text: string) {
		let tip: HTMLDivElement | null = null;

		function show() {
			tip = document.createElement('div');
			tip.textContent = text;
			tip.style.cssText =
				'position:fixed;padding:4px 10px;background:oklch(20% 0 0);color:oklch(95% 0 0);' +
				'border-radius:6px;font-size:13px;pointer-events:none;z-index:9999;white-space:nowrap;';
			document.body.appendChild(tip);
			const rect = node.getBoundingClientRect();
			tip.style.left = `${rect.left + rect.width / 2 - tip.offsetWidth / 2}px`;
			tip.style.top = `${rect.top - tip.offsetHeight - 6}px`;
		}

		function hide() {
			tip?.remove();
			tip = null;
		}

		node.addEventListener('pointerenter', show);
		node.addEventListener('pointerleave', hide);

		return {
			destroy() {
				hide();
				node.removeEventListener('pointerenter', show);
				node.removeEventListener('pointerleave', hide);
			}
		};
	}

	// A pure attachment function (not a use: action)
	function highlight(node: Element): (() => void) | void {
		const el = node as HTMLElement;
		const original = el.style.outline;
		el.style.outline = '2px solid oklch(70% 0.20 150)';
		el.style.outlineOffset = '2px';
		return () => {
			el.style.outline = original;
		};
	}

	let tooltipText = $state('I am a tooltip!');
	let showHighlight = $state(true);

	// Spreading attachments via createAttachmentKey
	const key1 = createAttachmentKey();
	const key2 = createAttachmentKey();

	let spreadProps = $derived({
		class: 'spread-target',
		[key1]: (node: Element) => {
			(node as HTMLElement).style.borderColor = 'oklch(70% 0.20 280)';
			return () => { (node as HTMLElement).style.borderColor = ''; };
		},
		[key2]: (node: Element) => {
			(node as HTMLElement).style.fontWeight = '700';
			return () => { (node as HTMLElement).style.fontWeight = ''; };
		}
	});

	/* -- Complete code for CodeCanvas -- */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { fromAction, createAttachmentKey } from 'svelte/attachments';\n" +
		"  import type { Attachment } from 'svelte/attachments';\n" +
		"\n" +
		"  // Legacy use: action\n" +
		"  function tooltipAction(node: HTMLElement, text: string) {\n" +
		"    let tip: HTMLDivElement | null = null;\n" +
		"    function show() { /* create tooltip */ }\n" +
		"    function hide() { tip?.remove(); }\n" +
		"    node.addEventListener('pointerenter', show);\n" +
		"    node.addEventListener('pointerleave', hide);\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        hide();\n" +
		"        node.removeEventListener('pointerenter', show);\n" +
		"        node.removeEventListener('pointerleave', hide);\n" +
		"      }\n" +
		"    };\n" +
		"  }\n" +
		"\n" +
		"  let tooltipText = $state('I am a tooltip!');\n" +
		"\n" +
		"  // Spreading attachments programmatically\n" +
		"  const key = createAttachmentKey();\n" +
		"  let props = $derived({\n" +
		"    class: 'card',\n" +
		"    [key]: (node) => {\n" +
		"      node.style.borderColor = 'purple';\n" +
		"      return () => { node.style.borderColor = ''; };\n" +
		"    }\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<!-- fromAction: convert use:action to {@attach} -->\n" +
		"<button {@attach fromAction(tooltipAction, () => tooltipText)}>\n" +
		"  Hover me\n" +
		"</button>\n" +
		"\n" +
		"<!-- Spread attachments via props -->\n" +
		"<div {...props}>Attached via spread</div>";
</script>

<section class="page">
	<h1>7.15 — Advanced attachments</h1>

	<p class="prose">
		In the previous attachments lesson, you learned the basics: an <code>Attachment</code>
		is a function <code>(node) =&gt; cleanup</code> that runs on mount. This lesson covers
		two advanced patterns from <code>svelte/attachments</code> that make the system
		production-ready: <code>fromAction</code> for migrating existing <code>use:</code> actions,
		and <code>createAttachmentKey</code> for spreading attachments programmatically through
		props objects.
	</p>

	<p class="prose">
		Think of <code>fromAction</code> as a power adapter when you travel abroad. Your existing
		<code>use:</code> action is a European plug — it works fine, but the new socket expects
		the <code>Attachment</code> shape. <code>fromAction</code> is the adapter: same device,
		different plug. And <code>createAttachmentKey</code> is like a labeling system for a
		warehouse — it creates unique symbol keys so you can pack multiple attachments into a
		single props object and spread them onto elements.
	</p>

	<h2><code>fromAction</code> — migrate existing actions</h2>

	<div class="build">
		<pre>{`import { fromAction } from 'svelte/attachments';
import { myAction } from 'some-library';

// BEFORE: use: action syntax
// <div use:myAction={options}>...</div>

// AFTER: {@attach} with fromAction
// <div {@attach fromAction(myAction, () => options)}>...</div>

// Key detail: the second argument is a FUNCTION
// that returns the options, not the options directly.
// This lets Svelte track reactive dependencies.`}</pre>

		<p class="prose">
			The second argument to <code>fromAction</code> must be a function that <em>returns</em>
			the action argument, not the argument itself. This is what enables Svelte to track
			reactive dependencies — when the return value changes, the attachment is torn down
			and re-created automatically.
		</p>
	</div>

	<h2>Live demo — tooltip migration</h2>

	<p class="prose">
		This demo shows a <code>tooltipAction</code> written in the classic <code>use:</code>
		style (returns <code>{'{destroy()}'}</code>), converted to <code>{'{@attach}'}</code>
		via <code>fromAction</code>. Hover the button to see the tooltip. Change the text and
		hover again — the attachment re-runs because the argument changed.
	</p>

	<div class="build">
		<div class="demo-row">
			<button
				type="button"
				class="demo-button"
				{@attach fromAction(tooltipAction, () => tooltipText)}
			>
				Hover me — attachment tooltip
			</button>
		</div>

		<label class="text-control">
			Tooltip text:
			<input type="text" bind:value={tooltipText} />
		</label>

		<CodeCanvas
			filename="tooltip-migration.svelte"
			code={`<` + `script>
  import { fromAction } from 'svelte/attachments';

  // Existing use: action (from a library or your codebase)
  function tooltipAction(node, text) {
    // ... creates tooltip on hover ...
    return { destroy() { /* cleanup */ } };
  }

  let tooltipText = $state('Hello!');
</` + `script>

<!-- Old way -->
<button use:tooltipAction={tooltipText}>Hover</button>

<!-- New way — same behavior, attachment API -->
<button {@attach fromAction(tooltipAction, () => tooltipText)}>
  Hover
</button>`}
		/>
	</div>

	<h2><code>createAttachmentKey</code> — spread attachments</h2>

	<div class="build">
		<pre>{`import { createAttachmentKey } from 'svelte/attachments';

// Create unique symbol keys for attachments
const tooltipKey = createAttachmentKey();
const analyticsKey = createAttachmentKey();

// Pack attachments into a props object
const buttonProps = {
  class: 'primary',
  onclick: () => alert('clicked'),
  [tooltipKey]: (node) => {
    // tooltip setup
    return () => { /* cleanup */ };
  },
  [analyticsKey]: (node) => {
    // analytics tracking setup
    return () => { /* cleanup */ };
  }
};

// Spread onto an element — attachments are recognized
// <button {...buttonProps}>Click me</button>`}</pre>

		<p class="prose">
			When you spread an object onto an element, Svelte recognizes any properties whose
			keys were created by <code>createAttachmentKey()</code> and treats them as
			attachments. Regular properties (<code>class</code>, <code>onclick</code>) are
			applied normally. This is how library authors can pass attachments through component
			props without requiring the consumer to know about <code>{'{@attach}'}</code>.
		</p>
	</div>

	<h2>Live demo — spread attachments</h2>

	<p class="prose">
		The box below receives its styles through attachments spread via <code>createAttachmentKey</code>.
		Two attachment keys are created — one sets the border color, the other sets the font weight.
		Both are packed into a single props object and spread onto the element.
	</p>

	<div class="build">
		<div class="spread-demo">
			<div {...spreadProps}>
				This element has attachments applied via <code>{'{...spreadProps}'}</code>
			</div>
		</div>

		<CodeCanvas
			filename="spread-attachments.svelte"
			code={`<` + `script>
  import { createAttachmentKey } from 'svelte/attachments';

  const borderKey = createAttachmentKey();
  const weightKey = createAttachmentKey();

  let props = $derived({
    class: 'spread-target',
    [borderKey]: (node) => {
      node.style.borderColor = 'purple';
      return () => { node.style.borderColor = ''; };
    },
    [weightKey]: (node) => {
      node.style.fontWeight = '700';
      return () => { node.style.fontWeight = ''; };
    }
  });
</` + `script>

<!-- Spread — attachments auto-detected by symbol key -->
<div {...props}>Styled by attachments</div>`}
		/>
	</div>

	<h2>Combining both patterns</h2>

	<div class="build">
		{#if showHighlight}
			<div
				class="combo-box"
				{@attach highlight}
				{@attach fromAction(tooltipAction, () => 'Combined!')}
			>
				Highlight attachment + tooltip from action (hover me)
			</div>
		{/if}

		<div class="controls">
			<button type="button" onclick={() => showHighlight = !showHighlight}>
				{showHighlight ? 'Unmount' : 'Mount'} combined box
			</button>
		</div>

		<p class="prose">
			Multiple <code>{'{@attach}'}</code> directives compose on a single element. Here,
			a pure <code>Attachment</code> function (<code>highlight</code>) and a converted
			<code>use:</code> action (<code>fromAction(tooltipAction, ...)</code>) coexist. When
			the element unmounts, both cleanup functions run.
		</p>
	</div>

	<h2>Break it on purpose</h2>

	<ol class="experiments">
		<li>
			<strong>Pass the action argument directly instead of a function: <code>fromAction(tooltipAction, tooltipText)</code>.</strong>
			TypeScript errors because the second argument must be a function that <em>returns</em>
			the value, not the value itself. The function wrapper <code>() =&gt; tooltipText</code>
			is what lets Svelte track reactive dependencies — without it, the attachment could
			not re-run when <code>tooltipText</code> changes.
		</li>
		<li>
			<strong>Use a plain string key instead of <code>createAttachmentKey()</code> in the spread object.</strong>
			The function is treated as a regular prop value, not as an attachment. The element
			receives a property whose value happens to be a function, but Svelte never calls it.
			Only symbol keys from <code>createAttachmentKey()</code> are recognized as attachments
			during spreading.
		</li>
		<li>
			<strong>Stack three <code>{'{@attach}'}</code> directives that modify the same CSS property.</strong>
			The last one wins during mount — all three run sequentially, and each overwrites the
			previous value. On cleanup, they run in reverse order. If they animate the same
			property, you get a flicker. Design attachments to own distinct concerns, just like
			you would with CSS utility classes.
		</li>
		<li>
			<strong>Wrap <code>fromAction</code> around an action that uses the <code>update()</code> lifecycle method.</strong>
			The <code>fromAction</code> adapter calls <code>destroy()</code> and re-creates the
			action when the argument changes — it does not call <code>update()</code>. If your
			action relies on incremental updates (e.g., diffing old vs new state), the converted
			attachment will reset fully on each change. For most actions this is fine; for
			performance-sensitive ones, rewrite as a native <code>Attachment</code>.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		<code>fromAction</code> is the migration bridge between the <code>use:</code> action
		world and the <code>{'{@attach}'}</code> world. It wraps any existing action — from your
		codebase or a third-party library — into the <code>Attachment</code> signature without
		rewriting it. The key requirement is that the second argument must be a function returning
		the action's parameter, not the parameter directly, so Svelte can track reactive
		dependencies and tear down / re-create the action when they change.
	</p>

	<p class="prose">
		<code>createAttachmentKey()</code> enables programmatic composition. It creates a unique
		symbol that Svelte recognizes when an object is spread onto an element. This means library
		authors can return props objects that include attachments — the consumer spreads them with
		<code>{'{...props}'}</code> and the attachments are applied automatically, without the
		consumer needing to write any <code>{'{@attach}'}</code> directives. It is the mechanism
		that makes attachments a first-class part of the component API surface.
	</p>

	<p class="prose">
		Together, these two utilities cover the full migration path: <code>fromAction</code>
		handles the "I have existing code" case, and <code>createAttachmentKey</code> handles
		the "I am building a library" case. Combined with the basic <code>{'{@attach}'}</code>
		syntax from the previous lesson, you now have every tool you need to use attachments
		in production — from simple element effects to complex, spreadable component APIs.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-7/project">Module 7 Project</a> — build a production-grade animation
		system combining GSAP, ScrollTrigger, and attachments.
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

	.demo-row {
		display: flex;
		gap: var(--space-md);
		margin-block-end: var(--space-md);
	}

	.demo-button {
		font: inherit;
		padding: var(--space-sm) var(--space-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: var(--color-surface);
		cursor: pointer;
		font-weight: 600;
		font-size: var(--text-base);
	}

	.demo-button:hover { opacity: 0.9; }

	.text-control {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.text-control input {
		flex: 1;
		font: inherit;
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
	}

	.spread-demo {
		margin-block-end: var(--space-md);
	}

	.spread-target {
		background: var(--color-surface-2);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		font-size: var(--text-sm);
		transition: border-color 0.2s, font-weight 0.2s;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.combo-box {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		font-size: var(--text-sm);
		margin-block-end: var(--space-md);
		cursor: default;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
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
