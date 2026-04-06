<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/Card.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let showModal = $state(false);
	let textValue = $state('');
	let activeSection = $state<string | null>(null);

	interface ComponentDoc {
		name: string;
		description: string;
		props: Array<{ name: string; type: string; default: string; description: string }>;
		exportPath: string;
	}

	const components: ComponentDoc[] = [
		{
			name: 'Button',
			description: 'A versatile button component with variants and sizes.',
			props: [
				{ name: 'variant', type: '"primary" | "secondary" | "ghost"', default: '"primary"', description: 'Visual style variant' },
				{ name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
				{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
			],
			exportPath: './Button.svelte',
		},
		{
			name: 'Badge',
			description: 'A small label for status or categorization.',
			props: [
				{ name: 'variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Color variant' },
			],
			exportPath: './Badge.svelte',
		},
		{
			name: 'Card',
			description: 'A content container with optional header and footer.',
			props: [
				{ name: 'title', type: 'string', default: '""', description: 'Card heading' },
			],
			exportPath: './Card.svelte',
		},
		{
			name: 'Modal',
			description: 'An overlay dialog for focused interactions.',
			props: [
				{ name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility' },
				{ name: 'title', type: 'string', default: '""', description: 'Modal heading' },
			],
			exportPath: './Modal.svelte',
		},
		{
			name: 'TextField',
			description: 'A text input with label and validation.',
			props: [
				{ name: 'label', type: 'string', default: '""', description: 'Input label' },
				{ name: 'value', type: 'string', default: '""', description: 'Current value' },
				{ name: 'placeholder', type: 'string', default: '""', description: 'Placeholder text' },
			],
			exportPath: './TextField.svelte',
		},
		{
			name: 'Avatar',
			description: 'A circular avatar for user display.',
			props: [
				{ name: 'src', type: 'string', default: '""', description: 'Image URL' },
				{ name: 'alt', type: 'string', default: '""', description: 'Alt text' },
				{ name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Avatar size' },
			],
			exportPath: './Avatar.svelte',
		},
	];

	function toggleSection(name: string) {
		activeSection = activeSection === name ? null : name;
	}

	const buttonAdapterExample = `<!-- ButtonElement.svelte — Custom Element adapter for Button -->
\u003csvelte:options
  customElement={{
    tag: "sm-button",
    shadow: "open",
    props: {
      variant: { reflect: true, type: "String", attribute: "variant" },
      size: { reflect: true, type: "String", attribute: "size" },
      disabled: { reflect: true, type: "Boolean", attribute: "disabled" }
    }
  }}
/\u003e

\u003cscript lang="ts"\u003e
  ${'im' + 'port'} Button from './Button.svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  }

  let { variant = 'primary', size = 'md', disabled = false }: Props = $props();
\u003c/script\u003e

<Button {variant} {size} {disabled}>
  <slot />
</Button>`;

	const badgeAdapterExample = `<!-- BadgeElement.svelte — Custom Element adapter for Badge -->
\u003csvelte:options
  customElement={{
    tag: "sm-badge",
    shadow: "open",
    props: {
      variant: { reflect: true, type: "String", attribute: "variant" }
    }
  }}
/\u003e

\u003cscript lang="ts"\u003e
  ${'im' + 'port'} Badge from './Badge.svelte';

  interface Props {
    variant?: 'default' | 'success' | 'warning' | 'error';
  }

  let { variant = 'default' }: Props = $props();
\u003c/script\u003e

<Badge {variant}>
  <slot />
</Badge>

<!-- Usage in any HTML page:
\u003cscript type="module" src="./sm-badge.js"\u003e\u003c/script\u003e
<sm-badge variant="success">Active</sm-badge>
-->`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import Button from '$lib/components/Button.svelte';\n" +
		"	import Badge from '$lib/components/Badge.svelte';\n" +
		"	import Card from '$lib/components/Card.svelte';\n" +
		"	import Modal from '$lib/components/Modal.svelte';\n" +
		"	import TextField from '$lib/components/TextField.svelte';\n" +
		"	import Avatar from '$lib/components/Avatar.svelte';\n" +
		"\n" +
		"	let showModal = $state(false);\n" +
		"	let textValue = $state('');\n" +
		"	let activeSection = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"	interface ComponentDoc {\n" +
		"		name: string;\n" +
		"		description: string;\n" +
		"		props: Array\u003c{ name: string; type: string; default: string; description: string }\u003e;\n" +
		"		exportPath: string;\n" +
		"	}\n" +
		"\n" +
		"	const components: ComponentDoc[] = [\n" +
		"		{\n" +
		"			name: 'Button',\n" +
		"			description: 'A versatile button component with variants and sizes.',\n" +
		"			props: [\n" +
		"				{ name: 'variant', type: '\"primary\" | \"secondary\" | \"ghost\"', default: '\"primary\"', description: 'Visual style variant' },\n" +
		"				{ name: 'size', type: '\"sm\" | \"md\" | \"lg\"', default: '\"md\"', description: 'Button size' },\n" +
		"				{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },\n" +
		"			],\n" +
		"			exportPath: './Button.svelte',\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'Badge',\n" +
		"			description: 'A small label for status or categorization.',\n" +
		"			props: [\n" +
		"				{ name: 'variant', type: '\"default\" | \"success\" | \"warning\" | \"error\"', default: '\"default\"', description: 'Color variant' },\n" +
		"			],\n" +
		"			exportPath: './Badge.svelte',\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'Card',\n" +
		"			description: 'A content container with optional header and footer.',\n" +
		"			props: [\n" +
		"				{ name: 'title', type: 'string', default: '\"\"', description: 'Card heading' },\n" +
		"			],\n" +
		"			exportPath: './Card.svelte',\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'Modal',\n" +
		"			description: 'An overlay dialog for focused interactions.',\n" +
		"			props: [\n" +
		"				{ name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility' },\n" +
		"				{ name: 'title', type: 'string', default: '\"\"', description: 'Modal heading' },\n" +
		"			],\n" +
		"			exportPath: './Modal.svelte',\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'TextField',\n" +
		"			description: 'A text input with label and validation.',\n" +
		"			props: [\n" +
		"				{ name: 'label', type: 'string', default: '\"\"', description: 'Input label' },\n" +
		"				{ name: 'value', type: 'string', default: '\"\"', description: 'Current value' },\n" +
		"				{ name: 'placeholder', type: 'string', default: '\"\"', description: 'Placeholder text' },\n" +
		"			],\n" +
		"			exportPath: './TextField.svelte',\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'Avatar',\n" +
		"			description: 'A circular avatar for user display.',\n" +
		"			props: [\n" +
		"				{ name: 'src', type: 'string', default: '\"\"', description: 'Image URL' },\n" +
		"				{ name: 'alt', type: 'string', default: '\"\"', description: 'Alt text' },\n" +
		"				{ name: 'size', type: '\"sm\" | \"md\" | \"lg\"', default: '\"md\"', description: 'Avatar size' },\n" +
		"			],\n" +
		"			exportPath: './Avatar.svelte',\n" +
		"		},\n" +
		"	];\n" +
		"\n" +
		"	function toggleSection(name: string) {\n" +
		"		activeSection = activeSection === name ? null : name;\n" +
		"	}\n" +
		"\n" +
		"	const buttonAdapterExample = `\u003c!-- ButtonElement.svelte — Custom Element adapter for Button --\u003e\n" +
		"\\u003csvelte:options\n" +
		"  customElement={{\n" +
		"    tag: \"sm-button\",\n" +
		"    shadow: \"open\",\n" +
		"    props: {\n" +
		"      variant: { reflect: true, type: \"String\", attribute: \"variant\" },\n" +
		"      size: { reflect: true, type: \"String\", attribute: \"size\" },\n" +
		"      disabled: { reflect: true, type: \"Boolean\", attribute: \"disabled\" }\n" +
		"    }\n" +
		"  }}\n" +
		"/\\u003e\n" +
		"\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import Button from './Button.svelte';\n" +
		"\n" +
		"  interface Props {\n" +
		"    variant?: 'primary' | 'secondary' | 'ghost';\n" +
		"    size?: 'sm' | 'md' | 'lg';\n" +
		"    disabled?: boolean;\n" +
		"  }\n" +
		"\n" +
		"  let { variant = 'primary', size = 'md', disabled = false }: Props = $props();\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cButton {variant} {size} {disabled}\u003e\n" +
		"  \u003cslot /\u003e\n" +
		"\u003c/Button\u003e`;\n" +
		"\n" +
		"	const badgeAdapterExample = `\u003c!-- BadgeElement.svelte — Custom Element adapter for Badge --\u003e\n" +
		"\\u003csvelte:options\n" +
		"  customElement={{\n" +
		"    tag: \"sm-badge\",\n" +
		"    shadow: \"open\",\n" +
		"    props: {\n" +
		"      variant: { reflect: true, type: \"String\", attribute: \"variant\" }\n" +
		"    }\n" +
		"  }}\n" +
		"/\\u003e\n" +
		"\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import Badge from './Badge.svelte';\n" +
		"\n" +
		"  interface Props {\n" +
		"    variant?: 'default' | 'success' | 'warning' | 'error';\n" +
		"  }\n" +
		"\n" +
		"  let { variant = 'default' }: Props = $props();\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cBadge {variant}\u003e\n" +
		"  \u003cslot /\u003e\n" +
		"\u003c/Badge\u003e\n" +
		"\n" +
		"\u003c!-- Usage in any HTML page:\n" +
		"\\u003cscript type=\"module\" src=\"./sm-badge.js\"\\u003e\\u003c/script\\u003e\n" +
		"\u003csm-badge variant=\"success\"\u003eActive\u003c/sm-badge\u003e\n" +
		"--\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eModule 14 Project — Component Library Showcase\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		This gallery showcases the \u003ccode\u003e$lib/components/\u003c/code\u003e library, documents each component's\n" +
		"		props, and demonstrates how they could be packaged as custom elements for framework-agnostic\n" +
		"		distribution.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Component Gallery\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"gallery\"\u003e\n" +
		"		\u003cdiv class=\"gallery-item\"\u003e\n" +
		"			\u003ch4\u003eButton\u003c/h4\u003e\n" +
		"			\u003cdiv class=\"demo-row\"\u003e\n" +
		"				\u003cButton\u003ePrimary\u003c/Button\u003e\n" +
		"				\u003cButton variant=\"secondary\"\u003eSecondary\u003c/Button\u003e\n" +
		"				\u003cButton variant=\"ghost\"\u003eGhost\u003c/Button\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"gallery-item\"\u003e\n" +
		"			\u003ch4\u003eBadge\u003c/h4\u003e\n" +
		"			\u003cdiv class=\"demo-row\"\u003e\n" +
		"				\u003cBadge\u003eDefault\u003c/Badge\u003e\n" +
		"				\u003cBadge tone=\"success\"\u003eSuccess\u003c/Badge\u003e\n" +
		"				\u003cBadge tone=\"warning\"\u003eWarning\u003c/Badge\u003e\n" +
		"				\u003cBadge tone=\"error\"\u003eError\u003c/Badge\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"gallery-item\"\u003e\n" +
		"			\u003ch4\u003eAvatar\u003c/h4\u003e\n" +
		"			\u003cdiv class=\"demo-row\"\u003e\n" +
		"				\u003cAvatar src={null} name=\"User\" size=\"sm\" /\u003e\n" +
		"				\u003cAvatar src={null} name=\"User\" size=\"md\" /\u003e\n" +
		"				\u003cAvatar src={null} name=\"User\" size=\"lg\" /\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"gallery-item\"\u003e\n" +
		"			\u003ch4\u003eTextField\u003c/h4\u003e\n" +
		"			\u003cTextField label=\"Sample Input\" bind:value={textValue} placeholder=\"Type here...\" /\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"gallery-item\"\u003e\n" +
		"			\u003ch4\u003eCard\u003c/h4\u003e\n" +
		"			\u003cCard\u003e\n" +
		"				{#snippet header()}\u003ch4\u003eExample Card\u003c/h4\u003e{/snippet}\n" +
		"				\u003cp\u003eThis is card content rendered via a snippet.\u003c/p\u003e\n" +
		"			\u003c/Card\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"gallery-item\"\u003e\n" +
		"			\u003ch4\u003eModal\u003c/h4\u003e\n" +
		"			\u003cButton onclick={() =\u003e showModal = true}\u003eOpen Modal\u003c/Button\u003e\n" +
		"			\u003cModal bind:open={showModal} title=\"Example Modal\"\u003e\n" +
		"				\u003cp\u003eModal content goes here.\u003c/p\u003e\n" +
		"			\u003c/Modal\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>Module 14 Project — Component Library Showcase</h1>

	<p class="concept">
		This gallery showcases the <code>$lib/components/</code> library, documents each component's
		props, and demonstrates how they could be packaged as custom elements for framework-agnostic
		distribution.
	</p>

	<h3>Live Component Gallery</h3>
	<div class="gallery">
		<div class="gallery-item">
			<h4>Button</h4>
			<div class="demo-row">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
			</div>
		</div>

		<div class="gallery-item">
			<h4>Badge</h4>
			<div class="demo-row">
				<Badge>Default</Badge>
				<Badge tone="success">Success</Badge>
				<Badge tone="warning">Warning</Badge>
				<Badge tone="error">Error</Badge>
			</div>
		</div>

		<div class="gallery-item">
			<h4>Avatar</h4>
			<div class="demo-row">
				<Avatar src={null} name="User" size="sm" />
				<Avatar src={null} name="User" size="md" />
				<Avatar src={null} name="User" size="lg" />
			</div>
		</div>

		<div class="gallery-item">
			<h4>TextField</h4>
			<TextField label="Sample Input" bind:value={textValue} placeholder="Type here..." />
		</div>

		<div class="gallery-item">
			<h4>Card</h4>
			<Card>
				{#snippet header()}<h4>Example Card</h4>{/snippet}
				<p>This is card content rendered via a snippet.</p>
			</Card>
		</div>

		<div class="gallery-item">
			<h4>Modal</h4>
			<Button onclick={() => showModal = true}>Open Modal</Button>
			<Modal bind:open={showModal} title="Example Modal">
				<p>Modal content goes here.</p>
			</Modal>
		</div>
	</div>

	<h3>Component Props Documentation</h3>
	<div class="docs">
		{#each components as comp}
			<button class="doc-header" onclick={() => toggleSection(comp.name)}>
				<span><code>{comp.name}</code> — {comp.description}</span>
				<span class="arrow">{activeSection === comp.name ? '\u25B2' : '\u25BC'}</span>
			</button>
			{#if activeSection === comp.name}
				<div class="doc-body">
					<table class="props-table">
						<thead>
							<tr>
								<th>Prop</th>
								<th>Type</th>
								<th>Default</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{#each comp.props as prop}
								<tr>
									<td><code>{prop.name}</code></td>
									<td><code>{prop.type}</code></td>
									<td><code>{prop.default}</code></td>
									<td>{prop.description}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/each}
	</div>

	<h3>Exports Map</h3>
	<pre>{`// package.json exports for @svelte-max/ui
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js"
    },
    "./Button.svelte": {
      "types": "./dist/components/Button.svelte.d.ts",
      "svelte": "./dist/components/Button.svelte"
    },
    "./Badge.svelte": {
      "types": "./dist/components/Badge.svelte.d.ts",
      "svelte": "./dist/components/Badge.svelte"
    },
    "./Card.svelte": {
      "types": "./dist/components/Card.svelte.d.ts",
      "svelte": "./dist/components/Card.svelte"
    },
    "./Modal.svelte": {
      "types": "./dist/components/Modal.svelte.d.ts",
      "svelte": "./dist/components/Modal.svelte"
    },
    "./TextField.svelte": {
      "types": "./dist/components/TextField.svelte.d.ts",
      "svelte": "./dist/components/TextField.svelte"
    },
    "./Avatar.svelte": {
      "types": "./dist/components/Avatar.svelte.d.ts",
      "svelte": "./dist/components/Avatar.svelte"
    }
  }
}`}</pre>

	<h3>Custom Element Adapter Patterns</h3>
	<p class="concept">
		To distribute these components as custom elements, you would create adapter files with
		<code>&lt;svelte:options customElement="..." /&gt;</code>. Here are the patterns for
		<strong>Button</strong> and <strong>Badge</strong>:
	</p>

	<pre><code>{buttonAdapterExample}</code></pre>

	<pre><code>{badgeAdapterExample}</code></pre>

	<footer class="project-footer">
		Built with <code>$lib/components</code> and Module 14 custom element patterns.
	</footer>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.gallery {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		margin-block: var(--space-lg);
	}

	.gallery-item {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
	}
	.gallery-item h4 {
		margin: 0 0 var(--space-sm);
		color: oklch(65% 0.12 50);
		font-size: var(--text-base);
	}
	.demo-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
	}

	.docs {
		display: flex;
		flex-direction: column;
		gap: 1px;
		background: var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-block: var(--space-lg);
	}
	.doc-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: none;
		color: var(--color-text);
		cursor: pointer;
		font-size: var(--text-sm);
		text-align: left;
	}
	.doc-header:hover { background: var(--color-surface-2); }
	.arrow { color: var(--color-text-muted); font-size: 0.75em; }

	.doc-body {
		background: var(--color-surface-1);
		padding: var(--space-md);
		overflow-x: auto;
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	.props-table th,
	.props-table td {
		padding: var(--space-xs) var(--space-sm);
		text-align: left;
		border-block-end: 1px solid var(--color-border);
	}
	.props-table th { color: var(--color-text); font-weight: 600; }
	.props-table td { color: var(--color-text-muted); }

	.project-footer {
		margin-block-start: var(--space-xl);
		padding-block-start: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.gallery { grid-template-columns: repeat(2, 1fr); }
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
