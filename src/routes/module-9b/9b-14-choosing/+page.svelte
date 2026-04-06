<script lang="ts">
	type Row = {
		pattern: string;
		when: string;
		strengths: string;
		limitations: string;
		module: string;
	};

	const rows: Row[] = [
		{
			pattern: 'load()',
			when: 'Initial page data, SSR-critical content',
			strengths: 'SSR, preloading, type-safe, established pattern',
			limitations: 'Page-scoped, no interactive re-fetching',
			module: 'Module 9',
		},
		{
			pattern: 'Remote query',
			when: 'Interactive fetching, reactive data, component-level',
			strengths: 'Cached, deduplicated, reactive, type-safe',
			limitations: 'Experimental, requires .remote.ts files',
			module: 'Module 9B',
		},
		{
			pattern: 'Remote form',
			when: 'Form submissions, mutations with progressive enhancement',
			strengths: 'Works without JS, Valibot validation, field API',
			limitations: 'Experimental, form-shaped data only',
			module: 'Module 9B',
		},
		{
			pattern: 'Remote command',
			when: 'Side effects, mutations triggered by events',
			strengths: 'Simple API, single-flight support',
			limitations: 'Experimental, cannot call during render',
			module: 'Module 9B',
		},
		{
			pattern: '+server.ts',
			when: 'Public APIs, webhooks, streaming, custom headers',
			strengths: 'Full HTTP control, shareable endpoints',
			limitations: 'Manual fetch, no type inference to client',
			module: 'Module 9',
		},
		{
			pattern: 'prerender',
			when: 'Static data, build-time content, CDN deployment',
			strengths: 'Zero runtime cost, CDN-friendly',
			limitations: 'Stale until rebuild, limited inputs',
			module: 'Module 9B',
		},
	];

	type FlowStep = {
		question: string;
		yes: string;
		no: string;
	};

	const flowSteps: FlowStep[] = [
		{ question: 'Does it need SSR?', yes: 'load()', no: 'Next question' },
		{ question: 'Is it a form submission?', yes: 'Remote form()', no: 'Next question' },
		{ question: 'Is it a mutation / side effect?', yes: 'Remote command()', no: 'Next question' },
		{ question: 'Is it interactive data fetching?', yes: 'Remote query()', no: 'Next question' },
		{ question: 'Is it a public API or webhook?', yes: '+server.ts', no: 'Next question' },
		{ question: 'Is the data static / build-time?', yes: 'prerender()', no: 'Re-evaluate needs' },
	];
</script>

<section class="page">
	<h1>9B.14 — Choosing the Right Tool</h1>
	<p class="concept">
		<strong>Concept.</strong> SvelteKit offers multiple patterns for server-client data flow.
		Choosing the right one depends on SSR needs, mutation type, progressive enhancement
		requirements, and whether the API is public. This lesson provides a decision framework.
	</p>

	<div class="build">
		<h2>Decision matrix</h2>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Pattern</th>
						<th>When</th>
						<th>Strengths</th>
						<th>Limitations</th>
						<th>Ref</th>
					</tr>
				</thead>
				<tbody>
					{#each rows as row}
						<tr>
							<td><code>{row.pattern}</code></td>
							<td>{row.when}</td>
							<td>{row.strengths}</td>
							<td>{row.limitations}</td>
							<td>{row.module}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<h2>Flowchart guide</h2>
		<div class="flow">
			{#each flowSteps as step, i}
				<div class="flow-step">
					<div class="flow-question">
						<span class="flow-num">{i + 1}</span>
						{step.question}
					</div>
					<div class="flow-answers">
						<span class="flow-yes">Yes: <strong>{step.yes}</strong></span>
						<span class="flow-no">No: {step.no}</span>
					</div>
				</div>
				{#if i < flowSteps.length - 1}
					<div class="flow-connector"></div>
				{/if}
			{/each}
		</div>

		<h2>Quick rules of thumb</h2>
		<div class="rules">
			<div class="rule">
				<strong>Start with <code>load()</code></strong> for page data. It is the established,
				stable pattern with full SSR support.
			</div>
			<div class="rule">
				<strong>Use remote functions</strong> when you need interactive, component-level data
				fetching with type safety and caching.
			</div>
			<div class="rule">
				<strong>Keep <code>+server.ts</code></strong> for public APIs, webhooks, and anything
				that external systems need to call.
			</div>
			<div class="rule">
				<strong>Remote functions are experimental</strong> — use <code>load()</code> and form
				actions for production applications until the API stabilizes.
			</div>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Six patterns for server-client data flow, each with distinct use cases</li>
		<li>A flowchart to decide which pattern fits your needs</li>
		<li><code>load()</code> remains the primary pattern for SSR page data</li>
		<li>Remote functions excel at interactive, component-level data fetching and mutations</li>
		<li><code>+server.ts</code> is still the right choice for public APIs and webhooks</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.table-wrap { overflow-x: auto; }
	table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
	th, td { padding: var(--space-sm); text-align: left; border-bottom: 1px solid var(--color-border); }
	th { font-weight: 600; background: var(--color-surface-2); position: sticky; top: 0; }
	td { color: var(--color-text-muted); }
	.flow { display: flex; flex-direction: column; gap: 0; }
	.flow-step {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs);
	}
	.flow-question { display: flex; align-items: center; gap: var(--space-sm); font-weight: 500; }
	.flow-num {
		display: inline-flex; align-items: center; justify-content: center;
		width: 1.5rem; height: 1.5rem; border-radius: 50%;
		background: var(--color-border); font-size: var(--text-sm); font-weight: 700;
		flex-shrink: 0;
	}
	.flow-answers { display: flex; gap: var(--space-md); font-size: var(--text-sm); padding-inline-start: 2.2rem; }
	.flow-yes { color: oklch(60% 0.15 145); }
	.flow-no { color: var(--color-text-muted); }
	.flow-connector {
		width: 2px; height: var(--space-sm); background: var(--color-border);
		margin-inline-start: 1.4rem;
	}
	.rules { display: flex; flex-direction: column; gap: var(--space-sm); }
	.rule {
		padding: var(--space-sm) var(--space-md); background: var(--color-surface-2);
		border-radius: var(--radius-md); font-size: var(--text-sm);
		color: var(--color-text-muted); line-height: 1.6;
	}
	.rule strong { color: var(--color-text); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
