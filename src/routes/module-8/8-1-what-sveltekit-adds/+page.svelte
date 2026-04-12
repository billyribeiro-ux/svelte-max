<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface FileRole {
		path: string;
		role: string;
	}

	const files: FileRole[] = [
		{ path: 'src/app.html', role: 'HTML template SvelteKit injects rendered markup into. Has %sveltekit.head% and %sveltekit.body% placeholders.' },
		{ path: 'src/app.d.ts', role: 'Ambient type declarations — defines App.Locals, App.PageData, App.Error for type-safe load functions and hooks.' },
		{ path: 'src/app.css', role: 'Global stylesheet imported by the root layout. Where you put design tokens and resets.' },
		{ path: 'src/routes/+layout.svelte', role: 'Root layout — wraps every page. Renders children with {@render children()}. Holds shared chrome like nav.' },
		{ path: 'src/routes/+page.svelte', role: 'The component rendered at /. Every folder can have its own +page.svelte.' },
		{ path: 'src/routes/.../+page.ts', role: 'Universal load function. Runs on server for SSR, then on client for navigation. No secrets here.' },
		{ path: 'src/routes/.../+page.server.ts', role: 'Server-only load. Runs exclusively on the server. Safe for DB queries, secrets, private APIs.' },
		{ path: 'src/routes/.../+server.ts', role: 'API endpoint. Exports GET/POST/PUT/DELETE handlers. Returns a Response.' },
		{ path: 'src/hooks.server.ts', role: 'Server hooks — handle intercepts every request. Where you attach auth to event.locals.' },
		{ path: 'src/lib/', role: 'Shared code folder. Import with $lib/... alias from anywhere.' },
		{ path: 'svelte.config.js', role: 'SvelteKit configuration — adapter, preprocess, kit options like alias and paths.' },
		{ path: 'vite.config.ts', role: 'Vite build config. SvelteKit is a Vite plugin — this is where you add other plugins.' }
	];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface FileRole {\n" +
		"\t\tpath: string;\n" +
		"\t\trole: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst files: FileRole[] = [\n" +
		"\t\t{ path: 'src/app.html', role: 'HTML template SvelteKit injects rendered markup into. Has %sveltekit.head% and %sveltekit.body% placeholders.' },\n" +
		"\t\t{ path: 'src/app.d.ts', role: 'Ambient type declarations — defines App.Locals, App.PageData, App.Error for type-safe load functions and hooks.' },\n" +
		"\t\t{ path: 'src/app.css', role: 'Global stylesheet imported by the root layout. Where you put design tokens and resets.' },\n" +
		"\t\t{ path: 'src/routes/+layout.svelte', role: 'Root layout — wraps every page. Renders children with {@render children()}. Holds shared chrome like nav.' },\n" +
		"\t\t{ path: 'src/routes/+page.svelte', role: 'The component rendered at /. Every folder can have its own +page.svelte.' },\n" +
		"\t\t{ path: 'src/routes/.../+page.ts', role: 'Universal load function. Runs on server for SSR, then on client for navigation. No secrets here.' },\n" +
		"\t\t{ path: 'src/routes/.../+page.server.ts', role: 'Server-only load. Runs exclusively on the server. Safe for DB queries, secrets, private APIs.' },\n" +
		"\t\t{ path: 'src/routes/.../+server.ts', role: 'API endpoint. Exports GET/POST/PUT/DELETE handlers. Returns a Response.' },\n" +
		"\t\t{ path: 'src/hooks.server.ts', role: 'Server hooks — handle intercepts every request. Where you attach auth to event.locals.' },\n" +
		"\t\t{ path: 'src/lib/', role: 'Shared code folder. Import with $lib/... alias from anywhere.' },\n" +
		"\t\t{ path: 'svelte.config.js', role: 'SvelteKit configuration — adapter, preprocess, kit options like alias and paths.' },\n" +
		"\t\t{ path: 'vite.config.ts', role: 'Vite build config. SvelteKit is a Vite plugin — this is where you add other plugins.' }\n" +
		"\t];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.1 — What SvelteKit adds to Svelte\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte compiles \u003ccode\u003e.svelte\u003c/code\u003e files into DOM code.\n" +
		"\t\tSvelteKit is the framework around Svelte — routing, SSR, endpoints, hooks, adapters.\n" +
		"\t\tWithout SvelteKit you'd wire up Vite yourself, invent routing conventions, and handle SSR manually.\n" +
		"\t\tWith SvelteKit all of that is baked in.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eProject structure tour\u003c/h3\u003e\n" +
		"\t\t\u003cdl class=\"roles\"\u003e\n" +
		"\t\t\t{#each files as file (file.path)}\n" +
		"\t\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cdt\u003e\u003ccode\u003e{file.path}\u003c/code\u003e\u003c/dt\u003e\n" +
		"\t\t\t\t\t\u003cdd\u003e{file.role}\u003c/dd\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/dl\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eSvelte is the compiler; SvelteKit is the application framework.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSvelteKit gives you file-based routing, SSR, endpoints, hooks, and adapters out of the box.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThe \u003ccode\u003e+page\u003c/code\u003e, \u003ccode\u003e+layout\u003c/code\u003e, \u003ccode\u003e+server\u003c/code\u003e, \u003ccode\u003e+error\u003c/code\u003e prefixes are SvelteKit's conventions, not Svelte's.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esrc/lib/\u003c/code\u003e is the shared code folder — import with the \u003ccode\u003e$lib\u003c/code\u003e alias.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.1 — What SvelteKit adds to Svelte</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte compiles <code>.svelte</code> files into DOM code.
		SvelteKit is the framework around Svelte — routing, SSR, endpoints, hooks, adapters.
		Without SvelteKit you'd wire up Vite yourself, invent routing conventions, and handle SSR manually.
		With SvelteKit all of that is baked in.
	</p>

	<div class="build">
		<h3 class="sub">Project structure tour</h3>
		<dl class="roles">
			{#each files as file (file.path)}
				<div class="row">
					<dt><code>{file.path}</code></dt>
					<dd>{file.role}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these deliberate mistakes to see what SvelteKit does when its conventions are violated. Undo each change before moving to the next.</p>
	<ol class="experiments">
		<li><strong>Rename <code>+page.svelte</code> to <code>page.svelte</code> (drop the <code>+</code> prefix).</strong> SvelteKit ignores files without the <code>+</code> prefix, so navigating to that route will 404. This proves that the plus sign is not decoration — it is the contract between the framework and your code.</li>
		<li><strong>Delete <code>src/routes/+layout.svelte</code> and reload.</strong> Without a root layout SvelteKit falls back to its implicit one, which just renders children. Your global nav and CSS import disappear. This reveals that the root layout is the true entry point for shared chrome.</li>
		<li><strong>Remove the <code>%sveltekit.body%</code> placeholder from <code>src/app.html</code>.</strong> The build will fail because SvelteKit has nowhere to inject the rendered page. The error message names the exact placeholder it expects, confirming that <code>app.html</code> is a template, not a regular HTML file.</li>
		<li><strong>Import a module using a relative path like <code>../../lib/utils</code> instead of <code>$lib/utils</code>.</strong> It works, but if you ever restructure folders the import breaks. Compare this with the <code>$lib</code> alias, which stays stable regardless of nesting depth, demonstrating why SvelteKit provides the alias.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte is a compiler that transforms <code>.svelte</code> files into optimized JavaScript that surgically updates the DOM. SvelteKit is the application framework built on top of that compiler, providing the infrastructure that every non-trivial web application needs: a file-based router, server-side rendering, API endpoints, deployment adapters, and a hook system for cross-cutting concerns like authentication and logging.</p>
	<p class="prose">The <code>+</code> prefix convention is the mechanism SvelteKit uses to distinguish framework-controlled files from regular colocated modules. Files named <code>+page.svelte</code>, <code>+layout.svelte</code>, <code>+server.ts</code>, and <code>+error.svelte</code> each have a precise role in the request lifecycle, and SvelteKit ignores any file that does not match these patterns. This means you can safely place helper components, utilities, and test files alongside your routes without accidentally creating new pages.</p>
	<p class="prose">The <code>src/lib/</code> directory and its <code>$lib</code> import alias form the shared-code boundary for the entire project. Anything placed there is accessible from any route or component via a stable, refactor-proof path, eliminating the fragile relative-import chains that plague large codebases. Combined with <code>app.html</code> as the shell template and <code>svelte.config.js</code> for adapter and preprocessor configuration, these conventions give you a complete application scaffold with zero boilerplate wiring.</p>
	<p class="next">Next, you will see how SvelteKit uses SSR to deliver real HTML on first paint.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.sub { margin-block-start: 0; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.roles { display: flex; flex-direction: column; gap: var(--space-sm); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; }
	dd { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.5; }
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.row { display: grid; grid-template-columns: 14rem 1fr; gap: var(--space-md); align-items: start; }
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
