<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const shikiConfig = `// svelte.config.js — Shiki syntax highlighting
${"import"} { mdsvex } from 'mdsvex';

export default {
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      highlight: {
        highlighter: async (code, lang) => {
          const { createHighlighter } = await import('shiki');
          const highlighter = await createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: ['typescript', 'svelte', 'javascript', 'css', 'html', 'bash']
          });

          const html = highlighter.codeToHtml(code, {
            lang: lang || 'text',
            themes: {
              dark: 'github-dark',
              light: 'github-light'
            }
          });

          return \`<div class="code-block">\${html}</div>\`;
        }
      }
    })
  ]
};`;

	const prismjsConfig = `// Alternative: PrismJS (lighter weight)
// MDsveX uses PrismJS by default if no custom highlighter
// Just install the languages you need:
//
// pnpm add -D prismjs
//
// MDsveX auto-detects the language from the code fence:
// \`\`\`typescript → PrismJS 'typescript' grammar
// \`\`\`svelte    → PrismJS 'svelte' grammar
// \`\`\`          → no highlighting (plain text)`;

	const codeMetadata = `// Code block metadata (filename, line highlights)
// Some highlighters support metadata after the language:
//
// \`\`\`typescript title="api.ts" {2,5-7}
// import { json } from '@sveltejs/kit';
// import { db } from '$lib/server/db';  // highlighted
//
// export async function GET() {
//   const users = await db.users.all();  // highlighted
//   return json(users);                   // highlighted
//   // This line is not highlighted        // highlighted
// }
// \`\`\`
//
// Custom highlighters can parse this metadata
// and add CSS classes for highlighted lines.`;

	const copyButton = `// Adding a copy button to code blocks
// Custom highlighter wrapper:

highlighter: async (code, lang) => {
  const html = /* ... shiki highlighting ... */;

  // Wrap with a copy button
  return \`
    <div class="code-block-wrapper">
      <div class="code-header">
        <span class="code-lang">\${lang || 'text'}</span>
        <button class="copy-btn" onclick="
          navigator.clipboard.writeText(
            this.closest('.code-block-wrapper')
              .querySelector('code').textContent
          );
          this.textContent = 'Copied!';
          setTimeout(() => this.textContent = 'Copy', 1500);
        ">Copy</button>
      </div>
      \${html}
    </div>
  \`;
}`;

	const inlineCode = `// Inline code styling
// Single backtick: \`variable\` → <code>variable</code>
//
// MDsveX passes inline code through as HTML <code> tags.
// Style them in your layout or global CSS:
//
// code:not(pre code) {
//   background: var(--color-surface-2);
//   padding: 0.15em 0.35em;
//   border-radius: var(--radius-xs);
//   font-family: var(--font-mono);
//   font-size: 0.9em;
// }`;

	const fullCode =
		"<script lang=\"ts\">\n  // Syntax highlighting\n<\/script>\n\n" +
		"<section class=\"page\"><h1>MX.4 — Syntax Highlighting</h1></section>";
</script>

<section class="page">
	<h1>MX.4 — Syntax Highlighting</h1>
	<p class="concept">
		<strong>Concept.</strong> MDsveX supports custom syntax highlighting via the <code>highlight</code>
		option. Shiki (used by VS Code) provides accurate, theme-aware highlighting with dual light/dark
		themes. PrismJS is the lighter-weight default. Custom highlighters can add line highlights,
		filenames, copy buttons, and line numbers. The <code>highlighter</code> function receives the
		code string and language, and returns HTML — you have full control over the output.
	</p>

	<div class="build">
		<h3 class="section-title">Shiki configuration</h3>
		<pre class="code-block"><code>{shikiConfig}</code></pre>

		<h3 class="section-title">PrismJS (default)</h3>
		<pre class="code-block"><code>{prismjsConfig}</code></pre>

		<h3 class="section-title">Code metadata</h3>
		<pre class="code-block"><code>{codeMetadata}</code></pre>

		<h3 class="section-title">Copy button</h3>
		<pre class="code-block"><code>{copyButton}</code></pre>

		<h3 class="section-title">Inline code</h3>
		<pre class="code-block"><code>{inlineCode}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Specify a language that Shiki/Prism doesn't recognize.</strong> Shiki throws an error; Prism silently renders without highlighting. Always register the languages you use in the Shiki <code>langs</code> array, or handle unknown languages with a fallback to <code>'text'</code>.</li>
		<li><strong>Use Shiki without pre-loading themes.</strong> The first code block triggers a network request to load the theme, causing a flash of unstyled code. Pre-load themes in the highlighter setup for consistent rendering.</li>
		<li><strong>Return raw HTML from the highlighter without escaping user content.</strong> If the code contains <code>&lt;script&gt;</code> tags, they could execute in the browser. Shiki and Prism both escape HTML entities by default. Custom highlighters must do the same.</li>
		<li><strong>Use inline JavaScript in the copy button <code>onclick</code>.</strong> This works for static sites but violates Content Security Policy (CSP) in strict environments. For CSP compliance, use a Svelte component for the code block wrapper instead of inline handlers.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Syntax highlighting runs at build time — the <code>highlighter</code> function executes during MDsveX preprocessing, not in the browser. This means highlighting adds zero client-side JavaScript. Shiki produces accurate, VS Code-quality output with dual theme support. The highlighter function's return value is raw HTML injected into the Svelte component, giving you full control over wrapper elements, copy buttons, line numbers, and metadata display.</p>
	<p class="next">Next lesson: <a href="/mdsvex/mx-5-remark-rehype">MX.5 — Remark & Rehype Plugins</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
