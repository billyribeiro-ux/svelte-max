<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/Card.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

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
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="error">Error</Badge>
			</div>
		</div>

		<div class="gallery-item">
			<h4>Avatar</h4>
			<div class="demo-row">
				<Avatar alt="User" size="sm" />
				<Avatar alt="User" size="md" />
				<Avatar alt="User" size="lg" />
			</div>
		</div>

		<div class="gallery-item">
			<h4>TextField</h4>
			<TextField label="Sample Input" bind:value={textValue} placeholder="Type here..." />
		</div>

		<div class="gallery-item">
			<h4>Card</h4>
			<Card title="Example Card">
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

	<pre>{`<!-- ButtonElement.svelte — Custom Element adapter for Button -->
<svelte:options
  customElement={{
    tag: "sm-button",
    shadow: "open",
    props: {
      variant: { reflect: true, type: "String", attribute: "variant" },
      size: { reflect: true, type: "String", attribute: "size" },
      disabled: { reflect: true, type: "Boolean", attribute: "disabled" }
    }
  }}
/>

<script lang="ts">
  import Button from './Button.svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  }

  let { variant = 'primary', size = 'md', disabled = false }: Props = $props();
</script>

<Button {variant} {size} {disabled}>
  <slot />
</Button>`}</pre>

	<pre>{`<!-- BadgeElement.svelte — Custom Element adapter for Badge -->
<svelte:options
  customElement={{
    tag: "sm-badge",
    shadow: "open",
    props: {
      variant: { reflect: true, type: "String", attribute: "variant" }
    }
  }}
/>

<script lang="ts">
  import Badge from './Badge.svelte';

  interface Props {
    variant?: 'default' | 'success' | 'warning' | 'error';
  }

  let { variant = 'default' }: Props = $props();
</script>

<Badge {variant}>
  <slot />
</Badge>

<!-- Usage in any HTML page:
<script type="module" src="./sm-badge.js"></script>
<sm-badge variant="success">Active</sm-badge>
-->`}</pre>

	<footer class="project-footer">
		Built with <code>$lib/components</code> and Module 14 custom element patterns.
	</footer>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
</style>
