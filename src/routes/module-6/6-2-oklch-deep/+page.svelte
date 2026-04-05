<script lang="ts">
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
</style>
