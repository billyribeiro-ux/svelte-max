<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	// Demo state
	let isActive = $state(true);
	let isDisabled = $state(false);
	let size = $state<'sm' | 'md' | 'lg'>('md');
	let variant = $state<'primary' | 'secondary' | 'ghost'>('primary');
	let dark = $state(false);

	// Derived class arrays — the core pattern
	const buttonClasses = $derived([
		'btn',
		`btn-${variant}`,
		`btn-${size}`,
		isActive && 'active',
		isDisabled && 'disabled'
	]);

	// Object syntax demo
	const badgeClasses = $derived({
		badge: true,
		'badge-active': isActive,
		'badge-disabled': isDisabled
	});

	// Mixed syntax demo
	const cardClasses = $derived([
		'card',
		{ elevated: !isDisabled, muted: isDisabled },
		size === 'lg' && 'card-lg',
		dark && 'card-dark'
	]);

	function cycleSize() {
		const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
		const idx = sizes.indexOf(size);
		size = sizes[(idx + 1) % sizes.length];
	}

	function cycleVariant() {
		const variants: Array<'primary' | 'secondary' | 'ghost'> = ['primary', 'secondary', 'ghost'];
		const idx = variants.indexOf(variant);
		variant = variants[(idx + 1) % variants.length];
	}

	/* ── CodeCanvas examples ── */
	const exampleOldVsNew =
		"<!-- OLD: class: directive -->\n" +
		"<div class:active={isActive} class:disabled={isDisabled}>\n" +
		"  ...\n" +
		"</div>\n" +
		"\n" +
		"<!-- NEW: class array (Svelte 5.16+) -->\n" +
		"<div class={['button', isActive && 'active', isDisabled && 'disabled']}>\n" +
		"  ...\n" +
		"</div>";

	const exampleArray =
		"<!-- Array syntax: falsy values are filtered out -->\n" +
		"<div class={[\n" +
		"  'base',\n" +
		"  condition && 'variant',\n" +
		"  size === 'lg' && 'large',\n" +
		"  'always-included'\n" +
		"]}>\n" +
		"  ...\n" +
		"</div>";

	const exampleObject =
		"<!-- Object syntax: truthy keys become classes -->\n" +
		"<div class={{\n" +
		"  active: isActive,\n" +
		"  disabled: isDisabled,\n" +
		"  highlighted: count > 10\n" +
		"}}>\n" +
		"  ...\n" +
		"</div>";

	const exampleMixed =
		"<!-- Combining arrays, objects, and strings -->\n" +
		"<div class={[\n" +
		"  'card',\n" +
		"  { elevated: !flat, bordered: hasBorder },\n" +
		"  size === 'lg' && 'card-lg',\n" +
		"  dark && 'bg-slate-900'\n" +
		"]}>\n" +
		"  ...\n" +
		"</div>";

	const exampleTailwind =
		"<!-- Works great with Tailwind -->\n" +
		"<button class={[\n" +
		"  'px-4 py-2 rounded font-semibold',\n" +
		"  primary\n" +
		"    ? 'bg-blue-600 text-white'\n" +
		"    : 'bg-gray-200 text-gray-800',\n" +
		"  disabled && 'opacity-50 cursor-not-allowed'\n" +
		"]}>\n" +
		"  Click me\n" +
		"</button>";

	const exampleComponent =
		"<!-- Button.svelte: composable with parent classes -->\n" +
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import type { ClassValue } from 'svelte/elements';\n" +
		"  let props: { class?: ClassValue } = $props();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<button {...props} class={['btn-base', props.class]}>\n" +
		"  {@render props.children?.()}\n" +
		"</button>\n" +
		"\n" +
		"<!-- Usage -->\n" +
		"<Button class={['extra', active && 'active']}>Go</Button>";

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  let isActive = $state(true);\n" +
		"  let isDisabled = $state(false);\n" +
		"  let size = $state<'sm' | 'md' | 'lg'>('md');\n" +
		"  let variant = $state<'primary' | 'secondary' | 'ghost'>('primary');\n" +
		"  let dark = $state(false);\n" +
		"\n" +
		"  const buttonClasses = $derived([\n" +
		"    'btn',\n" +
		"    `btn-${variant}`,\n" +
		"    `btn-${size}`,\n" +
		"    isActive && 'active',\n" +
		"    isDisabled && 'disabled'\n" +
		"  ]);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>6.19 — Class Arrays & Objects</h1>\n" +
		"\n" +
		"  <!-- Array syntax -->\n" +
		"  <div class={buttonClasses}>\n" +
		"    I have dynamic classes\n" +
		"  </div>\n" +
		"\n" +
		"  <!-- Object syntax -->\n" +
		"  <div class={{ active: isActive, disabled: isDisabled }}>\n" +
		"    Object syntax\n" +
		"  </div>\n" +
		"\n" +
		"  <!-- Mixed -->\n" +
		"  <div class={['card', { elevated: !isDisabled }, size === 'lg' && 'card-lg']}>\n" +
		"    Mixed syntax\n" +
		"  </div>\n" +
		"</section>";
</script>

<section class="page">
	<h1>6.19 — Class Arrays &amp; Objects</h1>

	<p class="prose">
		Since Svelte 5.16, the <code>class</code> attribute accepts arrays and objects,
		powered by <a href="https://github.com/lukeed/clsx">clsx</a> under the hood.
		This replaces the <code>class:</code> directive with something simpler, more
		flexible, and composable. Think of it like building a guest list for a party —
		you write down every possible name, and falsy values simply don't show up.
	</p>

	<h3>Old vs. new</h3>
	<div class="build">
		<CodeCanvas filename="old-vs-new.svelte" code={exampleOldVsNew} />
		<p class="note">
			The <code>class:</code> directive still works, but the official docs now recommend
			the array/object syntax as simpler and more powerful.
		</p>
	</div>

	<h3>Array syntax</h3>
	<p class="prose">
		Pass an array to <code>class</code>. Falsy values (<code>false</code>,
		<code>undefined</code>, <code>null</code>, <code>0</code>, <code>''</code>)
		are automatically filtered out. This means <code>condition && 'class-name'</code>
		just works — if the condition is false, nothing is added.
	</p>

	<div class="build">
		<CodeCanvas filename="array.svelte" code={exampleArray} />
	</div>

	<h3>Object syntax</h3>
	<p class="prose">
		Pass an object where keys are class names and values are booleans. Truthy keys
		are included, falsy keys are excluded. This is identical to how Vue and clsx work.
	</p>

	<div class="build">
		<CodeCanvas filename="object.svelte" code={exampleObject} />
	</div>

	<h3>Combining arrays + objects</h3>
	<p class="prose">
		Arrays can contain strings, objects, and other arrays — clsx flattens them.
		This is the most powerful pattern: static base classes as strings, conditional
		groups as objects, and one-off toggles as <code>condition && 'name'</code>.
	</p>

	<div class="build">
		<CodeCanvas filename="mixed.svelte" code={exampleMixed} />
	</div>

	<h3>Tailwind integration</h3>
	<p class="prose">
		The array syntax is particularly effective with Tailwind. You can set multiple
		utility classes with a single condition, which is much cleaner than chaining
		multiple <code>class:</code> directives.
	</p>

	<div class="build">
		<CodeCanvas filename="tailwind.svelte" code={exampleTailwind} />
	</div>

	<h3>Composable components</h3>
	<p class="prose">
		With <code>ClassValue</code> from <code>svelte/elements</code>, you can accept
		classes as a typed prop and merge them with internal classes using arrays. The
		consumer of your component can pass strings, arrays, or objects — it all works.
	</p>

	<div class="build">
		<CodeCanvas filename="Button.svelte" code={exampleComponent} />
	</div>

	<h3>Live playground</h3>
	<p class="prose">Toggle the controls and watch the class list update in real time.</p>

	<div class="build">
		<div class="controls">
			<label class="toggle">
				<input type="checkbox" bind:checked={isActive} />
				active
			</label>
			<label class="toggle">
				<input type="checkbox" bind:checked={isDisabled} />
				disabled
			</label>
			<label class="toggle">
				<input type="checkbox" bind:checked={dark} />
				dark
			</label>
			<button type="button" onclick={cycleSize}>size: {size}</button>
			<button type="button" onclick={cycleVariant}>variant: {variant}</button>
		</div>

		<div class="demo-row">
			<div class="demo-card" class:demo-active={isActive} class:demo-disabled={isDisabled} class:demo-dark={dark} class:demo-lg={size === 'lg'} class:demo-sm={size === 'sm'}>
				<h4>Array syntax result</h4>
				<code class="class-output">{JSON.stringify(buttonClasses.filter(Boolean))}</code>
			</div>

			<div class="demo-card">
				<h4>Object syntax result</h4>
				<code class="class-output">{JSON.stringify(badgeClasses)}</code>
			</div>

			<div class="demo-card">
				<h4>Mixed syntax result</h4>
				<code class="class-output">{JSON.stringify(cardClasses)}</code>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what happens, then revert.</p>
	<ol class="experiments">
		<li>
			<strong>Pass <code>class=&#123;undefined&#125;</code> to an element.</strong>
			The <code>class</code> attribute is omitted entirely from the rendered HTML.
			This is consistent with how Svelte handles <code>undefined</code> attribute
			values — the attribute simply does not appear in the DOM.
		</li>
		<li>
			<strong>Mix <code>class:</code> directive and <code>class=&#123;[...]&#125;</code> on the same element.</strong>
			Both work simultaneously — the directive adds/removes its class independently
			of the array. However, this defeats the purpose of using arrays. Pick one
			approach and stick with it for clarity.
		</li>
		<li>
			<strong>Put a number like <code>42</code> in the class array.</strong>
			It becomes the string <code>"42"</code> and is added as a class name. Only
			truly falsy values (<code>false</code>, <code>null</code>, <code>undefined</code>,
			<code>0</code>, <code>''</code>) are filtered out. The number <code>42</code>
			is truthy, so it passes through.
		</li>
		<li>
			<strong>Nest arrays three levels deep: <code>class=&#123;[[['a', ['b']]]]&#125;</code>.</strong>
			It works — clsx flattens arbitrarily nested arrays. You get <code>class="a b"</code>.
			This is useful when composing class arrays from multiple sources, but keep nesting
			reasonable for readability.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		Since Svelte 5.16, the <code>class</code> attribute accepts arrays and objects in
		addition to plain strings. Array items that are falsy are automatically excluded,
		which means <code>condition && 'class-name'</code> is the standard pattern for
		conditional classes. Object keys with truthy values are included as class names.
		Both forms can be freely mixed inside a single array, and nested arrays are
		automatically flattened by clsx.
	</p>
	<p class="prose">
		This syntax replaces the <code>class:</code> directive for most use cases. While
		the directive still works, the array/object approach is more flexible: you can
		toggle multiple classes with a single condition, compose classes from parent and
		child components using arrays, and express complex conditional logic in a single
		attribute. With Tailwind in particular, setting clusters of utility classes
		conditionally becomes much cleaner.
	</p>
	<p class="prose">
		For component libraries, Svelte 5.19 added the <code>ClassValue</code> type
		from <code>svelte/elements</code>. Accept <code>class</code> as a
		<code>ClassValue</code> prop and merge it with your internal classes:
		<code>class=&#123;['internal', props.class]&#125;</code>. The consumer can pass
		strings, arrays, objects, or any combination — the composition is seamless and
		fully type-safe.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-6/project">Module 6 Project</a> — put your styling mastery to work.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text); }

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

		& a {
			color: var(--color-brand);
			text-decoration: underline;
			text-underline-offset: 0.15em;
		}
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		font-style: italic;
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
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
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
		font-size: var(--text-sm);
		transition: background var(--dur-fast) var(--ease-out);
	}

	.controls button:hover {
		background: color-mix(in oklch, var(--color-brand) 85%, black);
	}

	.demo-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.demo-card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		transition: all var(--dur-base) var(--ease-out);
	}

	.demo-card.demo-active {
		border-color: var(--color-brand);
	}

	.demo-card.demo-disabled {
		opacity: 0.5;
	}

	.demo-card.demo-dark {
		background: oklch(0.2 0.02 260);
		color: oklch(0.9 0.01 260);
	}

	.demo-card.demo-lg {
		padding: var(--space-lg);
		font-size: var(--text-lg);
	}

	.demo-card.demo-sm {
		padding: var(--space-xs);
		font-size: var(--text-xs);
	}

	.demo-card h4 {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.class-output {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		word-break: break-all;
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

	@media (min-inline-size: 480px) {
		.demo-row { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.demo-row { gap: var(--space-md); }
	}
</style>
