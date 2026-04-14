<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let activeTab = $state<'config' | 'layout' | 'content'>('config');

	const configCode = `// pterodactyl.config.ts
${"import"} type { PterodactylConfig } from 'pterodactyl-core';

export default {
  site: {
    title: 'Acme SDK',
    description: 'Developer documentation for the Acme SDK',
    url: 'https://docs.acme.dev'
  },
  versions: {
    current: 'v2.0',
    available: [
      { id: 'v2.0', label: 'v2.0 (Current)', status: 'latest' },
      { id: 'v1.0', label: 'v1.0', status: 'legacy' }
    ],
    aliases: { latest: 'v2.0' }
  },
  theme: {
    preset: 'supabase',
    cssVars: {
      '--color-primary': 'oklch(62% 0.20 265)',
      '--color-primary-light': 'oklch(68% 0.18 265)',
      '--font-family-base': "'Inter Variable', sans-serif"
    }
  },
  search: {
    enabled: true,
    hotkeys: ['ctrl+k', 'cmd+k'],
    threshold: 0.3
  }
} satisfies PterodactylConfig;`;

	const layoutCode = `${'<'}!-- src/routes/docs/[...path]/+layout.svelte -->
${'<'}script lang="ts">
  ${"import"} DocsLayout from '$lib/components/pterodactyl/DocsLayout.svelte';
  ${"import"} Header from '$lib/components/pterodactyl/Header.svelte';
  ${"import"} Sidebar from '$lib/components/pterodactyl/Sidebar.svelte';
  ${"import"} TOC from '$lib/components/pterodactyl/TOC.svelte';
  ${"import"} SearchModal from '$lib/components/pterodactyl/SearchModal.svelte';
  ${"import"} Breadcrumbs from '$lib/components/pterodactyl/Breadcrumbs.svelte';
  ${"import"} PrevNext from '$lib/components/pterodactyl/PrevNext.svelte';
  ${"import"} VersionSelector from '$lib/components/pterodactyl/VersionSelector.svelte';
  ${"import"} type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = ${'$'}props();
${'<'}/script>

${'<'}Header title="Acme SDK Docs">
  ${'{'} #snippet actions() ${'}'}
    ${'<'}VersionSelector />
  ${'{'} /snippet ${'}'}
${'<'}/Header>

${'<'}SearchModal />

${'<'}DocsLayout>
  ${'{'} #snippet sidebar() ${'}'}
    ${'<'}Sidebar />
  ${'{'} /snippet ${'}'}

  ${'{'} #snippet content() ${'}'}
    ${'<'}Breadcrumbs />
    ${'{'} @render children() ${'}'}
    ${'<'}PrevNext />
  ${'{'} /snippet ${'}'}

  ${'{'} #snippet toc() ${'}'}
    ${'<'}TOC />
  ${'{'} /snippet ${'}'}
${'<'}/DocsLayout>`;

	const contentCode = `---
title: Authentication
description: Learn how to authenticate with the Acme SDK
section: guides
order: 2
---

${'<'}script>
  import { CodeTabs } from '$lib/components/pterodactyl/CodeTabs.svelte';
  import { Callout } from '$lib/components/pterodactyl/Callout.svelte';
  import LiveExample from '$lib/components/pterodactyl/LiveExample.svelte';
${'<'}/script>

# Authentication

The Acme SDK supports API key and OAuth2 authentication.

${'<'}Callout type="info">
  API keys are recommended for server-side usage.
  Use OAuth2 for client-side applications.
${'<'}/Callout>

## Quick Start

${'<'}CodeTabs labels=${'{'} ['API Key', 'OAuth2'] ${'}'} >

\\\`\\\`\\\`typescript
import { Acme } from '@acme/sdk';
const client = new Acme({ apiKey: process.env.ACME_KEY });
\\\`\\\`\\\`

\\\`\\\`\\\`typescript
import { Acme } from '@acme/sdk';
const client = new Acme({ oauth: { clientId: '...' } });
\\\`\\\`\\\`

${'<'}/CodeTabs>

## Interactive Example

${'<'}LiveExample>
  ${'<'}input placeholder="Enter API key" />
  ${'<'}button>Test Connection${'<'}/button>
${'<'}/LiveExample>`;

	const fullCode =
		"// Pterodactyl project: complete docs site with versioning, search, theming";
</script>

<section class="page">
	<h1>Pterodactyl — Module Project</h1>
	<p class="concept">
		<strong>Module project.</strong> A complete documentation site for a fictional SDK using
		Pterodactyl. Features: supabase theme with OKLCH brand customization, multi-version docs
		(v1.0 legacy + v2.0 current), Cmd+K search, tri-pane layout with sidebar/content/TOC,
		breadcrumbs, prev/next navigation, code tabs, callouts, and interactive live examples.
	</p>

	<div class="tab-bar">
		<button class:active={activeTab === 'config'} onclick={() => activeTab = 'config'}>Config</button>
		<button class:active={activeTab === 'layout'} onclick={() => activeTab = 'layout'}>Layout</button>
		<button class:active={activeTab === 'content'} onclick={() => activeTab = 'content'}>Content</button>
	</div>

	<div class="project-build">
		{#if activeTab === 'config'}
			<h3 class="section-title">pterodactyl.config.ts</h3>
			<pre class="code-block"><code>{configCode}</code></pre>
		{:else if activeTab === 'layout'}
			<h3 class="section-title">Docs layout</h3>
			<pre class="code-block"><code>{layoutCode}</code></pre>
		{:else}
			<h3 class="section-title">Example content page</h3>
			<pre class="code-block"><code>{contentCode}</code></pre>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="project" code={fullCode} />
	</details>

	<h2>What this project proves</h2>
	<p class="prose">This documentation site integrates every Pterodactyl feature: the config drives theming, versioning, and search; the layout composes 7 components via Svelte 5 snippets; and the content uses MDsveX to embed interactive components, tabbed code blocks, and callouts directly in markdown. The entire site deploys as static files via <code>adapter-static</code> — zero server infrastructure for production documentation.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.tab-bar { display: flex; gap: var(--space-xs); & button { padding: var(--space-xs) var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm); cursor: pointer; color: var(--color-text-muted); &.active { background: var(--color-surface-2); color: var(--color-text); border-color: var(--color-brand); } } }
	.project-build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; max-block-size: 500px; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
