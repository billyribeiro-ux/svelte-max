<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const useTextureCode = `<script lang="ts">
  ${"import"} { FragCanvas, defineMaterial } from '@motion-core/motion-gpu/svelte';
  ${"import"} Runtime from './Runtime.svelte';

  const material = defineMaterial({
    fragment: \`
      fn frag(uv: vec2f) -> vec4f {
        // Sample the texture at the current UV coordinate
        let color = textureSample(
          mainTexture, mainSampler, uv
        );

        // Apply a time-based distortion
        let t = motiongpuUniforms.uTime;
        let distorted_uv = uv + vec2f(
          sin(uv.y * 10.0 + t) * 0.02,
          cos(uv.x * 10.0 + t) * 0.02
        );
        let distorted = textureSample(
          mainTexture, mainSampler, distorted_uv
        );

        return distorted;
      }
    \`,
    textures: {
      mainTexture: {
        // Initial value: null (loaded at runtime)
        // The sampler is auto-generated as mainSampler
      }
    },
    uniforms: { uTime: 0 }
  });
<\/script>

<FragCanvas {material}>
  <Runtime />
</FragCanvas>`;

	const runtimeTexture = `<!-- Runtime.svelte -->
<script lang="ts">
  ${"import"} { useFrame, useTexture } from '@motion-core/motion-gpu/svelte';

  // useTexture loads an image from URL and returns a GPU texture
  // It handles: fetch, decode, upload to GPU, mipmap generation
  const texture = useTexture('/textures/photo.jpg');

  useFrame((state) => {
    state.setUniform('uTime', state.time);

    // Set the texture once it is loaded
    if (texture.current) {
      state.setTexture('mainTexture', texture.current);
    }
  });
<\/script>`;

	const multiTextureCode = `const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      let t = motiongpuUniforms.uTime;

      // Sample both textures
      let photo = textureSample(photoTex, photoSampler, uv);
      let noise = textureSample(noiseTex, noiseSampler, uv * 4.0);

      // Use noise to distort the photo
      let offset = (noise.rg - 0.5) * 0.05 * sin(t);
      let distorted = textureSample(
        photoTex, photoSampler, uv + offset
      );

      // Crossfade based on noise pattern
      let blend = smoothstep(0.4, 0.6, noise.r + sin(t) * 0.3);
      return mix(photo, distorted, blend);
    }
  \`,
  textures: {
    photoTex: {},
    noiseTex: {}
  },
  uniforms: { uTime: 0 }
});`;

	const proceduralTextures = `// Procedural textures: generate data on the CPU, upload as texture
function generateNoiseTexture(width: number, height: number): ImageData {
  const data = new ImageData(width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    const val = Math.random() * 255;
    data.data[i] = val;       // R
    data.data[i + 1] = val;   // G
    data.data[i + 2] = val;   // B
    data.data[i + 3] = 255;   // A
  }
  return data;
}

// In useFrame:
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const ctx = canvas.getContext('2d')!;
const noiseData = generateNoiseTexture(256, 256);
ctx.putImageData(noiseData, 0, 0);

// Upload the canvas as a texture
state.setTexture('noiseTex', canvas);`;

	const imageProcessing = `// GPU image processing patterns:

// Grayscale
fn shade(color: vec4f, uv: vec2f) -> vec4f {
  let lum = dot(color.rgb, vec3f(0.2126, 0.7152, 0.0722));
  return vec4f(vec3f(lum), color.a);
}

// Invert
fn shade(color: vec4f, uv: vec2f) -> vec4f {
  return vec4f(1.0 - color.rgb, color.a);
}

// Edge detection (Sobel)
fn shade(color: vec4f, uv: vec2f) -> vec4f {
  let texel = 1.0 / vec2f(motiongpuFrame.resolution);
  let tl = luminance(sample(uv + vec2f(-1, -1) * texel));
  let t  = luminance(sample(uv + vec2f( 0, -1) * texel));
  let tr = luminance(sample(uv + vec2f( 1, -1) * texel));
  let l  = luminance(sample(uv + vec2f(-1,  0) * texel));
  let r  = luminance(sample(uv + vec2f( 1,  0) * texel));
  let bl = luminance(sample(uv + vec2f(-1,  1) * texel));
  let b  = luminance(sample(uv + vec2f( 0,  1) * texel));
  let br = luminance(sample(uv + vec2f( 1,  1) * texel));

  let gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
  let gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
  let edge = sqrt(gx*gx + gy*gy);

  return vec4f(vec3f(edge), 1.0);
}

// Chromatic aberration
fn shade(color: vec4f, uv: vec2f) -> vec4f {
  let offset = 0.005;
  let r = textureSample(inputTexture, inputSampler, uv + vec2f(offset, 0)).r;
  let g = color.g;
  let b = textureSample(inputTexture, inputSampler, uv - vec2f(offset, 0)).b;
  return vec4f(r, g, b, 1.0);
}`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Texture & image processing demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.7 — Textures & Image Processing</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.7 — Textures & Image Processing</h1>
	<p class="concept">
		<strong>Concept.</strong> Textures bring external images into the GPU pipeline. <code>useTexture()</code>
		loads an image from a URL and returns a GPU texture handle. <code>state.setTexture()</code> uploads
		it per-frame. In WGSL, <code>textureSample(texture, sampler, uv)</code> reads a pixel at any UV
		coordinate. Combined with ShaderPass, this enables GPU-accelerated image processing: grayscale,
		blur, edge detection, chromatic aberration — all running at 60fps on the GPU.
	</p>

	<div class="build">
		<h3 class="section-title">Loading textures with useTexture</h3>
		<pre class="code-block"><code>{useTextureCode}</code></pre>

		<h3 class="section-title">Runtime texture setup</h3>
		<pre class="code-block"><code>{runtimeTexture}</code></pre>
		<p class="chart-note"><code>useTexture()</code> handles fetch → decode → GPU upload → mipmap generation. The <code>texture.current</code> is null until loaded — guard with an <code>if</code> check.</p>

		<h3 class="section-title">Multiple textures</h3>
		<pre class="code-block"><code>{multiTextureCode}</code></pre>

		<h3 class="section-title">Procedural textures from JavaScript</h3>
		<pre class="code-block"><code>{proceduralTextures}</code></pre>
		<p class="chart-note">You can upload any <code>HTMLCanvasElement</code>, <code>ImageBitmap</code>, or <code>HTMLImageElement</code> as a texture source — not just URLs.</p>

		<h3 class="section-title">GPU image processing patterns</h3>
		<pre class="code-block"><code>{imageProcessing}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Texture operations have specific constraints around sampling, formats, and timing.</p>
	<ol class="experiments">
		<li><strong>Call <code>state.setTexture('notDeclared', texture)</code>.</strong> Validation fails — only textures declared in <code>defineMaterial({'{ textures }'})</code> can be set at runtime. This prevents typos from silently failing.</li>
		<li><strong>Sample a texture before it finishes loading (<code>texture.current</code> is null).</strong> The shader renders black or garbage pixels for that region. Always check <code>if (texture.current)</code> before setting. You can render a fallback solid color or loading indicator while textures load.</li>
		<li><strong>Sample with UV coordinates outside [0, 1].</strong> The default sampler wraps (repeats). This is often desirable (tiling patterns) but unexpected for photos. Texture configuration controls wrapping, clamping, and filtering behavior.</li>
		<li><strong>Load a 4K image as a texture and update it every frame.</strong> GPU texture uploads are expensive. Load once, then only update uniforms. If you need dynamic textures (video, canvas), use <code>HTMLCanvasElement</code> as source and update the canvas, not the GPU texture itself.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Textures are the data input layer for GPU image processing. <code>useTexture()</code> abstracts the async load → decode → upload pipeline into a single hook. The returned handle is null until ready, then set via <code>state.setTexture()</code> in <code>useFrame</code>. In WGSL, <code>textureSample(tex, sampler, uv)</code> reads any pixel — including fractional UV coordinates with hardware-accelerated bilinear filtering.</p>
	<p class="prose">The image processing patterns — grayscale, edge detection, chromatic aberration — are all ShaderPass functions that read <code>inputColor</code> and transform it. Combined with multi-pass pipelines (MG.5), you can chain: blur → edge detect → color grade → vignette in a single frame, all on the GPU. This is orders of magnitude faster than CPU-based canvas manipulation.</p>
	<p class="prose">Procedural textures (noise, gradients, data visualizations) generated in JavaScript can be uploaded via <code>HTMLCanvasElement</code>. This bridges CPU computation (random noise, math, data fetching) with GPU rendering (per-pixel transformation). The GPU handles the heavy per-pixel work; the CPU handles data preparation and logic.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-8-performance">MG.8 — Performance & Render Modes</a></p>
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
