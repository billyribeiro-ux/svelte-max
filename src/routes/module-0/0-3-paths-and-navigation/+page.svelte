<script lang="ts">
  import CodeCanvas from '$lib/components/CodeCanvas.svelte';

  /* ── Terminal commands ── */
  const cmdAbsolute = 'cd /Users/yourname/Documents\npwd\n# Output: /Users/yourname/Documents';
  const cmdAbsoluteExplain = '# An absolute path always starts with /\n# It is the FULL address from the root of your hard drive.\n#\n# /Users/yourname/Documents/my-project/src/index.js\n# │      │         │          │          │   └── file\n# │      │         │          │          └── folder\n# │      │         │          └── folder\n# │      │         └── folder\n# │      └── folder\n# └── root (the top of your entire file system)';
  const cmdRelative = '# You are in /Users/yourname/Documents\npwd\n# Output: /Users/yourname/Documents\n\n# Move into a subfolder (relative — no leading /)\ncd my-project\npwd\n# Output: /Users/yourname/Documents/my-project\n\n# Go up one level with ..\ncd ..\npwd\n# Output: /Users/yourname/Documents\n\n# Go up two levels\ncd ../..\npwd\n# Output: /Users';
  const cmdDotExplain = '# . means "this folder" (current directory)\n# .. means "the folder above" (parent directory)\n#\n# Examples:\n# cd .         → stay right here (useless but valid)\n# cd ..        → go up one level\n# cd ../..     → go up two levels\n# cd ../other  → go up one level, then into "other"';
  const cmdHome = '# These all take you home:\ncd ~\ncd\ncd $HOME\n\n# The tilde works in paths too:\ncd ~/Documents\n# Same as: cd /Users/yourname/Documents\n\ncd ~/Desktop/projects\n# Same as: cd /Users/yourname/Desktop/projects';
  const cmdTab = '# Type this, but do NOT press Enter yet:\ncd Docu\n# Now press the Tab key.\n# The terminal completes it to:\ncd Documents/\n\n# If there are multiple matches, press Tab twice\n# to see all options:\ncd D\n# Tab Tab → shows: Desktop/  Documents/  Downloads/';
  const cmdUpArrow = '# Press the Up arrow key to cycle through your\n# previous commands. Each press goes one command\n# further back in history.\n#\n# Up arrow once: your last command\n# Up arrow twice: the command before that\n# Down arrow: go forward again\n#\n# Press Enter to run whichever command is showing.';
  const cmdHistory = 'history';
  const cmdHistoryOutput = 'history\n# Output:\n#  1  echo "Hello, world"\n#  2  whoami\n#  3  date\n#  4  clear\n#  5  pwd\n#  6  ls\n#  7  cd Documents\n#  8  mkdir my-project\n#  ...\n\n# Run a specific command by its number:\n!5\n# This runs: pwd';
  const cmdHistoryGrep = '# Search your history for a specific command:\nhistory | grep "mkdir"\n# Output: shows every time you ran mkdir';

  /* ── Break-it experiments ── */
  const cmdBreakTypo = 'cd Documants\n# Output: cd: no such file or directory: Documants\n#\n# Fix: check spelling, use Tab completion';
  const cmdBreakCdNoArgs = 'cd /Users/yourname/Documents/my-project\npwd\n# Output: /Users/yourname/Documents/my-project\n\ncd\npwd\n# Output: /Users/yourname\n# cd with no arguments takes you home!';
  const cmdBreakTabAmbiguous = '# Type: cd D and press Tab\n# If you have Desktop, Documents, and Downloads,\n# the terminal beeps (or does nothing).\n# Press Tab AGAIN to see all matches:\n#   Desktop/  Documents/  Downloads/\n# Type more letters to narrow it down:\n# cd Do + Tab → still ambiguous (Documents, Downloads)\n# cd Doc + Tab → completes to Documents/';
  const cmdBreakBackslash = 'cd C:\\Users\\yourname\n# Output: cd: no such file or directory: C:\\Users\\yourname\n#\n# Backslashes are a Windows thing.\n# macOS and Linux use forward slashes: /\n# cd /Users/yourname';

  /* ── Full code ── */
  const fullCode = '# ─── Lesson 0.3: Paths and navigation ───\n' +
    '\n' +
    '# Absolute path (full address)\n' +
    'cd /Users/yourname/Documents\n' +
    'pwd\n' +
    '\n' +
    '# Relative path (from where you are)\n' +
    'cd my-project\n' +
    'pwd\n' +
    '\n' +
    '# Go up one level\n' +
    'cd ..\n' +
    '\n' +
    '# Go up two levels\n' +
    'cd ../..\n' +
    '\n' +
    '# Go home\n' +
    'cd ~\n' +
    '\n' +
    '# Home shortcut in paths\n' +
    'cd ~/Documents\n' +
    'cd ~/Desktop/projects\n' +
    '\n' +
    '# View command history\n' +
    'history\n' +
    '\n' +
    '# Search history\n' +
    'history | grep "mkdir"\n' +
    '\n' +
    '# ─── Tips ───\n' +
    '# Tab key: auto-complete file and folder names\n' +
    '# Up arrow: cycle through previous commands\n' +
    '# Down arrow: go forward in history\n' +
    '# Ctrl + R: search history interactively';
</script>

<section class="page">
  <h1>0.3 — Paths and navigation</h1>

  <!-- Analogy -->
  <p class="analogy">
    An absolute path is a full street address: "742 Evergreen Terrace, Springfield, USA."
    No matter where you are in the world, that address takes you to the same house.
    A relative path is "the house next door" — it only makes sense based on where you are
    standing right now. Both are useful. Absolute paths are precise. Relative paths are
    convenient.
  </p>

  <p class="prose">
    In Lesson 0.2, you used <code>cd Documents</code> to move into a folder. But what
    exactly did you type? That was a <strong>relative path</strong> — it only worked because
    you were already in your home directory, where "Documents" exists. If you had been
    somewhere else, the terminal would have said "no such file or directory." In this lesson,
    you will learn the difference between absolute and relative paths, master the shortcuts
    that make navigation fast, and discover power features like tab completion and command
    history.
  </p>

  <!-- Absolute paths -->
  <h2>Absolute paths — the full address</h2>

  <p class="prose">
    An absolute path starts with a forward slash <code>/</code> and spells out the complete
    route from the root of your file system to the target. The "root" is the very top of your
    hard drive — the folder that contains every other folder. On macOS, the root is just
    <code>/</code>.
  </p>

  <CodeCanvas filename="Terminal" code={cmdAbsoluteExplain} />

  <p class="prose">
    Every file and folder on your computer has exactly one absolute path. It does not matter
    where you are when you type it — an absolute path always works because it starts from
    the root. Use absolute paths when you need precision: in configuration files, in scripts
    that might run from any location, or when you are giving someone directions to a file.
  </p>

  <CodeCanvas filename="Terminal" code={cmdAbsolute} />

  <p class="prose">
    Think of it this way: if someone asks "Where is your project?" you could say
    <code>/Users/yourname/Documents/my-project</code> and they would find it from anywhere
    on the computer. That is the power of an absolute path.
  </p>

  <!-- Relative paths -->
  <h2>Relative paths — from where you stand</h2>

  <p class="prose">
    A relative path does <em>not</em> start with <code>/</code>. Instead, it describes how
    to get to the target <em>from your current location</em>. It is shorter and more
    convenient for everyday navigation, but it only works if you are in the right starting
    place.
  </p>

  <CodeCanvas filename="Terminal" code={cmdRelative} />

  <p class="prose">
    The two special symbols you need to memorize:
  </p>

  <CodeCanvas filename="Terminal" code={cmdDotExplain} />

  <p class="prose">
    <strong><code>.</code> (single dot)</strong> means "the current directory." You will see
    this in commands like <code>./run-script.sh</code>, which means "run the script that is
    right here in my current folder." By itself, <code>cd .</code> is useless (it moves you
    to where you already are), but the dot shows up everywhere in programming.
  </p>

  <p class="prose">
    <strong><code>..</code> (double dot)</strong> means "the parent directory" — the folder
    one level above where you are. You can chain them: <code>cd ../..</code> goes up two
    levels. <code>cd ../other-project</code> goes up one level and then into a sibling
    folder called "other-project." This is one of the most-used patterns in terminal
    navigation.
  </p>

  <!-- Home shortcut -->
  <h2>The home shortcut — <code>~</code></h2>

  <p class="prose">
    The tilde character <code>~</code> is a shortcut for your home directory. On macOS,
    <code>~</code> expands to <code>/Users/yourname</code>. On Linux, it expands to
    <code>/home/yourname</code>. You can use it anywhere in a path.
  </p>

  <CodeCanvas filename="Terminal" code={cmdHome} />

  <p class="prose">
    Notice that <code>cd</code> with no arguments also takes you home. This is a shortcut
    built into the shell. <code>cd</code>, <code>cd ~</code>, and <code>cd $HOME</code> all
    do the same thing. Use whichever feels natural. Most developers just type <code>cd</code>
    by itself because it is the fastest.
  </p>

  <!-- Tab completion -->
  <h2>Tab completion — let the terminal type for you</h2>

  <p class="prose">
    This is the single most important productivity trick in the terminal. Instead of typing
    a full folder name, type the first few letters and press the <strong>Tab key</strong>.
    The shell will auto-complete the rest. If there are multiple possibilities, press Tab
    twice to see them all.
  </p>

  <CodeCanvas filename="Terminal" code={cmdTab} />

  <p class="prose">
    Tab completion works for file names, folder names, command names, and even some command
    arguments. It prevents typos. It saves time. It is the reason experienced developers
    can type terminal commands so fast — they are not actually typing every letter. They
    type three letters and press Tab. Make this a habit starting today.
  </p>

  <p class="prose">
    <strong>Pro tip:</strong> If pressing Tab does nothing, it means either (a) nothing
    matches what you typed, or (b) there are multiple matches and the shell needs more
    letters to narrow it down. Press Tab twice to see the options, then type one or two
    more letters and Tab again.
  </p>

  <!-- Up arrow -->
  <h2>Up arrow — cycle through history</h2>

  <p class="prose">
    Your second most important shortcut. Press the <strong>Up arrow</strong> key to recall
    your previous command. Press it again for the command before that. Keep pressing to go
    further back. The <strong>Down arrow</strong> moves forward again. When the command you
    want is showing, just press Enter to run it.
  </p>

  <CodeCanvas filename="Terminal" code={cmdUpArrow} />

  <p class="prose">
    This saves enormous amounts of retyping. If you just ran a long command and need to run
    it again, press Up and Enter. If you need to modify it slightly, press Up, use the
    left/right arrow keys to edit it, then press Enter. You will use this hundreds of times
    a day.
  </p>

  <!-- History command -->
  <h2>The <code>history</code> command</h2>

  <p class="prose">
    Everything you type in the terminal is saved to a history file. The <code>history</code>
    command shows you every command you have ever run in the terminal (or at least the last
    several thousand). Each entry has a number next to it.
  </p>

  <CodeCanvas filename="Terminal" code={cmdHistoryOutput} />

  <p class="prose">
    You can search your history using the pipe (<code>|</code>) and <code>grep</code>. Do
    not worry about what those mean yet — just know that this pattern lets you find a
    specific command you ran before:
  </p>

  <CodeCanvas filename="Terminal" code={cmdHistoryGrep} />

  <p class="prose">
    There is also an interactive search: press <strong>Ctrl + R</strong> and start typing.
    The terminal will search backward through your history and show you the most recent
    match. Press Enter to run it, or Ctrl + R again to find the next match. This is
    incredibly useful when you remember part of a command but not the whole thing.
  </p>

  <!-- Break it on purpose -->
  <h2>Break it on purpose</h2>

  <p class="prose">
    Let us explore common mistakes with paths so you recognize these errors immediately.
  </p>

  <ol class="experiments">
    <li>
      <strong>Typo in a path.</strong> Type <code>cd Documants</code> (misspelled). You get
      <code>no such file or directory</code>. The fix: use Tab completion. If you had typed
      <code>cd Doc</code> and pressed Tab, the shell would have completed it correctly. Tab
      completion prevents this entire category of errors.
    </li>
    <li>
      <strong><code>cd</code> with no arguments.</strong> Navigate somewhere deep, like
      <code>cd /Users/yourname/Documents/my-project</code>, then type <code>cd</code> by
      itself and press Enter. Run <code>pwd</code>. You are back home. This is not a bug —
      it is a feature. <code>cd</code> with no arguments always takes you to your home
      directory. This can surprise you if you accidentally press Enter without typing a
      destination.
    </li>
    <li>
      <strong>Tab with ambiguous prefix.</strong> Type <code>cd D</code> and press Tab.
      Nothing happens (or you hear a beep). Press Tab again — you see all folders starting
      with "D." Now type <code>cd Doc</code> and Tab — it completes to "Documents." The
      lesson: when Tab does not complete, you need more letters to make the match unique.
    </li>
    <li>
      <strong>Windows backslash.</strong> Type <code>cd C:\Users\yourname</code>. The
      terminal does not understand this. Backslashes are a Windows path separator. macOS and
      Linux use forward slashes (<code>/</code>). If you are coming from Windows, you need
      to retrain your fingers to reach for <code>/</code> instead of <code>\</code>.
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
    You now understand the two types of paths in every operating system.
    <strong>Absolute paths</strong> start with <code>/</code> and describe the complete route
    from the root of your file system. They work from anywhere. <strong>Relative paths</strong>
    do not start with <code>/</code> and describe the route from your current location. They
    are shorter but depend on where you are standing.
  </p>

  <p class="prose">
    You learned three essential shortcuts: <code>~</code> for your home directory,
    <code>..</code> for "up one level," and <code>.</code> for "right here." You also learned
    that <code>cd</code> with no arguments takes you home, which is the same as
    <code>cd ~</code>.
  </p>

  <p class="prose">
    Most importantly, you learned the two productivity features that separate slow terminal
    users from fast ones: <strong>Tab completion</strong> (type a few letters, press Tab to
    auto-complete) and the <strong>Up arrow</strong> (recall previous commands). You also
    discovered the <code>history</code> command and <strong>Ctrl + R</strong> for searching
    past commands. These tools mean you rarely have to type a full command or path from
    scratch. Practice Tab completion on every command for the rest of this course. Within a
    few days, it will be automatic.
  </p>

  <p class="next"><strong>Next:</strong> <a href="/module-0/0-4-installing-homebrew">0.4 — Installing Homebrew</a></p>
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
