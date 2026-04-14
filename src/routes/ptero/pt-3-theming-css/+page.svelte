<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const themePresetsCode = `// pterodactyl.config.ts — Theme configuration
${"import"} type { PterodactylConfig } from 'pterodactyl-core';

export default {
  site: { title: 'My Docs', description: 'API documentation' },
  theme: {
    // Choose a preset:
    preset: 'supabase',  // 'default' | 'supabase' | 'github' | 'minimal'

    // Override specific CSS variables:
    cssVars: {
      '--color-primary': '#3ECF8E',
      '--color-primary-light': '#4AE5A0',
      '--font-family-base': "'Inter Variable', sans-serif",
      '--font-family-mono': "'JetBrains Mono', monospace",
      '--radius-base': '8px',
      '--spacing-content': '2rem'
    }
  }
} satisfies PterodactylConfig;`;

	const cssVarsReference = `// 40+ CSS variables available for customization:
//
// Colors:
//   --color-primary          Main brand color
//   --color-primary-light    Hover/focus variant
//   --color-bg               Page background
//   --color-bg-secondary     Card/sidebar background
//   --color-text             Primary text
//   --color-text-secondary   Muted text
//   --color-border           Borders and dividers
//   --color-code-bg          Code block background
//
// Typography:
//   --font-family-base       Body text font
//   --font-family-mono       Code font
//   --font-size-base         Root font size
//   --font-size-sm           Small text
//   --font-size-lg           Large text / headings
//   --line-height-base       Body line height
//
// Spacing:
//   --spacing-xs through --spacing-3xl
//   --spacing-content        Content area padding
//   --spacing-sidebar        Sidebar width
//
// Layout:
//   --radius-base            Border radius
//   --shadow-sm / --shadow-md / --shadow-lg
//   --max-width-content      Content max width`;

	const darkMode = `// Dark mode: automatic with prefers-color-scheme
// ThemeToggle component handles the switch

// In your layout:
<script>
  ${"import"} { ThemeToggle } from '$lib/components/pterodactyl/ThemeToggle.svelte';
<\/script>

<ThemeToggle />

// Each preset defines both light and dark variants.
// Custom cssVars apply to both modes unless you use:
//
// :root[data-theme="dark"] {
//   --color-primary: #4AE5A0;
//   --color-bg: #0D1117;
// }
//
// :root[data-theme="light"] {
//   --color-primary: #3ECF8E;
//   --color-bg: #FFFFFF;
// }`;

	const customPreset = `// Creating a custom preset:
// Copy an existing preset and modify it

// src/lib/pterodactyl/themes/my-brand.css
:root[data-theme="light"] {
  --color-primary: oklch(62% 0.20 160);
  --color-primary-light: oklch(68% 0.18 160);
  --color-bg: oklch(99% 0 0);
  --color-bg-secondary: oklch(97% 0.01 160);
  --color-text: oklch(20% 0 0);
  --color-text-secondary: oklch(45% 0 0);
  --color-border: oklch(90% 0.02 160);
  --color-code-bg: oklch(96% 0.01 160);
  --font-family-base: 'Inter Variable', system-ui, sans-serif;
  --radius-base: 12px;
}

:root[data-theme="dark"] {
  --color-primary: oklch(72% 0.18 160);
  --color-bg: oklch(15% 0.02 160);
  --color-bg-secondary: oklch(20% 0.03 160);
  --color-text: oklch(92% 0 0);
  --color-text-secondary: oklch(65% 0 0);
  --color-border: oklch(30% 0.02 160);
  --color-code-bg: oklch(18% 0.02 160);
}`;

	const fullCode =
		"<script lang=\"ts\">\n  // Theming & CSS variables\n<\/script>\n\n" +
		"<section class=\"page\"><h1>PT.3 — Theming & CSS Variables</h1></section>";
</script>

<section class="page">
	<h1>PT.3 — Theming & CSS Variables</h1>
	<p class="concept">
		<strong>Concept.</strong> Pterodactyl ships 4 theme presets (default, supabase, github, minimal),
		each defining 40+ CSS variables for colors, typography, spacing, and layout. You can choose a
		preset and override specific variables, or create a fully custom theme. Dark mode is automatic
		via <code>prefers-color-scheme</code> with a <code>ThemeToggle</code> component. Because themes
		are pure CSS variables, they integrate naturally with PE7 architecture.
	</p>

	<div class="build">
		<h3 class="section-title">Theme configuration</h3>
		<pre class="code-block"><code>{themePresetsCode}</code></pre>

		<h3 class="section-title">CSS variables reference</h3>
		<pre class="code-block"><code>{cssVarsReference}</code></pre>

		<h3 class="section-title">Dark mode</h3>
		<pre class="code-block"><code>{darkMode}</code></pre>

		<h3 class="section-title">Custom preset with OKLCH</h3>
		<pre class="code-block"><code>{customPreset}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Override <code>--color-primary</code> without overriding <code>--color-primary-light</code>.</strong> Focus/hover states use <code>--color-primary-light</code>. If it's still the preset's default while <code>--color-primary</code> is custom, the hover color clashes visually. Always override both together.</li>
		<li><strong>Set <code>--font-family-base</code> to a font you haven't loaded.</strong> The browser falls back to the system font stack. Text renders but looks inconsistent with the theme. Always include the font via <code>@import</code> or <code>&lt;link&gt;</code> in <code>app.html</code>.</li>
		<li><strong>Use hex colors in <code>cssVars</code> instead of OKLCH.</strong> It works — CSS variables accept any valid color. But hex colors don't interpolate well in dark mode transitions and don't integrate with PE7 OKLCH tokens. Prefer OKLCH for consistency.</li>
		<li><strong>Create a dark theme with <code>--color-text</code> darker than <code>--color-bg</code>.</strong> Text becomes invisible on the background. Pterodactyl doesn't validate contrast ratios — that's your responsibility. Test with the WCAG contrast checker.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Theming in Pterodactyl is CSS variables all the way down. Presets define a complete set of 40+ variables for both light and dark modes. The <code>cssVars</code> config overrides specific variables without replacing the full preset. Custom presets are plain CSS files with <code>:root[data-theme]</code> selectors. This architecture aligns perfectly with PE7 — you can use OKLCH tokens, fluid typography, and logical properties inside Pterodactyl themes.</p>
	<p class="next">Next lesson: <a href="/ptero/pt-4-components-layout">PT.4 — Components & Layout</a></p>
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
