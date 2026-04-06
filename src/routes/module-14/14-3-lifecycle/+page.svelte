<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let showShadowNone = $state(false);

	const formUsageExample = `<!-- Usage in a form -->
<form>
  <my-input value="hello" required></my-input>
  <button type="submit">Submit</button>
</form>

\u003cscript\u003e
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target instanceof HTMLFormElement ? e.target : undefined);
      console.log('Form value:', data.get('my-input'));
    });
  }
\u003c/script\u003e`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let showShadowNone = $state(false);\n" +
		"\n" +
		"	const formUsageExample = `\u003c!-- Usage in a form --\u003e\n" +
		"\u003cform\u003e\n" +
		"  \u003cmy-input value=\"hello\" required\u003e\u003c/my-input\u003e\n" +
		"  \u003cbutton type=\"submit\"\u003eSubmit\u003c/button\u003e\n" +
		"\u003c/form\u003e\n" +
		"\n" +
		"\\u003cscript\\u003e\n" +
		"  const form = document.querySelector('form');\n" +
		"  if (form) {\n" +
		"    form.addEventListener('submit', (e) =\u003e {\n" +
		"      e.preventDefault();\n" +
		"      const data = new FormData(e.target instanceof HTMLFormElement ? e.target : undefined);\n" +
		"      console.log('Form value:', data.get('my-input'));\n" +
		"    });\n" +
		"  }\n" +
		"\\u003c/script\\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e14.3 — Lifecycle and Options\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		When Svelte compiles a custom element, it creates a thin wrapper around \u003ccode\u003eHTMLElement\u003c/code\u003e.\n" +
		"		Understanding the \u003cstrong\u003elifecycle\u003c/strong\u003e and the \u003cstrong\u003eoptions object\u003c/strong\u003e gives you\n" +
		"		fine-grained control over shadow DOM mode, attribute reflection, type coercion, and form\n" +
		"		participation via \u003ccode\u003eElementInternals\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Wrapper Approach\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eThe custom element class calls \u003ccode\u003eattachShadow()\u003c/code\u003e in the constructor\u003c/li\u003e\n" +
		"		\u003cli\u003eThe inner Svelte component is mounted on the \u003cstrong\u003enext tick\u003c/strong\u003e after \u003ccode\u003econnectedCallback\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eThis ensures the element is in the DOM before Svelte measures or binds anything\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003edisconnectedCallback\u003c/code\u003e destroys the Svelte component and cleans up effects\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eattributeChangedCallback\u003c/code\u003e updates props reactively\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Options Object\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Instead of passing a simple string to \u003ccode\u003ecustomElement\u003c/code\u003e, you can pass a full\n" +
		"		configuration object with \u003ccode\u003etag\u003c/code\u003e, \u003ccode\u003eshadow\u003c/code\u003e, \u003ccode\u003eprops\u003c/code\u003e, and\n" +
		"		\u003ccode\u003eextend\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cpre\u003e{`\u003csvelte:options\n" +
		"  customElement={{\n" +
		"    tag: \"my-input\",\n" +
		"    shadow: \"none\",\n" +
		"    props: {\n" +
		"      value: {\n" +
		"        reflect: true,\n" +
		"        type: \"String\",\n" +
		"        attribute: \"value\"\n" +
		"      },\n" +
		"      required: {\n" +
		"        reflect: true,\n" +
		"        type: \"Boolean\",\n" +
		"        attribute: \"required\"\n" +
		"      },\n" +
		"      count: {\n" +
		"        reflect: false,\n" +
		"        type: \"Number\",\n" +
		"        attribute: \"count\"\n" +
		"      }\n" +
		"    },\n" +
		"    extend: (customElementConstructor) =\u003e {\n" +
		"      return class extends customElementConstructor {\n" +
		"        static formAssociated = true;\n" +
		"        #internals = this.attachInternals();\n" +
		"\n" +
		"        connectedCallback() {\n" +
		"          super.connectedCallback();\n" +
		"          this.#internals.setFormValue(this.value);\n" +
		"        }\n" +
		"      };\n" +
		"    }\n" +
		"  }}\n" +
		"/\u003e`}\u003c/pre\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>14.3 — Lifecycle and Options</h1>

	<p class="concept">
		When Svelte compiles a custom element, it creates a thin wrapper around <code>HTMLElement</code>.
		Understanding the <strong>lifecycle</strong> and the <strong>options object</strong> gives you
		fine-grained control over shadow DOM mode, attribute reflection, type coercion, and form
		participation via <code>ElementInternals</code>.
	</p>

	<h3>The Wrapper Approach</h3>
	<ul>
		<li>The custom element class calls <code>attachShadow()</code> in the constructor</li>
		<li>The inner Svelte component is mounted on the <strong>next tick</strong> after <code>connectedCallback</code></li>
		<li>This ensures the element is in the DOM before Svelte measures or binds anything</li>
		<li><code>disconnectedCallback</code> destroys the Svelte component and cleans up effects</li>
		<li><code>attributeChangedCallback</code> updates props reactively</li>
	</ul>

	<h3>The Options Object</h3>
	<p class="concept">
		Instead of passing a simple string to <code>customElement</code>, you can pass a full
		configuration object with <code>tag</code>, <code>shadow</code>, <code>props</code>, and
		<code>extend</code>.
	</p>

	<pre>{`<svelte:options
  customElement={{
    tag: "my-input",
    shadow: "none",
    props: {
      value: {
        reflect: true,
        type: "String",
        attribute: "value"
      },
      required: {
        reflect: true,
        type: "Boolean",
        attribute: "required"
      },
      count: {
        reflect: false,
        type: "Number",
        attribute: "count"
      }
    },
    extend: (customElementConstructor) => {
      return class extends customElementConstructor {
        static formAssociated = true;
        #internals = this.attachInternals();

        connectedCallback() {
          super.connectedCallback();
          this.#internals.setFormValue(this.value);
        }
      };
    }
  }}
/>`}</pre>

	<h3>Option Details</h3>

	<div class="build">
		<div class="option-row">
			<code>tag</code>
			<p class="concept">
				The custom element name. Must contain a hyphen per the spec (e.g.
				<code>"my-input"</code>). If set to <code>null</code>, the component is compiled as a
				custom element class but not auto-registered — you call
				<code>customElements.define()</code> yourself.
			</p>
		</div>

		<div class="option-row">
			<code>shadow</code>
			<p class="concept">
				Controls the shadow DOM mode: <code>"open"</code> (default), or <code>"none"</code>.
				With <code>"none"</code>, no shadow root is created — styles are not encapsulated.
			</p>
			<button class="toggle-btn" onclick={() => showShadowNone = !showShadowNone}>
				{showShadowNone ? 'Hide' : 'Show'} shadow: "none" details
			</button>
			{#if showShadowNone}
				<ul>
					<li>Component renders directly into the host element's light DOM</li>
					<li>Global CSS applies — no encapsulation</li>
					<li>Useful for CMS integration where you want theme styles to apply</li>
					<li>Slots work differently (native <code>&lt;slot&gt;</code> requires shadow DOM)</li>
				</ul>
			{/if}
		</div>

		<div class="option-row">
			<code>props</code>
			<p class="concept">
				Maps each prop to an attribute name, a <strong>type</strong> for coercion
				(<code>"String"</code>, <code>"Number"</code>, <code>"Boolean"</code>,
				<code>"Array"</code>, <code>"Object"</code>), and whether to <strong>reflect</strong>
				prop changes back to the attribute.
			</p>
		</div>

		<div class="option-row">
			<code>extend</code>
			<p class="concept">
				A function that receives the generated class and returns an extended version. This is
				how you add <strong>ElementInternals</strong> for form participation, ARIA attributes,
				or any other native custom element API.
			</p>
		</div>
	</div>

	<h3>Mini-Build: Form-Participating Input</h3>
	<p class="concept">
		The code sample above shows a complete <code>&lt;my-input&gt;</code> options object. With
		<code>formAssociated = true</code> and <code>attachInternals()</code>, the element participates
		in <code>&lt;form&gt;</code> submission, validation, and the <code>:invalid</code> CSS
		pseudo-class — just like a native <code>&lt;input&gt;</code>.
	</p>

	<pre><code>{formUsageExample}</code></pre>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>The options object configures <code>tag</code>, <code>shadow</code>, <code>props</code>, and <code>extend</code> for fine-grained control.</li>
		<li>Setting <code>shadow: "none"</code> renders into the light DOM without style encapsulation.</li>
		<li>The <code>props</code> config enables type coercion and attribute reflection for each property.</li>
		<li>The <code>extend</code> function adds <code>ElementInternals</code> for form participation and ARIA support.</li>
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

	.option-row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-block-end: var(--space-md);
		border-block-end: 1px solid var(--color-border);
	}
	.option-row:last-child { border-block-end: none; padding-block-end: 0; }

	.toggle-btn {
		align-self: flex-start;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.toggle-btn:hover { background: var(--color-primary); color: var(--color-text); }

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }


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
