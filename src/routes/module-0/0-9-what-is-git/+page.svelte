<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmdInstallGit = '# Install Git via Homebrew\n' +
		'brew install git\n' +
		'\n' +
		'# Verify it installed correctly\n' +
		'git --version\n' +
		'\n' +
		'# You should see something like:\n' +
		'# git version 2.44.0';

	const cmdConfigName = '# Tell Git your name (used in commit history)\n' +
		'git config --global user.name "Your Name"\n' +
		'\n' +
		'# Example:\n' +
		'git config --global user.name "Jane Doe"\n' +
		'\n' +
		'# This name appears next to every commit you make.\n' +
		'# Use your real name — this is your professional signature.';

	const cmdConfigEmail = '# Tell Git your email (used in commit history)\n' +
		'git config --global user.email "you@example.com"\n' +
		'\n' +
		'# Example:\n' +
		'git config --global user.email "jane@example.com"\n' +
		'\n' +
		'# Use the same email you will use for GitHub.\n' +
		'# This links your commits to your GitHub account.';

	const cmdConfigBranch = '# Set the default branch name to "main"\n' +
		'git config --global init.defaultBranch main\n' +
		'\n' +
		'# Without this, Git creates a branch called "master" by default.\n' +
		'# The industry moved to "main" starting in 2020.\n' +
		'# GitHub, GitLab, and every major company now use "main".\n' +
		'# Set this once and forget it.';

	const cmdVerifyConfig = '# Verify your configuration\n' +
		'git config --global user.name\n' +
		'# Output: Jane Doe\n' +
		'\n' +
		'git config --global user.email\n' +
		'# Output: jane@example.com\n' +
		'\n' +
		'git config --global init.defaultBranch\n' +
		'# Output: main\n' +
		'\n' +
		'# These settings are stored in ~/.gitconfig\n' +
		'# You only set them once per computer.';

	const cmdGlobalExplain = '# What does --global mean?\n' +
		'# ────────────────────────\n' +
		'\n' +
		'# --global = applies to ALL Git repos on this computer\n' +
		'# Without --global = applies only to the current repo\n' +
		'\n' +
		'# There are three levels:\n' +
		'#   --system   → all users on this computer (rare)\n' +
		'#   --global   → all repos for YOUR user account (common)\n' +
		'#   (no flag)  → only THIS specific repo (overrides global)\n' +
		'\n' +
		'# For your name and email, --global is correct.\n' +
		'# You are the same person in every project.';

	const cmdWhyMain = '# Why "main" instead of "master"?\n' +
		'# ──────────────────────────────\n' +
		'\n' +
		'# In 2020, GitHub changed its default branch name from\n' +
		'# "master" to "main". The rest of the industry followed.\n' +
		'\n' +
		'# "main" is:\n' +
		'#   - Shorter to type\n' +
		'#   - The GitHub/GitLab/Bitbucket default\n' +
		'#   - What you will see in every modern tutorial\n' +
		'#   - What every company expects\n' +
		'\n' +
		'# If you see "master" in an older tutorial,\n' +
		'# mentally replace it with "main". Same concept.';

	const cmdWhatIsSnapshot = '# Git saves SNAPSHOTS, not file differences\n' +
		'# ──────────────────────────────────────────\n' +
		'\n' +
		'# Imagine photographing your desk every day.\n' +
		'# Monday: desk has laptop, notebook, coffee.\n' +
		'# Tuesday: desk has laptop, notebook, coffee, headphones.\n' +
		'# Wednesday: desk has laptop, coffee (notebook removed).\n' +
		'\n' +
		'# Each photo captures the ENTIRE desk, not just what changed.\n' +
		'# If you want to see "Tuesday\'s desk," you look at Tuesday\'s photo.\n' +
		'# You do not need to combine all the changes since Monday.\n' +
		'\n' +
		'# Git works the same way. Each commit is a snapshot of\n' +
		'# your ENTIRE project at that moment in time.';

	const fullCode = '# Full command sequence for Lesson 0.9\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Install Git\n' +
		'brew install git\n' +
		'\n' +
		'# 2. Verify installation\n' +
		'git --version\n' +
		'\n' +
		'# 3. Configure your identity\n' +
		'git config --global user.name "Your Name"\n' +
		'git config --global user.email "you@example.com"\n' +
		'git config --global init.defaultBranch main\n' +
		'\n' +
		'# 4. Verify configuration\n' +
		'git config --global user.name\n' +
		'git config --global user.email\n' +
		'git config --global init.defaultBranch';
</script>

<section class="page">
	<h1>0.9 — What Git is</h1>

	<p class="analogy">
		Git is Google Docs version history for your entire project. Every time you save a
		snapshot (called a "commit"), Git remembers exactly what every file looked like at that
		moment. You can scroll back through your history, compare versions, or restore your
		project to any previous state. If you accidentally delete everything, Git lets you go
		back in time and undo the damage.
	</p>

	<p class="prose">
		Here is a second way to think about it: imagine photographing your desk every day.
		Monday, the desk has a laptop, notebook, and coffee. Tuesday, you add headphones.
		Wednesday, you remove the notebook. Each photo captures the <strong>entire desk</strong>,
		not just what changed. If you want to see "what did my desk look like on Tuesday?", you
		look at Tuesday's photo. Git works the same way. Each commit is a complete snapshot of
		your entire project at that moment in time.
	</p>

	<CodeCanvas filename="Terminal" code={cmdWhatIsSnapshot} />

	<p class="prose">
		Every professional developer uses Git. Every company uses Git. Every open-source project
		on GitHub uses Git. It is not optional — it is as fundamental as knowing how to type.
		You will use Git every single day of your career. This lesson installs Git and
		configures it so it knows who you are. The next lesson teaches you the actual commands.
	</p>

	<!-- ── Installing Git ── -->
	<h2>Installing Git</h2>

	<p class="prose">
		If you followed Lesson 0.4 and installed Homebrew, installing Git is one command. Open
		your terminal and run:
	</p>

	<CodeCanvas filename="Terminal" code={cmdInstallGit} />

	<p class="prose">
		macOS actually comes with a version of Git pre-installed (part of the Xcode Command Line
		Tools), but it is often outdated. Installing via Homebrew gives you the latest version
		and makes updates easy: just run <code>brew upgrade git</code> later.
	</p>

	<p class="prose">
		If <code>git --version</code> prints a version number, Git is installed and working.
		The exact version does not matter for this course. Anything 2.30 or higher is fine.
	</p>

	<!-- ── Configuring Git ── -->
	<h2>Configuring your identity</h2>

	<p class="prose">
		Before you can use Git, you need to tell it who you are. Every commit you make will be
		signed with your name and email address. This is how your teammates (and GitHub) know who
		made each change. You configure this once per computer.
	</p>

	<h3>Your name</h3>

	<CodeCanvas filename="Terminal" code={cmdConfigName} />

	<p class="prose">
		This is the name that appears in your commit history. Use your real name, not a username
		or handle. When a potential employer looks at your Git history, they should see a
		professional name.
	</p>

	<h3>Your email</h3>

	<CodeCanvas filename="Terminal" code={cmdConfigEmail} />

	<p class="prose">
		Use the email address you plan to use for GitHub. When you push commits to GitHub, it
		matches the email in your commits to your GitHub account. If the emails do not match,
		your commits appear as "unknown author" on GitHub — they still work, but your profile
		picture and link do not show up.
	</p>

	<h3>Default branch name</h3>

	<CodeCanvas filename="Terminal" code={cmdConfigBranch} />

	<CodeCanvas filename="Terminal" code={cmdWhyMain} />

	<p class="prose">
		This setting only affects new repositories. When you run <code>git init</code>, Git
		creates the first branch. Without this setting, that branch is called "master." With
		this setting, it is called "main." The entire industry standardized on "main" in 2020.
		GitHub, GitLab, Bitbucket, and every major company use "main." Set it once and you
		never have to think about it again.
	</p>

	<!-- ── What does --global mean? ── -->
	<h2>What does --global mean?</h2>

	<CodeCanvas filename="Terminal" code={cmdGlobalExplain} />

	<p class="prose">
		The <code>--global</code> flag means "apply this setting to every Git repository on this
		computer." Without it, the setting only applies to the current repository. For your name,
		email, and default branch, <code>--global</code> is correct — you are the same person
		in every project. If you ever need different settings for a specific repo (like a work
		email for a work project), you can override the global setting inside that repo by
		running the same command without <code>--global</code>.
	</p>

	<!-- ── Verify ── -->
	<h2>Verify your configuration</h2>

	<p class="prose">
		After setting everything, read the values back to confirm they stuck:
	</p>

	<CodeCanvas filename="Terminal" code={cmdVerifyConfig} />

	<p class="prose">
		If you see the correct name, email, and "main" as the default branch, you are done.
		These settings are stored in a file called <code>~/.gitconfig</code> in your home
		directory. You never need to edit that file manually — the <code>git config</code>
		command handles it.
	</p>

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<ol class="experiments">
		<li>
			<strong>Run <code>git log</code> in a non-repo folder.</strong> Go to your home directory
			with <code>cd ~</code> and run <code>git log</code>. You will see "fatal: not a git
			repository." Git commands only work inside folders that have been initialized with
			<code>git init</code>. Your home folder is not (and should not be) a Git repo.
		</li>
		<li>
			<strong>Read a config value instead of setting it.</strong> Run
			<code>git config --global user.name</code> with no value after it. Git prints the
			current value instead of changing it. If it prints nothing (blank line), the value has
			not been set yet. This is how you check your configuration.
		</li>
		<li>
			<strong>Run <code>git commit</code> before <code>git add</code>.</strong> Create a
			test folder, run <code>git init</code>, create a file, and immediately try
			<code>git commit -m "test"</code>. Git refuses: "nothing added to commit." You must
			stage files with <code>git add</code> before you can commit. Committing is always a
			two-step process.
		</li>
		<li>
			<strong>Run <code>git init</code> twice.</strong> Initialize a repo, then run
			<code>git init</code> again. Git says "Reinitialized existing Git repository." It does
			not break anything and does not erase your history. Running <code>git init</code> in
			an existing repo is a harmless no-op.
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
		Git is a version control system that takes snapshots of your entire project every time
		you commit. Each snapshot captures the state of every file at that moment. You can view
		your history, compare versions, and restore any previous state. Think of it as Google
		Docs version history for your whole project, or as photographing your desk every day.
	</p>

	<p class="prose">
		You installed Git with <code>brew install git</code> and verified it with
		<code>git --version</code>. You configured your identity with three commands:
		<code>git config --global user.name</code>, <code>git config --global user.email</code>,
		and <code>git config --global init.defaultBranch main</code>. These settings are stored
		in <code>~/.gitconfig</code> and apply to every Git repository on your computer.
	</p>

	<p class="prose">
		The <code>--global</code> flag means "all repos on this computer." The default branch is
		"main" (not "master") because the industry standardized on that name in 2020. Your email
		should match the one you will use for GitHub so your commits are properly linked to your
		account. Git is configured once per computer — you never need to do this step again.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/0-10-git-basics">0.10 — Git basics</a> — you
		will learn the daily commands: init, add, commit, log, and how to undo mistakes.
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
