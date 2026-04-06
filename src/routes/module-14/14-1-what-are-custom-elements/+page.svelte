<script lang="ts">
	let activeTab = $state<'svelte' | 'custom'>('svelte');
</script>

<section class="page">
	<h1>14.1 — What Are Custom Elements</h1>

	<p class="concept">
		<strong>Custom Elements</strong> are part of the Web Components standard — a set of browser-native
		APIs that let you define your own HTML tags. Combined with <strong>Shadow DOM</strong> for style
		encapsulation and <strong>HTML Templates</strong> for markup, they allow framework-agnostic,
		reusable UI components that work anywhere HTML works.
	</p>

	<h3>The Web Components Standard</h3>
	<ul>
		<li><strong>Custom Elements API</strong> — register new tags via <code>customElements.define()</code></li>
		<li><strong>Shadow DOM</strong> — scoped styles and encapsulated DOM trees</li>
		<li><strong>HTML Templates</strong> — inert markup via <code>&lt;template&gt;</code> and <code>&lt;slot&gt;</code></li>
		<li><strong>ES Modules</strong> — standard import/export for distribution</li>
	</ul>

	<h3>When Svelte Custom Elements Make Sense</h3>
	<p class="concept">
		Svelte can compile components directly into custom elements. This is ideal when you need to
		<strong>embed widgets</strong> in non-Svelte environments: CMS platforms (WordPress, Drupal),
		static sites, legacy apps, or any context where you cannot control the build pipeline. The
		compiled output is a self-contained class extending <code>HTMLElement</code>.
	</p>

	<h3>Trade-offs: Regular vs Custom Element</h3>
	<div class="build">
		<div class="tab-bar">
			<button
				class="tab"
				class:active={activeTab === 'svelte'}
				onclick={() => activeTab = 'svelte'}
			>Regular Svelte</button>
			<button
				class="tab"
				class:active={activeTab === 'custom'}
				onclick={() => activeTab = 'custom'}
			>Custom Element</button>
		</div>

		<table class="comparison">
			<thead>
				<tr>
					<th>Feature</th>
					<th>Regular Svelte</th>
					<th>Custom Element</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>SSR Support</td>
					<td class="yes">Full SSR / SSG</td>
					<td class="no">Client-only</td>
				</tr>
				<tr>
					<td>Style Encapsulation</td>
					<td>Scoped via compiler</td>
					<td>Shadow DOM (native)</td>
				</tr>
				<tr>
					<td>Framework Agnostic</td>
					<td class="no">Svelte only</td>
					<td class="yes">Any HTML page</td>
				</tr>
				<tr>
					<td>Props</td>
					<td>JS values (any type)</td>
					<td>String attributes + type coercion</td>
				</tr>
				<tr>
					<td>Events</td>
					<td>Callback props</td>
					<td>CustomEvent dispatch</td>
				</tr>
				<tr>
					<td>Bundle Size</td>
					<td>Smaller (shared runtime)</td>
					<td>Larger (standalone)</td>
				</tr>
				<tr>
					<td>Slot Support</td>
					<td>Svelte snippets</td>
					<td>Native <code>&lt;slot&gt;</code></td>
				</tr>
				<tr>
					<td>DevTools</td>
					<td>Svelte DevTools</td>
					<td>Browser Elements panel</td>
				</tr>
			</tbody>
		</table>
	</div>

	<h3>Key Takeaway</h3>
	<p class="concept">
		Use <strong>regular Svelte components</strong> when building a Svelte app — they are smaller,
		faster, and support SSR. Use <strong>custom elements</strong> when you need to ship a component
		to consumers who do not use Svelte. The compilation target changes, but the authoring experience
		stays the same.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li>Custom elements are browser-native reusable tags built on Shadow DOM, HTML Templates, and the Custom Elements API.</li>
		<li>Svelte can compile components directly into custom elements that extend <code>HTMLElement</code>.</li>
		<li>Custom elements are ideal for embedding widgets in non-Svelte environments like CMS platforms or legacy apps.</li>
		<li>Regular Svelte components are smaller and support SSR; custom elements trade that for framework-agnostic portability.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.tab-bar { display: flex; gap: var(--space-xs); }
	.tab {
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.tab.active {
		background: var(--color-primary);
		color: var(--color-text);
		border-color: var(--color-primary);
	}

	.comparison {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	.comparison th, .comparison td {
		padding: var(--space-sm) var(--space-md);
		text-align: left;
		border-block-end: 1px solid var(--color-border);
	}
	.comparison th {
		color: var(--color-text);
		font-weight: 600;
	}
	.comparison td {
		color: var(--color-text-muted);
	}
	.comparison .yes { color: var(--color-success); }
	.comparison .no { color: var(--color-error); }

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
