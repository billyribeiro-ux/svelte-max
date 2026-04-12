<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmdTree = 'my-first-app/\n' +
		'├── package.json          # Project manifest (name, scripts, dependencies)\n' +
		'├── svelte.config.js      # Svelte compiler configuration\n' +
		'├── vite.config.ts        # Vite build tool configuration\n' +
		'├── tsconfig.json         # TypeScript compiler configuration\n' +
		'├── .prettierrc           # Prettier formatting rules\n' +
		'├── eslint.config.js      # ESLint linting rules\n' +
		'├── .gitignore            # Files Git should ignore\n' +
		'├── src/                  # YOUR SOURCE CODE (you work here)\n' +
		'│   ├── app.html          # The HTML shell (one per project)\n' +
		'│   ├── app.d.ts          # TypeScript type declarations\n' +
		'│   ├── lib/              # Reusable code (components, utilities)\n' +
		'│   │   └── index.ts      # Library entry point\n' +
		'│   └── routes/           # File-based routing (pages)\n' +
		'│       └── +page.svelte  # The home page ( / )\n' +
		'└── static/               # Static assets (images, fonts, favicon)';

	const cmdPackageJson = '// package.json — the project manifest\n' +
		'{\n' +
		'  "name": "my-first-app",        // project name (kebab-case)\n' +
		'  "version": "0.0.1",            // version number\n' +
		'  "private": true,               // do not publish to npm\n' +
		'  "scripts": {\n' +
		'    "dev": "vite dev",            // start dev server\n' +
		'    "build": "vite build",        // create production build\n' +
		'    "preview": "vite preview",    // preview production build\n' +
		'    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"\n' +
		'  },\n' +
		'  "devDependencies": {\n' +
		'    "@sveltejs/adapter-auto": "...",  // deployment adapter\n' +
		'    "@sveltejs/kit": "...",            // SvelteKit framework\n' +
		'    "svelte": "...",                   // Svelte compiler\n' +
		'    "typescript": "...",               // TypeScript compiler\n' +
		'    "vite": "..."                      // Build tool\n' +
		'  }\n' +
		'}';

	const cmdSvelteConfig = '// svelte.config.js — Svelte compiler options\n' +
		'import adapter from "@sveltejs/adapter-auto";\n' +
		'import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";\n' +
		'\n' +
		'/** @type {import("@sveltejs/kit").Config} */\n' +
		'const config = {\n' +
		'  preprocess: vitePreprocess(),  // enables TypeScript in .svelte files\n' +
		'  kit: {\n' +
		'    adapter: adapter()           // auto-detects deploy target\n' +
		'  }\n' +
		'};\n' +
		'\n' +
		'export default config;';

	const cmdViteConfig = '// vite.config.ts — Build tool configuration\n' +
		'import { sveltekit } from "@sveltejs/kit/vite";\n' +
		'import { defineConfig } from "vite";\n' +
		'\n' +
		'export default defineConfig({\n' +
		'  plugins: [sveltekit()]  // connects SvelteKit to Vite\n' +
		'});';

	const cmdAppHtml = '<!-- src/app.html — the HTML shell -->\n' +
		'<!doctype html>\n' +
		'<html lang="en">\n' +
		'  <head>\n' +
		'    <meta charset="utf-8" />\n' +
		'    <link rel="icon" href="%sveltekit.assets%/favicon.png" />\n' +
		'    <meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
		'    %sveltekit.head%\n' +
		'  </head>\n' +
		'  <body data-sveltekit-preload-data="hover">\n' +
		'    <div style="display: contents">%sveltekit.body%</div>\n' +
		'  </body>\n' +
		'</html>\n' +
		'\n' +
		'<!-- %sveltekit.head% = SvelteKit injects CSS, fonts, metadata here -->\n' +
		'<!-- %sveltekit.body% = SvelteKit injects your page content here -->';

	const cmdPageSvelte = '<!-- src/routes/+page.svelte — the home page -->\n' +
		'<h1>Welcome to SvelteKit</h1>\n' +
		'<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a></p>\n' +
		'\n' +
		'<!-- This file maps to the URL: / (root of your site) -->\n' +
		'<!-- The + in +page.svelte tells SvelteKit "this is a route" -->';

	const cmdRouting = '# File-based routing — the URL IS the file path\n' +
		'\n' +
		'# src/routes/+page.svelte         → http://localhost:5173/\n' +
		'# src/routes/about/+page.svelte   → http://localhost:5173/about\n' +
		'# src/routes/blog/+page.svelte    → http://localhost:5173/blog\n' +
		'\n' +
		'# No router configuration file. No route registration.\n' +
		'# Create a folder, put +page.svelte in it, done.\n' +
		'# The folder name becomes the URL path.';

	const cmdInstall = '# Step 1: Navigate into your project folder\n' +
		'cd my-first-app\n' +
		'\n' +
		'# Step 2: Install all dependencies\n' +
		'pnpm install\n' +
		'\n' +
		'# This reads package.json, downloads every dependency,\n' +
		'# and creates the node_modules/ folder.\n' +
		'# You learned about this in Lesson 0.6.\n' +
		'\n' +
		'# You will see output like:\n' +
		'# Packages: +150\n' +
		'# +++++++++++++++++++++++++++++++++\n' +
		'# Progress: resolved 150, reused 0, downloaded 150, added 150, done';

	const cmdDev = '# Step 3: Start the development server\n' +
		'pnpm dev\n' +
		'\n' +
		'# You will see output like:\n' +
		'#\n' +
		'#   VITE v5.x.x  ready in 500 ms\n' +
		'#\n' +
		'#   ➜  Local:   http://localhost:5173/\n' +
		'#   ➜  Network: use --host to expose\n' +
		'#\n' +
		'#   press h + enter to show help';

	const cmdOpen = '# Step 4: Open your browser\n' +
		'# Navigate to: http://localhost:5173\n' +
		'\n' +
		'# localhost = your own computer (127.0.0.1)\n' +
		'# 5173      = the port number (like a door number)\n' +
		'\n' +
		'# Think of your computer as an apartment building.\n' +
		'# "localhost" is the building address.\n' +
		'# "5173" is the apartment number.\n' +
		'# Your dev server lives in apartment 5173.\n' +
		'\n' +
		'# To stop the server: press Ctrl+C in the terminal.';

	const cmdBreak1 = '# Experiment 1: pnpm dev without pnpm install\n' +
		'\n' +
		'cd my-first-app\n' +
		'pnpm dev\n' +
		'\n' +
		'# ERROR: Cannot find module "vite"\n' +
		'# or: "ERR_MODULE_NOT_FOUND"\n' +
		'\n' +
		'# Why? pnpm dev runs "vite dev" (see package.json scripts).\n' +
		'# Vite lives in node_modules/, which does not exist yet.\n' +
		'# Fix: run pnpm install first, then pnpm dev.';

	const cmdBreak2 = '# Experiment 2: Delete node_modules, try again\n' +
		'\n' +
		'rm -rf node_modules\n' +
		'pnpm dev\n' +
		'\n' +
		'# Same error as Experiment 1.\n' +
		'# node_modules/ is recreatable — that is the whole point.\n' +
		'# Fix: pnpm install (recreates it from package.json).\n' +
		'\n' +
		'# This is why node_modules/ is in .gitignore:\n' +
		'# it can always be recreated. No need to store 150+ packages in Git.';

	const cmdBreak3 = '# Experiment 3: Remove the + from +page.svelte\n' +
		'\n' +
		'# Rename src/routes/+page.svelte to src/routes/page.svelte\n' +
		'mv src/routes/+page.svelte src/routes/page.svelte\n' +
		'\n' +
		'# Now visit http://localhost:5173\n' +
		'# Result: 404 — Not Found\n' +
		'\n' +
		'# The + prefix is not decoration. It tells SvelteKit\n' +
		'# "this is a route file." Without it, SvelteKit ignores the file.\n' +
		'# Fix: rename it back to +page.svelte\n' +
		'mv src/routes/page.svelte src/routes/+page.svelte';

	const cmdBreak4 = '# Experiment 4: Open localhost without dev server\n' +
		'\n' +
		'# Make sure pnpm dev is NOT running (Ctrl+C to stop it).\n' +
		'# Now open http://localhost:5173 in your browser.\n' +
		'\n' +
		'# Result: "This site cannot be reached" or "Connection refused"\n' +
		'\n' +
		'# Why? Nobody is listening on port 5173.\n' +
		'# The dev server IS the listener. No server = no response.\n' +
		'# Fix: run pnpm dev, then refresh the browser.';

	const fullCode = '# Full command sequence for Lesson 0.8\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Enter the project folder\n' +
		'cd my-first-app\n' +
		'\n' +
		'# 2. Install dependencies\n' +
		'pnpm install\n' +
		'\n' +
		'# 3. Start the dev server\n' +
		'pnpm dev\n' +
		'\n' +
		'# 4. Open http://localhost:5173 in your browser\n' +
		'# 5. Press Ctrl+C to stop the server when done';
</script>

<section class="page">
	<h1>0.8 — Folder structure &amp; dev server</h1>

	<p class="analogy">
		A SvelteKit project is like a restaurant. <code>src/routes/</code> is the menu — the pages
		customers see. <code>src/lib/</code> is the kitchen — reusable code that prepares what gets
		served. <code>static/</code> is the decor — images, fonts, and icons that never change.
		<code>package.json</code> is the business plan — it lists everything the restaurant needs to
		operate.
	</p>

	<p class="prose">
		In Lesson 0.7, you ran <code>npx sv create my-first-app</code> and the wizard generated a
		project folder. Right now that folder is sitting on your computer full of files you have
		never seen before. That can feel overwhelming. This lesson removes the mystery. We will open
		every file, explain what it does, and then run the project so you can see it live in your
		browser.
	</p>

	<p class="prose">
		By the end, you will understand every file in a SvelteKit project and know how to start and
		stop your development server. You will also understand what localhost means, what a port is,
		and what happens when you type a URL into your browser.
	</p>

	<!-- ── The full tree ── -->
	<h2>The project tree</h2>

	<p class="prose">
		Here is every file and folder the wizard created. Do not memorize this. Use it as a reference.
		We will walk through each one below.
	</p>

	<CodeCanvas filename="Folder Structure" code={cmdTree} />

	<p class="prose">
		There are two categories here: <strong>config files</strong> (at the root) and
		<strong>source files</strong> (inside <code>src/</code>). Config files tell the tools how to
		behave. Source files are your actual application. You will spend 95% of your time inside
		<code>src/</code>.
	</p>

	<!-- ── Config files ── -->
	<h2>package.json — the project manifest</h2>

	<p class="prose">
		This is the single most important file in any JavaScript project. It contains the project
		name, version, scripts (commands you can run), and a list of every dependency your project
		needs. When you run <code>pnpm install</code>, pnpm reads this file and downloads everything
		listed in <code>devDependencies</code>.
	</p>

	<CodeCanvas filename="package.json" code={cmdPackageJson} />

	<p class="prose">
		The <code>scripts</code> section is where terminal commands are defined.
		<code>pnpm dev</code> runs <code>vite dev</code>. <code>pnpm build</code> runs
		<code>vite build</code>. You do not need to memorize the underlying commands — just the
		<code>pnpm</code> shortcuts. Think of scripts as aliases: short names for long commands.
	</p>

	<h2>svelte.config.js — Svelte compiler options</h2>

	<p class="prose">
		This file tells the Svelte compiler how to process your <code>.svelte</code> files. The two
		key settings are <code>preprocess</code> (which enables TypeScript inside
		<code>.svelte</code> files) and <code>adapter</code> (which decides how your app gets
		deployed). You almost never need to edit this file.
	</p>

	<CodeCanvas filename="svelte.config.js" code={cmdSvelteConfig} />

	<h2>vite.config.ts — build tool configuration</h2>

	<p class="prose">
		Vite (pronounced "veet", French for "fast") is the build tool that powers SvelteKit. It
		handles hot module replacement (your browser updates instantly when you save a file),
		bundling (combining files for production), and the development server. This config file
		simply connects SvelteKit to Vite via a plugin.
	</p>

	<CodeCanvas filename="vite.config.ts" code={cmdViteConfig} />

	<p class="prose">
		<strong>tsconfig.json</strong> configures the TypeScript compiler. It tells TypeScript which
		files to check, how strict to be, and what features to enable. SvelteKit generates sensible
		defaults. You rarely edit this file directly.
	</p>

	<p class="prose">
		<strong>.prettierrc</strong> contains Prettier formatting rules — things like tab width,
		trailing commas, and quote style. <strong>eslint.config.js</strong> contains ESLint rules
		that catch bugs and enforce code quality. <strong>.gitignore</strong> lists files that Git
		should not track (we cover Git in Lesson 0.9).
	</p>

	<!-- ── Source files ── -->
	<h2>src/app.html — the HTML shell</h2>

	<p class="prose">
		Every web page is an HTML document. <code>app.html</code> is the outer shell that wraps
		every page in your app. SvelteKit uses special placeholders that get replaced at build time.
	</p>

	<CodeCanvas filename="src/app.html" code={cmdAppHtml} />

	<p class="prose">
		<code>%sveltekit.head%</code> gets replaced with CSS links, font imports, and metadata.
		<code>%sveltekit.body%</code> gets replaced with your actual page content. You edit this file
		to add things that should appear on every page — like a global font import or analytics script.
	</p>

	<h2>src/routes/ — file-based routing</h2>

	<p class="prose">
		This is where your pages live. SvelteKit uses <strong>file-based routing</strong>, which means
		the URL of a page is determined by where the file sits in the <code>routes/</code> folder.
		There is no router configuration file. No route registration. Create a folder, put a
		<code>+page.svelte</code> in it, and you have a new page.
	</p>

	<CodeCanvas filename="Terminal" code={cmdRouting} />

	<h2>src/routes/+page.svelte — the home page</h2>

	<p class="prose">
		This file is your home page. It maps to the root URL (<code>/</code>). The <code>+</code>
		prefix is not decoration — it is a signal to SvelteKit that this file is a route. Without the
		<code>+</code>, SvelteKit ignores the file completely.
	</p>

	<CodeCanvas filename="src/routes/+page.svelte" code={cmdPageSvelte} />

	<h2>src/lib/ — reusable code</h2>

	<p class="prose">
		The <code>lib/</code> folder is where you put code that is shared across multiple pages:
		components, utility functions, type definitions, stores. SvelteKit gives you a special import
		alias: <code>$lib</code>. Instead of writing
		<code>../../lib/components/Button.svelte</code>, you write
		<code>$lib/components/Button.svelte</code>. Cleaner and less fragile.
	</p>

	<h2>static/ — static assets</h2>

	<p class="prose">
		Files in <code>static/</code> are served as-is, without processing. Put images, fonts,
		<code>favicon.png</code>, and <code>robots.txt</code> here. A file at
		<code>static/photo.jpg</code> becomes available at <code>http://localhost:5173/photo.jpg</code>.
	</p>

	<!-- ── Running the project ── -->
	<h2>Running your project</h2>

	<p class="prose">
		You have explored the files. Now let us bring the project to life. Open your terminal and run
		these commands in order.
	</p>

	<CodeCanvas filename="Terminal — Step 1 & 2" code={cmdInstall} />

	<p class="prose">
		<code>pnpm install</code> reads <code>package.json</code>, downloads every package listed in
		<code>devDependencies</code>, and creates the <code>node_modules/</code> folder. This folder
		contains all the third-party code your project depends on. It can be huge (hundreds of
		megabytes) but it is fully recreatable — delete it and run <code>pnpm install</code> again.
	</p>

	<CodeCanvas filename="Terminal — Step 3" code={cmdDev} />

	<p class="prose">
		<code>pnpm dev</code> starts the Vite development server. This server watches your files for
		changes and instantly updates the browser. You do not need to refresh the page manually — save
		a file and the browser updates in milliseconds. This is called <strong>hot module
		replacement</strong> (HMR).
	</p>

	<CodeCanvas filename="Terminal — Step 4" code={cmdOpen} />

	<h2>What is localhost?</h2>

	<p class="prose">
		<code>localhost</code> is a special hostname that always points to your own computer. Its IP
		address is <code>127.0.0.1</code>. When you type <code>http://localhost:5173</code> into your
		browser, you are telling the browser: "Connect to my own computer, on port 5173."
	</p>

	<p class="prose">
		A <strong>port</strong> is like a door number on an apartment building. Your computer is the
		building. Each running program listens on a specific port. The Vite dev server defaults to
		port 5173. If that port is already in use (maybe you have two projects running), Vite
		automatically picks the next available port, like 5174.
	</p>

	<p class="prose">
		To stop the dev server, press <code>Ctrl+C</code> in the terminal. This frees up port 5173.
		Nothing is broken — the server simply stops listening. Run <code>pnpm dev</code> again to
		restart it.
	</p>

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<p class="prose">
		Try each experiment. Watch what breaks. Understand why. Then fix it.
	</p>

	<ol class="experiments">
		<li>
			<strong>Run <code>pnpm dev</code> without <code>pnpm install</code>.</strong> The dev server
			needs Vite, which lives in <code>node_modules/</code>. No install means no
			<code>node_modules/</code>, which means "module not found" errors. Fix: run
			<code>pnpm install</code> first.
		</li>
		<li>
			<strong>Delete <code>node_modules/</code> and try again.</strong> Same error. But now you know
			the fix: <code>pnpm install</code> recreates it. This is why <code>node_modules/</code> is
			never stored in Git — it can always be rebuilt.
		</li>
		<li>
			<strong>Remove the <code>+</code> from <code>+page.svelte</code>.</strong> Rename it to
			<code>page.svelte</code>. Visit <code>http://localhost:5173</code>. You get a 404 error.
			The <code>+</code> prefix tells SvelteKit "this is a route file." Without it, the file is
			invisible to the router. Rename it back.
		</li>
		<li>
			<strong>Open localhost without the dev server running.</strong> Stop the server with
			<code>Ctrl+C</code>, then refresh the browser. "This site can't be reached." Nobody is
			listening on port 5173. Start the server again with <code>pnpm dev</code>.
		</li>
	</ol>

	<CodeCanvas filename="Terminal — Experiment 1" code={cmdBreak1} />
	<CodeCanvas filename="Terminal — Experiment 2" code={cmdBreak2} />
	<CodeCanvas filename="Terminal — Experiment 3" code={cmdBreak3} />
	<CodeCanvas filename="Terminal — Experiment 4" code={cmdBreak4} />

	<!-- ── Having issues ── -->
	<details class="having-issues">
		<summary>Having issues?</summary>
		<p>
			<strong>"Cannot find module 'vite'"</strong> — You did not run <code>pnpm install</code>. Run
			it now, then try <code>pnpm dev</code> again.
		</p>
		<p>
			<strong>Port 5173 already in use</strong> — Another process is using that port. Either stop it
			(find the other terminal running <code>pnpm dev</code>) or let Vite pick the next port
			automatically. Look at the terminal output for the actual URL.
		</p>
		<p>
			<strong>404 on the home page</strong> — Make sure the file is named exactly
			<code>+page.svelte</code> (with the <code>+</code>) and is inside <code>src/routes/</code>.
		</p>
		<p>
			<strong>Browser shows old content after changes</strong> — Hard refresh with
			<code>Ctrl+Shift+R</code> (or <code>Cmd+Shift+R</code> on Mac). If HMR is not working,
			stop the server and restart with <code>pnpm dev</code>.
		</p>
	</details>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		A SvelteKit project has config files at the root (<code>package.json</code>,
		<code>svelte.config.js</code>, <code>vite.config.ts</code>) and source files inside
		<code>src/</code>. You spend 95% of your time in <code>src/routes/</code> (pages) and
		<code>src/lib/</code> (reusable code). Config files are set once and rarely touched.
	</p>

	<p class="prose">
		File-based routing means the URL of a page is determined by its file path. Create
		<code>src/routes/about/+page.svelte</code> and you get <code>/about</code>. The <code>+</code>
		prefix is required — it signals to SvelteKit that the file is a route. Without it, the file
		is ignored.
	</p>

	<p class="prose">
		<code>pnpm install</code> downloads dependencies into <code>node_modules/</code>.
		<code>pnpm dev</code> starts the Vite development server on <code>localhost:5173</code>.
		<code>localhost</code> is your own computer. A port is like a door number. <code>Ctrl+C</code>
		stops the server. The dev server provides hot module replacement — save a file and the browser
		updates instantly.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/0-9-what-is-git">0.9 — What is Git?</a> — learn the
		version control system that protects your code from disaster.
	</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); max-inline-size: 960px; margin: 0 auto; color: var(--color-text); }
	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); color: var(--color-text); }
	.analogy { background: var(--color-surface-2); border-inline-start: 4px solid var(--color-warning); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); color: var(--color-text); line-height: 1.7; max-inline-size: 68ch; font-style: italic; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } & strong { font-weight: 700; } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block: var(--space-xl); border: 2px dashed var(--color-warning); border-radius: var(--radius-lg); overflow: hidden; & > summary { padding: var(--space-md) var(--space-lg); font-weight: 700; font-size: var(--text-base); color: var(--color-warning); background: var(--color-surface-1); cursor: pointer; } & > p { padding: var(--space-sm) var(--space-lg); margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 480px) { .prose, .analogy { max-inline-size: 65ch; } }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-hero); } .prose, .analogy { max-inline-size: 72ch; } .page { padding: var(--space-2xl); } }
	@media (min-inline-size: 1024px) { .prose, .analogy { max-inline-size: 80ch; } }
</style>
