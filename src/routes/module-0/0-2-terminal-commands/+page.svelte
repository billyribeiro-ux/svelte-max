<script lang="ts">
  import CodeCanvas from '$lib/components/CodeCanvas.svelte';

  /* ── Terminal commands ── */
  const cmdPwd = 'pwd';
  const cmdPwdOutput = 'pwd\n# Output: /Users/yourname';
  const cmdLs = 'ls';
  const cmdLsLa = 'ls -la';
  const cmdLsOutput = 'ls\n# Output: Desktop  Documents  Downloads  Music  Pictures';
  const cmdLsLaOutput = 'ls -la\n# Output:\n# total 0\n# drwxr-x---  15 yourname  staff   480 Apr  7 10:30 .\n# drwxr-xr-x   6 root      admin   192 Mar 15 09:00 ..\n# drwx------   5 yourname  staff   160 Apr  7 10:30 Desktop\n# drwx------  10 yourname  staff   320 Apr  6 14:22 Documents\n# drwx------   4 yourname  staff   128 Apr  5 09:15 Downloads';
  const cmdCd = 'cd Documents';
  const cmdCdUp = 'cd ..';
  const cmdCdHome = 'cd ~';
  const cmdCdSequence = '# Start in your home directory\npwd\n# Output: /Users/yourname\n\n# Move into Documents\ncd Documents\npwd\n# Output: /Users/yourname/Documents\n\n# Go back up one level\ncd ..\npwd\n# Output: /Users/yourname\n\n# Go straight home from anywhere\ncd ~\npwd\n# Output: /Users/yourname';
  const cmdMkdir = 'mkdir my-project';
  const cmdMkdirVerify = 'mkdir my-project\nls\n# You should now see "my-project" in the list';
  const cmdTouch = 'touch hello.txt';
  const cmdTouchVerify = 'cd my-project\ntouch hello.txt\nls\n# Output: hello.txt';
  const cmdRm = 'rm hello.txt';
  const cmdRmWarning = '# WARNING: rm deletes files PERMANENTLY.\n# There is no trash can. There is no undo.\n# The file is gone forever.\nrm hello.txt\nls\n# Output: (empty — the file is gone)';
  const cmdRmRfWarning = '# NEVER run this unless you are 100% sure:\n# rm -rf foldername\n#\n# -r means "recursive" — delete the folder AND everything inside it\n# -f means "force" — do not ask for confirmation\n#\n# rm -rf / would try to delete your ENTIRE hard drive.\n# Modern systems block this, but the point stands:\n# rm is the most dangerous command you will learn.';
  const cmdMv = 'mv old.txt new.txt';
  const cmdMvExample = '# Create a file\ntouch old.txt\nls\n# Output: old.txt\n\n# Rename it\nmv old.txt new.txt\nls\n# Output: new.txt\n\n# mv also MOVES files to a different folder:\nmv new.txt ../\n# This moves new.txt up one directory';
  const cmdCp = 'cp file.txt copy.txt';
  const cmdCpExample = '# Create a file\ntouch original.txt\n\n# Copy it\ncp original.txt backup.txt\nls\n# Output: backup.txt  original.txt\n\n# Now you have two identical files';

  /* ── Break-it experiments ── */
  const cmdBreak1 = 'cd nonexistent-folder\n# Output: cd: no such file or directory: nonexistent-folder';
  const cmdBreak2 = 'rm imaginary-file.txt\n# Output: rm: imaginary-file.txt: No such file or directory';
  const cmdBreak3 = 'mkdir my-project\n# If my-project already exists:\n# Output: mkdir: my-project: File exists';
  const cmdBreak4 = 'touch my file.txt\nls\n# Output: file.txt  my\n# It created TWO files: "my" and "file.txt"\n# Spaces separate arguments in the terminal!\n\n# To create a file with a space in the name:\ntouch "my file.txt"\nls\n# Output: my file.txt';

  /* ── Full code ── */
  const fullCode = '# ─── Lesson 0.2: Terminal commands ───\n' +
    '\n' +
    '# Where am I?\n' +
    'pwd\n' +
    '\n' +
    '# What is in this folder?\n' +
    'ls\n' +
    'ls -la\n' +
    '\n' +
    '# Move into a folder\n' +
    'cd Documents\n' +
    'pwd\n' +
    '\n' +
    '# Go back up one level\n' +
    'cd ..\n' +
    '\n' +
    '# Go home\n' +
    'cd ~\n' +
    '\n' +
    '# Create a folder\n' +
    'mkdir my-project\n' +
    'cd my-project\n' +
    '\n' +
    '# Create a file\n' +
    'touch hello.txt\n' +
    'ls\n' +
    '\n' +
    '# Delete a file (PERMANENT — no undo!)\n' +
    'rm hello.txt\n' +
    '\n' +
    '# Rename / move a file\n' +
    'touch old.txt\n' +
    'mv old.txt new.txt\n' +
    '\n' +
    '# Copy a file\n' +
    'cp new.txt copy.txt\n' +
    'ls\n' +
    '\n' +
    '# Clean up\n' +
    'rm new.txt copy.txt\n' +
    'cd ..\n' +
    'rm -rf my-project';
</script>

<section class="page">
  <h1>0.2 — Terminal commands</h1>

  <!-- Analogy -->
  <p class="analogy">
    Think of folders as rooms in a building. <code>pwd</code> tells you which room you are
    standing in. <code>ls</code> lists everything in the room — the furniture, the files, the
    other doors. <code>cd</code> moves you through a door into another room. Every command
    you learn in this lesson is like learning a new way to interact with the rooms in your
    building.
  </p>

  <p class="prose">
    In Lesson 0.1, you learned to talk to the terminal. Now you are going to learn the
    commands that let you navigate your computer's file system, create files and folders,
    and organize your work. These eight commands are the ones you will use every single day
    as a developer. Memorize them. Practice them. They will become second nature within a
    week.
  </p>

  <!-- pwd -->
  <h2>Step 1 — <code>pwd</code> (print working directory)</h2>

  <p class="prose">
    The first question you should always ask is: "Where am I?" The <code>pwd</code> command
    answers that question. It stands for <strong>print working directory</strong>. A
    "directory" is just a technical word for "folder." The "working" directory is the folder
    you are currently inside of. When you open a brand-new terminal window, you start in your
    <strong>home directory</strong>.
  </p>

  <CodeCanvas filename="Terminal" code={cmdPwdOutput} />

  <p class="prose">
    The output shows you the full path to where you are right now. On macOS, your home
    directory is always <code>/Users/yourname</code>. On Linux, it is
    <code>/home/yourname</code>. This path is like a street address — it tells you exactly
    where you are in the building. Get in the habit of running <code>pwd</code> whenever you
    feel lost. It costs nothing and immediately tells you where you are.
  </p>

  <!-- ls -->
  <h2>Step 2 — <code>ls</code> (list)</h2>

  <p class="prose">
    Now that you know which room you are in, you want to know what is in it. The
    <code>ls</code> command lists every file and folder in your current directory. It is the
    most-used command in the terminal.
  </p>

  <CodeCanvas filename="Terminal" code={cmdLsOutput} />

  <p class="prose">
    You should see your familiar folders: Desktop, Documents, Downloads, and others.
    These are the same folders you see in Finder — the terminal is just showing them as text
    instead of icons.
  </p>

  <p class="prose">
    For more detail, add the <code>-la</code> flags. Flags are options that modify a
    command's behavior. The <code>-l</code> flag means "long format" (show details like
    permissions, owner, size, and date). The <code>-a</code> flag means "all" (show hidden
    files too — files whose names start with a dot).
  </p>

  <CodeCanvas filename="Terminal" code={cmdLsLaOutput} />

  <p class="prose">
    Do not worry about understanding every column right now. The important thing is knowing
    that <code>ls</code> shows you what is here, and <code>ls -la</code> shows you
    <em>everything</em> that is here, with full details. You will use <code>ls</code>
    constantly to check what files exist before you work with them.
  </p>

  <!-- cd -->
  <h2>Step 3 — <code>cd</code> (change directory)</h2>

  <p class="prose">
    To move from one folder to another, you use <code>cd</code> followed by the name of the
    folder you want to enter. This is like walking through a door into the next room.
  </p>

  <CodeCanvas filename="Terminal" code={cmdCdSequence} />

  <p class="prose">
    Three patterns to memorize:
  </p>

  <p class="prose">
    <strong><code>cd foldername</code></strong> — Move into a folder that is inside your
    current directory. This is like walking forward through a door.
  </p>

  <p class="prose">
    <strong><code>cd ..</code></strong> — Move up one level to the parent folder. The two dots
    <code>..</code> always mean "the folder above me." This is like walking backward through
    the door you came in.
  </p>

  <p class="prose">
    <strong><code>cd ~</code></strong> — Jump directly to your home directory from anywhere.
    The tilde <code>~</code> is a shortcut for <code>/Users/yourname</code>. No matter how
    deep you have navigated, <code>cd ~</code> takes you home instantly.
  </p>

  <!-- mkdir -->
  <h2>Step 4 — <code>mkdir</code> (make directory)</h2>

  <p class="prose">
    To create a new folder, use <code>mkdir</code> followed by the name you want. The name
    should not contain spaces (use hyphens instead). This is how you create project folders,
    organize your work, and set up your coding environment.
  </p>

  <CodeCanvas filename="Terminal" code={cmdMkdirVerify} />

  <p class="prose">
    The folder is created instantly. There is no confirmation message — the terminal is quiet
    when things go well. If you want to confirm it worked, just run <code>ls</code>
    afterward. This "silence is success" pattern is a Unix philosophy: the terminal only
    speaks up when something goes wrong.
  </p>

  <!-- touch -->
  <h2>Step 5 — <code>touch</code> (create a file)</h2>

  <p class="prose">
    The <code>touch</code> command creates a new, empty file. It is the simplest way to make
    a file from the terminal. The file will have zero bytes — it exists, but it is empty.
    You will fill it with content later using a code editor.
  </p>

  <CodeCanvas filename="Terminal" code={cmdTouchVerify} />

  <p class="prose">
    We first <code>cd</code> into our project folder, then create the file inside it. Always
    know where you are (<code>pwd</code>) before creating files, or they will end up in the
    wrong place.
  </p>

  <!-- rm -->
  <h2>Step 6 — <code>rm</code> (remove)</h2>

  <p class="prose">
    The <code>rm</code> command deletes a file. This is the most dangerous command you will
    learn in this entire course. Read the warning below carefully.
  </p>

  <CodeCanvas filename="Terminal" code={cmdRmWarning} />

  <p class="prose">
    There is no trash can. There is no "are you sure?" dialog. There is no Cmd + Z to undo.
    When you <code>rm</code> a file, it is gone forever. Treat this command with respect.
    Always double-check the filename before pressing Enter.
  </p>

  <CodeCanvas filename="Terminal — danger zone" code={cmdRmRfWarning} />

  <p class="prose">
    The <code>rm -rf</code> variant is the nuclear option. It deletes a folder and
    everything inside it, recursively, without asking permission. You will need it
    occasionally (like deleting <code>node_modules</code>), but always pause and read the
    command twice before running it. One wrong path and you could delete hours of work.
  </p>

  <!-- mv -->
  <h2>Step 7 — <code>mv</code> (move / rename)</h2>

  <p class="prose">
    The <code>mv</code> command does double duty: it both <strong>renames</strong> files and
    <strong>moves</strong> them to different locations. The syntax is always
    <code>mv source destination</code>.
  </p>

  <CodeCanvas filename="Terminal" code={cmdMvExample} />

  <p class="prose">
    If the destination is a filename in the same folder, <code>mv</code> renames the file.
    If the destination is a different folder, <code>mv</code> moves the file there. The
    original is gone — <code>mv</code> does not make a copy. Think of it as picking up a
    file and putting it down somewhere else.
  </p>

  <!-- cp -->
  <h2>Step 8 — <code>cp</code> (copy)</h2>

  <p class="prose">
    The <code>cp</code> command creates a duplicate of a file. Unlike <code>mv</code>, the
    original stays where it is. You end up with two identical files.
  </p>

  <CodeCanvas filename="Terminal" code={cmdCpExample} />

  <p class="prose">
    To copy an entire folder (including everything inside it), add the <code>-r</code> flag:
    <code>cp -r my-folder my-folder-backup</code>. The <code>-r</code> stands for
    "recursive," meaning "go into every subfolder and copy that too."
  </p>

  <!-- Break it on purpose -->
  <h2>Break it on purpose</h2>

  <p class="prose">
    Time to break things. These experiments will teach you what common error messages look
    like so you will recognize them instantly in the future.
  </p>

  <ol class="experiments">
    <li>
      <strong><code>cd</code> into a folder that does not exist.</strong> Type
      <code>cd nonexistent-folder</code> and press Enter. The terminal says
      <code>no such file or directory</code>. This error means exactly what it says — the
      folder you asked for is not there. Check your spelling, check your location with
      <code>pwd</code>, and try again.
    </li>
    <li>
      <strong><code>rm</code> a file that does not exist.</strong> Type
      <code>rm imaginary-file.txt</code>. Same error: <code>No such file or directory</code>.
      The terminal cannot delete something that is not there. This is actually good — it
      means <code>rm</code> will not silently do nothing. It tells you when something is
      wrong.
    </li>
    <li>
      <strong><code>mkdir</code> a name that already exists.</strong> Run
      <code>mkdir my-project</code> twice. The second time, you get
      <code>File exists</code>. The terminal will not overwrite an existing folder. You have
      to delete it first or choose a different name.
    </li>
    <li>
      <strong><code>touch</code> a filename with spaces.</strong> Type
      <code>touch my file.txt</code> (no quotes). Then run <code>ls</code>. You will see
      two files: <code>my</code> and <code>file.txt</code>. The terminal interpreted the
      space as a separator between two arguments. To create a file with a space in the name,
      wrap it in quotes: <code>touch "my file.txt"</code>. Better yet, avoid spaces entirely
      — use hyphens (<code>my-file.txt</code>) or underscores (<code>my_file.txt</code>).
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
    You now know the eight commands that form the backbone of every developer's daily work.
    <code>pwd</code> tells you where you are. <code>ls</code> shows you what is in the
    current folder. <code>cd</code> moves you between folders. These three "navigation"
    commands are the ones you will type most often — probably dozens of times per day.
  </p>

  <p class="prose">
    <code>mkdir</code> creates folders. <code>touch</code> creates empty files. <code>rm</code>
    deletes files permanently (with no undo). <code>mv</code> renames or moves files.
    <code>cp</code> copies files. These five "action" commands let you organize your
    projects entirely from the terminal, without ever opening Finder.
  </p>

  <p class="prose">
    You also learned that the terminal is case-sensitive, that spaces in filenames cause
    problems unless you use quotes, and that "silence is success" — the terminal only speaks
    up when something goes wrong. These patterns will repeat throughout your entire
    programming journey. The more comfortable you get with these eight commands, the faster
    everything else will go.
  </p>

  <p class="next"><strong>Next:</strong> <a href="/module-0/0-3-paths-and-navigation">0.3 — Paths and navigation</a></p>
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
