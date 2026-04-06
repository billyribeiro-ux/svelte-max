<script lang="ts">
	let activeTab = $state<'test' | 'config' | 'tips'>('test');
</script>

<section class="page">
	<h1>12.9 — Vitest Unit Tests</h1>

	<p class="concept">
		<strong>Vitest</strong> is the recommended test runner for SvelteKit projects. It integrates
		with Vite's transform pipeline, so your Svelte components and TypeScript files work without
		extra configuration. You can test reactive logic in <code>.svelte.ts</code> files,
		load functions, and utility code.
	</p>

	<h3>Setup</h3>
	<div class="build">
		<ul>
			<li>Vitest is already installed as a devDependency in this project</li>
			<li><code>@testing-library/svelte</code> provides <code>render</code> and DOM queries</li>
			<li><code>jsdom</code> provides a browser-like environment for tests</li>
			<li>Test files use <code>.test.ts</code> or <code>.svelte.test.ts</code> extension</li>
		</ul>
	</div>

	<div class="tabs">
		<button class="tab" class:active={activeTab === 'test'} onclick={() => activeTab = 'test'}>
			Test Suite
		</button>
		<button class="tab" class:active={activeTab === 'config'} onclick={() => activeTab = 'config'}>
			vitest.config.ts
		</button>
		<button class="tab" class:active={activeTab === 'tips'} onclick={() => activeTab = 'tips'}>
			Tips
		</button>
	</div>

	{#if activeTab === 'test'}
		<h3>Complete Test Suite: Counter Store</h3>
		<div class="build">
			<p class="concept">
				This test file demonstrates testing a reactive counter store defined in a
				<code>.svelte.ts</code> file. It tests increment, reset, and a derived total.
			</p>
			<pre>{`// src/lib/stores/counter.svelte.ts
export function createCounter(initial = 0) {
  let count = $state(initial);
  const doubled = $derived(count * 2);

  return {
    get count() { return count; },
    get doubled() { return doubled; },
    increment() { count++; },
    decrement() { count--; },
    reset() { count = initial; }
  };
}

// src/lib/stores/counter.svelte.test.ts
import { describe, it, expect } from 'vitest';
import { createCounter } from './counter.svelte';

describe('createCounter', () => {
  it('initializes with default value', () => {
    const counter = createCounter();
    expect(counter.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const counter = createCounter(10);
    expect(counter.count).toBe(10);
  });

  it('increments the count', () => {
    const counter = createCounter();
    counter.increment();
    counter.increment();
    expect(counter.count).toBe(2);
  });

  it('decrements the count', () => {
    const counter = createCounter(5);
    counter.decrement();
    expect(counter.count).toBe(4);
  });

  it('resets to initial value', () => {
    const counter = createCounter(3);
    counter.increment();
    counter.increment();
    expect(counter.count).toBe(5);
    counter.reset();
    expect(counter.count).toBe(3);
  });

  it('computes derived doubled value', () => {
    const counter = createCounter(4);
    expect(counter.doubled).toBe(8);
    counter.increment();
    expect(counter.doubled).toBe(10);
  });
});`}</pre>
		</div>
	{:else if activeTab === 'config'}
		<h3>vitest.config.ts Setup</h3>
		<div class="build">
			<p class="concept">
				SvelteKit projects typically extend the Vite config. The key settings are the
				<code>environment</code> (jsdom for component tests) and the Svelte plugin for
				preprocessing.
			</p>
			<pre>{`// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true
  }
});

// src/tests/setup.ts (optional)
import '@testing-library/jest-dom';`}</pre>
		</div>

		<h3>Testing Load Functions</h3>
		<div class="build">
			<pre>{`// src/routes/api/items/+page.server.ts
export async function load({ fetch }) {
  const res = await fetch('/api/items');
  const items = await res.json();
  return { items };
}

// src/routes/api/items/load.test.ts
import { describe, it, expect, vi } from 'vitest';
import { load } from './+page.server';

describe('items load function', () => {
  it('fetches and returns items', async () => {
    const mockItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];

    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockItems)
    });

    const result = await load({
      fetch: mockFetch
    } as any);

    expect(mockFetch).toHaveBeenCalledWith('/api/items');
    expect(result.items).toEqual(mockItems);
  });
});`}</pre>
		</div>
	{:else}
		<h3>Testing Tips</h3>
		<div class="build">
			<ul>
				<li><strong>Test reactive logic in <code>.svelte.ts</code> files</strong> — they are pure TypeScript with runes, easy to unit test</li>
				<li><strong>Use <code>@testing-library/svelte</code> for components</strong> — test user behavior, not implementation</li>
				<li><strong>Mock fetch with <code>vi.fn()</code></strong> — test load functions without a running server</li>
				<li><strong>Use <code>vi.useFakeTimers()</code></strong> — for testing debounced effects and timeouts</li>
				<li><strong>Prefer integration tests over unit tests for UI</strong> — test the component as a user sees it</li>
				<li><strong>Run tests in CI</strong> — add <code>vitest run</code> to your CI pipeline</li>
				<li><strong>Watch mode during development</strong> — <code>vitest</code> (without run) re-executes on file changes</li>
			</ul>
		</div>

		<h3>Common Patterns</h3>
		<div class="build">
			<pre>{`// Testing a component with @testing-library/svelte
import { render, screen, fireEvent } from '@testing-library/svelte';
import Counter from './Counter.svelte';

it('increments on button click', async () => {
  render(Counter);
  const button = screen.getByRole('button', { name: /increment/i });
  await fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Testing async behavior
it('shows loading then data', async () => {
  render(DataWidget);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await screen.findByText('Data loaded');
});`}</pre>
		</div>
	{/if}
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
