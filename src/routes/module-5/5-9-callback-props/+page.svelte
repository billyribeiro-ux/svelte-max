<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fade } from 'svelte/transition';

	type ToastKind = 'info' | 'success' | 'error';

	interface Toast {
		id: number;
		kind: ToastKind;
		text: string;
	}

	let toasts = $state<Toast[]>([]);
	let nextId = 0;

	function addToast(kind: ToastKind, text: string): void {
		const id = ++nextId;
		toasts = [...toasts, { id, kind, text }];
	}

	function dismiss(id: number): void {
		toasts = toasts.filter((t) => t.id !== id);
	}

	function clearAll(): void {
		toasts = [];
	}

	// Auto-dismiss after 3s. Track timers per toast id so cleanup works when toasts change.
	$effect(() => {
		const current = toasts;
		const timers = current.map((t) =>
			setTimeout(() => {
				toasts = toasts.filter((x) => x.id !== t.id);
			}, 3000)
		);
		return () => {
			for (const h of timers) clearTimeout(h);
		};
	});

	// Imagined child component API (kept inline here for demonstration):
	//   interface Props { onselect?: (item: Item) => void }
	// Parents pass typed callback props instead of using createEventDispatcher.

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type ToastKind = 'info' | 'success' | 'error';\n" +
		"\n" +
		"\tinterface Toast {\n" +
		"\t\tid: number;\n" +
		"\t\tkind: ToastKind;\n" +
		"\t\ttext: string;\n" +
		"\t}\n" +
		"\n" +
		"\tlet toasts = $state\u003cToast[]\u003e([]);\n" +
		"\tlet nextId = 0;\n" +
		"\n" +
		"\tfunction addToast(kind: ToastKind, text: string): void {\n" +
		"\t\tconst id = ++nextId;\n" +
		"\t\ttoasts = [...toasts, { id, kind, text }];\n" +
		"\t}\n" +
		"\n" +
		"\tfunction dismiss(id: number): void {\n" +
		"\t\ttoasts = toasts.filter((t) =\u003e t.id !== id);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction clearAll(): void {\n" +
		"\t\ttoasts = [];\n" +
		"\t}\n" +
		"\n" +
		"\t// Auto-dismiss after 3s. Track timers per toast id so cleanup works when toasts change.\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tconst current = toasts;\n" +
		"\t\tconst timers = current.map((t) =\u003e\n" +
		"\t\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\t\ttoasts = toasts.filter((x) =\u003e x.id !== t.id);\n" +
		"\t\t\t}, 3000)\n" +
		"\t\t);\n" +
		"\t\treturn () =\u003e {\n" +
		"\t\t\tfor (const h of timers) clearTimeout(h);\n" +
		"\t\t};\n" +
		"\t});\n" +
		"\n" +
		"\t// Imagined child component API (kept inline here for demonstration):\n" +
		"\t//   interface Props { onselect?: (item: Item) =\u003e void }\n" +
		"\t// Parents pass typed callback props instead of using createEventDispatcher.\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.9 — Callback prop pattern\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte 5 has no \u003ccode\u003ecreateEventDispatcher\u003c/code\u003e. Components accept typed\n" +
		"\t\tcallback props like \u003ccode\u003eonselect?: (item: Item) =&gt; void\u003c/code\u003e and call them directly. Parents\n" +
		"\t\tpass a handler: \u003ccode\u003e&lt;Picker onselect={'{(i) =\u003e ...}'} /&gt;\u003c/code\u003e. Type-safe, discoverable, no\n" +
		"\t\tstring event names.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eClick a trigger — each calls a typed handler that pushes a toast. Toasts auto-dismiss in 3s.\u003c/p\u003e\n" +
		"\t\t\u003cdiv class=\"triggers\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn info\" onclick={() =\u003e addToast('info', 'Saved your preferences.')}\u003e\n" +
		"\t\t\t\tInfo\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn success\" onclick={() =\u003e addToast('success', 'Profile updated!')}\u003e\n" +
		"\t\t\t\tSuccess\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn error\" onclick={() =\u003e addToast('error', 'Something went wrong.')}\u003e\n" +
		"\t\t\t\tError\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn ghost\" onclick={clearAll}\u003eClear all\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"count\"\u003eActive toasts: \u003cstrong\u003e{toasts.length}\u003c/strong\u003e\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"stack\" aria-live=\"polite\" aria-atomic=\"false\"\u003e\n" +
		"\t\t{#each toasts as t (t.id)}\n" +
		"\t\t\t\u003cdiv class=\"toast\" data-kind={t.kind} role=\"status\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"dot\" aria-hidden=\"true\"\u003e\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"text\"\u003e{t.text}\u003c/span\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"x\" aria-label=\"Dismiss\" onclick={() =\u003e dismiss(t.id)}\u003e×\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/each}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eComponent interface.\u003c/strong\u003e When you extract this pattern to a real component file, the\n" +
		"\t\tinterface looks like: \u003ccode\u003einterface Props {'{'} onselect?: (item: Item) =&gt; void; children: Snippet {'}'}\u003c/code\u003e.\n" +
		"\t\tThe \u003ccode\u003e?\u003c/code\u003e makes the callback optional — the component checks \u003ccode\u003eonselect?.(selected)\u003c/code\u003e\n" +
		"\t\tbefore calling.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eComponents declare callback props with typed signatures.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eParents pass arrow handlers — no event name strings to typo.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eReturn cleanups from \u003ccode\u003e$effect\u003c/code\u003e to clear pending timers.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.9 — Callback prop pattern</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte 5 has no <code>createEventDispatcher</code>. Components accept typed
		callback props like <code>onselect?: (item: Item) =&gt; void</code> and call them directly. Parents
		pass a handler: <code>&lt;Picker onselect={'{(i) => ...}'} /&gt;</code>. Type-safe, discoverable, no
		string event names.
	</p>

	<div class="build">
		<p class="hint">Click a trigger — each calls a typed handler that pushes a toast. Toasts auto-dismiss in 3s.</p>
		<div class="triggers">
			<button type="button" class="btn info" onclick={() => addToast('info', 'Saved your preferences.')}>
				Info
			</button>
			<button type="button" class="btn success" onclick={() => addToast('success', 'Profile updated!')}>
				Success
			</button>
			<button type="button" class="btn error" onclick={() => addToast('error', 'Something went wrong.')}>
				Error
			</button>
			<button type="button" class="btn ghost" onclick={clearAll}>Clear all</button>
		</div>

		<p class="count">Active toasts: <strong>{toasts.length}</strong></p>
	</div>

	<div class="stack" aria-live="polite" aria-atomic="false">
		{#each toasts as t (t.id)}
			<!-- out:fade — standalone exit-only transition on toast dismissal -->
			<div class="toast" data-kind={t.kind} role="status" out:fade={{ duration: 200 }}>
				<span class="dot" aria-hidden="true"></span>
				<span class="text">{t.text}</span>
				<button type="button" class="x" aria-label="Dismiss" onclick={() => dismiss(t.id)}>×</button>
			</div>
		{/each}
	</div>

	<p class="concept">
		<strong>Component interface.</strong> When you extract this pattern to a real component file, the
		interface looks like: <code>interface Props {'{'} onselect?: (item: Item) =&gt; void; children: Snippet {'}'}</code>.
		The <code>?</code> makes the callback optional — the component checks <code>onselect?.(selected)</code>
		before calling.
	</p>

	<h2>Break it on purpose</h2>
	<p class="prose">
		Callback props are the backbone of parent-child communication in Svelte 5. Test their edge cases to understand the contract fully.
	</p>
	<ol class="experiments">
		<li><strong>Pass a callback that throws an error.</strong> Change one of the toast handlers to <code>() =&gt; {'{ throw new Error("boom"); }'}</code> and click the button. The error propagates up to the parent's call stack — the child does not catch it. This is correct behavior: the parent owns the callback logic and is responsible for its error handling. Wrap risky callbacks in try/catch at the call site if you need graceful degradation.</li>
		<li><strong>Make the callback optional and forget to check before calling.</strong> In a child component, declare <code>onselect?: (id: number) =&gt; void</code> with the optional marker, then call <code>onselect(id)</code> without the optional chaining operator. TypeScript warns that <code>onselect</code> might be undefined. Use <code>onselect?.(id)</code> instead — the optional call only invokes the function if it exists.</li>
		<li><strong>Pass an async callback.</strong> Change a handler to <code>async () =&gt; {'{ await fetch(...); }'}</code>. It works — the child calls it, and the promise runs in the background. But if the async callback throws, the rejection is unhandled unless the child wraps the call in <code>try/catch</code> or the parent adds <code>.catch()</code>. Async callbacks need explicit error boundaries on both sides.</li>
		<li><strong>Type the callback with multiple parameters.</strong> Declare <code>onaction: (kind: ToastKind, text: string) =&gt; void</code> in the props interface. The parent must now pass a handler matching that exact signature — TypeScript enforces both the number and types of parameters. This gives you a fully typed communication contract that is checked at every component boundary.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		Callback props are Svelte 5's replacement for <code>createEventDispatcher</code>. Instead of dispatching a string-named event that the parent listens to with <code>on:eventname</code>, a component declares a typed function in its props interface — for example, <code>onselect: (item: Item) =&gt; void</code> — and calls it directly when the action occurs. The parent passes a matching function: <code>&lt;Picker onselect={'{(item) => handleSelect(item)}'} /&gt;</code>. This is simpler, fully type-checked, and eliminates an entire API surface.
	</p>
	<p class="prose">
		Making callbacks optional with <code>?</code> is the standard pattern for components that may or may not need to notify their parent. The child uses optional chaining — <code>onselect?.(item)</code> — to call the callback only when it was provided. This is more ergonomic than checking <code>if (onselect)</code> before every call and mirrors how optional methods work throughout TypeScript codebases. The parent simply omits the prop when it does not care about that particular event.
	</p>
	<p class="prose">
		The parent owns the callback logic; the child merely triggers it. This inversion of control is fundamental to component architecture: the child knows when something happened but not what to do about it. The parent knows what to do but not when. Callback props connect these two halves with a typed interface. Error handling, async coordination, and side effects all live in the parent's handler, keeping the child component pure and reusable across different contexts.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-10-bindings">5.10 — Bindings</a></p>
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
	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.triggers {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.btn {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
		color: var(--color-surface);
	}
	.btn.info {
		background: var(--color-brand);
		border-color: var(--color-brand);
	}
	.btn.success {
		background: var(--color-success);
		border-color: var(--color-success);
	}
	.btn.error {
		background: var(--color-error);
		border-color: var(--color-error);
	}
	.btn.ghost {
		background: var(--color-surface-2);
		color: var(--color-text);
	}
	.count {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.count strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	.stack {
		position: fixed;
		inset-block-end: var(--space-lg);
		inset-inline-end: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		z-index: 100;
		max-inline-size: 22rem;
	}
	.toast {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		box-shadow: var(--shadow-lg);
		animation: fade-in var(--dur-base) var(--ease-out);
	}
	.toast[data-kind='info'] .dot {
		background: var(--color-brand);
	}
	.toast[data-kind='success'] .dot {
		background: var(--color-success);
	}
	.toast[data-kind='error'] .dot {
		background: var(--color-error);
	}
	.dot {
		inline-size: 0.6rem;
		block-size: 0.6rem;
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}
	.text {
		flex: 1;
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.x {
		background: transparent;
		border: 0;
		color: var(--color-text-muted);
		font-size: var(--text-lg);
		cursor: pointer;
		line-height: 1;
		padding: 0 var(--space-xs);
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
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
