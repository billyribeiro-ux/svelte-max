<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import Button from '$lib/components/Button.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Avatar from '$lib/components/Avatar.svelte';
  import Card from '$lib/components/Card.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import type { Profile } from '$lib/types/profile';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
  type Size = 'sm' | 'md' | 'lg';
  type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'error';

  const variants: Variant[] = ['primary', 'secondary', 'ghost', 'danger'];
  const sizes: Size[] = ['sm', 'md', 'lg'];
  const tones: Tone[] = ['neutral', 'brand', 'success', 'warning', 'error'];

  const adaProfile: Profile = {
    name: 'Ada Lovelace',
    role: 'Analytical engineer',
    location: 'London, UK',
    bio: 'First programmer, relentless optimizer. Notes on Babbage\u2019s engine remain required reading.',
    yearsExperience: 12,
    available: true,
    skills: ['Algorithms', 'Mathematics', 'Technical writing'],
    stats: { projects: 42, clients: 8, commits: 1620 }
  };

  let name = $state('Ada Lovelace');
  let email = $state('ada@analytical.engine');

  let modalOpen = $state(false);

  interface Notification {
    id: string;
    name: string;
    action: 'commented' | 'mentioned' | 'invited';
    body: string;
    time: string;
  }

  const notifications: Notification[] = [
    { id: 'n1', name: 'Grace Hopper', action: 'commented', body: 'Left feedback on the compiler PR.', time: '2m ago' },
    { id: 'n2', name: 'Alan Turing',  action: 'mentioned', body: 'Mentioned you in the machine learning thread.', time: '14m ago' },
    { id: 'n3', name: 'Linus Torvalds', action: 'invited', body: 'Invited you to review a kernel patch.', time: '1h ago' }
  ];

  function toneFor(action: Notification['action']): Tone {
    if (action === 'mentioned') return 'brand';
    if (action === 'invited') return 'success';
    return 'warning';
  }

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Button from '$lib/components/Button.svelte';\n" +
		"  import Badge from '$lib/components/Badge.svelte';\n" +
		"  import Avatar from '$lib/components/Avatar.svelte';\n" +
		"  import Card from '$lib/components/Card.svelte';\n" +
		"  import TextField from '$lib/components/TextField.svelte';\n" +
		"  import Modal from '$lib/components/Modal.svelte';\n" +
		"  import ProfileCard from '$lib/components/ProfileCard.svelte';\n" +
		"  import type { Profile } from '$lib/types/profile';\n" +
		"\n" +
		"  type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';\n" +
		"  type Size = 'sm' | 'md' | 'lg';\n" +
		"  type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'error';\n" +
		"\n" +
		"  const variants: Variant[] = ['primary', 'secondary', 'ghost', 'danger'];\n" +
		"  const sizes: Size[] = ['sm', 'md', 'lg'];\n" +
		"  const tones: Tone[] = ['neutral', 'brand', 'success', 'warning', 'error'];\n" +
		"\n" +
		"  const adaProfile: Profile = {\n" +
		"    name: 'Ada Lovelace',\n" +
		"    role: 'Analytical engineer',\n" +
		"    location: 'London, UK',\n" +
		"    bio: 'First programmer, relentless optimizer. Notes on Babbage\\u2019s engine remain required reading.',\n" +
		"    yearsExperience: 12,\n" +
		"    available: true,\n" +
		"    skills: ['Algorithms', 'Mathematics', 'Technical writing'],\n" +
		"    stats: { projects: 42, clients: 8, commits: 1620 }\n" +
		"  };\n" +
		"\n" +
		"  let name = $state('Ada Lovelace');\n" +
		"  let email = $state('ada@analytical.engine');\n" +
		"\n" +
		"  let modalOpen = $state(false);\n" +
		"\n" +
		"  interface Notification {\n" +
		"    id: string;\n" +
		"    name: string;\n" +
		"    action: 'commented' | 'mentioned' | 'invited';\n" +
		"    body: string;\n" +
		"    time: string;\n" +
		"  }\n" +
		"\n" +
		"  const notifications: Notification[] = [\n" +
		"    { id: 'n1', name: 'Grace Hopper', action: 'commented', body: 'Left feedback on the compiler PR.', time: '2m ago' },\n" +
		"    { id: 'n2', name: 'Alan Turing',  action: 'mentioned', body: 'Mentioned you in the machine learning thread.', time: '14m ago' },\n" +
		"    { id: 'n3', name: 'Linus Torvalds', action: 'invited', body: 'Invited you to review a kernel patch.', time: '1h ago' }\n" +
		"  ];\n" +
		"\n" +
		"  function toneFor(action: Notification['action']): Tone {\n" +
		"    if (action === 'mentioned') return 'brand';\n" +
		"    if (action === 'invited') return 'success';\n" +
		"    return 'warning';\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003c!-- Per-page OKLCH personality pattern — see Module 6.9. --\u003e\n" +
		"\u003csection class=\"page library\"\u003e\n" +
		"  \u003ch1\u003eModule 3 — UI Component Library Part 1\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eGallery.\u003c/strong\u003e Every component built in Module 3 composed onto a single page. Each\n" +
		"    section demonstrates real usage — interactive state, real forms, real snippets, real modal.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eButtons\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"buttons-grid\"\u003e\n" +
		"      {#each variants as variant}\n" +
		"        {#each sizes as size}\n" +
		"          \u003cButton {variant} {size}\u003e{variant} / {size}\u003c/Button\u003e\n" +
		"        {/each}\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cdiv class=\"row\"\u003e\n" +
		"      \u003cButton variant=\"primary\" disabled\u003eDisabled primary\u003c/Button\u003e\n" +
		"      \u003cButton variant=\"secondary\" disabled\u003eDisabled secondary\u003c/Button\u003e\n" +
		"      \u003cButton variant=\"ghost\" disabled\u003eDisabled ghost\u003c/Button\u003e\n" +
		"      \u003cButton variant=\"danger\" disabled\u003eDisabled danger\u003c/Button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eBadges\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"row\"\u003e\n" +
		"      {#each tones as tone}\n" +
		"        \u003cBadge {tone}\u003e{tone}\u003c/Badge\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cdiv class=\"row\"\u003e\n" +
		"      {#each tones as tone}\n" +
		"        \u003cBadge {tone} rounded\u003e{tone}\u003c/Badge\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eAvatars\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"row avatars\"\u003e\n" +
		"      \u003cAvatar name=\"Ada Lovelace\" src={null} size=\"sm\" /\u003e\n" +
		"      \u003cAvatar name=\"Grace Hopper\" src={null} size=\"md\" /\u003e\n" +
		"      \u003cAvatar name=\"Alan Turing\" src={null} size=\"lg\" /\u003e\n" +
		"      \u003cAvatar name=\"Linus Torvalds\" src={null} size=\"md\" /\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eForm fields\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"form\"\u003e\n" +
		"      \u003cTextField label=\"Name\" bind:value={name} placeholder=\"Your name\" /\u003e\n" +
		"      \u003cTextField label=\"Email\" type=\"email\" bind:value={email} placeholder=\"you@example.com\" /\u003e\n" +
		"      \u003cdiv class=\"live\"\u003e\n" +
		"        \u003cspan\u003eLive name: \u003ccode\u003e{name}\u003c/code\u003e\u003c/span\u003e\n" +
		"        \u003cspan\u003eLive email: \u003ccode\u003e{email}\u003c/code\u003e\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eCards\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"cards-grid\"\u003e\n" +
		"      \u003cCard\u003e\n" +
		"        {#snippet children()}\n" +
		"          \u003cp\u003eBody-only card. The default children snippet receives arbitrary markup.\u003c/p\u003e\n" +
		"        {/snippet}\n" +
		"      \u003c/Card\u003e\n" +
		"\n" +
		"      \u003cCard\u003e\n" +
		"        {#snippet header()}\u003ch3\u003eWith header\u003c/h3\u003e{/snippet}\n" +
		"        {#snippet children()}\n" +
		"          \u003cp\u003eThis card passes a named \u003ccode\u003eheader\u003c/code\u003e snippet in addition to children.\u003c/p\u003e\n" +
		"        {/snippet}\n" +
		"      \u003c/Card\u003e\n" +
		"\n" +
		"      \u003cCard elevated\u003e\n" +
		"        {#snippet header()}\u003ch3\u003eFull card\u003c/h3\u003e{/snippet}\n" +
		"        {#snippet children()}\n" +
		"          \u003cp\u003eHeader + body + footer snippets, plus \u003ccode\u003eelevated\u003c/code\u003e for a stronger shadow.\u003c/p\u003e\n" +
		"        {/snippet}\n" +
		"        {#snippet footer()}\n" +
		"          \u003cspan\u003eLast updated · just now\u003c/span\u003e\n" +
		"        {/snippet}\n" +
		"      \u003c/Card\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eComposition: Notifications\u003c/h2\u003e\n" +
		"    \u003cul class=\"feed\"\u003e\n" +
		"      {#each notifications as n (n.id)}\n" +
		"        \u003cli\u003e\n" +
		"          \u003cCard\u003e\n" +
		"            {#snippet children()}\n" +
		"              \u003cdiv class=\"notification\"\u003e\n" +
		"                \u003cAvatar name={n.name} src={null} size=\"md\" /\u003e\n" +
		"                \u003cdiv class=\"content\"\u003e\n" +
		"                  \u003cdiv class=\"head\"\u003e\n" +
		"                    \u003cstrong\u003e{n.name}\u003c/strong\u003e\n" +
		"                    \u003cBadge tone={toneFor(n.action)}\u003e{n.action}\u003c/Badge\u003e\n" +
		"                  \u003c/div\u003e\n" +
		"                  \u003cp class=\"body\"\u003e{n.body}\u003c/p\u003e\n" +
		"                  \u003cspan class=\"time\"\u003e{n.time}\u003c/span\u003e\n" +
		"                \u003c/div\u003e\n" +
		"              \u003c/div\u003e\n" +
		"            {/snippet}\n" +
		"          \u003c/Card\u003e\n" +
		"        \u003c/li\u003e\n" +
		"      {/each}\n" +
		"    \u003c/ul\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eProfile card\u003c/h2\u003e\n" +
		"    \u003cProfileCard profile={adaProfile} /\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003csection class=\"group\"\u003e\n" +
		"    \u003ch2\u003eModal\u003c/h2\u003e\n" +
		"    \u003cButton variant=\"primary\" onclick={() =\u003e (modalOpen = true)}\u003eOpen modal\u003c/Button\u003e\n" +
		"    \u003cModal bind:open={modalOpen} title=\"Component library\"\u003e\n" +
		"      {#snippet children()}\n" +
		"        \u003cp\u003eYou are looking at a \u003ccode\u003e&lt;dialog&gt;\u003c/code\u003e element rendered via a typed Svelte 5 component.\u003c/p\u003e\n" +
		"        \u003cp\u003eClose with the × button, the Escape key, or by clicking the backdrop.\u003c/p\u003e\n" +
		"        \u003cButton variant=\"secondary\" onclick={() =\u003e (modalOpen = false)}\u003eDismiss\u003c/Button\u003e\n" +
		"      {/snippet}\n" +
		"    \u003c/Modal\u003e\n" +
		"  \u003c/section\u003e\n" +
		"\n" +
		"  \u003cfooter class=\"built-with\"\u003e\n" +
		"    \u003cstrong\u003eBuilt with:\u003c/strong\u003e Button, Badge, Avatar, Card, TextField, Modal, ProfileCard.\n" +
		"  \u003c/footer\u003e\n" +
		"\u003c/section\u003e";
</script>

<!-- Per-page OKLCH personality pattern — see Module 6.9. -->
<section class="page library">
  <h1>Module 3 — UI Component Library Part 1</h1>
  <p class="concept">
    <strong>Gallery.</strong> Every component built in Module 3 composed onto a single page. Each
    section demonstrates real usage — interactive state, real forms, real snippets, real modal.
  </p>

  <section class="group">
    <h2>Buttons</h2>
    <div class="buttons-grid">
      {#each variants as variant}
        {#each sizes as size}
          <Button {variant} {size}>{variant} / {size}</Button>
        {/each}
      {/each}
    </div>
    <div class="row">
      <Button variant="primary" disabled>Disabled primary</Button>
      <Button variant="secondary" disabled>Disabled secondary</Button>
      <Button variant="ghost" disabled>Disabled ghost</Button>
      <Button variant="danger" disabled>Disabled danger</Button>
    </div>
  </section>

  <section class="group">
    <h2>Badges</h2>
    <div class="row">
      {#each tones as tone}
        <Badge {tone}>{tone}</Badge>
      {/each}
    </div>
    <div class="row">
      {#each tones as tone}
        <Badge {tone} rounded>{tone}</Badge>
      {/each}
    </div>
  </section>

  <section class="group">
    <h2>Avatars</h2>
    <div class="row avatars">
      <Avatar name="Ada Lovelace" src={null} size="sm" />
      <Avatar name="Grace Hopper" src={null} size="md" />
      <Avatar name="Alan Turing" src={null} size="lg" />
      <Avatar name="Linus Torvalds" src={null} size="md" />
    </div>
  </section>

  <section class="group">
    <h2>Form fields</h2>
    <div class="form">
      <TextField label="Name" bind:value={name} placeholder="Your name" />
      <TextField label="Email" type="email" bind:value={email} placeholder="you@example.com" />
      <div class="live">
        <span>Live name: <code>{name}</code></span>
        <span>Live email: <code>{email}</code></span>
      </div>
    </div>
  </section>

  <section class="group">
    <h2>Cards</h2>
    <div class="cards-grid">
      <Card>
        {#snippet children()}
          <p>Body-only card. The default children snippet receives arbitrary markup.</p>
        {/snippet}
      </Card>

      <Card>
        {#snippet header()}<h3>With header</h3>{/snippet}
        {#snippet children()}
          <p>This card passes a named <code>header</code> snippet in addition to children.</p>
        {/snippet}
      </Card>

      <Card elevated>
        {#snippet header()}<h3>Full card</h3>{/snippet}
        {#snippet children()}
          <p>Header + body + footer snippets, plus <code>elevated</code> for a stronger shadow.</p>
        {/snippet}
        {#snippet footer()}
          <span>Last updated · just now</span>
        {/snippet}
      </Card>
    </div>
  </section>

  <section class="group">
    <h2>Composition: Notifications</h2>
    <ul class="feed">
      {#each notifications as n (n.id)}
        <li>
          <Card>
            {#snippet children()}
              <div class="notification">
                <Avatar name={n.name} src={null} size="md" />
                <div class="content">
                  <div class="head">
                    <strong>{n.name}</strong>
                    <Badge tone={toneFor(n.action)}>{n.action}</Badge>
                  </div>
                  <p class="body">{n.body}</p>
                  <span class="time">{n.time}</span>
                </div>
              </div>
            {/snippet}
          </Card>
        </li>
      {/each}
    </ul>
  </section>

  <section class="group">
    <h2>Profile card</h2>
    <ProfileCard profile={adaProfile} />
  </section>

  <section class="group">
    <h2>Modal</h2>
    <Button variant="primary" onclick={() => (modalOpen = true)}>Open modal</Button>
    <Modal bind:open={modalOpen} title="Component library">
      {#snippet children()}
        <p>You are looking at a <code>&lt;dialog&gt;</code> element rendered via a typed Svelte 5 component.</p>
        <p>Close with the × button, the Escape key, or by clicking the backdrop.</p>
        <Button variant="secondary" onclick={() => (modalOpen = false)}>Dismiss</Button>
      {/snippet}
    </Modal>
  </section>

  <footer class="built-with">
    <strong>Built with:</strong> Button, Badge, Avatar, Card, TextField, Modal, ProfileCard.
  </footer>
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
  .library {
    --color-brand: oklch(64% 0.16 220);
    --color-brand-dim: oklch(54% 0.13 220);
  }

  .concept {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-inline-size: 65ch;
    line-height: 1.6;
    margin: 0;
  }
  .concept strong { color: var(--color-text); }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
    margin-block: var(--space-lg);
  }

  .group h2 {
    margin: 0;
    font-size: var(--text-xl);
    color: var(--color-text);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    align-items: center;
  }

  .avatars {
    align-items: flex-end;
  }

  .buttons-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .live {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }

  .feed {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .notification {
    display: flex;
    gap: var(--space-md);
    align-items: flex-start;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    flex: 1;
    min-inline-size: 0;
  }

  .head {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    flex-wrap: wrap;
  }

  .body { margin: 0; font-size: var(--text-sm); color: var(--color-text); }
  .time { color: var(--color-text-muted); font-size: var(--text-xs); }

  .built-with {
    margin-block-start: var(--space-xl);
    padding: var(--space-md) var(--space-lg);
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }
  .built-with strong { color: var(--color-text); }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-2);
    padding: 0 var(--space-xs);
    border-radius: var(--radius-xs);
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-hero); }
    .buttons-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .cards-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .feed { max-inline-size: 48rem; }
    .live { flex-direction: row; gap: var(--space-lg); }
  }

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
