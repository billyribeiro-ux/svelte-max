<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Row {
		id: number;
		name: string;
		score: number;
		status: 'active' | 'idle';
	}

	const datasetA: readonly Row[] = [
		{ id: 1, name: 'Ada Lovelace', score: 98, status: 'active' },
		{ id: 2, name: 'Alan Turing', score: 95, status: 'active' },
		{ id: 3, name: 'Grace Hopper', score: 92, status: 'idle' },
		{ id: 4, name: 'Donald Knuth', score: 99, status: 'active' },
		{ id: 5, name: 'Linus Torvalds', score: 88, status: 'idle' }
	];

	const datasetB: readonly Row[] = [
		{ id: 10, name: 'Marie Curie', score: 91, status: 'active' },
		{ id: 11, name: 'Rosalind Franklin', score: 87, status: 'idle' },
		{ id: 12, name: 'Barbara McClintock', score: 93, status: 'active' },
		{ id: 13, name: 'Dorothy Hodgkin', score: 90, status: 'active' }
	];

	const datasetC: readonly Row[] = [
		{ id: 20, name: 'Nikola Tesla', score: 97, status: 'idle' },
		{ id: 21, name: 'Michael Faraday', score: 89, status: 'active' },
		{ id: 22, name: 'James Maxwell', score: 94, status: 'active' },
		{ id: 23, name: 'Richard Feynman', score: 96, status: 'active' },
		{ id: 24, name: 'Paul Dirac', score: 93, status: 'idle' },
		{ id: 25, name: 'Emmy Noether', score: 98, status: 'active' }
	];

	let rows = $state.raw<readonly Row[]>(datasetA);
	let activeSet = $state<'A' | 'B' | 'C'>('A');

	function load(which: 'A' | 'B' | 'C'): void {
		activeSet = which;
		rows = which === 'A' ? datasetA : which === 'B' ? datasetB : datasetC;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Row {\n" +
		"\t\tid: number;\n" +
		"\t\tname: string;\n" +
		"\t\tscore: number;\n" +
		"\t\tstatus: 'active' | 'idle';\n" +
		"\t}\n" +
		"\n" +
		"\tconst datasetA: readonly Row[] = [\n" +
		"\t\t{ id: 1, name: 'Ada Lovelace', score: 98, status: 'active' },\n" +
		"\t\t{ id: 2, name: 'Alan Turing', score: 95, status: 'active' },\n" +
		"\t\t{ id: 3, name: 'Grace Hopper', score: 92, status: 'idle' },\n" +
		"\t\t{ id: 4, name: 'Donald Knuth', score: 99, status: 'active' },\n" +
		"\t\t{ id: 5, name: 'Linus Torvalds', score: 88, status: 'idle' }\n" +
		"\t];\n" +
		"\n" +
		"\tconst datasetB: readonly Row[] = [\n" +
		"\t\t{ id: 10, name: 'Marie Curie', score: 91, status: 'active' },\n" +
		"\t\t{ id: 11, name: 'Rosalind Franklin', score: 87, status: 'idle' },\n" +
		"\t\t{ id: 12, name: 'Barbara McClintock', score: 93, status: 'active' },\n" +
		"\t\t{ id: 13, name: 'Dorothy Hodgkin', score: 90, status: 'active' }\n" +
		"\t];\n" +
		"\n" +
		"\tconst datasetC: readonly Row[] = [\n" +
		"\t\t{ id: 20, name: 'Nikola Tesla', score: 97, status: 'idle' },\n" +
		"\t\t{ id: 21, name: 'Michael Faraday', score: 89, status: 'active' },\n" +
		"\t\t{ id: 22, name: 'James Maxwell', score: 94, status: 'active' },\n" +
		"\t\t{ id: 23, name: 'Richard Feynman', score: 96, status: 'active' },\n" +
		"\t\t{ id: 24, name: 'Paul Dirac', score: 93, status: 'idle' },\n" +
		"\t\t{ id: 25, name: 'Emmy Noether', score: 98, status: 'active' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet rows = $state.raw\u003creadonly Row[]\u003e(datasetA);\n" +
		"\tlet activeSet = $state\u003c'A' | 'B' | 'C'\u003e('A');\n" +
		"\n" +
		"\tfunction load(which: 'A' | 'B' | 'C'): void {\n" +
		"\t\tactiveSet = which;\n" +
		"\t\trows = which === 'A' ? datasetA : which === 'B' ? datasetB : datasetC;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.5 — $state.raw\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003ccode\u003e$state()\u003c/code\u003e wraps every nested property in a Proxy so Svelte can observe deep mutations.\n" +
		"\t\tThat machinery is wonderful for editable forms and ergonomic for day-to-day work — but it is\n" +
		"\t\texpensive for large collections you intend to swap wholesale. \u003ccode\u003e$state.raw()\u003c/code\u003e keeps the\n" +
		"\t\ttop-level binding reactive while skipping the deep proxying entirely: reads are plain, and\n" +
		"\t\tupdates only fire when you \u003cem\u003ereassign\u003c/em\u003e the whole value. Reach for it when you load paginated\n" +
		"\t\tAPI results, swap datasets, or hold external data you never mutate in place. The trade-off is\n" +
		"\t\tthat \u003ccode\u003e.push()\u003c/code\u003e and \u003ccode\u003e.splice()\u003c/code\u003e on the value will not trigger updates — you\n" +
		"\t\tmust replace the reference.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"controls\" role=\"group\" aria-label=\"Load dataset\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={activeSet === 'A'} onclick={() =\u003e load('A')}\u003eLoad A\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={activeSet === 'B'} onclick={() =\u003e load('B')}\u003eLoad B\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={activeSet === 'C'} onclick={() =\u003e load('C')}\u003eLoad C\u003c/button\u003e\n" +
		"\t\t\t\u003cspan class=\"meta\"\u003eShowing dataset \u003cstrong\u003e{activeSet}\u003c/strong\u003e · {rows.length} rows\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"table\" role=\"table\" aria-label=\"Leaderboard\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"row head\" role=\"row\"\u003e\n" +
		"\t\t\t\t\u003cspan role=\"columnheader\"\u003eID\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan role=\"columnheader\"\u003eName\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan role=\"columnheader\"\u003eScore\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan role=\"columnheader\"\u003eStatus\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{#each rows as row (row.id)}\n" +
		"\t\t\t\t\u003cdiv class=\"row\" role=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cspan role=\"cell\"\u003e#{row.id}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan role=\"cell\"\u003e{row.name}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan role=\"cell\"\u003e{row.score}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan role=\"cell\" class=\"status {row.status}\"\u003e{row.status}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tOpen the DevTools Performance tab — switching datasets here is cheap because\n" +
		"\t\t\t\u003ccode\u003e$state.raw\u003c/code\u003e doesn't build proxies for every row.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$state.raw\u003c/code\u003e is reactive at the top level but not deeply proxied.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUpdates require reassignment — in-place mutations like \u003ccode\u003e.push()\u003c/code\u003e will not notify.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eIt is the right choice for large datasets you replace atomically.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse TypeScript's \u003ccode\u003ereadonly\u003c/code\u003e to enforce the \"swap, don't mutate\" contract.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.5 — $state.raw</h1>

	<p class="concept">
		<code>$state()</code> wraps every nested property in a Proxy so Svelte can observe deep mutations.
		That machinery is wonderful for editable forms and ergonomic for day-to-day work — but it is
		expensive for large collections you intend to swap wholesale. <code>$state.raw()</code> keeps the
		top-level binding reactive while skipping the deep proxying entirely: reads are plain, and
		updates only fire when you <em>reassign</em> the whole value. Reach for it when you load paginated
		API results, swap datasets, or hold external data you never mutate in place. The trade-off is
		that <code>.push()</code> and <code>.splice()</code> on the value will not trigger updates — you
		must replace the reference.
	</p>

	<div class="build">
		<div class="controls" role="group" aria-label="Load dataset">
			<button type="button" class:active={activeSet === 'A'} onclick={() => load('A')}>Load A</button>
			<button type="button" class:active={activeSet === 'B'} onclick={() => load('B')}>Load B</button>
			<button type="button" class:active={activeSet === 'C'} onclick={() => load('C')}>Load C</button>
			<span class="meta">Showing dataset <strong>{activeSet}</strong> · {rows.length} rows</span>
		</div>

		<div class="table" role="table" aria-label="Leaderboard">
			<div class="row head" role="row">
				<span role="columnheader">ID</span>
				<span role="columnheader">Name</span>
				<span role="columnheader">Score</span>
				<span role="columnheader">Status</span>
			</div>
			{#each rows as row (row.id)}
				<div class="row" role="row">
					<span role="cell">#{row.id}</span>
					<span role="cell">{row.name}</span>
					<span role="cell">{row.score}</span>
					<span role="cell" class="status {row.status}">{row.status}</span>
				</div>
			{/each}
		</div>

		<p class="hint">
			Open the DevTools Performance tab — switching datasets here is cheap because
			<code>$state.raw</code> doesn't build proxies for every row.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>$state.raw</code> is reactive at the top level but not deeply proxied.</li>
		<li>Updates require reassignment — in-place mutations like <code>.push()</code> will not notify.</li>
		<li>It is the right choice for large datasets you replace atomically.</li>
		<li>Use TypeScript's <code>readonly</code> to enforce the "swap, don't mutate" contract.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}

	button {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-text);
		cursor: pointer;
		transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
	}

	button:hover {
		background: var(--color-surface-2);
	}

	button.active {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}

	.meta {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-left: auto;
	}

	.table {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-surface-1);
	}

	.row {
		display: grid;
		grid-template-columns: 60px 1fr 80px 90px;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		border-bottom: 1px solid var(--color-border);
	}

	.row:last-child {
		border-bottom: none;
	}

	.row.head {
		background: var(--color-surface-2);
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
	}

	.status {
		text-transform: capitalize;
		font-weight: 600;
	}

	.status.active {
		color: var(--color-success);
	}

	.status.idle {
		color: var(--color-text-muted);
	}

	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-1);
		border-left: 3px solid var(--color-brand);
		border-radius: var(--radius-sm);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
		padding-left: var(--space-lg);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.row {
			grid-template-columns: 80px 2fr 100px 120px;
			font-size: var(--text-base);
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
