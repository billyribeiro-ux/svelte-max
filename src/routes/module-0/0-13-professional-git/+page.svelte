<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmdPrefixes = '# Conventional commit prefixes\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# feat:     — a new feature\n' +
		'# fix:      — a bug fix\n' +
		'# refactor: — code change that neither fixes a bug nor adds a feature\n' +
		'# docs:     — documentation only changes\n' +
		'# chore:    — maintenance (dependencies, config, build)\n' +
		'# style:    — formatting, whitespace (not CSS — code formatting)\n' +
		'# test:     — adding or updating tests\n' +
		'\n' +
		'# Format: prefix: short description\n' +
		'# Lowercase. No period at the end. Under 72 characters.';

	const cmdGood = '# GOOD commit messages\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'git commit -m "feat: add hero section with profile card"\n' +
		'git commit -m "fix: prevent header overflow on mobile"\n' +
		'git commit -m "refactor: extract button into reusable component"\n' +
		'git commit -m "docs: add setup instructions to README"\n' +
		'git commit -m "chore: update svelte to 5.1.0"\n' +
		'git commit -m "style: format auth module with prettier"\n' +
		'git commit -m "test: add unit tests for login validation"\n' +
		'\n' +
		'# Each message tells you:\n' +
		'# 1. WHAT kind of change (prefix)\n' +
		'# 2. WHAT specifically changed (description)';

	const cmdBad = '# BAD commit messages\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'git commit -m "did stuff"\n' +
		'git commit -m "fix"\n' +
		'git commit -m "updates"\n' +
		'git commit -m "WIP"\n' +
		'git commit -m "asdfasdf"\n' +
		'git commit -m "changes"\n' +
		'git commit -m "fixed the thing"\n' +
		'\n' +
		'# These are useless. Six months from now,\n' +
		'# you will look at the history and have no idea\n' +
		'# what "did stuff" means. Your teammates will hate you.\n' +
		'# Your future self will hate you.';

	const cmdSmall = '# Small, focused commits\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# BAD: one giant commit\n' +
		'git commit -m "feat: add hero, navbar, footer, dark mode, and auth"\n' +
		'# This commit does 5 different things.\n' +
		'# If the navbar has a bug, you cannot revert it\n' +
		'# without losing the hero, footer, and everything else.\n' +
		'\n' +
		'# GOOD: small focused commits\n' +
		'git commit -m "feat: add hero section"\n' +
		'git commit -m "feat: add navigation bar"\n' +
		'git commit -m "feat: add footer"\n' +
		'git commit -m "feat: add dark mode toggle"\n' +
		'git commit -m "feat: add authentication flow"\n' +
		'\n' +
		'# Each commit does ONE thing.\n' +
		'# Easy to review. Easy to revert. Easy to understand.';

	const cmdRebase = '# git rebase vs git merge\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# MERGE: creates a merge commit, preserves history\n' +
		'#\n' +
		'#   main:    A---B---C---------M (merge commit)\n' +
		'#                  \\         /\n' +
		'#   feature:        D---E---F\n' +
		'#\n' +
		'# The merge commit (M) ties the two branches together.\n' +
		'# History shows the branch existed.\n' +
		'\n' +
		'# REBASE: replays commits, creates LINEAR history\n' +
		'#\n' +
		'#   main:    A---B---C\n' +
		'#   feature:          D\'---E\'---F\'  (replayed on top of C)\n' +
		'#\n' +
		'# No merge commit. History looks like a straight line.\n' +
		'# Cleaner, easier to read with git log --oneline.';

	const cmdRebaseUse = '# How to use rebase (PE7 way)\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# When pulling from GitHub, use --rebase:\n' +
		'git pull --rebase origin main\n' +
		'\n' +
		'# This replays your local commits on top of the\n' +
		'# latest remote commits. No merge commit clutter.\n' +
		'\n' +
		'# To update your feature branch with latest main:\n' +
		'git checkout feature/add-hero\n' +
		'git rebase main\n' +
		'\n' +
		'# This takes your feature commits and replays them\n' +
		'# on top of the latest main. Keeps your branch current.\n' +
		'\n' +
		'# GOLDEN RULE: Never rebase a branch that other people\n' +
		'# are also working on. Rebase rewrites commit history.\n' +
		'# On YOUR feature branch: rebase is safe.\n' +
		'# On main or shared branches: NEVER rebase.';

	const cmdPRDesc = '# PE7 Pull Request description format\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# Title: feat: add hero section with profile card\n' +
		'#\n' +
		'# ## Summary\n' +
		'# - Add hero section with name, role, and availability badge\n' +
		'# - Profile card renders from typed Profile interface\n' +
		'# - Responsive layout using CSS Grid\n' +
		'#\n' +
		'# ## Test plan\n' +
		'# - [ ] Hero renders correctly at 320px, 768px, 1024px\n' +
		'# - [ ] Profile data matches the Profile interface\n' +
		'# - [ ] pnpm check passes with no errors\n' +
		'# - [ ] Lighthouse accessibility score >= 90\n' +
		'\n' +
		'# The Summary explains WHAT and WHY.\n' +
		'# The Test Plan tells reviewers HOW to verify.';

	const cmdProtection = '# Branch protection rules (conceptual)\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# On a professional repo, main is PROTECTED:\n' +
		'#\n' +
		'# 1. No direct pushes to main\n' +
		'#    Everyone must go through a Pull Request.\n' +
		'#\n' +
		'# 2. Require at least 1 approval\n' +
		'#    Someone must review and approve before merging.\n' +
		'#\n' +
		'# 3. Require status checks to pass\n' +
		'#    Tests, linting, and type checking must all pass.\n' +
		'#\n' +
		'# 4. Require branches to be up to date\n' +
		'#    Your branch must include the latest main commits.\n' +
		'#\n' +
		'# You can set these up on GitHub:\n' +
		'# Settings → Branches → Add branch protection rule';

	const cmdClean = '# Clean history (with rebase and good messages)\n' +
		'\n' +
		'git log --oneline\n' +
		'\n' +
		'# a1b2c3d feat: add dark mode CSS custom properties\n' +
		'# e4f5g6h feat: add footer with social links\n' +
		'# i7j8k9l feat: add skills list to hero section\n' +
		'# m0n1o2p feat: scaffold SvelteKit project\n' +
		'\n' +
		'# Every commit tells a story. You can read the history\n' +
		'# like a changelog. Clean, linear, professional.';

	const cmdMessy = '# Messy history (without conventions)\n' +
		'\n' +
		'git log --oneline\n' +
		'\n' +
		'# x9y8z7w Merge branch "main" into feature/stuff\n' +
		'# a1b2c3d fixed it\n' +
		'# e4f5g6h WIP\n' +
		'# i7j8k9l updates\n' +
		'# m0n1o2p Merge branch "main" into my-branch\n' +
		'# p3q4r5s did stuff\n' +
		'# t6u7v8w asdf\n' +
		'\n' +
		'# What did "fixed it" fix? What are "updates"?\n' +
		'# Nobody knows. This history is useless.\n' +
		'# Do not be this developer.';

	const cmdBreak1 = '# Experiment 1: Vague commit message\n' +
		'\n' +
		'git commit -m "updates"\n' +
		'\n' +
		'# Wait one week. Come back and read your git log.\n' +
		'# Can you tell what "updates" means? No.\n' +
		'# Now imagine 100 commits that say "updates."\n' +
		'# This is why conventions exist.';

	const cmdBreak2 = '# Experiment 2: One giant commit\n' +
		'\n' +
		'# Change 10 files across 3 features.\n' +
		'git add .\n' +
		'git commit -m "feat: add everything"\n' +
		'\n' +
		'# Now try to revert just ONE of those features.\n' +
		'# You cannot. The entire commit is one unit.\n' +
		'# You would have to manually undo the files.\n' +
		'# Small commits prevent this problem.';

	const cmdBreak3 = '# Experiment 3: Rebase a shared branch\n' +
		'\n' +
		'# If you and a teammate both work on the same branch\n' +
		'# and you rebase it, your commit hashes change.\n' +
		'# Your teammate\'s local copy now has different hashes.\n' +
		'# They will get merge conflicts on every pull.\n' +
		'\n' +
		'# Rule: only rebase YOUR OWN feature branches.\n' +
		'# Never rebase main or any branch others are using.';

	const cmdBreak4 = '# Experiment 4: Push directly to main (no PR)\n' +
		'\n' +
		'git checkout main\n' +
		'# ... make changes ...\n' +
		'git add . && git commit -m "feat: quick fix"\n' +
		'git push origin main\n' +
		'\n' +
		'# This works (unless branch protection is enabled).\n' +
		'# But there is no record of review.\n' +
		'# No one checked your code. No discussion.\n' +
		'# If it has a bug, there is no PR to reference.\n' +
		'# Always use branches + PRs, even on solo projects.';

	const fullCode = '# Professional Git summary (PE7 way)\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Use conventional commit prefixes\n' +
		'#    feat: fix: refactor: docs: chore: style: test:\n' +
		'\n' +
		'# 2. Write descriptive messages\n' +
		'#    git commit -m "feat: add hero section with profile card"\n' +
		'\n' +
		'# 3. Make small, focused commits (one thing per commit)\n' +
		'\n' +
		'# 4. Use rebase for clean, linear history\n' +
		'#    git pull --rebase origin main\n' +
		'\n' +
		'# 5. Write PR descriptions with Summary + Test Plan\n' +
		'\n' +
		'# 6. Never push directly to main — always use PRs';
</script>

<section class="page">
	<h1>0.13 — Professional Git (PE7 way)</h1>

	<p class="analogy">
		Commit messages are like entries in a ship's logbook. A captain writes "Departed port at 0600,
		heading north to deliver cargo" — not "left." Months later, anyone can read the logbook and
		understand exactly what happened, when, and why. Your commit messages are that logbook.
	</p>

	<p class="prose">
		You know how to use Git: init, add, commit, push, branch, merge. But there is a difference
		between <em>using</em> Git and <em>using Git professionally</em>. Amateur developers commit
		with messages like "did stuff" and make one giant commit per day. Professionals use
		conventions that make their history readable, reviewable, and maintainable.
	</p>

	<p class="prose">
		This lesson teaches you the PE7 Git conventions: conventional commit prefixes, small focused
		commits, rebase for clean history, and PR descriptions that help reviewers. These practices
		separate junior developers from professionals in every interview and every code review.
	</p>

	<!-- ── Conventional commits ── -->
	<h2>Conventional commit prefixes</h2>

	<p class="prose">
		Every commit message starts with a <strong>prefix</strong> that categorizes the change. This
		is called the <strong>Conventional Commits</strong> standard. It is used by most open-source
		projects, most companies, and most automated tooling (changelogs, versioning, CI/CD).
	</p>

	<CodeCanvas filename="Terminal — Prefixes" code={cmdPrefixes} />

	<p class="prose">
		The format is simple: <code>prefix: short description</code>. Lowercase prefix, colon, space,
		then a description that starts with a verb in the imperative mood ("add", "fix", "update" —
		not "added", "fixed", "updated"). No period at the end. Keep it under 72 characters so it
		displays cleanly in <code>git log --oneline</code>.
	</p>

	<h2>Good messages vs bad messages</h2>

	<p class="prose">
		The best way to learn good commit messages is to see bad ones. Compare these two lists and
		ask yourself: six months from now, which history would you rather read?
	</p>

	<CodeCanvas filename="Terminal — Good Messages" code={cmdGood} />
	<CodeCanvas filename="Terminal — Bad Messages" code={cmdBad} />

	<p class="prose">
		Good messages tell a story. They answer "what kind of change?" (prefix) and "what specifically
		changed?" (description). Bad messages tell you nothing. They are noise in your history.
		Every company that reviews your GitHub profile during hiring will look at your commit
		messages. Make them count.
	</p>

	<!-- ── Small commits ── -->
	<h2>Small, focused commits</h2>

	<p class="prose">
		Each commit should do <strong>one thing</strong>. Added a hero section? That is one commit.
		Fixed a layout bug? That is another commit. Updated a dependency? Another commit. Do not
		combine unrelated changes into a single commit.
	</p>

	<CodeCanvas filename="Terminal — Small Commits" code={cmdSmall} />

	<p class="prose">
		Small commits are easier to review (a reviewer can focus on one thing), easier to revert
		(undo the hero without losing the footer), and easier to understand in the history. If a
		commit does more than one thing, it should be split into multiple commits.
	</p>

	<!-- ── Rebase vs merge ── -->
	<h2>Rebase vs merge</h2>

	<p class="prose">
		When you need to incorporate changes from <code>main</code> into your feature branch, you
		have two options: merge and rebase. Both get the job done, but they produce different
		histories.
	</p>

	<CodeCanvas filename="Terminal — Rebase vs Merge" code={cmdRebase} />

	<p class="prose">
		<strong>Merge</strong> creates a merge commit — a special commit that ties two branches
		together. Your history shows the branch existed. This preserves the full truth of what
		happened, but makes <code>git log</code> messy with merge commits.
	</p>

	<p class="prose">
		<strong>Rebase</strong> replays your commits on top of the latest <code>main</code>. No merge
		commit. The history looks like a straight line. This is cleaner and easier to read. PE7
		prefers rebase for keeping feature branches up to date.
	</p>

	<CodeCanvas filename="Terminal — Using Rebase" code={cmdRebaseUse} />

	<p class="prose">
		<strong>The golden rule of rebase:</strong> never rebase a branch that other people are also
		working on. Rebase rewrites commit history (it creates new commits with new hashes). If a
		teammate has the old commits, they will get conflicts. On your own feature branch, rebase is
		perfectly safe. On <code>main</code> or shared branches, never rebase.
	</p>

	<!-- ── PR descriptions ── -->
	<h2>PR descriptions: Summary + Test Plan</h2>

	<p class="prose">
		The PE7 PR format has two sections: <strong>Summary</strong> (what you did and why) and
		<strong>Test Plan</strong> (how a reviewer can verify it works). This structure gives
		reviewers everything they need without asking questions.
	</p>

	<CodeCanvas filename="GitHub — PR Description" code={cmdPRDesc} />

	<!-- ── Branch protection ── -->
	<h2>Branch protection rules</h2>

	<p class="prose">
		On professional repositories, <code>main</code> is protected. Nobody can push directly to it.
		All changes must go through a Pull Request, be reviewed, and pass automated checks (tests,
		linting, type checking). This prevents bugs from reaching production.
	</p>

	<CodeCanvas filename="Terminal" code={cmdProtection} />

	<p class="prose">
		You can set up branch protection on any GitHub repository in Settings. For your learning
		projects, this is optional. But know that every company you work for will have these rules
		in place.
	</p>

	<!-- ── Clean vs messy history ── -->
	<h2>Clean history vs messy history</h2>

	<p class="prose">
		Here is what a clean Git history looks like with all the conventions applied: conventional
		commits, small focused changes, and linear rebase history.
	</p>

	<CodeCanvas filename="Terminal — Clean History" code={cmdClean} />

	<p class="prose">
		And here is what happens when you ignore conventions. This is a real-world example of what
		most beginner repositories look like. It is unreadable.
	</p>

	<CodeCanvas filename="Terminal — Messy History" code={cmdMessy} />

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<p class="prose">
		These experiments show you the consequences of bad Git habits. The goal is to experience the
		pain so you never do it in a real project.
	</p>

	<ol class="experiments">
		<li>
			<strong>Write a vague commit message.</strong> Commit with <code>-m "updates"</code>. Wait a
			week. Come back and read your log. You will have no idea what "updates" means. Now imagine a
			history with 100 such messages. This is why conventions exist.
		</li>
		<li>
			<strong>Make one giant commit.</strong> Change ten files across three features in a single
			commit. Now try to revert just one feature. You cannot. The entire commit is one unit. Small
			commits prevent this problem.
		</li>
		<li>
			<strong>Rebase a shared branch.</strong> If two people work on the same branch and one
			rebases, the other person's local copy now has different hashes. They get merge conflicts on
			every pull. Only rebase your own feature branches.
		</li>
		<li>
			<strong>Push directly to main without a PR.</strong> It works (unless protected), but there
			is no review, no discussion, and no record. If it has a bug, there is no PR to reference.
			Always use branches and PRs, even on solo projects.
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
			<strong>Rebase conflict</strong> — During rebase, Git may pause and say "CONFLICT." Open the
			conflicting file, look for <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> markers, choose which
			version to keep, delete the markers, then <code>git add .</code> and
			<code>git rebase --continue</code>.
		</p>
		<p>
			<strong>Forgot the prefix</strong> — If you already committed with a bad message, you can
			amend it: <code>git commit --amend -m "feat: correct message"</code>. This rewrites the last
			commit. Only do this before pushing.
		</p>
		<p>
			<strong>Rebase went wrong</strong> — If rebase creates a mess, abort it:
			<code>git rebase --abort</code>. This restores your branch to the state before the rebase.
		</p>
		<p>
			<strong>Not sure which prefix to use</strong> — If you added something new, use
			<code>feat:</code>. If you fixed a bug, use <code>fix:</code>. If you changed code without
			changing behavior, use <code>refactor:</code>. When in doubt, <code>feat:</code> is usually
			correct for beginners.
		</p>
	</details>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		Conventional commit prefixes (<code>feat:</code>, <code>fix:</code>, <code>refactor:</code>,
		<code>docs:</code>, <code>chore:</code>, <code>style:</code>, <code>test:</code>) categorize
		every commit. Good messages are short, descriptive, and use imperative mood. Bad messages
		like "did stuff" are useless noise. Every commit should do one thing.
	</p>

	<p class="prose">
		Rebase creates clean, linear history by replaying commits on top of the latest
		<code>main</code>. PE7 prefers <code>git pull --rebase origin main</code>. The golden rule:
		never rebase a branch that others are working on. On your own feature branch, rebase freely.
	</p>

	<p class="prose">
		PR descriptions use the Summary + Test Plan format. Branch protection rules prevent direct
		pushes to <code>main</code> and require reviews. These practices separate professional
		developers from amateurs — and they start with your very first project.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/project">Module 0 Project — First Push</a> — put
		everything together by creating, committing, and pushing a real SvelteKit project.
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
