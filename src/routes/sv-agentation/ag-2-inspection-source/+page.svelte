<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const inspectionCode = `<script lang="ts">
  ${"import"} { browser, dev } from '$app/environment';
  ${"import"} { Agentation } from 'sv-agentation';

  const workspaceRoot = '/Users/you/projects/my-app';
<\/script>

<!-- Press 'i' to enter inspect mode -->
<!-- Hover elements → source info appears in overlay -->
<!-- Click to lock → "Open in VS Code" button appears -->

{#if browser && dev}
  <Agentation
    {workspaceRoot}
    vscodeScheme="vscode"
    openSourceOnClick={true}
  />
{/if}`;

	const sourceResolution = `// How source resolution works:
//
// 1. Svelte compiler (dev mode) adds data-svelte-source attributes
//    to DOM elements:
//    <div data-svelte-source="src/routes/+page.svelte:42">
//
// 2. sv-agentation reads this attribute when you hover/click
//
// 3. Combines workspaceRoot + relative path:
//    /Users/you/projects/my-app/src/routes/+page.svelte
//
// 4. Generates a VS Code URL:
//    vscode://file/Users/you/.../+page.svelte:42
//
// 5. Browser opens the URL → VS Code jumps to line 42

// For VS Code Insiders:
//   vscodeScheme="vscode-insiders"
//   → vscode-insiders://file/...`;

	const selectorInfo = `// The 'selector' prop restricts inspection to a subtree
<Agentation
  {workspaceRoot}
  selector=".main-content"
/>
// Only elements inside .main-content are inspectable

// Use cases:
// - Ignore navigation/header during inspection
// - Focus on a specific feature area
// - Avoid inspecting third-party widget DOM`;

	const propsReference = `// Key Agentation props:
//
// workspaceRoot: string | null
//   Absolute path to your repo root for source resolution
//
// selector: string | null
//   CSS selector to restrict inspectable area
//
// vscodeScheme: 'vscode' | 'vscode-insiders'
//   Which VS Code variant to open (default: 'vscode')
//
// openSourceOnClick: boolean
//   Auto-open source file when clicking an element (default: false)
//
// toolbarPosition: 'top-left' | 'top-center' | ... | 'bottom-right'
//   Where to place the floating toolbar
//
// pauseAnimations: boolean
//   Freeze CSS animations while inspecting (default: false)
//
// includeComponentContext: boolean
//   Add Svelte component hierarchy to copy output
//
// includeComputedStyles: boolean
//   Add computed CSS styles to forensic output`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Inspection & source resolution\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>AG.2 — Inspection & Source Resolution</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>AG.2 — Inspection & Source Resolution</h1>
	<p class="concept">
		<strong>Concept.</strong> The core feature of sv-agentation is <strong>source resolution</strong> — mapping
		a rendered DOM element back to the <code>.svelte</code> file and line that created it. Svelte's
		compiler adds <code>data-svelte-source</code> attributes in dev mode. The inspector reads these,
		combines them with your <code>workspaceRoot</code>, and generates a <code>vscode://</code> URL
		that opens the exact file at the exact line. With <code>openSourceOnClick</code>, a single click
		takes you from browser to editor.
	</p>

	<div class="build">
		<h3 class="section-title">Inspection setup</h3>
		<pre class="code-block"><code>{inspectionCode}</code></pre>

		<h3 class="section-title">Source resolution flow</h3>
		<pre class="code-block"><code>{sourceResolution}</code></pre>

		<h3 class="section-title">Scoped inspection with selector</h3>
		<pre class="code-block"><code>{selectorInfo}</code></pre>

		<h3 class="section-title">Props reference</h3>
		<pre class="code-block"><code>{propsReference}</code></pre>

		<div class="shortcut-grid">
			<div class="shortcut-card"><kbd>i</kbd><span>Toggle inspect mode</span></div>
			<div class="shortcut-card"><kbd>c</kbd><span>Copy current selection</span></div>
			<div class="shortcut-card"><kbd>r</kbd><span>Toggle marker visibility</span></div>
			<div class="shortcut-card"><kbd>o</kbd><span>Open source in editor</span></div>
			<div class="shortcut-card"><kbd>Esc</kbd><span>Exit inspect mode</span></div>
			<div class="shortcut-card"><kbd>Shift+Ctrl+Click</kbd><span>Grouped selection</span></div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Source resolution depends on compiler metadata and correct path configuration.</p>
	<ol class="experiments">
		<li><strong>Inspect an element rendered by a third-party library.</strong> Library components compiled without dev-mode source metadata won't have <code>data-svelte-source</code> attributes. The inspector shows the DOM structure but cannot resolve to a source file. You'll see "Unknown source" — this is expected for pre-compiled packages.</li>
		<li><strong>Set <code>openSourceOnClick={'{true}'}</code> without setting <code>workspaceRoot</code>.</strong> The inspector generates a relative path like <code>vscode://file/src/routes/+page.svelte:42</code> — VS Code can't resolve this without an absolute base. Always provide <code>workspaceRoot</code> when using <code>openSourceOnClick</code>.</li>
		<li><strong>Use <code>selector</code> with a CSS selector that matches no elements.</strong> The inspector mounts but has nothing to inspect — hover events are ignored because no elements pass the selector filter. It silently does nothing rather than throwing an error.</li>
		<li><strong>Enable <code>pauseAnimations</code> on a page with GSAP timelines.</strong> <code>pauseAnimations</code> only freezes CSS animations and transitions (via <code>animation-play-state: paused</code>). GSAP timelines run via JavaScript <code>requestAnimationFrame</code> and are unaffected. You'd need GSAP's own <code>gsap.globalTimeline.pause()</code> for that.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Source resolution is a compiler-level feature. Svelte's dev mode embeds file path and line number metadata directly into the DOM. <code>sv-agentation</code> reads this metadata, combines it with your <code>workspaceRoot</code>, and constructs a <code>vscode://file/...</code> URL. This URL scheme is handled by VS Code natively — no extension required. The browser opens the URL, VS Code intercepts it, and navigates to the exact line.</p>
	<p class="prose">The keyboard shortcuts (<code>i</code>, <code>c</code>, <code>r</code>, <code>o</code>, <code>Esc</code>) provide a mouseless workflow for rapid inspection. Press <code>i</code> to enter inspect mode, hover to preview source info, <code>o</code> to open in editor, <code>Esc</code> to exit. This is faster than DevTools for the common task of "which component renders this element?"</p>
	<p class="next">Next lesson: <a href="/sv-agentation/ag-3-annotations-copy">AG.3 — Annotations & Copy Output</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.shortcut-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-xs); }
	.shortcut-card { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm) var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & kbd { font-family: var(--font-mono); font-size: var(--text-xs); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xs); padding: 2px 6px; color: var(--color-text); } & span { font-size: var(--text-xs); color: var(--color-text-muted); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
