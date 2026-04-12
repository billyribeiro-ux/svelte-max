<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let activeTab = $state<'test' | 'config' | 'tips'>('test');


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let activeTab = $state\u003c'test' | 'config' | 'tips'\u003e('test');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.10 — Playwright E2E\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003ePlaywright\u003c/strong\u003e runs end-to-end tests in real browsers (Chromium, Firefox, WebKit).\n" +
		"		It navigates your actual app, fills forms, clicks buttons, and asserts on the resulting DOM.\n" +
		"		SvelteKit integrates with Playwright for testing full user flows across multiple pages.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSetup\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003e@playwright/test\u003c/code\u003e is already installed as a devDependency\u003c/li\u003e\n" +
		"			\u003cli\u003eTests live in a \u003ccode\u003etests/\u003c/code\u003e or \u003ccode\u003ee2e/\u003c/code\u003e directory\u003c/li\u003e\n" +
		"			\u003cli\u003ePlaywright launches a real browser and navigates your running app\u003c/li\u003e\n" +
		"			\u003cli\u003eRun with \u003ccode\u003enpx playwright test\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"tabs\"\u003e\n" +
		"		\u003cbutton class=\"tab\" class:active={activeTab === 'test'} onclick={() =\u003e activeTab = 'test'}\u003e\n" +
		"			E2E Test\n" +
		"		\u003c/button\u003e\n" +
		"		\u003cbutton class=\"tab\" class:active={activeTab === 'config'} onclick={() =\u003e activeTab = 'config'}\u003e\n" +
		"			Config\n" +
		"		\u003c/button\u003e\n" +
		"		\u003cbutton class=\"tab\" class:active={activeTab === 'tips'} onclick={() =\u003e activeTab = 'tips'}\u003e\n" +
		"			Tips\n" +
		"		\u003c/button\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	{#if activeTab === 'test'}\n" +
		"		\u003ch3\u003eE2E Test: CRUD Notes App\u003c/h3\u003e\n" +
		"		\u003cdiv class=\"build\"\u003e\n" +
		"			\u003cp class=\"concept\"\u003e\n" +
		"				This test navigates to the Module 10 CRUD notes app, simulates a login,\n" +
		"				creates a new note, and verifies it appears on the page.\n" +
		"			\u003c/p\u003e\n" +
		"			\u003cpre\u003e{`// e2e/notes-crud.test.ts\n" +
		"import { test, expect } from '@playwright/test';\n" +
		"\n" +
		"test.describe('Notes CRUD App', () =\u003e {\n" +
		"  test.beforeEach(async ({ page }) =\u003e {\n" +
		"    // Navigate to the notes app\n" +
		"    await page.goto('/module-10/project');\n" +
		"  });\n" +
		"\n" +
		"  test('user can log in', async ({ page }) =\u003e {\n" +
		"    // Fill in login form\n" +
		"    await page.getByLabel('Username').fill('testuser');\n" +
		"    await page.getByLabel('Password').fill('password123');\n" +
		"    await page.getByRole('button', { name: 'Log in' }).click();\n" +
		"\n" +
		"    // Verify logged in state\n" +
		"    await expect(\n" +
		"      page.getByText('Welcome, testuser')\n" +
		"    ).toBeVisible();\n" +
		"  });\n" +
		"\n" +
		"  test('user can create a note', async ({ page }) =\u003e {\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>12.10 — Playwright E2E</h1>

	<p class="concept">
		<strong>Playwright</strong> runs end-to-end tests in real browsers (Chromium, Firefox, WebKit).
		It navigates your actual app, fills forms, clicks buttons, and asserts on the resulting DOM.
		SvelteKit integrates with Playwright for testing full user flows across multiple pages.
	</p>

	<h3>Setup</h3>
	<div class="build">
		<ul>
			<li><code>@playwright/test</code> is already installed as a devDependency</li>
			<li>Tests live in a <code>tests/</code> or <code>e2e/</code> directory</li>
			<li>Playwright launches a real browser and navigates your running app</li>
			<li>Run with <code>npx playwright test</code></li>
		</ul>
	</div>

	<div class="tabs">
		<button class="tab" class:active={activeTab === 'test'} onclick={() => activeTab = 'test'}>
			E2E Test
		</button>
		<button class="tab" class:active={activeTab === 'config'} onclick={() => activeTab = 'config'}>
			Config
		</button>
		<button class="tab" class:active={activeTab === 'tips'} onclick={() => activeTab = 'tips'}>
			Tips
		</button>
	</div>

	{#if activeTab === 'test'}
		<h3>E2E Test: CRUD Notes App</h3>
		<div class="build">
			<p class="concept">
				This test navigates to the Module 10 CRUD notes app, simulates a login,
				creates a new note, and verifies it appears on the page.
			</p>
			<pre>{`// e2e/notes-crud.test.ts
import { test, expect } from '@playwright/test';

test.describe('Notes CRUD App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the notes app
    await page.goto('/module-10/project');
  });

  test('user can log in', async ({ page }) => {
    // Fill in login form
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Verify logged in state
    await expect(
      page.getByText('Welcome, testuser')
    ).toBeVisible();
  });

  test('user can create a note', async ({ page }) => {
    // Log in first
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Click "New Note" button
    await page.getByRole('button', { name: /new note/i }).click();

    // Fill in note details
    await page.getByLabel('Title').fill('My Test Note');
    await page.getByLabel('Content').fill(
      'This is a test note created by Playwright.'
    );

    // Save the note
    await page.getByRole('button', { name: /save/i }).click();

    // Verify the note appears in the list
    await expect(
      page.getByText('My Test Note')
    ).toBeVisible();
  });

  test('user can delete a note', async ({ page }) => {
    // Assume note exists from previous flow
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Find the note and delete it
    const noteCard = page.getByText('My Test Note').locator('..');
    await noteCard.getByRole('button', { name: /delete/i }).click();

    // Confirm deletion
    await page.getByRole('button', { name: /confirm/i }).click();

    // Verify removal
    await expect(
      page.getByText('My Test Note')
    ).not.toBeVisible();
  });
});`}</pre>
		</div>
	{:else if activeTab === 'config'}
		<h3>playwright.config.ts</h3>
		<div class="build">
			<p class="concept">
				The Playwright config defines which browsers to test, the base URL, and how to
				start the dev server. SvelteKit projects typically use the <code>webServer</code>
				option to automatically start the app before tests run.
			</p>
			<pre>{`// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI
  }
});`}</pre>
		</div>
	{:else}
		<h3>Playwright Tips</h3>
		<div class="build">
			<ul>
				<li><strong>Use role-based selectors</strong> — <code>getByRole('button')</code> is more resilient than CSS selectors</li>
				<li><strong>Use <code>getByLabel</code> for form fields</strong> — tests your a11y labels too</li>
				<li><strong>Auto-wait built in</strong> — Playwright automatically waits for elements to appear</li>
				<li><strong>Use <code>test.describe</code></strong> — group related tests for shared setup</li>
				<li><strong>Take screenshots on failure</strong> — configured via <code>screenshot: 'only-on-failure'</code></li>
				<li><strong>Record traces</strong> — use <code>trace: 'on-first-retry'</code> for debugging CI failures</li>
				<li><strong>Test mobile viewports</strong> — add device projects in config</li>
				<li><strong>Run in CI</strong> — use <code>npx playwright install --with-deps</code> to install browsers</li>
			</ul>
		</div>

		<h3>Useful Commands</h3>
		<div class="build">
			<pre>{`# Run all tests
npx playwright test

# Run with UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test e2e/notes-crud.test.ts

# Generate tests by recording actions
npx playwright codegen http://localhost:5173

# Show HTML report
npx playwright show-report

# Update snapshots
npx playwright test --update-snapshots`}</pre>
		</div>
	{/if}


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Use a CSS selector like <code>.btn-primary</code> instead of <code>getByRole('button')</code>.</strong> Renaming the CSS class breaks the test even though the button still works, proving that role-based selectors are more resilient to UI refactoring.</li>
		<li><strong>Remove the <code>webServer</code> block from <code>playwright.config.ts</code> and run tests without starting the dev server.</strong> Every test fails with a connection error because Playwright has no server to navigate to.</li>
		<li><strong>Add a <code>waitForTimeout(5000)</code> instead of waiting for a specific element.</strong> The test passes but takes 5 seconds regardless of how fast the page loads, proving that explicit waits like <code>waitForSelector</code> are faster and more reliable.</li>
		<li><strong>Run tests in <code>--headed</code> mode and watch the browser.</strong> You can see each click, type, and navigation happen in real time, which is invaluable for debugging flaky tests that pass locally but fail in CI.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Playwright runs end-to-end tests in real browsers (Chromium, Firefox, WebKit) against your running SvelteKit application. Unlike unit tests that verify isolated logic, E2E tests verify the full user flow: navigation, form submission, data persistence, and visual feedback as a real user would experience them.</p>
	<p class="prose">Role-based selectors like <code>getByRole('button')</code> and <code>getByLabel('Email')</code> make tests resilient to CSS and structural changes while simultaneously verifying accessibility. If a test cannot find an element by its ARIA role, it means a screen reader cannot find it either.</p>
	<p class="prose">The <code>webServer</code> configuration option in <code>playwright.config.ts</code> automatically starts your dev or preview server before tests run and shuts it down afterward. This makes E2E tests self-contained and CI-ready without any manual setup steps.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-11-deployment">12.11 — Deployment</a> — choose an adapter and ship your application.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

	.tabs {
		display: flex;
		gap: 2px;
		margin-block-start: var(--space-lg);
	}
	.tab {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-block-end: none;
		border-radius: var(--radius-md) var(--radius-md) 0 0;
		cursor: pointer;
		font-weight: 600;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.tab.active {
		background: var(--color-surface-2);
		color: var(--color-text);
		border-block-end: 2px solid var(--color-primary);
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

	/* === RESPONSIVE BREAKPOINTS === */
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
