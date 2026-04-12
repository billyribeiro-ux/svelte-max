<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmdInit = '# Initialize a new Git repository\n' +
		'cd my-first-app\n' +
		'git init\n' +
		'\n' +
		'# Output: Initialized empty Git repository in .../my-first-app/.git/\n' +
		'\n' +
		'# This creates a hidden .git/ folder inside your project.\n' +
		'# That folder IS the repository — it stores all your history.\n' +
		'# You never open or edit .git/ directly.';

	const cmdStatus = '# Check the current state of your repo\n' +
		'git status\n' +
		'\n' +
		'# Output shows:\n' +
		'#   On branch main\n' +
		'#   No commits yet\n' +
		'#   Untracked files:\n' +
		'#     (use "git add <file>..." to include in what will be committed)\n' +
		'#         .gitignore\n' +
		'#         package.json\n' +
		'#         src/\n' +
		'#         ...\n' +
		'\n' +
		'# "Untracked" means Git sees the files but is not tracking them yet.\n' +
		'# You need to explicitly tell Git which files to track.';

	const cmdAdd = '# Stage ALL files for the first commit\n' +
		'git add .\n' +
		'\n' +
		'# The dot (.) means "everything in the current directory"\n' +
		'# Now run git status again:\n' +
		'git status\n' +
		'\n' +
		'# Output shows:\n' +
		'#   Changes to be committed:\n' +
		'#     new file: .gitignore\n' +
		'#     new file: package.json\n' +
		'#     new file: src/routes/+page.svelte\n' +
		'#     ...\n' +
		'\n' +
		'# Files moved from "untracked" to "staged"\n' +
		'# Staged = ready to be included in the next commit';

	const cmdAddSpecific = '# Stage specific files (instead of everything)\n' +
		'git add src/routes/+page.svelte\n' +
		'git add package.json\n' +
		'\n' +
		'# You can also stage multiple files at once:\n' +
		'git add src/routes/+page.svelte package.json\n' +
		'\n' +
		'# Or stage an entire folder:\n' +
		'git add src/\n' +
		'\n' +
		'# "git add ." stages EVERYTHING. Use it for the first commit.\n' +
		'# After that, prefer staging specific files so you know\n' +
		'# exactly what goes into each commit.';

	const cmdCommit = '# Create your first commit\n' +
		'git commit -m "feat: scaffold SvelteKit project"\n' +
		'\n' +
		'# -m = "message" — describes what this commit does\n' +
		'# The message goes inside quotes\n' +
		'\n' +
		'# Output:\n' +
		'#   [main (root-commit) a1b2c3d] feat: scaffold SvelteKit project\n' +
		'#    8 files changed, 150 insertions(+)\n' +
		'#    create mode 100644 .gitignore\n' +
		'#    create mode 100644 package.json\n' +
		'#    ...';

	const cmdLog = '# View your commit history\n' +
		'git log\n' +
		'\n' +
		'# Output:\n' +
		'# commit a1b2c3d4e5f6... (HEAD -> main)\n' +
		'# Author: Jane Doe <jane@example.com>\n' +
		'# Date:   Mon Apr 7 14:00:00 2026\n' +
		'#\n' +
		'#     feat: scaffold SvelteKit project\n' +
		'\n' +
		'# Press q to exit the log viewer\n' +
		'# (git log opens a pager — press q to quit)';

	const cmdLogOneline = '# Compact view — one line per commit\n' +
		'git log --oneline\n' +
		'\n' +
		'# Output:\n' +
		'# a1b2c3d feat: scaffold SvelteKit project\n' +
		'\n' +
		'# This is the view you will use most often.\n' +
		'# Short hash + commit message. Clean and scannable.';

	const cmdGitignore = '# .gitignore — files Git should NEVER track\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# SvelteKit creates a .gitignore with these entries:\n' +
		'node_modules/    # downloaded dependencies (huge, recreatable)\n' +
		'.svelte-kit/     # auto-generated build cache\n' +
		'build/           # production build output\n' +
		'\n' +
		'# Why ignore these?\n' +
		'# 1. node_modules/ can be 500MB+ — never commit it\n' +
		'# 2. .svelte-kit/ is regenerated every time you run pnpm dev\n' +
		'# 3. build/ is regenerated every time you run pnpm build\n' +
		'\n' +
		'# Rule: if a file can be recreated by running a command,\n' +
		'# it should be in .gitignore.';

	const cmdStagingAnalogy = '# The staging area — the checkout counter\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# Think of Git like a grocery store:\n' +
		'#\n' +
		'# Working directory = the store shelves\n' +
		'#   (all your files, modified or not)\n' +
		'#\n' +
		'# Staging area = the checkout counter\n' +
		'#   (files you picked up and are ready to "buy")\n' +
		'#\n' +
		'# Repository = your receipt\n' +
		'#   (the permanent record of what you bought)\n' +
		'#\n' +
		'# git add = pick items off the shelf → put on counter\n' +
		'# git commit = pay → items are now in your receipt\n' +
		'# git log = look at your receipts';

	const cmdResetSoft = '# UNDO a commit — keep changes STAGED\n' +
		'git reset --soft HEAD~1\n' +
		'\n' +
		'# HEAD~1 means "one commit before the current one"\n' +
		'# --soft means "undo the commit but keep everything staged"\n' +
		'\n' +
		'# Before: committed → After: staged (ready to commit again)\n' +
		'\n' +
		'# Use this when:\n' +
		'#   - You committed but want to change the message\n' +
		'#   - You committed but want to add more files\n' +
		'#   - You committed too early';

	const cmdResetMixed = '# UNDO a commit — keep changes UNSTAGED (default)\n' +
		'git reset HEAD~1\n' +
		'# (same as: git reset --mixed HEAD~1)\n' +
		'\n' +
		'# --mixed is the default if you do not specify a flag\n' +
		'\n' +
		'# Before: committed → After: unstaged (modified but not staged)\n' +
		'\n' +
		'# Use this when:\n' +
		'#   - You want to completely redo your staging\n' +
		'#   - You want to split one big commit into smaller ones\n' +
		'#   - You need to re-think what goes into the commit';

	const cmdResetHard = '# UNDO a commit — DISCARD changes (DANGER)\n' +
		'git reset --hard HEAD~1\n' +
		'\n' +
		'# ⚠️  WARNING: This DELETES your changes permanently.\n' +
		'# There is no undo for --hard. The changes are gone.\n' +
		'\n' +
		'# Before: committed → After: changes DELETED\n' +
		'\n' +
		'# Use this when:\n' +
		'#   - You made a commit that is completely wrong\n' +
		'#   - You want to throw away everything and go back\n' +
		'#   - You are SURE you do not need those changes\n' +
		'\n' +
		'# ONLY use on commits you have NOT pushed to GitHub.\n' +
		'# Once pushed, use git revert instead.';

	const cmdRevert = '# UNDO a commit by creating a NEW commit (safe)\n' +
		'git revert a1b2c3d\n' +
		'\n' +
		'# Replace a1b2c3d with the actual commit hash\n' +
		'# (find it with git log --oneline)\n' +
		'\n' +
		'# This does NOT delete history.\n' +
		'# It creates a NEW commit that undoes the old one.\n' +
		'\n' +
		'# Before: A → B → C\n' +
		'# After:  A → B → C → "Revert C"\n' +
		'\n' +
		'# Use this when:\n' +
		'#   - The commit has ALREADY been pushed to GitHub\n' +
		'#   - Other people might have pulled your code\n' +
		'#   - You want a clear record that something was undone';

	const cmdAmend = '# Fix the last commit message\n' +
		'git commit --amend -m "feat: scaffold SvelteKit project with TypeScript"\n' +
		'\n' +
		'# This replaces the last commit message.\n' +
		'# The commit itself stays the same — only the message changes.\n' +
		'\n' +
		'# Add a forgotten file to the last commit:\n' +
		'git add forgotten-file.txt\n' +
		'git commit --amend --no-edit\n' +
		'\n' +
		'# --no-edit means "keep the same message, just add the file"\n' +
		'\n' +
		'# ONLY use amend on commits you have NOT pushed.\n' +
		'# Amending rewrites history — bad for shared branches.';

	const cmdUndoSummary = '# When to use each undo method\n' +
		'# ──────────────────────────────\n' +
		'\n' +
		'# git reset --soft HEAD~1\n' +
		'#   → Undo commit, keep changes STAGED\n' +
		'#   → "I committed too early"\n' +
		'\n' +
		'# git reset HEAD~1 (or --mixed)\n' +
		'#   → Undo commit, keep changes UNSTAGED\n' +
		'#   → "I want to redo my staging"\n' +
		'\n' +
		'# git reset --hard HEAD~1\n' +
		'#   → Undo commit, DELETE changes\n' +
		'#   → "Throw it all away" (DANGER)\n' +
		'\n' +
		'# git revert <hash>\n' +
		'#   → Create NEW commit that undoes an old one\n' +
		'#   → "This was already pushed to GitHub"\n' +
		'\n' +
		'# git commit --amend\n' +
		'#   → Fix the last commit (message or files)\n' +
		'#   → "Quick fix before I push"\n' +
		'\n' +
		'# RULE: reset for LOCAL unpushed commits\n' +
		'#        revert for PUSHED commits\n' +
		'#        amend for quick fixes before pushing';

	const fullCode = '# Full command sequence for Lesson 0.10\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Navigate to your project\n' +
		'cd my-first-app\n' +
		'\n' +
		'# 2. Initialize Git\n' +
		'git init\n' +
		'\n' +
		'# 3. Check status\n' +
		'git status\n' +
		'\n' +
		'# 4. Stage all files\n' +
		'git add .\n' +
		'\n' +
		'# 5. Commit\n' +
		'git commit -m "feat: scaffold SvelteKit project"\n' +
		'\n' +
		'# 6. View history\n' +
		'git log --oneline\n' +
		'\n' +
		'# ── Undo commands (for reference) ──\n' +
		'# git reset --soft HEAD~1     (undo, keep staged)\n' +
		'# git reset HEAD~1            (undo, keep unstaged)\n' +
		'# git reset --hard HEAD~1     (undo, DELETE changes)\n' +
		'# git revert <hash>           (new commit that undoes)\n' +
		'# git commit --amend -m "msg" (fix last commit message)\n' +
		'# git commit --amend --no-edit (add file to last commit)';
</script>

<section class="page">
	<h1>0.10 — Git basics</h1>

	<p class="analogy">
		Staging is putting items on the checkout counter before paying. You walk through the
		store (your project), pick up items you want (changed files), place them on the counter
		(<code>git add</code>), and then pay (<code>git commit</code>). The receipt
		(<code>git log</code>) is your permanent record. You can put items back on the shelf
		before paying, but once you have the receipt, the transaction is recorded.
	</p>

	<p class="prose">
		This lesson teaches you the commands you will use every single day as a developer. By
		the end, you will know how to initialize a repository, stage files, commit snapshots,
		view your history, write a <code>.gitignore</code>, and — critically — how to undo
		mistakes. Undoing commits is one of the most important skills in Git, and most tutorials
		skip it. We will not.
	</p>

	<!-- ── The staging analogy ── -->
	<h2>The three areas of Git</h2>

	<CodeCanvas filename="Terminal" code={cmdStagingAnalogy} />

	<p class="prose">
		Every file in a Git project exists in one of three places: the <strong>working
		directory</strong> (your actual files on disk), the <strong>staging area</strong> (files
		you have marked for the next commit), and the <strong>repository</strong> (committed
		snapshots stored in <code>.git/</code>). Understanding this flow is the key to
		understanding Git: edit files, stage them, commit them.
	</p>

	<!-- ── git init ── -->
	<h2>Step 1 — Initialize the repository</h2>

	<CodeCanvas filename="Terminal" code={cmdInit} />

	<p class="prose">
		<code>git init</code> creates a hidden <code>.git/</code> folder inside your project.
		That folder <em>is</em> the repository. It contains all your commit history, branch
		information, and configuration. You never open or edit this folder directly. If you
		delete <code>.git/</code>, all your Git history is gone — the project files remain, but
		every commit, every branch, every piece of history disappears.
	</p>

	<!-- ── git status ── -->
	<h2>Step 2 — Check the status</h2>

	<CodeCanvas filename="Terminal" code={cmdStatus} />

	<p class="prose">
		<code>git status</code> is the command you will run most often. It tells you what has
		changed, what is staged, and what is untracked. Get in the habit of running it before
		every <code>git add</code> and before every <code>git commit</code>. It is your
		dashboard — it shows you exactly where you are.
	</p>

	<!-- ── git add ── -->
	<h2>Step 3 — Stage your files</h2>

	<CodeCanvas filename="Terminal" code={cmdAdd} />

	<p class="prose">
		<code>git add .</code> stages everything in the current directory. The dot means "all
		files." For your first commit, this is the right choice — you want everything tracked.
		After that, you will often stage specific files instead of everything.
	</p>

	<CodeCanvas filename="Terminal" code={cmdAddSpecific} />

	<p class="prose">
		Staging specific files gives you control over what goes into each commit. Maybe you
		changed three files but only two are related to the same feature. Stage just those two,
		commit them with a clear message, then stage and commit the third separately. Small,
		focused commits are easier to understand and easier to undo.
	</p>

	<!-- ── git commit ── -->
	<h2>Step 4 — Commit the snapshot</h2>

	<CodeCanvas filename="Terminal" code={cmdCommit} />

	<p class="prose">
		<code>git commit -m "message"</code> takes everything in the staging area and saves it
		as a permanent snapshot. The <code>-m</code> flag lets you write the message inline. The
		message should describe <strong>what you did and why</strong>, not just "updated files."
		Good messages make your history useful. Bad messages make it useless.
	</p>

	<!-- ── git log ── -->
	<h2>Step 5 — View your history</h2>

	<CodeCanvas filename="Terminal" code={cmdLog} />

	<CodeCanvas filename="Terminal" code={cmdLogOneline} />

	<p class="prose">
		<code>git log</code> shows your full commit history. Each commit has a unique hash (like
		<code>a1b2c3d</code>), an author, a date, and a message. The <code>--oneline</code> flag
		shows a compact view: just the short hash and message. You will use <code>--oneline</code>
		constantly. Press <code>q</code> to exit the log viewer.
	</p>

	<!-- ── .gitignore ── -->
	<h2>.gitignore</h2>

	<CodeCanvas filename="Terminal" code={cmdGitignore} />

	<p class="prose">
		A <code>.gitignore</code> file tells Git which files and folders to pretend do not exist.
		SvelteKit generates one for you with sensible defaults. The big three are
		<code>node_modules/</code> (too large, recreatable), <code>.svelte-kit/</code>
		(auto-generated), and <code>build/</code> (auto-generated). The rule of thumb: if a file
		can be recreated by running a command, it belongs in <code>.gitignore</code>.
	</p>

	<!-- ── UNDO COMMITS ── -->
	<h2>Undoing commits</h2>

	<p class="prose">
		This is one of the most important sections in the entire course. Every developer makes
		mistakes. You will commit too early, commit the wrong files, write a bad message, or
		realize your change broke something. Git gives you multiple ways to undo, and knowing
		which one to use in each situation will save you hours of panic.
	</p>

	<h3>git reset --soft: undo commit, keep changes staged</h3>

	<CodeCanvas filename="Terminal" code={cmdResetSoft} />

	<p class="prose">
		<code>git reset --soft HEAD~1</code> is the gentlest undo. It removes the last commit
		but keeps all your changes in the staging area, ready to commit again. Use this when you
		committed too early or want to combine it with more changes. Nothing is lost — your
		files are exactly where they were, just no longer committed.
	</p>

	<h3>git reset --mixed: undo commit, keep changes unstaged</h3>

	<CodeCanvas filename="Terminal" code={cmdResetMixed} />

	<p class="prose">
		<code>git reset HEAD~1</code> (without a flag, <code>--mixed</code> is the default) goes
		one step further. It removes the commit <em>and</em> unstages the files. Your changes
		still exist on disk — they are just back in the "modified but not staged" state. Use this
		when you want to completely redo your staging, like splitting one big commit into smaller
		focused ones.
	</p>

	<h3>git reset --hard: undo commit, DELETE changes</h3>

	<CodeCanvas filename="Terminal" code={cmdResetHard} />

	<p class="prose">
		<code>git reset --hard HEAD~1</code> is the nuclear option. It removes the commit
		<strong>and deletes all the changes</strong>. Your files are reverted to the state they
		were in before that commit. There is no undo for <code>--hard</code>. The changes are
		gone forever. Only use this when you are absolutely certain you do not need those changes
		and you have not pushed the commit to GitHub.
	</p>

	<h3>git revert: undo by creating a new commit</h3>

	<CodeCanvas filename="Terminal" code={cmdRevert} />

	<p class="prose">
		<code>git revert</code> is the safe way to undo a commit that has already been pushed to
		GitHub. Instead of rewriting history (which causes problems for your teammates), it
		creates a <strong>new commit</strong> that does the opposite of the old one. The original
		commit stays in the history. The new "revert" commit undoes its changes. Everyone can see
		what happened and why.
	</p>

	<h3>git commit --amend: fix the last commit</h3>

	<CodeCanvas filename="Terminal" code={cmdAmend} />

	<p class="prose">
		<code>git commit --amend</code> lets you fix the last commit without creating a new one.
		You can change the message with <code>-m "new message"</code> or add forgotten files
		with <code>--no-edit</code>. This rewrites the commit, so only use it on commits you
		have not pushed yet. Once pushed, use <code>revert</code> instead.
	</p>

	<!-- ── When to use each ── -->
	<h2>When to use each undo method</h2>

	<CodeCanvas filename="Terminal" code={cmdUndoSummary} />

	<p class="prose">
		The golden rule: <strong>reset</strong> for local, unpushed commits.
		<strong>Revert</strong> for commits that are already on GitHub. <strong>Amend</strong>
		for quick fixes to the very last commit before pushing. If you remember nothing else
		from this section, remember that rule. It will keep you out of trouble.
	</p>

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<ol class="experiments">
		<li>
			<strong>Run <code>git commit</code> without <code>-m</code>.</strong> Type
			<code>git commit</code> with no message flag. Git opens a text editor called Vim.
			You will see a mostly blank screen with some comment lines. Do not panic. Type
			<code>:q!</code> and press Enter to quit without saving. Next time, always use
			<code>-m "your message"</code>.
		</li>
		<li>
			<strong>Add a file to <code>.gitignore</code> after it is already tracked.</strong>
			If Git is already tracking a file, adding it to <code>.gitignore</code> does not
			remove it from tracking. You need to run <code>git rm --cached filename</code> first.
			This removes it from Git's tracking without deleting the actual file. Then commit.
		</li>
		<li>
			<strong>Delete the <code>.git/</code> folder.</strong> Run
			<code>rm -rf .git</code> in your project. Now run <code>git log</code>. "Fatal: not a
			git repository." All your history is gone. The project files are untouched, but every
			commit, branch, and record has been erased. This is why you push to GitHub — it is
			your backup. Run <code>git init</code> to start fresh.
		</li>
		<li>
			<strong>Change a file after committing.</strong> Commit your project, then edit any
			file. Run <code>git status</code>. Git shows the file as "modified." The commit
			captured a snapshot, and now your working directory has diverged from it. This is
			normal — it is just Git telling you "something changed since the last snapshot."
		</li>
	</ol>

	<!-- ── Having issues ── -->
	<details class="having-issues">
		<summary>Having issues? Here are all commands from this lesson</summary>
		<p>Copy and paste these commands one at a time.</p>
		<CodeCanvas filename="Terminal" code={fullCode} />
	</details>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		The Git workflow is a three-step cycle: edit files in your working directory, stage them
		with <code>git add</code>, and save a snapshot with <code>git commit -m "message"</code>.
		Use <code>git status</code> constantly to see where you are, and <code>git log --oneline</code>
		to review your history. The <code>.gitignore</code> file tells Git to skip files that are
		auto-generated or too large to track, like <code>node_modules/</code>.
	</p>

	<p class="prose">
		You learned five ways to undo mistakes. <code>git reset --soft HEAD~1</code> undoes a
		commit but keeps changes staged. <code>git reset HEAD~1</code> undoes a commit and
		unstages changes. <code>git reset --hard HEAD~1</code> undoes a commit and deletes all
		changes permanently. <code>git revert</code> creates a new commit that undoes an old one
		(safe for shared branches). <code>git commit --amend</code> fixes the last commit's
		message or adds forgotten files.
	</p>

	<p class="prose">
		The golden rule: use <code>reset</code> for local unpushed commits, <code>revert</code>
		for commits already on GitHub, and <code>amend</code> for quick fixes before pushing.
		Every developer makes mistakes. The difference between a beginner and a professional is
		not that professionals avoid mistakes — it is that they know how to undo them cleanly.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/0-11-github">0.11 — GitHub</a> — you will
		connect your local repository to the cloud so your code is backed up and shareable.
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
