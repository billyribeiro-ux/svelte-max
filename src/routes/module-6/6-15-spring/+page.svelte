<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';

	// When reduced motion is active on initial render, spring should snap instantly.
	const reducedOnMount = prefersReducedMotion.current;
	const x = new Spring(0, { stiffness: 0.1, damping: 0.4, ...(reducedOnMount && { hard: true }) });
	const y = new Spring(0, { stiffness: 0.1, damping: 0.4, ...(reducedOnMount && { hard: true }) });

	let rawX = $state(0);
	let rawY = $state(0);

	function handleMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const nx = e.clientX - rect.left;
		const ny = e.clientY - rect.top;
		rawX = nx;
		rawY = ny;
		if (prefersReducedMotion.current) {
			x.set(nx, { instant: true });
			y.set(nx, { instant: true });
		} else {
			x.target = nx;
			y.target = ny;
		}
	}

	const displayX = $derived(prefersReducedMotion.current ? rawX : x.current);
	const displayY = $derived(prefersReducedMotion.current ? rawY : y.current);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { Spring, prefersReducedMotion } from 'svelte/motion';\n" +
		"\n" +
		"\t// When reduced motion is active on initial render, spring should snap instantly.\n" +
		"\tconst reducedOnMount = prefersReducedMotion.current;\n" +
		"\tconst x = new Spring(0, { stiffness: 0.1, damping: 0.4, ...(reducedOnMount && { hard: true }) });\n" +
		"\tconst y = new Spring(0, { stiffness: 0.1, damping: 0.4, ...(reducedOnMount && { hard: true }) });\n" +
		"\n" +
		"\tlet rawX = $state(0);\n" +
		"\tlet rawY = $state(0);\n" +
		"\n" +
		"\tfunction handleMove(e: PointerEvent) {\n" +
		"\t\tconst rect = (e.currentTarget as HTMLElement).getBoundingClientRect();\n" +
		"\t\tconst nx = e.clientX - rect.left;\n" +
		"\t\tconst ny = e.clientY - rect.top;\n" +
		"\t\trawX = nx;\n" +
		"\t\trawY = ny;\n" +
		"\t\tif (prefersReducedMotion.current) {\n" +
		"\t\t\tx.set(nx, { instant: true });\n" +
		"\t\t\ty.set(nx, { instant: true });\n" +
		"\t\t} else {\n" +
		"\t\t\tx.target = nx;\n" +
		"\t\t\ty.target = ny;\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\n" +
		"\tconst displayX = $derived(prefersReducedMotion.current ? rawX : x.current);\n" +
		"\tconst displayY = $derived(prefersReducedMotion.current ? rawY : y.current);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.15 — Spring class\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e The \u003ccode\u003eSpring\u003c/code\u003e class from \u003ccode\u003esvelte/motion\u003c/code\u003e gives you\n" +
		"\t\tphysics-based motion instead of duration-based tweening. Construct with\n" +
		"\t\t\u003ccode\u003enew Spring(initial, {'{ stiffness, damping }'})\u003c/code\u003e: higher stiffness means faster,\n" +
		"\t\thigher damping means less bounce. Set \u003ccode\u003e.target = value\u003c/code\u003e to start the simulation and\n" +
		"\t\tread \u003ccode\u003e.current\u003c/code\u003e reactively. Ideal for cursor-following and drag gestures where feel\n" +
		"\t\tmatters more than exact timing. Always fall back to raw values when\n" +
		"\t\t\u003ccode\u003eprefersReducedMotion.current\u003c/code\u003e is true.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eMove your pointer inside the box — the dot follows with spring physics.\u003c/p\u003e\n" +
		"\t\t\u003cdiv\n" +
		"\t\t\tclass=\"field\"\n" +
		"\t\t\tonpointermove={handleMove}\n" +
		"\t\t\trole=\"presentation\"\n" +
		"\t\t\u003e\n" +
		"\t\t\t\u003cdiv class=\"dot\" style:transform=\"translate({displayX}px, {displayY}px)\"\u003e\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tReduced motion:\n" +
		"\t\t\t\u003cstrong\u003e{prefersReducedMotion.current ? 'on' : 'off'}\u003c/strong\u003e. Turn it on in your OS\n" +
		"\t\t\taccessibility settings and reload to see physics bypassed.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eSpring\u003c/code\u003e is a physics simulation — no fixed duration.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eStiffness and damping shape the feel: snappy vs. bouncy.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSet \u003ccode\u003e.target\u003c/code\u003e to move, read \u003ccode\u003e.current\u003c/code\u003e to render.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eAlways respect \u003ccode\u003eprefersReducedMotion.current\u003c/code\u003e and bypass animation when set.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.15 — Spring class</h1>
	<p class="concept">
		<strong>Concept.</strong> The <code>Spring</code> class from <code>svelte/motion</code> gives you
		physics-based motion instead of duration-based tweening. Construct with
		<code>new Spring(initial, {'{ stiffness, damping }'})</code>: higher stiffness means faster,
		higher damping means less bounce. Set <code>.target = value</code> to start the simulation and
		read <code>.current</code> reactively. Ideal for cursor-following and drag gestures where feel
		matters more than exact timing. Always fall back to raw values when
		<code>prefersReducedMotion.current</code> is true.
	</p>

	<div class="build">
		<p class="hint">Move your pointer inside the box — the dot follows with spring physics.</p>
		<div
			class="field"
			onpointermove={handleMove}
			role="presentation"
		>
			<div class="dot" style:transform="translate({displayX}px, {displayY}px)"></div>
		</div>
		<p class="note">
			Reduced motion:
			<strong>{prefersReducedMotion.current ? 'on' : 'off'}</strong>. Turn it on in your OS
			accessibility settings and reload to see physics bypassed.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>Spring</code> is a physics simulation — no fixed duration.</li>
		<li>Stiffness and damping shape the feel: snappy vs. bouncy.</li>
		<li>Set <code>.target</code> to move, read <code>.current</code> to render.</li>
		<li>Always respect <code>prefersReducedMotion.current</code> and bypass animation when set.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72rem;
		margin-inline: auto;
		color: var(--color-text);
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
	.hint {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.field {
		position: relative;
		block-size: 280px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		touch-action: none;
	}
	.dot {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
		inline-size: 28px;
		block-size: 28px;
		margin-inline-start: -14px;
		margin-block-start: -14px;
		border-radius: var(--radius-full);
		background: var(--color-brand);
		box-shadow: var(--shadow-md);
		pointer-events: none;
		will-change: transform;
	}
	.note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.note strong {
		color: var(--color-text);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.field {
			block-size: 360px;
		}
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
