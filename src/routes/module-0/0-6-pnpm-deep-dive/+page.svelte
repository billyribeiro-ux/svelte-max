<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const installCmd = 'npm install -g pnpm';
	const installBrew = 'brew install pnpm';
	const installCorepack = 'corepack enable\ncorepack prepare pnpm@latest --activate';
	const verifyCmd = 'pnpm -v';
	const storePathCmd = 'pnpm store path';

	const pnpmInstall = 'pnpm install';
	const pnpmAdd = 'pnpm add svelte-french-toast';
	const pnpmAddDev = 'pnpm add -D @types/node';
	const pnpmRemove = 'pnpm remove svelte-french-toast';
	const pnpmUpdate = 'pnpm update';
	const pnpmUpdatePkg = 'pnpm update svelte --latest';
	const pnpmRun = 'pnpm run dev\n# shorthand:\npnpm dev';
	const pnpmBuild = 'pnpm run build\n# shorthand:\npnpm build';
	const pnpmExec = 'pnpm exec svelte-kit sync';
	const pnpmDlx = 'pnpm dlx sv create my-new-app';
	const pnpmWhy = 'pnpm why vite';
	const pnpmLs = 'pnpm ls\npnpm ls --depth 0';
	const pnpmStorePrune = 'pnpm store prune';

	const lockfileExample = `# pnpm-lock.yaml (excerpt)
lockfileVersion: '9.0'
settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false
importers:
  .:
    dependencies:
      svelte:
        specifier: ^5.55.1
        version: 5.55.1
    devDependencies:
      '@sveltejs/kit':
        specifier: ^2.56.1
        version: 2.56.1`;

	const npmrcExample = `# .npmrc — PE7 recommended configuration
# Place this file in your project root

# Hoist packages to the root node_modules
# Required by some tools that expect flat node_modules
shamefully-hoist=true

# Don't fail on peer dependency conflicts
# Many packages haven't updated their peer deps yet
strict-peer-dependencies=false

# Use the lockfile for deterministic installs
frozen-lockfile=true`;

	const comparisonTable = `┌─────────────────┬───────────┬───────────┬───────────┐
│ Feature         │ npm       │ yarn      │ pnpm      │
├─────────────────┼───────────┼───────────┼───────────┤
│ Install speed   │ Slow      │ Fast      │ Fastest   │
│ Disk usage      │ High      │ High      │ Low       │
│ Phantom deps    │ Possible  │ Possible  │ Blocked   │
│ Strictness      │ Loose     │ Loose     │ Strict    │
│ Workspaces      │ Basic     │ Good      │ Best      │
│ Content store   │ No        │ No        │ Yes       │
│ node_modules    │ Flat      │ Flat/PnP  │ Symlinked │
└─────────────────┴───────────┴───────────┴───────────┘`;

	const troubleshootCmds = `# "Module not found" after pulling from git:
pnpm install

# Peer dependency conflict:
pnpm install --force
# or add to .npmrc: strict-peer-dependencies=false

# Corrupted store:
pnpm store prune

# Nuclear option — start fresh:
rm -rf node_modules
rm -rf .svelte-kit
pnpm install

# Check for outdated packages:
pnpm outdated

# See what changed in lockfile:
git diff pnpm-lock.yaml`;

	const fullCode = [
		'# ═══ INSTALLING PNPM ═══',
		'npm install -g pnpm          # via npm',
		'brew install pnpm            # via Homebrew',
		'corepack enable              # via Corepack (Node 16.13+)',
		'pnpm -v                      # verify installation',
		'pnpm store path              # show global store location',
		'',
		'# ═══ DAILY COMMANDS ═══',
		'pnpm install                 # install all deps from lockfile',
		'pnpm add <pkg>               # add a dependency',
		'pnpm add -D <pkg>            # add a dev dependency',
		'pnpm remove <pkg>            # remove a dependency',
		'pnpm update                  # update all deps',
		'pnpm update <pkg> --latest   # update specific pkg to latest',
		'',
		'# ═══ RUNNING SCRIPTS ═══',
		'pnpm run dev                 # or just: pnpm dev',
		'pnpm run build               # or just: pnpm build',
		'pnpm run check               # or just: pnpm check',
		'pnpm exec <bin>              # run a local binary',
		'pnpm dlx <pkg>               # run without installing (like npx)',
		'',
		'# ═══ INSPECTING ═══',
		'pnpm why <pkg>               # why is this installed?',
		'pnpm ls                      # list installed packages',
		'pnpm ls --depth 0            # top-level only',
		'pnpm outdated                # show outdated packages',
		'',
		'# ═══ MAINTENANCE ═══',
		'pnpm store prune             # clean unused from global store',
		'rm -rf node_modules && pnpm install  # nuclear reset'
	].join('\n');
</script>

<section class="page">
	<h1>0.6 — pnpm deep dive</h1>

	<p class="analogy">
		"npm copies a book into every project that needs it. If ten projects use React, npm stores
		ten separate copies. pnpm keeps ONE copy in a central library and gives every project a
		library card — a symbolic link that points to the shared copy. Same result, one-tenth the
		disk space, ten times faster installs."
	</p>

	<!-- ═══ SECTION 1: WHY PNPM EXISTS ═══ -->

	<h2>Why pnpm exists</h2>

	<p class="prose">
		When you install a package with <code>npm</code>, it creates a flat <code>node_modules</code>
		folder where every dependency — and every dependency OF every dependency — lives at the top
		level. This causes two problems. First, <strong>phantom dependencies</strong>: your code can
		accidentally import a package that you never explicitly installed, simply because it was hoisted
		to the top level as a transitive dependency. Your code works on your machine but breaks on
		someone else's because they have a different set of transitive dependencies. Second,
		<strong>disk bloat</strong>: if you have ten projects that all use React, npm stores ten complete
		copies of React on your hard drive.
	</p>

	<p class="prose">
		<code>yarn</code> improved on npm's speed with parallel downloads and a lockfile, but it kept
		the same flat <code>node_modules</code> structure — phantom dependencies remain possible. Yarn
		Berry introduced Plug'n'Play (PnP) which eliminates <code>node_modules</code> entirely, but PnP
		breaks many existing packages that hardcode <code>node_modules</code> paths. Neither solution
		is perfect.
	</p>

	<p class="prose">
		<code>pnpm</code> (performant npm) solves both problems with a <strong>content-addressable
		store</strong>. Every package version is stored exactly once in a global store on your disk
		(usually at <code>~/.local/share/pnpm/store</code>). When a project needs a package, pnpm
		creates a <strong>hard link</strong> from the store into the project's <code>node_modules</code>.
		The result: near-instant installs (no downloading if you already have the package), minimal
		disk usage (one copy shared across all projects), and strict isolation (your code can only
		import packages you explicitly declared in <code>package.json</code>).
	</p>

	<h3>The comparison</h3>

	<CodeCanvas filename="npm vs yarn vs pnpm" code={comparisonTable} />

	<p class="prose">
		This is why PE7 uses pnpm for every project. It is faster, smaller, and stricter. Strictness
		is a feature — it catches dependency mistakes that npm silently allows. When your code works
		with pnpm, it works everywhere.
	</p>

	<!-- ═══ SECTION 2: INSTALLING PNPM ═══ -->

	<h2>Installing pnpm</h2>

	<p class="prose">
		There are three ways to install pnpm. All produce the same result — choose whichever
		matches your setup.
	</p>

	<h3>Option A — via npm (simplest)</h3>
	<p class="prose">
		If you already have Node.js installed (from lesson 0.5), npm came with it. Use npm to
		install pnpm globally. The <code>-g</code> flag means "global" — the command becomes
		available everywhere, not just in one project.
	</p>
	<CodeCanvas filename="Terminal" code={installCmd} />

	<h3>Option B — via Homebrew</h3>
	<p class="prose">
		If you installed Homebrew in lesson 0.4, this is equally valid.
	</p>
	<CodeCanvas filename="Terminal" code={installBrew} />

	<h3>Option C — via Corepack (Node 16.13+)</h3>
	<p class="prose">
		Corepack is a Node.js tool that manages package managers. It ships with Node but is
		disabled by default. Enable it once, and it handles pnpm versioning for you.
	</p>
	<CodeCanvas filename="Terminal" code={installCorepack} />

	<h3>Verify the installation</h3>
	<CodeCanvas filename="Terminal" code={verifyCmd} />
	<p class="prose">
		You should see a version number like <code>10.33.0</code> or higher. If you see
		"command not found," your terminal does not know where pnpm is — restart the terminal
		and try again. If it still fails, check that the install directory is in your
		<code>PATH</code>.
	</p>

	<h3>Where does pnpm store packages?</h3>
	<CodeCanvas filename="Terminal" code={storePathCmd} />
	<p class="prose">
		This shows the global content-addressable store. Every package version you have ever
		installed lives here, stored once. When a project needs it, pnpm creates a hard link —
		no copying, no downloading, instant.
	</p>

	<!-- ═══ SECTION 3: EVERY COMMAND ═══ -->

	<h2>Every pnpm command you will use</h2>

	<p class="prose">
		These are the commands you will type every day as a Svelte developer. Learn them like
		vocabulary — each one does exactly one thing.
	</p>

	<h3><code>pnpm install</code> — install all dependencies</h3>
	<p class="prose">
		Run this after cloning a repo, after pulling changes that modified <code>package.json</code>,
		or after deleting <code>node_modules</code>. It reads <code>package.json</code> and
		<code>pnpm-lock.yaml</code> and creates the <code>node_modules</code> folder with symlinks
		to the global store. This is the FIRST command you run in any project.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmInstall} />

	<h3><code>pnpm add</code> — add a new dependency</h3>
	<p class="prose">
		This installs a package AND adds it to <code>package.json</code> under
		<code>"dependencies"</code>. Dependencies are packages your app needs to RUN — things like
		Svelte, form libraries, chart libraries.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmAdd} />

	<h3><code>pnpm add -D</code> — add a dev dependency</h3>
	<p class="prose">
		The <code>-D</code> flag adds the package under <code>"devDependencies"</code> instead.
		Dev dependencies are packages needed to BUILD or TEST your app but not to run it in
		production — things like TypeScript types, linters, test frameworks.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmAddDev} />

	<h3><code>pnpm remove</code> — remove a dependency</h3>
	<p class="prose">
		Uninstalls a package and removes it from <code>package.json</code>. If other packages
		depended on it as a transitive dependency, pnpm keeps it in the store but removes the
		link from your project.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmRemove} />

	<h3><code>pnpm update</code> — update dependencies</h3>
	<p class="prose">
		Updates all packages to the latest version allowed by the version ranges in
		<code>package.json</code>. Add <code>--latest</code> to ignore version ranges and go
		straight to the newest release (use carefully — major versions may have breaking changes).
	</p>
	<CodeCanvas filename="Terminal" code={pnpmUpdate} />
	<CodeCanvas filename="Terminal — update specific package" code={pnpmUpdatePkg} />

	<h3><code>pnpm run</code> / <code>pnpm dev</code> / <code>pnpm build</code> — run scripts</h3>
	<p class="prose">
		<code>package.json</code> has a <code>"scripts"</code> section that defines shortcuts.
		<code>pnpm run dev</code> runs the <code>"dev"</code> script (which starts the Vite dev
		server). pnpm lets you skip <code>run</code> for common scripts — <code>pnpm dev</code>
		is the same as <code>pnpm run dev</code>.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmRun} />
	<CodeCanvas filename="Terminal" code={pnpmBuild} />

	<h3><code>pnpm exec</code> — run a local binary</h3>
	<p class="prose">
		Some packages install executable binaries in <code>node_modules/.bin/</code>.
		<code>pnpm exec</code> runs them without needing the full path. This is how you run
		tools like <code>svelte-kit sync</code> or <code>eslint</code> that are installed
		locally, not globally.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmExec} />

	<h3><code>pnpm dlx</code> — run a package without installing</h3>
	<p class="prose">
		Like <code>npx</code> but for pnpm. It downloads the package to a temporary location,
		runs it, then cleans up. Perfect for one-off tools like project scaffolders. This is
		how you run <code>sv create</code> without installing it globally.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmDlx} />

	<h3><code>pnpm why</code> — trace why a package is installed</h3>
	<p class="prose">
		Shows the dependency chain that requires a specific package. Useful when you see a
		package in <code>node_modules</code> that you did not install — <code>pnpm why</code>
		tells you which of YOUR dependencies pulled it in.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmWhy} />

	<h3><code>pnpm ls</code> — list installed packages</h3>
	<p class="prose">
		Shows all installed packages. Add <code>--depth 0</code> to see only your direct
		dependencies (not their transitive dependencies). This is your at-a-glance inventory.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmLs} />

	<h3><code>pnpm store prune</code> — clean the global store</h3>
	<p class="prose">
		Over time, old package versions accumulate in the global store. <code>store prune</code>
		removes versions that are no longer referenced by any project on your machine. Safe to
		run periodically — it only deletes orphaned packages.
	</p>
	<CodeCanvas filename="Terminal" code={pnpmStorePrune} />

	<!-- ═══ SECTION 4: THE LOCKFILE ═══ -->

	<h2>The lockfile — <code>pnpm-lock.yaml</code></h2>

	<p class="prose">
		When you run <code>pnpm install</code> for the first time, pnpm resolves every dependency
		to an exact version and records it in <code>pnpm-lock.yaml</code>. This file is a snapshot
		of your entire dependency tree — every package, every version, every integrity hash.
	</p>

	<CodeCanvas filename="pnpm-lock.yaml (excerpt)" code={lockfileExample} />

	<p class="prose">
		<strong>Always commit <code>pnpm-lock.yaml</code> to Git.</strong> Without it, every
		developer on your team might resolve to different versions of the same package — leading
		to "works on my machine" bugs. The lockfile guarantees that everyone installs exactly the
		same dependency tree, byte for byte.
	</p>

	<p class="prose">
		<strong>Never edit <code>pnpm-lock.yaml</code> manually.</strong> It is machine-generated.
		If you need to change a dependency version, edit <code>package.json</code> and run
		<code>pnpm install</code> — pnpm regenerates the lockfile automatically. If the lockfile
		gets corrupted, delete it and run <code>pnpm install</code> to recreate it from scratch.
	</p>

	<!-- ═══ SECTION 5: .npmrc ═══ -->

	<h2>Configuring pnpm with <code>.npmrc</code></h2>

	<p class="prose">
		pnpm reads configuration from a file called <code>.npmrc</code> in your project root.
		This file controls how pnpm behaves — hoisting strategy, peer dependency handling,
		registry URL, and more. Here is the PE7 recommended configuration:
	</p>

	<CodeCanvas filename=".npmrc" code={npmrcExample} />

	<p class="prose">
		<code>shamefully-hoist=true</code> is the most common setting you will see. pnpm's strict
		mode keeps packages nested (not hoisted to the root), which prevents phantom dependencies.
		But some tools (especially older ones) expect a flat <code>node_modules</code> and break
		without hoisting. <code>shamefully-hoist=true</code> restores the flat structure. It is
		called "shamefully" because it weakens pnpm's strictness — but pragmatism beats purity
		when tools break.
	</p>

	<p class="prose">
		<code>strict-peer-dependencies=false</code> prevents pnpm from failing when a package
		declares a peer dependency that does not exactly match the installed version. Many packages
		in the npm ecosystem have overly strict peer dependency ranges. This flag lets pnpm warn
		instead of error. Commit this file to Git so every team member uses the same configuration.
	</p>

	<!-- ═══ SECTION 6: TROUBLESHOOTING ═══ -->

	<h2>Troubleshooting</h2>

	<p class="prose">
		When something goes wrong with dependencies, the fix is almost always one of these
		commands. Memorize this ladder — start from the top and work down until the problem is
		resolved.
	</p>

	<CodeCanvas filename="Terminal — troubleshooting ladder" code={troubleshootCmds} />

	<p class="prose">
		The most common issue is <strong>"Module not found"</strong> after pulling from Git. This
		happens because someone added a new dependency to <code>package.json</code> but you have
		not run <code>pnpm install</code> to download it. The rule is simple: every time you pull
		and see changes to <code>package.json</code> or <code>pnpm-lock.yaml</code>, run
		<code>pnpm install</code>.
	</p>

	<p class="prose">
		The nuclear option — <code>rm -rf node_modules && pnpm install</code> — should be your
		last resort, not your first. It works because it forces pnpm to rebuild the symlink tree
		from scratch. But it is slow compared to a normal <code>pnpm install</code> (which is
		near-instant when the store already has the packages). Use it only when something is
		genuinely corrupted.
	</p>

	<!-- ═══ BREAK IT ON PURPOSE ═══ -->

	<h2>Break it on purpose</h2>

	<p class="prose">
		Understanding pnpm's behavior at the edges makes you faster at diagnosing real issues.
	</p>

	<ol class="experiments">
		<li>
			<strong>Run <code>pnpm install</code> in your home directory (not a project).</strong>
			You see "ERR_PNPM_NO_PKG_MANIFEST — No package.json found." pnpm needs a
			<code>package.json</code> to know what to install. Always <code>cd</code> into
			your project first.
		</li>
		<li>
			<strong>Run <code>pnpm add</code> with no package name.</strong> pnpm shows
			"ERR_PNPM_MISSING_PACKAGE_NAME." Every <code>add</code> command needs a target.
			This is pnpm being strict — npm would silently do nothing.
		</li>
		<li>
			<strong>Delete <code>node_modules/</code> and immediately run <code>pnpm dev</code>.</strong>
			Vite crashes: "Cannot find module." The dev server depends on packages in
			<code>node_modules</code>. Run <code>pnpm install</code> first — it recreates the
			symlinks from the global store in under a second.
		</li>
		<li>
			<strong>Open <code>pnpm-lock.yaml</code>, change a version number, save, and run
			<code>pnpm install</code>.</strong> pnpm detects the mismatch and regenerates the
			lockfile to match <code>package.json</code>. The manual edit is overwritten. This
			is why you never edit the lockfile — pnpm owns it.
		</li>
	</ol>

	<!-- ═══ HAVING ISSUES ═══ -->

	<details class="having-issues">
		<summary>Having issues? Here are all commands from this lesson</summary>
		<p>Every pnpm command covered in this lesson, in one place for reference.</p>
		<CodeCanvas filename="Terminal — complete pnpm reference" code={fullCode} />
	</details>

	<!-- ═══ WHAT YOU LEARNED ═══ -->

	<h2>What you learned</h2>

	<p class="prose">
		pnpm is the PE7 standard package manager because it solves the two fundamental problems
		with npm: phantom dependencies and disk bloat. Its content-addressable store keeps exactly
		one copy of every package version on your entire machine. When a project needs a package,
		pnpm creates a hard link — no copying, no downloading, near-instant. The strict
		<code>node_modules</code> structure means your code can only import packages you explicitly
		declared in <code>package.json</code>. If it works with pnpm, it works everywhere.
	</p>

	<p class="prose">
		The daily workflow is simple: <code>pnpm install</code> to set up a project,
		<code>pnpm add</code> to add packages, <code>pnpm dev</code> to start the dev server,
		<code>pnpm build</code> to create a production build. For one-off tools, use
		<code>pnpm dlx</code> instead of installing globally. For debugging dependency chains,
		use <code>pnpm why</code>. For cleanup, use <code>pnpm store prune</code>. These
		commands replace everything you would have used npm for — and they are faster.
	</p>

	<p class="prose">
		The lockfile (<code>pnpm-lock.yaml</code>) is sacred — always commit it, never edit it
		manually. The <code>.npmrc</code> file configures pnpm's behavior per project — use it
		to enable hoisting (<code>shamefully-hoist=true</code>) when older tools require it, and
		to relax peer dependency strictness when the ecosystem has not caught up. When dependencies
		break, follow the troubleshooting ladder: <code>pnpm install</code> first, then
		<code>--force</code>, then <code>store prune</code>, and only as a last resort the nuclear
		<code>rm -rf node_modules && pnpm install</code>.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-0/0-7-creating-a-project">0.7 — Creating a SvelteKit project</a> — use
		pnpm to scaffold and run your first Svelte 5 app.
	</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); max-inline-size: 960px; margin: 0 auto; color: var(--color-text); }
	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); color: var(--color-text); }
	h3 { font-size: var(--text-base); margin-block-start: var(--space-md); color: var(--color-text); }
	.analogy { background: var(--color-surface-2); border-inline-start: 4px solid var(--color-warning); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); color: var(--color-text); line-height: 1.7; max-inline-size: 68ch; font-style: italic; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } & strong { font-weight: 700; } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block: var(--space-xl); border: 2px dashed var(--color-warning); border-radius: var(--radius-lg); overflow: hidden; & > summary { padding: var(--space-md) var(--space-lg); font-weight: 700; font-size: var(--text-base); color: var(--color-warning); background: var(--color-surface-1); cursor: pointer; } & > p { padding: var(--space-sm) var(--space-lg); margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 480px) { .prose, .analogy { max-inline-size: 65ch; } }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-hero); } .prose, .analogy { max-inline-size: 72ch; } .page { padding: var(--space-2xl); } }
	@media (min-inline-size: 1024px) { .prose, .analogy { max-inline-size: 80ch; } }
</style>
