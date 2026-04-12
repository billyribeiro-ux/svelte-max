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

	const fullCode = fullFileCode;

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

	<!-- Break it on purpose -->
	<h2>Break it on purpose</h2>

	<p class="concept">
		Interfaces only protect you if you let them. Try these experiments to see what they catch.
	</p>

	<ol class="experiments">
		<li>
			<strong>Misspell a property name.</strong> Change <code>user.name</code> to
			<code>user.naem</code> in the markup. TypeScript immediately underlines it with a red
			squiggle: "Property 'naem' does not exist on type 'User'." This is the core value of
			interfaces — typos are caught at compile time, not discovered by a confused user at
			runtime.
		</li>
		<li>
			<strong>Assign the wrong type.</strong> Set <code>name: 42</code> in the user object
			(a number instead of a string). TypeScript errors: "Type 'number' is not assignable to
			type 'string'." The interface enforces the contract.
		</li>
		<li>
			<strong>Remove a required property.</strong> Delete the <code>bio</code> property from
			the user object entirely. TypeScript errors: "Property 'bio' is missing in type...".
			Required properties cannot be omitted — the compiler enforces completeness.
		</li>
		<li>
			<strong>Access an optional property without checking.</strong> Write
			<code>{'{'}{'{'}user.tags.length{'}'}{'{'}/'}</code> directly in the markup without an
			<code>{'{'}#if user.tags{'}'}</code> guard. TypeScript warns: "Object is possibly
			'undefined'." Optional properties must be narrowed before access. This prevents the
			classic "Cannot read properties of undefined" runtime crash.
		</li>
	</ol>

	<!-- HAVING ISSUES? COMPLETE CODE -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- 9. What you learned -->
	<h2>What you learned</h2>

	<p class="concept">
		A TypeScript <code>interface</code> is a contract that describes the shape of an object — which
		properties it has and what type each one holds. When you declare
		<code>interface User {'{'} name: string; role: string; bio: string {'}'}</code>, you are telling
		the compiler: "Every object that claims to be a User MUST have these three properties, and they
		MUST be strings." If any code tries to create a User with a missing property, a misspelled
		property, or a wrong type, the compiler catches it immediately — before the code ever runs.
	</p>

	<p class="concept">
		The <code>?</code> operator marks a property as optional:
		<code>tags?: readonly string[]</code> means tags can be present or absent. But optional does not
		mean "ignore it." TypeScript forces you to check before accessing:
		<code>{'{'}#if user.tags{'}'}</code> narrows the type from <code>string[] | undefined</code> to
		<code>string[]</code> inside the block. This prevents the most common runtime crash in
		JavaScript — accessing a property on <code>undefined</code>.
	</p>

	<p class="concept">
		Use <code>interface</code> for object shapes and <code>type</code> for unions
		(<code>type Status = 'idle' | 'loading' | 'error'</code>). Both are compile-time only — they
		add zero bytes to your production bundle. They are documentation that the compiler enforces.
		When you change an interface, every file that imports it immediately shows errors if the usage
		is wrong. That is refactoring safety at scale.
	</p>

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
		gap: var(--space-md);                        /* space between avatar and content */
		padding: var(--space-lg);                     /* inner spacing */
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
			gap: var(--space-sm);                       /* tight spacing */

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
		margin: var(--space-sm) 0 0;                  /* small top margin */
		display: flex;                       /* horizontal layout */
		flex-wrap: wrap;                     /* wrap to next line */
		gap: var(--space-sm);                         /* space between pills */

		& .tag {
			font-size: var(--text-xs);         /* extra small */
			padding: var(--space-xs) var(--space-sm);          /* pill padding */
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
		gap: var(--space-lg);                         /* spacing */

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
		padding: var(--space-md);                       /* inner spacing */

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

	/* ── Next link ───────────────────────────────────────── */
	.next {
		font-size: var(--text-base);         /* body size */
		margin-block-start: 2rem;            /* space above */
		padding: var(--space-md);                       /* inner padding */
		background: var(--color-surface);    /* subtle bg */
		border-radius: 0.5rem;               /* rounded */
		border: 1px solid var(--color-border); /* boundary */

		& a {
			color: var(--color-brand);         /* brand link */
			font-weight: 600;                  /* bold */
			text-decoration: underline;        /* clarity */
		}
	}

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

	/* ── Responsive ──────────────────────────────────────── */
	@media (min-inline-size: 768px) {
		.profile {
			flex-direction: row;               /* side by side */
			align-items: flex-start;           /* top-align */
			gap: var(--space-xl);                         /* wider gap */
			padding: var(--space-xl);                     /* more padding */

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

	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */

	@media (min-inline-size: 480px) {
		.analogy, .concept, .hint { max-inline-size: 65ch; }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.analogy, .concept, .hint { max-inline-size: 72ch; }
	}

	@media (min-inline-size: 1024px) {
		.analogy, .concept, .hint { max-inline-size: 80ch; }
	}
</style>
