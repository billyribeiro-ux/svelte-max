<script lang="ts">
	 CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const renderModes = `// FragCanvas render modes
<FragCanvas {material} renderMode="always" />    // Default: renders every frame
<FragCanvas {material} renderMode="on-demand" />  // Only renders when invalidated
<FragCanvas {material} renderMode="manual" />     // You control when to render

// on-demand: call state.invalidate() when you need a re-render
useFrame((state) => {
  // Only update time if something changed
  if (needsUpdate) {
    state.setUniform('uTime', state.time);
    state.invalidate();  // Request a render
  }
});

// manual: call state.advance() to step one frame
useFrame((state) => {
  // Advance on user interaction only
  if (userClicked) {
    state.advance();
  }
});`;

	const schedulerPresets = `${"import"} {
  applySchedulerPreset,
  captureSchedulerDebugSnapshot
} from '@motion-core/motion-gpu/svelte/advanced';

// Performance presets:
// 'cinematic' — 30fps cap, saves battery
// 'realtime' — 60fps, default behavior
// 'unlimited' — no frame cap, max throughput (profiling only)

// Apply a preset
applySchedulerPreset('cinematic');

// Capture diagnostics
const snapshot = captureSchedulerDebugSnapshot();
console.log('Frame time:', snapshot.averageFrameTime);
console.log('GPU time:', snapshot.averageGPUTime);
console.log('Tasks:', snapshot.taskCount);`;

	const maxDeltaCode = `// maxDelta prevents time jumps when tab is backgrounded
<FragCanvas {material} maxDelta={0.1}>
  <!-- If the user switches tabs for 5 seconds,
       state.delta will be clamped to 0.1 instead of 5.0.
       This prevents physics explosions and animation jumps. -->
  <Runtime />
</FragCanvas>

// In useFrame:
useFrame((state) => {
  // state.delta is guaranteed <= maxDelta
  // Safe for physics: position += velocity * delta
  state.setUniform('uTime', state.time);
  state.setUniform('uDelta', state.delta);
});`;

	const optimizationPatterns = `// 1. Reduce resolution with devicePixelRatio override
<FragCanvas {material} dpr={1} />  // 1x instead of 2x on Retina
// Halves pixel count = 4x faster rendering

// 2. Use renderMode="on-demand" for static/interactive shaders
// Don't render 60fps if nothing is changing

// 3. Minimize uniform updates
useFrame((state) => {
  // BAD: updating 20 uniforms every frame
  state.setUniform('a', val_a);
  state.setUniform('b', val_b);
  // ... 18 more

  // GOOD: pack related data into vec4f uniforms
  // Declare: uniforms: { uParams: [0, 0, 0, 0] }
  // In WGSL: motiongpuUniforms.uParams.xyzw
});

// 4. Avoid branching in hot shader loops
// BAD:
//   if (dist < 0.5) { color = a; } else { color = b; }
// GOOD:
//   color = mix(b, a, step(dist, 0.5));

// 5. Precompute on CPU, pass as uniform
// BAD: computing sin(PI * 2 / sliceCount) in every pixel
// GOOD: compute once in JS, pass as uniform

// 6. Use half-resolution render targets for blur passes
// Full-res scene → half-res blur → full-res composite`;

	const errorHandling = `// Motion GPU error normalization
// All errors are structured as MotionGPUErrorReport

${"import"} { toMotionGPUErrorReport } from '@motion-core/motion-gpu/svelte';

try {
  const material = defineMaterial({ fragment: 'invalid wgsl' });
} catch (e) {
  const report = toMotionGPUErrorReport(e);
  console.error(report.type);     // 'compilation' | 'validation' | 'runtime'
  console.error(report.message);  // Human-readable error
  console.error(report.source);   // Which pass/material failed
}

// Built-in error overlay (development)
<FragCanvas {material} showErrors={true}>
  <!-- Renders a debug overlay when GPU errors occur -->
  <Runtime />
</FragCanvas>`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Performance & render mode demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>MG.8 — Performance & Render Modes</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>MG.8 — Performance & Render Modes</h1>
	<p class="concept">
		<strong>Concept.</strong> Not every shader needs to render at 60fps. Motion GPU provides three
		render modes: <code>always</code> (continuous), <code>on-demand</code> (invalidation-based), and
		<code>manual</code> (explicit stepping). Combined with scheduler presets, <code>maxDelta</code>
		clamping, resolution scaling, and structured error reporting, these controls turn a GPU experiment
		into production-ready code. The goal is maximum visual quality at minimum GPU cost.
	</p>

	<div class="build">
		<h3 class="section-title">Render modes</h3>
		<pre class="code-block"><code>{renderModes}</code></pre>

		<div class="mode-grid">
			<div class="mode-card">
				<h4>always</h4>
				<p>Renders every frame (60fps). Use for: continuous animations, real-time simulations, generative art. Default mode.</p>
			</div>
			<div class="mode-card">
				<h4>on-demand</h4>
				<p>Renders only when <code>state.invalidate()</code> is called. Use for: interactive tools, config editors, slider-driven effects. Saves battery.</p>
			</div>
			<div class="mode-card">
				<h4>manual</h4>
				<p>Renders only when <code>state.advance()</code> is called. Use for: step-by-step simulations, screenshot tools, frame-exact recording.</p>
			</div>
		</div>

		<h3 class="section-title">Scheduler presets & diagnostics</h3>
		<pre class="code-block"><code>{schedulerPresets}</code></pre>

		<h3 class="section-title">maxDelta: preventing time bombs</h3>
		<pre class="code-block"><code>{maxDeltaCode}</code></pre>

		<h3 class="section-title">Optimization patterns</h3>
		<pre class="code-block"><code>{optimizationPatterns}</code></pre>

		<h3 class="section-title">Error handling</h3>
		<pre class="code-block"><code>{errorHandling}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Performance issues manifest as dropped frames, battery drain, and visual glitches.</p>
	<ol class="experiments">
		<li><strong>Use <code>renderMode="always"</code> for a shader that only changes on slider input.</strong> The GPU renders 60 frames per second of identical output — wasting power and heat. Switch to <code>on-demand</code> and call <code>invalidate()</code> in your slider handler. Measure the difference with <code>captureSchedulerDebugSnapshot()</code>.</li>
		<li><strong>Remove <code>maxDelta</code> and background the tab for 10 seconds.</strong> On return, <code>state.delta</code> jumps to ~10.0. Physics simulations explode (velocity × 10 = teleportation). <code>maxDelta={'{0.1}'}</code> clamps to a safe frame time.</li>
		<li><strong>Run a complex shader at native Retina resolution (<code>dpr={'{2}'}</code>) on a 4K display.</strong> That is 8.3M pixels × 2 = 16.6M pixels per frame. Set <code>dpr={'{1}'}</code> for development and complex shaders — you can always increase for final output.</li>
		<li><strong>Nest 5 levels of for-loops in a fragment shader.</strong> GPU thread occupancy drops as register pressure increases. Profile with <code>captureSchedulerDebugSnapshot()</code> — if GPU time exceeds 16ms, you are dropping frames. Optimize the algorithm or reduce resolution.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Render modes are the production toggle. Development starts with <code>always</code> for instant visual feedback. Production uses <code>on-demand</code> for interactive UIs (only re-render when the user changes something) or <code>manual</code> for step-controlled simulations. This single prop change can reduce GPU usage from 100% to near-zero for idle states.</p>
	<p class="prose"><code>maxDelta</code> prevents the classic "tab background" bug. When a browser tab loses focus, <code>requestAnimationFrame</code> pauses. On resume, the accumulated time delta can be seconds or minutes. Physics and animation code that multiplies velocity by delta will produce absurd results. Clamping delta to a maximum (typically 0.1s = 10fps minimum) keeps simulations stable.</p>
	<p class="prose">The advanced scheduler API (<code>applySchedulerPreset</code>, <code>captureSchedulerDebugSnapshot</code>) gives production-grade control. <code>'cinematic'</code> preset caps at 30fps for battery-sensitive deployments. Debug snapshots report average frame time, GPU time, and task counts — the same metrics you would measure with Chrome's GPU profiler, but accessible programmatically from Svelte.</p>
	<p class="next">Next: <a href="/motion-gpu/project">Motion GPU — Module Project</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-sm); }
	.mode-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); font-family: var(--font-mono); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } & code { font-family: var(--font-mono); font-size: 0.85em; background: var(--color-surface); padding: 0 var(--space-xs); border-radius: var(--radius-xs); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
