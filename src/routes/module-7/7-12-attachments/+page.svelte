<script lang="ts">
  import gsap from 'gsap';
  import type { Action } from 'svelte/action';

  const gsapPulse: Action<HTMLElement> = (node) => {
    const tween = gsap.to(node, {
      scale: 1.05,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return {
      destroy() {
        tween.kill();
      }
    };
  };

  const gsapGlow: Action<HTMLElement, { color?: string } | undefined> = (node, params) => {
    const color = params?.color ?? 'var(--color-brand)';
    const tween = gsap.to(node, {
      boxShadow: `0 0 20px ${color}`,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return {
      destroy() {
        tween.kill();
      }
    };
  };
</script>

<section class="page">
  <h1>7.12 — Attachments</h1>
  <p class="concept"><strong>Concept.</strong> Svelte 5.29 introduced the experimental <code>{'{@attach}'}</code> directive as a modern replacement for <code>use:</code> actions. While <code>{'{@attach}'}</code> provides a more declarative API with better TypeScript support, <code>use:</code> actions remain the stable, production-ready approach. Here we teach both.</p>

  <div class="build">
    <h2>The {'{@attach}'} Concept (Experimental)</h2>
    <pre>{`// {@attach} syntax (Svelte 5.29+, experimental)
// Attachments are functions that return a cleanup function

function gsapPulse(element: Element) \{
  const tween = gsap.to(element, \{
    scale: 1.05, yoyo: true, repeat: -1
  \});
  return () => tween.kill();
\}

// Usage in template:
// <div \{@attach gsapPulse\}>Pulsing</div>

// Key differences from use: actions:
// 1. Returns cleanup directly (no destroy method)
// 2. Receives Element, not HTMLElement
// 3. Re-runs when dependencies change
// 4. More composable — multiple attachments easy`}</pre>

    <h2>Working Demo (use: action)</h2>
    <p class="note">The demos below use the stable <code>use:</code> action API, which works identically in practice.</p>

    <div class="demo-row">
      <div class="demo-box" use:gsapPulse>
        <span>Pulse</span>
        <code>use:gsapPulse</code>
      </div>
      <div class="demo-box glow-box" use:gsapGlow={{ color: 'oklch(60% 0.20 320)' }}>
        <span>Glow</span>
        <code>use:gsapGlow</code>
      </div>
    </div>

    <h2>Comparing use: vs {'{@attach}'}</h2>
    <div class="comparison">
      <div class="compare-col">
        <h4><code>use:</code> Action</h4>
        <ul class="compare-list">
          <li>Stable, production-ready</li>
          <li>Returns <code>{'{ destroy() {} }'}}</code> object</li>
          <li>Params via second argument</li>
          <li>Well-supported tooling</li>
        </ul>
      </div>
      <div class="compare-col">
        <h4><code>{'{@attach}'}</code> Directive</h4>
        <ul class="compare-list">
          <li>Experimental (Svelte 5.29+)</li>
          <li>Returns cleanup function directly</li>
          <li>Closure captures reactive deps</li>
          <li>More declarative composition</li>
        </ul>
      </div>
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li><code>{'{@attach}'}</code> is an experimental Svelte 5.29+ directive for element-level side effects.</li>
    <li>It returns a cleanup function directly, unlike <code>use:</code> which returns a <code>{'{ destroy() {} }'}}</code> object.</li>
    <li><code>use:</code> actions remain the stable, recommended approach for production code.</li>
    <li>Both patterns work well for wrapping GSAP animations as reusable element behaviors.</li>
  </ul>
</section>

<style>
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .note { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; font-style: italic; }

  .demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }

  .demo-box { background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-xs); }
  .demo-box span { font-weight: 700; font-size: var(--text-lg); }
  .demo-box code { background: rgba(255, 255, 255, 0.2); color: var(--color-surface); }

  .comparison { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .comparison { grid-template-columns: 1fr 1fr; } }

  .compare-col { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
  .compare-col h4 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .compare-list { font-size: var(--text-sm); }
</style>
