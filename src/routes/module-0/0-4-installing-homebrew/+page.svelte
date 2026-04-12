<script lang="ts">
  import CodeCanvas from '$lib/components/CodeCanvas.svelte';

  /* ── Terminal commands ── */
  const cmdCheckBrew = 'brew --version\n# If installed, you will see something like:\n# Homebrew 4.3.5\n#\n# If NOT installed, you will see:\n# zsh: command not found: brew';
  const cmdInstallBrew = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
  const cmdInstallBrewAnnotated = '# Copy and paste this entire line into your terminal:\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n\n# What this does:\n# curl downloads the install script from GitHub\n# /bin/bash runs that script\n#\n# You will be asked for your macOS password.\n# When you type it, NO characters will appear — that is normal.\n# Type your password and press Enter.\n#\n# The install takes 2-10 minutes depending on your internet.';
  const cmdAppleSilicon = '# APPLE SILICON MACS ONLY (M1, M2, M3, M4 chips)\n# After installation, Homebrew tells you to run these two commands.\n# Copy them EXACTLY from your terminal output:\n\necho >> ~/.zprofile\necho \'eval "$(/opt/homebrew/bin/brew shellenv)"\' >> ~/.zprofile\neval "$(/opt/homebrew/bin/brew shellenv)"';
  const cmdAppleSiliconExplain = '# How to know if you have Apple Silicon:\n# Click the Apple menu (top-left) → "About This Mac"\n# If it says "Apple M1" or "Apple M2" (etc.) → Apple Silicon\n# If it says "Intel" → you can skip the PATH step\n\n# Why this step is needed:\n# On Apple Silicon, Homebrew installs to /opt/homebrew/\n# On Intel Macs, it installs to /usr/local/\n# The PATH tells your terminal where to find the brew command.';
  const cmdVerify = 'brew --version\n# Output: Homebrew 4.3.5 (or similar)';
  const cmdTree = '# Install the "tree" command — a visual file explorer\nbrew install tree\n\n# Now try it:\ntree\n# Output: a visual tree of all files and folders\n#\n# .\n# ├── Desktop\n# ├── Documents\n# ├── Downloads\n# └── my-project\n#     └── hello.txt';
  const cmdTreeProject = 'cd ~/Documents/my-project\ntree\n# Output:\n# .\n# └── hello.txt\n#\n# 0 directories, 1 file';

  /* ── Break-it experiments ── */
  const cmdBreakNoName = 'brew install\n# Output: Error: This command requires a formula or cask argument.';
  const cmdBreakFake = 'brew install fakepkg123abc\n# Output: Error: No formulae or casks found for "fakepkg123abc".';
  const cmdBreakTwice = '# Run the Homebrew install script again (after already installing).\n# It will detect the existing installation and tell you:\n# "Homebrew is already installed."\n# No harm done — it is safe to run again.';
  const cmdBrewDoctor = 'brew doctor\n# Output: "Your system is ready to brew."\n# (or a list of warnings if something needs fixing)\n#\n# Think of brew doctor as a health check.\n# Run it whenever something seems off.';

  /* ── Full code ── */
  const fullCode = '# ─── Lesson 0.4: Installing Homebrew ───\n' +
    '\n' +
    '# Step 1: Check if Homebrew is already installed\n' +
    'brew --version\n' +
    '\n' +
    '# Step 2: Install Homebrew (skip if already installed)\n' +
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n' +
    '\n' +
    '# Step 3: Apple Silicon PATH setup (M1/M2/M3/M4 only)\n' +
    'echo >> ~/.zprofile\n' +
    'echo \'eval "$(/opt/homebrew/bin/brew shellenv)"\' >> ~/.zprofile\n' +
    'eval "$(/opt/homebrew/bin/brew shellenv)"\n' +
    '\n' +
    '# Step 4: Verify installation\n' +
    'brew --version\n' +
    '\n' +
    '# Step 5: Install your first package\n' +
    'brew install tree\n' +
    'tree\n' +
    '\n' +
    '# Bonus: Health check\n' +
    'brew doctor';
</script>

<section class="page">
  <h1>0.4 — Installing Homebrew</h1>

  <!-- Analogy -->
  <p class="analogy">
    Homebrew is the App Store for your terminal. Just like you open the App Store on your
    phone, search for an app, and press Install, Homebrew lets you type
    <code>brew install something</code> and instantly download developer tools. Except
    Homebrew is free, has thousands more packages, and does not ask you to sign in.
  </p>

  <!-- What is a package manager -->
  <h2>What is a package manager?</h2>

  <p class="prose">
    A <strong>package manager</strong> is a tool that downloads, installs, updates, and
    removes software for you. Without one, installing a tool like Node.js means going to a
    website, finding the right download link for your operating system, downloading an
    installer, running it, clicking through dialogs, and hoping nothing conflicts with what
    you already have. With a package manager, you type one line and it handles everything.
  </p>

  <p class="prose">
    <strong>Homebrew</strong> is the most popular package manager for macOS. It was created
    in 2009 and is now used by millions of developers. Almost every development tutorial
    assumes you have it installed. It manages a catalog of thousands of "formulae" (command-
    line tools) and "casks" (graphical applications). When you run <code>brew install</code>,
    Homebrew downloads the software, puts it in the right place, and configures your system
    to find it.
  </p>

  <p class="prose">
    If you are on Linux, Homebrew works there too. If you are on Windows, you would use a
    different package manager (like <code>winget</code> or <code>choco</code>), but the idea
    is the same.
  </p>

  <!-- Check if installed -->
  <h2>Step 1 — Check if Homebrew is already installed</h2>

  <p class="prose">
    Before installing anything, always check if it is already there. Open your terminal and
    run:
  </p>

  <CodeCanvas filename="Terminal" code={cmdCheckBrew} />

  <p class="prose">
    If you see a version number, Homebrew is already installed and you can skip to Step 4.
    If you see "command not found," proceed to Step 2.
  </p>

  <!-- Install Homebrew -->
  <h2>Step 2 — Install Homebrew</h2>

  <p class="prose">
    This is the official installation command from the Homebrew website. Copy and paste it
    into your terminal exactly as shown. Do not try to type it manually — it is long and
    any typo will cause it to fail.
  </p>

  <CodeCanvas filename="Terminal" code={cmdInstallBrewAnnotated} />

  <p class="prose">
    <strong>Important:</strong> When the installer asks for your password, type your macOS
    login password and press Enter. You will not see any characters appear as you type — no
    dots, no asterisks, nothing. This is a security feature, not a bug. The terminal hides
    your password so nobody looking over your shoulder can see it. Just type it and press
    Enter.
  </p>

  <p class="prose">
    The installation process will download about 300-500 MB of files and take anywhere from
    2 to 10 minutes depending on your internet speed. Let it run. Do not close the terminal
    window. You will see a lot of text scrolling by — that is normal. When it is done, you
    will see a message that says "Installation successful!"
  </p>

  <!-- Apple Silicon PATH -->
  <h2>Step 3 — Set up the PATH (Apple Silicon only)</h2>

  <p class="prose">
    If you have an Apple Silicon Mac (any Mac with an M1, M2, M3, or M4 chip), you need to
    run one more step. The Homebrew installer will print these exact commands at the end of
    its output — look for them and copy/paste them.
  </p>

  <CodeCanvas filename="Terminal — Apple Silicon" code={cmdAppleSilicon} />

  <p class="prose">
    Do not worry about understanding what the PATH is right now. Just know that it tells
    your terminal where to find the <code>brew</code> command. Without this step, your
    terminal will say "command not found" even though Homebrew is installed. If you have an
    Intel Mac, this step is not needed — skip to Step 4.
  </p>

  <CodeCanvas filename="Terminal — how to check" code={cmdAppleSiliconExplain} />

  <!-- Verify -->
  <h2>Step 4 — Verify the installation</h2>

  <p class="prose">
    Close your terminal window and open a brand-new one. Then run:
  </p>

  <CodeCanvas filename="Terminal" code={cmdVerify} />

  <p class="prose">
    If you see a version number, Homebrew is installed and ready to use. If you still see
    "command not found," go back to Step 3 and make sure you ran the PATH commands. If that
    does not help, try closing ALL terminal windows and opening a fresh one — the PATH
    changes only take effect in new terminal sessions.
  </p>

  <!-- First install -->
  <h2>Step 5 — Install your first package</h2>

  <p class="prose">
    Let us take Homebrew for a test drive by installing <code>tree</code>, a command that
    shows you a visual map of your files and folders. It is like <code>ls</code>, but it
    draws a beautiful tree diagram.
  </p>

  <CodeCanvas filename="Terminal" code={cmdTree} />

  <p class="prose">
    That is the magic of a package manager. One command, and you have a new tool available
    in your terminal forever. No website, no installer, no clicking. Just
    <code>brew install name</code>. We will use Homebrew to install Node.js in the next
    lesson and many more tools throughout this course.
  </p>

  <CodeCanvas filename="Terminal" code={cmdTreeProject} />

  <p class="prose">
    Try running <code>tree</code> inside different folders to explore your file system
    visually. It is a great way to understand the structure of a project.
  </p>

  <!-- Break it on purpose -->
  <h2>Break it on purpose</h2>

  <p class="prose">
    Let us learn what happens when Homebrew commands go wrong.
  </p>

  <ol class="experiments">
    <li>
      <strong><code>brew install</code> with no package name.</strong> Type
      <code>brew install</code> and press Enter (nothing after "install"). Homebrew tells
      you: <code>This command requires a formula or cask argument</code>. It needs you to
      tell it what to install. The fix: add the package name after <code>install</code>.
    </li>
    <li>
      <strong>Install a package that does not exist.</strong> Type
      <code>brew install fakepkg123abc</code>. Homebrew says
      <code>No formulae or casks found</code>. It searched its catalog and found nothing
      matching that name. The fix: check the spelling or search for the correct name with
      <code>brew search keyword</code>.
    </li>
    <li>
      <strong>Run the install script a second time.</strong> Copy and paste the Homebrew
      install command again. It detects that Homebrew is already installed and tells you so.
      No harm done — it is safe to run again. This is called <strong>idempotence</strong> —
      running something twice gives the same result as running it once.
    </li>
    <li>
      <strong>Run <code>brew doctor</code>.</strong> This is Homebrew's built-in health
      check. Type <code>brew doctor</code> and press Enter. If everything is fine, it says
      "Your system is ready to brew." If there are issues, it lists them with suggestions
      for how to fix each one. Run this command whenever something seems off with Homebrew.
    </li>
  </ol>

  <!-- Having issues -->
  <details class="having-issues">
    <summary>Having issues? Here is the complete code</summary>
    <p>All commands from this lesson in one place.</p>
    <CodeCanvas filename="Terminal — all commands" code={fullCode} />
  </details>

  <!-- What you learned -->
  <h2>What you learned</h2>

  <p class="prose">
    A <strong>package manager</strong> is a tool that installs software for you from the
    command line. Homebrew is the standard package manager for macOS. It maintains a catalog
    of thousands of developer tools and applications. Instead of downloading installers from
    websites, you type <code>brew install name</code> and Homebrew handles the rest.
  </p>

  <p class="prose">
    You learned how to check if Homebrew is installed (<code>brew --version</code>), install
    it using the official script, set up the PATH for Apple Silicon Macs, and verify that
    everything works. You installed your first package — <code>tree</code> — and saw how a
    single command can add new capabilities to your terminal.
  </p>

  <p class="prose">
    You also learned that <code>brew doctor</code> is your diagnostic tool when things go
    wrong, that running the install script twice is safe, and that Homebrew gives clear error
    messages when you forget arguments or misspell package names. Homebrew is the gateway
    tool — almost everything else we install in this course (Node.js, pnpm, and more) will
    come through Homebrew. Having it working is the single most important setup step on macOS.
  </p>

  <p class="next"><strong>Next:</strong> <a href="/module-0/0-5-installing-node">0.5 — Installing Node.js</a></p>
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
