<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const usePointerCode = `<!-- Runtime.svelte -->
<script lang="ts">
  ${"import"} { useFrame, usePointer } from '@motion-core/motion-gpu/svelte';

  // usePointer returns reactive pointer state
  // position: normalized 0→1 UV coordinates over the canvas
  // isDown: whether the pointer is pressed
  const pointer = usePointer();

  useFrame((state) => {
    state.setUniform('uTime', state.time);
    state.setUniform('uMouseX', pointer.position.x);
    state.setUniform('uMouseY', pointer.position.y);
    state.setUniform('uMouseDown', pointer.isDown ? 1.0 : 0.0);
  });
<\/script>`;

	const pointerShader = `const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      let t = motiongpuUniforms.uTime;
      let mouse = vec2f(
        motiongpuUniforms.uMouseX,
        motiongpuUniforms.uMouseY
      );
      let pressed = motiongpuUniforms.uMouseDown;

      // Distance from pointer
      let dist = distance(uv, mouse);

      // Glow around pointer — brighter when pressed
      let glowRadius = select(0.15, 0.25, pressed > 0.5);
      let glow = 1.0 - smoothstep(0.0, glowRadius, dist);

      // Ripple rings expanding from pointer
      let ripple = sin(dist * 40.0 - t * 5.0) * 0.5 + 0.5;
      let rings = ripple * smoothstep(0.3, 0.0, dist);

      // PE7 brand color modulated by interaction
      let brand = vec3f(0.49, 0.36, 0.99);
      let color = brand * (glow * 0.8 + rings * 0.4);

      // Background: subtle gradient
      let bg = vec3f(0.03, 0.03, 0.06);
      let final_color = bg + color;

      return vec4f(final_color, 1.0);
    }
  \`,
  uniforms: {
    uTime: 0,
    uMouseX: 0.5,
    uMouseY: 0.5,
    uMouseDown: 0
  }
});`;

	const svelteBridgePattern = `<!-- Combining Svelte pointer events with Motion GPU -->
<script lang="ts">
  ${"import"} { FragCanvas, defineMaterial } from '@motion-core/motion-gpu/svelte';
  ${"import"} Runtime from './Runtime.svelte';

  // Option A: usePointer() inside Runtime (preferred)
  // Reads directly from the canvas element

  // Option B: Svelte event handlers → $state → useFrame
  let mousePos = $state({ x: 0.5, y: 0.5 });

  function handlePointerMove(e: PointerEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mousePos = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    };
  }
<\/script>

<!-- Option A: usePointer handles everything internally -->
<FragCanvas {material}>
  <Runtime />
</FragCanvas>

<!-- Option B: manual events on a wrapper -->
<div onpointermove={handlePointerMove}>
  <FragCanvas {material}>
    <RuntimeWithProps mouseX={mousePos.x} mouseY={mousePos.y} />
  </FragCanvas>
</div>`;

	const interactivePatterns = `// Pattern 1: Cursor spotlight
let glow = exp(-dist * dist * 50.0); // Gaussian falloff

// Pattern 2: Repulsion — push shapes away from cursor
let push = normalize(uv - mouse) * smoothstep(0.2, 0.0, dist);

// Pattern 3: Color picker — hover reveals different hues
let hue = atan2(uv.y - mouse.y, uv.x - mouse.x) / 6.283;

// Pattern 4: Zoom — magnify area around cursor
let zoomed_uv = mix(uv, mouse, smoothstep(0.3, 0.0, dist) * 0.5);

// Pattern 5: Click ripple — expanding ring on press
let ring_dist = abs(dist - fract(t - clickTime) * 0.5);
let ring = smoothstep(0.02, 0.0, ring_dist) * step(0.0, clickTime);`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Pointer interaction patterns\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.4 — Pointer Interaction</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.4 — Pointer Interaction</h1>
	<p class="concept">
		<strong>Concept.</strong> Motion GPU's <code>usePointer()</code> hook provides normalized pointer
		coordinates (0→1 UV space) and press state, updated every frame. These values become uniforms that
		the WGSL shader reads to create interactive effects — cursor glows, ripples, repulsion fields,
		and zoom lenses. The pointer position in UV space matches the shader's coordinate system exactly,
		so <code>distance(uv, mouse)</code> measures the pixel-to-pointer distance directly.
	</p>

	<div class="build">
		<h3 class="section-title">usePointer() hook</h3>
		<pre class="code-block"><code>{usePointerCode}</code></pre>

		<h3 class="section-title">Interactive shader with pointer</h3>
		<pre class="code-block"><code>{pointerShader}</code></pre>

		<h3 class="section-title">Svelte integration patterns</h3>
		<pre class="code-block"><code>{svelteBridgePattern}</code></pre>
		<p class="chart-note">Option A (<code>usePointer</code>) is simpler and stays in the Motion GPU context. Option B gives you full Svelte event handling (drag gestures, multi-touch) with manual UV normalization.</p>

		<h3 class="section-title">Interactive shader patterns</h3>
		<pre class="code-block"><code>{interactivePatterns}</code></pre>

		<div class="pattern-grid">
			<div class="pattern-card">
				<h4>Spotlight</h4>
				<p>Gaussian <code>exp()</code> falloff creates a smooth light cone that follows the cursor.</p>
			</div>
			<div class="pattern-card">
				<h4>Repulsion</h4>
				<p>Push shapes away from the pointer using normalized direction vectors.</p>
			</div>
			<div class="pattern-card">
				<h4>Color picker</h4>
				<p><code>atan2()</code> around the pointer creates a radial hue wheel.</p>
			</div>
			<div class="pattern-card">
				<h4>Zoom lens</h4>
				<p><code>mix(uv, mouse)</code> warps UV space toward the cursor, magnifying the area.</p>
			</div>
			<div class="pattern-card">
				<h4>Click ripple</h4>
				<p>Expanding ring on click — record click time, animate <code>fract(t - clickTime)</code>.</p>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Pointer interaction exposes coordinate system mismatches and timing issues.</p>
	<ol class="experiments">
		<li><strong>Use raw <code>e.clientX</code> instead of normalized 0→1 coordinates.</strong> The shader receives pixel values (0→1920) instead of UV values (0→1). The <code>distance()</code> calculation produces enormous numbers and the effect disappears. Always normalize: <code>(clientX - rect.left) / rect.width</code>.</li>
		<li><strong>Forget to invert the Y axis on a CSS-transformed canvas.</strong> CSS coordinates have Y increasing downward; some WebGPU setups expect Y upward. <code>usePointer()</code> handles this automatically, but manual normalization must account for the canvas's coordinate convention.</li>
		<li><strong>Set the pointer uniform only when the mouse moves (not every frame).</strong> When the mouse is stationary, the shader still reads the last uniform value — which is correct. But if you use <code>state.delta</code> for velocity calculations, a stopped mouse should explicitly set velocity to 0 in <code>useFrame</code>.</li>
		<li><strong>Call <code>usePointer()</code> outside of <code>&lt;FragCanvas&gt;</code>.</strong> Same as <code>useFrame</code> — it requires the Motion GPU context provided by <code>&lt;FragCanvas&gt;</code>. Place it in a child component rendered inside the canvas.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>usePointer()</code> provides normalized pointer coordinates that directly correspond to the shader's UV space. When the pointer is at the canvas center, <code>position.x</code> and <code>position.y</code> are both <code>0.5</code> — exactly matching <code>uv</code> at the center pixel. This coordinate alignment eliminates the mapping bugs that plague raw DOM event → shader pipelines.</p>
	<p class="prose">Every interactive shader pattern reduces to a distance function. The pointer is a point in UV space; every pixel measures its distance to that point. Glow is distance → brightness. Ripples are distance → sine wave. Repulsion is distance → direction vector. Zoom is distance → UV warp. The math is the same <code>distance(uv, mouse)</code> operation with different transformations applied to the result.</p>
	<p class="prose">The Svelte → GPU bridge is seamless because uniforms update every frame. A slider changes <code>$state</code>, which flows through <code>$props</code> to <code>useFrame</code>, which calls <code>setUniform</code>. The GPU sees new values on the very next frame — no explicit synchronization, no batching delays. This is what makes Motion GPU feel like a natural extension of Svelte's reactivity model.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-5-multi-pass">MG.5 — Multi-Pass Pipelines</a></p>
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
	.pattern-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-sm); }
	.pattern-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } & code { font-family: var(--font-mono); font-size: 0.85em; background: var(--color-surface); padding: 0 var(--space-xs); border-radius: var(--radius-xs); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
