<script lang="ts">
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { Canvas, T } from '@threlte/core';
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { OrbitControls } from '@threlte/extras';

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
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.canvas-container {
		width: 100%;
		height: 350px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: #1a1a2e;
	}

	.fallback {
		width: 100%;
		height: 100%;
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
		width: 100%;
		accent-color: var(--color-primary);
	}

	.color-preview {
		width: 2rem;
		height: 1rem;
		border-radius: var(--radius-xs);
		border: 1px solid var(--color-border);
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { height: 450px; }
		.controls { flex-direction: row; }
		.slider-label { flex: 1; }
	}
</style>
