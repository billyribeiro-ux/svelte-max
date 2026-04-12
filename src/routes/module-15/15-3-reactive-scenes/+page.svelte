<script lang="ts">
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { Canvas, T } from '@threlte/core';
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { OrbitControls } from '@threlte/extras';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let mounted = $state(false);

	let hue = $state(270);
	let scale = $state(1);
	let rotationDeg = $state(0);

	let meshColor = $derived(hueToHex(hue));
	let rotationRad = $derived((rotationDeg * Math.PI) / 180);

	function hueToHex(h: number): string {
		const s = 0.7;
		const l = 0.55;
		const c = (1 - Math.abs(2 * l - 1)) * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = l - c / 2;
		let r = 0, g = 0, b = 0;

		if (h < 60) { r = c; g = x; }
		else if (h < 120) { r = x; g = c; }
		else if (h < 180) { g = c; b = x; }
		else if (h < 240) { g = x; b = c; }
		else if (h < 300) { r = x; b = c; }
		else { r = c; b = x; }

		const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	$effect(() => {
		mounted = true;
	});

	const derivedPatternExample = `\u003cscript lang="ts"\u003e
  let hue = $state(270);
  let meshColor = $derived(hueToHex(hue));

  let rotationDeg = $state(0);
  let rotationRad = $derived((rotationDeg * Math.PI) / 180);
\u003c/script\u003e

<T.Mesh rotation.y={rotationRad}>
  <T.MeshStandardMaterial color={meshColor} />
</T.Mesh>`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"// @ts-ignore — Threlte types not fully compatible with strict mode\n" +
		"	import { Canvas, T } from '@threlte/core';\n" +
		"	// @ts-ignore — Threlte types not fully compatible with strict mode\n" +
		"	import { OrbitControls } from '@threlte/extras';\n" +
		"\n" +
		"	let mounted = $state(false);\n" +
		"\n" +
		"	let hue = $state(270);\n" +
		"	let scale = $state(1);\n" +
		"	let rotationDeg = $state(0);\n" +
		"\n" +
		"	let meshColor = $derived(hueToHex(hue));\n" +
		"	let rotationRad = $derived((rotationDeg * Math.PI) / 180);\n" +
		"\n" +
		"	function hueToHex(h: number): string {\n" +
		"		const s = 0.7;\n" +
		"		const l = 0.55;\n" +
		"		const c = (1 - Math.abs(2 * l - 1)) * s;\n" +
		"		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));\n" +
		"		const m = l - c / 2;\n" +
		"		let r = 0, g = 0, b = 0;\n" +
		"\n" +
		"		if (h \u003c 60) { r = c; g = x; }\n" +
		"		else if (h \u003c 120) { r = x; g = c; }\n" +
		"		else if (h \u003c 180) { g = c; b = x; }\n" +
		"		else if (h \u003c 240) { g = x; b = c; }\n" +
		"		else if (h \u003c 300) { r = x; b = c; }\n" +
		"		else { r = c; b = x; }\n" +
		"\n" +
		"		const toHex = (v: number) =\u003e Math.round((v + m) * 255).toString(16).padStart(2, '0');\n" +
		"		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;\n" +
		"	}\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		mounted = true;\n" +
		"	});\n" +
		"\n" +
		"	const derivedPatternExample = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  let hue = $state(270);\n" +
		"  let meshColor = $derived(hueToHex(hue));\n" +
		"\n" +
		"  let rotationDeg = $state(0);\n" +
		"  let rotationRad = $derived((rotationDeg * Math.PI) / 180);\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cT.Mesh rotation.y={rotationRad}\u003e\n" +
		"  \u003cT.MeshStandardMaterial color={meshColor} /\u003e\n" +
		"\u003c/T.Mesh\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e15.3 — Reactive 3D Scenes\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Threlte's power comes from \u003cstrong\u003eSvelte's reactivity\u003c/strong\u003e driving 3D object properties.\n" +
		"		Use \u003ccode\u003e$state\u003c/code\u003e for values that change and \u003ccode\u003e$derived\u003c/code\u003e for computed\n" +
		"		properties. When state updates, Threlte automatically updates the corresponding Three.js\n" +
		"		objects — no manual re-rendering needed.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eReactivity Flow\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$state\u003c/code\u003e variables bind to UI controls (sliders, inputs)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$derived\u003c/code\u003e computes values from state (e.g. degrees to radians, hue to hex)\u003c/li\u003e\n" +
		"		\u003cli\u003eThrelte props receive reactive values and update the Three.js scene graph\u003c/li\u003e\n" +
		"		\u003cli\u003eThe render loop automatically picks up changes — no explicit invalidation\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: 3D Product Configurator\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003clabel class=\"slider-label\"\u003e\n" +
		"				Color Hue: {hue}\n" +
		"				\u003cinput type=\"range\" min=\"0\" max=\"360\" step=\"1\" bind:value={hue} /\u003e\n" +
		"				\u003cdiv class=\"color-preview\" style=\"background: {meshColor}\"\u003e\u003c/div\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003clabel class=\"slider-label\"\u003e\n" +
		"				Scale: {scale.toFixed(1)}x\n" +
		"				\u003cinput type=\"range\" min=\"0.3\" max=\"3\" step=\"0.1\" bind:value={scale} /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003clabel class=\"slider-label\"\u003e\n" +
		"				Rotation: {rotationDeg}deg\n" +
		"				\u003cinput type=\"range\" min=\"0\" max=\"360\" step=\"1\" bind:value={rotationDeg} /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"canvas-container\"\u003e\n" +
		"			{#if mounted}\n" +
		"				\u003cCanvas\u003e\n" +
		"					\u003cT.PerspectiveCamera\n" +
		"						makeDefault\n" +
		"						position={[3, 2, 5]}\n" +
		"						fov={50}\n" +
		"					\u003e\n" +
		"						\u003cOrbitControls enableDamping /\u003e\n" +
		"					\u003c/T.PerspectiveCamera\u003e\n" +
		"\n" +
		"					\u003cT.DirectionalLight position={[5, 5, 5]} intensity={1.5} /\u003e\n" +
		"					\u003cT.AmbientLight intensity={0.4} /\u003e\n" +
		"\n" +
		"					\u003cT.Mesh\n" +
		"						rotation.y={rotationRad}\n" +
		"						scale={[scale, scale, scale]}\n" +
		"					\u003e\n" +
		"						\u003cT.BoxGeometry args={[1.2, 1.2, 1.2]} /\u003e\n" +
		"						\u003cT.MeshStandardMaterial\n" +
		"							color={meshColor}\n" +
		"							metalness={0.3}\n" +
		"							roughness={0.4}\n" +
		"						/\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>15.3 — Reactive 3D Scenes</h1>

	<p class="concept">
		Threlte's power comes from <strong>Svelte's reactivity</strong> driving 3D object properties.
		Use <code>$state</code> for values that change and <code>$derived</code> for computed
		properties. When state updates, Threlte automatically updates the corresponding Three.js
		objects — no manual re-rendering needed.
	</p>

	<h3>Reactivity Flow</h3>
	<ul>
		<li><code>$state</code> variables bind to UI controls (sliders, inputs)</li>
		<li><code>$derived</code> computes values from state (e.g. degrees to radians, hue to hex)</li>
		<li>Threlte props receive reactive values and update the Three.js scene graph</li>
		<li>The render loop automatically picks up changes — no explicit invalidation</li>
	</ul>

	<h3>Mini-Build: 3D Product Configurator</h3>
	<div class="build">
		<div class="controls">
			<label class="slider-label">
				Color Hue: {hue}
				<input type="range" min="0" max="360" step="1" bind:value={hue} />
				<div class="color-preview" style="background: {meshColor}"></div>
			</label>
			<label class="slider-label">
				Scale: {scale.toFixed(1)}x
				<input type="range" min="0.3" max="3" step="0.1" bind:value={scale} />
			</label>
			<label class="slider-label">
				Rotation: {rotationDeg}deg
				<input type="range" min="0" max="360" step="1" bind:value={rotationDeg} />
			</label>
		</div>

		<div class="canvas-container">
			{#if mounted}
				<Canvas>
					<T.PerspectiveCamera
						makeDefault
						position={[3, 2, 5]}
						fov={50}
					>
						<OrbitControls enableDamping />
					</T.PerspectiveCamera>

					<T.DirectionalLight position={[5, 5, 5]} intensity={1.5} />
					<T.AmbientLight intensity={0.4} />

					<T.Mesh
						rotation.y={rotationRad}
						scale={[scale, scale, scale]}
					>
						<T.BoxGeometry args={[1.2, 1.2, 1.2]} />
						<T.MeshStandardMaterial
							color={meshColor}
							metalness={0.3}
							roughness={0.4}
						/>
					</T.Mesh>

					<!-- Ground -->
					<T.Mesh rotation.x={-Math.PI / 2} position.y={-1}>
						<T.PlaneGeometry args={[8, 8]} />
						<T.MeshStandardMaterial color="#1a1a2e" />
					</T.Mesh>
				</Canvas>
			{:else}
				<div class="fallback">Loading 3D configurator...</div>
			{/if}
		</div>

		<p class="concept">
			Three reactive inputs drive the 3D mesh. <strong>Hue</strong> is converted from a number
			(0-360) to a hex color via <code>$derived</code>. <strong>Rotation</strong> converts
			degrees to radians. <strong>Scale</strong> passes directly as a uniform scale vector.
			All updates are instant — Threlte syncs props on every frame.
		</p>
	</div>

	<h3>Pattern: Derived 3D Properties</h3>
	<pre><code>{derivedPatternExample}</code></pre>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how reactivity flows between Svelte and Three.js. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Pass <code>rotationDeg</code> directly to <code>rotation.y</code> without converting to radians.</strong> The mesh rotates 57 times faster than expected because Three.js interprets the value as radians, not degrees. At 360 degrees, the mesh has made roughly 57 full rotations (360 / 2pi). This demonstrates why <code>$derived</code> is essential for unit conversion between human-friendly UI values and Three.js's radian-based system.</li>
		<li><strong>Pass the raw <code>hue</code> number directly to the material's <code>color</code> prop instead of the hex string.</strong> Three.js interprets a number as a hex integer, so <code>270</code> becomes a near-black color (<code>#00010e</code>). The mesh turns dark regardless of the slider position. Three.js materials need hex strings, not HSL hue numbers, proving the necessity of the <code>hueToHex</code> conversion in the <code>$derived</code> chain.</li>
		<li><strong>Replace <code>scale={[scale, scale, scale]}</code> with <code>scale={scale}</code> (a single number).</strong> Threlte actually supports this shorthand, applying uniform scale across all three axes. But if you pass <code>scale={[scale, 1, 1]}</code>, the mesh stretches only along the X axis, creating a non-uniform deformation. This shows how the scale vector gives you independent control over each dimension.</li>
		<li><strong>Set the <code>metalness</code> slider to 1.0 and <code>roughness</code> to 0.0 simultaneously.</strong> The mesh becomes a perfect mirror, reflecting the environment (or appearing very dark if no environment map is present). Physically-based materials at full metalness and zero roughness reflect only their surroundings. Without an <code>{'<Environment>'}</code> component, there is nothing to reflect, so the mesh looks nearly black.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Threlte's core power comes from Svelte's reactivity system driving Three.js object properties. You bind <code>$state</code> variables to UI controls (sliders, inputs, buttons) and use <code>$derived</code> to compute the values Three.js needs. When state updates, Threlte automatically syncs the new prop values to the Three.js scene graph and triggers a re-render. No manual invalidation, no explicit render calls, no animation loop management.</p>
	<p class="prose">The <code>$derived</code> rune is essential for bridging the gap between human-friendly UI values and Three.js's internal formats. Rotation in degrees must be converted to radians. Hue as a 0-360 number must be converted to a hex color string. Scale as a single number must be spread into a three-element vector. Each of these transformations is a pure function in a <code>$derived</code> expression, which means Svelte recomputes them only when their dependencies change.</p>
	<p class="prose">The product configurator pattern demonstrated in this lesson is directly applicable to real-world use cases: color pickers for customisable products, rotation controls for 3D model viewers, and scale adjustments for architectural visualisations. The combination of reactive sliders, derived transformations, and Threlte's automatic scene updates creates a smooth, 60fps interactive experience with minimal code.</p>
	<p class="next">Next, you will learn how <code>@threlte/extras</code> provides high-level components like 3D text, environment lighting, and pointer interactivity.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.canvas-container {
		inline-size: 100%;
		block-size: 350px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: oklch(15% 0.03 270);
	}

	.fallback {
		inline-size: 100%;
		block-size: 100%;
		display: grid;
		place-items: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.slider-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	input[type="range"] {
		inline-size: 100%;
		accent-color: var(--color-primary);
	}

	.color-preview {
		inline-size: 2rem;
		block-size: 1rem;
		border-radius: var(--radius-xs);
		border: 1px solid var(--color-border);
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { block-size: 450px; }
		.controls { flex-direction: row; }
		.slider-label { flex: 1; }
	}


	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
