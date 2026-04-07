<script lang="ts">
  import CodeCanvas from '$lib/components/CodeCanvas.svelte';

  /* ── Terminal commands as const strings for CodeCanvas ── */
  const cmdEcho = 'echo "Hello, world"';
  const cmdWhoami = 'whoami';
  const cmdDate = 'date';
  const cmdClear = 'clear';
  const cmdOpenSpotlight = '# Press Cmd + Space on your keyboard\n# Type "Terminal"\n# Press Enter';
  const cmdOpenFinder = '# Open Finder\n# Go to Applications → Utilities → Terminal\n# Double-click Terminal';

  /* ── Break-it experiments ── */
  const cmdGibberish = 'flarblegarble';
  const cmdEchoEmpty = 'echo';
  const cmdEchoCaps = 'ECHO "hello"';

  /* ── Full code for having-issues section ── */
  const fullCode = '# ─── Lesson 0.1: What the Terminal is ───\n' +
    '# Open Terminal first:\n' +
    '#   Spotlight: Cmd + Space → type "Terminal" → press Enter\n' +
    '#   OR: Finder → Applications → Utilities → Terminal\n' +
    '\n' +
    '# Command 1: Say hello\n' +
    'echo "Hello, world"\n' +
    '\n' +
    '# Command 2: Who am I?\n' +
    'whoami\n' +
    '\n' +
    '# Command 3: What is the date?\n' +
    'date\n' +
    '\n' +
    '# Command 4: Clear the screen\n' +
    'clear\n' +
    '\n' +
    '# ─── Break-it experiments ───\n' +
    '\n' +
    '# Experiment 1: Type gibberish\n' +
    'flarblegarble\n' +
    '# Expected: "command not found"\n' +
    '\n' +
    '# Experiment 2: echo with no arguments\n' +
    'echo\n' +
    '# Expected: blank line\n' +
    '\n' +
    '# Experiment 3: ECHO in uppercase\n' +
    'ECHO "hello"\n' +
    '# Expected: "command not found" — commands are case-sensitive';
</script>

<section class="page">
  <h1>0.1 — What the Terminal is</h1>

  <!-- Analogy -->
  <p class="analogy">
    The Terminal is a text conversation with your computer. Instead of pointing and clicking
    in Finder or File Explorer, you type instructions and the computer types back. You say
    "show me today's date" by typing <code>date</code>. The computer answers with the current
    date and time. That is the entire idea. Every command you learn is just a new sentence in
    this conversation.
  </p>

  <!-- What is a shell? -->
  <h2>What is a shell?</h2>

  <p class="prose">
    When you open Terminal, you are actually talking to a program called a <strong>shell</strong>.
    The shell is the interpreter that reads what you type, figures out what you mean, and tells
    the operating system to do it. Think of the shell as a translator sitting between you and
    the computer's core. You speak English-ish commands, the shell translates them into
    instructions the operating system understands.
  </p>

  <p class="prose">
    On macOS (since Catalina, released in 2019), the default shell is called <strong>zsh</strong>
    (pronounced "zee-shell" or "zed-shell"). On older Macs and most Linux systems, you might
    see <strong>bash</strong> instead. For everything in this course, both work identically.
    You do not need to change anything. If you are on Windows, you will use
    <strong>PowerShell</strong> or <strong>Git Bash</strong> — the commands are almost the same,
    and we will note any differences as they come up.
  </p>

  <p class="prose">
    The important thing to remember: Terminal is just the <em>window</em>. The shell is the
    <em>brain</em> inside the window. When people say "open a terminal," they mean "open the
    window so you can talk to the shell."
  </p>

  <!-- How to open Terminal -->
  <h2>How to open Terminal on macOS</h2>

  <p class="prose">
    There are two ways to open Terminal on a Mac. Use whichever feels more natural. You will
    be opening this application hundreds of times throughout this course, so pick a method and
    make it a habit.
  </p>

  <h2>Method 1 — Spotlight (fastest)</h2>

  <p class="prose">
    Spotlight is the search bar built into every Mac. It can find and open any application in
    about two seconds.
  </p>

  <CodeCanvas filename="Terminal" code={cmdOpenSpotlight} />

  <p class="prose">
    That is it. Three keystrokes and you have a terminal window open and ready. The blinking
    cursor is waiting for your first command.
  </p>

  <h2>Method 2 — Finder (manual)</h2>

  <p class="prose">
    If Spotlight is not your thing, you can find Terminal the old-fashioned way by navigating
    through your Applications folder.
  </p>

  <CodeCanvas filename="Terminal" code={cmdOpenFinder} />

  <p class="prose">
    Once Terminal is open, you should see a window with a dark or light background (depending
    on your settings) and a blinking cursor. That cursor is called the <strong>prompt</strong>,
    and it is waiting for you to type something.
  </p>

  <!-- Anatomy of the prompt -->
  <h2>Anatomy of the prompt</h2>

  <p class="prose">
    When you first open Terminal, you will see something like this:
  </p>

  <CodeCanvas filename="Terminal" code={'yourname@MacBook-Pro ~ %'} />

  <p class="prose">
    Let us break that down piece by piece:
  </p>

  <p class="prose">
    <strong><code>yourname</code></strong> — This is your macOS username. It is the name you
    chose when you first set up your Mac. If you are not sure what it is, do not worry — the
    next command we learn will tell you.
  </p>

  <p class="prose">
    <strong><code>@MacBook-Pro</code></strong> — This is your computer's hostname. It is the
    name of the physical machine you are sitting at. On a Mac, it usually says something like
    "MacBook-Pro" or "MacBook-Air" or whatever you named your computer.
  </p>

  <p class="prose">
    <strong><code>~</code></strong> — This tilde symbol represents your <strong>home
    directory</strong>. It is the folder where all your personal files live. On macOS, that is
    <code>/Users/yourname</code>. The tilde is just a shortcut so you do not have to type the
    full path every time. We will learn much more about paths in Lesson 0.3.
  </p>

  <p class="prose">
    <strong><code>%</code></strong> — This is the prompt character for zsh. It means "I am
    ready for your next command." In bash (the older default shell), you would see
    <code>$</code> instead. Either way, it means the same thing: "Type something."
  </p>

  <p class="prose">
    You never type the <code>%</code> or <code>$</code> yourself. When you see a command in
    a tutorial that starts with <code>$</code> or <code>%</code>, skip that character — it is
    just showing you the prompt. Only type what comes after it.
  </p>

  <!-- First commands -->
  <h2>Step 1 — Say hello to your computer</h2>

  <p class="prose">
    Your very first command. The <code>echo</code> command tells the terminal to repeat
    something back to you. It is like asking someone to repeat what you just said. Type this
    exactly (including the quotation marks) and press <strong>Enter</strong>:
  </p>

  <CodeCanvas filename="Terminal" code={cmdEcho} />

  <p class="prose">
    After you press Enter, the terminal should print <code>Hello, world</code> on the next
    line and then show your prompt again, ready for the next command. Congratulations — you
    just gave your computer its first instruction. The <code>echo</code> command is simple,
    but it proves something important: you typed, the computer responded. That is the
    foundation of everything we will build.
  </p>

  <h2>Step 2 — Find out who you are</h2>

  <p class="prose">
    The <code>whoami</code> command asks the computer: "Which user account is currently
    logged in?" Type it and press Enter:
  </p>

  <CodeCanvas filename="Terminal" code={cmdWhoami} />

  <p class="prose">
    The terminal will print your macOS username — the same one that appears in your prompt.
    This command is useful later when you need to know your exact username for file paths or
    configuration files. For now, it is just fun to see the computer tell you who you are.
  </p>

  <h2>Step 3 — Ask for the date</h2>

  <p class="prose">
    The <code>date</code> command prints the current date and time. It pulls this from your
    computer's internal clock.
  </p>

  <CodeCanvas filename="Terminal" code={cmdDate} />

  <p class="prose">
    You will see something like <code>Mon Apr 7 14:32:09 EDT 2026</code>. The exact format
    depends on your system settings. This is a read-only command — it just reports information
    and does not change anything. Most of the commands we learn in these early lessons are
    read-only. They are safe to run as many times as you want.
  </p>

  <h2>Step 4 — Clear the screen</h2>

  <p class="prose">
    After a few commands, your terminal window might feel cluttered. The <code>clear</code>
    command wipes the screen clean and puts your cursor back at the top. It does not delete
    anything — your previous commands still happened, they are just scrolled out of view.
  </p>

  <CodeCanvas filename="Terminal" code={cmdClear} />

  <p class="prose">
    Think of <code>clear</code> like erasing a whiteboard. The ideas you wrote are still in
    your head (and in the terminal's history), but the board is clean and ready for new work.
    You can also press <strong>Cmd + K</strong> on macOS for the same effect.
  </p>

  <p class="prose">
    You now know four commands: <code>echo</code>, <code>whoami</code>, <code>date</code>,
    and <code>clear</code>. That is more than enough to prove that the terminal works and
    that you can talk to it. Every single developer in the world started exactly where you
    are right now.
  </p>

  <!-- Break it on purpose -->
  <h2>Break it on purpose</h2>

  <p class="prose">
    The best way to learn is to break things intentionally. When you see an error message,
    you learn what causes it — and next time you see that error accidentally, you will know
    exactly what went wrong. Try each of these experiments:
  </p>

  <ol class="experiments">
    <li>
      <strong>Type gibberish.</strong> Type <code>flarblegarble</code> and press Enter. The
      terminal will say <code>zsh: command not found: flarblegarble</code>. This is the most
      common error you will ever see. It means "I do not recognize that word as a command."
      Every time you mistype a command, you will get this message. It is not scary — it is
      the terminal saying "I did not understand, try again."
    </li>
    <li>
      <strong>Run echo with no text.</strong> Type <code>echo</code> by itself (no quotes, no
      text after it) and press Enter. The terminal prints a blank line. This is not an error
      — you told it to echo nothing, so it echoed nothing. Commands do exactly what you ask,
      even if what you ask does not make much sense.
    </li>
    <li>
      <strong>Try ECHO in uppercase.</strong> Type <code>ECHO "hello"</code> and press Enter.
      You will get <code>command not found</code> again. Terminal commands are
      <strong>case-sensitive</strong>. <code>echo</code> is a valid command.
      <code>ECHO</code> is not. <code>Echo</code> is not. Only the exact lowercase spelling
      works. This is one of the biggest surprises for people coming from Windows, where
      commands are case-insensitive.
    </li>
    <li>
      <strong>Close the terminal window mid-session.</strong> Type a few commands, then close
      the Terminal window entirely (click the red X or press Cmd + W). Now reopen Terminal.
      Notice that your previous session is gone — the screen is blank. The terminal does not
      save what was on screen between sessions. Your command <em>history</em> is saved (we
      will learn about that in Lesson 0.3), but the visual output disappears when you close
      the window.
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
    The Terminal is a text-based interface for talking to your computer. Instead of clicking
    buttons and icons, you type commands and read the responses. The program that interprets
    your commands is called a <strong>shell</strong> — on modern macOS, that shell is
    <strong>zsh</strong>. The terminal window is just the container; the shell is the brain.
  </p>

  <p class="prose">
    You learned how to open Terminal using Spotlight (<strong>Cmd + Space</strong>, type
    "Terminal", press Enter) or by navigating to Applications, Utilities, Terminal in Finder.
    You learned what each piece of the prompt means: your username, your computer's hostname,
    the tilde representing your home directory, and the <code>%</code> symbol that means
    "ready for input."
  </p>

  <p class="prose">
    You ran your first four commands: <code>echo</code> to print text, <code>whoami</code>
    to see your username, <code>date</code> to check the current date and time, and
    <code>clear</code> to wipe the screen. You also learned that commands are case-sensitive,
    that mistyped commands produce a "command not found" error, and that closing the terminal
    window ends the visual session (but not your command history). These four commands are
    your foundation. Every lesson that follows builds on the confidence you just earned by
    typing your first instruction and seeing the computer respond.
  </p>

  <p class="next"><strong>Next:</strong> <a href="/module-0/0-2-terminal-commands">0.2 — Terminal commands</a></p>
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
