<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const projectCode = `<!-- +layout.svelte (root) -->
<script lang="ts">
  ${"import"} { browser, dev } from '$app/environment';
  ${"import"} { Agentation } from 'sv-agentation';
  ${"import"} type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  const workspaceRoot = '/Users/you/projects/my-app';

  // Feed annotations to a local AI review endpoint
  async function handleCopy(markdown: string, payload: any) {
    await fetch('/api/dev/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ annotations: payload })
    });
  }
<\/script>

<div class="shell">
  {@render children()}
</div>

{#if browser && dev}
  <Agentation
    {workspaceRoot}
    vscodeScheme="vscode"
    openSourceOnClick={true}
    toolbarPosition="bottom-right"
    outputMode="detailed"
    includeComponentContext={true}
    deleteAllDelayMs={3000}
    onCopy={handleCopy}
    copyToClipboard={true}
  />
{/if}`;

	const apiEndpoint = `// src/routes/api/dev/review/+server.ts
${"import"} { json } from '@sveltejs/kit';
${"import"} { dev } from '$app/environment';
${"import"} type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  // Guard: dev-only endpoint
  if (!dev) return json({ error: 'Not available' }, { status: 403 });

  const { annotations } = await request.json();

  // Option A: Write to a local file for review
  // await writeFile('reviews/latest.json', JSON.stringify(annotations, null, 2));

  // Option B: Forward to an AI service
  // const suggestions = await aiService.review(annotations);

  // Option C: Append to a project markdown file
  const lines = annotations.map((a: any) =>
    \`- **[\${a.type}]** \${a.note} (source: \${a.source ?? 'unknown'})\`
  );

  console.log('\\n📝 Review Notes:\\n' + lines.join('\\n'));

  return json({ received: annotations.length });
};`;

	const fullCode =
		"// sv-agentation project: full integration\n" +
		"// Root layout mount + forensic AI workflow + dev API endpoint";
</script>

<section class="page">
	<h1>sv-agentation — Module Project</h1>
	<p class="concept">
		<strong>Module project.</strong> This project integrates sv-agentation into the root layout of
		a SvelteKit application with full AI workflow support. The inspector mounts in the root layout
		(full-page coverage), uses <code>detailed</code> output mode with component context, and routes
		copied annotations to a dev-only API endpoint. The endpoint logs structured review notes to the
		terminal — ready to pipe into an AI assistant, bug tracker, or design review document.
	</p>

	<div class="project-build">
		<h3 class="section-title">Root layout integration</h3>
		<pre class="code-block"><code>{projectCode}</code></pre>

		<h3 class="section-title">Dev-only API endpoint</h3>
		<pre class="code-block"><code>{apiEndpoint}</code></pre>

		<div class="features-grid">
			<div class="feature-card">
				<h4>Full-Page Coverage</h4>
				<p>Mounted in root <code>+layout.svelte</code> — every route is inspectable without per-page setup.</p>
			</div>
			<div class="feature-card">
				<h4>Click-to-Source</h4>
				<p><code>openSourceOnClick</code> + <code>workspaceRoot</code> enables instant VS Code navigation from any element.</p>
			</div>
			<div class="feature-card">
				<h4>AI Pipeline</h4>
				<p><code>onCopy</code> routes annotations to <code>/api/dev/review</code> — a dev-only endpoint that logs structured notes.</p>
			</div>
			<div class="feature-card">
				<h4>Safe Deletion</h4>
				<p><code>deleteAllDelayMs={'{3000}'}</code> gives a 3-second countdown before clearing all annotations.</p>
			</div>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What this project proves</h2>
	<p class="prose">This integration demonstrates the complete sv-agentation workflow: mount once in the root layout, inspect any element across all routes, annotate with structured context, and route the output to a dev-only API endpoint. The <code>browser && dev</code> guard ensures zero production overhead. The <code>onCopy</code> callback bridges visual review and developer tooling — annotations flow from the browser to the terminal to an AI assistant without manual copy-paste.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.project-build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; max-block-size: 400px; }
	.code-block code { background: transparent; padding: 0; }
	.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-sm); }
	.feature-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } & code { font-family: var(--font-mono); font-size: 0.85em; background: var(--color-surface); padding: 0 var(--space-xs); border-radius: var(--radius-xs); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
