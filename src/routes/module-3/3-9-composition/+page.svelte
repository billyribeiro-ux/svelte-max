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

  <h2>Break it on purpose</h2>
  <p class="prose">These experiments illustrate the tradeoffs of composition strategies and where each approach shines.</p>
  <ol class="experiments">
    <li><strong>Nest five components deep and pass a prop through each level.</strong> This is "prop drilling" — every intermediate component must accept and forward the prop even if it does not use it. The pain of drilling is the signal that you need a different pattern, like context (covered in Module 7).</li>
    <li><strong>Replace the drilled prop with Svelte's <code>setContext</code>/<code>getContext</code> (preview of Module 7).</strong> The intermediate components no longer need to know about the prop at all. Context lets a parent provide a value that any descendant can consume directly, cutting through the component tree.</li>
    <li><strong>Compose with snippets to avoid wrapper-div nesting.</strong> Instead of wrapping each piece in its own component that adds a <code>&lt;div&gt;</code>, pass snippets into a layout component. The layout decides the structure; the caller decides the content — no extra DOM nodes.</li>
    <li><strong>Create a component that renders different snippets based on state.</strong> Use <code>{`{#if}`}</code> to choose between two snippet props at render time. This is dynamic composition — the same component shell displays entirely different content depending on the data it receives.</li>
  </ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h2>What you learned</h2>
  <p class="prose">Composition is the practice of building complex interfaces from small, focused components rather than creating one monolithic component with dozens of props. Instead of adding a <code>variant</code> for every visual difference, you combine primitives like <code>Avatar</code>, <code>Badge</code>, and <code>Card</code> — each responsible for one thing — into richer arrangements.</p>
  <p class="prose">Typed data drives the entire composition chain. Each component declares the exact props it needs via its interface, and the compiler catches mismatches at every boundary. Derived values like badge tone are computed from the source data using plain functions, keeping the template declarative and the logic testable.</p>
  <p class="prose">Snippets take composition further by letting you inject arbitrary markup into a component's layout without creating new wrapper components. When combined with context (Module 7), this pattern scales to deeply nested trees without prop drilling. The result is a codebase where each component does one job well and the page assembles them like building blocks.</p>
  <p class="next">Next lesson: <a href="/module-3/3-10-css-custom-props">3.10 — CSS custom properties</a></p>
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

  @media (min-inline-size: 768px) {
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

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
