<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Terminal commands ── */
	const cmdAnalogy = '# Git is your journal. GitHub is publishing it to a library.\n' +
		'#\n' +
		'# Git (local):\n' +
		'#   - Lives on YOUR computer\n' +
		'#   - Tracks your changes\n' +
		'#   - Works offline\n' +
		'#   - Private to you\n' +
		'#\n' +
		'# GitHub (remote):\n' +
		'#   - Lives on the internet (github.com)\n' +
		'#   - Backs up your code in the cloud\n' +
		'#   - Lets others see and contribute\n' +
		'#   - Shows your work to employers\n' +
		'#\n' +
		'# You PUSH from Git to GitHub (upload).\n' +
		'# You PULL from GitHub to Git (download).';

	const cmdCreateRepo = '# Creating a GitHub repository\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# 1. Go to github.com and sign in\n' +
		'# 2. Click the "+" icon (top right) → "New repository"\n' +
		'# 3. Fill in:\n' +
		'#    Repository name:  my-first-app\n' +
		'#    Description:      My first SvelteKit project\n' +
		'#    Visibility:       Public (so employers can see it)\n' +
		'#\n' +
		'# 4. IMPORTANT: Do NOT check any of these boxes:\n' +
		'#    [ ] Add a README file        ← NO\n' +
		'#    [ ] Add .gitignore           ← NO\n' +
		'#    [ ] Choose a license         ← NO\n' +
		'#\n' +
		'# Why? Your local project already has these files.\n' +
		'# If GitHub creates them too, you get a conflict on push.\n' +
		'#\n' +
		'# 5. Click "Create repository"';

	const cmdSSHKeygen = '# Generate an SSH key pair\n' +
		'\n' +
		'ssh-keygen -t ed25519 -C "your@email.com"\n' +
		'\n' +
		'# -t ed25519 = the encryption algorithm (modern, secure)\n' +
		'# -C "email" = a label to identify this key\n' +
		'\n' +
		'# The wizard asks:\n' +
		'#   "Enter file in which to save the key"\n' +
		'#   → Press Enter (accept the default location)\n' +
		'#\n' +
		'#   "Enter passphrase"\n' +
		'#   → Press Enter for no passphrase (or set one for extra security)\n' +
		'#\n' +
		'# This creates two files:\n' +
		'#   ~/.ssh/id_ed25519       ← PRIVATE key (never share this)\n' +
		'#   ~/.ssh/id_ed25519.pub   ← PUBLIC key (give this to GitHub)';

	const cmdSSHCopy = '# Copy your public key\n' +
		'\n' +
		'cat ~/.ssh/id_ed25519.pub\n' +
		'\n' +
		'# Output looks like:\n' +
		'# ssh-ed25519 AAAAC3NzaC1lZDI1... your@email.com\n' +
		'\n' +
		'# Copy the ENTIRE output (from ssh-ed25519 to your email).\n' +
		'# On macOS, you can also use:\n' +
		'pbcopy < ~/.ssh/id_ed25519.pub\n' +
		'\n' +
		'# This copies it directly to your clipboard.';

	const cmdSSHAdd = '# Add your public key to GitHub\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# 1. Go to github.com → click your avatar (top right)\n' +
		'# 2. Settings → SSH and GPG keys (left sidebar)\n' +
		'# 3. Click "New SSH key"\n' +
		'# 4. Title: "My MacBook" (or whatever describes your computer)\n' +
		'# 5. Key type: "Authentication Key"\n' +
		'# 6. Key: paste the public key you copied\n' +
		'# 7. Click "Add SSH key"';

	const cmdSSHTest = '# Test your SSH connection\n' +
		'\n' +
		'ssh -T git@github.com\n' +
		'\n' +
		'# First time, you will see:\n' +
		'# "The authenticity of host github.com can\'t be established."\n' +
		'# "Are you sure you want to continue connecting?"\n' +
		'# → Type "yes" and press Enter\n' +
		'\n' +
		'# If successful, you will see:\n' +
		'# Hi username! You\'ve been successfully authenticated,\n' +
		'# but GitHub does not provide shell access.\n' +
		'\n' +
		'# This message means SSH is working.\n' +
		'# "does not provide shell access" is normal — not an error.';

	const cmdHTTPS = '# HTTPS alternative (not recommended)\n' +
		'# ─────────────────────────────────────────\n' +
		'#\n' +
		'# Instead of SSH, you can use HTTPS:\n' +
		'# git remote add origin https://github.com/user/repo.git\n' +
		'#\n' +
		'# Problems with HTTPS:\n' +
		'#   - Asks for username/password on every push\n' +
		'#   - Requires a "Personal Access Token" (GitHub disabled passwords)\n' +
		'#   - More setup, more friction\n' +
		'#\n' +
		'# SSH is set up once and works silently forever.\n' +
		'# PE7 recommends SSH.';

	const cmdRemote = '# Connect your local repo to GitHub\n' +
		'\n' +
		'cd my-first-app\n' +
		'\n' +
		'# Add the remote (replace user/repo with your GitHub username/repo)\n' +
		'git remote add origin git@github.com:user/my-first-app.git\n' +
		'\n' +
		'# "origin" is the conventional name for your primary remote.\n' +
		'# You can name it anything, but "origin" is universal.\n' +
		'\n' +
		'# Verify the remote was added:\n' +
		'git remote -v\n' +
		'\n' +
		'# Output:\n' +
		'# origin  git@github.com:user/my-first-app.git (fetch)\n' +
		'# origin  git@github.com:user/my-first-app.git (push)';

	const cmdPush = '# Push your code to GitHub\n' +
		'\n' +
		'git push -u origin main\n' +
		'\n' +
		'# -u = "set upstream" — links your local main to the remote main.\n' +
		'# After this first push, you can just use: git push\n' +
		'# (no need to specify origin main every time)\n' +
		'\n' +
		'# Output:\n' +
		'# Enumerating objects: 15, done.\n' +
		'# Counting objects: 100% (15/15), done.\n' +
		'# Writing objects: 100% (15/15), 3.50 KiB | 3.50 MiB/s, done.\n' +
		'# Branch "main" set up to track remote branch "main" from "origin".\n' +
		'\n' +
		'# Now visit github.com/user/my-first-app\n' +
		'# Your code is live on the internet!';

	const cmdPull = '# Pull changes from GitHub\n' +
		'\n' +
		'git pull origin main\n' +
		'\n' +
		'# This downloads any new commits from GitHub\n' +
		'# and merges them into your local branch.\n' +
		'\n' +
		'# When do you need this?\n' +
		'#   - After merging a PR on GitHub\n' +
		'#   - When a teammate pushed changes\n' +
		'#   - When you edited a file on GitHub\'s web interface\n' +
		'\n' +
		'# After the first push with -u, you can just use:\n' +
		'git pull';

	const cmdBreak1 = '# Experiment 1: Push without a remote\n' +
		'\n' +
		'mkdir test-push && cd test-push\n' +
		'git init\n' +
		'echo "hello" > hello.txt\n' +
		'git add . && git commit -m "test"\n' +
		'\n' +
		'git push\n' +
		'\n' +
		'# ERROR: fatal: No configured push destination.\n' +
		'# Git does not know WHERE to push.\n' +
		'# Fix: git remote add origin <url>';

	const cmdBreak2 = '# Experiment 2: Typo in the remote URL\n' +
		'\n' +
		'git remote add origin git@github.com:user/WRONG-NAME.git\n' +
		'git push -u origin main\n' +
		'\n' +
		'# ERROR: Repository not found.\n' +
		'# Git tried to push to a repo that does not exist.\n' +
		'\n' +
		'# Fix: remove the bad remote and add the correct one.\n' +
		'git remote remove origin\n' +
		'git remote add origin git@github.com:user/CORRECT-NAME.git';

	const cmdBreak3 = '# Experiment 3: No SSH key configured\n' +
		'\n' +
		'git push -u origin main\n' +
		'\n' +
		'# ERROR: Permission denied (publickey).\n' +
		'# fatal: Could not read from remote repository.\n' +
		'\n' +
		'# GitHub does not recognize your computer.\n' +
		'# Fix: generate an SSH key and add it to GitHub.';

	const cmdBreak4 = '# Experiment 4: GitHub repo created WITH a README\n' +
		'\n' +
		'git push -u origin main\n' +
		'\n' +
		'# ERROR: Updates were rejected because the remote contains\n' +
		'# work that you do not have locally.\n' +
		'# (non-fast-forward)\n' +
		'\n' +
		'# Why? GitHub created a README.md commit.\n' +
		'# Your local repo does not have that commit.\n' +
		'# Git refuses to overwrite it.\n' +
		'\n' +
		'# Easiest fix: delete the GitHub repo, recreate it\n' +
		'# WITHOUT the README checkbox, and push again.\n' +
		'\n' +
		'# Or fix with:\n' +
		'git pull --rebase origin main\n' +
		'git push -u origin main';

	const fullCode = '# Full command sequence for Lesson 0.11\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Generate SSH key\n' +
		'ssh-keygen -t ed25519 -C "your@email.com"\n' +
		'\n' +
		'# 2. Copy public key\n' +
		'cat ~/.ssh/id_ed25519.pub\n' +
		'# Add it to GitHub: Settings → SSH keys → New\n' +
		'\n' +
		'# 3. Test connection\n' +
		'ssh -T git@github.com\n' +
		'\n' +
		'# 4. Connect and push\n' +
		'cd my-first-app\n' +
		'git remote add origin git@github.com:user/my-first-app.git\n' +
		'git push -u origin main';
</script>

<section class="page">
	<h1>0.11 — GitHub</h1>

	<p class="analogy">
		Git is your journal. GitHub is publishing it to a library. Your journal (Git) records
		everything you write on your computer. The library (GitHub) stores a copy on the internet
		where others can read it, your work is backed up, and employers can see what you build.
	</p>

	<p class="prose">
		In Lessons 0.9 and 0.10, you learned to track your project with Git on your local computer.
		But local-only Git has a fatal weakness: if your computer dies, everything is gone. GitHub
		solves this by storing a copy of your repository on the internet. It also lets you
		collaborate with other developers, show your work to employers, and manage projects
		professionally.
	</p>

	<p class="prose">
		By the end of this lesson, you will have a GitHub account, an SSH key for secure
		authentication, and your SvelteKit project pushed to the cloud. This is a huge milestone —
		your code will be live on the internet for the first time.
	</p>

	<CodeCanvas filename="Terminal" code={cmdAnalogy} />

	<!-- ── Create account ── -->
	<h2>Create a GitHub account</h2>

	<p class="prose">
		Go to <strong>github.com</strong> and sign up. Choose a username carefully — it becomes your
		professional identity. Use something clean and recognizable, like your real name or a
		professional handle. Avoid random numbers or joke names. Employers will see this.
	</p>

	<p class="prose">
		Pick the free tier. You get unlimited public and private repositories, which is everything you
		need. You do not need GitHub Pro for anything in this course.
	</p>

	<!-- ── Create repo ── -->
	<h2>Create a new repository</h2>

	<p class="prose">
		A repository on GitHub is the cloud copy of your local Git repository. You need to create an
		empty one on GitHub, then connect your local repo to it. <strong>Important:</strong> do not
		let GitHub create any files (README, .gitignore, license). Your local project already has
		these. Creating them on GitHub causes merge conflicts.
	</p>

	<CodeCanvas filename="GitHub UI — Steps" code={cmdCreateRepo} />

	<p class="prose">
		After clicking "Create repository," GitHub shows you a page with setup instructions. You
		already have a local repo, so you will use the "push an existing repository" instructions.
		But first, you need to set up SSH authentication.
	</p>

	<!-- ── SSH setup ── -->
	<h2>SSH key setup (PE7 recommended)</h2>

	<p class="prose">
		SSH (Secure Shell) is a protocol for secure communication between your computer and GitHub.
		Instead of typing a username and password every time you push, SSH uses a <strong>key
		pair</strong>: a private key (stays on your computer, never shared) and a public key (given
		to GitHub). When you push, your computer proves its identity using the private key. No
		password required.
	</p>

	<p class="prose">
		Think of it like a lock and key. You give GitHub the lock (public key). You keep the key
		(private key). Only your key opens that lock, so GitHub knows it is you.
	</p>

	<h2>Step 1: Generate the key pair</h2>

	<CodeCanvas filename="Terminal" code={cmdSSHKeygen} />

	<p class="prose">
		The <code>ed25519</code> algorithm is modern and secure. The <code>-C</code> flag adds your
		email as a comment on the key — it is just a label, not used for authentication. Accept the
		default file location by pressing Enter. You can set a passphrase for extra security, or
		press Enter for none.
	</p>

	<h2>Step 2: Copy the public key</h2>

	<CodeCanvas filename="Terminal" code={cmdSSHCopy} />

	<p class="prose">
		The public key starts with <code>ssh-ed25519</code> and ends with your email. Copy the
		<strong>entire line</strong>. Do not copy the private key file (<code>id_ed25519</code> without
		<code>.pub</code>) — that must stay secret on your computer.
	</p>

	<h2>Step 3: Add the key to GitHub</h2>

	<CodeCanvas filename="GitHub UI — SSH Key" code={cmdSSHAdd} />

	<h2>Step 4: Test the connection</h2>

	<CodeCanvas filename="Terminal" code={cmdSSHTest} />

	<p class="prose">
		The first time you connect, SSH asks you to verify GitHub's identity. Type <code>yes</code>.
		If you see "Hi username! You've been successfully authenticated," everything is working. The
		message about "no shell access" is normal — GitHub does not give you a login shell, only
		Git operations.
	</p>

	<!-- ── HTTPS alternative ── -->
	<h2>HTTPS alternative</h2>

	<p class="prose">
		Some tutorials use HTTPS instead of SSH. HTTPS works but requires a Personal Access Token
		(GitHub disabled password authentication) and asks for credentials more frequently. SSH is
		set up once and works silently forever. PE7 recommends SSH for all students.
	</p>

	<CodeCanvas filename="Terminal" code={cmdHTTPS} />

	<!-- ── Connect and push ── -->
	<h2>Connect your local repo to GitHub</h2>

	<p class="prose">
		Now you need to tell your local Git repository where the GitHub copy lives. This is called
		adding a <strong>remote</strong>. A remote is a URL pointing to a GitHub repository.
		The conventional name for your primary remote is <code>origin</code>.
	</p>

	<CodeCanvas filename="Terminal" code={cmdRemote} />

	<p class="prose">
		Replace <code>user</code> with your GitHub username and <code>my-first-app</code> with your
		repository name. The URL format for SSH is <code>git@github.com:username/repo.git</code>.
		You can also copy this URL from the GitHub repository page.
	</p>

	<h2>Push your code</h2>

	<p class="prose">
		<code>git push</code> uploads your local commits to GitHub. The <code>-u</code> flag sets
		up tracking so future pushes only need <code>git push</code> (no need to specify
		<code>origin main</code> every time).
	</p>

	<CodeCanvas filename="Terminal" code={cmdPush} />

	<p class="prose">
		After pushing, visit your repository on GitHub. You will see all your files, your commit
		history, and your README (if you created one). Your code is now backed up on the internet.
		If your laptop gets stolen, your code survives.
	</p>

	<h2>Pull changes down</h2>

	<p class="prose">
		<code>git pull</code> downloads new commits from GitHub and merges them into your local
		branch. You need this when someone else pushes changes, when you merge a pull request on
		GitHub's website, or when you edit a file directly on GitHub.
	</p>

	<CodeCanvas filename="Terminal" code={cmdPull} />

	<!-- ── Break it on purpose ── -->
	<h2>Break it on purpose</h2>

	<p class="prose">
		Push and pull errors are common when setting up GitHub for the first time. Try these
		experiments so you recognize the errors and know the fix.
	</p>

	<ol class="experiments">
		<li>
			<strong>Push without a remote.</strong> Create a new repo with <code>git init</code>, make a
			commit, and run <code>git push</code>. Git says "No configured push destination." You need
			to add a remote first with <code>git remote add origin</code>.
		</li>
		<li>
			<strong>Typo in the remote URL.</strong> Add a remote with a wrong repository name and try to
			push. Git says "Repository not found." Fix: <code>git remote remove origin</code> then add
			the correct URL.
		</li>
		<li>
			<strong>No SSH key configured.</strong> Try pushing without adding your SSH key to GitHub.
			You get "Permission denied (publickey)." GitHub does not recognize your computer. Go back
			and complete the SSH setup.
		</li>
		<li>
			<strong>GitHub repo created with a README.</strong> If you checked the README box, GitHub
			has a commit your local repo does not have. Pushing fails with "non-fast-forward." Easiest
			fix: delete the GitHub repo and recreate it without the README.
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
			<strong>"Permission denied (publickey)"</strong> — Your SSH key is not configured. Run
			<code>ssh -T git@github.com</code> to test. If it fails, regenerate your key and add the
			public key to GitHub Settings.
		</p>
		<p>
			<strong>"Repository not found"</strong> — Either the URL is wrong or the repo does not exist.
			Double-check your GitHub username and repository name. Make sure the repo is created on GitHub.
		</p>
		<p>
			<strong>"Updates were rejected (non-fast-forward)"</strong> — The GitHub repo has commits
			your local repo does not. This usually happens when you created the repo with a README.
			Easiest fix: delete the GitHub repo and recreate it empty.
		</p>
		<p>
			<strong>"remote origin already exists"</strong> — You already added a remote called
			<code>origin</code>. Remove it with <code>git remote remove origin</code> and add the
			correct URL.
		</p>
	</details>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		GitHub is a cloud platform that stores your Git repositories online. It provides backup,
		collaboration, and visibility. Git is the local tool; GitHub is the remote service. You
		<code>push</code> code up to GitHub and <code>pull</code> code down from it.
	</p>

	<p class="prose">
		SSH is the PE7-recommended way to authenticate with GitHub. You generate a key pair
		(<code>ssh-keygen</code>), add the public key to GitHub, and test with
		<code>ssh -T git@github.com</code>. After setup, authentication is automatic — no passwords.
	</p>

	<p class="prose">
		When creating a GitHub repository, do not let GitHub add any files (README, .gitignore,
		license) if you already have a local project. Create an empty repo, connect it with
		<code>git remote add origin</code>, and push with <code>git push -u origin main</code>.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-0/0-12-branches">0.12 — Branches &amp; PRs</a> — learn
		to work on features in parallel without touching the main code.
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
