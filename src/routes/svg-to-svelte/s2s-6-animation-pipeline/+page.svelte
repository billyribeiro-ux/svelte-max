<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { Spring } from 'svelte/motion';

	let showIcon = $state(true);
	let transitionType = $state<'fade' | 'fly' | 'scale'>('fade');
	let hovered = $state(false);

	const springScale = new Spring(1, { stiffness: 0.2, damping: 0.4 });

	$effect(() => {
		springScale.target = hovered ? 1.3 : 1;
	});

	const strokeDashExample = `<script lang="ts">
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  // Total path length — measure with getTotalLength() or estimate
  const pathLength = 100;

  // Tween drives the dash offset from full-hidden to fully-drawn
  const drawProgress = new Tween(pathLength, {
    duration: 1200,
    easing: cubicOut
  });

  function draw() {
    drawProgress.target = 0;
  }

  function reset() {
    drawProgress.target = pathLength;
  }
<\/script>

<svg viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"
    stroke-dasharray={pathLength}
    stroke-dashoffset={drawProgress.current}
  />
  <polyline points="12 6 12 12 16 14"
    stroke-dasharray={pathLength}
    stroke-dashoffset={drawProgress.current}
  />
</svg>

<button onclick={draw}>Draw</button>
<button onclick={reset}>Reset</button>`;

	const svelteTransitionExample = `<!-- Transition the entire icon on mount/unmount -->
{#if showIcon}
  <div transition:fly={{ y: -20, duration: 300 }}>
    <IconCheck size={48} color="var(--color-success)" />
  </div>
{/if}

<!-- Different enter/exit animations -->
{#if showNotification}
  <div in:scale={{ start: 0.8, duration: 200 }}
       out:fade={{ duration: 150 }}>
    <IconAlertCircle size={24} color="var(--color-error)" />
    <span>Something went wrong</span>
  </div>
{/if}`;

	const springHoverExample = `<script lang="ts">
  import { Spring } from 'svelte/motion';
  ${"import"} IconHeart from '$lib/icons/IconHeart.svelte';

  let hovered = $state(false);
  const springScale = new Spring(1, { stiffness: 0.2, damping: 0.4 });

  $effect(() => {
    springScale.target = hovered ? 1.3 : 1;
  });
<\/script>

<button
  onpointerenter={() => hovered = true}
  onpointerleave={() => hovered = false}
  style:transform="scale({springScale.current})"
>
  <IconHeart
    size={32}
    color={hovered ? 'var(--color-error)' : 'var(--color-text-muted)'}
  />
</button>`;

	const gsapIconExample = `<script lang="ts">
  import gsap from 'gsap';
  ${"import"} IconStar from '$lib/icons/IconStar.svelte';

  let iconRef: HTMLDivElement;

  $effect(() => {
    // GSAP can animate the wrapper div
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(iconRef, { rotation: 360, duration: 2, ease: 'power2.inOut' })
      .to(iconRef, { scale: 1.2, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, 0);

    return () => tl.kill();
  });
<\/script>

<div bind:this={iconRef} style="display: inline-block;">
  <IconStar size={48} color="var(--color-warning)" />
</div>`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import { fade, fly, scale } from 'svelte/transition';\n" +
		"  import { Spring } from 'svelte/motion';\n" +
		"  // ... animation pipeline demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>S2S.6 — SVG-to-Svelte Animation Pipeline</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>S2S.6 — SVG-to-Svelte Animation Pipeline</h1>
	<p class="concept">
		<strong>Concept.</strong> Once SVGs are Svelte components, they unlock three animation layers:
		<strong>SVG-native</strong> (stroke-dasharray drawing, transform), <strong>Svelte transitions</strong>
		(fade, fly, scale on mount/unmount), and <strong>physics-based</strong> (Spring, Tween, GSAP). A
		converted icon component accepts reactive props — when <code>$state</code> drives
		<code>stroke-dashoffset</code> or when a <code>Spring</code> drives a wrapper's
		<code>transform</code>, the SVG animates fluidly within Svelte's reactivity system.
	</p>

	<div class="build">
		<h3 class="section-title">1. SVG stroke drawing animation</h3>
		<pre class="code-block"><code>{strokeDashExample}</code></pre>

		<h3 class="section-title">2. Svelte transitions on icon mount/unmount</h3>
		<div class="transition-demo">
			<div class="transition-controls">
				{#each (['fade', 'fly', 'scale'] as const) as t}
					<button
						type="button"
						class="mode-btn"
						class:active={transitionType === t}
						onclick={() => transitionType = t}
					>
						{t}
					</button>
				{/each}
				<button type="button" class="toggle-vis" onclick={() => showIcon = !showIcon}>
					{showIcon ? 'Hide' : 'Show'}
				</button>
			</div>

			<div class="transition-stage">
				{#if showIcon}
					{#if transitionType === 'fade'}
						<div transition:fade={{ duration: 300 }}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
								stroke="var(--color-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								width="64" height="64" aria-hidden="true">
								<polyline points="20 6 9 17 4 12" />
							</svg>
						</div>
					{:else if transitionType === 'fly'}
						<div transition:fly={{ y: -30, duration: 300 }}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
								stroke="var(--color-brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								width="64" height="64" aria-hidden="true">
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="8" x2="12" y2="12" />
								<line x1="12" y1="16" x2="12.01" y2="16" />
							</svg>
						</div>
					{:else}
						<div transition:scale={{ start: 0.5, duration: 300 }}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
								stroke="var(--color-warning)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								width="64" height="64" aria-hidden="true">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
							</svg>
						</div>
					{/if}
				{/if}
			</div>
		</div>
		<pre class="code-block"><code>{svelteTransitionExample}</code></pre>

		<h3 class="section-title">3. Spring physics on hover</h3>
		<div class="spring-demo">
			<button
				type="button"
				class="spring-btn"
				onpointerenter={() => hovered = true}
				onpointerleave={() => hovered = false}
				style:transform="scale({springScale.current})"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					fill={hovered ? 'var(--color-error)' : 'none'}
					stroke={hovered ? 'var(--color-error)' : 'var(--color-text-muted)'}
					stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					width="48" height="48" aria-hidden="true">
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
				</svg>
			</button>
			<p class="chart-note">Hover the heart — Spring physics drives scale and color reactively.</p>
		</div>
		<pre class="code-block"><code>{springHoverExample}</code></pre>

		<h3 class="section-title">4. GSAP integration</h3>
		<pre class="code-block"><code>{gsapIconExample}</code></pre>
		<p class="chart-note">Wrap the icon in a <code>div</code> with <code>bind:this</code>, then GSAP animates the wrapper. The icon itself is pure SVG — GSAP handles rotation, scale, position on the container.</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Animation on SVG components requires understanding the boundary between SVG attributes and CSS transforms.</p>
	<ol class="experiments">
		<li><strong>Apply a Svelte <code>transition:</code> directly to the <code>&lt;svg&gt;</code> element.</strong> Transitions work on DOM elements, and <code>&lt;svg&gt;</code> is a DOM element, so this works. But if you apply it to a custom component like <code>&lt;IconCheck&gt;</code>, it does nothing — transitions must go on an HTML element wrapper, not a component tag.</li>
		<li><strong>Set <code>stroke-dashoffset</code> without setting <code>stroke-dasharray</code>.</strong> Nothing happens. The dash offset only works when a dash pattern is defined. Set <code>stroke-dasharray</code> to the path's total length to create the "full stroke" baseline that offset can animate.</li>
		<li><strong>Use CSS <code>transform: rotate()</code> on an <code>&lt;svg&gt;</code> element.</strong> CSS transforms on SVG elements work, but the transform origin defaults to the element's top-left corner (not center). Add <code>transform-origin: center</code> explicitly, or use the SVG <code>transform</code> attribute which has different origin semantics.</li>
		<li><strong>Chain a Spring animation and a Svelte transition on the same element.</strong> They fight — Spring sets <code>transform: scale()</code> via inline style while the transition also manipulates opacity/transform. Separate them: Spring on the inner icon, transition on the outer wrapper.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SVG-to-Svelte components unlock a three-tier animation system. The first tier is <strong>SVG-native animation</strong> — <code>stroke-dasharray</code> and <code>stroke-dashoffset</code> driven by <code>Tween</code> from <code>svelte/motion</code>, creating path-drawing effects that animate reactively. The second tier is <strong>Svelte transitions</strong> — <code>fade</code>, <code>fly</code>, <code>scale</code> applied to wrapper elements for mount/unmount animations. The third tier is <strong>physics and timeline engines</strong> — <code>Spring</code> for hover/interaction feedback and GSAP for complex sequenced timelines.</p>
	<p class="prose">The critical rule is <strong>separation of concerns</strong>. The icon component owns its SVG structure and props. Transitions go on a wrapper <code>&lt;div&gt;</code> around the component. Spring and GSAP target the wrapper element via <code>bind:this</code> or reactive styles. Never mix animation systems on the same element — one controls the icon's internal attributes (dashoffset, fill, stroke), the other controls the wrapper's spatial properties (position, scale, opacity).</p>
	<p class="prose">This pipeline means every icon in your <code>$lib/icons/</code> directory is animation-ready from the moment it is converted. No special markup, no animation-specific icon variants. The same <code>&lt;IconHeart /&gt;</code> component works in a static list, a Spring-animated like button, a GSAP timeline, and a Svelte transition — because it is just a reactive Svelte component that renders an SVG.</p>
	<p class="next">Next: <a href="/svg-to-svelte/project">SVG to Svelte — Module Project</a></p>
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
	.transition-demo { display: flex; flex-direction: column; gap: var(--space-md); }
	.transition-controls { display: flex; gap: var(--space-xs); flex-wrap: wrap; }
	.mode-btn { padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: transparent; color: var(--color-text-muted); font-size: var(--text-xs); cursor: pointer; transition: all var(--dur-fast) var(--ease-out); &.active { border-color: var(--color-brand); color: var(--color-brand); } }
	.toggle-vis { padding: var(--space-xs) var(--space-md); border: 1px solid var(--color-brand); border-radius: var(--radius-sm); background: oklch(from var(--color-brand) l c h / 0.1); color: var(--color-brand); font-size: var(--text-xs); cursor: pointer; }
	.transition-stage { display: flex; align-items: center; justify-content: center; min-block-size: 100px; background: var(--color-surface-2); border-radius: var(--radius-md); }
	.spring-demo { display: flex; flex-direction: column; align-items: start; gap: var(--space-sm); }
	.spring-btn { border: none; background: transparent; cursor: pointer; padding: var(--space-sm); border-radius: var(--radius-md); transition: background var(--dur-fast) var(--ease-out); &:hover { background: oklch(from var(--color-error) l c h / 0.08); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
