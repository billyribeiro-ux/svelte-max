<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const minimalShader = `<script lang="ts">
  ${"import"} { FragCanvas, defineMaterial } from '@motion-core/motion-gpu/svelte';

  // Step 1: Define an immutable material
  const material = defineMaterial({
    fragment: \`
      fn frag(uv: vec2f) -> vec4f {
        // uv ranges from (0,0) top-left to (1,1) bottom-right
        return vec4f(uv.x, uv.y, 0.25, 1.0);
      }
    \`
  });
<\/script>

<!-- Step 2: Render it -->
<div style="width: 100vw; height: 100vh;">
  <FragCanvas {material} />
</div>`;

	const gradientShader = `fn frag(uv: vec2f) -> vec4f {
  // Diagonal gradient: mix two OKLCH-inspired colors
  let t = (uv.x + uv.y) * 0.5;

  // PE7 brand purple → success green
  let purple = vec3f(0.49, 0.36, 0.99); // oklch(65% 0.22 270) approx
  let green  = vec3f(0.36, 0.68, 0.46); // oklch(65% 0.18 145) approx

  let color = mix(purple, green, t);
  return vec4f(color, 1.0);
}`;

	const circleShader = `fn frag(uv: vec2f) -> vec4f {
  // Center the coordinate system: -0.5 to 0.5
  let centered = uv - 0.5;

  // Distance from center
  let dist = length(centered);

  // Sharp circle at radius 0.3
  let circle = step(dist, 0.3);

  // Apply PE7 brand color inside, dark outside
  let inner = vec3f(0.49, 0.36, 0.99);
  let outer = vec3f(0.05, 0.05, 0.08);
  let color = mix(outer, inner, circle);

  return vec4f(color, 1.0);
}`;

	const smoothCircle = `fn frag(uv: vec2f) -> vec4f {
  let centered = uv - 0.5;
  let dist = length(centered);

  // smoothstep creates an anti-aliased edge
  // Transition from 0.28 (fully inside) to 0.30 (fully outside)
  let circle = 1.0 - smoothstep(0.28, 0.30, dist);

  let inner = vec3f(0.49, 0.36, 0.99);
  let outer = vec3f(0.05, 0.05, 0.08);
  let color = mix(outer, inner, circle);

  return vec4f(color, 1.0);
}`;

	const wgslFunctions = `// Essential WGSL math functions
length(v)            // vector magnitude
distance(a, b)       // distance between two points
dot(a, b)            // dot product
normalize(v)         // unit vector
mix(a, b, t)         // linear interpolation
step(edge, x)        // 0 if x < edge, 1 if x >= edge
smoothstep(lo, hi, x) // smooth 0→1 between lo and hi
fract(x)             // fractional part: x - floor(x)
sin(x), cos(x)       // trigonometry
abs(x)               // absolute value
min(a, b), max(a, b) // component-wise min/max
clamp(x, lo, hi)     // clamp to range`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import { FragCanvas, defineMaterial } from '@motion-core/motion-gpu/svelte';\n" +
		"  // ... shader examples\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.2 — Your First Shader</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.2 — Your First Shader</h1>
	<p class="concept">
		<strong>Concept.</strong> A fragment shader is a function that runs once per pixel. It receives a
		UV coordinate (<code>vec2f</code>, ranging 0→1) and returns an RGBA color (<code>vec4f</code>).
		In Motion GPU, you define this function with <code>defineMaterial()</code> and render it with
		<code>&lt;FragCanvas&gt;</code>. The entry point must be <code>fn frag(uv: vec2f) -&gt; vec4f</code> —
		this is Motion GPU's strict contract.
	</p>

	<div class="build">
		<h3 class="section-title">Minimal setup</h3>
		<pre class="code-block"><code>{minimalShader}</code></pre>
		<p class="chart-note">This renders a UV gradient — red increases left→right, green increases top→bottom. Every shader starts here.</p>

		<h3 class="section-title">Color gradients</h3>
		<pre class="code-block"><code>{gradientShader}</code></pre>

		<h3 class="section-title">Drawing a circle with math</h3>
		<pre class="code-block"><code>{circleShader}</code></pre>
		<p class="chart-note"><code>length()</code> computes distance from center. <code>step()</code> creates a hard edge. This is the fundamental technique — shapes are distance functions, not geometry.</p>

		<h3 class="section-title">Anti-aliased circle with smoothstep</h3>
		<pre class="code-block"><code>{smoothCircle}</code></pre>
		<p class="chart-note"><code>smoothstep(0.28, 0.30, dist)</code> creates a 2-pixel transition zone instead of a hard edge. This is how you anti-alias in shaders.</p>

		<h3 class="section-title">WGSL function reference</h3>
		<pre class="code-block"><code>{wgslFunctions}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Every WGSL error teaches you a constraint of the GPU programming model.</p>
	<ol class="experiments">
		<li><strong>Change the function signature to <code>fn frag(uv: vec2f) -&gt; vec3f</code>.</strong> Motion GPU rejects the material — it requires <code>vec4f</code> (RGBA). The alpha channel is not optional. Even fullscreen shaders need it because the canvas compositor uses alpha for blending.</li>
		<li><strong>Return <code>vec4f(uv, 1.0)</code> instead of <code>vec4f(uv.x, uv.y, 0.25, 1.0)</code>.</strong> This works because WGSL allows <code>vec4f(vec2f, f32, f32)</code> — constructors accept any combination of scalars and vectors that total 4 components. Understanding WGSL's flexible constructors is essential for concise shader code.</li>
		<li><strong>Use <code>if/else</code> in a tight loop inside the fragment shader.</strong> It works but is slow — GPU threads execute in lockstep (SIMD), so both branches execute even when only one is taken. Prefer <code>mix()</code>, <code>step()</code>, and <code>smoothstep()</code> for branchless selection.</li>
		<li><strong>Call <code>defineMaterial()</code> inside <code>$effect()</code>.</strong> Materials are immutable compile-time contracts. Recreating them per frame wastes GPU compilation time. Define once at the top level; update values at runtime via uniforms in <code>useFrame()</code>.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A fragment shader is a pure function: position in, color out. The GPU runs this function millions of times per frame — once per pixel — in parallel. This is fundamentally different from CPU-based rendering: you do not draw shapes imperatively, you define mathematical rules that determine every pixel's color simultaneously.</p>
	<p class="prose">The <code>defineMaterial()</code> function creates an immutable contract. The WGSL source, uniform declarations, and texture slots are frozen at definition time. Motion GPU validates the shader structure before it ever reaches the GPU — catching signature mismatches, undefined uniforms, and type errors early. Runtime updates happen through <code>useFrame()</code>, not by redefining the material.</p>
	<p class="prose">Signed Distance Functions (SDFs) are the shader equivalent of DOM elements. A circle is <code>length(uv - center) - radius</code>. A rectangle is <code>max(abs(uv.x - cx) - w, abs(uv.y - cy) - h)</code>. Complex shapes are built by combining SDFs with <code>min()</code> (union), <code>max()</code> (intersection), and smooth blending. This mathematical approach to shape definition is the foundation of procedural graphics.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-3-uniforms-time">MG.3 — Uniforms & Time Animation</a></p>
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
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
