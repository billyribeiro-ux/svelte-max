<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── CodeCanvas examples ── */
	const exampleUnitTest =
		"// multiplier.svelte.ts\n" +
		"export function multiplier(initial: number, k: number) {\n" +
		"  let count = $state(initial);\n" +
		"\n" +
		"  return {\n" +
		"    get value() {\n" +
		"      return count * k;\n" +
		"    },\n" +
		"    set: (c: number) => {\n" +
		"      count = c;\n" +
		"    }\n" +
		"  };\n" +
		"}\n" +
		"\n" +
		"// multiplier.svelte.test.ts\n" +
		"import { expect, test } from 'vitest';\n" +
		"import { multiplier } from './multiplier.svelte.js';\n" +
		"\n" +
		"test('Multiplier', () => {\n" +
		"  let double = multiplier(0, 2);\n" +
		"\n" +
		"  expect(double.value).toEqual(0);\n" +
		"\n" +
		"  double.set(5);\n" +
		"\n" +
		"  expect(double.value).toEqual(10);\n" +
		"});";

	const exampleRunesInTests =
		"// counter.svelte.test.ts\n" +
		"// Name the file .svelte.test.ts to use runes!\n" +
		"import { flushSync } from 'svelte';\n" +
		"import { expect, test } from 'vitest';\n" +
		"import { multiplier } from './multiplier.svelte.js';\n" +
		"\n" +
		"test('Multiplier with runes in test', () => {\n" +
		"  let count = $state(0);\n" +
		"  let double = multiplier(() => count, 2);\n" +
		"\n" +
		"  expect(double.value).toEqual(0);\n" +
		"\n" +
		"  count = 5;\n" +
		"\n" +
		"  expect(double.value).toEqual(10);\n" +
		"});";

	const exampleEffectRoot =
		"// logger.svelte.test.ts\n" +
		"import { flushSync } from 'svelte';\n" +
		"import { expect, test } from 'vitest';\n" +
		"import { logger } from './logger.svelte.js';\n" +
		"\n" +
		"test('Effect logging', () => {\n" +
		"  const cleanup = $effect.root(() => {\n" +
		"    let count = $state(0);\n" +
		"\n" +
		"    // logger uses an $effect internally\n" +
		"    let log = logger(() => count);\n" +
		"\n" +
		"    // Effects run after a microtask —\n" +
		"    // flushSync forces them to run NOW\n" +
		"    flushSync();\n" +
		"    expect(log).toEqual([0]);\n" +
		"\n" +
		"    count = 1;\n" +
		"    flushSync();\n" +
		"\n" +
		"    expect(log).toEqual([0, 1]);\n" +
		"  });\n" +
		"\n" +
		"  // Always clean up to prevent leaked effects\n" +
		"  cleanup();\n" +
		"});";

	const exampleComponentTest =
		"// Counter.test.ts\n" +
		"import { flushSync, mount, unmount } from 'svelte';\n" +
		"import { expect, test } from 'vitest';\n" +
		"import Counter from './Counter.svelte';\n" +
		"\n" +
		"test('Counter component', () => {\n" +
		"  // mount the component into jsdom\n" +
		"  const component = mount(Counter, {\n" +
		"    target: document.body,\n" +
		"    props: { initial: 0 }\n" +
		"  });\n" +
		"\n" +
		"  expect(document.body.innerHTML).toBe(\n" +
		"    '<button>0</button>'\n" +
		"  );\n" +
		"\n" +
		"  // Simulate a click\n" +
		"  document.body.querySelector('button')?.click();\n" +
		"  flushSync();\n" +
		"\n" +
		"  expect(document.body.innerHTML).toBe(\n" +
		"    '<button>1</button>'\n" +
		"  );\n" +
		"\n" +
		"  // Always unmount when done\n" +
		"  unmount(component);\n" +
		"});";

	const exampleTestingLibrary =
		"// Counter.test.ts (with @testing-library/svelte)\n" +
		"import { render, screen } from '@testing-library/svelte';\n" +
		"import userEvent from '@testing-library/user-event';\n" +
		"import { expect, test } from 'vitest';\n" +
		"import Counter from './Counter.svelte';\n" +
		"\n" +
		"test('Counter component', async () => {\n" +
		"  const user = userEvent.setup();\n" +
		"  render(Counter);\n" +
		"\n" +
		"  const button = screen.getByRole('button');\n" +
		"  expect(button).toHaveTextContent('0');\n" +
		"\n" +
		"  await user.click(button);\n" +
		"  expect(button).toHaveTextContent('1');\n" +
		"});";

	const exampleVitestConfig =
		"// vite.config.ts\n" +
		"import { defineConfig } from 'vitest/config';\n" +
		"import { sveltekit } from '@sveltejs/kit/vite';\n" +
		"\n" +
		"export default defineConfig({\n" +
		"  plugins: [sveltekit()],\n" +
		"  test: {\n" +
		"    // jsdom for component tests\n" +
		"    environment: 'jsdom',\n" +
		"    // Or use per-file: // @vitest-environment jsdom\n" +
		"  },\n" +
		"  // Resolve browser entry points in test mode\n" +
		"  resolve: process.env.VITEST\n" +
		"    ? { conditions: ['browser'] }\n" +
		"    : undefined\n" +
		"});";

	const examplePlaywright =
		"// tests/homepage.spec.ts\n" +
		"import { expect, test } from '@playwright/test';\n" +
		"\n" +
		"test('home page has expected h1', async ({ page }) => {\n" +
		"  await page.goto('/');\n" +
		"  await expect(page.locator('h1')).toBeVisible();\n" +
		"});\n" +
		"\n" +
		"test('counter increments on click', async ({ page }) => {\n" +
		"  await page.goto('/counter');\n" +
		"\n" +
		"  const button = page.getByRole('button', { name: /count/i });\n" +
		"  await expect(button).toHaveText('Count: 0');\n" +
		"\n" +
		"  await button.click();\n" +
		"  await expect(button).toHaveText('Count: 1');\n" +
		"});\n" +
		"\n" +
		"// playwright.config.ts\n" +
		"const config = {\n" +
		"  webServer: {\n" +
		"    command: 'npm run build && npm run preview',\n" +
		"    port: 4173\n" +
		"  },\n" +
		"  testDir: 'tests',\n" +
		"  testMatch: /(.+\\.)?(test|spec)\\.[jt]s/\n" +
		"};";

	const exampleContextWrapper =
		"// Testing components that use context:\n" +
		"// Create a wrapper component for your test.\n" +
		"\n" +
		"// TestWrapper.svelte\n" +
		"// \u003cscript\u003e\n" +
		"//   import { setContext } from 'svelte';\n" +
		"//   let { children } = $props();\n" +
		"//   setContext('theme', { mode: 'dark' });\n" +
		"// \u003c/script\u003e\n" +
		"// {@render children()}\n" +
		"\n" +
		"// In your test:\n" +
		"import { render } from '@testing-library/svelte';\n" +
		"import TestWrapper from './TestWrapper.svelte';\n" +
		"import ThemedButton from './ThemedButton.svelte';\n" +
		"\n" +
		"test('uses theme context', () => {\n" +
		"  // Render your component inside the wrapper\n" +
		"  // that provides the context it needs\n" +
		"  render(TestWrapper, {\n" +
		"    // pass ThemedButton as a child snippet\n" +
		"  });\n" +
		"});";

	const fullCode =
		"// multiplier.svelte.ts\n" +
		"export function multiplier(initial: number, k: number) {\n" +
		"  let count = $state(initial);\n" +
		"  return {\n" +
		"    get value() { return count * k; },\n" +
		"    set: (c: number) => { count = c; }\n" +
		"  };\n" +
		"}\n" +
		"\n" +
		"// multiplier.svelte.test.ts\n" +
		"import { expect, test } from 'vitest';\n" +
		"import { multiplier } from './multiplier.svelte.js';\n" +
		"\n" +
		"test('Multiplier', () => {\n" +
		"  let double = multiplier(0, 2);\n" +
		"  expect(double.value).toEqual(0);\n" +
		"  double.set(5);\n" +
		"  expect(double.value).toEqual(10);\n" +
		"});\n" +
		"\n" +
		"// Component test with mount/unmount\n" +
		"import { flushSync, mount, unmount } from 'svelte';\n" +
		"import Counter from './Counter.svelte';\n" +
		"\n" +
		"test('Counter', () => {\n" +
		"  const c = mount(Counter, {\n" +
		"    target: document.body,\n" +
		"    props: { initial: 0 }\n" +
		"  });\n" +
		"  document.body.querySelector('button')?.click();\n" +
		"  flushSync();\n" +
		"  expect(document.body.innerHTML).toContain('1');\n" +
		"  unmount(c);\n" +
		"});";
</script>

<section class="page">
	<h1>12.14 — Testing Svelte Components</h1>

	<p class="prose">
		Testing Svelte code is straightforward because Svelte is a compiler — your
		components compile to plain JavaScript that any testing framework can run.
		The ecosystem standard is <strong>Vitest</strong> for unit and component tests
		and <strong>Playwright</strong> for end-to-end tests. Think of tests like a
		safety net under a trapeze artist: you build the act (your components), and
		tests ensure that when something changes, you catch the fall before the audience
		(your users) sees it.
	</p>

	<h3>Setting up Vitest</h3>
	<p class="prose">
		If you created your project with <code>sv create</code>, Vitest may already be
		configured. Otherwise, install it and adjust your Vite config to resolve browser
		entry points during testing.
	</p>

	<div class="build">
		<CodeCanvas filename="vite.config.ts" code={exampleVitestConfig} />
	</div>

	<h3>Unit testing <code>.svelte.ts</code> modules</h3>
	<p class="prose">
		The simplest tests are for <code>.svelte.ts</code> modules — files that export
		reactive logic using runes. These are pure functions that return reactive objects.
		No DOM needed, no component mounting. Just import, call, and assert.
	</p>

	<div class="build">
		<CodeCanvas filename="multiplier.svelte.test.ts" code={exampleUnitTest} />
		<p class="note">
			The module uses <code>$state</code> internally, but since Vitest processes
			<code>.svelte.ts</code> files through the Svelte compiler, runes work
			correctly at test time.
		</p>
	</div>

	<h3>Using runes in test files</h3>
	<p class="prose">
		Want to use <code>$state</code>, <code>$derived</code>, or <code>$effect</code>
		directly in your test code? Name the test file with the <code>.svelte</code>
		extension: <code>my-test.svelte.test.ts</code>. Vitest will process it through
		the Svelte compiler, enabling runes.
	</p>

	<div class="build">
		<CodeCanvas filename="counter.svelte.test.ts" code={exampleRunesInTests} />
	</div>

	<h3>Testing effects with <code>$effect.root()</code></h3>
	<p class="prose">
		Effects normally run after a microtask. In tests, use <code>flushSync()</code>
		to execute pending effects synchronously. If your code under test uses
		<code>$effect</code>, wrap the test body in <code>$effect.root()</code> to
		create a root scope — and always call the returned cleanup function at the end
		to prevent leaked effects.
	</p>

	<div class="build">
		<CodeCanvas filename="logger.svelte.test.ts" code={exampleEffectRoot} />
		<div class="key-point">
			<strong>Key pattern:</strong> <code>$effect.root</code> returns a cleanup
			function. Always call it at the end of your test to tear down all effects
			created inside the root.
		</div>
	</div>

	<h3>Component testing with <code>mount()</code></h3>
	<p class="prose">
		Svelte's imperative API — <code>mount()</code>, <code>unmount()</code>, and
		<code>flushSync()</code> — lets you render components into a DOM environment
		(jsdom), simulate user interactions, and assert on the resulting HTML. This is
		low-level but gives you complete control.
	</p>

	<div class="build">
		<CodeCanvas filename="Counter.test.ts" code={exampleComponentTest} />
	</div>

	<h3>Cleaner tests with <code>@testing-library/svelte</code></h3>
	<p class="prose">
		The <code>mount/unmount</code> approach works but is verbose and brittle — you're
		asserting on raw <code>innerHTML</code>. <code>@testing-library/svelte</code>
		provides semantic queries (<code>getByRole</code>, <code>getByText</code>) and
		<code>userEvent</code> for realistic interaction simulation. Tests become
		more resilient to markup changes.
	</p>

	<div class="build">
		<CodeCanvas filename="Counter.test.ts" code={exampleTestingLibrary} />
		<p class="note">
			Install with <code>npm install -D @testing-library/svelte @testing-library/jest-dom
			@testing-library/user-event</code>
		</p>
	</div>

	<h3>Testing context</h3>
	<p class="prose">
		Components that read from <code>getContext()</code> need a parent that provides
		it. Create a simple wrapper component that sets the context, then render your
		component inside it. This wrapper pattern is the standard approach recommended
		by <code>@testing-library/svelte</code>.
	</p>

	<div class="build">
		<CodeCanvas filename="context-test.ts" code={exampleContextWrapper} />
	</div>

	<h3>E2E tests with Playwright</h3>
	<p class="prose">
		End-to-end tests run your full application in a real browser. Playwright tests
		are framework-agnostic — they interact with the DOM through selectors and
		assertions, completely unaware of Svelte. Use them for critical user journeys:
		login flows, form submissions, navigation, and anything involving real network
		requests.
	</p>

	<div class="build">
		<CodeCanvas filename="homepage.spec.ts" code={examplePlaywright} />
	</div>

	<h3>Testing strategy overview</h3>
	<div class="build">
		<div class="strategy-grid">
			<div class="strategy-card">
				<h4>Unit tests</h4>
				<p>Test <code>.svelte.ts</code> modules in isolation. No DOM. Fast. Use for business logic, reactive utilities, data transformations.</p>
			</div>
			<div class="strategy-card">
				<h4>Component tests</h4>
				<p>Mount components in jsdom. Test props, events, rendering. Use <code>@testing-library/svelte</code> for semantic queries.</p>
			</div>
			<div class="strategy-card">
				<h4>E2E tests</h4>
				<p>Full app in a real browser with Playwright. Test user journeys end-to-end. Slowest but highest confidence.</p>
			</div>
		</div>
		<p class="note">
			The Svelte docs recommend extracting logic into <code>.svelte.ts</code> modules
			and testing those directly. Only write component tests when you specifically need
			to test rendering, DOM interaction, or component integration.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what happens, then revert.</p>
	<ol class="experiments">
		<li>
			<strong>Name a test file <code>.test.ts</code> instead of <code>.svelte.test.ts</code> and use <code>$state</code> in it.</strong>
			The test fails — Vitest does not process plain <code>.ts</code> files through
			the Svelte compiler, so runes are not recognized. The <code>.svelte</code> in the
			filename is what tells Vitest to apply the Svelte transform.
		</li>
		<li>
			<strong>Forget to call <code>flushSync()</code> after a state change in a component test.</strong>
			Your assertion fails because effects and DOM updates have not run yet. Effects
			are batched and run asynchronously by default. <code>flushSync()</code> forces
			all pending reactive updates to execute synchronously so you can assert immediately.
		</li>
		<li>
			<strong>Skip the <code>cleanup()</code> call from <code>$effect.root()</code>.</strong>
			Effects created inside the root are never torn down. In a test suite with many
			tests, this leaks subscriptions and can cause interference between tests —
			effects from test A trigger during test B, producing flaky failures.
		</li>
		<li>
			<strong>Assert on <code>innerHTML</code> with exact whitespace matching.</strong>
			The test breaks whenever the component's internal markup changes — a new
			wrapper div, different attribute order, or extra whitespace. This is why
			<code>@testing-library/svelte</code> queries like <code>getByRole</code> are
			preferred: they test behavior and semantics, not implementation details.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="complete-examples.ts" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		Svelte testing follows a three-tier strategy. Unit tests cover
		<code>.svelte.ts</code> modules — reactive functions, state machines, data
		transformations — with pure function calls and assertions. These are fast,
		require no DOM, and should be your primary testing layer. Name test files
		<code>.svelte.test.ts</code> to enable runes inside test code, and use
		<code>$effect.root()</code> with <code>flushSync()</code> when testing effects.
	</p>
	<p class="prose">
		Component tests render Svelte components into jsdom using <code>mount()</code>
		and <code>unmount()</code> from <code>svelte</code>, or more ergonomically with
		<code>@testing-library/svelte</code>. The testing library provides semantic
		queries (<code>getByRole</code>, <code>getByText</code>) and
		<code>userEvent</code> for simulating interactions. For components that depend
		on context, create a wrapper component that provides the required context and
		render your component inside it.
	</p>
	<p class="prose">
		End-to-end tests with Playwright exercise your full SvelteKit application in a
		real browser. They are framework-agnostic — Playwright knows nothing about Svelte,
		it simply navigates, clicks, and asserts on the visible page. Use E2E tests for
		critical user journeys (authentication, checkout, form submission) where you need
		the highest confidence that everything works together, including server-side
		rendering, routing, and data loading.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-12/project">Module 12 Project</a> — apply performance patterns to a
		production-grade application.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		font-style: italic;
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.key-point {
		background: var(--color-surface-2);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text);
		line-height: 1.5;

		& strong {
			color: var(--color-brand);
		}

		& code {
			font-size: 0.85em;
		}
	}

	.strategy-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.strategy-card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.strategy-card h4 {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-brand);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.strategy-card p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.strategy-card p code {
		font-size: 0.85em;
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

	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	@media (min-inline-size: 480px) {
		.strategy-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.strategy-grid { gap: var(--space-md); }
	}
</style>
