<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Card from '$lib/components/Card.svelte';

  interface Notification {
    id: string;
    name: string;
    avatar: string | null;
    action: 'commented' | 'mentioned' | 'invited';
    body: string;
    time: string;
  }

  const notifications: Notification[] = [
    {
      id: 'n1',
      name: 'Ada Lovelace',
      avatar: null,
      action: 'commented',
      body: 'Left a note on the design doc for the new onboarding flow.',
      time: '2m ago'
    },
    {
      id: 'n2',
      name: 'Grace Hopper',
      avatar: null,
      action: 'mentioned',
      body: 'Mentioned you in the compiler team standup recap.',
      time: '18m ago'
    },
    {
      id: 'n3',
      name: 'Linus Torvalds',
      avatar: null,
      action: 'invited',
      body: 'Invited you to the kernel review channel.',
      time: '1h ago'
    }
  ];

  function toneFor(action: Notification['action']): 'brand' | 'success' | 'warning' {
    if (action === 'mentioned') return 'brand';
    if (action === 'invited') return 'success';
    return 'warning';
  }
</script>

<section class="page">
  <h1>3.9 — Composition</h1>
  <p class="concept">
    <strong>Concept.</strong> You don't build one mega-component — you build small, typed primitives
    (<code>Avatar</code>, <code>Badge</code>, <code>Card</code>) and compose them. Think about
    <em>what</em> the piece represents, not <em>how many</em> variants it supports. Composition is
    how you reuse code without inheritance or prop explosion.
  </p>

  <div class="build">
    <ul class="feed">
      {#each notifications as n (n.id)}
        <li>
          <Card>
            {#snippet children()}
              <div class="notification">
                <Avatar src={n.avatar} name={n.name} size="md" />
                <div class="content">
                  <div class="row">
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
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Compose small primitives into rich UI instead of adding variants.</li>
    <li>Typed data drives typed props — the compiler catches mismatches.</li>
    <li>Derived values (like badge tone) are computed from the source data.</li>
  </ul>
</section>

<style>
  .concept {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    max-inline-size: 65ch;
    line-height: 1.6;
    margin: 0;
  }
  .concept strong { color: var(--color-text); }

  .build {
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

  .row {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    flex-wrap: wrap;
  }

  .body {
    margin: 0;
    color: var(--color-text);
    font-size: var(--text-sm);
  }

  .time {
    color: var(--color-text-muted);
    font-size: var(--text-xs);
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--color-surface-2);
    padding: 0 var(--space-xs);
    border-radius: var(--radius-xs);
  }

  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

  ul:not(.feed) {
    list-style: disc;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding-inline-start: var(--space-lg);
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .feed { max-inline-size: 40rem; }
  }
</style>
