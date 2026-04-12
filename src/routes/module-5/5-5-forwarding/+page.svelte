<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type Handler = {
		label: string;
		onclick: (e: MouseEvent) => void;
	};

	let log = $state<string[]>([]);

	function push(entry: string): void {
		log = [entry, ...log].slice(0, 5);
	}

	const handlers: Handler[] = [
		{
			label: 'Save',
			onclick: () => push('Saved at ' + new Date().toLocaleTimeString())
		},
		{
			label: 'Refresh',
			onclick: () => push('Refreshed data')
		},
		{
			label: 'Delete',
			onclick: () => push('Deleted selection')
		}
	];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Handler = {\n" +
		"\t\tlabel: string;\n" +
		"\t\tonclick: (e: MouseEvent) =\u003e void;\n" +
		"\t};\n" +
		"\n" +
		"\tlet log = $state\u003cstring[]\u003e([]);\n" +
		"\n" +
		"\tfunction push(entry: string): void {\n" +
		"\t\tlog = [entry, ...log].slice(0, 5);\n" +
		"\t}\n" +
		"\n" +
		"\tconst handlers: Handler[] = [\n" +
		"\t\t{\n" +
		"\t\t\tlabel: 'Save',\n" +
		"\t\t\tonclick: () =\u003e push('Saved at ' + new Date().toLocaleTimeString())\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tlabel: 'Refresh',\n" +
		"\t\t\tonclick: () =\u003e push('Refreshed data')\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tlabel: 'Delete',\n" +
		"\t\t\tonclick: () =\u003e push('Deleted selection')\n" +
		"\t\t}\n" +
		"\t];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.5 — Forwarding events\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e A reusable component often wants its parent to decide what happens on\n" +
		"\t\tclick. The Svelte 5 pattern: accept the handler as a typed prop like\n" +
		"\t\t\u003ccode\u003eonclick: (e: MouseEvent) =&gt; void\u003c/code\u003e and attach it to the inner element. No\n" +
		"\t\t\u003ccode\u003ecreateEventDispatcher\u003c/code\u003e, no custom event names — just a typed function prop.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"toolbar\"\u003e\n" +
		"\t\t\t{#each handlers as btn (btn.label)}\n" +
		"\t\t\t\t\u003cbutton type=\"button\" onclick={btn.onclick}\u003e{btn.label}\u003c/button\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"log\" aria-live=\"polite\"\u003e\n" +
		"\t\t\t\u003cp class=\"log-title\"\u003eRecent events\u003c/p\u003e\n" +
		"\t\t\t{#if log.length === 0}\n" +
		"\t\t\t\t\u003cp class=\"log-empty\"\u003eNo events yet — click a button.\u003c/p\u003e\n" +
		"\t\t\t{:else}\n" +
		"\t\t\t\t\u003cul class=\"log-list\"\u003e\n" +
		"\t\t\t\t\t{#each log as entry, i (i + entry)}\n" +
		"\t\t\t\t\t\t\u003cli\u003e{entry}\u003c/li\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/ul\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tWhen you extract this into a real \u003ccode\u003e.svelte\u003c/code\u003e component file, the same pattern\n" +
		"\t\t\tapplies: declare \u003ccode\u003einterface Props {'{'} onclick: (e: MouseEvent) =&gt; void {'}'}\u003c/code\u003e and\n" +
		"\t\t\tbind it to the inner button.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eHandlers are just function values — pass them as props.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eType them explicitly: \u003ccode\u003e(e: MouseEvent) =&gt; void\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eNo event dispatcher needed in Svelte 5; the callback-prop pattern replaces it.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.5 — Forwarding events</h1>
	<p class="concept">
		<strong>Concept.</strong> A reusable component often wants its parent to decide what happens on
		click. The Svelte 5 pattern: accept the handler as a typed prop like
		<code>onclick: (e: MouseEvent) =&gt; void</code> and attach it to the inner element. No
		<code>createEventDispatcher</code>, no custom event names — just a typed function prop.
	</p>

	<div class="build">
		<div class="toolbar">
			{#each handlers as btn (btn.label)}
				<button type="button" onclick={btn.onclick}>{btn.label}</button>
			{/each}
		</div>

		<div class="log" aria-live="polite">
			<p class="log-title">Recent events</p>
			{#if log.length === 0}
				<p class="log-empty">No events yet — click a button.</p>
			{:else}
				<ul class="log-list">
					{#each log as entry, i (i + entry)}
						<li>{entry}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<p class="note">
			When you extract this into a real <code>.svelte</code> component file, the same pattern
			applies: declare <code>interface Props {'{'} onclick: (e: MouseEvent) =&gt; void {'}'}</code> and
			bind it to the inner button.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		Event forwarding in Svelte 5 is explicit by design. These experiments show you why implicit forwarding would be worse.
	</p>
	<ol class="experiments">
		<li><strong>Expect events to "bubble" through Svelte components automatically.</strong> In a child component, add an <code>onclick</code> to a <code>&lt;button&gt;</code> and try to handle it in the parent without passing a callback prop. Nothing happens — Svelte components are not DOM elements, so DOM events do not bubble across component boundaries. This is intentional: it forces explicit communication paths.</li>
		<li><strong>Forward via a callback prop.</strong> Declare <code>onclick: (e: MouseEvent) =&gt; void</code> in the child's props interface, accept it with <code>let {'{'} onclick {'}'} = $props()</code>, and attach it to the inner button. The parent passes its handler: <code>&lt;Child onclick={'{handleClick}'} /&gt;</code>. The event now crosses the component boundary through a typed, visible contract.</li>
		<li><strong>Spread <code>restProps</code> onto the inner element.</strong> Use <code>let {'{'} ...restProps {'}'} = $props()</code> in the child and spread them: <code>{'<button {...restProps}>'}</code>. Now any native event attribute the parent passes — <code>onclick</code>, <code>onfocus</code>, <code>onkeydown</code> — forwards automatically. This is the idiomatic pattern for wrapper components that should not restrict which events the parent can listen to.</li>
		<li><strong>Type the forwarded handler in the Props interface.</strong> Add <code>onclick?: (e: MouseEvent) =&gt; void</code> explicitly alongside the rest spread. TypeScript will ensure the parent passes a compatible function. If the parent passes a handler expecting <code>KeyboardEvent</code>, the compiler catches the mistake immediately.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		Svelte components are not DOM nodes, and DOM events do not bubble through them. This is a deliberate design choice that makes data flow explicit. In Svelte 4, you could use <code>on:click</code> forwarding or <code>createEventDispatcher</code> to bridge the gap, but both relied on stringly-typed event names that TypeScript could not verify. Svelte 5 replaces all of that with callback props — plain typed functions that the child declares and the parent provides.
	</p>
	<p class="prose">
		The callback-prop pattern mirrors how React and other frameworks handle component communication, but with stronger guarantees. You define the handler's signature in the component's <code>Props</code> interface — for example, <code>onclick: (e: MouseEvent) =&gt; void</code> — and TypeScript enforces the contract at every usage site. If the parent passes the wrong function shape, the error appears at compile time, not as a silent no-op at runtime.
	</p>
	<p class="prose">
		For generic wrapper components (cards, modals, layout shells), the rest-props spread pattern is the cleanest solution. Using <code>let {'{'} children, ...restProps {'}'} = $props()</code> and spreading <code>{'{...restProps}'}</code> onto the root element lets the parent attach any native event handler without the child having to enumerate them all. This keeps the child component flexible while maintaining full type safety through HTML attribute types.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-6-on-function">5.6 — The on function from svelte/events</a></p>
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
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.toolbar button {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	.toolbar button:hover {
		border-color: var(--color-brand);
	}
	.log {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}
	.log-title {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}
	.log-empty {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.log-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text);
	}
	.note {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
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
