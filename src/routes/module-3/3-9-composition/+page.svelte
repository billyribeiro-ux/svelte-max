<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Avatar from '$lib/components/Avatar.svelte';\n" +
		"  import Badge from '$lib/components/Badge.svelte';\n" +
		"  import Card from '$lib/components/Card.svelte';\n" +
		"\n" +
		"  interface Notification {\n" +
		"    id: string;\n" +
		"    name: string;\n" +
		"    avatar: string | null;\n" +
		"    action: 'commented' | 'mentioned' | 'invited';\n" +
		"    body: string;\n" +
		"    time: string;\n" +
		"  }\n" +
		"\n" +
		"  const notifications: Notification[] = [\n" +
		"    {\n" +
		"      id: 'n1',\n" +
		"      name: 'Ada Lovelace',\n" +
		"      avatar: null,\n" +
		"      action: 'commented',\n" +
		"      body: 'Left a note on the design doc for the new onboarding flow.',\n" +
		"      time: '2m ago'\n" +
		"    },\n" +
		"    {\n" +
		"      id: 'n2',\n" +
		"      name: 'Grace Hopper',\n" +
		"      avatar: null,\n" +
		"      action: 'mentioned',\n" +
		"      body: 'Mentioned you in the compiler team standup recap.',\n" +
		"      time: '18m ago'\n" +
		"    },\n" +
		"    {\n" +
		"      id: 'n3',\n" +
		"      name: 'Linus Torvalds',\n" +
		"      avatar: null,\n" +
		"      action: 'invited',\n" +
		"      body: 'Invited you to the kernel review channel.',\n" +
		"      time: '1h ago'\n" +
		"    }\n" +
		"  ];\n" +
		"\n" +
		"  function toneFor(action: Notification['action']): 'brand' | 'success' | 'warning' {\n" +
		"    if (action === 'mentioned') return 'brand';\n" +
		"    if (action === 'invited') return 'success';\n" +
		"    return 'warning';\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e3.9 — Composition\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e You don't build one mega-component — you build small, typed primitives\n" +
		"    (\u003ccode\u003eAvatar\u003c/code\u003e, \u003ccode\u003eBadge\u003c/code\u003e, \u003ccode\u003eCard\u003c/code\u003e) and compose them. Think about\n" +
		"    \u003cem\u003ewhat\u003c/em\u003e the piece represents, not \u003cem\u003ehow many\u003c/em\u003e variants it supports. Composition is\n" +
		"    how you reuse code without inheritance or prop explosion.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cul class=\"feed\"\u003e\n" +
		"      {#each notifications as n (n.id)}\n" +
		"        \u003cli\u003e\n" +
		"          \u003cCard\u003e\n" +
		"            {#snippet children()}\n" +
		"              \u003cdiv class=\"notification\"\u003e\n" +
		"                \u003cAvatar src={n.avatar} name={n.name} size=\"md\" /\u003e\n" +
		"                \u003cdiv class=\"content\"\u003e\n" +
		"                  \u003cdiv class=\"row\"\u003e\n" +
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
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eCompose small primitives into rich UI instead of adding variants.\u003c/li\u003e\n" +
		"    \u003cli\u003eTyped data drives typed props — the compiler catches mismatches.\u003c/li\u003e\n" +
		"    \u003cli\u003eDerived values (like badge tone) are computed from the source data.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
