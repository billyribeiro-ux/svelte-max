<script lang="ts">
	let activeTab = $state<'test' | 'config' | 'tips'>('test');
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

	<h3>What you learned</h3>
	<ul>
		<li>Playwright runs E2E tests in real browsers (Chromium, Firefox, WebKit) against your running SvelteKit app.</li>
		<li>Role-based selectors like <code>getByRole</code> and <code>getByLabel</code> make tests resilient and verify accessibility.</li>
		<li>The <code>webServer</code> config option auto-starts your dev server before tests run in CI.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.tabs {
		display: flex;
		gap: 2px;
		margin-block-start: var(--space-lg);
	}
	.tab {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-bottom: none;
		border-radius: var(--radius-md) var(--radius-md) 0 0;
		cursor: pointer;
		font-weight: 600;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.tab.active {
		background: var(--color-surface-2);
		color: var(--color-text);
		border-bottom: 2px solid var(--color-primary);
	}
</style>
