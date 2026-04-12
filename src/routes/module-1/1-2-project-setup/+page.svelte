<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	interface ProjectInfo {
		packageManager: string;
		svelte: string;
		kit: string;
		vite: string;
		typescript: string;
		strict: string;
	}

	const info: ProjectInfo = {
		packageManager: 'pnpm 9+',
		svelte: '5.55+',
		kit: '2.55+',
		vite: '7',
		typescript: '5',
		strict: 'true'
	};

	/* ── Complete page code ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // An 'interface' defines the shape of an object.\n" +
		"  // Think of it as a form with labeled blanks:\n" +
		"  // every blank has a name and a type.\n" +
		"  interface ProjectInfo {\n" +
		"    packageManager: string;  // text — the name of our package manager\n" +
		"    svelte: string;          // text — the Svelte version\n" +
		"    kit: string;             // text — the SvelteKit version\n" +
		"    vite: string;            // text — the Vite version\n" +
		"    typescript: string;      // text — the TypeScript version\n" +
		"    strict: string;          // text — whether strict mode is on\n" +
		"  }\n" +
		"\n" +
		"  // Create an object that matches the interface shape.\n" +
		"  // Every field must be present with the correct type.\n" +
		"  const info: ProjectInfo = {\n" +
		"    packageManager: 'pnpm 9+',\n" +
		"    svelte: '5.55+',\n" +
		"    kit: '2.55+',\n" +
		"    vite: '7',\n" +
		"    typescript: '5',\n" +
		"    strict: 'true'\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e1.2 — Project setup\u003c/h1\u003e\n" +
		"\n" +
		"  \u003carticle class=\"card\"\u003e\n" +
		"    \u003ch2\u003eThis project\u003c/h2\u003e\n" +
		"    \u003cdl\u003e\n" +
		"      \u003cdt\u003ePackage manager\u003c/dt\u003e\n" +
		"      \u003cdd\u003e{info.packageManager}\u003c/dd\u003e\n" +
		"      \u003c!-- ...more fields... --\u003e\n" +
		"    \u003c/dl\u003e\n" +
		"  \u003c/article\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  .card {\n" +
		"    background: var(--color-surface-2);  /* subtle grey background */\n" +
		"    color: var(--color-text);            /* dark text for readability */\n" +
		"    padding: var(--space-lg);            /* inner spacing — fluid 1.5-2.5rem */\n" +
		"    border-radius: var(--radius-lg);     /* rounded corners — 1rem */\n" +
		"    margin-block: var(--space-xl);       /* vertical spacing — fluid 2-4rem */\n" +
		"    max-width: 36rem;                    /* limit card width */\n" +
		"  }\n" +
		"\n" +
		"  .card h2 {\n" +
		"    margin: 0 0 var(--space-md) 0;       /* space below heading */\n" +
		"    color: var(--color-brand);            /* purple heading */\n" +
		"    font-size: var(--text-lg);            /* fluid 1.125-1.5rem */\n" +
		"  }\n" +
		"\n" +
		"  .card dl {\n" +
		"    display: grid;                        /* grid layout for label/value pairs */\n" +
		"    grid-template-columns: 1fr;           /* single column on mobile */\n" +
		"    gap: var(--space-xs) var(--space-md); /* row and column gap */\n" +
		"    margin: 0;                            /* remove default dl margin */\n" +
		"  }\n" +
		"\n" +
		"  .card dt {\n" +
		"    font-weight: 600;                     /* bold labels */\n" +
		"    color: var(--color-text-muted);        /* muted label color */\n" +
		"  }\n" +
		"\n" +
		"  .card dd {\n" +
		"    margin: 0 0 var(--space-sm) 0;        /* space below each value */\n" +
		"    color: var(--color-text);              /* standard text color */\n" +
		"    font-family: var(--font-mono, monospace); /* monospace for versions */\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Config file snippets ── */
	const packageJsonCode = "{\n" +
		"  \"name\": \"svelte-max\",\n" +
		"  \"private\": true,\n" +
		"  \"type\": \"module\",\n" +
		"  \"scripts\": {\n" +
		"    \"dev\": \"vite dev\",         // starts the development server\n" +
		"    \"build\": \"vite build\",     // creates production-ready files\n" +
		"    \"preview\": \"vite preview\", // previews the production build locally\n" +
		"    \"check\": \"svelte-check\"    // runs the Svelte type checker\n" +
		"  },\n" +
		"  \"devDependencies\": {\n" +
		"    \"@sveltejs/kit\": \"^2.55\",\n" +
		"    \"svelte\": \"^5.55\",\n" +
		"    \"typescript\": \"^5\",\n" +
		"    \"vite\": \"^7\"\n" +
		"  }\n" +
		"}";

	const tsconfigCode = "{\n" +
		"  \"compilerOptions\": {\n" +
		"    \"strict\": true,           // CRITICAL: enables ALL TypeScript safety checks\n" +
		"    \"target\": \"ESNext\",       // output modern JavaScript\n" +
		"    \"module\": \"ESNext\",       // use ES module imports/exports\n" +
		"    \"moduleResolution\": \"bundler\", // let Vite handle module resolution\n" +
		"    \"verbatimModuleSyntax\": true     // enforce 'import type' for type-only imports\n" +
		"  }\n" +
		"}";

	const svelteConfigCode = "import adapter from '@sveltejs/adapter-auto';\n" +
		"import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';\n" +
		"\n" +
		"/** @type {import('@sveltejs/kit').Config} */\n" +
		"const config = {\n" +
		"  preprocess: vitePreprocess(), // enables TypeScript + CSS preprocessing\n" +
		"  kit: {\n" +
		"    adapter: adapter()           // auto-detects deployment platform\n" +
		"  }\n" +
		"};\n" +
		"\n" +
		"export default config;";

	/* ── Step snippets ── */
	const stepPnpm = "# Install all dependencies listed in package.json\n" +
		"pnpm install\n" +
		"\n" +
		"# Start the development server\n" +
		"pnpm dev\n" +
		"\n" +
		"# pnpm is like a supplier that delivers building materials.\n" +
		"# It reads package.json to know what to deliver,\n" +
		"# then stores them in node_modules/.pnpm/ (a central warehouse).";

	const stepVite = "# When you run 'pnpm dev', Vite starts a local server.\n" +
		"# It serves your files at http://localhost:5173\n" +
		"# and watches for changes — when you save a file,\n" +
		"# the browser updates INSTANTLY (Hot Module Replacement).\n" +
		"\n" +
		"# For production, Vite bundles everything:\n" +
		"pnpm build\n" +
		"# Output goes to .svelte-kit/output/";

	const stepRouting = "src/\n" +
		"  routes/\n" +
		"    +page.svelte          -> http://localhost:5173/\n" +
		"    module-1/\n" +
		"      1-1-hello-compiled/\n" +
		"        +page.svelte      -> /module-1/1-1-hello-compiled\n" +
		"      1-2-project-setup/\n" +
		"        +page.svelte      -> /module-1/1-2-project-setup\n" +
		"\n" +
		"  lib/\n" +
		"    components/            -> reusable components (CodeCanvas, etc.)\n" +
		"  app.css                  -> global styles (layers + tokens)";

	/* ── Common mistake ── */
	const mistakeWrong = "# WRONG: trying to start the dev server without installing first\n" +
		"$ pnpm dev\n" +
		"Error: Cannot find module '@sveltejs/kit'\n" +
		"\n" +
		"# The dependencies haven't been downloaded yet!";

	const mistakeRight = "# CORRECT: always install first, then run\n" +
		"$ pnpm install   # downloads all dependencies\n" +
		"$ pnpm dev        # now the dev server can start";

	/* ── Practice ── */
	const practiceStarter = "interface ProjectInfo {\n" +
		"  packageManager: string;\n" +
		"  svelte: string;\n" +
		"  kit: string;\n" +
		"  vite: string;\n" +
		"  typescript: string;\n" +
		"  strict: string;\n" +
		"  // Add runtime: string here\n" +
		"}\n\n" +
		"const info: ProjectInfo = {\n" +
		"  packageManager: 'pnpm 9+',\n" +
		"  svelte: '5.55+',\n" +
		"  kit: '2.55+',\n" +
		"  vite: '7',\n" +
		"  typescript: '5',\n" +
		"  strict: 'true',\n" +
		"  // Add runtime field here\n" +
		"};";

	const practiceExpected: readonly string[] = [
		'runtime: string',
		"runtime:"
	];

	const practiceHints: readonly string[] = [
		"Add 'runtime: string;' inside the interface, and 'runtime: \"Node 22\"' inside the object.",
		"Make sure the field name is exactly 'runtime' with a lowercase r."
	];
</script>

<section class="page">
	<!-- 1. TITLE + LEARNING OBJECTIVES -->
	<h1>1.2 — Project setup</h1>

	<ul class="objectives">
		<li>Understand what <strong>pnpm</strong> does and why we use it.</li>
		<li>Know what <strong>Vite</strong> is and how Hot Module Replacement works.</li>
		<li>Understand <strong>TypeScript strict mode</strong> and why it is on.</li>
		<li>Navigate the <strong>SvelteKit file structure</strong> and know how routing works.</li>
	</ul>

	<!-- 2. WHY THIS MATTERS -->
	<h2>Why this matters</h2>

	<div class="analogy">
		<p>
			<strong>Analogy:</strong> A project is like a house. <strong>pnpm</strong> is the supplier that
			delivers building materials (libraries your code depends on). <strong>Vite</strong> is the
			construction crew that builds and rebuilds instantly when you change blueprints. <strong>TypeScript</strong>
			is the building inspector who catches mistakes before anyone moves in.
		</p>
	</div>

	<p class="concept">
		Before you write a single component, you need to understand the tools that power your project.
		<strong>pnpm</strong> (performant npm) is a package manager — it downloads and manages the libraries
		your project depends on. <strong>Vite</strong> (French for "fast") is the development server and
		production bundler — it serves your code locally and compiles it for deployment. <strong>SvelteKit</strong>
		is the application framework built on top of Svelte — it provides file-based routing (every file
		becomes a URL), server-side rendering, and more. <strong>TypeScript</strong> in strict mode means
		every variable must have a known type, and the compiler catches errors before they reach the browser.
	</p>

	<!-- 3. THE COMPLETE CODE -->
	<h2>The complete code</h2>
	<p class="concept">
		This lesson is unique: besides the page component, you also need to understand three configuration files.
	</p>
	<CodeCanvas filename="+page.svelte" code={fullCode} />
	<CodeCanvas filename="package.json (abbreviated)" code={packageJsonCode} />
	<CodeCanvas filename="tsconfig.json (key settings)" code={tsconfigCode} />
	<CodeCanvas filename="svelte.config.js" code={svelteConfigCode} />

	<!-- 4. STEP-BY-STEP WALKTHROUGH -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1: pnpm — your package manager</h3>
	<p class="concept">
		When you clone a project, the first thing you run is <code>pnpm install</code>. This reads
		<code>package.json</code> to find every library the project needs, downloads them, and stores them
		in a <code>node_modules</code> folder. Unlike npm, pnpm uses a content-addressable store — if two
		projects need the same library, it only stores one copy on disk. This saves space and speeds up installs.
	</p>
	<CodeCanvas filename="Terminal" code={stepPnpm} />

	<h3>Step 2: Vite — your dev server and bundler</h3>
	<p class="concept">
		Vite serves your project at <code>http://localhost:5173</code>. When you save a file, Vite detects
		the change and sends just the updated module to your browser — this is called <strong>Hot Module
		Replacement (HMR)</strong>. You see changes in milliseconds without a full page reload. For
		production, Vite bundles your code into optimized files using Rollup.
	</p>
	<CodeCanvas filename="Terminal" code={stepVite} />

	<h3>Step 3: SvelteKit file-based routing</h3>
	<p class="concept">
		In SvelteKit, every <code>+page.svelte</code> file under <code>src/routes/</code> automatically
		becomes a URL. No router configuration needed — the folder structure IS the router. If you create
		<code>src/routes/about/+page.svelte</code>, you get a page at <code>/about</code>.
	</p>
	<CodeCanvas filename="File structure → URLs" code={stepRouting} />

	<!-- 5. SEE IT IN ACTION -->
	<h2>See it in action</h2>
	<p class="concept">
		Below is the live project info card. Every value comes from the <code>ProjectInfo</code> interface
		— an interface is like a form that defines what fields an object must have and what type each field
		holds.
	</p>

	<article class="card">
		<h2>This project</h2>
		<dl>
			<dt>Package manager</dt>
			<dd>{info.packageManager}</dd>
			<dt>Svelte</dt>
			<dd>{info.svelte}</dd>
			<dt>SvelteKit</dt>
			<dd>{info.kit}</dd>
			<dt>Vite</dt>
			<dd>{info.vite}</dd>
			<dt>TypeScript</dt>
			<dd>{info.typescript}</dd>
			<dt>Strict mode</dt>
			<dd>{info.strict}</dd>
		</dl>
	</article>

	<div class="build">
		<h3>Verify your setup</h3>
		<ul>
			<li>Open a terminal and run: <code>pnpm -v</code> (should show 9+).</li>
			<li>Run: <code>node -v</code> (should show 22+).</li>
			<li>Run: <code>pnpm dev</code> (should show a Vite dev server URL like <code>http://localhost:5173</code>).</li>
			<li>Open <code>tsconfig.json</code> and confirm <code>strict: true</code>.</li>
		</ul>
	</div>

	<!-- 6. YOUR TURN -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge="Add a new field runtime: string to the ProjectInfo interface and set its value to 'Node 22' in the object."
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. MORE EXAMPLES -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1: Reading package.json scripts</summary>
		<p class="detail-text">
			The <code>"scripts"</code> section in <code>package.json</code> defines commands you can run.
			<code>pnpm dev</code> runs <code>vite dev</code>, <code>pnpm build</code> runs
			<code>vite build</code>. These are just shortcuts so you do not have to type the full command.
		</p>
	</details>

	<details>
		<summary>Example 2: What strict: true actually checks</summary>
		<p class="detail-text">
			TypeScript strict mode enables these checks: <code>noImplicitAny</code> (every variable must
			have a type), <code>strictNullChecks</code> (you must handle null/undefined), and
			<code>strictFunctionTypes</code> (function parameter types must match exactly). Without strict
			mode, TypeScript lets many bugs slip through.
		</p>
	</details>

	<details>
		<summary>Example 3: Adding a new route</summary>
		<p class="detail-text">
			To add a new page, create <code>src/routes/about/+page.svelte</code> with any content.
			Restart the dev server (<code>pnpm dev</code>) and visit <code>/about</code>. SvelteKit
			automatically creates the route from the file path.
		</p>
	</details>

	<!-- 8. COMMON MISTAKES -->
	<h2>Common mistakes</h2>

	<div class="mistake-pair">
		<div class="mistake wrong">
			<h4>Wrong</h4>
			<CodeCanvas filename="Terminal" code={mistakeWrong} />
			<p>Running <code>pnpm dev</code> before <code>pnpm install</code> means dependencies are missing.</p>
		</div>
		<div class="mistake right">
			<h4>Right</h4>
			<CodeCanvas filename="Terminal" code={mistakeRight} />
			<p>Always run <code>pnpm install</code> first to download all dependencies.</p>
		</div>
	</div>

	<!-- 9. HAVING ISSUES? COMPLETE CODE -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- 10. WHAT YOU LEARNED -->
	<h3>What you learned</h3>
	<ul>
		<li><strong>pnpm</strong> gives you fast, deduplicated installs.</li>
		<li><strong>Vite</strong> is the dev server and the production bundler with instant HMR.</li>
		<li><strong>SvelteKit</strong> turns <code>src/routes</code> into URLs — no config.</li>
		<li><strong>TypeScript strict mode</strong> catches bugs before the browser does.</li>
		<li>An <strong>interface</strong> defines the shape of an object — what fields it has and their types.</li>
	</ul>

	<!-- 10. NEXT STEPS -->
	<p class="next">
		<strong>Next:</strong> <a href="/module-1/1-3-three-blocks">1.3 — The three blocks</a> — learn the
		three parts of every Svelte component.
	</p>
</section>

<style>
	/* ── Objectives list ── */
	.objectives {
		color: var(--color-text);        /* standard text color */
		line-height: 1.8;               /* generous line spacing */
		padding-inline-start: var(--space-lg);  /* indent from the left */
	}

	/* ── Analogy callout box ── */
	.analogy {
		background: var(--color-surface-2);            /* subtle background */
		border-inline-start: 4px solid var(--color-warning);   /* yellow accent bar */
		padding: var(--space-md);                      /* inner spacing */
		border-radius: var(--radius-md);               /* rounded corners */
		margin-block: var(--space-md);                 /* vertical spacing */
		max-inline-size: 60ch;                               /* readable line length */

		& p {
			margin: 0;                                 /* remove default margin */
			line-height: 1.6;                         /* comfortable line height */
			color: var(--color-text);                  /* standard text color */
		}
	}

	/* ── Concept paragraph ── */
	.concept {
		color: var(--color-text-muted);  /* muted text for explanatory prose */
		max-inline-size: 60ch;                 /* 60-character line length for readability */
		line-height: 1.6;               /* comfortable spacing */
	}

	/* ── Project info card ── */
	.card {
		background: var(--color-surface-2);  /* subtle grey background */
		color: var(--color-text);            /* dark text */
		padding: var(--space-lg);            /* inner spacing — fluid 1.5-2.5rem */
		border-radius: var(--radius-lg);     /* rounded corners — 1rem */
		margin-block: var(--space-xl);       /* vertical margin — fluid 2-4rem */
		max-inline-size: 36rem;                    /* limit card width */

		& h2 {
			margin: 0 0 var(--space-md) 0;   /* space below heading only */
			color: var(--color-brand);       /* purple heading */
			font-size: var(--text-lg);       /* fluid 1.125-1.5rem */
		}

		& dl {
			display: grid;                        /* grid for label/value pairs */
			grid-template-columns: 1fr;           /* single column on mobile */
			gap: var(--space-xs) var(--space-md); /* row and column gap */
			margin: 0;                            /* remove default dl margin */

			@media (min-inline-size: 768px) {
				grid-template-columns: max-content 1fr; /* label column + value column */
			}
		}

		& dt {
			font-weight: 600;                  /* bold labels */
			color: var(--color-text-muted);    /* muted color for labels */
		}

		& dd {
			margin: 0 0 var(--space-sm) 0;                 /* space below each value */
			color: var(--color-text);                      /* standard text */
			font-family: var(--font-mono, monospace);      /* monospace for version numbers */
		}
	}

	/* ── Build verification box ── */
	.build {
		background: var(--color-surface-2);  /* subtle background */
		padding: var(--space-md);            /* inner spacing */
		border-radius: var(--radius-md);     /* rounded corners */
		max-inline-size: 60ch;                     /* readable width */
		margin-block: var(--space-md);       /* vertical spacing */

		& h3 {
			margin: 0 0 var(--space-sm) 0;   /* space below heading */
			font-size: var(--text-lg);       /* slightly larger */
		}
	}

	/* ── Mistake comparison ── */
	.mistake-pair {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		margin-block: var(--space-md);

		@media (min-inline-size: 768px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.mistake {
		padding: var(--space-md);
		border-radius: var(--radius-md);

		& h4 {
			margin: 0 0 var(--space-sm) 0;
			text-transform: uppercase;
			font-size: var(--text-sm);
			letter-spacing: 0.08em;
		}

		& p {
			margin-block-start: var(--space-sm);
			font-size: var(--text-sm);
			line-height: 1.5;
		}
	}

	.wrong {
		background: oklch(95% 0.03 25);
		& h4 { color: var(--color-error); }
	}

	.right {
		background: oklch(95% 0.03 145);
		& h4 { color: var(--color-success); }
	}

	/* ── Next-step link ── */
	.next {
		margin-block-start: var(--space-xl);
		color: var(--color-text);
	}

	/* ── Details elements ── */
	details {
		margin-block: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	summary {
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		color: var(--color-brand);
		cursor: pointer;
		background: var(--color-surface-2);
	}

	details[open] > summary {
		border-block-end: 1px solid var(--color-border);
	}

	.detail-text {
		padding: var(--space-md);        /* inner spacing for example text */
		color: var(--color-text);        /* standard text color */
		line-height: 1.6;               /* comfortable reading */
		margin: 0;                       /* remove default margin */

		& code {
			color: var(--color-brand);   /* brand-colored code highlights */
		}
	}

	/* ── General list styling ── */
	ul {
		color: var(--color-text);
		line-height: 1.8;

		& code {
			color: var(--color-brand);
		}
	}
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
		.analogy, .concept { max-inline-size: 65ch; }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.analogy, .concept { max-inline-size: 72ch; }
		.mistake-pair { grid-template-columns: 1fr 1fr; }
	}

	@media (min-inline-size: 1024px) {
		.analogy, .concept { max-inline-size: 80ch; }
	}
</style>
