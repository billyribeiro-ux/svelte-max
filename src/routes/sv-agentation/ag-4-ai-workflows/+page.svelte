<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const aiWorkflowCode = `<script lang="ts">
  ${"import"} { browser, dev } from '$app/environment';
  ${"import"} { Agentation } from 'sv-agentation';

  async function handleCopy(markdown: string, payload: any) {
    // Option 1: Copy to clipboard (default behavior)
    // Already handled by copyToClipboard={true}

    // Option 2: Send to a local AI proxy
    await fetch('/api/ai-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        annotations: payload,
        context: 'UI review for dashboard feature',
        outputFormat: 'suggestions'
      })
    });

    // Option 3: Feed directly into an MCP tool
    // The forensic output contains everything an AI needs:
    // - Source file paths and line numbers
    // - CSS selector paths for locating elements
    // - Component hierarchy for understanding structure
    // - Computed styles for CSS debugging
    // - Bounding boxes for layout analysis
  }
<\/script>

{#if browser && dev}
  <Agentation
    workspaceRoot="/Users/you/projects/my-app"
    outputMode="forensic"
    includeComponentContext={true}
    includeComputedStyles={true}
    onCopy={handleCopy}
    copyToClipboard={true}
  />
{/if}`;

	const forensicOutput = `// Forensic output example (what gets copied):
//
// ## Annotation: Button text truncated
// - **Type:** element
// - **Route:** /dashboard
// - **Timestamp:** 2026-04-13T19:30:00Z
// - **Selector:** main > .dashboard > .card:nth-child(3) > button.cta
// - **Source:** src/routes/dashboard/+page.svelte:87
// - **Component:** Dashboard > Card > CtaButton
// - **Bounding Box:** { x: 340, y: 520, width: 120, height: 36 }
// - **Nearby Text:** "View details..."
// - **Computed Styles:**
//     font-size: 14px
//     font-weight: 600
//     color: oklch(0.95 0 0)
//     background: oklch(0.55 0.25 300)
//     padding: 8px 16px
//     overflow: hidden
//     text-overflow: ellipsis
//     white-space: nowrap
//     max-width: 120px`;

	const promptPatterns = `// AI prompt patterns using sv-agentation output:

// Pattern 1: Bug diagnosis
// "Here is a UI bug report from sv-agentation. The button text
//  is being truncated. Given the computed styles and source file,
//  suggest a CSS fix that maintains the layout."

// Pattern 2: Design review
// "Review these 5 annotations from a design QA session.
//  For each, suggest whether it's a bug, design debt, or
//  intentional. Reference the component hierarchy."

// Pattern 3: Accessibility audit
// "Analyze these annotations. For each element, check if it
//  has appropriate ARIA attributes based on its role. The
//  selector path and component context are included."

// Pattern 4: CSS migration
// "These annotations highlight elements using legacy CSS
//  patterns. Suggest PE7-compliant replacements using OKLCH,
//  logical properties, and fluid typography."

// Pattern 5: Component extraction
// "These 3 annotations mark elements that share similar
//  structure. Suggest a reusable Svelte 5 component with
//  typed props that replaces all three."`;

	const deleteAllFlow = `// Delete-all with configurable delay
<Agentation
  workspaceRoot="..."
  deleteAllDelayMs={3000}
/>
// When "Delete All" is triggered:
// 1. A countdown appears (3 seconds)
// 2. User can cancel during the countdown
// 3. After delay, all annotations are removed from localStorage
//
// Default: 2000ms. Set to 0 for instant delete (no undo).`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // AI workflow integration\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>AG.4 — AI Workflow Integration</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>AG.4 — AI Workflow Integration</h1>
	<p class="concept">
		<strong>Concept.</strong> The forensic output mode turns sv-agentation into a bridge between
		visual UI review and AI-assisted development. When you annotate an element and copy in forensic
		mode, the output includes the source file path, CSS selector, component hierarchy, bounding box,
		nearby text, and computed styles. This structured payload is exactly what an AI assistant needs
		to diagnose CSS bugs, suggest component extractions, or run accessibility audits — all from a
		single visual annotation.
	</p>

	<div class="build">
		<h3 class="section-title">Forensic copy workflow</h3>
		<pre class="code-block"><code>{aiWorkflowCode}</code></pre>

		<h3 class="section-title">Forensic output structure</h3>
		<pre class="code-block"><code>{forensicOutput}</code></pre>
		<p class="chart-note">Every field is machine-readable. AI assistants can parse the selector to locate elements, the source path to find code, and computed styles to diagnose layout issues.</p>

		<h3 class="section-title">AI prompt patterns</h3>
		<pre class="code-block"><code>{promptPatterns}</code></pre>

		<h3 class="section-title">Delete-all safety flow</h3>
		<pre class="code-block"><code>{deleteAllFlow}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">AI workflow integration requires careful output formatting and context management.</p>
	<ol class="experiments">
		<li><strong>Send forensic output for 50 elements to an AI with a small context window.</strong> Each forensic annotation can be 500+ tokens. 50 annotations = 25,000+ tokens of context. Batch your annotations or use the <code>standard</code> output mode for bulk reviews, saving <code>forensic</code> for targeted CSS debugging.</li>
		<li><strong>Rely on <code>computedStyles</code> without checking the viewport size.</strong> Computed styles are viewport-dependent. An element that overflows at 375px may look fine at 1440px. Always note the viewport dimensions in your AI prompt, or annotate at the exact breakpoint where the bug appears.</li>
		<li><strong>Use the <code>onCopy</code> callback to POST to a production API endpoint.</strong> The inspector only mounts in <code>dev</code> mode, but the <code>fetch</code> call still hits your real API. Use a dev-only endpoint (e.g., <code>/api/dev/ai-review</code>) with its own guards, or use a local proxy.</li>
		<li><strong>Set <code>deleteAllDelayMs={'{0}'}</code> and accidentally trigger delete-all.</strong> Zero delay means instant deletion with no undo. The default 2000ms countdown exists specifically to prevent this. In high-stakes review sessions, increase the delay to 5000ms or more.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">sv-agentation's forensic output bridges visual debugging and AI-assisted development. The key insight: AI assistants work best with structured, contextual data — not screenshots. A forensic annotation provides the exact CSS selector (for locating elements), the source file and line (for code changes), the component hierarchy (for understanding structure), and computed styles (for diagnosing layout). This is more actionable than a screenshot with an arrow.</p>
	<p class="prose">The callback system (<code>onAnnotationAdd</code>, <code>onCopy</code>) turns sv-agentation from a solo tool into a workflow integration point. Route annotations to a bug tracker, feed them to an AI review pipeline, or aggregate them into a design QA report. The raw payload is JSON-serializable — it can go anywhere HTTP can reach.</p>
	<p class="next">Next: <a href="/sv-agentation/project">sv-agentation — Module Project</a></p>
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
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
