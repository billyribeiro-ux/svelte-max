<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { flip } from 'svelte/animate';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel
	} from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions, SortingState } from '@tanstack/svelte-table';

	interface Member {
		id: number;
		name: string;
		email: string;
		role: string;
		joinedAt: string;
	}

	const data: Member[] = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinedAt: '2023-01-15' },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', joinedAt: '2023-03-22' },
		{ id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', joinedAt: '2023-05-10' },
		{ id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', joinedAt: '2023-06-01' },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', joinedAt: '2023-07-14' },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', joinedAt: '2023-08-20' },
		{ id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', joinedAt: '2023-09-05' },
		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30' }
	];

	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'id', header: 'ID', size: 60 },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role', size: 100 },
		{ accessorKey: 'joinedAt', header: 'Joined', size: 120 }
	];

	let sorting = $state<SortingState>([]);

	let options = $state<TableOptions<Member>>({
		data,
		columns,
		state: {
			get sorting() { return sorting; }
		},
		onSortingChange(updater) {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	const table = createSvelteTable(options);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import {\n" +
		"		createSvelteTable,\n" +
		"		flexRender,\n" +
		"		getCoreRowModel,\n" +
		"		getSortedRowModel\n" +
		"	} from '@tanstack/svelte-table';\n" +
		"	import type { ColumnDef, TableOptions, SortingState } from '@tanstack/svelte-table';\n" +
		"\n" +
		"	interface Member {\n" +
		"		id: number;\n" +
		"		name: string;\n" +
		"		email: string;\n" +
		"		role: string;\n" +
		"		joinedAt: string;\n" +
		"	}\n" +
		"\n" +
		"	const data: Member[] = [\n" +
		"		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinedAt: '2023-01-15' },\n" +
		"		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', joinedAt: '2023-03-22' },\n" +
		"		{ id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', joinedAt: '2023-05-10' },\n" +
		"		{ id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', joinedAt: '2023-06-01' },\n" +
		"		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', joinedAt: '2023-07-14' },\n" +
		"		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', joinedAt: '2023-08-20' },\n" +
		"		{ id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', joinedAt: '2023-09-05' },\n" +
		"		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30' }\n" +
		"	];\n" +
		"\n" +
		"	const columns: ColumnDef\u003cMember\u003e[] = [\n" +
		"		{ accessorKey: 'id', header: 'ID', size: 60 },\n" +
		"		{ accessorKey: 'name', header: 'Name' },\n" +
		"		{ accessorKey: 'email', header: 'Email' },\n" +
		"		{ accessorKey: 'role', header: 'Role', size: 100 },\n" +
		"		{ accessorKey: 'joinedAt', header: 'Joined', size: 120 }\n" +
		"	];\n" +
		"\n" +
		"	let sorting = $state\u003cSortingState\u003e([]);\n" +
		"\n" +
		"	let options = $state\u003cTableOptions\u003cMember\u003e\u003e({\n" +
		"		data,\n" +
		"		columns,\n" +
		"		state: {\n" +
		"			get sorting() { return sorting; }\n" +
		"		},\n" +
		"		onSortingChange(updater) {\n" +
		"			sorting = typeof updater === 'function' ? updater(sorting) : updater;\n" +
		"		},\n" +
		"		getCoreRowModel: getCoreRowModel(),\n" +
		"		getSortedRowModel: getSortedRowModel()\n" +
		"	});\n" +
		"\n" +
		"	const table = createSvelteTable(options);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.8 — Basic TanStack Table\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eTanStack Table\u003c/strong\u003e is a headless table library — it manages the data logic\n" +
		"		(sorting, filtering, pagination) while you control the rendering. In Svelte 5, you use\n" +
		"		\u003ccode\u003ecreateSvelteTable\u003c/code\u003e with a reactive \u003ccode\u003e$state\u003c/code\u003e options object.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSetup Pattern\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003eimport &#123; createSvelteTable, flexRender,\n" +
		"  getCoreRowModel &#125; from '@tanstack/svelte-table';\n" +
		"import type &#123; ColumnDef, TableOptions &#125;\n" +
		"  from '@tanstack/svelte-table';\n" +
		"\n" +
		"const columns: ColumnDef&lt;Member&gt;[] = [ ... ];\n" +
		"\n" +
		"let options = $state&lt;TableOptions&lt;Member&gt;&gt;(&#123;\n" +
		"  data,\n" +
		"  columns,\n" +
		"  getCoreRowModel: getCoreRowModel()\n" +
		"&#125;);\n" +
		"\n" +
		"const table = createSvelteTable(options);\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Table (click headers to sort)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"table-wrapper\"\u003e\n" +
		"			\u003ctable\u003e\n" +
		"				\u003cthead\u003e\n" +
		"					{#each $table.getHeaderGroups() as headerGroup}\n" +
		"						\u003ctr\u003e\n" +
		"							{#each headerGroup.headers as header}\n" +
		"								\u003cth\n" +
		"									style:width=\"{header.getSize()}px\"\n" +
		"									onclick={header.column.getToggleSortingHandler()}\n" +
		"									class:sortable={header.column.getCanSort()}\n" +
		"								\u003e\n" +
		"									{#if !header.isPlaceholder}\n" +
		"										{@const Rendered = flexRender(header.column.columnDef.header, header.getContext())}\n" +
		"										{#if typeof Rendered === 'string'}\n" +
		"											{Rendered}\n" +
		"										{:else if Rendered}\n" +
		"											\u003cRendered /\u003e\n" +
		"										{/if}\n" +
		"										{#if header.column.getIsSorted() === 'asc'}\n" +
		"											\u003cspan class=\"sort-indicator\"\u003e &#9650;\u003c/span\u003e\n" +
		"										{:else if header.column.getIsSorted() === 'desc'}\n" +
		"											\u003cspan class=\"sort-indicator\"\u003e &#9660;\u003c/span\u003e\n" +
		"										{/if}\n" +
		"									{/if}\n" +
		"								\u003c/th\u003e\n" +
		"							{/each}\n" +
		"						\u003c/tr\u003e\n" +
		"					{/each}\n" +
		"				\u003c/thead\u003e\n" +
		"				\u003ctbody\u003e\n" +
		"					{#each $table.getRowModel().rows as row}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>11.8 — Basic TanStack Table</h1>

	<p class="concept">
		<strong>TanStack Table</strong> is a headless table library — it manages the data logic
		(sorting, filtering, pagination) while you control the rendering. In Svelte 5, you use
		<code>createSvelteTable</code> with a reactive <code>$state</code> options object.
	</p>

	<h3>Setup Pattern</h3>
	<div class="build">
		<pre><code>import &#123; createSvelteTable, flexRender,
  getCoreRowModel &#125; from '@tanstack/svelte-table';
import type &#123; ColumnDef, TableOptions &#125;
  from '@tanstack/svelte-table';

const columns: ColumnDef&lt;Member&gt;[] = [ ... ];

let options = $state&lt;TableOptions&lt;Member&gt;&gt;(&#123;
  data,
  columns,
  getCoreRowModel: getCoreRowModel()
&#125;);

const table = createSvelteTable(options);</code></pre>
	</div>

	<h3>Live Table (click headers to sort)</h3>
	<div class="build">
		<div class="table-wrapper">
			<table>
				<thead>
					{#each $table.getHeaderGroups() as headerGroup}
						<tr>
							{#each headerGroup.headers as header}
								<th
									style:width="{header.getSize()}px"
									onclick={header.column.getToggleSortingHandler()}
									class:sortable={header.column.getCanSort()}
								>
									{#if !header.isPlaceholder}
										{@const Rendered = flexRender(header.column.columnDef.header, header.getContext())}
										{#if typeof Rendered === 'string'}
											{Rendered}
										{:else if Rendered}
											<Rendered />
										{/if}
										{#if header.column.getIsSorted() === 'asc'}
											<span class="sort-indicator"> &#9650;</span>
										{:else if header.column.getIsSorted() === 'desc'}
											<span class="sort-indicator"> &#9660;</span>
										{/if}
									{/if}
								</th>
							{/each}
						</tr>
					{/each}
				</thead>
				<tbody>
					<!-- animate:flip — rows animate smoothly when sort order changes -->
					{#each $table.getRowModel().rows as row (row.id)}
						<tr animate:flip={{ duration: 250 }}>
							{#each row.getVisibleCells() as cell}
								<td>
									{#if true}
										{@const Rendered = flexRender(cell.column.columnDef.cell, cell.getContext())}
										{#if typeof Rendered === 'string'}
											{Rendered}
										{:else if Rendered}
											<Rendered />
										{/if}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>TanStack Table is headless — you own all the HTML and styling</li>
		<li><code>createSvelteTable</code> returns a reactive table instance</li>
		<li><code>flexRender</code> returns a snippet or string — check with <code>typeof</code></li>
		<li>Column defs describe data access, headers, and sizing</li>
		<li>Sorting is opt-in via <code>getSortedRowModel</code> and sorting state</li>
	</ul>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>getCoreRowModel: getCoreRowModel()</code> from the options.</strong> The table instance throws immediately because the core row model is required for any rendering to work, proving it is the mandatory foundation for all other row models.</li>
		<li><strong>Remove <code>getSortedRowModel</code> but keep the sorting state and click handlers.</strong> Clicking a header still toggles the sorting state internally, but the rows never visually reorder because there is no sorted row model to apply the sort.</li>
		<li><strong>Use <code>flexRender</code> output directly in the template without the <code>typeof</code> check.</strong> When the header is a plain string, Svelte tries to instantiate it as a component and throws an error because strings are not valid Svelte components.</li>
		<li><strong>Misspell an <code>accessorKey</code> in a column definition (e.g. <code>'namee'</code> instead of <code>'name'</code>).</strong> The column renders empty cells because the accessor cannot find the property on the data objects, but no error is thrown at runtime.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">TanStack Table is a headless library: it manages data operations like sorting and filtering, but you own every line of HTML and CSS. In Svelte 5 you create a table with <code>createSvelteTable</code>, passing a reactive <code>$state</code> options object. The returned store provides methods to iterate over header groups, rows, and cells.</p>
	<p class="prose"><code>flexRender</code> is the bridge between TanStack's renderer system and Svelte's template model. It returns either a plain string or a Svelte snippet, so you must check <code>typeof Rendered === 'string'</code> before deciding whether to render it as text or instantiate it as a component.</p>
	<p class="prose">Column definitions describe how to access data (<code>accessorKey</code>), what to display in the header, and optional sizing. Sorting is opt-in: you add <code>getSortedRowModel()</code> to the options and wire up a <code>sorting</code> state with its <code>onSortingChange</code> callback. This composable architecture means you only pay for the features you use.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-11/11-9-tanstack-features">11.9 — Sorting, Filtering, Pagination</a> — layer more features onto the headless table.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.table-wrapper {
		overflow-x: auto;
	}
	table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: 0.9em;
	}
	th, td {
		padding: var(--space-sm) var(--space-md);
		text-align: left;
		border-block-end: 1px solid var(--color-border);
	}
	th {
		background: var(--color-surface-2);
		font-weight: 600;
		color: var(--color-text);
		white-space: nowrap;
	}
	th.sortable {
		cursor: pointer;
		user-select: none;
	}
	th.sortable:hover {
		background: var(--color-border);
	}
	td {
		color: var(--color-text-muted);
	}
	tr:hover td {
		background: var(--color-surface-2);
	}
	.sort-indicator {
		font-size: 0.7em;
		color: var(--color-primary);
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
