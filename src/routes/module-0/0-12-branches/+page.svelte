<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmdAnalogy = '# Branches are parallel universes.\n' +
		'#\n' +
		'# "main" is the published novel — stable, reviewed, shipped.\n' +
		'# A feature branch is a draft chapter — experimental, in progress.\n' +
		'#\n' +
		'# You write the draft chapter on a separate branch.\n' +
		'# When the chapter is done and reviewed, you merge it\n' +
		'# into the novel (main).\n' +
		'#\n' +
		'# If the chapter is bad? Delete the branch.\n' +
		'# The novel (main) was never affected.\n' +
		'#\n' +
		'# This is how every professional team works:\n' +
		'# Never write directly in the published novel.';

	const cmdNaming = '# PE7 branch naming conventions\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# feature/ — adding something new\n' +
		'feature/add-login-page\n' +
		'feature/add-hero-section\n' +
		'feature/add-dark-mode\n' +
		'\n' +
		'# fix/ — repairing something broken\n' +
		'fix/header-overflow\n' +
		'fix/broken-login-redirect\n' +
		'fix/typo-in-footer\n' +
		'\n' +
		'# refactor/ — improving code without changing behavior\n' +
		'refactor/simplify-auth-logic\n' +
		'refactor/extract-button-component\n' +
		'\n' +
		'# docs/ — updating documentation\n' +
		'docs/update-readme\n' +
		'docs/add-contributing-guide\n' +
		'\n' +
		'# Pattern: category/short-description (kebab-case)\n' +
		'# Always lowercase, always hyphens, always descriptive.';

	const cmdCreate = '# Create a new branch and switch to it\n' +
		'\n' +
		'git checkout -b feature/add-hero\n' +
		'\n' +
		'# -b = "create a new branch"\n' +
		'# feature/add-hero = the branch name\n' +
		'\n' +
		'# Output:\n' +
		'# Switched to a new branch "feature/add-hero"\n' +
		'\n' +
		'# You are now on the feature branch.\n' +
		'# Any commits you make will be on THIS branch,\n' +
		'# not on main. Main stays untouched.';

	const cmdList = '# List all branches\n' +
		'\n' +
		'git branch\n' +
		'\n' +
		'# Output:\n' +
		'#   main\n' +
		'# * feature/add-hero\n' +
		'\n' +
		'# The * indicates your current branch.\n' +
		'# You can have many branches at once.';

	const cmdWorkflow = '# Full branch workflow\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Create and switch to a feature branch\n' +
		'git checkout -b feature/add-hero\n' +
		'\n' +
		'# 2. Make your changes (edit files)\n' +
		'# ... edit src/routes/+page.svelte ...\n' +
		'\n' +
		'# 3. Stage and commit\n' +
		'git add .\n' +
		'git commit -m "feat: add hero section with profile card"\n' +
		'\n' +
		'# 4. Push the branch to GitHub\n' +
		'git push -u origin feature/add-hero\n' +
		'\n' +
		'# 5. Create a Pull Request on GitHub\n' +
		'#    (described below)\n' +
		'\n' +
		'# 6. After the PR is merged, switch back to main\n' +
		'git checkout main\n' +
		'git pull origin main\n' +
		'\n' +
		'# 7. Delete the feature branch (it is merged, no longer needed)\n' +
		'git branch -d feature/add-hero';

	const cmdPR = '# Creating a Pull Request (PR) on GitHub\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# After pushing your branch, go to github.com/user/repo.\n' +
		'# GitHub shows a yellow banner:\n' +
		'# "feature/add-hero had recent pushes — Compare & pull request"\n' +
		'#\n' +
		'# Click "Compare & pull request"\n' +
		'#\n' +
		'# Fill in:\n' +
		'#   Title: feat: add hero section with profile card\n' +
		'#   Description:\n' +
		'#     ## Summary\n' +
		'#     - Add hero section with name, role, and bio\n' +
		'#     - Add profile card with avatar\n' +
		'#\n' +
		'#     ## Test plan\n' +
		'#     - [ ] Hero renders on home page\n' +
		'#     - [ ] Profile card shows correct data\n' +
		'#\n' +
		'# Click "Create pull request"';

	const cmdReview = '# Code review basics\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# A Pull Request is a REQUEST to merge your branch into main.\n' +
		'# Before merging, someone reviews your code:\n' +
		'#\n' +
		'# 1. They read your changes line by line\n' +
		'# 2. They leave comments and suggestions\n' +
		'# 3. They approve or request changes\n' +
		'#\n' +
		'# On a solo project, YOU are the reviewer.\n' +
		'# Still use PRs — they create a clean record of every change.\n' +
		'#\n' +
		'# On a team, PRs prevent bugs from reaching production.\n' +
		'# Two pairs of eyes are better than one.';

	const cmdMerge = '# Merging a Pull Request\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# GitHub offers three merge strategies:\n' +
		'#\n' +
		'# 1. "Create a merge commit"\n' +
		'#    Preserves all individual commits.\n' +
		'#    History shows every commit from the branch.\n' +
		'#\n' +
		'# 2. "Squash and merge" (PE7 recommended)\n' +
		'#    Combines all branch commits into ONE commit on main.\n' +
		'#    History is clean — one commit per feature.\n' +
		'#    Example: 5 commits become 1 clean commit.\n' +
		'#\n' +
		'# 3. "Rebase and merge"\n' +
		'#    Replays commits on top of main.\n' +
		'#    Linear history, but preserves individual commits.\n' +
		'#\n' +
		'# PE7 recommends "Squash and merge" for beginners.\n' +
		'# It keeps main clean and easy to read.';

	const cmdCleanup = '# After merging: clean up\n' +
		'\n' +
		'# Switch back to main\n' +
		'git checkout main\n' +
		'\n' +
		'# Pull the merged changes\n' +
		'git pull origin main\n' +
		'\n' +
		'# Delete the local feature branch\n' +
		'git branch -d feature/add-hero\n' +
		'\n' +
		'# -d = "delete" (safe — only works if the branch is merged)\n' +
		'# -D = "force delete" (deletes even if not merged — be careful)\n' +
		'\n' +
		'# Optional: delete the remote branch too\n' +
		'git push origin --delete feature/add-hero\n' +
		'\n' +
		'# Now you are on main with all the latest code.\n' +
		'# Ready to create the next feature branch.';

	const cmdBreak1 = '# Experiment 1: Switch branches with uncommitted changes\n' +
		'\n' +
		'# Edit a file but do NOT commit.\n' +
		'git checkout main\n' +
		'\n' +
		'# Git may warn you:\n' +
		'# "error: Your local changes to the following files would be\n' +
		'# overwritten by checkout"\n' +
		'\n' +
		'# Git protects your work. It will not silently discard changes.\n' +
		'# Fix: either commit your changes first or stash them:\n' +
		'git stash          # temporarily shelve changes\n' +
		'git checkout main  # now it works\n' +
		'git stash pop      # bring changes back later';

	const cmdBreak2 = '# Experiment 2: Branch name with spaces\n' +
		'\n' +
		'git checkout -b "feature/add hero"\n' +
		'\n' +
		'# This might work locally, but spaces in branch names\n' +
		'# cause problems when pushing to GitHub and in scripts.\n' +
		'# Always use kebab-case: feature/add-hero';

	const cmdBreak3 = '# Experiment 3: Create a branch with a name that already exists\n' +
		'\n' +
		'git checkout -b feature/add-hero\n' +
		'# Created successfully.\n' +
		'\n' +
		'git checkout main\n' +
		'git checkout -b feature/add-hero\n' +
		'\n' +
		'# ERROR: fatal: a branch named "feature/add-hero" already exists\n' +
		'\n' +
		'# Fix: pick a different name, or switch to the existing one:\n' +
		'git checkout feature/add-hero  # switch (no -b)';

	const cmdBreak4 = '# Experiment 4: Push to a merged branch\n' +
		'\n' +
		'# After merging a PR, the branch still exists locally.\n' +
		'# You can still make commits and push to it.\n' +
		'# But this is confusing — the PR is closed.\n' +
		'\n' +
		'# Best practice: delete the branch after merging.\n' +
		'git branch -d feature/add-hero\n' +
		'# Create a new branch for the next feature.';

	const fullCode = '# Full branch workflow for Lesson 0.12\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Create branch\n' +
		'git checkout -b feature/add-hero\n' +
		'\n' +
		'# 2. Edit, stage, commit\n' +
		'git add .\n' +
		'git commit -m "feat: add hero section"\n' +
		'\n' +
		'# 3. Push branch\n' +
		'git push -u origin feature/add-hero\n' +
		'\n' +
		'# 4. Create PR on GitHub → review → merge\n' +
		'\n' +
		'# 5. Clean up\n' +
		'git checkout main\n' +
		'git pull origin main\n' +
		'git branch -d feature/add-hero';
</script>

<section class="page">
	<h1>0.12 — Branches &amp; PRs</h1>

	<p class="analogy">
		Branches are parallel universes. <code>main</code> is the published novel — stable, reviewed,
		shipped to readers. A feature branch is a draft chapter — you write it separately, revise it,
		and only merge it into the novel when it is ready. If the chapter is terrible, you delete the
		branch and the novel was never affected.
	</p>

	<p class="prose">
		Until now, you have been working on a single branch: <code>main</code>. That works for solo
		learning, but in the real world nobody writes code directly on <code>main</code>. Instead,
		you create a <strong>branch</strong> for each feature, make your changes there, and then
		open a <strong>Pull Request</strong> (PR) to merge those changes into <code>main</code>
		after review.
	</p>

	<p class="prose">
		This workflow protects <code>main</code> from unfinished or broken code. It also creates a
		clean record of every change — who wrote it, why, and when. By the end of this lesson, you
		will know how to create branches, push them to GitHub, open PRs, and clean up after merging.
	</p>

	<CodeCanvas filename="Terminal" code={cmdAnalogy} />

	<!-- ── Branch naming ── -->
	<h2>PE7 branch naming</h2>

	<p class="prose">
		Branch names follow a convention: <code>category/short-description</code>. The category
		tells your team what kind of work this is. The description says what specifically is being
		done. Everything is lowercase with hyphens (kebab-case). No spaces, no capital letters, no
		underscores.
	</p>

	<CodeCanvas filename="Terminal — Naming Conventions" code={cmdNaming} />

	<p class="prose">
		Good branch names are scannable. When you run <code>git branch</code> and see ten branches,
		you can instantly tell what each one does. <code>feature/add-hero-section</code> is clear.
		<code>my-branch</code> tells you nothing.
	</p>

	<!-- ── Creating a branch ── -->
	<h2>Creating a branch</h2>

	<p class="prose">
		The <code>git checkout -b</code> command creates a new branch and switches to it in one step.
		Your new branch starts as an exact copy of whatever branch you were on (usually
		<code>main</code>). From this point, any commits you make go on the new branch only.
	</p>

	<CodeCanvas filename="Terminal" code={cmdCreate} />

	<p class="prose">
		To see all your branches, run <code>git branch</code>. The asterisk (<code>*</code>) shows
		which branch you are currently on.
	</p>

	<CodeCanvas filename="Terminal" code={cmdList} />

	<!-- ── Full workflow ── -->
	<h2>The full branch workflow</h2>

	<p class="prose">
		Here is the complete lifecycle of a feature branch, from creation to cleanup. This is the
		workflow you will follow on every project, at every company, for your entire career.
	</p>

	<CodeCanvas filename="Terminal — Full Workflow" code={cmdWorkflow} />

	<p class="prose">
		Let us break down the key steps: creating a PR, understanding code review, and choosing
		a merge strategy.
	</p>

	<!-- ── Pull Requests ── -->
	<h2>Creating a Pull Request</h2>

	<p class="prose">
		After pushing your branch to GitHub, you create a <strong>Pull Request</strong> (PR). A PR is
		a formal request to merge your branch into <code>main</code>. It shows exactly what you
		changed, file by file, line by line. Team members review the changes before approving.
	</p>

	<CodeCanvas filename="GitHub UI — Pull Request" code={cmdPR} />

	<p class="prose">
		The PR title should be concise and follow the same commit message conventions (we cover these
		in Lesson 0.13). The description should explain <strong>what</strong> you did and
		<strong>how to test it</strong>. This helps reviewers understand your changes without reading
		every line of code.
	</p>

	<!-- ── Code review ── -->
	<h2>Code review</h2>

	<p class="prose">
		Code review is the practice of having someone else read your code before it is merged. They
		look for bugs, unclear code, missing edge cases, and style issues. Even on solo projects,
		PRs create a written record of every change — useful when you need to understand why something
		was done months later.
	</p>

	<CodeCanvas filename="Terminal" code={cmdReview} />

	<!-- ── Merge strategies ── -->
	<h2>Merging a PR</h2>

	<p class="prose">
		When the PR is approved, you merge it. GitHub offers three strategies. PE7 recommends
		<strong>squash and merge</strong> for beginners because it keeps <code>main</code>'s history
		clean — one commit per feature instead of many small work-in-progress commits.
	</p>

	<CodeCanvas filename="GitHub UI — Merge Options" code={cmdMerge} />

	<!-- ── Cleanup ── -->
	<h2>After merging: clean up</h2>

	<p class="prose">
		After the PR is merged, switch back to <code>main</code>, pull the latest changes, and
		delete the feature branch. This keeps your branch list clean and avoids confusion.
	</p>

	<CodeCanvas filename="Terminal" code={cmdCleanup} />

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<p class="prose">
		Branching introduces new ways to make mistakes. Try these experiments to learn what the
		errors look like and how to fix them.
	</p>

	<ol class="experiments">
		<li>
			<strong>Switch branches with uncommitted changes.</strong> Edit a file, do not commit, then
			try <code>git checkout main</code>. Git warns you that your changes would be overwritten. It
			protects your work. Fix: commit your changes first, or use <code>git stash</code> to
			temporarily shelve them.
		</li>
		<li>
			<strong>Branch name with spaces.</strong> Try <code>git checkout -b "feature/add hero"</code>.
			It might create the branch, but spaces cause problems when pushing and in CI scripts. Always
			use hyphens: <code>feature/add-hero</code>.
		</li>
		<li>
			<strong>Create a branch that already exists.</strong> Try to create the same branch twice.
			Git says "a branch named X already exists." Either pick a different name or switch to the
			existing one with <code>git checkout feature/add-hero</code> (no <code>-b</code>).
		</li>
		<li>
			<strong>Push to a merged branch.</strong> After merging a PR, the branch still exists locally.
			You could make more commits, but the PR is closed. This leads to confusion. Best practice:
			delete the branch after merging and create a fresh one for the next feature.
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
			<strong>"Your local changes would be overwritten"</strong> — You have uncommitted changes.
			Either commit them (<code>git add . && git commit -m "wip"</code>) or stash them
			(<code>git stash</code>) before switching branches.
		</p>
		<p>
			<strong>"Branch already exists"</strong> — A branch with that name already exists. Use
			<code>git checkout feature/name</code> (without <code>-b</code>) to switch to it, or pick
			a different name.
		</p>
		<p>
			<strong>PR shows "no changes"</strong> — Your branch is identical to main. You either forgot
			to commit your changes or you are on the wrong branch. Check with <code>git log --oneline</code>.
		</p>
		<p>
			<strong>"Cannot delete branch — not fully merged"</strong> — Git is protecting you. The branch
			has commits that are not in main. If you are sure you want to delete it, use
			<code>git branch -D feature/name</code> (capital D forces deletion).
		</p>
	</details>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		Branches let you work on features in isolation without touching <code>main</code>. The PE7
		naming convention is <code>category/description</code> — like <code>feature/add-hero</code>,
		<code>fix/header-overflow</code>, or <code>docs/update-readme</code>. Always lowercase,
		always kebab-case.
	</p>

	<p class="prose">
		The branch workflow is: create branch, make changes, commit, push, open a Pull Request,
		get reviewed, merge, clean up. PRs are the gateway to <code>main</code>. They provide code
		review, discussion, and a permanent record of every change.
	</p>

	<p class="prose">
		PE7 recommends squash and merge for beginners. It combines all branch commits into one clean
		commit on <code>main</code>. After merging, delete the feature branch — it served its purpose.
		Switch back to <code>main</code>, pull, and start the next feature.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/0-13-professional-git">0.13 — Professional Git (PE7 way)</a> — learn
		commit message conventions, rebase, and the practices that separate amateurs from professionals.
	</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); max-width: 960px; margin: 0 auto; color: var(--color-text); }
	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); color: var(--color-text); }
	.analogy { background: var(--color-surface-2); border-inline-start: 4px solid var(--color-warning); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); color: var(--color-text); line-height: 1.7; max-inline-size: 68ch; font-style: italic; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } & strong { font-weight: 700; } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block: var(--space-xl); border: 2px dashed var(--color-warning); border-radius: var(--radius-lg); overflow: hidden; & > summary { padding: var(--space-md) var(--space-lg); font-weight: 700; font-size: var(--text-base); color: var(--color-warning); background: var(--color-surface-1); cursor: pointer; } & > p { padding: var(--space-sm) var(--space-lg); margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-width: 480px) { .prose, .analogy { max-inline-size: 65ch; } }
	@media (min-width: 768px) { h1 { font-size: var(--text-hero); } .prose, .analogy { max-inline-size: 72ch; } .page { padding: var(--space-2xl); } }
	@media (min-width: 1024px) { .prose, .analogy { max-inline-size: 80ch; } }
</style>
