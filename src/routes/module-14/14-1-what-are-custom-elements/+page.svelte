<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let activeTab = $state<'svelte' | 'custom'>('svelte');


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let activeTab = $state\u003c'svelte' | 'custom'\u003e('svelte');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e14.1 — What Are Custom Elements\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCustom Elements\u003c/strong\u003e are part of the Web Components standard — a set of browser-native\n" +
		"		APIs that let you define your own HTML tags. Combined with \u003cstrong\u003eShadow DOM\u003c/strong\u003e for style\n" +
		"		encapsulation and \u003cstrong\u003eHTML Templates\u003c/strong\u003e for markup, they allow framework-agnostic,\n" +
		"		reusable UI components that work anywhere HTML works.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Web Components Standard\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eCustom Elements API\u003c/strong\u003e — register new tags via \u003ccode\u003ecustomElements.define()\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eShadow DOM\u003c/strong\u003e — scoped styles and encapsulated DOM trees\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eHTML Templates\u003c/strong\u003e — inert markup via \u003ccode\u003e&lt;template&gt;\u003c/code\u003e and \u003ccode\u003e&lt;slot&gt;\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eES Modules\u003c/strong\u003e — standard import/export for distribution\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhen Svelte Custom Elements Make Sense\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Svelte can compile components directly into custom elements. This is ideal when you need to\n" +
		"		\u003cstrong\u003eembed widgets\u003c/strong\u003e in non-Svelte environments: CMS platforms (WordPress, Drupal),\n" +
		"		static sites, legacy apps, or any context where you cannot control the build pipeline. The\n" +
		"		compiled output is a self-contained class extending \u003ccode\u003eHTMLElement\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eTrade-offs: Regular vs Custom Element\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"tab-bar\"\u003e\n" +
		"			\u003cbutton\n" +
		"				class=\"tab\"\n" +
		"				class:active={activeTab === 'svelte'}\n" +
		"				onclick={() =\u003e activeTab = 'svelte'}\n" +
		"			\u003eRegular Svelte\u003c/button\u003e\n" +
		"			\u003cbutton\n" +
		"				class=\"tab\"\n" +
		"				class:active={activeTab === 'custom'}\n" +
		"				onclick={() =\u003e activeTab = 'custom'}\n" +
		"			\u003eCustom Element\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ctable class=\"comparison\"\u003e\n" +
		"			\u003cthead\u003e\n" +
		"				\u003ctr\u003e\n" +
		"					\u003cth\u003eFeature\u003c/th\u003e\n" +
		"					\u003cth\u003eRegular Svelte\u003c/th\u003e\n" +
		"					\u003cth\u003eCustom Element\u003c/th\u003e\n" +
		"				\u003c/tr\u003e\n" +
		"			\u003c/thead\u003e\n" +
		"			\u003ctbody\u003e\n" +
		"				\u003ctr\u003e\n" +
		"					\u003ctd\u003eSSR Support\u003c/td\u003e\n" +
		"					\u003ctd class=\"yes\"\u003eFull SSR / SSG\u003c/td\u003e\n" +
		"					\u003ctd class=\"no\"\u003eClient-only\u003c/td\u003e\n" +
		"				\u003c/tr\u003e\n" +
		"				\u003ctr\u003e\n" +
		"					\u003ctd\u003eStyle Encapsulation\u003c/td\u003e\n" +
		"					\u003ctd\u003eScoped via compiler\u003c/td\u003e\n" +
		"					\u003ctd\u003eShadow DOM (native)\u003c/td\u003e\n" +
		"				\u003c/tr\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>14.1 — What Are Custom Elements</h1>

	<p class="concept">
		<strong>Custom Elements</strong> are part of the Web Components standard — a set of browser-native
		APIs that let you define your own HTML tags. Combined with <strong>Shadow DOM</strong> for style
		encapsulation and <strong>HTML Templates</strong> for markup, they allow framework-agnostic,
		reusable UI components that work anywhere HTML works.
	</p>

	<h3>The Web Components Standard</h3>
	<ul>
		<li><strong>Custom Elements API</strong> — register new tags via <code>customElements.define()</code></li>
		<li><strong>Shadow DOM</strong> — scoped styles and encapsulated DOM trees</li>
		<li><strong>HTML Templates</strong> — inert markup via <code>&lt;template&gt;</code> and <code>&lt;slot&gt;</code></li>
		<li><strong>ES Modules</strong> — standard import/export for distribution</li>
	</ul>

	<h3>When Svelte Custom Elements Make Sense</h3>
	<p class="concept">
		Svelte can compile components directly into custom elements. This is ideal when you need to
		<strong>embed widgets</strong> in non-Svelte environments: CMS platforms (WordPress, Drupal),
		static sites, legacy apps, or any context where you cannot control the build pipeline. The
		compiled output is a self-contained class extending <code>HTMLElement</code>.
	</p>

	<h3>Trade-offs: Regular vs Custom Element</h3>
	<div class="build">
		<div class="tab-bar">
			<button
				class="tab"
				class:active={activeTab === 'svelte'}
				onclick={() => activeTab = 'svelte'}
			>Regular Svelte</button>
			<button
				class="tab"
				class:active={activeTab === 'custom'}
				onclick={() => activeTab = 'custom'}
			>Custom Element</button>
		</div>

		<table class="comparison">
			<thead>
				<tr>
					<th>Feature</th>
					<th>Regular Svelte</th>
					<th>Custom Element</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>SSR Support</td>
					<td class="yes">Full SSR / SSG</td>
					<td class="no">Client-only</td>
				</tr>
				<tr>
					<td>Style Encapsulation</td>
					<td>Scoped via compiler</td>
					<td>Shadow DOM (native)</td>
				</tr>
				<tr>
					<td>Framework Agnostic</td>
					<td class="no">Svelte only</td>
					<td class="yes">Any HTML page</td>
				</tr>
				<tr>
					<td>Props</td>
					<td>JS values (any type)</td>
					<td>String attributes + type coercion</td>
				</tr>
				<tr>
					<td>Events</td>
					<td>Callback props</td>
					<td>CustomEvent dispatch</td>
				</tr>
				<tr>
					<td>Bundle Size</td>
					<td>Smaller (shared runtime)</td>
					<td>Larger (standalone)</td>
				</tr>
				<tr>
					<td>Slot Support</td>
					<td>Svelte snippets</td>
					<td>Native <code>&lt;slot&gt;</code></td>
				</tr>
				<tr>
					<td>DevTools</td>
					<td>Svelte DevTools</td>
					<td>Browser Elements panel</td>
				</tr>
			</tbody>
		</table>
	</div>

	<h3>Key Takeaway</h3>
	<p class="concept">
		Use <strong>regular Svelte components</strong> when building a Svelte app — they are smaller,
		faster, and support SSR. Use <strong>custom elements</strong> when you need to ship a component
		to consumers who do not use Svelte. The compilation target changes, but the authoring experience
		stays the same.
	</p>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment clarifies a Web Components boundary. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Try to use a custom element tag name without a hyphen, like <code>counter</code>.</strong> The browser throws an error because the Web Components spec requires at least one hyphen in the tag name. This prevents collisions with current and future HTML elements, which are all single-word names. The hyphen is what makes <code>my-counter</code> valid but <code>counter</code> invalid.</li>
		<li><strong>Try to SSR a page that contains a custom element.</strong> The server-side render fails or produces empty output because custom elements require a browser DOM to function. Unlike regular Svelte components, custom elements cannot be rendered to HTML on the server, which is why SSR support is listed as a trade-off in the comparison table.</li>
		<li><strong>Pass a JavaScript object as an attribute to a custom element in plain HTML.</strong> The attribute value is always a string, so the object becomes <code>"[object Object]"</code>. Custom elements receive all attribute values as strings and must coerce them to the desired type. This is a fundamental limitation of the HTML attribute system that does not exist in regular Svelte props.</li>
		<li><strong>Inspect the Shadow DOM of a custom element in the browser's Elements panel.</strong> The component's internal markup is hidden inside a shadow root. External CSS cannot reach it, and external JavaScript cannot query its internal elements with <code>document.querySelector</code>. This demonstrates Shadow DOM encapsulation, which is both the primary benefit and the primary constraint of custom elements.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Custom Elements are part of the Web Components standard, a set of browser-native APIs that let you define your own HTML tags. Combined with Shadow DOM for style encapsulation and HTML Templates for markup, they create framework-agnostic, reusable UI components that work anywhere HTML works. The Custom Elements API registers new tags via <code>customElements.define()</code>, and each tag must contain at least one hyphen to avoid collisions with built-in HTML elements.</p>
	<p class="prose">Svelte can compile components directly into custom elements, producing a self-contained class that extends <code>HTMLElement</code>. This is ideal for embedding widgets in non-Svelte environments: CMS platforms like WordPress, static marketing pages, legacy jQuery applications, or any context where you cannot control the build pipeline. The compiled output registers itself with the browser and renders inside a Shadow DOM root, fully encapsulated from the host page's styles.</p>
	<p class="prose">The trade-off is clear: regular Svelte components are smaller, faster, and support SSR because they share the Svelte runtime and render to HTML on the server. Custom elements are client-only, carry a larger bundle (standalone runtime), and pass props as string attributes requiring type coercion. Choose regular Svelte components when building a Svelte app, and choose custom elements when shipping a component to consumers who do not use Svelte. The authoring experience is identical in both cases.</p>
	<p class="next">Next, you will learn how to build a custom element from a Svelte component using the <code>customElement</code> compiler option.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.tab-bar { display: flex; gap: var(--space-xs); }
	.tab {
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.tab.active {
		background: var(--color-primary);
		color: var(--color-text);
		border-color: var(--color-primary);
	}

	.comparison {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	.comparison th, .comparison td {
		padding: var(--space-sm) var(--space-md);
		text-align: left;
		border-block-end: 1px solid var(--color-border);
	}
	.comparison th {
		color: var(--color-text);
		font-weight: 600;
	}
	.comparison td {
		color: var(--color-text-muted);
	}
	.comparison .yes { color: var(--color-success); }
	.comparison .no { color: var(--color-error); }

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
