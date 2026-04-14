<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const annotationTypes = `// sv-agentation supports 4 annotation types:
//
// 1. Element annotation — click an element, add a note
//    Stored with: CSS selector path, bounding box, source file
//
// 2. Text range annotation — select text, annotate the range
//    Stored with: start/end offsets, surrounding context
//
// 3. Grouped annotation — Shift+Ctrl+Click multiple elements
//    Stored with: array of selectors, shared note
//
// 4. Area annotation — draw a region on the page
//    Stored with: bounding rect relative to viewport`;

	const callbacksCode = `<script lang="ts">
  ${"import"} { browser, dev } from '$app/environment';
  ${"import"} { Agentation } from 'sv-agentation';

  function handleAnnotationAdd(annotation) {
    console.log('New note:', annotation);
    // annotation = {
    //   id: string,
    //   type: 'element' | 'text' | 'group' | 'area',
    //   note: string,
    //   selector: string,          // CSS path
    //   boundingBox: DOMRect,
    //   source: string | null,     // file:line
    //   timestamp: number,
    //   route: string              // current page path
    // }
  }

  function handleCopy(markdown, payload) {
    console.log('Copied markdown:', markdown);
    // Send to an AI assistant, bug tracker, or clipboard
    // payload contains the raw structured data
  }
<\/script>

{#if browser && dev}
  <Agentation
    workspaceRoot="/Users/you/projects/my-app"
    onAnnotationAdd={handleAnnotationAdd}
    onAnnotationUpdate={(a) => console.log('Updated:', a)}
    onAnnotationDelete={(a) => console.log('Deleted:', a)}
    onAnnotationsClear={(all) => console.log('Cleared:', all.length)}
    onCopy={handleCopy}
    clearOnCopy={false}
    copyToClipboard={true}
  />
{/if}`;

	const outputModes = `// outputMode controls how much context is included in copied markdown

// 'compact' — just the note text and selector
// Good for: quick bug reports, chat messages
//   > Button text is truncated on mobile
//   > selector: .header > nav > button:nth-child(2)

// 'standard' — adds source file, bounding box, nearby text
// Good for: bug reports with context
//   > Button text is truncated on mobile
//   > source: src/routes/+layout.svelte:47
//   > selector: .header > nav > button:nth-child(2)
//   > rect: { x: 120, y: 45, width: 80, height: 32 }

// 'detailed' — adds component hierarchy, route, timestamp
// Good for: design reviews, handoffs
//   > (all standard fields)
//   > component: Header > NavBar > Button
//   > route: /dashboard
//   > timestamp: 2026-04-13T19:30:00Z

// 'forensic' — adds computed styles snapshot
// Good for: CSS debugging, AI prompts with full context
//   > (all detailed fields)
//   > computedStyles: { font-size: 14px, color: oklch(...), ... }`;

	const persistenceCode = `// Annotations persist to localStorage automatically
// Scoped by route (automatic) or by pageSessionKey (manual)

// Automatic route tracking (default):
//   /dashboard → localStorage key: "agentation:notes:/dashboard"
//   /settings  → localStorage key: "agentation:notes:/settings"

// Manual session scoping:
<Agentation
  workspaceRoot="..."
  pageSessionKey="feature-review-2026-04-13"
/>
//   All pages → localStorage key: "agentation:notes:feature-review-2026-04-13"

// Use manual keys when:
// - Reviewing a feature across multiple routes
// - Collaborating (share the key to sync notes conceptually)
// - Separating review sessions on the same route`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Annotations & copy output\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>AG.3 — Annotations & Copy Output</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>AG.3 — Annotations & Copy Output</h1>
	<p class="concept">
		<strong>Concept.</strong> Annotations turn the inspector from a read-only tool into a feedback
		authoring system. You can annotate individual elements, text ranges, grouped selections, or
		freeform page areas. Each annotation captures structured metadata — CSS selector path, bounding
		box, source file reference, component context, and optional computed styles. The <code>outputMode</code>
		prop controls how much context is included when you copy: from compact one-liners to forensic
		snapshots with full computed styles for AI-assisted debugging.
	</p>

	<div class="build">
		<h3 class="section-title">Annotation types</h3>
		<pre class="code-block"><code>{annotationTypes}</code></pre>

		<h3 class="section-title">Lifecycle callbacks</h3>
		<pre class="code-block"><code>{callbacksCode}</code></pre>

		<h3 class="section-title">Output modes</h3>
		<pre class="code-block"><code>{outputModes}</code></pre>

		<div class="mode-grid">
			<div class="mode-card"><h4>compact</h4><p>Note + selector. Quick bug reports.</p></div>
			<div class="mode-card"><h4>standard</h4><p>+ source file, bounding box, nearby text.</p></div>
			<div class="mode-card"><h4>detailed</h4><p>+ component hierarchy, route, timestamp.</p></div>
			<div class="mode-card"><h4>forensic</h4><p>+ computed styles. Full AI prompt context.</p></div>
		</div>

		<h3 class="section-title">Persistence & session scoping</h3>
		<pre class="code-block"><code>{persistenceCode}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Annotations depend on DOM stability and storage constraints.</p>
	<ol class="experiments">
		<li><strong>Annotate an element, then change the component markup and reload.</strong> The annotation's CSS selector path may no longer match any element. The note persists in localStorage but its marker disappears. Annotations are tied to DOM structure, not component identity — restructuring breaks the link.</li>
		<li><strong>Set <code>clearOnCopy={'{true}'}</code> and copy notes.</strong> All annotations are deleted after copying. This is useful for "review and submit" workflows but dangerous if you accidentally copy before finishing. Default is <code>false</code> for safety.</li>
		<li><strong>Set <code>outputMode="forensic"</code> and copy 20 annotations.</strong> The forensic output includes computed styles for every annotated element — potentially hundreds of CSS properties each. The resulting markdown can be enormous. Use forensic mode selectively for CSS debugging, not bulk reviews.</li>
		<li><strong>Use <code>onCopy</code> callback to send notes to an external API.</strong> The callback receives both the formatted markdown string and the raw structured payload. You can POST the payload to a bug tracker, append to a Google Doc, or feed it to an AI assistant — all without manual copy-paste.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The annotation system captures both human intent (the note) and machine context (selector, source, bounding box, styles). This dual payload is what makes sv-agentation useful for AI workflows — you can copy a "forensic" snapshot that includes the exact CSS selector path, the source file and line, the component hierarchy, and the computed styles. An AI assistant receiving this context can diagnose layout bugs, suggest fixes, and reference the exact code location.</p>
	<p class="prose">Persistence scoping via automatic route tracking means annotations "follow the page." Switch between <code>/dashboard</code> and <code>/settings</code> and each page has its own annotation set. For cross-page reviews, <code>pageSessionKey</code> overrides automatic scoping — all annotations share a single key regardless of route. This is the difference between per-page bug reports and feature-wide design reviews.</p>
	<p class="next">Next lesson: <a href="/sv-agentation/ag-4-ai-workflows">AG.4 — AI Workflow Integration</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--space-xs); }
	.mode-card { padding: var(--space-sm) var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.4; } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
