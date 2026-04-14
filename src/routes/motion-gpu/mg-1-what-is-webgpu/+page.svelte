<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let gpuSupported = $state<boolean | null>(null);

	$effect(() => {
		gpuSupported = 'gpu' in navigator;
	});

	const webgpuVsWebgl = `| Feature              | WebGL 2          | WebGPU                |
|----------------------|------------------|-----------------------|
| Shading language     | GLSL             | WGSL                  |
| Compute shaders      | ❌               | ✅                    |
| Multi-pass pipelines | Manual FBOs      | Render graph          |
| API style            | State machine     | Command buffers       |
| GPU memory access    | Limited           | Storage buffers       |
| Thread safety        | Single-threaded   | Worker-compatible     |
| Browser support      | ~98%             | Chrome, Edge, Firefox |`;

	const whyMotionGpu = `// Three.js: full 3D engine (meshes, cameras, lights, physics)
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
// ... 50+ lines to render a single shader

// Motion GPU: minimal fullscreen shader runtime
${"import"} { FragCanvas, defineMaterial } from '@motion-core/motion-gpu/svelte';
const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      return vec4f(uv.x, uv.y, 0.5, 1.0);
    }
  \`
});
// <FragCanvas {material} /> — done`;

	const wgslBasics = `// WGSL — WebGPU Shading Language
// Type system: vec2f, vec3f, vec4f, f32, u32, i32, bool
// Built-ins: sin, cos, fract, smoothstep, mix, clamp, length, dot, cross

fn frag(uv: vec2f) -> vec4f {
  // uv.x and uv.y range from 0.0 to 1.0
  // uv = (0, 0) is top-left, (1, 1) is bottom-right

  let r = uv.x;           // red increases left to right
  let g = uv.y;           // green increases top to bottom
  let b = 0.5;            // constant blue
  let a = 1.0;            // fully opaque

  return vec4f(r, g, b, a);  // RGBA output
}`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"  let gpuSupported = $state<boolean | null>(null);\n" +
		"  $effect(() => { gpuSupported = 'gpu' in navigator; });\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.1 — What is WebGPU & Why Motion GPU?</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.1 — What is WebGPU & Why Motion GPU?</h1>
	<p class="concept">
		<strong>Concept.</strong> WebGPU is the next-generation GPU API for the web — replacing WebGL with
		a modern architecture modeled after Vulkan, Metal, and Direct3D 12. It introduces <strong>compute
		shaders</strong>, <strong>storage buffers</strong>, and a <strong>command buffer</strong> API.
		<code>@motion-core/motion-gpu</code> is a minimal Svelte 5 runtime that makes WebGPU accessible:
		you define a WGSL fragment shader, render it with <code>&lt;FragCanvas&gt;</code>, and drive
		animations with <code>useFrame</code>. No scene graph, no meshes, no cameras — just pure GPU pixels.
	</p>

	<div class="build">
		<h3 class="section-title">WebGPU support check</h3>
		<div class="gpu-check">
			{#if gpuSupported === null}
				<span class="checking">Checking...</span>
			{:else if gpuSupported}
				<span class="supported">✓ WebGPU is supported in this browser</span>
			{:else}
				<span class="unsupported">✗ WebGPU is not supported — try Chrome 113+ or Edge 113+</span>
			{/if}
		</div>

		<h3 class="section-title">WebGPU vs WebGL</h3>
		<pre class="code-block"><code>{webgpuVsWebgl}</code></pre>

		<h3 class="section-title">Why Motion GPU instead of Three.js?</h3>
		<pre class="code-block"><code>{whyMotionGpu}</code></pre>
		<p class="chart-note">Three.js is for 3D scenes with meshes, lights, and cameras. Motion GPU is for fullscreen shader pipelines — generative art, post-processing, GPU simulations. Different tools for different problems.</p>

		<h3 class="section-title">WGSL fundamentals</h3>
		<pre class="code-block"><code>{wgslBasics}</code></pre>

		<div class="wgsl-concepts">
			<div class="wgsl-card">
				<h4>Fragment shader</h4>
				<p>Runs once per pixel. Receives UV coordinates (0→1), returns RGBA color. This is the core of Motion GPU — every visual is a function from position to color.</p>
			</div>
			<div class="wgsl-card">
				<h4>Uniforms</h4>
				<p>Read-only values passed from JavaScript to the shader each frame. Time, mouse position, sliders — any reactive <code>$state</code> value can drive a uniform.</p>
			</div>
			<div class="wgsl-card">
				<h4>Compute shaders</h4>
				<p>General-purpose GPU programs. Particle simulations, physics, image processing — anything that benefits from massively parallel computation.</p>
			</div>
			<div class="wgsl-card">
				<h4>Storage buffers</h4>
				<p>Read-write GPU memory. Compute shaders write results to storage buffers; fragment shaders read them. This is how GPU simulations drive visual output.</p>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Understanding WebGPU's constraints is essential before writing shaders.</p>
	<ol class="experiments">
		<li><strong>Open this page in Safari (pre-WebGPU support).</strong> The <code>navigator.gpu</code> check returns <code>undefined</code>. Motion GPU requires a secure context (HTTPS or localhost) and a WebGPU-capable browser. Always feature-detect and provide a fallback — a static image or a WebGL fallback path.</li>
		<li><strong>Write GLSL syntax in a WGSL shader.</strong> WGSL uses <code>fn</code> instead of <code>void</code>, <code>vec4f</code> instead of <code>vec4</code>, <code>let</code>/<code>var</code> instead of bare declarations. GLSL code will produce a <code>GPUCompilationError</code>. WGSL is a distinct language with Rust-like syntax.</li>
		<li><strong>Return a <code>vec3f</code> from the fragment function instead of <code>vec4f</code>.</strong> Motion GPU's strict material contract requires <code>fn frag(uv: vec2f) -> vec4f</code>. The alpha channel (4th component) is mandatory. Returning <code>vec3f</code> fails validation before the shader even compiles.</li>
		<li><strong>Try to access <code>motiongpuUniforms.uTime</code> without declaring <code>uniforms: {'{ uTime: 0 }'}</code> in <code>defineMaterial</code>.</strong> Validation fails — Motion GPU enforces that every uniform accessed in WGSL must be declared in the material definition. This prevents silent undefined-variable bugs in shaders.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">WebGPU is not an incremental upgrade to WebGL — it is a fundamentally different architecture. Where WebGL uses a stateful API and GLSL shaders, WebGPU uses command buffers, WGSL, and explicit resource management. Compute shaders are the headline feature: they enable general-purpose GPU programming (physics, particles, image processing) that was impossible in WebGL without workarounds.</p>
	<p class="prose">Motion GPU wraps this power in a three-step Svelte workflow: <code>defineMaterial()</code> creates an immutable shader contract, <code>&lt;FragCanvas&gt;</code> renders it to a fullscreen canvas, and <code>useFrame()</code> drives per-frame updates. The strict material validation — requiring <code>fn frag(uv: vec2f) -&gt; vec4f</code>, declared uniforms, and typed storage buffers — catches errors at definition time instead of at runtime.</p>
	<p class="prose">The key mental model is: <strong>every pixel runs the same function</strong>. Your fragment shader receives a UV coordinate and returns a color. Animation happens by changing uniforms (time, mouse, reactive state) each frame. Complex effects emerge from mathematical functions operating on position and time — not from scene graphs, meshes, or DOM manipulation.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-2-first-shader">MG.2 — Your First Shader</a></p>
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
	.gpu-check { padding: var(--space-md); border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 500; }
	.checking { color: var(--color-text-muted); }
	.supported { color: var(--color-success); background: oklch(from var(--color-success) l c h / 0.1); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); }
	.unsupported { color: var(--color-error); background: oklch(from var(--color-error) l c h / 0.1); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); }
	.wgsl-concepts { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md); }
	.wgsl-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
