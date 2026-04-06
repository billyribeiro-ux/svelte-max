<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  let l = $state(60);
  let c = $state(0.18);
  let h = $state(250);

  const steps: number[] = [95, 88, 80, 70, 60, 50, 40, 25, 15];

  const oklchFor = (step: number, chroma: number, hue: number): string =>
    `oklch(${step}% ${chroma.toFixed(3)} ${hue})`;

  const hslFor = (step: number): string => {
    // approximate lightness ramp in HSL for comparison
    const hslL = step;
    return `hsl(${h} 80% ${hslL}%)`;
  };

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let l = $state(60);\n" +
		"  let c = $state(0.18);\n" +
		"  let h = $state(250);\n" +
		"\n" +
		"  const steps: number[] = [95, 88, 80, 70, 60, 50, 40, 25, 15];\n" +
		"\n" +
		"  const oklchFor = (step: number, chroma: number, hue: number): string =\u003e\n" +
		"    `oklch(${step}% ${chroma.toFixed(3)} ${hue})`;\n" +
		"\n" +
		"  const hslFor = (step: number): string =\u003e {\n" +
		"    // approximate lightness ramp in HSL for comparison\n" +
		"    const hslL = step;\n" +
		"    return `hsl(${h} 80% ${hslL}%)`;\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e6.2 — OKLCH in depth\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e OKLCH = \u003ccode\u003eL\u003c/code\u003e (0–100%), \u003ccode\u003eC\u003c/code\u003e (0–0.4),\n" +
		"    \u003ccode\u003eH\u003c/code\u003e (0–360). Perceptual uniformity means equal lightness values look equally bright\n" +
		"    to humans — unlike HSL, where \u003ccode\u003ehsl(60 100% 50%)\u003c/code\u003e (yellow) looks much brighter than\n" +
		"    \u003ccode\u003ehsl(240 100% 50%)\u003c/code\u003e (blue). Chroma is saturation, capped by the sRGB gamut at each\n" +
		"    lightness. Hue wraps at 360. OKLCH wins for design systems because you can generate ramps and\n" +
		"    variants mathematically.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"controls\"\u003e\n" +
		"      \u003clabel\u003e\n" +
		"        \u003cspan\u003eL: {l}%\u003c/span\u003e\n" +
		"        \u003cinput type=\"range\" min=\"0\" max=\"100\" step=\"1\" bind:value={l} /\u003e\n" +
		"      \u003c/label\u003e\n" +
		"      \u003clabel\u003e\n" +
		"        \u003cspan\u003eC: {c.toFixed(2)}\u003c/span\u003e\n" +
		"        \u003cinput type=\"range\" min=\"0\" max=\"0.4\" step=\"0.01\" bind:value={c} /\u003e\n" +
		"      \u003c/label\u003e\n" +
		"      \u003clabel\u003e\n" +
		"        \u003cspan\u003eH: {h}\u003c/span\u003e\n" +
		"        \u003cinput type=\"range\" min=\"0\" max=\"360\" step=\"1\" bind:value={h} /\u003e\n" +
		"      \u003c/label\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"preview\" style:background={`oklch(${l}% ${c} ${h})`}\u003e\n" +
		"      \u003ccode\u003eoklch({l}% {c.toFixed(2)} {h})\u003c/code\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003ch4\u003eOKLCH lightness ramp (perceptually even)\u003c/h4\u003e\n" +
		"    \u003cdiv class=\"ramp\"\u003e\n" +
		"      {#each steps as step (step)}\n" +
		"        \u003cdiv class=\"swatch\" style:background={oklchFor(step, c, h)}\u003e\n" +
		"          \u003cspan class=\"label\"\u003e{step}%\u003c/span\u003e\n" +
		"          \u003ccode class=\"mono\"\u003e{oklchFor(step, c, h)}\u003c/code\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003ch4\u003eHSL lightness ramp (visually uneven)\u003c/h4\u003e\n" +
		"    \u003cdiv class=\"ramp\"\u003e\n" +
		"      {#each steps as step (step)}\n" +
		"        \u003cdiv class=\"swatch\" style:background={hslFor(step)}\u003e\n" +
		"          \u003cspan class=\"label\"\u003e{step}%\u003c/span\u003e\n" +
		"          \u003ccode class=\"mono\"\u003e{hslFor(step)}\u003c/code\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eOKLCH is perceptually uniform — ramps look even by math.\u003c/li\u003e\n" +
		"    \u003cli\u003eLock chroma and hue, vary lightness to generate tonal ramps.\u003c/li\u003e\n" +
		"    \u003cli\u003eChroma gets clipped at extreme lightness values in sRGB.\u003c/li\u003e\n" +
		"    \u003cli\u003eHSL saturation lies — equal numbers don't mean equal appearance.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>6.2 — OKLCH in depth</h1>
  <p class="concept">
    <strong>Concept.</strong> OKLCH = <code>L</code> (0–100%), <code>C</code> (0–0.4),
    <code>H</code> (0–360). Perceptual uniformity means equal lightness values look equally bright
    to humans — unlike HSL, where <code>hsl(60 100% 50%)</code> (yellow) looks much brighter than
    <code>hsl(240 100% 50%)</code> (blue). Chroma is saturation, capped by the sRGB gamut at each
    lightness. Hue wraps at 360. OKLCH wins for design systems because you can generate ramps and
    variants mathematically.
  </p>

  <div class="build">
    <div class="controls">
      <label>
        <span>L: {l}%</span>
        <input type="range" min="0" max="100" step="1" bind:value={l} />
      </label>
      <label>
        <span>C: {c.toFixed(2)}</span>
        <input type="range" min="0" max="0.4" step="0.01" bind:value={c} />
      </label>
      <label>
        <span>H: {h}</span>
        <input type="range" min="0" max="360" step="1" bind:value={h} />
      </label>
    </div>

    <div class="preview" style:background={`oklch(${l}% ${c} ${h})`}>
      <code>oklch({l}% {c.toFixed(2)} {h})</code>
    </div>

    <h4>OKLCH lightness ramp (perceptually even)</h4>
    <div class="ramp">
      {#each steps as step (step)}
        <div class="swatch" style:background={oklchFor(step, c, h)}>
          <span class="label">{step}%</span>
          <code class="mono">{oklchFor(step, c, h)}</code>
        </div>
      {/each}
    </div>

    <h4>HSL lightness ramp (visually uneven)</h4>
    <div class="ramp">
      {#each steps as step (step)}
        <div class="swatch" style:background={hslFor(step)}>
          <span class="label">{step}%</span>
          <code class="mono">{hslFor(step)}</code>
        </div>
      {/each}
    </div>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>OKLCH is perceptually uniform — ramps look even by math.</li>
    <li>Lock chroma and hue, vary lightness to generate tonal ramps.</li>
    <li>Chroma gets clipped at extreme lightness values in sRGB.</li>
    <li>HSL saturation lies — equal numbers don't mean equal appearance.</li>
  </ul>
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
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  h4 { margin: 0; color: var(--color-text); }
  ul {
    list-style: disc;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .controls label {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text);
    font-size: var(--text-sm);
  }
  .preview {
    border-radius: var(--radius-md);
    padding: var(--space-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
  }
  .preview code {
    background: rgb(0 0 0 / 0.5);
    color: white;
    padding: var(--space-xs) var(--space-sm);
  }
  .ramp {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xs);
  }
  .swatch {
    aspect-ratio: 1;
    border-radius: var(--radius-sm);
    padding: var(--space-xs);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--color-border);
  }
  .label {
    color: white;
    text-shadow: 0 1px 2px rgb(0 0 0 / 0.5);
    font-weight: 600;
    font-size: var(--text-xs);
  }
  .mono {
    font-size: 0.6rem;
    background: rgb(0 0 0 / 0.5);
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .controls { flex-direction: row; }
    .controls label { flex: 1; }
    .ramp { grid-template-columns: repeat(9, 1fr); }
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
