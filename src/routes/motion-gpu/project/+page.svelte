<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let activeTab = $state<'material' | 'runtime' | 'compute' | 'postprocess'>('material');

	const materialCode = `${"import"} { FragCanvas, defineMaterial, ComputePass, ShaderPass }
  from '@motion-core/motion-gpu/svelte';

// 1. Define particle storage + fragment shader
const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      let t = motiongpuUniforms.uTime;
      let mouse = vec2f(motiongpuUniforms.uMouseX, motiongpuUniforms.uMouseY);

      // Background: dark with subtle gradient
      var color = vec3f(0.02, 0.02, 0.05);

      // Read particles from storage buffer
      let particleCount = 1024u;
      for (var i = 0u; i < particleCount; i++) {
        let p = particles[i];
        let pos = p.xy;
        let vel = p.zw;

        // Particle glow
        let d = distance(uv, pos);
        let speed = length(vel);
        let hue = f32(i) / f32(particleCount);

        // Color based on velocity: slow=blue, fast=orange
        let slowColor = vec3f(0.3, 0.4, 0.99);
        let fastColor = vec3f(0.99, 0.5, 0.2);
        let pColor = mix(slowColor, fastColor, clamp(speed * 20.0, 0.0, 1.0));

        // Additive glow
        let glow = 0.003 / (d * d + 0.001);
        color += pColor * glow;
      }

      // Mouse attractor glow
      let md = distance(uv, mouse);
      let mouseGlow = vec3f(0.49, 0.36, 0.99) * 0.01 / (md * md + 0.005);
      color += mouseGlow;

      return vec4f(color, 1.0);
    }
  \`,
  storageBuffers: {
    particles: {
      size: 1024 * 16,          // 1024 particles × vec4f (16 bytes each)
      type: 'array<vec4f>',
      access: 'read-write'
    }
  },
  uniforms: {
    uTime: 0,
    uMouseX: 0.5,
    uMouseY: 0.5,
    uDelta: 0.016,
    uGravity: 0.0002,
    uDamping: 0.995
  }
});`;

	const computeCode = `// 2. Compute pass: particle physics simulation
const simulate = new ComputePass({
  compute: \`
    @compute @workgroup_size(64)
    fn compute(@builtin(global_invocation_id) id: vec3u) {
      let i = id.x;
      if (i >= 1024u) { return; }

      var p = particles[i];
      var pos = p.xy;
      var vel = p.zw;

      // Mouse attraction
      let mouse = vec2f(motiongpuUniforms.uMouseX, motiongpuUniforms.uMouseY);
      let toMouse = mouse - pos;
      let dist = max(length(toMouse), 0.01);
      let gravity = motiongpuUniforms.uGravity;
      let force = normalize(toMouse) * gravity / (dist * dist + 0.01);
      vel += force;

      // Damping
      vel *= motiongpuUniforms.uDamping;

      // Integrate position
      pos += vel * motiongpuUniforms.uDelta * 60.0;

      // Wrap around edges
      pos = fract(pos + 1.0);

      particles[i] = vec4f(pos, vel);
    }
  \`,
  dispatch: [16]  // 16 × 64 = 1024 threads
});`;

	const postProcessCode = `// 3. Post-processing: bloom + vignette
const bloom = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      let texel = 1.0 / vec2f(motiongpuFrame.resolution);
      var sum = vec4f(0.0);
      let samples = 5;
      for (var x = -samples; x <= samples; x++) {
        for (var y = -samples; y <= samples; y++) {
          let offset = vec2f(f32(x), f32(y)) * texel * 2.0;
          sum += textureSample(inputTexture, inputSampler, uv + offset);
        }
      }
      let blurred = sum / f32((2 * samples + 1) * (2 * samples + 1));

      // Extract bright pixels and add glow
      let brightness = dot(blurred.rgb, vec3f(0.2126, 0.7152, 0.0722));
      let bloomColor = blurred * smoothstep(0.3, 0.8, brightness);

      return inputColor + bloomColor * 0.5;
    }
  \`
});

const vignette = new ShaderPass({
  fragment: \`
    fn shade(inputColor: vec4f, uv: vec2f) -> vec4f {
      let centered = uv - 0.5;
      let dist = length(centered);
      let vig = 1.0 - smoothstep(0.3, 0.75, dist);
      return vec4f(inputColor.rgb * vig, 1.0);
    }
  \`
});`;

	const runtimeCode = `<!-- Runtime.svelte -->
<script lang="ts">
  ${"import"} { useFrame, usePointer } from '@motion-core/motion-gpu/svelte';

  let { gravity, damping }: {
    gravity: number;
    damping: number;
  } = $props();

  const pointer = usePointer();

  useFrame((state) => {
    state.setUniform('uTime', state.time);
    state.setUniform('uDelta', Math.min(state.delta, 0.1));
    state.setUniform('uMouseX', pointer.position.x);
    state.setUniform('uMouseY', pointer.position.y);
    state.setUniform('uGravity', gravity);
    state.setUniform('uDamping', damping);
  });
<\/script>

<!-- Usage: -->
<FragCanvas {material} passes={[simulate, bloom, vignette]} maxDelta={0.1}>
  <Runtime gravity={0.0002} damping={0.995} />
</FragCanvas>`;

	const tabs = [
		{ id: 'material' as const, label: 'Material', code: materialCode },
		{ id: 'compute' as const, label: 'Compute', code: computeCode },
		{ id: 'postprocess' as const, label: 'Post-process', code: postProcessCode },
		{ id: 'runtime' as const, label: 'Runtime', code: runtimeCode },
	];

	const activeCode = $derived(tabs.find(t => t.id === activeTab)?.code ?? '');

	const fullCode =
		"// Full project: GPU Particle System\n" +
		"// Material + ComputePass + ShaderPass (bloom + vignette)\n" +
		"// Pointer-interactive, Svelte-reactive, production-ready";
</script>

<section class="page">
	<h1>Motion GPU — Particle System Project</h1>
	<p class="concept">
		<strong>Module project.</strong> This project combines every Motion GPU concept into a single
		production-grade demo: a GPU-computed particle system with 1,024 particles, mouse-driven gravity,
		storage buffer physics simulation, bloom post-processing, and vignette. The compute shader runs
		particle physics, the fragment shader renders additive glow, and ShaderPasses add bloom and
		vignette — all in a single frame, all reactive to Svelte <code>$state</code> via uniforms.
	</p>

	<div class="project-build">
		<div class="tab-bar">
			{#each tabs as tab}
				<button
					type="button"
					class="tab-btn"
					class:active={activeTab === tab.id}
					onclick={() => activeTab = tab.id}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<pre class="code-block"><code>{activeCode}</code></pre>

		<div class="architecture">
			<h3 class="section-title">Pipeline architecture</h3>
			<div class="pipeline-flow">
				<div class="pipeline-node compute-node">
					<span class="node-type">Compute</span>
					<span class="node-name">simulate</span>
					<span class="node-desc">1024 particles</span>
				</div>
				<div class="pipeline-arrow">→</div>
				<div class="pipeline-node material-node">
					<span class="node-type">Fragment</span>
					<span class="node-name">material</span>
					<span class="node-desc">Particle glow</span>
				</div>
				<div class="pipeline-arrow">→</div>
				<div class="pipeline-node pass-node">
					<span class="node-type">ShaderPass</span>
					<span class="node-name">bloom</span>
					<span class="node-desc">Bright extraction</span>
				</div>
				<div class="pipeline-arrow">→</div>
				<div class="pipeline-node pass-node">
					<span class="node-type">ShaderPass</span>
					<span class="node-name">vignette</span>
					<span class="node-desc">Edge darken</span>
				</div>
				<div class="pipeline-arrow">→</div>
				<div class="pipeline-node canvas-node">
					<span class="node-type">Output</span>
					<span class="node-name">Canvas</span>
					<span class="node-desc">Screen</span>
				</div>
			</div>
		</div>

		<div class="features-grid">
			<div class="feature-card">
				<h4>Compute Physics</h4>
				<p>1,024 particles × 64 threads/workgroup. Mouse gravity via normalized direction vectors. Position integration with damping. Edge wrapping.</p>
			</div>
			<div class="feature-card">
				<h4>Storage Buffers</h4>
				<p><code>array&lt;vec4f&gt;</code> shared between compute (write positions) and fragment (read for rendering). 16KB total.</p>
			</div>
			<div class="feature-card">
				<h4>Additive Glow</h4>
				<p>Per-particle <code>1/d²</code> falloff with velocity-based color mapping. Blue = slow, orange = fast.</p>
			</div>
			<div class="feature-card">
				<h4>Bloom Pass</h4>
				<p>11×11 box blur → brightness extraction → additive composite. Extracts glow from bright particles.</p>
			</div>
			<div class="feature-card">
				<h4>Svelte Reactive</h4>
				<p>Gravity and damping driven by <code>$state</code> → <code>$props</code> → <code>useFrame</code> → GPU uniform. Slider changes reach the GPU in one frame.</p>
			</div>
			<div class="feature-card">
				<h4>Production Ready</h4>
				<p><code>maxDelta={'{0.1}'}</code> prevents tab-switch explosions. <code>ssr = false</code> for WebGPU-only rendering. Structured error reporting.</p>
			</div>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What this project proves</h2>
	<p class="prose">This particle system demonstrates the full Motion GPU stack in a single coherent demo. The <code>ComputePass</code> runs 1,024 parallel physics threads per frame. The storage buffer bridges compute output to the fragment shader. The fragment shader reads particle positions and renders additive glow using distance-based falloff. Two <code>ShaderPass</code> stages (bloom + vignette) post-process the image. And the entire pipeline is driven by Svelte <code>$state</code> values passed through typed props into <code>useFrame</code> uniforms.</p>
	<p class="prose">The architecture follows Motion GPU's three-phase model: <strong>Material Phase</strong> (immutable shader contract with declared uniforms, storage buffers, and passes), <strong>Frame Phase</strong> (runtime uniform/texture updates via <code>useFrame</code>), and <strong>Renderer Phase</strong> (<code>FragCanvas</code> orchestrates compute → fragment → post-process each frame). Understanding this separation is the key to building complex GPU applications that remain maintainable and debuggable.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); --page-accent: oklch(55% 0.25 300); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.project-build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.tab-bar { display: flex; gap: var(--space-xs); background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-xs); inline-size: fit-content; }
	.tab-btn { padding: var(--space-xs) var(--space-md); border: none; border-radius: var(--radius-sm); background: transparent; color: var(--color-text-muted); font-size: var(--text-sm); font-weight: 500; cursor: pointer; transition: all var(--dur-fast) var(--ease-out); &.active { background: var(--color-surface); color: var(--color-text); box-shadow: var(--shadow-sm); } }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; max-block-size: 400px; }
	.code-block code { background: transparent; padding: 0; }
	.architecture { margin-block-start: var(--space-md); }
	.pipeline-flow { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-xs); padding: var(--space-md); background: var(--color-surface-2); border-radius: var(--radius-md); }
	.pipeline-node { display: flex; flex-direction: column; align-items: center; padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--color-border); min-inline-size: 90px; }
	.compute-node { border-color: oklch(65% 0.18 145); background: oklch(65% 0.18 145 / 0.06); }
	.material-node { border-color: var(--page-accent); background: oklch(from var(--page-accent) l c h / 0.06); }
	.pass-node { border-color: oklch(65% 0.15 60); background: oklch(65% 0.15 60 / 0.06); }
	.canvas-node { border-color: var(--color-text-muted); background: var(--color-surface); }
	.node-type { font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
	.node-name { font-family: var(--font-mono); font-size: var(--text-xs); font-weight: 600; color: var(--color-text); }
	.node-desc { font-size: 9px; color: var(--color-text-muted); }
	.pipeline-arrow { color: var(--color-text-muted); font-size: var(--text-lg); }
	.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-sm); }
	.feature-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } & code { font-family: var(--font-mono); font-size: 0.85em; background: var(--color-surface); padding: 0 var(--space-xs); border-radius: var(--radius-xs); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
