<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let hydrated: boolean = $state(false);
	let clicks: number = $state(0);

	$effect(() => {
		hydrated = true;
	});

	function handleClick(): void {
		clicks += 1;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let hydrated: boolean = $state(false);\n" +
		"\tlet clicks: number = $state(0);\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\thydrated = true;\n" +
		"\t});\n" +
		"\n" +
		"\tfunction handleClick(): void {\n" +
		"\t\tclicks += 1;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.3 — What hydration actually is\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e After SSR delivers HTML, the browser downloads the JS bundle and\n" +
		"\t\truns the Svelte component again — this time attaching event listeners and reactivity to the\n" +
		"\t\texisting DOM. That \"waking up\" is hydration. Hydration mismatches happen when the server and\n" +
		"\t\tclient compute different markup (e.g., using \u003ccode\u003eMath.random()\u003c/code\u003e or \u003ccode\u003enew Date()\u003c/code\u003e\n" +
		"\t\tin a way that differs between runs). Wrap components in \u003ccode\u003e&lt;svelte:boundary&gt;\u003c/code\u003e to\n" +
		"\t\tcatch such errors.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eHydration lifecycle timeline\u003c/h3\u003e\n" +
		"\t\t\u003col class=\"timeline\"\u003e\n" +
		"\t\t\t\u003cli class=\"done\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"marker\"\u003e1\u003c/span\u003e\n" +
		"\t\t\t\t\u003cdiv\u003e\n" +
		"\t\t\t\t\t\u003cstrong\u003eServer rendered HTML\u003c/strong\u003e\n" +
		"\t\t\t\t\t\u003cp\u003eSvelteKit ran the component on the server and sent HTML.\u003c/p\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\u003cli class=\"done\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"marker\"\u003e2\u003c/span\u003e\n" +
		"\t\t\t\t\u003cdiv\u003e\n" +
		"\t\t\t\t\t\u003cstrong\u003eJS downloaded\u003c/strong\u003e\n" +
		"\t\t\t\t\t\u003cp\u003eThe browser fetched and parsed the component bundle.\u003c/p\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\u003cli class:done={hydrated}\u003e\n" +
		"\t\t\t\t\u003cspan class=\"marker\"\u003e3\u003c/span\u003e\n" +
		"\t\t\t\t\u003cdiv\u003e\n" +
		"\t\t\t\t\t\u003cstrong\u003eHydrated: {hydrated ? 'yes' : 'no'}\u003c/strong\u003e\n" +
		"\t\t\t\t\t\u003cp\u003e\n" +
		"\t\t\t\t\t\tRunes are live, the \u003ccode\u003e$effect\u003c/code\u003e fired, and event listeners are attached.\n" +
		"\t\t\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\u003c/ol\u003e\n" +
		"\n" +
		"\t\t\u003cbutton type=\"button\" onclick={handleClick}\u003eClick me ({clicks})\u003c/button\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tBefore hydration, the button exists but clicking does nothing — it's inert HTML. Once\n" +
		"\t\t\thydration runs, the \u003ccode\u003eonclick\u003c/code\u003e handler is wired up and the counter increments.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eHydration re-runs the component in the browser and binds reactivity to the existing DOM.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e only runs after hydration — useful as a \"client ready\" signal.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eHydration mismatches come from non-deterministic values differing between server and client.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eWrap risky subtrees in \u003ccode\u003e&lt;svelte:boundary&gt;\u003c/code\u003e to catch hydration errors.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.3 — What hydration actually is</h1>
	<p class="concept">
		<strong>Concept.</strong> After SSR delivers HTML, the browser downloads the JS bundle and
		runs the Svelte component again — this time attaching event listeners and reactivity to the
		existing DOM. That "waking up" is hydration. Hydration mismatches happen when the server and
		client compute different markup (e.g., using <code>Math.random()</code> or <code>new Date()</code>
		in a way that differs between runs). Wrap components in <code>&lt;svelte:boundary&gt;</code> to
		catch such errors.
	</p>

	<div class="build">
		<h3 class="sub">Hydration lifecycle timeline</h3>
		<ol class="timeline">
			<li class="done">
				<span class="marker">1</span>
				<div>
					<strong>Server rendered HTML</strong>
					<p>SvelteKit ran the component on the server and sent HTML.</p>
				</div>
			</li>
			<li class="done">
				<span class="marker">2</span>
				<div>
					<strong>JS downloaded</strong>
					<p>The browser fetched and parsed the component bundle.</p>
				</div>
			</li>
			<li class:done={hydrated}>
				<span class="marker">3</span>
				<div>
					<strong>Hydrated: {hydrated ? 'yes' : 'no'}</strong>
					<p>
						Runes are live, the <code>$effect</code> fired, and event listeners are attached.
					</p>
				</div>
			</li>
		</ol>

		<button type="button" onclick={handleClick}>Click me ({clicks})</button>
		<p class="hint">
			Before hydration, the button exists but clicking does nothing — it's inert HTML. Once
			hydration runs, the <code>onclick</code> handler is wired up and the counter increments.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Hydration re-runs the component in the browser and binds reactivity to the existing DOM.</li>
		<li><code>$effect</code> only runs after hydration — useful as a "client ready" signal.</li>
		<li>Hydration mismatches come from non-deterministic values differing between server and client.</li>
		<li>Wrap risky subtrees in <code>&lt;svelte:boundary&gt;</code> to catch hydration errors.</li>
	</ul>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	.sub { margin-block-start: 0; }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.timeline { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-sm); }
	.timeline li { display: flex; gap: var(--space-sm); align-items: flex-start; padding: var(--space-sm); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); opacity: 0.55; transition: opacity var(--dur-base) var(--ease-out); }
	.timeline li.done { opacity: 1; border-color: var(--color-success); }
	.timeline li p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }
	.marker { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; inline-size: 1.75rem; block-size: 1.75rem; background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-full); font-family: var(--font-mono); font-size: var(--text-sm); }
	button { align-self: flex-start; padding: var(--space-sm) var(--space-md); background: var(--color-brand); color: var(--color-surface); border: none; border-radius: var(--radius-md); font-size: var(--text-base); cursor: pointer; transition: background var(--dur-fast) var(--ease-out); }
	button:hover { background: var(--color-brand-dim); }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
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
