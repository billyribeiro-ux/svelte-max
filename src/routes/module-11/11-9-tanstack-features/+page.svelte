<script lang="ts">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions, SortingState } from '@tanstack/svelte-table';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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
		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30' },
		{ id: 9, name: 'Iris Chen', email: 'iris@example.com', role: 'Admin', joinedAt: '2023-11-12' },
		{ id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Editor', joinedAt: '2023-12-01' },
		{ id: 11, name: 'Kim Park', email: 'kim@example.com', role: 'Viewer', joinedAt: '2024-01-08' },
		{ id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Admin', joinedAt: '2024-02-14' }
	];

	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'id', header: 'ID', size: 60 },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role', size: 100 },
		{ accessorKey: 'joinedAt', header: 'Joined', size: 120 }
	];

	let sorting = $state<SortingState>([]);
	let globalFilter = $state('');

	let options = $state<TableOptions<Member>>({
		data,
		columns,
		state: {
			get sorting() { return sorting; },
			get globalFilter() { return globalFilter; }
		},
		onSortingChange(updater) {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		onGlobalFilterChange(updater) {
			globalFilter = typeof updater === 'function' ? updater(globalFilter) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageSize: 5, pageIndex: 0 }
		}
	});

	const table = createSvelteTable(options);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import {\n" +
		"		createSvelteTable,\n" +
		"		flexRender,\n" +
		"		getCoreRowModel,\n" +
		"		getSortedRowModel,\n" +
		"		getFilteredRowModel,\n" +
		"		getPaginationRowModel\n" +
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
		"		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30' },\n" +
		"		{ id: 9, name: 'Iris Chen', email: 'iris@example.com', role: 'Admin', joinedAt: '2023-11-12' },\n" +
		"		{ id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Editor', joinedAt: '2023-12-01' },\n" +
		"		{ id: 11, name: 'Kim Park', email: 'kim@example.com', role: 'Viewer', joinedAt: '2024-01-08' },\n" +
		"		{ id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Admin', joinedAt: '2024-02-14' }\n" +
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
		"	let globalFilter = $state('');\n" +
		"\n" +
		"	let options = $state\u003cTableOptions\u003cMember\u003e\u003e({\n" +
		"		data,\n" +
		"		columns,\n" +
		"		state: {\n" +
		"			get sorting() { return sorting; },\n" +
		"			get globalFilter() { return globalFilter; }\n" +
		"		},\n" +
		"		onSortingChange(updater) {\n" +
		"			sorting = typeof updater === 'function' ? updater(sorting) : updater;\n" +
		"		},\n" +
		"		onGlobalFilterChange(updater) {\n" +
		"			globalFilter = typeof updater === 'function' ? updater(globalFilter) : updater;\n" +
		"		},\n" +
		"		getCoreRowModel: getCoreRowModel(),\n" +
		"		getSortedRowModel: getSortedRowModel(),\n" +
		"		getFilteredRowModel: getFilteredRowModel(),\n" +
		"		getPaginationRowModel: getPaginationRowModel(),\n" +
		"		initialState: {\n" +
		"			pagination: { pageSize: 5, pageIndex: 0 }\n" +
		"		}\n" +
		"	});\n" +
		"\n" +
		"	const table = createSvelteTable(options);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.9 — Sorting, Filtering, Pagination\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		TanStack Table's power comes from composable \u003cstrong\u003erow models\u003c/strong\u003e. Adding\n" +
		"		\u003ccode\u003egetSortedRowModel\u003c/code\u003e, \u003ccode\u003egetFilteredRowModel\u003c/code\u003e, and\n" +
		"		\u003ccode\u003egetPaginationRowModel\u003c/code\u003e layers sorting, search, and paging onto your table\n" +
		"		with minimal code.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Demo\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"toolbar\"\u003e\n" +
		"			\u003cinput\n" +
		"				type=\"text\"\n" +
		"				placeholder=\"Search all columns...\"\n" +
		"				bind:value={globalFilter}\n" +
		"				class=\"search-input\"\n" +
		"			/\u003e\n" +
		"			\u003cspan class=\"row-count\"\u003e\n" +
		"				{$table.getFilteredRowModel().rows.length} of {data.length} rows\n" +
		"			\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
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
		"						\u003ctr\u003e\n" +
		"							{#each row.getVisibleCells() as cell}\n" +
		"								\u003ctd\u003e\n" +
		"									{#if true}\n" +
		"										{@const Rendered = flexRender(cell.column.columnDef.cell, cell.getContext())}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>11.9 — Sorting, Filtering, Pagination</h1>

	<p class="concept">
		TanStack Table's power comes from composable <strong>row models</strong>. Adding
		<code>getSortedRowModel</code>, <code>getFilteredRowModel</code>, and
		<code>getPaginationRowModel</code> layers sorting, search, and paging onto your table
		with minimal code.
	</p>

	<h3>Live Demo</h3>
	<div class="build">
		<div class="toolbar">
			<input
				type="text"
				placeholder="Search all columns..."
				bind:value={globalFilter}
				class="search-input"
			/>
			<span class="row-count">
				{$table.getFilteredRowModel().rows.length} of {data.length} rows
			</span>
		</div>

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
					{#each $table.getRowModel().rows as row}
						<tr>
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
					{:else}
						<tr>
							<td colspan={columns.length} class="no-results">No matching results</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="pagination">
			<button
				onclick={() => $table.previousPage()}
				disabled={!$table.getCanPreviousPage()}
			>
				Previous
			</button>
			<span class="page-info">
				Page {$table.getState().pagination.pageIndex + 1} of {$table.getPageCount()}
			</span>
			<button
				onclick={() => $table.nextPage()}
				disabled={!$table.getCanNextPage()}
			>
				Next
			</button>
		</div>

		<aside class="server-note">
			<strong>Server-side pagination.</strong> This demo uses client-side pagination — all data is
			in memory. For datasets with thousands of rows, implement server-side pagination: your
			<code>load()</code> function accepts a <code>page</code> param, fetches only that page from
			the API, and TanStack Table's <code>manualPagination: true</code> option tells it not to
			slice the data itself.
		</aside>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>Each row model (<code>getSortedRowModel</code>, etc.) is added independently</li>
		<li><code>globalFilter</code> searches across all columns at once</li>
		<li>Pagination state is managed via <code>initialState.pagination</code></li>
		<li><code>table.previousPage()</code> / <code>table.nextPage()</code> handle navigation</li>
		<li><code>getCanPreviousPage()</code> / <code>getCanNextPage()</code> disable buttons at boundaries</li>
		<li>For large datasets, use <code>manualPagination: true</code> and fetch pages from the server in your <code>load()</code> function</li>
	</ul>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>getFilteredRowModel</code> and <code>globalFilter</code> add cross-column search with minimal code.</li>
		<li><code>getPaginationRowModel</code> slices data into pages controlled by <code>previousPage()</code> and <code>nextPage()</code>.</li>
		<li>For large datasets, <code>manualPagination: true</code> delegates slicing to the server via your <code>load()</code> function.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.toolbar {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.search-input {
		flex: 1;
		min-width: 200px;
		padding: var(--space-sm) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-size: 0.9em;
	}
	.row-count {
		font-size: 0.85em;
		color: var(--color-text-muted);
		white-space: nowrap;
	}
	.table-wrapper {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9em;
	}
	th, td {
		padding: var(--space-sm) var(--space-md);
		text-align: left;
		border-bottom: 1px solid var(--color-border);
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
	.no-results {
		text-align: center;
		color: var(--color-text-muted);
		font-style: italic;
		padding: var(--space-lg);
	}
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
	}
	button {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-primary);
		color: var(--color-surface-1);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}
	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.page-info {
		font-size: 0.9em;
		color: var(--color-text-muted);
	}
	.server-note {
		border-left: 4px solid var(--color-warning);
		background: var(--color-surface-2);
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		font-size: 0.9em;
		line-height: 1.6;
		color: var(--color-text-muted);
	}
	.server-note strong {
		color: var(--color-text);
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
