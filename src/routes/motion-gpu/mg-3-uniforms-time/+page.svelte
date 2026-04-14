<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const timeUniform = `<!-- App.svelte -->
<script lang="ts">
  ${"import"} { FragCanvas, defineMaterial } from '@motion-core/motion-gpu/svelte';
  ${"import"} Runtime from './Runtime.svelte';

  const material = defineMaterial({
    fragment: \`
      fn frag(uv: vec2f) -> vec4f {
        // Access the time uniform injected by useFrame
        let t = motiongpuUniforms.uTime;

        // Pulsing circle: radius oscillates with sin(time)
        let center = uv - 0.5;
        let dist = length(center);
        let radius = 0.2 + 0.08 * sin(t * 3.0);
        let circle = 1.0 - smoothstep(radius - 0.01, radius + 0.01, dist);

        // Color shifts over time
        let r = 0.5 + 0.5 * sin(t);
        let g = 0.5 + 0.5 * sin(t + 2.094);  // +120°
        let b = 0.5 + 0.5 * sin(t + 4.189);  // +240°
        let color = vec3f(r, g, b) * circle;

        return vec4f(color, 1.0);
      }
    \`,
    uniforms: {
      uTime: 0   // Declare every uniform with its initial value
    }
  });
<\/script>

<FragCanvas {material}>
  <Runtime />
</FragCanvas>`;

	const runtimeComponent = `<!-- Runtime.svelte -->
<script lang="ts">
  ${"import"} { useFrame } from '@motion-core/motion-gpu/svelte';

  // useFrame runs once per frame — 60fps on most displays
  // state.time = elapsed seconds since mount
  // state.delta = seconds since last frame (~0.016 at 60fps)
  useFrame((state) => {
    state.setUniform('uTime', state.time);
  });
<\/script>`;

	const multipleUniforms = `const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      let t = motiongpuUniforms.uTime;
      let speed = motiongpuUniforms.uSpeed;
      let intensity = motiongpuUniforms.uIntensity;

      let wave = sin(uv.x * 10.0 * speed + t * 2.0) * intensity;
      let color = vec3f(uv.x, uv.y + wave * 0.1, 0.5);

      return vec4f(color, 1.0);
    }
  \`,
  uniforms: {
    uTime: 0,
    uSpeed: 1.0,
    uIntensity: 0.5
  }
});`;

	const svelteStateToUniform = `<!-- Connecting Svelte $state to GPU uniforms -->
<script lang="ts">
  ${"import"} { FragCanvas, defineMaterial, useFrame } from '@motion-core/motion-gpu/svelte';

  let speed = $state(1.0);
  let intensity = $state(0.5);
  let color = $state([0.49, 0.36, 0.99]); // PE7 brand purple

  const material = defineMaterial({
    fragment: \`
      fn frag(uv: vec2f) -> vec4f {
        let t = motiongpuUniforms.uTime;
        let spd = motiongpuUniforms.uSpeed;
        let amp = motiongpuUniforms.uIntensity;
        let baseColor = vec3f(
          motiongpuUniforms.uColorR,
          motiongpuUniforms.uColorG,
          motiongpuUniforms.uColorB
        );

        let wave = sin(uv.x * 8.0 + t * spd) * amp;
        let finalColor = baseColor + vec3f(wave);

        return vec4f(finalColor, 1.0);
      }
    \`,
    uniforms: {
      uTime: 0,
      uSpeed: 1.0,
      uIntensity: 0.5,
      uColorR: 0.49,
      uColorG: 0.36,
      uColorB: 0.99
    }
  });
<\/script>

<!-- Runtime child reads $state and pushes to GPU -->
<FragCanvas {material}>
  <FrameDriver {speed} {intensity} {color} />
</FragCanvas>

<input type="range" min="0.1" max="5" step="0.1" bind:value={speed} />
<input type="range" min="0" max="1" step="0.05" bind:value={intensity} />`;

	const frameDriverCode = `<!-- FrameDriver.svelte -->
<script lang="ts">
  ${"import"} { useFrame } from '@motion-core/motion-gpu/svelte';

  let { speed, intensity, color }: {
    speed: number;
    intensity: number;
    color: number[];
  } = $props();

  useFrame((state) => {
    state.setUniform('uTime', state.time);
    state.setUniform('uSpeed', speed);
    state.setUniform('uIntensity', intensity);
    state.setUniform('uColorR', color[0]);
    state.setUniform('uColorG', color[1]);
    state.setUniform('uColorB', color[2]);
  });
<\/script>`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Uniforms & time animation demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.3 — Uniforms & Time Animation</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.3 — Uniforms & Time Animation</h1>
	<p class="concept">
		<strong>Concept.</strong> Uniforms are read-only values passed from JavaScript to the GPU each
		frame. They are the bridge between Svelte's reactive <code>$state</code> and WGSL shader code.
		Every uniform must be declared in <code>defineMaterial()</code> with an initial value. At runtime,
		<code>useFrame()</code> calls <code>state.setUniform(name, value)</code> to push new values to the
		GPU. Time (<code>state.time</code>) is the most common uniform — it drives all animation.
	</p>

	<div class="build">
		<h3 class="section-title">Time-animated shader</h3>
		<pre class="code-block"><code>{timeUniform}</code></pre>

		<h3 class="section-title">The Runtime component pattern</h3>
		<pre class="code-block"><code>{runtimeComponent}</code></pre>
		<p class="chart-note"><code>useFrame()</code> must be called inside a <code>&lt;FragCanvas&gt;</code> subtree — it registers with the parent renderer's frame scheduler. The callback runs at display refresh rate.</p>

		<h3 class="section-title">Multiple uniforms</h3>
		<pre class="code-block"><code>{multipleUniforms}</code></pre>

		<h3 class="section-title">Svelte $state → GPU uniforms</h3>
		<pre class="code-block"><code>{svelteStateToUniform}</code></pre>

		<h3 class="section-title">FrameDriver component</h3>
		<pre class="code-block"><code>{frameDriverCode}</code></pre>
		<p class="chart-note">The FrameDriver reads Svelte <code>$props</code> (driven by <code>$state</code>) and pushes them to the GPU every frame via <code>setUniform()</code>. This is the reactive bridge: slider → <code>$state</code> → prop → <code>useFrame</code> → GPU uniform → WGSL shader → pixels.</p>

		<div class="flow-diagram">
			<div class="flow-step">$state</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step">$props</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step">useFrame</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step">setUniform</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step">WGSL</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step">Pixels</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Uniforms are the most common source of shader bugs. Test every constraint.</p>
	<ol class="experiments">
		<li><strong>Call <code>state.setUniform('uNotDeclared', 1.0)</code> in <code>useFrame</code>.</strong> Motion GPU throws a validation error — you can only set uniforms that were declared in <code>defineMaterial()</code>. This prevents silent typos from causing mysterious blank-screen bugs.</li>
		<li><strong>Access <code>motiongpuUniforms.uTime</code> in WGSL without declaring <code>uTime</code> in the material.</strong> The WGSL compiler errors because the struct field does not exist. The uniform struct is generated from your <code>uniforms</code> declaration — undeclared fields are not available.</li>
		<li><strong>Set a uniform to a string value: <code>state.setUniform('uTime', 'hello')</code>.</strong> GPU uniforms are numeric — <code>f32</code> in WGSL. TypeScript catches this at compile time, but even without TS, the GPU write buffer would receive NaN.</li>
		<li><strong>Call <code>useFrame()</code> outside of a <code>&lt;FragCanvas&gt;</code> tree.</strong> It throws because there is no renderer context to register with. <code>useFrame</code> must be a descendant of <code>&lt;FragCanvas&gt;</code> — this is a hard contract enforced at runtime.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Uniforms are the data channel between your Svelte application and the GPU. They are declared once in <code>defineMaterial()</code> (compile-time contract) and updated per-frame in <code>useFrame()</code> (runtime updates). The material never changes — only the uniform values change. This separation is fundamental to GPU programming: pipeline compilation is expensive, but uniform updates are nearly free.</p>
	<p class="prose">The <code>useFrame()</code> callback receives a <code>state</code> object with <code>time</code> (elapsed seconds), <code>delta</code> (frame duration), and methods to update uniforms and textures. By reading Svelte <code>$props</code> inside <code>useFrame</code>, you create a reactive pipeline: any <code>$state</code> change in the parent flows through props, into the frame callback, and onto the GPU — all within a single frame.</p>
	<p class="prose">The <code>state.time</code> uniform is the heartbeat of every shader animation. By feeding <code>sin(time)</code>, <code>fract(time)</code>, or <code>time * speed</code> into your WGSL math, you create pulsing, cycling, and evolving visuals. Combined with UV coordinates, time creates the illusion of motion from a single mathematical function.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-4-pointer-interaction">MG.4 — Pointer Interaction</a></p>
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
	.flow-diagram { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-xs); padding: var(--space-md); background: var(--color-surface-2); border-radius: var(--radius-md); }
	.flow-step { padding: var(--space-xs) var(--space-sm); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-brand); font-weight: 600; }
	.flow-arrow { color: var(--color-text-muted); font-size: var(--text-sm); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
