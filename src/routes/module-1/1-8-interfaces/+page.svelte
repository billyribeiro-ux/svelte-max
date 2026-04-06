<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	// ── Demo data ───────────────────────────────────────────────────────
	interface User {
		name: string;
		role: string;
		avatar: string;
		bio: string;
		tags?: readonly string[];
	}

	const user: User = {
		name: 'Mira Kovalenko',
		role: 'Senior Product Designer',
		avatar: 'MK',
		bio: 'Designs calm, high-density interfaces for developer tools. Previously shipped the onboarding surface at a YC-backed devtool used by 40k engineers a month.',
		tags: ['Design Systems', 'Figma', 'Prototyping', 'A11y', 'Motion']
	};

	// ── CodeCanvas strings ──────────────────────────────────────────────
	const fullFileCode: string = `\u003cscript lang="ts"\u003e
  // An interface describes the SHAPE of an object.
  // Think of it as a form template that lists every field
  // and what type of answer goes in each field.
  interface User {
    name: string;       // required — must be a string
    role: string;       // required — job title
    avatar: string;     // required — initials for the avatar circle
    bio: string;        // required — short biography
    tags?: readonly string[];  // OPTIONAL — the ? means it might not exist
  }

  // Create an object that matches the User shape.
  // If you miss a required field or use the wrong type,
  // TypeScript will show a red error BEFORE you even run the code.
  const user: User = {
    name: 'Mira Kovalenko',
    role: 'Senior Product Designer',
    avatar: 'MK',
    bio: 'Designs calm, high-density interfaces for developer tools.',
    tags: ['Design Systems', 'Figma', 'Prototyping', 'A11y', 'Motion']
  };
\u003c/script\u003e

<!-- Profile card that renders the typed User object -->
<article class="profile">
  <div class="avatar" aria-hidden="true">{user.avatar}</div>
  <div class="content">
    <h2>{user.name}</h2>
    <p class="role">{user.role}</p>
    <p class="bio">{user.bio}</p>

    <!-- Because tags is optional (?), we MUST check if it exists first.
         TypeScript enforces this — you cannot skip the #if check. -->
    {#if user.tags}
      <ul class="tags">
        {#each user.tags as tag (tag)}
          <li class="tag">{tag}</li>
        {/each}
      </ul>
    {/if}
  </div>
</article>`;

	const stepInterfaceCode: string = `// An interface is like a form template.
// It lists every field and what type of answer goes in each.

interface User {
  name: string;       // "name" must be text (a string)
  role: string;       // "role" must be text
  avatar: string;     // "avatar" must be text (initials)
  bio: string;        // "bio" must be text
  tags?: readonly string[];  // "tags" is OPTIONAL (the ?)
                             // "readonly" means you cannot add/remove items
                             // "string[]" means it is an array of strings
}`;

	const stepObjectCode: string = `// Create an object that matches the interface shape.
// TypeScript checks every field at compile time.
const user: User = {
  name: 'Mira Kovalenko',        // string - correct
  role: 'Senior Product Designer', // string - correct
  avatar: 'MK',                   // string - correct
  bio: 'Designs calm interfaces.', // string - correct
  tags: ['Figma', 'A11y']         // readonly string[] - correct
  // "tags" is optional, so we could also leave it out entirely.
};`;

	const stepOptionalCode: string = `// Because tags is optional, it might be undefined.
// TypeScript FORCES you to check before using it.

// WRONG — TypeScript error: "user.tags" might be undefined
{#each user.tags as tag}
  <li>{tag}</li>
{/each}

// RIGHT — wrap in an #if check first
{#if user.tags}
  {#each user.tags as tag (tag)}
    <li>{tag}</li>
  {/each}
{/if}`;

	const stepRenderCode: string = `<!-- Use the typed object in Svelte markup -->
<article class="profile">
  <!-- TypeScript knows user.avatar is a string -->
  <div class="avatar">{user.avatar}</div>

  <h2>{user.name}</h2>
  <p>{user.role}</p>
  <p>{user.bio}</p>

  <!-- Optional field: must check before rendering -->
  {#if user.tags}
    <ul>
      {#each user.tags as tag (tag)}
        <li>{tag}</li>
      {/each}
    </ul>
  {/if}
</article>`;

	const wrongCode: string = `// WRONG — no interface, no safety
const user = {
  name: 'Mira',
  role: 42,            // Oops! role should be a string, not a number
  avatar: 'MK',
  bio: 'Designer',
  tgas: ['Figma']      // Typo! "tgas" instead of "tags" — no error shown
};
// Without an interface, TypeScript cannot catch these mistakes.`;

	const rightCode: string = `// RIGHT — interface catches every mistake immediately
interface User {
  name: string;
  role: string;        // TypeScript: "42 is not assignable to string"
  avatar: string;
  bio: string;
  tags?: readonly string[];
}

const user: User = {
  name: 'Mira',
  role: 42,            // RED ERROR: Type 'number' is not assignable to 'string'
  avatar: 'MK',
  bio: 'Designer',
  tgas: ['Figma']      // RED ERROR: 'tgas' does not exist on type 'User'
};`;

	// ── Practice challenge ──────────────────────────────────────────────
	const practiceChallenge: string =
		'Add a "website?: string" optional field to the User interface. Then render it as a link if present, using an #if check.';

	const practiceStarter: string = `interface User {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  tags?: readonly string[];
  /* Add the website field here */
}

const user: User = {
  name: 'Mira Kovalenko',
  role: 'Senior Product Designer',
  avatar: 'MK',
  bio: 'Designs calm interfaces.',
  website: 'https://mira.dev'
};

<!-- Render the website as a link if it exists -->`;

	const practiceExpected: readonly string[] = [
		'website?: string',
		'{#if user.website}'
	];

	const practiceHints: readonly string[] = [
		'Add "website?: string;" inside the interface (the ? makes it optional).',
		'Use {#if user.website} to check if it exists before rendering.',
		'Render it as: <a href={user.website}>{user.website}</a>'
	];
</script>

<section class="page">
	<!-- 1. Title + Learning Objectives -->
	<h1>1.8 — Interfaces</h1>
	<ul class="objectives">
		<li>Define a TypeScript interface to describe the shape of an object</li>
		<li>Use optional properties (the <code>?</code> marker) and understand why they require checks</li>
		<li>Know why interfaces matter for catching bugs during development, not at runtime</li>
	</ul>

	<!-- 2. Why this matters -->
	<h2>Why this matters</h2>
	<p class="analogy">
		<strong>An interface is like a form template.</strong> It lists every field the form has and what
		type of answer goes in each field. If someone fills it in wrong — puts a number where text should
		go, or misspells a field name — TypeScript rejects the form immediately, before it ever reaches
		the printer. Without interfaces, those bugs sneak through and crash your app at runtime.
	</p>
	<p class="concept">
		A TypeScript <code>interface</code> describes the shape of an object — what properties it has,
		what types they are, and whether any are optional (marked with <code>?</code>). With
		<code>strict</code> mode on, the compiler refuses to build if a required field is missing or
		mistyped, so whole categories of bugs die before the code ever runs. Rule of thumb: use
		<code>interface</code> for object shapes (especially ones that might be extended) and
		<code>type</code> aliases for unions or primitive aliases.
	</p>

	<!-- 3. The complete code -->
	<h2>The complete code</h2>
	<CodeCanvas filename="+page.svelte" code={fullFileCode} />

	<!-- 4. Step-by-step walkthrough -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1 — Define the interface</h3>
	<p class="step-text">
		An interface lists every property name, its type, and whether it is required or optional.
		Think of it as a contract your data must follow.
	</p>
	<CodeCanvas filename="interface definition" code={stepInterfaceCode} />

	<h3>Step 2 — Create an object that matches</h3>
	<p class="step-text">
		When you assign the <code>User</code> type to a variable, TypeScript checks every field
		against the interface at compile time.
	</p>
	<CodeCanvas filename="object creation" code={stepObjectCode} />

	<h3>Step 3 — Handle optional properties safely</h3>
	<p class="step-text">
		Optional properties might be <code>undefined</code>. TypeScript forces you to check before
		using them, which prevents "cannot read property of undefined" runtime errors.
	</p>
	<CodeCanvas filename="optional check" code={stepOptionalCode} />

	<h3>Step 4 — Render the typed data</h3>
	<p class="step-text">
		Use the typed object in Svelte markup. TypeScript provides autocomplete for every property
		name and catches typos instantly.
	</p>
	<CodeCanvas filename="rendering" code={stepRenderCode} />

	<!-- 5. See it in action -->
	<h2>See it in action</h2>
	<p class="hint">
		This profile card is rendered from a typed <code>User</code> object. Every field is
		type-checked. The optional <code>tags</code> array is safely guarded with an <code>#if</code> block.
	</p>

	<article class="profile">
		<div class="avatar" aria-hidden="true">{user.avatar}</div>
		<div class="content">
			<h2>{user.name}</h2>
			<p class="role">{user.role}</p>
			<p class="bio">{user.bio}</p>

			{#if user.tags}
				<ul class="tags">
					{#each user.tags as tag (tag)}
						<li class="tag">{tag}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</article>

	<!-- 6. Your turn -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge={practiceChallenge}
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. More examples -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1 — Interface with nested object</summary>
		<p class="detail-text">
			Interfaces can describe nested shapes. The <code>stats</code> property is itself an object
			with its own typed fields.
		</p>
		<CodeCanvas
			filename="nested interface"
			code={`interface Profile {\n  name: string;\n  stats: {\n    projects: number;   // how many projects completed\n    clients: number;    // how many clients served\n    commits: number;    // total git commits\n  };\n}\n\nconst me: Profile = {\n  name: 'Billy',\n  stats: {\n    projects: 84,\n    clients: 27,\n    commits: 12_430   // underscores improve readability\n  }\n};`}
		/>
	</details>

	<details>
		<summary>Example 2 — Interface vs type alias</summary>
		<p class="detail-text">
			Use <code>interface</code> for object shapes and <code>type</code> for unions and primitives.
			They overlap, but this split keeps intent clear.
		</p>
		<CodeCanvas
			filename="interface vs type"
			code={`// Use INTERFACE for object shapes:\ninterface User {\n  name: string;\n  role: string;\n}\n\n// Use TYPE for unions and primitives:\ntype Status = 'active' | 'inactive' | 'pending';\ntype ID = string | number;\n\n// Combined:\ninterface Account {\n  user: User;         // uses the interface\n  status: Status;     // uses the type alias\n  id: ID;             // uses the type alias\n}`}
		/>
	</details>

	<details>
		<summary>Example 3 — Extending an interface</summary>
		<p class="detail-text">
			Interfaces can extend other interfaces, adding more properties. This is great for building
			up complex shapes from simpler ones.
		</p>
		<CodeCanvas
			filename="extending"
			code={`interface BaseUser {\n  name: string;\n  email: string;\n}\n\n// AdminUser has everything BaseUser has, plus "permissions"\ninterface AdminUser extends BaseUser {\n  permissions: readonly string[];\n}\n\nconst admin: AdminUser = {\n  name: 'Alice',\n  email: 'alice@example.com',\n  permissions: ['users.read', 'users.write']\n};`}
		/>
	</details>

	<!-- 8. Common mistakes -->
	<h2>Common mistakes</h2>
	<div class="mistakes">
		<div class="mistake-wrong">
			<h4>Wrong — no interface, no safety</h4>
			<CodeCanvas filename="wrong.ts" code={wrongCode} />
		</div>
		<div class="mistake-right">
			<h4>Right — interface catches every mistake</h4>
			<CodeCanvas filename="right.ts" code={rightCode} />
		</div>
	</div>

	<!-- 9. What you learned -->
	<h3>What you learned</h3>
	<ul class="learned">
		<li><code>interface</code> describes the shape of an object — its properties and their types.</li>
		<li><code>?</code> marks an optional property — the compiler forces an <code>#if</code> check before you read it.</li>
		<li><code>readonly</code> arrays cannot be mutated — great for fixed lists like tags.</li>
		<li>Use <code>interface</code> for objects and <code>type</code> for unions.</li>
		<li>Interfaces catch typos, wrong types, and missing fields at compile time — not runtime.</li>
	</ul>

	<!-- 10. Next steps -->
	<p class="next">
		Next: <a href="/module-1/1-9-expressions">1.9 — Template expressions</a> — use JavaScript
		expressions directly in your Svelte markup.
	</p>
</section>

<style>
	/* ── Page layout ─────────────────────────────────────── */
	.page {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* consistent spacing */
	}

	/* ── Learning objectives ─────────────────────────────── */
	.objectives {
		padding-inline-start: 1.25rem;       /* indent bullets */
		color: var(--color-text-muted);      /* secondary text */
		line-height: 1.6;                    /* readable */

		& li {
			margin-block: 0.25rem;             /* item spacing */
		}
	}

	/* ── Analogy block ───────────────────────────────────── */
	.analogy {
		font-size: var(--text-lg);           /* emphasis size */
		color: var(--color-text);            /* full contrast */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
		border-inline-start: 4px solid var(--color-brand); /* accent */
		padding-inline-start: 1rem;          /* space after bar */
	}

	/* ── Concept paragraph ───────────────────────────────── */
	.concept {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
	}

	/* ── Headings ────────────────────────────────────────── */
	h2 {
		font-size: var(--text-xl);           /* section heading */
		margin-block-start: 2rem;            /* space above */
	}

	h3 {
		font-size: var(--text-lg);           /* sub-section */
		margin-block-start: 1.5rem;          /* space above */
	}

	/* ── Step text ───────────────────────────────────────── */
	.step-text {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
	}

	/* ── Hint ────────────────────────────────────────────── */
	.hint {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-brand);           /* accent */
		font-style: italic;                  /* distinction */
	}

	/* ── Profile card (interactive demo) ─────────────────── */
	.profile {
		display: flex;                       /* horizontal layout */
		flex-direction: column;              /* stack on mobile */
		gap: 1.25rem;                        /* space between avatar and content */
		padding: 1.5rem;                     /* inner spacing */
		border: 1px solid var(--color-border); /* card border */
		border-radius: 1rem;                 /* large rounding */
		background: var(--color-surface);    /* card background */
		margin-block: 2rem;                  /* vertical breathing room */

		& .avatar {
			inline-size: 5rem;                 /* fixed width */
			block-size: 5rem;                  /* fixed height (square) */
			border-radius: 999px;              /* perfect circle */
			background: var(--color-brand);    /* brand color fill */
			color: var(--color-surface);       /* white text on brand */
			display: grid;                     /* center content */
			place-items: center;               /* both axes centered */
			font-size: var(--text-2xl);        /* large initials */
			font-weight: 700;                  /* bold */
			flex-shrink: 0;                    /* never squish the avatar */
		}

		& .content {
			display: flex;                     /* vertical stack */
			flex-direction: column;            /* top to bottom */
			gap: 0.5rem;                       /* tight spacing */

			& h2 {
				font-size: var(--text-2xl);      /* large name */
				margin: 0;                       /* remove default */
			}

			& .role {
				font-size: var(--text-base);     /* body size */
				color: var(--color-brand);       /* brand accent */
				margin: 0;                       /* remove default */
				font-weight: 600;                /* semi-bold */
			}

			& .bio {
				font-size: var(--text-base);     /* body size */
				color: var(--color-text-muted);  /* secondary */
				margin: 0;                       /* remove default */
				line-height: 1.6;                /* readable */
			}
		}
	}

	/* ── Tags ────────────────────────────────────────────── */
	.tags {
		list-style: none;                    /* remove bullets */
		padding: 0;                          /* remove default padding */
		margin: 0.5rem 0 0;                  /* small top margin */
		display: flex;                       /* horizontal layout */
		flex-wrap: wrap;                     /* wrap to next line */
		gap: 0.5rem;                         /* space between pills */

		& .tag {
			font-size: var(--text-xs);         /* extra small */
			padding: 0.35rem 0.75rem;          /* pill padding */
			border-radius: 999px;              /* pill shape */
			background: var(--color-brand-dim); /* subtle brand bg */
			color: var(--color-text);          /* readable text */
			font-weight: 500;                  /* medium weight */
		}
	}

	/* ── Mistakes section ────────────────────────────────── */
	.mistakes {
		display: flex;                       /* side by side */
		flex-direction: column;              /* stack on mobile */
		gap: 1.5rem;                         /* spacing */

		& h4 {
			font-size: var(--text-sm);         /* small heading */
			margin-block-end: 0.5rem;          /* space before code */
		}
	}

	.mistake-wrong h4 {
		color: oklch(55% 0.15 25);           /* red-ish */
	}

	.mistake-right h4 {
		color: oklch(55% 0.15 145);          /* green-ish */
	}

	/* ── Details blocks ──────────────────────────────────── */
	details {
		border: 1px solid var(--color-border); /* boundary */
		border-radius: 0.5rem;               /* rounded */
		padding: 1rem;                       /* inner spacing */

		& summary {
			cursor: pointer;                   /* clickable */
			font-weight: 600;                  /* bold */
			color: var(--color-brand);         /* accent */
			font-size: var(--text-base);       /* body size */
		}
	}

	.detail-text {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-text-muted);      /* secondary */
		margin-block: 0.5rem;                /* spacing */
	}

	/* ── Learned list ────────────────────────────────────── */
	.learned {
		padding-inline-start: 1.25rem;       /* indent */
		color: var(--color-text-muted);      /* secondary */

		& li {
			margin-block: 0.25rem;             /* item gap */
		}
	}

	/* ── Next link ───────────────────────────────────────── */
	.next {
		font-size: var(--text-base);         /* body size */
		margin-block-start: 2rem;            /* space above */
		padding: 1rem;                       /* inner padding */
		background: var(--color-surface);    /* subtle bg */
		border-radius: 0.5rem;               /* rounded */
		border: 1px solid var(--color-border); /* boundary */

		& a {
			color: var(--color-brand);         /* brand link */
			font-weight: 600;                  /* bold */
			text-decoration: underline;        /* clarity */
		}
	}

	/* ── Responsive ──────────────────────────────────────── */
	@media (min-width: 768px) {
		.profile {
			flex-direction: row;               /* side by side */
			align-items: flex-start;           /* top-align */
			gap: 2rem;                         /* wider gap */
			padding: 2rem;                     /* more padding */

			& .avatar {
				inline-size: 7rem;               /* larger avatar */
				block-size: 7rem;                /* keep square */
				font-size: var(--text-hero);     /* bigger initials */
			}
		}

		.mistakes {
			flex-direction: row;               /* side by side */

			& > div {
				flex: 1;                         /* equal width */
			}
		}
	}
</style>
