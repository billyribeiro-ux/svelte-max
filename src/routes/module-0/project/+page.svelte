<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Step commands ── */
	const cmdStep1 = '# Step 1: Create the project\n' +
		'\n' +
		'npx sv create first-push\n' +
		'\n' +
		'# Template:         SvelteKit minimal\n' +
		'# TypeScript:       Yes, using TypeScript syntax\n' +
		'# Additional tools: prettier, eslint\n' +
		'# Package manager:  pnpm (or None)';

	const cmdStep2 = '# Step 2: Install dependencies and verify\n' +
		'\n' +
		'cd first-push\n' +
		'pnpm install\n' +
		'\n' +
		'# Verify it works:\n' +
		'pnpm dev\n' +
		'# Open http://localhost:5173 — you should see the default page.\n' +
		'# Press Ctrl+C to stop the server.';

	const cmdHeroCode = '\u003cscript lang="ts"\u003e\n' +
		'  const name: string = \'Your Name\';\n' +
		'  const role: string = \'Future Frontend Developer\';\n' +
		'  const bio: string = \'I am learning SvelteKit with the PE7 curriculum. \' +\n' +
		'    \'This is my first project — built from scratch, committed with \' +\n' +
		'    \'conventional commits, and pushed to GitHub.\';\n' +
		'\u003c/script\u003e\n' +
		'\n' +
		'<section class="hero">\n' +
		'  <p class="eyebrow">Module 0 Project</p>\n' +
		'  <h1>{name}</h1>\n' +
		'  <p class="role">{role}</p>\n' +
		'  <p class="bio">{bio}</p>\n' +
		'</section>\n' +
		'\n' +
		'\u003cstyle\u003e\n' +
		'  .hero {\n' +
		'    display: flex;\n' +
		'    flex-direction: column;\n' +
		'    gap: 1rem;\n' +
		'    padding: 3rem 1.5rem;\n' +
		'    max-width: 640px;\n' +
		'    margin: 0 auto;\n' +
		'  }\n' +
		'\n' +
		'  .eyebrow {\n' +
		'    font-size: 0.85rem;\n' +
		'    text-transform: uppercase;\n' +
		'    letter-spacing: 0.1em;\n' +
		'    color: oklch(55% 0.18 150);\n' +
		'    font-weight: 700;\n' +
		'    margin: 0;\n' +
		'  }\n' +
		'\n' +
		'  h1 {\n' +
		'    font-size: clamp(2rem, 5vw, 3.5rem);\n' +
		'    margin: 0;\n' +
		'    line-height: 1.1;\n' +
		'  }\n' +
		'\n' +
		'  .role {\n' +
		'    font-size: 1.25rem;\n' +
		'    color: oklch(65% 0.05 250);\n' +
		'    margin: 0;\n' +
		'  }\n' +
		'\n' +
		'  .bio {\n' +
		'    line-height: 1.7;\n' +
		'    max-width: 55ch;\n' +
		'    margin: 0;\n' +
		'    color: oklch(55% 0.02 250);\n' +
		'  }\n' +
		'\u003c/style\u003e';

	const cmdStep3 = '# Step 3: Replace the home page content\n' +
		'\n' +
		'# Open src/routes/+page.svelte in your editor.\n' +
		'# Delete everything inside it.\n' +
		'# Paste the hero code from the CodeCanvas above.\n' +
		'# Replace "Your Name" with your actual name.\n' +
		'\n' +
		'# Verify: run pnpm dev and check http://localhost:5173';

	const cmdStep4 = '# Step 4: Initialize Git\n' +
		'\n' +
		'git init\n' +
		'git status\n' +
		'\n' +
		'# You should see all project files listed as untracked.';

	const cmdStep5 = '# Step 5: First commit — scaffold\n' +
		'\n' +
		'git add .\n' +
		'git commit -m "feat: scaffold SvelteKit project with hero section"\n' +
		'\n' +
		'# Verify:\n' +
		'git log --oneline\n' +
		'# Output: a1b2c3d feat: scaffold SvelteKit project with hero section';

	const cmdSkillsCode = '\u003cscript lang="ts"\u003e\n' +
		'  const name: string = \'Your Name\';\n' +
		'  const role: string = \'Future Frontend Developer\';\n' +
		'  const bio: string = \'I am learning SvelteKit with the PE7 curriculum. \' +\n' +
		'    \'This is my first project — built from scratch, committed with \' +\n' +
		'    \'conventional commits, and pushed to GitHub.\';\n' +
		'\n' +
		'  const skills: readonly string[] = [\n' +
		'    \'Terminal\',\n' +
		'    \'Homebrew\',\n' +
		'    \'Node.js\',\n' +
		'    \'pnpm\',\n' +
		'    \'SvelteKit\',\n' +
		'    \'TypeScript\',\n' +
		'    \'Git\',\n' +
		'    \'GitHub\'\n' +
		'  ] as const;\n' +
		'\u003c/script\u003e\n' +
		'\n' +
		'<section class="hero">\n' +
		'  <p class="eyebrow">Module 0 Project</p>\n' +
		'  <h1>{name}</h1>\n' +
		'  <p class="role">{role}</p>\n' +
		'  <p class="bio">{bio}</p>\n' +
		'\n' +
		'  <ul class="skills">\n' +
		'    {#each skills as skill}\n' +
		'      <li class="skill-tag">{skill}</li>\n' +
		'    {/each}\n' +
		'  </ul>\n' +
		'</section>\n' +
		'\n' +
		'\u003cstyle\u003e\n' +
		'  .hero {\n' +
		'    display: flex;\n' +
		'    flex-direction: column;\n' +
		'    gap: 1rem;\n' +
		'    padding: 3rem 1.5rem;\n' +
		'    max-width: 640px;\n' +
		'    margin: 0 auto;\n' +
		'  }\n' +
		'\n' +
		'  .eyebrow {\n' +
		'    font-size: 0.85rem;\n' +
		'    text-transform: uppercase;\n' +
		'    letter-spacing: 0.1em;\n' +
		'    color: oklch(55% 0.18 150);\n' +
		'    font-weight: 700;\n' +
		'    margin: 0;\n' +
		'  }\n' +
		'\n' +
		'  h1 {\n' +
		'    font-size: clamp(2rem, 5vw, 3.5rem);\n' +
		'    margin: 0;\n' +
		'    line-height: 1.1;\n' +
		'  }\n' +
		'\n' +
		'  .role {\n' +
		'    font-size: 1.25rem;\n' +
		'    color: oklch(65% 0.05 250);\n' +
		'    margin: 0;\n' +
		'  }\n' +
		'\n' +
		'  .bio {\n' +
		'    line-height: 1.7;\n' +
		'    max-width: 55ch;\n' +
		'    margin: 0;\n' +
		'    color: oklch(55% 0.02 250);\n' +
		'  }\n' +
		'\n' +
		'  .skills {\n' +
		'    display: flex;\n' +
		'    flex-wrap: wrap;\n' +
		'    gap: 0.5rem;\n' +
		'    list-style: none;\n' +
		'    padding: 0;\n' +
		'    margin: 0.5rem 0 0;\n' +
		'  }\n' +
		'\n' +
		'  .skill-tag {\n' +
		'    background: oklch(92% 0.05 150);\n' +
		'    color: oklch(30% 0.1 150);\n' +
		'    padding: 0.25rem 0.75rem;\n' +
		'    border-radius: 9999px;\n' +
		'    font-size: 0.85rem;\n' +
		'    font-weight: 600;\n' +
		'  }\n' +
		'\u003c/style\u003e';

	const cmdStep6 = '# Step 6: Add skills list\n' +
		'\n' +
		'# Open src/routes/+page.svelte\n' +
		'# Replace the content with the skills version (see CodeCanvas above).\n' +
		'# This adds a skills array and renders tags.\n' +
		'\n' +
		'# Verify: pnpm dev — you should see colored skill tags.';

	const cmdStep7 = '# Step 7: Second commit — skills\n' +
		'\n' +
		'git add .\n' +
		'git commit -m "feat: add skills list to hero section"\n' +
		'\n' +
		'git log --oneline\n' +
		'# e4f5g6h feat: add skills list to hero section\n' +
		'# a1b2c3d feat: scaffold SvelteKit project with hero section';

	const cmdFooterCode = '<!-- Add this AFTER the </section> closing tag -->\n' +
		'\n' +
		'<footer class="footer">\n' +
		'  <p>Built with SvelteKit, TypeScript, and Git.</p>\n' +
		'  <p class="module-note">Module 0 — PE7 Curriculum</p>\n' +
		'</footer>\n' +
		'\n' +
		'<!-- Add these styles inside the existing style block -->\n' +
		'\n' +
		'.footer {\n' +
		'  max-width: 640px;\n' +
		'  margin: 3rem auto 0;\n' +
		'  padding: 2rem 1.5rem;\n' +
		'  border-top: 1px solid oklch(85% 0.02 150);\n' +
		'  text-align: center;\n' +
		'}\n' +
		'\n' +
		'.footer p {\n' +
		'  margin: 0;\n' +
		'  font-size: 0.85rem;\n' +
		'  color: oklch(55% 0.02 250);\n' +
		'}\n' +
		'\n' +
		'.module-note {\n' +
		'  margin-top: 0.25rem;\n' +
		'  color: oklch(55% 0.18 150);\n' +
		'  font-weight: 600;\n' +
		'}';

	const cmdStep8 = '# Step 8: Add footer\n' +
		'\n' +
		'# Add the footer HTML after the hero section.\n' +
		'# Add the footer styles inside the style block.\n' +
		'# Verify: pnpm dev — footer should appear below skills.';

	const cmdStep9 = '# Step 9: Third commit — footer\n' +
		'\n' +
		'git add .\n' +
		'git commit -m "feat: add footer with built-with credits"\n' +
		'\n' +
		'git log --oneline\n' +
		'# i7j8k9l feat: add footer with built-with credits\n' +
		'# e4f5g6h feat: add skills list to hero section\n' +
		'# a1b2c3d feat: scaffold SvelteKit project with hero section';

	const cmdStep10 = '# Step 10: Create GitHub repo, add remote, push\n' +
		'\n' +
		'# 1. Go to github.com → New repository\n' +
		'#    Name: first-push\n' +
		'#    Public, NO README, NO .gitignore, NO license\n' +
		'\n' +
		'# 2. Connect and push:\n' +
		'git remote add origin git@github.com:YOUR-USERNAME/first-push.git\n' +
		'git push -u origin main\n' +
		'\n' +
		'# Verify: visit github.com/YOUR-USERNAME/first-push\n' +
		'# You should see all 3 commits and your code.';

	const cmdStep11 = '# Step 11: Create a feature branch\n' +
		'\n' +
		'git checkout -b feature/dark-mode\n' +
		'\n' +
		'# Verify:\n' +
		'git branch\n' +
		'#   main\n' +
		'# * feature/dark-mode';

	const cmdDarkModeCode = '/* Add these styles to support dark mode */\n' +
		'/* Place inside your existing style block */\n' +
		'\n' +
		'@media (prefers-color-scheme: dark) {\n' +
		'  :global(body) {\n' +
		'    background: oklch(15% 0.02 250);\n' +
		'    color: oklch(90% 0.02 250);\n' +
		'  }\n' +
		'\n' +
		'  .role {\n' +
		'    color: oklch(75% 0.05 250);\n' +
		'  }\n' +
		'\n' +
		'  .bio {\n' +
		'    color: oklch(75% 0.02 250);\n' +
		'  }\n' +
		'\n' +
		'  .skill-tag {\n' +
		'    background: oklch(25% 0.08 150);\n' +
		'    color: oklch(85% 0.1 150);\n' +
		'  }\n' +
		'\n' +
		'  .footer {\n' +
		'    border-color: oklch(30% 0.02 150);\n' +
		'  }\n' +
		'\n' +
		'  .footer p {\n' +
		'    color: oklch(75% 0.02 250);\n' +
		'  }\n' +
		'}';

	const cmdStep12 = '# Step 12: Add dark mode styles\n' +
		'\n' +
		'# Add the dark mode CSS (see CodeCanvas above) to your style block.\n' +
		'# This uses prefers-color-scheme to detect the OS dark mode setting.\n' +
		'\n' +
		'# Verify: toggle your system dark mode and refresh the page.';

	const cmdStep13 = '# Step 13: Commit, push, create PR\n' +
		'\n' +
		'git add .\n' +
		'git commit -m "feat: add dark mode CSS with prefers-color-scheme"\n' +
		'\n' +
		'git push -u origin feature/dark-mode\n' +
		'\n' +
		'# Now go to GitHub:\n' +
		'# 1. Click "Compare & pull request"\n' +
		'# 2. Title: feat: add dark mode CSS\n' +
		'# 3. Description:\n' +
		'#    ## Summary\n' +
		'#    - Add dark mode styles using prefers-color-scheme\n' +
		'#    - Adjusts hero, skills, and footer colors\n' +
		'#\n' +
		'#    ## Test plan\n' +
		'#    - [ ] Toggle system dark mode — colors update\n' +
		'#    - [ ] Light mode still looks correct\n' +
		'#\n' +
		'# 4. Click "Create pull request"\n' +
		'# 5. Review your own changes\n' +
		'# 6. Click "Squash and merge"';

	const cmdStep14 = '# Step 14: Clean up after merge\n' +
		'\n' +
		'git checkout main\n' +
		'git pull origin main\n' +
		'git branch -d feature/dark-mode\n' +
		'\n' +
		'# Final check:\n' +
		'git log --oneline\n' +
		'\n' +
		'# You should see a clean, linear history\n' +
		'# with conventional commit messages.';

	const cmdChecklist = '# Project completion checklist\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# [ ] Created project with npx sv create first-push\n' +
		'# [ ] Installed dependencies with pnpm install\n' +
		'# [ ] Built hero section with name, role, and bio\n' +
		'# [ ] Initialized Git repository\n' +
		'# [ ] First commit: "feat: scaffold SvelteKit project with hero section"\n' +
		'# [ ] Added skills list with TypeScript array\n' +
		'# [ ] Second commit: "feat: add skills list to hero section"\n' +
		'# [ ] Added footer with built-with credits\n' +
		'# [ ] Third commit: "feat: add footer with built-with credits"\n' +
		'# [ ] Created GitHub repository (empty, no README)\n' +
		'# [ ] Connected remote and pushed to GitHub\n' +
		'# [ ] Created feature/dark-mode branch\n' +
		'# [ ] Added dark mode CSS\n' +
		'# [ ] Fourth commit: "feat: add dark mode CSS with prefers-color-scheme"\n' +
		'# [ ] Pushed feature branch and created PR\n' +
		'# [ ] Merged PR with squash and merge\n' +
		'# [ ] Cleaned up: checkout main, pull, delete branch';

	const cmdCommonMistakes = '# Common mistakes and fixes\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# MISTAKE: Forgetting cd first-push before pnpm install\n' +
		'# FIX: pnpm install must run INSIDE the project folder.\n' +
		'\n' +
		'# MISTAKE: Creating GitHub repo WITH README\n' +
		'# FIX: Delete the repo, recreate without README, push again.\n' +
		'\n' +
		'# MISTAKE: Committing node_modules/\n' +
		'# FIX: git rm --cached -r node_modules/ && add to .gitignore\n' +
		'\n' +
		'# MISTAKE: Forgetting to switch to main before creating a branch\n' +
		'# FIX: git checkout main first, then git checkout -b feature/name\n' +
		'\n' +
		'# MISTAKE: Pushing to main instead of the feature branch\n' +
		'# FIX: Check git branch before pushing. Use git push -u origin feature/name.';

	const fullCode = '# Complete project command sequence\n' +
		'# ─────────────────────────────────────────\n' +
		'\n' +
		'# 1. Create and set up\n' +
		'npx sv create first-push\n' +
		'cd first-push && pnpm install\n' +
		'\n' +
		'# 2. Edit src/routes/+page.svelte (hero)\n' +
		'# 3. Init and first commit\n' +
		'git init\n' +
		'git add .\n' +
		'git commit -m "feat: scaffold SvelteKit project with hero section"\n' +
		'\n' +
		'# 4. Edit (add skills)\n' +
		'git add .\n' +
		'git commit -m "feat: add skills list to hero section"\n' +
		'\n' +
		'# 5. Edit (add footer)\n' +
		'git add .\n' +
		'git commit -m "feat: add footer with built-with credits"\n' +
		'\n' +
		'# 6. Push to GitHub\n' +
		'git remote add origin git@github.com:USER/first-push.git\n' +
		'git push -u origin main\n' +
		'\n' +
		'# 7. Feature branch + dark mode + PR\n' +
		'git checkout -b feature/dark-mode\n' +
		'# ... edit ...\n' +
		'git add .\n' +
		'git commit -m "feat: add dark mode CSS with prefers-color-scheme"\n' +
		'git push -u origin feature/dark-mode\n' +
		'# Create PR on GitHub → merge → clean up\n' +
		'\n' +
		'# 8. Clean up\n' +
		'git checkout main\n' +
		'git pull origin main\n' +
		'git branch -d feature/dark-mode';
</script>

<section class="first-push page">
	<h1>Module 0 Project — First Push</h1>

	<p class="analogy">
		This is the final exam for Module 0. You will use every tool you learned — terminal,
		Homebrew, Node.js, pnpm, SvelteKit, Git, and GitHub — to create a project from scratch,
		make meaningful commits, push it to the cloud, and open your first Pull Request. When you
		finish, you will have a live repository on GitHub that proves you can do this.
	</p>

	<p class="prose">
		Follow each step in order. Do not skip ahead. Every step builds on the previous one. If you
		get stuck, scroll down to the "Having issues" section for the complete reference code.
	</p>

	<!-- ── Step 1 ── -->
	<h2>Step 1: Create the project</h2>

	<p class="prose">
		Open your terminal. Navigate to the folder where you want your project to live. Run the
		creation wizard with the PE7 options you learned in Lesson 0.7.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep1} />

	<!-- ── Step 2 ── -->
	<h2>Step 2: Install and verify</h2>

	<p class="prose">
		Enter the project folder, install dependencies, and start the dev server to make sure
		everything works before we start editing.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep2} />

	<!-- ── Step 3 ── -->
	<h2>Step 3: Build the hero section</h2>

	<p class="prose">
		Open <code>src/routes/+page.svelte</code> in your code editor. Delete everything inside it
		and paste this hero component. Replace <code>"Your Name"</code> with your actual name.
	</p>

	<CodeCanvas filename="src/routes/+page.svelte — Hero" code={cmdHeroCode} />
	<CodeCanvas filename="Terminal" code={cmdStep3} />

	<!-- ── Step 4 ── -->
	<h2>Step 4: Initialize Git</h2>

	<p class="prose">
		Your project folder is not a Git repository yet. Initialize it and check the status.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep4} />

	<!-- ── Step 5 ── -->
	<h2>Step 5: First commit</h2>

	<p class="prose">
		Stage all files and make your first commit. Notice the conventional commit prefix
		<code>feat:</code> — this follows the conventions from Lesson 0.13.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep5} />

	<!-- ── Step 6 ── -->
	<h2>Step 6: Add skills list</h2>

	<p class="prose">
		Now update <code>+page.svelte</code> to include a skills array and render it as tags. This
		version adds TypeScript-typed data and Svelte's <code>{'{#each}'}</code> loop.
	</p>

	<CodeCanvas filename="src/routes/+page.svelte — With Skills" code={cmdSkillsCode} />
	<CodeCanvas filename="Terminal" code={cmdStep6} />

	<!-- ── Step 7 ── -->
	<h2>Step 7: Second commit</h2>

	<p class="prose">
		Stage and commit the skills addition. This is a separate commit because it is a separate
		feature — exactly as Lesson 0.13 taught.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep7} />

	<!-- ── Step 8 ── -->
	<h2>Step 8: Add footer</h2>

	<p class="prose">
		Add a footer below the hero section that credits the tools and module. This lists everything
		you learned in Module 0.
	</p>

	<CodeCanvas filename="src/routes/+page.svelte — Footer" code={cmdFooterCode} />
	<CodeCanvas filename="Terminal" code={cmdStep8} />

	<!-- ── Step 9 ── -->
	<h2>Step 9: Third commit</h2>

	<CodeCanvas filename="Terminal" code={cmdStep9} />

	<p class="prose">
		You now have three clean, focused commits — each one adds a distinct feature. Your
		<code>git log --oneline</code> reads like a changelog.
	</p>

	<!-- ── Step 10 ── -->
	<h2>Step 10: Push to GitHub</h2>

	<p class="prose">
		Create a new repository on GitHub called <code>first-push</code>. Do not add a README,
		.gitignore, or license (your project already has these). Connect and push.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep10} />

	<!-- ── Step 11 ── -->
	<h2>Step 11: Create a feature branch</h2>

	<p class="prose">
		Now you will practice the branch workflow from Lesson 0.12. Create a feature branch for
		adding dark mode support.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep11} />

	<!-- ── Step 12 ── -->
	<h2>Step 12: Add dark mode</h2>

	<p class="prose">
		Add CSS that detects the user's system dark mode preference and adjusts colors. This uses
		the <code>prefers-color-scheme</code> media query — a CSS feature, not JavaScript.
	</p>

	<CodeCanvas filename="src/routes/+page.svelte — Dark Mode CSS" code={cmdDarkModeCode} />
	<CodeCanvas filename="Terminal" code={cmdStep12} />

	<!-- ── Step 13 ── -->
	<h2>Step 13: Commit, push, and create a PR</h2>

	<p class="prose">
		Commit the dark mode change, push the feature branch, and create a Pull Request on GitHub.
		Follow the PE7 PR format from Lesson 0.13: Summary + Test Plan.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep13} />

	<!-- ── Step 14 ── -->
	<h2>Step 14: Merge and clean up</h2>

	<p class="prose">
		After reviewing your own PR on GitHub, click "Squash and merge." Then clean up locally.
	</p>

	<CodeCanvas filename="Terminal" code={cmdStep14} />

	<!-- ── Checklist ── -->
	<h2>Completion checklist</h2>

	<p class="prose">
		Make sure you have completed every step. Each checkbox represents a skill from Module 0.
	</p>

	<CodeCanvas filename="Checklist" code={cmdChecklist} />

	<!-- ── Common mistakes ── -->
	<h2>Common mistakes</h2>

	<p class="prose">
		Here are the most frequent mistakes students make on this project and how to fix them.
	</p>

	<CodeCanvas filename="Terminal — Common Mistakes" code={cmdCommonMistakes} />

	<!-- ── Having issues ── -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete reference</summary>
		<p>
			If you are stuck at any step, here is the complete command sequence from start to finish.
			Compare your terminal output with each step to find where things went wrong.
		</p>
		<CodeCanvas filename="Terminal — Complete Sequence" code={fullCode} />
		<p>
			If your <code>+page.svelte</code> is not working, make sure you copied the entire code
			from the CodeCanvas blocks above. Check that the <code>&lt;script lang="ts"&gt;</code> tag
			has the <code>lang="ts"</code> attribute. Make sure the <code>&lt;style&gt;</code> block
			is not inside the <code>&lt;section&gt;</code> — it should be at the root level.
		</p>
		<p>
			If <code>git push</code> fails with "Permission denied," go back to Lesson 0.11 and
			verify your SSH key setup. Run <code>ssh -T git@github.com</code> to test.
		</p>
		<p>
			If GitHub shows a "non-fast-forward" error, you created the repo with a README. Delete the
			repo on GitHub, recreate it without any files, and push again.
		</p>
	</details>

	<!-- ── Built with ── -->
	<h2>Built with</h2>

	<p class="prose">
		This project used every concept from Module 0:
	</p>

	<ol class="experiments">
		<li><strong>Terminal</strong> — navigating the file system and running commands (0.1 - 0.3)</li>
		<li><strong>Homebrew</strong> — installing developer tools on macOS (0.4)</li>
		<li><strong>Node.js</strong> — the JavaScript runtime that powers SvelteKit (0.5)</li>
		<li><strong>pnpm</strong> — fast, space-efficient package manager (0.6)</li>
		<li><strong>SvelteKit</strong> — project creation with npx sv create (0.7)</li>
		<li><strong>Folder structure</strong> — understanding every generated file (0.8)</li>
		<li><strong>Git</strong> — version control with init, add, commit, log (0.9 - 0.10)</li>
		<li><strong>GitHub</strong> — remote backup with SSH, push, and pull (0.11)</li>
		<li><strong>Branches</strong> — feature isolation and Pull Requests (0.12)</li>
		<li><strong>Conventional commits</strong> — professional commit messages (0.13)</li>
	</ol>

	<!-- ── What you learned ── -->
	<h2>What you learned</h2>

	<p class="prose">
		You created a SvelteKit project from scratch, wrote a hero component with typed data, made
		multiple focused commits with conventional prefixes, pushed to GitHub over SSH, created a
		feature branch, added dark mode, opened a Pull Request, and merged it. This is the real
		workflow used by every professional frontend team.
	</p>

	<p class="prose">
		Your GitHub profile now has a repository that demonstrates competence with modern tooling.
		Every commit is clean, every message is descriptive, and the branch history shows you
		understand professional Git workflow. This is what hiring managers look for.
	</p>

	<p class="prose">
		Module 0 is complete. You have the foundation: a terminal you understand, tools you can
		install, a framework you can scaffold, and a version control workflow that is ready for
		production. Everything from here builds on this.
	</p>

	<p class="next">
		<strong>Next:</strong> <a href="/module-1/1-1-hello-compiled">Module 1 — Svelte fundamentals</a> —
		start writing real Svelte components, learn the three blocks, and build your first interactive UI.
	</p>
</section>

<style>
	.first-push { --color-brand: oklch(55% 0.18 150); }
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); max-inline-size: 960px; margin: 0 auto; color: var(--color-text); }
	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); color: var(--color-text); }
	.analogy { background: var(--color-surface-2); border-inline-start: 4px solid var(--color-warning); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); color: var(--color-text); line-height: 1.7; max-inline-size: 68ch; font-style: italic; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } }
	.having-issues { margin-block: var(--space-xl); border: 2px dashed var(--color-warning); border-radius: var(--radius-lg); overflow: hidden; & > summary { padding: var(--space-md) var(--space-lg); font-weight: 700; font-size: var(--text-base); color: var(--color-warning); background: var(--color-surface-1); cursor: pointer; } & > p { padding: var(--space-sm) var(--space-lg); margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 480px) { .prose, .analogy { max-inline-size: 65ch; } }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-hero); } .prose, .analogy { max-inline-size: 72ch; } .page { padding: var(--space-2xl); } }
	@media (min-inline-size: 1024px) { .prose, .analogy { max-inline-size: 80ch; } }
</style>
