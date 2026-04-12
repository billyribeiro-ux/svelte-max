<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmd1 = 'npx sv create my-first-app';

	const cmd2 = 'npx sv create my-first-app\n' +
		'\n' +
		'# The wizard will ask you a series of questions.\n' +
		'# Here are the PE7-recommended answers:\n' +
		'\n' +
		'# Which template would you like?\n' +
		'# > SvelteKit minimal\n' +
		'\n' +
		'# Add type checking with TypeScript?\n' +
		'# > Yes, using TypeScript syntax\n' +
		'\n' +
		'# What would you like to add to your project?\n' +
		'# > prettier, eslint\n' +
		'\n' +
		'# Which package manager do you want to install dependencies with?\n' +
		'# > pnpm (or choose "None" — we will install manually)';

	const cmd3 = 'npx sv create my-first-app\n' +
		'\n' +
		'# Step 1 — Template\n' +
		'#   SvelteKit minimal       <-- choose this one\n' +
		'#   SvelteKit demo app\n' +
		'#   Svelte library\n' +
		'\n' +
		'# "SvelteKit minimal" gives you a clean slate.\n' +
		'# "SvelteKit demo app" adds example routes you will delete anyway.\n' +
		'# "Svelte library" is for publishing npm packages — not for apps.';

	const cmd4 = '# Step 2 — TypeScript\n' +
		'#   Yes, using TypeScript syntax   <-- choose this one\n' +
		'#   Yes, using JavaScript with JSDoc comments\n' +
		'#   No\n' +
		'\n' +
		'# TypeScript catches mistakes BEFORE you open the browser.\n' +
		'# Example: if you misspell a variable name, TypeScript\n' +
		'# underlines it in red immediately. Without TypeScript,\n' +
		'# you only discover the bug when users see a blank page.';

	const cmd5 = '# Step 3 — Additional tools\n' +
		'#   [x] prettier   <-- select this\n' +
		'#   [x] eslint     <-- select this\n' +
		'#   [ ] playwright\n' +
		'#   [ ] vitest\n' +
		'\n' +
		'# Prettier: auto-formats your code so it always looks clean.\n' +
		'#   Before Prettier: const x=1;if(x){console.log(x)}\n' +
		'#   After Prettier:  const x = 1;\n' +
		'#                    if (x) {\n' +
		'#                      console.log(x);\n' +
		'#                    }\n' +
		'\n' +
		'# ESLint: catches common bugs and bad patterns.\n' +
		'#   Example: "unused variable" — you declared it but never used it.\n' +
		'\n' +
		'# Playwright: browser testing — skip for now (Module 15).\n' +
		'# Vitest: unit testing — skip for now (Module 14).';

	const cmd6 = '# Step 4 — Package manager\n' +
		'#   pnpm    <-- choose this if listed\n' +
		'#   npm\n' +
		'#   yarn\n' +
		'#   bun\n' +
		'#   None    <-- or choose this and run pnpm install yourself\n' +
		'\n' +
		'# We use pnpm because it is faster and uses less disk space.\n' +
		'# You learned about pnpm in Lesson 0.6.';

	const cmdNpxExplain = '# What does npx do?\n' +
		'\n' +
		'# npx = "Node Package eXecute"\n' +
		'# It runs a package WITHOUT installing it permanently.\n' +
		'\n' +
		'# Without npx:\n' +
		'#   pnpm install -g sv     <-- installs sv globally (clutters your system)\n' +
		'#   sv create my-first-app\n' +
		'\n' +
		'# With npx:\n' +
		'#   npx sv create my-first-app  <-- downloads, runs, and discards\n' +
		'\n' +
		'# Think of npx like renting a tool instead of buying it.\n' +
		'# You need a drill for one project? Rent it. Done.';

	const cmdKebab = '# Project naming rules (kebab-case)\n' +
		'\n' +
		'# GOOD:\n' +
		'#   my-first-app\n' +
		'#   portfolio-site\n' +
		'#   todo-list\n' +
		'#   weather-dashboard\n' +
		'\n' +
		'# BAD:\n' +
		'#   My First App      <-- spaces break terminal commands\n' +
		'#   myFirstApp         <-- camelCase is for variables, not folders\n' +
		'#   MY_FIRST_APP       <-- SCREAMING_SNAKE is for constants\n' +
		'#   my first app       <-- spaces will cause path errors\n' +
		'\n' +
		'# kebab-case = all lowercase, words separated by hyphens.\n' +
		'# This is the universal convention for project folder names.';

	const cmdSummary = '# PE7 Quick Reference — Project Creation\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'npx sv create my-first-app\n' +
		'\n' +
		'#   Template:         SvelteKit minimal\n' +
		'#   TypeScript:       Yes, using TypeScript syntax\n' +
		'#   Additional tools: prettier, eslint\n' +
		'#   Package manager:  pnpm (or None)\n' +
		'\n' +
		'# That is it. Four questions, four answers.\n' +
		'# Your project folder is now ready.\n' +
		'# Do NOT run pnpm install yet — that is Lesson 0.8.';

	const cmdBreak1 = '# Experiment 1: Create in a folder with the same name\n' +
		'\n' +
		'npx sv create my-first-app\n' +
		'# ... answer all questions ...\n' +
		'\n' +
		'# Now try again:\n' +
		'npx sv create my-first-app\n' +
		'\n' +
		'# The wizard will ask:\n' +
		'#   "Directory not empty. Continue?" or overwrite prompt.\n' +
		'# It will NOT silently destroy your work.';

	const cmdBreak2 = '# Experiment 2: Name with spaces\n' +
		'\n' +
		'npx sv create "my first app"\n' +
		'\n' +
		'# This might create a folder called "my first app"\n' +
		'# with a space in the name. Try:\n' +
		'cd my first app\n' +
		'# ERROR: "cd: too many arguments"\n' +
		'\n' +
		'# You would need:\n' +
		'cd "my first app"\n' +
		'\n' +
		'# Every future command gets annoying with spaces.\n' +
		'# Always use kebab-case: my-first-app';

	const cmdBreak3 = '# Experiment 3: Choose "No" for TypeScript\n' +
		'\n' +
		'npx sv create no-ts-app\n' +
		'# Choose: No (for TypeScript)\n' +
		'\n' +
		'# Now open src/routes/+page.svelte:\n' +
		'#   \u003cscript>           <-- no lang="ts"\n' +
		'#     ...\n' +
		'#   \u003c/script>\n' +
		'\n' +
		'# Compare with TypeScript project:\n' +
		'#   \u003cscript lang="ts">  <-- TypeScript enabled\n' +
		'#     ...\n' +
		'#   \u003c/script>\n' +
		'\n' +
		'# Without TypeScript, you get NO red underlines,\n' +
		'# NO autocomplete, NO type checking.\n' +
		'# You are flying blind. Do not do this.';

	const cmdBreak4 = '# Experiment 4: Run npx sv create with no name\n' +
		'\n' +
		'npx sv create\n' +
		'\n' +
		'# The wizard goes into fully interactive mode.\n' +
		'# It asks you for a project name as the first question.\n' +
		'# This is fine — it just adds one more step.\n' +
		'\n' +
		'# Either way works:\n' +
		'#   npx sv create my-first-app   <-- name upfront\n' +
		'#   npx sv create                <-- name in wizard';

	const fullCode = '# Full command sequence for Lesson 0.7\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Run the project creation wizard\n' +
		'npx sv create my-first-app\n' +
		'\n' +
		'# 2. Answer the questions:\n' +
		'#    Template:         SvelteKit minimal\n' +
		'#    TypeScript:       Yes, using TypeScript syntax\n' +
		'#    Additional tools: prettier, eslint\n' +
		'#    Package manager:  pnpm (or None)\n' +
		'\n' +
		'# 3. You now have a my-first-app/ folder.\n' +
		'#    Do NOT run pnpm install yet.\n' +
		'#    That is the next lesson (0.8).';
</script>

<section class="page">
	<h1>0.7 — Creating a SvelteKit project</h1>

	<p class="analogy">
		<code>npx sv create</code> is like a wizard that asks you questions and builds a house based
		on your answers. You tell it the name, the style, and the features you want — and it generates
		all the files and folders you need. No manual setup. No guessing what goes where. The wizard
		handles everything.
	</p>

	<p class="prose">
		In the previous lessons, you installed the terminal, Homebrew, Node.js, and pnpm. Those were
		the <strong>tools</strong>. Now you are going to use those tools for the first time to create a
		real SvelteKit project. By the end of this lesson, you will have a project folder on your
		computer with all the files a modern web application needs.
	</p>

	<p class="prose">
		We are not going to write any code yet. We are not going to run anything. We are just going to
		create the project and understand what each wizard question means and why the PE7 curriculum
		recommends specific answers. This is important — every professional developer makes these
		choices on day one of every project.
	</p>

	<!-- ── What is npx? ── -->
	<h2>What is npx?</h2>

	<p class="prose">
		Before we run the command, you need to understand the first word: <code>npx</code>. It stands
		for <strong>Node Package eXecute</strong>. It runs a package without installing it permanently
		on your computer. Think of it like renting a tool instead of buying it. You need a drill for
		one weekend project? You rent it, use it, and return it. <code>npx</code> downloads the
		<code>sv</code> tool, runs it, and then discards it. Your system stays clean.
	</p>

	<CodeCanvas filename="Terminal" code={cmdNpxExplain} />

	<p class="prose">
		Without <code>npx</code>, you would need to install <code>sv</code> globally with
		<code>pnpm install -g sv</code>. That works, but it clutters your system with tools you
		might only use once. <code>npx</code> is the standard way to run project generators in 2025.
		Every SvelteKit tutorial, every React tutorial, every modern framework uses <code>npx</code>
		for scaffolding.
	</p>

	<!-- ── The command ── -->
	<h2>The command</h2>

	<p class="prose">
		Open your terminal. Make sure you are in a folder where you want your project to live. Your
		home directory or a <code>projects</code> folder works great. Then run this:
	</p>

	<CodeCanvas filename="Terminal" code={cmd1} />

	<p class="prose">
		Let us break this down word by word:
	</p>

	<p class="prose">
		<strong><code>npx</code></strong> — run a package without installing it globally.
		<strong><code>sv</code></strong> — the official Svelte CLI tool. It knows how to create
		SvelteKit projects. <strong><code>create</code></strong> — the subcommand that tells
		<code>sv</code> you want a new project. <strong><code>my-first-app</code></strong> — the name
		of the folder that will be created. This becomes your project directory.
	</p>

	<!-- ── Naming your project ── -->
	<h2>Naming your project</h2>

	<p class="prose">
		The name you give your project becomes a folder on your computer. Folder names with spaces
		cause endless problems in the terminal because the terminal interprets spaces as separating
		different arguments. The universal convention for project names is
		<strong>kebab-case</strong>: all lowercase, words separated by hyphens.
	</p>

	<CodeCanvas filename="Terminal" code={cmdKebab} />

	<p class="prose">
		Every open-source project on GitHub uses kebab-case for the repository name. Every npm
		package uses kebab-case. Following this convention means your project will work everywhere
		without surprises.
	</p>

	<!-- ── The wizard questions ── -->
	<h2>The wizard questions</h2>

	<p class="prose">
		When you run <code>npx sv create my-first-app</code>, the wizard asks you four questions.
		Here is what each one means and what to choose.
	</p>

	<CodeCanvas filename="Terminal" code={cmd2} />

	<!-- Question 1 -->
	<h2>Question 1: Which template?</h2>

	<p class="prose">
		The first question asks which template you want. A template is a starting point — how much
		pre-built code do you want in your project?
	</p>

	<CodeCanvas filename="Terminal — Question 1" code={cmd3} />

	<p class="prose">
		<strong>Choose SvelteKit minimal.</strong> This gives you the absolute bare minimum: one page,
		no extra routes, no example components. It is a clean slate. The demo app template adds
		example pages that you would immediately delete. The library template is for people publishing
		npm packages, which is not what we are doing. Minimal means you understand every line in your
		project because you wrote it yourself.
	</p>

	<!-- Question 2 -->
	<h2>Question 2: TypeScript?</h2>

	<p class="prose">
		This is the most important question. TypeScript adds type checking to JavaScript. It is
		like spell-check for your code — it catches errors before you even save the file.
	</p>

	<CodeCanvas filename="Terminal — Question 2" code={cmd4} />

	<p class="prose">
		<strong>Choose "Yes, using TypeScript syntax."</strong> This is a PE7 requirement, not a
		suggestion. TypeScript will underline mistakes in red before you open the browser. Without it,
		you discover bugs only when your app crashes in front of users. Every serious company uses
		TypeScript. Every serious open-source project uses TypeScript. Learning it from the start
		means you never have to "migrate" later.
	</p>

	<p class="prose">
		The "JSDoc" option uses TypeScript checking but writes the types in comments instead of
		code. It works, but it is more verbose and less common. We use the native TypeScript syntax
		because it is cleaner and what you will see in every Svelte tutorial and job posting.
	</p>

	<!-- Question 3 -->
	<h2>Question 3: Additional tools?</h2>

	<p class="prose">
		This question lets you add developer tools to your project. These tools do not affect what
		your users see — they help <strong>you</strong> write better code.
	</p>

	<CodeCanvas filename="Terminal — Question 3" code={cmd5} />

	<p class="prose">
		<strong>Select Prettier and ESLint.</strong> Prettier automatically formats your code so every
		file looks consistent. No more arguing about tabs vs spaces or where to put curly braces.
		ESLint catches common mistakes like unused variables or unreachable code. Together, they keep
		your codebase clean without you thinking about it.
	</p>

	<p class="prose">
		We skip Playwright and Vitest for now. Playwright is for browser automation testing (clicking
		buttons, filling forms programmatically). Vitest is for unit testing (checking that a function
		returns the right value). Both are covered in later modules. Adding them now would just add
		config files you do not understand yet.
	</p>

	<!-- Question 4 -->
	<h2>Question 4: Package manager?</h2>

	<p class="prose">
		The final question asks which package manager should install your dependencies. You learned
		about pnpm in Lesson 0.6.
	</p>

	<CodeCanvas filename="Terminal — Question 4" code={cmd6} />

	<p class="prose">
		<strong>Choose pnpm</strong> if it appears in the list. If you prefer, choose "None" and run
		<code>pnpm install</code> yourself in the next lesson. Either way is fine. The important thing
		is that we use pnpm, not npm, for the reasons you learned: faster installs, less disk space,
		and stricter dependency resolution.
	</p>

	<!-- ── PE7 Quick Reference ── -->
	<h2>PE7 quick reference</h2>

	<p class="prose">
		Here are all four answers in one place. Bookmark this if you need it later when creating
		future projects:
	</p>

	<CodeCanvas filename="Terminal — PE7 Choices" code={cmdSummary} />

	<p class="prose">
		That is the entire process. Four questions, four answers. After the wizard finishes, you will
		have a new folder called <code>my-first-app</code> on your computer. Inside that folder is
		everything a SvelteKit project needs. We will explore that folder in detail in the next lesson.
	</p>

	<p class="prose">
		<strong>Important:</strong> Do NOT run <code>pnpm install</code> or <code>pnpm dev</code> yet.
		That is Lesson 0.8. For now, we just want the folder to exist. Take a moment to look at it in
		Finder or your file manager. You should see files like <code>package.json</code>,
		<code>svelte.config.js</code>, and a <code>src/</code> folder. We will explain every single
		one in the next lesson.
	</p>

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<p class="prose">
		The fastest way to understand how something works is to break it. Try each experiment below
		and observe what happens. You cannot damage your computer — worst case, you delete a folder
		and start over.
	</p>

	<ol class="experiments">
		<li>
			<strong>Create in a folder with the same name.</strong> Run <code>npx sv create my-first-app</code>
			twice. The second time, the wizard detects the folder already exists and asks what to do. It
			will not silently overwrite your work. This is a safety net.
		</li>
		<li>
			<strong>Name with spaces.</strong> Try <code>npx sv create "my first app"</code>. If it creates
			the folder, try <code>cd my first app</code> — the terminal sees three separate arguments instead
			of one path. You need quotes: <code>cd "my first app"</code>. This is why kebab-case exists.
		</li>
		<li>
			<strong>Choose No for TypeScript.</strong> Create a project without TypeScript and open
			<code>src/routes/+page.svelte</code>. Notice the script tag says <code>&lt;script&gt;</code>
			instead of <code>&lt;script lang="ts"&gt;</code>. No red underlines, no autocomplete, no safety net.
			Delete this project when done.
		</li>
		<li>
			<strong>Run <code>npx sv create</code> with no name.</strong> The wizard enters fully interactive
			mode and asks for the project name as an extra first question. Both approaches work — providing
			the name upfront just saves one step.
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
			<strong>"npx: command not found"</strong> — Node.js is not installed or not in your PATH.
			Go back to Lesson 0.5 and make sure <code>node --version</code> and <code>npx --version</code>
			both return version numbers.
		</p>
		<p>
			<strong>"sv: command not found" or "sv: not found"</strong> — This usually means npx could not
			download the <code>sv</code> package. Check your internet connection. Try running
			<code>npx sv --version</code> to confirm it can reach the registry.
		</p>
		<p>
			<strong>Wizard closes immediately</strong> — If the terminal closes or the wizard exits without
			asking questions, you might be in a restricted directory. Try <code>cd ~</code> first, then run
			the command again from your home directory.
		</p>
		<p>
			<strong>Permission errors</strong> — If you see EACCES or permission denied, do NOT use
			<code>sudo</code>. Go back to Lesson 0.5 and ensure Node was installed via Homebrew or nvm,
			not from the system package manager.
		</p>
	</details>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		<code>npx</code> runs a package without installing it globally. It downloads the tool, uses
		it, and cleans up. This is the standard way to scaffold new projects in the JavaScript
		ecosystem.
	</p>

	<p class="prose">
		<code>npx sv create</code> is the official SvelteKit project generator. It asks four questions
		and generates a complete project folder. The PE7 answers are: SvelteKit minimal template,
		TypeScript syntax, Prettier + ESLint, and pnpm.
	</p>

	<p class="prose">
		Project names should use kebab-case (all lowercase, hyphens between words). Spaces in folder
		names cause problems in the terminal. TypeScript is not optional in PE7 — it catches bugs
		before they reach users and is required by every serious team.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/0-8-folder-structure">0.8 — Folder structure &amp; dev server</a> — we
		will explore every file the wizard created and run your project for the first time.
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
