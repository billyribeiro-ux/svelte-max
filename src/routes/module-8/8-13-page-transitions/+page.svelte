<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { onNavigate } from '$app/navigation';

	let hasVT = $state(false);

	$effect(() => {
		hasVT = typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
	});

	onNavigate((navigation) => {
		if (typeof document.startViewTransition !== 'function') return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { onNavigate } from '$app/navigation';\n" +
		"\n" +
		"\tlet hasVT = $state(false);\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\thasVT = typeof document !== 'undefined' && typeof document.startViewTransition === 'function';\n" +
		"\t});\n" +
		"\n" +
		"\tonNavigate((navigation) =\u003e {\n" +
		"\t\tif (typeof document.startViewTransition !== 'function') return;\n" +
		"\n" +
		"\t\treturn new Promise((resolve) =\u003e {\n" +
		"\t\t\tdocument.startViewTransition(async () =\u003e {\n" +
		"\t\t\t\tresolve();\n" +
		"\t\t\t\tawait navigation.complete;\n" +
		"\t\t\t});\n" +
		"\t\t});\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.13 — Page transitions\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003eonNavigate\u003c/code\u003e from \u003ccode\u003e$app/navigation\u003c/code\u003e lets you hook into every\n" +
		"\t\tclient-side navigation. Combined with the browser's View Transitions API\n" +
		"\t\t(\u003ccode\u003edocument.startViewTransition\u003c/code\u003e), you get smooth morph transitions between routes.\n" +
		"\t\tFall back gracefully when the API isn't available.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"status\"\u003e\n" +
		"\t\t\t\u003cspan\u003eView Transitions API:\u003c/span\u003e\n" +
		"\t\t\t\u003cspan class=\"pill\" class:ok={hasVT} class:no={!hasVT}\u003e\n" +
		"\t\t\t\t{hasVT ? 'Supported' : 'Not supported'}\n" +
		"\t\t\t\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003eClick a link below — if supported, the page morphs smoothly.\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cnav class=\"links\"\u003e\n" +
		"\t\t\t\u003ca href=\"/module-8/8-11-shallow-routing\"\u003e→ 8.11 Shallow routing\u003c/a\u003e\n" +
		"\t\t\t\u003ca href=\"/module-8/8-12-snapshots\"\u003e→ 8.12 Snapshots\u003c/a\u003e\n" +
		"\t\t\t\u003ca href=\"/module-8/8-14-rendering-modes\"\u003e→ 8.14 Rendering modes\u003c/a\u003e\n" +
		"\t\t\u003c/nav\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eonNavigate\u003c/code\u003e can return a promise to delay the DOM update.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003edocument.startViewTransition\u003c/code\u003e snapshots, morphs, and animates.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eAdd \u003ccode\u003eview-transition-name\u003c/code\u003e to elements that should morph across routes.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eFeature-detect — not every browser supports it yet.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.13 — Page transitions</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>onNavigate</code> from <code>$app/navigation</code> lets you hook into every
		client-side navigation. Combined with the browser's View Transitions API
		(<code>document.startViewTransition</code>), you get smooth morph transitions between routes.
		Fall back gracefully when the API isn't available.
	</p>

	<div class="build">
		<div class="status">
			<span>View Transitions API:</span>
			<span class="pill" class:ok={hasVT} class:no={!hasVT}>
				{hasVT ? 'Supported' : 'Not supported'}
			</span>
		</div>

		<p class="hint">Click a link below — if supported, the page morphs smoothly.</p>

		<nav class="links">
			<a href="/module-8/8-11-shallow-routing">→ 8.11 Shallow routing</a>
			<a href="/module-8/8-12-snapshots">→ 8.12 Snapshots</a>
			<a href="/module-8/8-14-rendering-modes">→ 8.14 Rendering modes</a>
		</nav>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments reveal the mechanics and limitations of view transitions. Undo each before proceeding.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>typeof document.startViewTransition</code> feature check and test in a browser that does not support it (e.g., Firefox as of early 2026).</strong> The code throws a <code>TypeError</code> because <code>document.startViewTransition</code> is undefined. This demonstrates why feature detection is mandatory — the View Transitions API is not universally supported, and your navigation must still work without it.</li>
		<li><strong>Assign the same <code>view-transition-name</code> to two elements that are visible on the same page at the same time.</strong> The browser's view transition fails silently or produces glitchy animations because transition names must be unique per snapshot. Each name identifies a single element to morph, and duplicates create ambiguity the browser cannot resolve.</li>
		<li><strong>Inside <code>onNavigate</code>, return a promise that never resolves.</strong> The navigation hangs indefinitely — the old page stays visible, the new page never appears, and the user is stuck. This shows that <code>onNavigate</code> is a blocking hook: SvelteKit waits for your promise to resolve before completing the DOM swap.</li>
		<li><strong>Remove the <code>await navigation.complete</code> line from inside <code>startViewTransition</code>.</strong> The transition fires immediately with the old DOM snapshot and never sees the new DOM, resulting in a flash or no visible animation. The <code>await navigation.complete</code> is what tells the browser "the new DOM is ready to snapshot now," and without it the transition has nothing to morph to.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The View Transitions API, accessible through <code>document.startViewTransition</code>, gives browsers a native mechanism for animating between two DOM states. SvelteKit integrates with it via the <code>onNavigate</code> hook from <code>$app/navigation</code>. By returning a promise from <code>onNavigate</code>, you delay the DOM update until the view transition is ready, letting the browser snapshot the old page, apply the new page, and cross-fade or morph between them. The result is smooth, app-like transitions without any JavaScript animation libraries.</p>
	<p class="prose">The CSS property <code>view-transition-name</code> is how you tell the browser which elements should be individually tracked across the transition. An element with a transition name on the old page will morph into the element with the same name on the new page, creating a spatial animation that guides the user's eye. Names must be unique within each snapshot — duplicates cause the transition to break. For SvelteKit applications, applying a transition name to shared elements like page headings or hero images produces particularly compelling effects.</p>
	<p class="prose">Because the View Transitions API is not yet supported in all browsers, feature detection is essential. The standard pattern checks <code>typeof document.startViewTransition === 'function'</code> and falls back to a normal instant navigation when the API is absent. This progressive enhancement approach means your application works everywhere, with enhanced visual polish in browsers that support it. As browser adoption increases, your transition code will automatically activate for more users without any changes.</p>
	<p class="next">Next, you will learn about the four rendering modes SvelteKit offers and when to choose each one.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
	}
	h1 {
		view-transition-name: lesson-title;
		/* view-transition-class — groups headings so they share a single View Transition animation rule */
		view-transition-class: heading;
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
	.status {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	.pill {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		border: 1px solid var(--color-border);
	}
	.pill.ok {
		background: var(--color-success);
		color: var(--color-surface);
		border-color: var(--color-success);
	}
	.pill.no {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}
	.hint {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	.links {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	a {
		color: var(--color-brand);
		text-decoration: none;
		font-size: var(--text-sm);
	}
	a:hover {
		text-decoration: underline;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
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
