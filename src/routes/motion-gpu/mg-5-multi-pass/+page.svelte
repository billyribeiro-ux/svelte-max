<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const shaderPassCode = `import { FragCanvas, defineMaterial, ShaderPass } from '@motion-core/motion-gpu/svelte';

const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      let t = motiongpuUniforms.uTime;
      let centered = uv - 0.5;
      let dist = length(centered);
      let ring = sin(dist * 30.0 - t * 4.0) * 0.5 + 0.5;
      let color = vec3f(ring * 0.6, ring * 0.3, ring);
      return vec4f(color, 1.0);
    }
  \`,
  uniforms: { uTime: 0 }
});

// ShaderPass reads the previous output and transforms it
// Entry point: fn shade(inputColor: vec4f, uv: vec2f) -> vec4f
const blur = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      // Simple box blur: average surrounding pixels
      let texel = 1.0 / vec2f(motiongpuFrame.resolution);
      var sum = vec4f(0.0);
      for (var x = -2; x <= 2; x++) {
        for (var y = -2; y <= 2; y++) {
          let offset = vec2f(f32(x), f32(y)) * texel;
          sum += textureSample(inputTexture, inputSampler, uv + offset);
        }
      }
      return sum / 25.0;
    }
  \`
});

const vignette = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      let centered = uv - 0.5;
      let dist = length(centered);
      let vig = 1.0 - smoothstep(0.3, 0.7, dist);
      return vec4f(inputColor.rgb * vig, inputColor.a);
    }
  \`
});`;

	const passChaining = `<!-- Pass array defines the pipeline order -->
<FragCanvas {material} passes={[blur, vignette]}>
  <Runtime />
</FragCanvas>

<!-- Pipeline flow:
  1. material fragment → renders base image to texture A
  2. blur ShaderPass → reads A, writes blurred to texture B
  3. vignette ShaderPass → reads B, writes vignetted to canvas
-->`;

	const blitPassCode = `import { BlitPass, CopyPass } from '@motion-core/motion-gpu/svelte';

// BlitPass: copy one texture to another with format conversion
const blit = new BlitPass({
  input: 'source',   // read from the previous pass output
  output: 'target'   // write to the next pass input
});

// CopyPass: raw GPU texture copy (fastest, no shader)
const copy = new CopyPass({
  input: 'source',
  output: 'canvas'   // final output to screen
});`;

	const namedTargets = `const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      // ... scene rendering
    }
  \`,
  textures: {
    // Named render target: 'bloom' texture for glow extraction
    bloom: { width: 512, height: 512, format: 'rgba8unorm' }
  },
  uniforms: { uTime: 0 }
});

// Extract bright pixels
const extractBright = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      let brightness = dot(inputColor.rgb, vec3f(0.2126, 0.7152, 0.0722));
      if (brightness > 0.7) {
        return inputColor;
      }
      return vec4f(0.0, 0.0, 0.0, 1.0);
    }
  \`,
  output: 'bloom'  // Write to named target
});

// Blur the bloom texture
const blurBloom = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      // ... gaussian blur on bloom texture
    }
  \`,
  input: 'bloom',
  output: 'bloom'
});

// Composite: blend bloom back onto the scene
const composite = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      let bloom = textureSample(bloomTexture, bloomSampler, uv);
      return inputColor + bloom * 0.3;
    }
  \`
});`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Multi-pass pipeline demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.5 — Multi-Pass Pipelines</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.5 — Multi-Pass Pipelines</h1>
	<p class="concept">
		<strong>Concept.</strong> Real-world GPU effects require multiple rendering passes. A bloom effect,
		for example, needs three passes: render the scene, extract bright pixels, blur them, then composite
		back. Motion GPU provides <code>ShaderPass</code> (fragment transform), <code>BlitPass</code> (texture copy
		with format conversion), and <code>CopyPass</code> (raw GPU copy). Passes chain in the
		<code>passes</code> array — each reads the previous output and writes to the next input.
	</p>

	<div class="build">
		<h3 class="section-title">ShaderPass: post-processing</h3>
		<pre class="code-block"><code>{shaderPassCode}</code></pre>
		<p class="chart-note">ShaderPass entry point is <code>fn shade(inputColor: vec4f, uv: vec2f) -&gt; vec4f</code> — it receives the previous pass's pixel color and can modify it.</p>

		<h3 class="section-title">Pass chaining</h3>
		<pre class="code-block"><code>{passChaining}</code></pre>

		<div class="pipeline-diagram">
			<div class="pipe-stage">
				<span class="pipe-label">Material</span>
				<span class="pipe-desc">Base render</span>
			</div>
			<div class="pipe-arrow">→</div>
			<div class="pipe-stage">
				<span class="pipe-label">ShaderPass</span>
				<span class="pipe-desc">Blur</span>
			</div>
			<div class="pipe-arrow">→</div>
			<div class="pipe-stage">
				<span class="pipe-label">ShaderPass</span>
				<span class="pipe-desc">Vignette</span>
			</div>
			<div class="pipe-arrow">→</div>
			<div class="pipe-stage final">
				<span class="pipe-label">Canvas</span>
				<span class="pipe-desc">Screen</span>
			</div>
		</div>

		<h3 class="section-title">BlitPass & CopyPass</h3>
		<pre class="code-block"><code>{blitPassCode}</code></pre>

		<h3 class="section-title">Named render targets (bloom example)</h3>
		<pre class="code-block"><code>{namedTargets}</code></pre>
		<p class="chart-note">Named targets let passes read/write to specific textures instead of the default ping-pong chain. This enables branching pipelines like bloom extraction → blur → composite.</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Multi-pass pipelines introduce ordering, read/write, and texture format constraints.</p>
	<ol class="experiments">
		<li><strong>Use <code>fn frag()</code> instead of <code>fn shade()</code> in a <code>ShaderPass</code>.</strong> Validation fails — ShaderPass requires the <code>fn shade(inputColor: vec4f, uv: vec2f) -&gt; vec4f</code> signature, not <code>fn frag</code>. The material uses <code>frag</code>; passes use <code>shade</code>. Different contracts for different pipeline stages.</li>
		<li><strong>Read from <code>input: 'canvas'</code> in a render pass.</strong> Hard contract violation — render passes cannot read from the canvas. The canvas is write-only (final output). Use <code>input: 'source'</code> or a named target instead.</li>
		<li><strong>Set <code>needsSwap: true</code> on a pass with <code>output: 'bloom'</code>.</strong> <code>needsSwap</code> is only valid for <code>input: 'source'</code> / <code>output: 'target'</code> (the default ping-pong pair). Named targets do not participate in swap logic.</li>
		<li><strong>Chain 10 ShaderPasses without any optimization.</strong> Each pass requires a full-screen draw call and texture read. For blur, a two-pass separable Gaussian (horizontal + vertical) is O(n) instead of the naive O(n²) box blur. Always optimize pass count.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Multi-pass rendering is the professional pattern for complex visual effects. Each pass is a focused transformation: extract, blur, composite, color-grade, vignette. The pipeline is a directed graph where each node reads from one or more textures and writes to one output. Motion GPU manages the texture ping-pong (alternating source/target) automatically — you only specify the pass order.</p>
	<p class="prose"><code>ShaderPass</code> is the workhorse — a fullscreen fragment shader with <code>fn shade(inputColor, uv)</code> that transforms the previous pass's output. <code>BlitPass</code> copies with format conversion. <code>CopyPass</code> does raw GPU-level texture duplication. Named render targets break out of the linear pipeline into branching graphs (bloom, shadow maps, G-buffers).</p>
	<p class="prose">The key performance insight is that each pass is a full-screen draw. A 5-pass pipeline at 4K resolution processes 5 × 8.3 million pixels per frame. This is where separable kernels (two 1D passes instead of one 2D pass), half-resolution targets, and pass merging become critical. Profile with <code>captureSchedulerDebugSnapshot()</code> to find bottlenecks.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-6-compute-shaders">MG.6 — Compute Shaders</a></p>
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
	.pipeline-diagram { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-xs); padding: var(--space-md); background: var(--color-surface-2); border-radius: var(--radius-md); }
	.pipe-stage { display: flex; flex-direction: column; align-items: center; padding: var(--space-sm) var(--space-md); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); &.final { border-color: var(--color-brand); } }
	.pipe-label { font-family: var(--font-mono); font-size: var(--text-xs); font-weight: 600; color: var(--color-text); }
	.pipe-desc { font-size: 10px; color: var(--color-text-muted); }
	.pipe-arrow { color: var(--color-text-muted); font-size: var(--text-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
