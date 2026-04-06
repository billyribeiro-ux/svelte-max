<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	// 1) bind:group
	let prefs = $state<string[]>([]);

	// SvelteSet — reactive Set that tracks which checkboxes have ever been checked
	const everChecked = new SvelteSet<string>();
	$effect(() => {
		for (const p of prefs) everChecked.add(p);
	});

	// 2) dimension bindings on a resizable textarea
	let taWidth = $state(0);
	let taHeight = $state(0);
	let sample = $state('Resize me from the corner ↘');

	// 3) <details bind:open>
	let detailsOpen = $state(false);

	function toggleDetails(): void {
		detailsOpen = !detailsOpen;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"// 1) bind:group\n" +
		"\tlet prefs = $state\u003cstring[]\u003e([]);\n" +
		"\n" +
		"\t// 2) dimension bindings on a resizable textarea\n" +
		"\tlet taWidth = $state(0);\n" +
		"\tlet taHeight = $state(0);\n" +
		"\tlet sample = $state('Resize me from the corner ↘');\n" +
		"\n" +
		"\t// 3) \u003cdetails bind:open\u003e\n" +
		"\tlet detailsOpen = $state(false);\n" +
		"\n" +
		"\tfunction toggleDetails(): void {\n" +
		"\t\tdetailsOpen = !detailsOpen;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.10 — Bindings deep dive\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003ebind:value\u003c/code\u003e is the start. \u003ccode\u003ebind:group\u003c/code\u003e binds radios or\n" +
		"\t\tcheckboxes to an array. Media bindings: \u003ccode\u003ebind:currentTime\u003c/code\u003e, \u003ccode\u003ebind:paused\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003ebind:duration\u003c/code\u003e. Dimension bindings (\u003ccode\u003ebind:clientWidth\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003ebind:clientHeight\u003c/code\u003e) are readonly and measured via ResizeObserver.\n" +
		"\t\t\u003ccode\u003ebind:this\u003c/code\u003e grabs the DOM element. \u003ccode\u003e&lt;details bind:open&gt;\u003c/code\u003e syncs open state.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003csection class=\"part\"\u003e\n" +
		"\t\t\t\u003ch4\u003e1. \u003ccode\u003ebind:group\u003c/code\u003e on checkboxes\u003c/h4\u003e\n" +
		"\t\t\t\u003cdiv class=\"checks\"\u003e\n" +
		"\t\t\t\t\u003clabel\u003e\u003cinput type=\"checkbox\" bind:group={prefs} value=\"email\" /\u003e Email\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel\u003e\u003cinput type=\"checkbox\" bind:group={prefs} value=\"sms\" /\u003e SMS\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel\u003e\u003cinput type=\"checkbox\" bind:group={prefs} value=\"push\" /\u003e Push\u003c/label\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cp class=\"state\"\u003eprefs = \u003ccode\u003e[{prefs.map((p) =\u003e `\"${p}\"`).join(', ')}]\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\t\u003c/section\u003e\n" +
		"\n" +
		"\t\t\u003csection class=\"part\"\u003e\n" +
		"\t\t\t\u003ch4\u003e2. Dimension bindings on a resizable \u003ccode\u003e&lt;textarea&gt;\u003c/code\u003e\u003c/h4\u003e\n" +
		"\t\t\t\u003ctextarea\n" +
		"\t\t\t\tclass=\"resizable\"\n" +
		"\t\t\t\tbind:value={sample}\n" +
		"\t\t\t\tbind:clientWidth={taWidth}\n" +
		"\t\t\t\tbind:clientHeight={taHeight}\n" +
		"\t\t\t\u003e\u003c/textarea\u003e\n" +
		"\t\t\t\u003cp class=\"state\"\u003e\n" +
		"\t\t\t\tclientWidth = \u003ccode\u003e{taWidth}px\u003c/code\u003e · clientHeight = \u003ccode\u003e{taHeight}px\u003c/code\u003e\n" +
		"\t\t\t\u003c/p\u003e\n" +
		"\t\t\u003c/section\u003e\n" +
		"\n" +
		"\t\t\u003csection class=\"part\"\u003e\n" +
		"\t\t\t\u003ch4\u003e3. \u003ccode\u003e&lt;details bind:open&gt;\u003c/code\u003e two-way\u003c/h4\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn\" onclick={toggleDetails}\u003e\n" +
		"\t\t\t\t{detailsOpen ? 'Close from outside' : 'Open from outside'}\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\u003cdetails bind:open={detailsOpen}\u003e\n" +
		"\t\t\t\t\u003csummary\u003eClick me (native) or use the button above\u003c/summary\u003e\n" +
		"\t\t\t\t\u003cp class=\"inside\"\u003e\n" +
		"\t\t\t\t\tBoth the summary click and the external button flip the same \u003ccode\u003edetailsOpen\u003c/code\u003e state.\n" +
		"\t\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\u003c/details\u003e\n" +
		"\t\t\t\u003cp class=\"state\"\u003edetailsOpen = \u003ccode\u003e{detailsOpen}\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\t\u003c/section\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ebind:group\u003c/code\u003e collects multiple inputs into an array.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDimension bindings are readonly — set by the browser via ResizeObserver.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ebind:open\u003c/code\u003e on \u003ccode\u003e&lt;details&gt;\u003c/code\u003e is two-way: both sides stay in sync.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.10 — Bindings deep dive</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>bind:value</code> is the start. <code>bind:group</code> binds radios or
		checkboxes to an array. Media bindings: <code>bind:currentTime</code>, <code>bind:paused</code>,
		<code>bind:duration</code>. Dimension bindings (<code>bind:clientWidth</code>,
		<code>bind:clientHeight</code>) are readonly and measured via ResizeObserver.
		<code>bind:this</code> grabs the DOM element. <code>&lt;details bind:open&gt;</code> syncs open state.
	</p>

	<div class="build">
		<section class="part">
			<h4>1. <code>bind:group</code> on checkboxes</h4>
			<div class="checks">
				<label><input type="checkbox" bind:group={prefs} value="email" /> Email</label>
				<label><input type="checkbox" bind:group={prefs} value="sms" /> SMS</label>
				<label><input type="checkbox" bind:group={prefs} value="push" /> Push</label>
			</div>
			<p class="state">prefs = <code>[{prefs.map((p) => `"${p}"`).join(', ')}]</code></p>
			<p class="state">everChecked (SvelteSet) = <code>{'{'}{ [...everChecked].join(', ') }{'}'}</code></p>
		</section>

		<section class="part">
			<h4>2. Dimension bindings on a resizable <code>&lt;textarea&gt;</code></h4>
			<textarea
				class="resizable"
				bind:value={sample}
				bind:clientWidth={taWidth}
				bind:clientHeight={taHeight}
			></textarea>
			<p class="state">
				clientWidth = <code>{taWidth}px</code> · clientHeight = <code>{taHeight}px</code>
			</p>
		</section>

		<section class="part">
			<h4>3. <code>&lt;details bind:open&gt;</code> two-way</h4>
			<button type="button" class="btn" onclick={toggleDetails}>
				{detailsOpen ? 'Close from outside' : 'Open from outside'}
			</button>
			<details bind:open={detailsOpen}>
				<summary>Click me (native) or use the button above</summary>
				<p class="inside">
					Both the summary click and the external button flip the same <code>detailsOpen</code> state.
				</p>
			</details>
			<p class="state">detailsOpen = <code>{detailsOpen}</code></p>
		</section>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		Bindings create two-way data flow, which is powerful but has strict requirements. Test those boundaries.
	</p>
	<ol class="experiments">
		<li><strong>Use <code>bind:value</code> on a read-only element.</strong> Try <code>bind:value</code> on an element that does not accept user input, like a <code>&lt;span&gt;</code> or a <code>&lt;div&gt;</code>. The compiler rejects it — <code>bind:value</code> only works on elements that have a writable <code>value</code> property, like <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, and <code>&lt;select&gt;</code>. This prevents nonsensical two-way bindings at compile time.</li>
		<li><strong>Use <code>bind:value</code> without <code>$state</code>.</strong> Bind to a plain <code>let</code> variable that is not declared with <code>$state</code>. The binding still works for the initial render, but reactivity is broken — changes from the input do not propagate correctly because Svelte cannot track assignments to non-reactive variables. Always use <code>$state</code> for bound values.</li>
		<li><strong>Bind to a non-existent property.</strong> Try <code>bind:nonexistent</code> on an element. TypeScript catches the error immediately — there is no such bindable property on the element type. The compiler knows exactly which properties each HTML element supports for binding, giving you autocompletion and type safety.</li>
		<li><strong>Two-way bind between components without <code>$bindable</code>.</strong> Try <code>bind:value</code> on a child component prop that is not marked with <code>$bindable()</code> in the child. Svelte warns that the prop is not bindable. In Svelte 5, component props must explicitly opt into two-way binding with <code>let {'{'} value = $bindable() {'}'} = $props()</code>, preventing accidental mutation of parent state.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		The <code>bind:</code> directive creates two-way data flow between a DOM element property and a Svelte variable. <code>bind:value</code> synchronizes text inputs, textareas, and selects. <code>bind:checked</code> synchronizes checkboxes. <code>bind:group</code> collects multiple radio buttons or checkboxes into a single array or value. <code>bind:this</code> captures a reference to the DOM element itself, which is essential for imperative operations like focusing, measuring, or integrating with third-party libraries.
	</p>
	<p class="prose">
		Dimension bindings — <code>bind:clientWidth</code>, <code>bind:clientHeight</code>, <code>bind:offsetWidth</code>, <code>bind:offsetHeight</code> — are read-only. Svelte attaches a <code>ResizeObserver</code> under the hood and updates the bound variable whenever the element's size changes. You cannot write to these bindings; they flow one direction only, from the DOM to your state. This is useful for responsive layouts, canvas sizing, and any situation where you need to react to an element's measured dimensions.
	</p>
	<p class="prose">
		For component-to-component bindings, Svelte 5 requires the child prop to be declared with <code>$bindable()</code>. This is an explicit opt-in that prevents parents from accidentally mutating child state through bindings. When a prop is bindable, changes flow both directions: the parent can set the initial value, the child can update it, and both sides stay synchronized. Use component bindings sparingly — they create tight coupling. For most parent-child communication, callback props are the more maintainable choice.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-11-touch-pointer">5.11 — Touch &amp; pointer events</a></p>
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
		gap: var(--space-xl);
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
	.part {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.part h4 {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.checks {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}
	.checks label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
		min-block-size: 44px;
	}
	.resizable {
		resize: both;
		min-inline-size: 200px;
		min-block-size: 80px;
		inline-size: 280px;
		block-size: 120px;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
	.btn {
		align-self: flex-start;
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
	}
	details {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
	}
	summary {
		cursor: pointer;
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.inside {
		margin-block-start: var(--space-sm);
		margin-block-end: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.state {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		/* anchor() positioning — anchor the dimension display for tooltip-style readouts */
		anchor-name: --dimension-readout;
		position-anchor: --dimension-readout;
	}
	@media (min-width: 768px) {
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
