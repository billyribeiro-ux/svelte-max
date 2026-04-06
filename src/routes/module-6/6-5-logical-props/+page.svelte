<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type Dir = 'ltr' | 'rtl';

  let dir = $state<Dir>('ltr');

  const toggle = (): void => {
    dir = dir === 'ltr' ? 'rtl' : 'ltr';
  };

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Dir = 'ltr' | 'rtl';\n" +
		"\n" +
		"  let dir = $state\u003cDir\u003e('ltr');\n" +
		"\n" +
		"  const toggle = (): void =\u003e {\n" +
		"    dir = dir === 'ltr' ? 'rtl' : 'ltr';\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.5 — Logical properties\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003emargin-left\u003c/code\u003e and \u003ccode\u003epadding-right\u003c/code\u003e break in\n" +
		"    right-to-left languages. Logical properties — \u003ccode\u003emargin-inline-start\u003c/code\u003e,\n" +
		"    \u003ccode\u003epadding-block-end\u003c/code\u003e, \u003ccode\u003einset-inline-end\u003c/code\u003e — are direction-aware. In LTR\n" +
		"    they map to left/right; in RTL they mirror automatically. The same applies to\n" +
		"    \u003ccode\u003eborder-inline-*\u003c/code\u003e and \u003ccode\u003eborder-block-*\u003c/code\u003e. Use logical properties for\n" +
		"    \u003cem\u003eevery\u003c/em\u003e new CSS rule — it costs nothing and future-proofs your UI.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cbutton class=\"toggle\" onclick={toggle}\u003e\n" +
		"      Current direction: \u003ccode\u003e{dir}\u003c/code\u003e — click to flip\n" +
		"    \u003c/button\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"card\" dir={dir}\u003e\n" +
		"      \u003cdiv class=\"avatar\"\u003eAB\u003c/div\u003e\n" +
		"      \u003cdiv class=\"body\"\u003e\n" +
		"        \u003ch4\u003eAda Byron\u003c/h4\u003e\n" +
		"        \u003cp\u003eLogical props mirror this layout with zero CSS changes.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cbutton class=\"close\" aria-label=\"Close\"\u003e×\u003c/button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"card\" dir={dir}\u003e\n" +
		"      \u003cdiv class=\"avatar\"\u003eGH\u003c/div\u003e\n" +
		"      \u003cdiv class=\"body\"\u003e\n" +
		"        \u003ch4\u003eGrace Hopper\u003c/h4\u003e\n" +
		"        \u003cp\u003eBorder-inline-start becomes the accent in both directions.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cbutton class=\"close\" aria-label=\"Close\"\u003e×\u003c/button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eLogical properties follow writing-mode, not physical sides.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003einline-start\u003c/code\u003e / \u003ccode\u003einline-end\u003c/code\u003e flip for RTL automatically.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eblock-start\u003c/code\u003e / \u003ccode\u003eblock-end\u003c/code\u003e are top/bottom in horizontal writing.\u003c/li\u003e\n" +
		"    \u003cli\u003eUse them everywhere — \u003ccode\u003emax-inline-size\u003c/code\u003e instead of \u003ccode\u003emax-width\u003c/code\u003e.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.5 — Logical properties</h1>
  <p class="concept">
    <strong>Concept.</strong> <code>margin-left</code> and <code>padding-right</code> break in
    right-to-left languages. Logical properties — <code>margin-inline-start</code>,
    <code>padding-block-end</code>, <code>inset-inline-end</code> — are direction-aware. In LTR
    they map to left/right; in RTL they mirror automatically. The same applies to
    <code>border-inline-*</code> and <code>border-block-*</code>. Use logical properties for
    <em>every</em> new CSS rule — it costs nothing and future-proofs your UI.
  </p>

  <div class="build">
    <button class="toggle" onclick={toggle}>
      Current direction: <code>{dir}</code> — click to flip
    </button>

    <div class="card" dir={dir}>
      <div class="avatar">AB</div>
      <div class="body">
        <h4>Ada Byron</h4>
        <p>Logical props mirror this layout with zero CSS changes.</p>
      </div>
      <button class="close" aria-label="Close">×</button>
    </div>

    <div class="card" dir={dir}>
      <div class="avatar">GH</div>
      <div class="body">
        <h4>Grace Hopper</h4>
        <p>Border-inline-start becomes the accent in both directions.</p>
      </div>
      <button class="close" aria-label="Close">×</button>
    </div>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Test the difference between physical and logical properties by switching text direction and observing what breaks.</p>
	<ol class="experiments">
		<li><strong>Use <code>margin-left</code> on RTL text</strong> — wrong side. Physical properties are anchored to the screen, so <code>margin-left</code> always pushes from the left regardless of reading direction.</li>
		<li><strong>Use <code>margin-inline-start</code></strong> — correct in both directions. Logical properties follow the writing mode, so inline-start maps to left in LTR and right in RTL automatically.</li>
		<li><strong>Set <code>direction:rtl</code></strong> — watch logical properties adapt. Toggling the direction attribute on the card demonstrates how every logical property mirrors without any CSS changes.</li>
		<li><strong>Use <code>lh</code> units for vertical rhythm</strong> — spacing that matches line height. The <code>lh</code> unit equals the element's computed line-height, creating block-axis spacing that stays proportional to the text rhythm.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Logical properties represent a fundamental shift in how CSS describes layout relationships. Instead of binding styles to the physical edges of the screen -- left, right, top, bottom -- logical properties use <code>inline-start</code>, <code>inline-end</code>, <code>block-start</code>, and <code>block-end</code>, which adapt to the document's writing mode and text direction. In a left-to-right language like English, <code>inline-start</code> maps to left; in a right-to-left language like Arabic, it maps to right. This single abstraction eliminates the need for separate RTL stylesheets or direction-specific overrides.</p>
	<p class="prose">The inline axis runs in the direction text flows, while the block axis runs perpendicular to it. For horizontal writing modes (the vast majority of web content), inline is horizontal and block is vertical. This means <code>margin-inline-start</code> replaces <code>margin-left</code>, <code>padding-block-end</code> replaces <code>padding-bottom</code>, and <code>max-inline-size</code> replaces <code>max-width</code>. The shorthand <code>margin-inline</code> sets both start and end in one declaration. Every new CSS rule you write should use logical properties by default -- the cost is zero and the benefit is automatic internationalization support.</p>
	<p class="prose">Logical properties also extend to borders, border-radius, and positioning. The four corners use compound names like <code>border-start-start-radius</code> (block-start, inline-start corner) and <code>border-end-end-radius</code> (block-end, inline-end corner). Inset properties like <code>inset-inline-start</code> replace <code>left</code> for positioned elements. Combined with the <code>lh</code> unit for block-axis spacing that scales with line height, logical properties give you a complete vocabulary for writing direction-agnostic CSS that works correctly in every language and writing system supported by the web.</p>
	<p class="next"><a href="/module-6/6-6-grid">Next lesson: 6.6 CSS Grid</a></p>
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

  .toggle {
    align-self: flex-start;
    background: var(--color-brand);
    color: var(--color-surface-1);
    border: none;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
  }
  .toggle code {
    background: rgb(0 0 0 / 0.2);
    color: inherit;
  }

  .card {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    padding-inline-start: var(--space-lg);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-inline-start: 4px solid var(--color-brand);
    border-start-start-radius: var(--radius-md);
    border-end-start-radius: var(--radius-md);
    border-start-end-radius: var(--radius-md);
    border-end-end-radius: var(--radius-md);
  }
  .avatar {
    flex-shrink: 0;
    inline-size: 3rem;
    block-size: 3rem;
    border-radius: var(--radius-full);
    background: var(--color-brand-dim);
    color: var(--color-surface-1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .body h4 {
    margin: 0;
    color: var(--color-text);
    text-align: start;
  }
  .body p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    text-align: start;
    /* lh unit — line-height-relative unit, spacing stays proportional to text rhythm */
    margin-block-start: 0.25lh;
  }
  .close {
    flex-shrink: 0;
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-border);
    background: var(--color-surface-2);
    color: var(--color-text);
    cursor: pointer;
    font-size: var(--text-lg);
    margin-inline-start: auto;
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
