<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  const texts: string[] = ['--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-xl', '--text-2xl', '--text-hero'];
  const spaces: string[] = ['--space-xs', '--space-sm', '--space-md', '--space-lg', '--space-xl', '--space-2xl'];
  const colors: string[] = [
    '--color-brand', '--color-brand-dim', '--color-surface', '--color-surface-1',
    '--color-surface-2', '--color-text', '--color-text-muted', '--color-border',
    '--color-error', '--color-success', '--color-warning'
  ];
  const durs: string[] = ['--dur-instant', '--dur-fast', '--dur-base', '--dur-slow', '--dur-slower'];
  const eases: string[] = ['--ease-out', '--ease-in', '--ease-in-out', '--ease-expressive', '--ease-spring'];
  const radii: string[] = ['--radius-xs', '--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-full'];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"const texts: string[] = ['--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-xl', '--text-2xl', '--text-hero'];\n" +
		"  const spaces: string[] = ['--space-xs', '--space-sm', '--space-md', '--space-lg', '--space-xl', '--space-2xl'];\n" +
		"  const colors: string[] = [\n" +
		"    '--color-brand', '--color-brand-dim', '--color-surface', '--color-surface-1',\n" +
		"    '--color-surface-2', '--color-text', '--color-text-muted', '--color-border',\n" +
		"    '--color-error', '--color-success', '--color-warning'\n" +
		"  ];\n" +
		"  const durs: string[] = ['--dur-instant', '--dur-fast', '--dur-base', '--dur-slow', '--dur-slower'];\n" +
		"  const eases: string[] = ['--ease-out', '--ease-in', '--ease-in-out', '--ease-expressive', '--ease-spring'];\n" +
		"  const radii: string[] = ['--radius-xs', '--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-full'];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.3 — Full token system\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e The PE7 token system composes every category: breakpoints, fluid\n" +
		"    typography via \u003ccode\u003eclamp()\u003c/code\u003e, fluid spacing, OKLCH colors, motion (durations + easings),\n" +
		"    radii, and shadows. Each token is a promise — you use the name, not the value. When the value\n" +
		"    changes, every consumer updates automatically. Tokens are the contract between design and code.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdetails open\u003e\n" +
		"      \u003csummary\u003eTypography\u003c/summary\u003e\n" +
		"      \u003cdiv class=\"stack\"\u003e\n" +
		"        {#each texts as t (t)}\n" +
		"          \u003cdiv class=\"row\"\u003e\n" +
		"            \u003ccode\u003e{t}\u003c/code\u003e\n" +
		"            \u003cspan style:font-size={`var(${t})`}\u003eThe quick brown fox\u003c/span\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/details\u003e\n" +
		"\n" +
		"    \u003cdetails open\u003e\n" +
		"      \u003csummary\u003eSpacing\u003c/summary\u003e\n" +
		"      \u003cdiv class=\"stack\"\u003e\n" +
		"        {#each spaces as s (s)}\n" +
		"          \u003cdiv class=\"row\"\u003e\n" +
		"            \u003ccode\u003e{s}\u003c/code\u003e\n" +
		"            \u003cdiv class=\"bar\" style:inline-size={`var(${s})`}\u003e\u003c/div\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/details\u003e\n" +
		"\n" +
		"    \u003cdetails open\u003e\n" +
		"      \u003csummary\u003eColors\u003c/summary\u003e\n" +
		"      \u003cdiv class=\"swatches\"\u003e\n" +
		"        {#each colors as c (c)}\n" +
		"          \u003cdiv class=\"swatch\"\u003e\n" +
		"            \u003cdiv class=\"chip\" style:background={`var(${c})`}\u003e\u003c/div\u003e\n" +
		"            \u003ccode\u003e{c}\u003c/code\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/details\u003e\n" +
		"\n" +
		"    \u003cdetails open\u003e\n" +
		"      \u003csummary\u003eDurations (hover)\u003c/summary\u003e\n" +
		"      \u003cdiv class=\"motion-row\"\u003e\n" +
		"        {#each durs as d (d)}\n" +
		"          \u003cdiv class=\"dur-box\" style:transition-duration={`var(${d})`}\u003e\n" +
		"            \u003ccode\u003e{d}\u003c/code\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/details\u003e\n" +
		"\n" +
		"    \u003cdetails open\u003e\n" +
		"      \u003csummary\u003eEasings (hover)\u003c/summary\u003e\n" +
		"      \u003cdiv class=\"motion-row\"\u003e\n" +
		"        {#each eases as e (e)}\n" +
		"          \u003cdiv class=\"ease-box\" style:transition-timing-function={`var(${e})`}\u003e\n" +
		"            \u003ccode\u003e{e}\u003c/code\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/details\u003e\n" +
		"\n" +
		"    \u003cdetails open\u003e\n" +
		"      \u003csummary\u003eRadii\u003c/summary\u003e\n" +
		"      \u003cdiv class=\"swatches\"\u003e\n" +
		"        {#each radii as r (r)}\n" +
		"          \u003cdiv class=\"swatch\"\u003e\n" +
		"            \u003cdiv class=\"radius-box\" style:border-radius={`var(${r})`}\u003e\u003c/div\u003e\n" +
		"            \u003ccode\u003e{r}\u003c/code\u003e\n" +
		"          \u003c/div\u003e\n" +
		"        {/each}\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/details\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eWhere tokens live.\u003c/strong\u003e These tokens are CSS custom properties defined in\n" +
		"    \u003ccode\u003esrc/app.css\u003c/code\u003e inside \u003ccode\u003e@layer tokens {'{'} :root {'{'} ... {'}'} {'}'}\u003c/code\u003e. The\n" +
		"    \u003ccode\u003eclamp(min, preferred, max)\u003c/code\u003e function makes them fluid:\n" +
		"    \u003ccode\u003e--text-lg: clamp(1.125rem, 3vw, 1.5rem)\u003c/code\u003e means the font size grows with the viewport\n" +
		"    but never drops below 1.125rem or exceeds 1.5rem.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eTokens are the contract — consumers never reference raw values.\u003c/li\u003e\n" +
		"    \u003cli\u003eFluid tokens use \u003ccode\u003eclamp()\u003c/code\u003e so the ramp scales with the viewport.\u003c/li\u003e\n" +
		"    \u003cli\u003eMotion tokens (durations + easings) are just as important as color tokens.\u003c/li\u003e\n" +
		"    \u003cli\u003eOne token change propagates across every component that reads it.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.3 — Full token system</h1>
  <p class="concept">
    <strong>Concept.</strong> The PE7 token system composes every category: breakpoints, fluid
    typography via <code>clamp()</code>, fluid spacing, OKLCH colors, motion (durations + easings),
    radii, and shadows. Each token is a promise — you use the name, not the value. When the value
    changes, every consumer updates automatically. Tokens are the contract between design and code.
  </p>

  <div class="build">
    <details open>
      <summary>Typography</summary>
      <div class="stack">
        {#each texts as t (t)}
          <div class="row">
            <code>{t}</code>
            <span style:font-size={`var(${t})`}>The quick brown fox</span>
          </div>
        {/each}
      </div>
    </details>

    <details open>
      <summary>Spacing</summary>
      <div class="stack">
        {#each spaces as s (s)}
          <div class="row">
            <code>{s}</code>
            <div class="bar" style:inline-size={`var(${s})`}></div>
          </div>
        {/each}
      </div>
    </details>

    <details open>
      <summary>Colors</summary>
      <div class="swatches">
        {#each colors as c (c)}
          <div class="swatch">
            <div class="chip" style:background={`var(${c})`}></div>
            <code>{c}</code>
          </div>
        {/each}
      </div>
    </details>

    <details open>
      <summary>Durations (hover)</summary>
      <div class="motion-row">
        {#each durs as d (d)}
          <div class="dur-box" style:transition-duration={`var(${d})`}>
            <code>{d}</code>
          </div>
        {/each}
      </div>
    </details>

    <details open>
      <summary>Easings (hover)</summary>
      <div class="motion-row">
        {#each eases as e (e)}
          <div class="ease-box" style:transition-timing-function={`var(${e})`}>
            <code>{e}</code>
          </div>
        {/each}
      </div>
    </details>

    <details open>
      <summary>Radii</summary>
      <div class="swatches">
        {#each radii as r (r)}
          <div class="swatch">
            <div class="radius-box" style:border-radius={`var(${r})`}></div>
            <code>{r}</code>
          </div>
        {/each}
      </div>
    </details>
  </div>

  <p class="concept">
    <strong>Where tokens live.</strong> These tokens are CSS custom properties defined in
    <code>src/app.css</code> inside <code>@layer tokens {'{'} :root {'{'} ... {'}'} {'}'}</code>. The
    <code>clamp(min, preferred, max)</code> function makes them fluid:
    <code>--text-lg: clamp(1.125rem, 3vw, 1.5rem)</code> means the font size grows with the viewport
    but never drops below 1.125rem or exceeds 1.5rem.
  </p>

	<h2>Break it on purpose</h2>
	<p class="prose">Intentionally break the token system to understand why indirection through custom properties is worth the abstraction cost.</p>
	<ol class="experiments">
		<li><strong>Use a raw color instead of a token</strong> — works but breaks theme switching. Hardcoding <code>#3b82f6</code> instead of <code>var(--color-brand)</code> means the value cannot adapt when dark mode or a page personality overrides the token.</li>
		<li><strong>Override a token on a child element</strong> — cascades to all descendants. Setting <code>--color-brand</code> on a wrapper element changes every nested component that reads that token, demonstrating the cascade's power.</li>
		<li><strong>Delete a token definition</strong> — every usage shows the fallback or nothing. When a custom property is undefined, <code>var(--missing)</code> resolves to the initial value of the property it's used in, often producing invisible or broken layouts.</li>
		<li><strong>Use a token in a <code>calc()</code></strong> — tokens compose with math. You can write <code>calc(var(--space-md) * 2)</code> to derive new spacing values from existing tokens, keeping the system internally consistent.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A design token system is fundamentally a contract between design intent and code implementation. When every component references <code>var(--color-brand)</code> instead of a raw hex value, you gain a single point of control over the entire application's visual identity. Changing that one token definition in <code>:root</code> propagates instantly to every button, link, border, and accent across hundreds of components. This is not merely convenient -- it is the mechanism that makes theming, dark mode, and per-page color personalities possible without touching a single component file.</p>
	<p class="prose">The token categories in this system -- typography, spacing, colors, durations, easings, radii, and shadows -- mirror the full spectrum of design decisions that a UI requires. Typography tokens use <code>clamp(min, preferred, max)</code> to create fluid type scales that grow with the viewport without ever exceeding comfortable reading sizes. Spacing tokens follow the same fluid pattern, ensuring that padding and gaps scale proportionally. Motion tokens for durations and easings are equally critical: consistent animation timing across the application creates a coherent personality, and centralizing these values means you can tune the entire app's feel by adjusting a handful of variables.</p>
	<p class="prose">The real power of tokens emerges when you combine them with other CSS features. Custom properties cascade, so overriding a token on a specific element or page changes everything beneath it. They compose with <code>calc()</code>, letting you derive new values mathematically. They work inside <code>clamp()</code>, <code>min()</code>, <code>max()</code>, and even OKLCH color functions. This composability means a small token vocabulary can express a vast design space, keeping your stylesheet DRY while maintaining the flexibility to adapt to any context.</p>
	<p class="next"><a href="/module-6/6-4-nesting">Next lesson: 6.4 CSS nesting</a></p>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-lg);
    max-inline-size: 72rem;
    margin-inline: auto;
  }
  .concept {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-inline-size: 65ch;
    line-height: 1.6;
    margin: 0;
  }
  .concept strong { color: var(--color-text); }
  .build {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
    margin-block: var(--space-lg);
  }
  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-2);
    padding: 0 var(--space-xs);
    border-radius: var(--radius-xs);
  }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }

  details {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-sm) var(--space-md);
  }
  summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--color-text);
    padding-block: var(--space-xs);
  }
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding-block-start: var(--space-sm);
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  .row code { min-inline-size: 9rem; }
  .bar {
    block-size: 1rem;
    background: var(--color-brand);
    border-radius: var(--radius-xs);
  }
  .swatches {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
    padding-block-start: var(--space-sm);
  }
  .swatch {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    align-items: flex-start;
  }
  .chip {
    inline-size: 100%;
    block-size: 3rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
  }
  .radius-box {
    inline-size: 100%;
    block-size: 3rem;
    background: var(--color-brand);
    border: 1px solid var(--color-border);
  }
  .motion-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    padding-block-start: var(--space-sm);
  }
  .dur-box, .ease-box {
    padding: var(--space-sm) var(--space-md);
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    transition-property: transform, background;
  }
  .dur-box {
    transition-timing-function: var(--ease-out);
  }
  .dur-box:hover {
    background: var(--color-brand);
    transform: scale(1.1);
  }
  .ease-box {
    transition-duration: var(--dur-slow);
  }
  .ease-box:hover {
    transform: translateX(var(--space-lg));
    background: var(--color-brand-dim);
  }

  @media (min-inline-size: 768px) {
    h1 { font-size: var(--text-2xl); }
    .swatches { grid-template-columns: repeat(4, 1fr); }
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
