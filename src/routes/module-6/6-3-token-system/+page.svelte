<script lang="ts">
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

  <h3>What you learned</h3>
  <ul>
    <li>Tokens are the contract — consumers never reference raw values.</li>
    <li>Fluid tokens use <code>clamp()</code> so the ramp scales with the viewport.</li>
    <li>Motion tokens (durations + easings) are just as important as color tokens.</li>
    <li>One token change propagates across every component that reads it.</li>
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

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .swatches { grid-template-columns: repeat(4, 1fr); }
  }
</style>
