<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let rectX = $state(20);
	let circleR = $state(30);
	let pathRotation = $state(0);

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  let rectX = $state(20);\n" +
		"  let circleR = $state(30);\n" +
		"  let pathRotation = $state(0);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.1 — SVG Anatomy for Animation\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e SVG is XML-based vector graphics. The\n" +
		"    \u003ccode\u003eviewBox\u003c/code\u003e attribute defines the coordinate system\n" +
		"    (origin + dimensions). Key elements: rect, circle, ellipse, line,\n" +
		"    polyline, polygon, path, g (group), defs (definitions), use (reuse).\n" +
		"    Path commands: M (move), L (line), C (cubic bezier), A (arc), Z (close).\n" +
		"    \u003ccode\u003etransform\u003c/code\u003e for translate/rotate/scale.\n" +
		"    \u003ccode\u003etransform-origin\u003c/code\u003e for rotation center.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"controls\"\u003e\n" +
		"      \u003clabel\u003e\n" +
		"        \u003cspan\u003eRect X: {rectX}\u003c/span\u003e\n" +
		"        \u003cinput type=\"range\" min=\"0\" max=\"150\" step=\"1\" bind:value={rectX} /\u003e\n" +
		"      \u003c/label\u003e\n" +
		"      \u003clabel\u003e\n" +
		"        \u003cspan\u003eCircle radius: {circleR}\u003c/span\u003e\n" +
		"        \u003cinput type=\"range\" min=\"5\" max=\"60\" step=\"1\" bind:value={circleR} /\u003e\n" +
		"      \u003c/label\u003e\n" +
		"      \u003clabel\u003e\n" +
		"        \u003cspan\u003eStar rotation: {pathRotation}deg\u003c/span\u003e\n" +
		"        \u003cinput type=\"range\" min=\"0\" max=\"360\" step=\"1\" bind:value={pathRotation} /\u003e\n" +
		"      \u003c/label\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003csvg viewBox=\"0 0 200 200\" class=\"playground\" role=\"img\"\n" +
		"      aria-label=\"Interactive SVG playground with rect, circle, and star\"\u003e\n" +
		"      \u003c!-- Coordinate axes --\u003e\n" +
		"      \u003cline x1=\"0\" y1=\"0\" x2=\"200\" y2=\"0\" class=\"axis\" /\u003e\n" +
		"      \u003cline x1=\"0\" y1=\"0\" x2=\"0\" y2=\"200\" class=\"axis\" /\u003e\n" +
		"      \u003ctext x=\"195\" y=\"12\" class=\"axis-label\"\u003ex\u003c/text\u003e\n" +
		"      \u003ctext x=\"6\" y=\"198\" class=\"axis-label\"\u003ey\u003c/text\u003e\n" +
		"      {#each [0, 50, 100, 150, 200] as tick}\n" +
		"        \u003cline x1={tick} y1=\"0\" x2={tick} y2=\"4\" class=\"tick-mark\" /\u003e\n" +
		"        \u003cline x1=\"0\" y1={tick} x2=\"4\" y2={tick} class=\"tick-mark\" /\u003e\n" +
		"      {/each}\n" +
		"\n" +
		"      \u003c!-- Rect --\u003e\n" +
		"      \u003crect x={rectX} y=\"20\" width=\"40\" height=\"30\" rx=\"4\"\n" +
		"        fill=\"oklch(65% 0.22 270 / 0.7)\" stroke=\"oklch(65% 0.22 270)\" stroke-width=\"1.5\" /\u003e\n" +
		"      \u003ctext x={rectX + 20} y=\"62\" class=\"el-label\"\u003e&lt;rect&gt;\u003c/text\u003e\n" +
		"\n" +
		"      \u003c!-- Circle --\u003e\n" +
		"      \u003ccircle cx=\"140\" cy=\"100\" r={circleR}\n" +
		"        fill=\"oklch(65% 0.18 150 / 0.7)\" stroke=\"oklch(65% 0.18 150)\" stroke-width=\"1.5\" /\u003e\n" +
		"      \u003ctext x=\"140\" y={100 + circleR + 14} class=\"el-label\"\u003e&lt;circle&gt;\u003c/text\u003e\n" +
		"\n" +
		"      \u003c!-- Star (path) --\u003e\n" +
		"      \u003cg transform=\"rotate({pathRotation}, 70, 150)\"\u003e\n" +
		"        \u003cpath\n" +
		"          d=\"M70 125 L78 143 L97 143 L82 154 L88 172 L70 162 L52 172 L58 154 L43 143 L62 143 Z\"\n" +
		"          fill=\"oklch(70% 0.20 60 / 0.7)\" stroke=\"oklch(70% 0.20 60)\" stroke-width=\"1.5\"\n" +
		"        /\u003e\n" +
		"      \u003c/g\u003e\n" +
		"      \u003ctext x=\"70\" y=\"186\" class=\"el-label\"\u003e&lt;path&gt;\u003c/text\u003e\n" +
		"    \u003c/svg\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.1 — SVG Anatomy for Animation</h1>
	<p class="concept">
		<strong>Concept.</strong> SVG is XML-based vector graphics. The
		<code>viewBox</code> attribute defines the coordinate system (origin + dimensions). Key
		elements: <code>&lt;rect&gt;</code>, <code>&lt;circle&gt;</code>,
		<code>&lt;ellipse&gt;</code>, <code>&lt;line&gt;</code>, <code>&lt;polyline&gt;</code>,
		<code>&lt;polygon&gt;</code>, <code>&lt;path&gt;</code>, <code>&lt;g&gt;</code> (group),
		<code>&lt;defs&gt;</code> (definitions), <code>&lt;use&gt;</code> (reuse). Path commands:
		<code>M</code> (move), <code>L</code> (line), <code>C</code> (cubic bezier),
		<code>A</code> (arc), <code>Z</code> (close). <code>transform</code> for
		translate/rotate/scale. <code>transform-origin</code> for rotation center.
	</p>

	<div class="build">
		<div class="controls">
			<label>
				<span>Rect X: {rectX}</span>
				<input type="range" min="0" max="150" step="1" bind:value={rectX} />
			</label>
			<label>
				<span>Circle radius: {circleR}</span>
				<input type="range" min="5" max="60" step="1" bind:value={circleR} />
			</label>
			<label>
				<span>Star rotation: {pathRotation}&deg;</span>
				<input type="range" min="0" max="360" step="1" bind:value={pathRotation} />
			</label>
		</div>

		<svg viewBox="0 0 200 200" class="playground" role="img" aria-label="Interactive SVG playground with rect, circle, and star">
			<!-- Coordinate system axes -->
			<line x1="0" y1="0" x2="200" y2="0" class="axis" />
			<line x1="0" y1="0" x2="0" y2="200" class="axis" />
			<text x="195" y="12" class="axis-label">x</text>
			<text x="6" y="198" class="axis-label">y</text>
			<!-- Tick marks every 50 units -->
			{#each [0, 50, 100, 150, 200] as tick}
				<line x1={tick} y1="0" x2={tick} y2="4" class="tick-mark" />
				<line x1="0" y1={tick} x2="4" y2={tick} class="tick-mark" />
				{#if tick > 0 && tick < 200}
					<text x={tick} y="14" class="tick-num">{tick}</text>
					<text x="8" y={tick + 4} class="tick-num">{tick}</text>
				{/if}
			{/each}

			<!-- Rect element -->
			<rect
				x={rectX}
				y="20"
				width="40"
				height="30"
				rx="4"
				fill="oklch(65% 0.22 270 / 0.7)"
				stroke="oklch(65% 0.22 270)"
				stroke-width="1.5"
			/>
			<text x={rectX + 20} y="62" class="el-label">&lt;rect&gt;</text>

			<!-- Circle element -->
			<circle
				cx="140"
				cy="100"
				r={circleR}
				fill="oklch(65% 0.18 150 / 0.7)"
				stroke="oklch(65% 0.18 150)"
				stroke-width="1.5"
			/>
			<text x="140" y={100 + circleR + 14} class="el-label">&lt;circle&gt;</text>

			<!-- Star path with rotation -->
			<g transform="rotate({pathRotation}, 70, 150)">
				<path
					d="M70 125 L78 143 L97 143 L82 154 L88 172 L70 162 L52 172 L58 154 L43 143 L62 143 Z"
					fill="oklch(70% 0.20 60 / 0.7)"
					stroke="oklch(70% 0.20 60)"
					stroke-width="1.5"
				/>
			</g>
			<text x="70" y="186" class="el-label">&lt;path&gt;</text>
		</svg>

		<p class="chart-note">
			Drag the sliders to manipulate SVG attributes reactively. The coordinate axes show the 200x200 viewBox.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>viewBox</code> defines the SVG coordinate system — all child elements position within it.</li>
		<li>Primitive shapes (<code>&lt;rect&gt;</code>, <code>&lt;circle&gt;</code>, <code>&lt;path&gt;</code>) are the building blocks for every SVG animation.</li>
		<li><code>$state</code> drives attribute values reactively — sliders update the SVG in real time with zero DOM manipulation.</li>
		<li>The <code>transform</code> attribute on <code>&lt;g&gt;</code> applies rotation around a specified origin point.</li>
		<li>Path commands (<code>M</code>, <code>L</code>, <code>Z</code>) define shapes point-by-point — understanding them is essential for morphing and drawing animations.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.controls {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.controls label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.controls input[type='range'] {
		width: 180px;
		accent-color: oklch(65% 0.22 270);
	}

	.playground {
		width: 100%;
		max-width: 400px;
		height: auto;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.axis {
		stroke: var(--color-text-muted);
		stroke-width: 1;
		opacity: 0.5;
	}
	.axis-label {
		font-size: 10px;
		fill: var(--color-text-muted);
		font-weight: 600;
	}
	.tick-mark {
		stroke: var(--color-text-muted);
		stroke-width: 0.75;
		opacity: 0.4;
	}
	.tick-num {
		font-size: 7px;
		fill: var(--color-text-muted);
		opacity: 0.6;
	}
	.el-label {
		font-size: 9px;
		fill: var(--color-text-muted);
		text-anchor: middle;
		font-family: var(--font-mono);
	}
	.chart-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
