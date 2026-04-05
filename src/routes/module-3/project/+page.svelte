<script lang="ts">
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
</style>
