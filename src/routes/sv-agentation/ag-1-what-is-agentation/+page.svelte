<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const installCode = `# Install sv-agentation
pnpm add sv-agentation`;

	const basicUsage = `<script lang="ts">
  ${"import"} { browser, dev } from '$app/environment';
  ${"import"} { Agentation } from 'sv-agentation';

  // Mount only in dev mode + browser
  // Never ships to production
  const workspaceRoot = '/Users/you/projects/my-app';
<\/script>

{#if browser && dev}
  <Agentation {workspaceRoot} />
{/if}`;

	const whyAgentation = `// Without sv-agentation:
// 1. Open DevTools → Elements tab
// 2. Find the DOM node
// 3. Guess which .svelte file renders it
// 4. Search your codebase for matching markup
// 5. Open the file manually

// With sv-agentation:
// 1. Press 'i' → click any element
// 2. Source file + line number appears instantly
// 3. Click "Open in VS Code" → jumps to exact line
// 4. Add notes directly on the element
// 5. Copy structured output for AI prompts or bug reports`;

	const architectureFlow = `// sv-agentation architecture:
//
// Agentation (root component)
//   └─ element-source-inspector.svelte
//       └─ CopyOpenController
//           ├─ controller-state.svelte.ts    (Svelte 5 $state)
//           ├─ controller-selection.ts       (DOM selection)
//           ├─ controller-composer.ts        (note authoring)
//           └─ controller-browser.ts         (clipboard, URL)
//               ├─ components/*              (UI overlays)
//               └─ utils/
//                   ├─ note-*.ts             (persistence)
//                   ├─ selection.ts          (range handling)
//                   └─ source.ts             (file resolution)
//
// Interaction flow:
//   inspect/select → open composer → save note
//     → persist to localStorage → render markers`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // sv-agentation lesson\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>AG.1 — What is sv-agentation?</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>AG.1 — What is sv-agentation?</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>sv-agentation</code> is a dev-mode Svelte 5 inspector that overlays
		your running application with source-aware element inspection and browser annotations. It resolves
		any rendered DOM element back to its <code>.svelte</code> source file and line number, enables
		one-click "Open in VS Code", and lets you annotate elements directly in the page. Annotations
		persist to <code>localStorage</code> and can be copied as structured markdown — perfect for bug
		reports, design reviews, and AI-assisted workflows.
	</p>

	<div class="build">
		<h3 class="section-title">Installation</h3>
		<pre class="code-block"><code>{installCode}</code></pre>

		<h3 class="section-title">Basic usage</h3>
		<pre class="code-block"><code>{basicUsage}</code></pre>
		<p class="chart-note">The <code>browser && dev</code> guard ensures the inspector is tree-shaken from production builds. Zero runtime cost when deployed.</p>

		<h3 class="section-title">Why sv-agentation?</h3>
		<pre class="code-block"><code>{whyAgentation}</code></pre>

		<h3 class="section-title">Architecture</h3>
		<pre class="code-block"><code>{architectureFlow}</code></pre>

		<div class="feature-grid">
			<div class="feature-card">
				<h4>Element inspection</h4>
				<p>Hover any DOM element to see its source file, component name, and line number. Click to lock the selection.</p>
			</div>
			<div class="feature-card">
				<h4>Jump to source</h4>
				<p>One-click opens the exact file and line in VS Code or VS Code Insiders via URL scheme.</p>
			</div>
			<div class="feature-card">
				<h4>Browser annotations</h4>
				<p>Add notes to elements, text selections, or page areas. Notes persist across page reloads.</p>
			</div>
			<div class="feature-card">
				<h4>Structured copy</h4>
				<p>Copy notes as compact, standard, detailed, or forensic markdown — with selector paths, bounding boxes, and computed styles.</p>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Understanding mount conditions and workspace resolution prevents common setup issues.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>browser && dev</code> guard.</strong> The inspector tries to access <code>document</code> during SSR, causing a server-side crash. The guard is not optional — it prevents SSR execution and ensures tree-shaking in production.</li>
		<li><strong>Set <code>workspaceRoot</code> to a wrong path.</strong> Element inspection still works (it reads source metadata from Svelte's compiler output), but "Open in VS Code" generates incorrect <code>vscode://</code> URLs. The file won't open, or worse, it opens a wrong file with the same name in a different project.</li>
		<li><strong>Mount <code>&lt;Agentation /&gt;</code> inside a deeply nested component instead of the root layout.</strong> The inspector only sees DOM elements that are children of its mount point. Mounting in the root <code>+layout.svelte</code> ensures full-page coverage.</li>
		<li><strong>Use the inspector with <code>adapter-static</code> in dev mode.</strong> It works — the guard checks <code>dev</code> from <code>$app/environment</code>, not the adapter type. But in a prerendered build, <code>dev</code> is <code>false</code>, so the inspector is excluded entirely.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>sv-agentation</code> bridges the gap between the rendered DOM and your Svelte source code. The inspector reads element-source metadata that Svelte's compiler embeds during development — every DOM node carries a reference to the <code>.svelte</code> file and line that generated it. This metadata is stripped in production builds, so there is zero cost to your users.</p>
	<p class="prose">The annotation system persists to <code>localStorage</code>, scoped by route via automatic route tracking (or manual <code>pageSessionKey</code>). This means notes survive page reloads and navigation — you can annotate a component on <code>/dashboard</code>, navigate away, come back, and your notes are still there. The structured copy output (compact through forensic) provides progressively more context for AI prompts, bug reports, and design handoffs.</p>
	<p class="next">Next lesson: <a href="/sv-agentation/ag-2-inspection-source">AG.2 — Inspection & Source Resolution</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.chart-note { font-size: var(--text-xs); color: var(--color-text-muted); margin: var(--space-xs) 0 0; }
	.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-sm); }
	.feature-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
