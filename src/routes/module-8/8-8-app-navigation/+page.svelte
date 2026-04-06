<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { goto, preloadData, beforeNavigate, afterNavigate } from '$app/navigation';

	let log = $state<string[]>([]);

	function push(entry: string) {
		log = [...log, `${new Date().toLocaleTimeString()} · ${entry}`].slice(-6);
	}

	beforeNavigate((nav) => {
		push(`beforeNavigate → ${nav.to?.url.pathname ?? '(unknown)'}`);
	});

	afterNavigate((nav) => {
		push(`afterNavigate ← ${nav.from?.url.pathname ?? '(none)'} → ${nav.to?.url.pathname ?? '(unknown)'}`);
	});

	function goHome() {
		goto('/');
	}

	function goPrev() {
		goto('/module-8/8-7-app-state');
	}

	function warmHome() {
		preloadData('/');
		push('preloadData("/") triggered');
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { goto, preloadData, beforeNavigate, afterNavigate } from '$app/navigation';\n" +
		"\n" +
		"\tlet log = $state\u003cstring[]\u003e([]);\n" +
		"\n" +
		"\tfunction push(entry: string) {\n" +
		"\t\tlog = [...log, `${new Date().toLocaleTimeString()} · ${entry}`].slice(-6);\n" +
		"\t}\n" +
		"\n" +
		"\tbeforeNavigate((nav) =\u003e {\n" +
		"\t\tpush(`beforeNavigate → ${nav.to?.url.pathname ?? '(unknown)'}`);\n" +
		"\t});\n" +
		"\n" +
		"\tafterNavigate((nav) =\u003e {\n" +
		"\t\tpush(`afterNavigate ← ${nav.from?.url.pathname ?? '(none)'} → ${nav.to?.url.pathname ?? '(unknown)'}`);\n" +
		"\t});\n" +
		"\n" +
		"\tfunction goHome() {\n" +
		"\t\tgoto('/');\n" +
		"\t}\n" +
		"\n" +
		"\tfunction goPrev() {\n" +
		"\t\tgoto('/module-8/8-7-app-state');\n" +
		"\t}\n" +
		"\n" +
		"\tfunction warmHome() {\n" +
		"\t\tpreloadData('/');\n" +
		"\t\tpush('preloadData(\"/\") triggered');\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.8 — $app/navigation\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{'goto(url)'}\u003c/code\u003e navigates programmatically.\n" +
		"\t\t\u003ccode\u003einvalidate(key)\u003c/code\u003e re-runs loads that depend on a key.\n" +
		"\t\t\u003ccode\u003einvalidateAll()\u003c/code\u003e re-runs every active load.\n" +
		"\t\t\u003ccode\u003e{'preloadData(url)'}\u003c/code\u003e warms a route's data without navigating.\n" +
		"\t\t\u003ccode\u003ebeforeNavigate\u003c/code\u003e, \u003ccode\u003eafterNavigate\u003c/code\u003e, and \u003ccode\u003eonNavigate\u003c/code\u003e are\n" +
		"\t\tlifecycle hooks that fire around every client-side navigation — this is SvelteKit's\n" +
		"\t\treplacement for imperative router APIs.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={goHome}\u003eGo home\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={goPrev}\u003eGo to 8.7\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onpointerenter={warmHome} onclick={warmHome}\u003e\n" +
		"\t\t\t\tPreload home on hover\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"log\"\u003e\n" +
		"\t\t\t\u003cstrong\u003eNavigation lifecycle log\u003c/strong\u003e\n" +
		"\t\t\t{#if log.length === 0}\n" +
		"\t\t\t\t\u003cp class=\"empty\"\u003eNo navigations yet. Click a button above, then come back.\u003c/p\u003e\n" +
		"\t\t\t{:else}\n" +
		"\t\t\t\t\u003cul class=\"log-list\"\u003e\n" +
		"\t\t\t\t\t{#each log as entry (entry)}\n" +
		"\t\t\t\t\t\t\u003cli\u003e{entry}\u003c/li\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/ul\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{'goto(url)'}\u003c/code\u003e is the programmatic equivalent of clicking a link.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{'preloadData(url)'}\u003c/code\u003e warms a route's data before the user commits.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ebeforeNavigate\u003c/code\u003e / \u003ccode\u003eafterNavigate\u003c/code\u003e are your lifecycle hooks.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003einvalidate\u003c/code\u003e and \u003ccode\u003einvalidateAll\u003c/code\u003e re-run active \u003ccode\u003eload\u003c/code\u003e functions.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.8 — $app/navigation</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'goto(url)'}</code> navigates programmatically.
		<code>invalidate(key)</code> re-runs loads that depend on a key.
		<code>invalidateAll()</code> re-runs every active load.
		<code>{'preloadData(url)'}</code> warms a route's data without navigating.
		<code>beforeNavigate</code>, <code>afterNavigate</code>, and <code>onNavigate</code> are
		lifecycle hooks that fire around every client-side navigation — this is SvelteKit's
		replacement for imperative router APIs.
	</p>

	<div class="build">
		<div class="row">
			<button type="button" onclick={goHome}>Go home</button>
			<button type="button" onclick={goPrev}>Go to 8.7</button>
			<button type="button" onpointerenter={warmHome} onclick={warmHome}>
				Preload home on hover
			</button>
		</div>

		<div class="log">
			<strong>Navigation lifecycle log</strong>
			{#if log.length === 0}
				<p class="empty">No navigations yet. Click a button above, then come back.</p>
			{:else}
				<ul class="log-list">
					{#each log as entry (entry)}
						<li>{entry}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'goto(url)'}</code> is the programmatic equivalent of clicking a link.</li>
		<li><code>{'preloadData(url)'}</code> warms a route's data before the user commits.</li>
		<li><code>beforeNavigate</code> / <code>afterNavigate</code> are your lifecycle hooks.</li>
		<li><code>invalidate</code> and <code>invalidateAll</code> re-run active <code>load</code> functions.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	button {
		font: inherit;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.log {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}
	.log-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.empty {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.row {
			flex-direction: row;
			flex-wrap: wrap;
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
