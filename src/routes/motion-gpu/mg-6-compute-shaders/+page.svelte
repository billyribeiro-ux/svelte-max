<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const computePassBasic = `${"import"} { FragCanvas, defineMaterial, ComputePass } from '@motion-core/motion-gpu/svelte';

const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      // Read particle data from storage buffer
      let idx = u32(uv.x * 255.0);
      let particle = particles[idx];
      return vec4f(particle.rgb, 1.0);
    }
  \`,
  storageBuffers: {
    particles: {
      size: 4096,              // bytes (must be > 0, multiple of 4)
      type: 'array<vec4f>',    // WGSL type
      access: 'read-write'     // fragment reads, compute writes
    }
  }
});

// ComputePass: runs a compute shader before the fragment shader
const simulate = new ComputePass({
  compute: \`
    @compute @workgroup_size(64)
    fn compute(@builtin(global_invocation_id) id: vec3u) {
      let i = id.x;
      let t = motiongpuFrame.time;

      // Animate each particle position using trig
      let x = sin(t + f32(i) * 0.1) * 0.5 + 0.5;
      let y = cos(t * 0.7 + f32(i) * 0.15) * 0.5 + 0.5;

      particles[i] = vec4f(x, y, 0.5, 1.0);
    }
  \`,
  dispatch: [16]  // 16 workgroups × 64 threads = 1024 particles
});`;

	const computeExplained = `// Compute shader anatomy:
//
// @compute              — this is a compute shader (not fragment)
// @workgroup_size(64)   — each workgroup processes 64 items
// fn compute(...)       — required entry point name
// @builtin(global_invocation_id) — unique thread ID (x, y, z)
//
// dispatch: [16] means:
//   16 workgroups × 64 threads/workgroup = 1024 total invocations
//   Each invocation processes one particle (indexed by id.x)
//
// dispatch: [16, 16] would be:
//   16 × 16 = 256 workgroups × 64 = 16,384 invocations
//   Use id.x and id.y for 2D grids

// Storage buffer rules:
// - size must be > 0 and a multiple of 4
// - type must be a WGSL type (array<vec4f>, array<f32>, struct)
// - access: 'read-write' for compute + fragment shared data
// - Declared in defineMaterial({ storageBuffers })`;

	const pingPongCompute = `${"import"} { PingPongComputePass } from '@motion-core/motion-gpu/svelte';

// PingPongComputePass: iterative simulation
// Alternates between two textures (A/B) each iteration
// Use case: Game of Life, fluid simulation, diffusion

const material = defineMaterial({
  fragment: \`
    fn frag(uv: vec2f) -> vec4f {
      return textureSample(simTexture, simSampler, uv);
    }
  \`,
  textures: {
    simTexture: {
      width: 256,
      height: 256,
      storage: true  // required for PingPongComputePass target
    }
  },
  uniforms: { uTime: 0 }
});

const gameOfLife = new PingPongComputePass({
  compute: \`
    @compute @workgroup_size(8, 8)
    fn compute(@builtin(global_invocation_id) id: vec3u) {
      let pos = vec2i(id.xy);
      let size = vec2i(textureDimensions(inputTex));

      // Count live neighbors
      var neighbors = 0u;
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          if (dx == 0 && dy == 0) { continue; }
          let npos = (pos + vec2i(dx, dy) + size) % size;
          let val = textureLoad(inputTex, npos, 0).r;
          if (val > 0.5) { neighbors++; }
        }
      }

      let current = textureLoad(inputTex, pos, 0).r;
      var alive = 0.0;
      if (current > 0.5) {
        alive = select(0.0, 1.0, neighbors == 2u || neighbors == 3u);
      } else {
        alive = select(0.0, 1.0, neighbors == 3u);
      }

      textureStore(outputTex, pos, vec4f(alive, alive, alive, 1.0));
    }
  \`,
  target: 'simTexture',
  iterations: 1,  // steps per frame (>= 1)
  dispatch: [32, 32]
});`;

	const readBackCode = `// Reading data back from GPU → JavaScript
useFrame(async (state) => {
  state.setUniform('uTime', state.time);

  // Read storage buffer contents back to CPU
  const buffer = await state.readStorageBuffer('particles');

  // buffer is an ArrayBuffer — interpret as Float32Array
  const data = new Float32Array(buffer);

  // Now you can use GPU-computed results in Svelte
  // e.g., update $state with particle positions
  console.log('First particle:', data[0], data[1], data[2], data[3]);
});`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Compute shader demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.6 — Compute Shaders</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.6 — Compute Shaders</h1>
	<p class="concept">
		<strong>Concept.</strong> Compute shaders are general-purpose GPU programs — no pixels, no
		rendering, just massively parallel computation. They read and write <strong>storage buffers</strong>
		(GPU memory) and run before the fragment shader each frame. Motion GPU provides
		<code>ComputePass</code> for single-dispatch workloads and <code>PingPongComputePass</code> for
		iterative simulations (Game of Life, fluid dynamics) that alternate between two texture states.
		This is the feature that separates WebGPU from WebGL.
	</p>

	<div class="build">
		<h3 class="section-title">ComputePass: particle simulation</h3>
		<pre class="code-block"><code>{computePassBasic}</code></pre>

		<h3 class="section-title">Compute shader anatomy</h3>
		<pre class="code-block"><code>{computeExplained}</code></pre>

		<div class="dispatch-diagram">
			<h4>Dispatch model</h4>
			<div class="dispatch-visual">
				<div class="dispatch-group">
					<span class="dg-label">dispatch: [16]</span>
					<div class="dg-blocks">
						{#each Array(8) as _, i}
							<div class="dg-block">WG {i}</div>
						{/each}
						<div class="dg-block dg-more">…+8</div>
					</div>
					<span class="dg-note">16 workgroups × 64 threads = 1,024 invocations</span>
				</div>
			</div>
		</div>

		<h3 class="section-title">PingPongComputePass: Game of Life</h3>
		<pre class="code-block"><code>{pingPongCompute}</code></pre>
		<p class="chart-note">Ping-pong alternates between two textures: compute reads from A, writes to B, then swaps. This prevents read-write hazards in iterative simulations.</p>

		<h3 class="section-title">GPU → CPU readback</h3>
		<pre class="code-block"><code>{readBackCode}</code></pre>
		<p class="chart-note"><code>readStorageBuffer()</code> is async — GPU readback requires a fence and copy. Use it sparingly (not every frame) and only when you need GPU results in JavaScript.</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Compute shaders have strict structural requirements.</p>
	<ol class="experiments">
		<li><strong>Omit <code>@compute @workgroup_size(64)</code> from the shader.</strong> Validation rejects the compute pass — both decorators are required. <code>@compute</code> declares the shader stage, <code>@workgroup_size</code> specifies thread count per workgroup.</li>
		<li><strong>Use <code>fn main()</code> instead of <code>fn compute()</code>.</strong> Motion GPU requires the entry point to be named <code>compute</code>. This is a hard contract — the runtime looks for this specific function name.</li>
		<li><strong>Omit <code>@builtin(global_invocation_id)</code> from the parameter.</strong> Without a thread ID, every invocation would process the same data. The <code>global_invocation_id</code> is what parallelizes the work — each thread gets a unique <code>id.x</code> to index into buffers.</li>
		<li><strong>Set <code>PingPongComputePass iterations: 0</code>.</strong> Validation error — iterations must be &gt;= 1. Zero iterations means the compute pass does nothing, which is a logical error.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Compute shaders are the bridge between data science and visual rendering. They execute arbitrary parallel programs on the GPU — processing thousands of particles, simulating cellular automata, or running physics simulations in a single frame. The dispatch model (workgroups × workgroup size) maps directly to GPU hardware: each workgroup runs on a single compute unit, and threads within share local memory for fast inter-thread communication.</p>
	<p class="prose">Storage buffers are the shared memory between compute and fragment shaders. The compute pass writes particle positions, simulation state, or processed data into the buffer; the fragment shader reads it to produce visual output. This two-stage pipeline (compute → fragment) is the architecture behind particle systems, fluid simulations, and GPU-accelerated data visualization.</p>
	<p class="prose"><code>PingPongComputePass</code> solves the classic read-write hazard in iterative simulations. If you read and write the same texture, some threads see updated values while others see stale ones — creating artifacts. Ping-pong uses two textures: all threads read from A and write to B, then swap. This guarantees every thread reads the same consistent state from the previous iteration.</p>
	<p class="next">Next lesson: <a href="/motion-gpu/mg-7-textures">MG.7 — Textures & Image Processing</a></p>
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
	.dispatch-diagram { padding: var(--space-md); background: var(--color-surface-2); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-sm); } }
	.dispatch-visual { display: flex; flex-direction: column; gap: var(--space-xs); }
	.dispatch-group { display: flex; flex-direction: column; gap: var(--space-xs); }
	.dg-label { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-brand); }
	.dg-blocks { display: flex; flex-wrap: wrap; gap: 4px; }
	.dg-block { padding: var(--space-xs); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); &.dg-more { color: var(--color-text-muted); opacity: 0.6; } }
	.dg-note { font-size: 10px; color: var(--color-text-muted); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
