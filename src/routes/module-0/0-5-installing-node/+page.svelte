<script lang="ts">
  import CodeCanvas from '$lib/components/CodeCanvas.svelte';

  /* ── Terminal commands ── */
  const cmdWhatIsNode = '# JavaScript was born in the browser in 1995.\n# For 14 years, it could ONLY run inside a web browser.\n#\n# In 2009, Ryan Dahl created Node.js.\n# Node.js took Chrome\'s V8 JavaScript engine and\n# made it run OUTSIDE the browser — on your computer.\n#\n# This means JavaScript can now:\n# - Build web servers\n# - Read and write files\n# - Run developer tools (like Svelte)\n# - Power command-line applications';
  const cmdSimple = '# The simplest way to install Node.js:\nbrew install node\n\n# This installs the latest version of Node.js\n# along with npm (Node Package Manager).\n# Takes about 1-3 minutes.';
  const cmdNvm = '# RECOMMENDED: Install nvm (Node Version Manager)\n# nvm lets you switch between Node versions easily.\n\n# Step 1: Install nvm via Homebrew\nbrew install nvm\n\n# Step 2: Create the nvm directory\nmkdir ~/.nvm\n\n# Step 3: Add nvm to your shell profile\n# Copy these lines into your ~/.zshrc file:\nexport NVM_DIR="$HOME/.nvm"\n[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"\n[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"\n\n# Step 4: Restart your terminal (close and reopen)\n\n# Step 5: Install the latest LTS version of Node\nnvm install --lts\n\n# Step 6: Verify\nnode -v\nnpm -v';
  const cmdNvmExplain = '# Why use nvm instead of plain "brew install node"?\n#\n# Different projects may require different Node versions.\n# With nvm, you can switch instantly:\n#\n# nvm install 18      → install Node 18\n# nvm install 20      → install Node 20\n# nvm install --lts   → install latest Long Term Support version\n# nvm use 18          → switch to Node 18\n# nvm use 20          → switch to Node 20\n# nvm ls              → list all installed versions\n#\n# LTS = Long Term Support = the stable, recommended version.\n# Always use LTS unless you have a specific reason not to.';
  const cmdVerifyNode = 'node -v\n# Output: v22.14.0 (or similar)\n\nnpm -v\n# Output: 10.9.2 (or similar)';
  const cmdQuickTest = 'node -e "console.log(\'Hello from Node\')"\n# Output: Hello from Node\n\n# What happened:\n# node -e means "evaluate this JavaScript code"\n# console.log() prints text to the terminal\n# This proves Node.js is installed and can run JavaScript';
  const cmdWhatIsNpm = '# npm = Node Package Manager\n# It comes bundled with Node.js — you do not install it separately.\n#\n# npm is a package manager for JavaScript libraries.\n# Just like Homebrew installs terminal tools,\n# npm installs JavaScript packages (code other people wrote).\n#\n# Examples:\n# npm install svelte     → install the Svelte framework\n# npm install lodash     → install a utility library\n#\n# HOWEVER: In this course, we will use pnpm instead of npm.\n# pnpm is faster, uses less disk space, and is stricter.\n# You will learn all about pnpm in the next lesson.';

  /* ── Break-it experiments ── */
  const cmdBreakRepl = '# Type "node" with no arguments:\nnode\n# You enter the Node.js REPL (Read-Eval-Print Loop).\n# The prompt changes to >\n#\n# Try typing JavaScript:\n> 2 + 2\n4\n> "hello".toUpperCase()\n\'HELLO\'\n> Date.now()\n1712534400000\n>\n# To exit the REPL, type:\n> .exit\n# Or press Ctrl + C twice';
  const cmdBreakNoFile = 'node nonexistent.js\n# Output: Error: Cannot find module \'nonexistent.js\'\n#\n# Node tried to run a file that does not exist.\n# Fix: check the filename and make sure you are\n# in the right directory (pwd).';
  const cmdBreakNpmBefore = '# If you try npm before installing Node:\nnpm -v\n# Output: zsh: command not found: npm\n#\n# npm comes WITH Node.js.\n# Install Node first, then npm will be available.';
  const cmdBreakNewTerminal = '# After installing Node (especially with nvm),\n# open a NEW terminal window before testing.\n#\n# The old terminal does not know about the new installation.\n# Close and reopen Terminal, THEN run:\nnode -v\nnpm -v';

  /* ── Full code ── */
  const fullCode = '# ─── Lesson 0.5: Installing Node.js ───\n' +
    '\n' +
    '# Option A: Simple install\n' +
    'brew install node\n' +
    '\n' +
    '# Option B: Using nvm (recommended)\n' +
    'brew install nvm\n' +
    'mkdir ~/.nvm\n' +
    '# (Add nvm config to ~/.zshrc — see lesson for details)\n' +
    '# Restart terminal, then:\n' +
    'nvm install --lts\n' +
    '\n' +
    '# Verify installation\n' +
    'node -v\n' +
    'npm -v\n' +
    '\n' +
    '# Quick test\n' +
    'node -e "console.log(\'Hello from Node\')"\n' +
    '\n' +
    '# Explore the REPL\n' +
    'node\n' +
    '# Type JavaScript, then .exit to leave';
</script>

<section class="page">
  <h1>0.5 — Installing Node.js</h1>

  <!-- Analogy -->
  <p class="analogy">
    If JavaScript is a language, Node.js is the translator who speaks it outside a browser.
    Before Node.js existed, JavaScript could only run inside web browsers like Chrome or
    Firefox. Node.js freed JavaScript from the browser and let it run anywhere — on your
    laptop, on servers, in terminal tools. Every modern web development tool (including
    Svelte) runs on Node.js.
  </p>

  <!-- What is Node.js -->
  <h2>What is Node.js?</h2>

  <p class="prose">
    When you visit a website, your browser runs JavaScript to make the page interactive —
    buttons that respond to clicks, forms that validate input, animations that move. The
    engine that runs this JavaScript inside Chrome is called <strong>V8</strong>. It was
    built by Google and it is incredibly fast.
  </p>

  <p class="prose">
    In 2009, a developer named Ryan Dahl took the V8 engine out of Chrome and wrapped it in
    a program that could run on any computer, not just inside a browser. He called it
    <strong>Node.js</strong>. This was revolutionary. Suddenly, JavaScript could read files,
    connect to databases, build web servers, and run developer tools. Every modern JavaScript
    framework — React, Vue, Svelte, Next.js, SvelteKit — depends on Node.js to work.
  </p>

  <CodeCanvas filename="Terminal" code={cmdWhatIsNode} />

  <p class="prose">
    You will not write Node.js server code in this course. But you need Node.js installed
    because Svelte's compiler, its development server, and all its tools run on Node.js
    behind the scenes. When you type <code>pnpm dev</code> to start your Svelte project,
    Node.js is what powers it.
  </p>

  <!-- Simple install -->
  <h2>Step 1 — Install Node.js (simple method)</h2>

  <p class="prose">
    The quickest way to install Node.js is through Homebrew, which you set up in the
    previous lesson. One command, and you are done:
  </p>

  <CodeCanvas filename="Terminal" code={cmdSimple} />

  <p class="prose">
    This is perfectly fine for getting started. It installs the latest version of Node.js
    along with <code>npm</code> (Node Package Manager, which we will discuss shortly). If
    you just want to get moving and do not want to think about version management yet, this
    is the way to go.
  </p>

  <!-- nvm -->
  <h2>Step 2 — The recommended way: nvm</h2>

  <p class="prose">
    For professional development, we recommend using <strong>nvm</strong> (Node Version
    Manager). nvm lets you install multiple versions of Node.js and switch between them
    instantly. Why would you need this? Because different projects sometimes require
    different Node.js versions. A client's old project might need Node 18, while your new
    project uses Node 22. With nvm, you switch in one command.
  </p>

  <CodeCanvas filename="Terminal" code={cmdNvm} />

  <p class="prose">
    That is more steps than the simple method, but you only do it once. After this setup,
    nvm is available in every terminal session and you can manage Node versions effortlessly.
  </p>

  <CodeCanvas filename="Terminal" code={cmdNvmExplain} />

  <p class="prose">
    <strong>LTS</strong> stands for Long Term Support. It is the version that the Node.js
    team recommends for most users. It gets security updates and bug fixes for a longer
    period. Always use the LTS version unless a specific project tells you otherwise. As of
    this writing, the current LTS is Node 22.
  </p>

  <!-- Verify -->
  <h2>Step 3 — Verify the installation</h2>

  <p class="prose">
    Open a new terminal window (important — the old one might not see the new installation)
    and run these two commands:
  </p>

  <CodeCanvas filename="Terminal" code={cmdVerifyNode} />

  <p class="prose">
    If both commands print version numbers, Node.js and npm are installed and working. The
    exact version numbers do not matter — what matters is that they are there. If you see
    "command not found," close ALL terminal windows, reopen one, and try again. If it still
    does not work, go back to Step 2 and make sure the nvm configuration was added to your
    <code>~/.zshrc</code> file.
  </p>

  <!-- Quick test -->
  <h2>Step 4 — Quick test</h2>

  <p class="prose">
    Let us prove that Node.js can run JavaScript. The <code>-e</code> flag tells Node to
    evaluate the code that follows it:
  </p>

  <CodeCanvas filename="Terminal" code={cmdQuickTest} />

  <p class="prose">
    You just ran JavaScript from your terminal. Not from a browser. Not from a web page.
    From your terminal, on your computer, using Node.js. This is the same technology that
    will compile your Svelte components, run your development server, and build your
    production application.
  </p>

  <!-- What is npm -->
  <h2>What is npm?</h2>

  <p class="prose">
    When you installed Node.js, another tool came along for the ride: <strong>npm</strong>
    (Node Package Manager). npm is to JavaScript what Homebrew is to macOS — a package
    manager. But instead of installing system tools, npm installs JavaScript
    <strong>packages</strong> (also called "libraries" or "modules").
  </p>

  <CodeCanvas filename="Terminal" code={cmdWhatIsNpm} />

  <p class="prose">
    A JavaScript package is code that someone else wrote and shared so you do not have to
    write it yourself. The Svelte framework is a package. The SvelteKit router is a package.
    Almost every JavaScript project depends on dozens or hundreds of packages. npm downloads
    them and puts them in a folder called <code>node_modules</code> inside your project.
  </p>

  <p class="prose">
    <strong>However</strong> — in this course, we will not use npm directly. Instead, we will
    use <strong>pnpm</strong>, which is a faster, more efficient alternative. You will learn
    everything about pnpm in the next lesson. For now, just know that npm exists, it comes
    with Node.js, and pnpm is the better version of it.
  </p>

  <!-- Break it on purpose -->
  <h2>Break it on purpose</h2>

  <p class="prose">
    Time to explore Node.js by breaking it in controlled ways.
  </p>

  <ol class="experiments">
    <li>
      <strong>Run <code>node</code> with no arguments.</strong> Type <code>node</code> and
      press Enter. Your prompt changes to <code>&gt;</code>. You have entered the
      <strong>REPL</strong> (Read-Eval-Print Loop) — an interactive JavaScript playground.
      Type <code>2 + 2</code> and press Enter. It prints <code>4</code>. Try
      <code>"hello".toUpperCase()</code>. The REPL is great for experimenting. To exit,
      type <code>.exit</code> or press Ctrl + C twice.
    </li>
    <li>
      <strong>Run a file that does not exist.</strong> Type <code>node nonexistent.js</code>.
      Node says <code>Cannot find module</code>. It tried to open and run a JavaScript file
      that is not there. The fix: check the filename spelling and make sure you are in the
      right directory with <code>pwd</code>.
    </li>
    <li>
      <strong>Try <code>npm -v</code> before installing Node.</strong> If you ever set up a
      new machine and forget to install Node, running <code>npm -v</code> gives "command not
      found." npm only exists when Node.js is installed because they are bundled together.
      No Node means no npm.
    </li>
    <li>
      <strong>Test in the old terminal window.</strong> After installing Node (especially
      with nvm), try <code>node -v</code> in the terminal window that was already open
      during installation. It might say "command not found" even though you just installed
      it. The fix: open a <em>new</em> terminal window. The old window does not know about
      changes to your shell configuration. This will happen again with other installations,
      so remember the pattern: install, then new terminal.
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
    <strong>Node.js</strong> is a JavaScript runtime built on Chrome's V8 engine. It lets
    JavaScript run outside the browser — on your computer, on servers, anywhere. Every modern
    JavaScript development tool, including Svelte, depends on Node.js. You installed it using
    either <code>brew install node</code> (simple) or <code>nvm</code> (recommended for
    version management).
  </p>

  <p class="prose">
    You learned that <strong>nvm</strong> (Node Version Manager) lets you install and switch
    between multiple Node.js versions, which is essential for professional development where
    different projects may require different versions. You verified your installation with
    <code>node -v</code> and <code>npm -v</code>, and proved Node.js works by running
    JavaScript directly from the terminal.
  </p>

  <p class="prose">
    You also learned that <strong>npm</strong> (Node Package Manager) comes bundled with
    Node.js and is used to install JavaScript packages. However, in this course we will use
    <strong>pnpm</strong> instead of npm. pnpm is faster, uses dramatically less disk space,
    and enforces stricter dependency management. The next lesson is a deep dive into pnpm —
    the package manager that will power every project you build in this course.
  </p>

  <p class="next"><strong>Next:</strong> <a href="/module-0/0-6-pnpm-deep-dive">0.6 — pnpm deep dive</a></p>
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
