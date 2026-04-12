<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	// Three reactive numbers that feed an OKLCH color string.
	let l = $state(65);
	let c = $state(0.22);
	let h = $state(270);

	// $derived infers `string` from the expression — no annotation needed.
	const colorString = $derived(`oklch(${l}% ${c} ${h})`);

	function reset(): void {
		l = 65;
		c = 0.22;
		h = 270;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"// Three reactive numbers that feed an OKLCH color string.\n" +
		"\tlet l = $state(65);\n" +
		"\tlet c = $state(0.22);\n" +
		"\tlet h = $state(270);\n" +
		"\n" +
		"\t// $derived infers `string` from the expression — no annotation needed.\n" +
		"\tconst colorString = $derived(`oklch(${l}% ${c} ${h})`);\n" +
		"\n" +
		"\tfunction reset(): void {\n" +
		"\t\tl = 65;\n" +
		"\t\tc = 0.22;\n" +
		"\t\th = 270;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.14 — Reactive CSS\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tSvelte 5.16 added clsx-style class bindings:\n" +
		"\t\t\u003ccode\u003e{'class={{ active: isActive, muted: !enabled }}'}\u003c/code\u003e for objects and\n" +
		"\t\t\u003ccode\u003e{\"class={[faded && 'fade', scale && 'scale']}\"}\u003c/code\u003e for arrays. These compose cleanly\n" +
		"\t\twith the legacy \u003ccode\u003eclass:name={'{condition}'}\u003c/code\u003e directive. The\n" +
		"\t\t\u003ccode\u003estyle:property={'{value}'}\u003c/code\u003e directive binds any reactive expression to a CSS\n" +
		"\t\tproperty — including CSS custom properties like \u003ccode\u003estyle:--brand-hue={'{hue}'}\u003c/code\u003e.\n" +
		"\t\tCombined with scoped CSS reading \u003ccode\u003evar(--brand-hue)\u003c/code\u003e, you get reactive styling\n" +
		"\t\twithout touching the DOM or stringifying inline \u003ccode\u003estyle\u003c/code\u003e attributes.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build stack\"\u003e\n" +
		"\t\t\u003ch2\u003eOKLCH color mixer\u003c/h2\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003elightness \u003coutput\u003e{l}%\u003c/output\u003e\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"range\" min=\"0\" max=\"100\" step=\"1\" bind:value={l} /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003echroma \u003coutput\u003e{c.toFixed(2)}\u003c/output\u003e\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"range\" min=\"0\" max=\"0.4\" step=\"0.01\" bind:value={c} /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003ehue \u003coutput\u003e{h}°\u003c/output\u003e\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"range\" min=\"0\" max=\"360\" step=\"1\" bind:value={h} /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"preview\" style:background=\"oklch({l}% {c} {h})\"\u003e\n" +
		"\t\t\t\u003cspan class=\"preview-text\"\u003epreview\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003c!--\n" +
		"\t\t\tclsx-style object binding: exactly one of `dark` or `light` is true at any\n" +
		"\t\t\tmoment. The scoped CSS defines both classes with different OKLCH text colors.\n" +
		"\t\t--\u003e\n" +
		"\t\t\u003cdiv class={['label-card', { dark: l \u003e 60, light: l \u003c= 60 }]}\u003e\n" +
		"\t\t\t\u003cspan\u003eAdaptive label — readable at any lightness\u003c/span\u003e\n" +
		"\t\t\t\u003ccode\u003e{colorString}\u003c/code\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cbutton type=\"button\" class=\"reset\" onclick={reset}\u003eReset to defaults\u003c/button\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build stack\"\u003e\n" +
		"\t\t\u003ch2\u003eCustom property bridge: \u003ccode\u003estyle:--custom\u003c/code\u003e\u003c/h2\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tThe \u003ccode\u003estyle:--card-accent\u003c/code\u003e directive passes a reactive OKLCH string into scoped CSS.\n" +
		"\t\t\tThe card reads it with \u003ccode\u003evar(--card-accent)\u003c/code\u003e — no inline style stringification needed.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\t\u003cdiv\n" +
		"\t\t\tclass=\"accent-card\"\n" +
		"\t\t\tstyle:--card-accent=\"oklch({l}% {c} {h})\"\n" +
		"\t\t\u003e\n" +
		"\t\t\t\u003cspan class=\"accent-title\"\u003eAccent card\u003c/span\u003e\n" +
		"\t\t\t\u003ccode\u003estyle:--card-accent=\"oklch({l}% {c} {h})\"\u003c/code\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tObject class bindings (\u003ccode\u003e{'class={{ dark: l \u003e 60 }}'}\u003c/code\u003e) toggle classes\n" +
		"\t\t\tdeclaratively — no \u003ccode\u003eclassList\u003c/code\u003e calls.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tArray class bindings let you mix static strings and conditional classes in one expression.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003estyle:property={'{value}'}\u003c/code\u003e binds reactive values to CSS properties, including\n" +
		"\t\t\tcustom properties like \u003ccode\u003e--brand-hue\u003c/code\u003e.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tCombining scoped CSS with reactive custom properties gives you skinnable components with zero\n" +
		"\t\t\timperative DOM work.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.14 — Reactive CSS</h1>

	<p class="concept">
		Svelte 5.16 added clsx-style class bindings:
		<code>{'class={{ active: isActive, muted: !enabled }}'}</code> for objects and
		<code>{"class={[faded && 'fade', scale && 'scale']}"}</code> for arrays. These compose cleanly
		with the legacy <code>class:name={'{condition}'}</code> directive. The
		<code>style:property={'{value}'}</code> directive binds any reactive expression to a CSS
		property — including CSS custom properties like <code>style:--brand-hue={'{hue}'}</code>.
		Combined with scoped CSS reading <code>var(--brand-hue)</code>, you get reactive styling
		without touching the DOM or stringifying inline <code>style</code> attributes.
	</p>

	<div class="build stack">
		<h2>OKLCH color mixer</h2>

		<div class="controls">
			<label>
				<span>lightness <output>{l}%</output></span>
				<input type="range" min="0" max="100" step="1" bind:value={l} />
			</label>
			<label>
				<span>chroma <output>{c.toFixed(2)}</output></span>
				<input type="range" min="0" max="0.4" step="0.01" bind:value={c} />
			</label>
			<label>
				<span>hue <output>{h}°</output></span>
				<input type="range" min="0" max="360" step="1" bind:value={h} />
			</label>
		</div>

		<div class="preview" style:background="oklch({l}% {c} {h})">
			<span class="preview-text">preview</span>
		</div>

		<!--
			clsx-style object binding: exactly one of `dark` or `light` is true at any
			moment. The scoped CSS defines both classes with different OKLCH text colors.
		-->
		<div class={['label-card', { dark: l > 60, light: l <= 60 }]}>
			<span>Adaptive label — readable at any lightness</span>
			<code>{colorString}</code>
		</div>

		<button type="button" class="reset" onclick={reset}>Reset to defaults</button>
	</div>

	<div class="build stack">
		<h2>Custom property bridge: <code>style:--custom</code></h2>
		<p class="hint">
			The <code>style:--card-accent</code> directive passes a reactive OKLCH string into scoped CSS.
			The card reads it with <code>var(--card-accent)</code> — no inline style stringification needed.
		</p>
		<div
			class="accent-card"
			style:--card-accent="oklch({l}% {c} {h})"
		>
			<span class="accent-title">Accent card</span>
			<code>style:--card-accent="oklch({l}% {c} {h})"</code>
		</div>
	</div>

	<h2>Break it on purpose</h2>

	<p class="prose">
		Test the boundaries of reactive CSS by trying approaches that work and approaches that fail. Observe the differences.
	</p>

	<ol class="experiments">
		<li>
			<strong>Set a CSS variable in script but do not use <code>style:</code>.</strong>
			Try declaring <code>const color = 'red'</code> in your script and then using
			<code>var(--color)</code> in your scoped CSS without a <code>style:--color</code>
			directive on the element. The CSS variable is never set on the element, so the
			fallback value (or nothing) is used. The markup does not see script variables
			unless you bridge them with <code>style:</code>.
		</li>
		<li>
			<strong>Use <code>style:--color={'={value}'}</code>.</strong> Add
			<code>style:--color={'{colorString}'}</code> to a <code>div</code> and reference
			<code>var(--color)</code> in the scoped CSS. Svelte sets the CSS custom property
			as an inline style on the element. Every time the reactive value changes, the
			custom property updates and the CSS recalculates.
		</li>
		<li>
			<strong>Bind a slider to hue and use <code>style:--hue</code>.</strong> This is
			exactly what the demo above does. The slider drives <code>h</code>, which feeds
			into the OKLCH color string via <code>style:background</code>. You get a live
			color picker with zero imperative DOM code — just reactive bindings flowing into
			CSS.
		</li>
		<li>
			<strong>Try <code>style:background</code> directly vs <code>style:--bg</code> custom property.</strong>
			Both work. <code>style:background</code> sets the inline <code>background</code>
			property directly. <code>style:--bg</code> sets a custom property that your scoped
			CSS reads with <code>var(--bg)</code>. The custom property approach is more flexible
			because multiple CSS rules can read the same property, and you can apply fallbacks
			and calculations in CSS.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		The <code>style:</code> directive sets inline styles reactively on an element. It works
		with standard CSS properties like <code>style:background</code> and with custom
		properties like <code>style:--brand-hue</code>. When the reactive value driving the
		directive changes, Svelte updates the inline style immediately. This bridges the gap
		between script-side reactive state and CSS without manual DOM manipulation or string
		concatenation.
	</p>

	<p class="prose">
		Custom properties are the more powerful pattern because they let scoped CSS read
		reactive values without any inline style duplication. Set
		<code>style:--card-accent={'="oklch(...)"'}</code> on a wrapper element, and every
		descendant can read <code>var(--card-accent)</code> in its styles. This is how you
		build skinnable, themeable components: the parent passes design tokens through custom
		properties, and the child's scoped CSS consumes them.
	</p>

	<p class="prose">
		Combined with OKLCH color functions and reactive bindings, these tools give you live
		design tools directly in the browser. Drag a slider, watch the color change everywhere.
		No JavaScript color manipulation library needed — the browser's CSS engine handles the
		color math, and Svelte handles the reactivity. Object and array class bindings round
		out the picture by toggling classes declaratively based on reactive conditions.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-15-typescript-reactive">2.15 — TypeScript + reactivity</a> — full
		type safety with runes, discriminated unions, and generic state.
	</p>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		font-size: var(--text-base);
		margin-block: var(--space-md) var(--space-lg);
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	h2 {
		font-size: var(--text-lg);
	}

	.controls {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	@media (min-inline-size: 768px) {
		.controls {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.controls label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.controls output {
		font-family: var(--font-mono);
		color: var(--color-text);
		margin-inline-start: var(--space-xs);
	}

	input[type='range'] {
		accent-color: var(--color-brand);
		inline-size: 100%;
	}

	.preview {
		block-size: clamp(8rem, 18vw, 14rem);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-md);
		display: grid;
		place-items: center;
		transition: background var(--dur-fast) var(--ease-out);
	}

	.preview-text {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 800;
		color: oklch(20% 0.02 270);
		mix-blend-mode: difference;
	}

	.label-card {
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-base);
		font-weight: 600;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.label-card.dark {
		background: oklch(96% 0.01 270);
		color: oklch(18% 0.04 270);
	}

	.label-card.light {
		background: oklch(20% 0.04 270);
		color: oklch(96% 0.01 270);
	}

	.label-card code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		opacity: 0.8;
	}

	.reset {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}

	.reset:hover {
		background: var(--color-surface-2);
		border-color: var(--color-brand);
	}

	code {
		font-family: var(--font-mono);
	}

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
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
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.accent-card {
		padding: var(--space-lg);
		border-radius: var(--radius-md);
		border: 3px solid var(--card-accent, var(--color-brand));
		background: color-mix(in oklch, var(--card-accent, var(--color-brand)) 8%, var(--color-surface));
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		transition: border-color var(--dur-fast) var(--ease-out),
			background var(--dur-fast) var(--ease-out);
	}

	.accent-title {
		font-weight: 700;
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	.accent-card code {
		font-size: var(--text-sm);
		opacity: 0.8;
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
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
