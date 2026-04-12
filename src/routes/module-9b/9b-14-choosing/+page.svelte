<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type Row = {\n" +
		"		pattern: string;\n" +
		"		when: string;\n" +
		"		strengths: string;\n" +
		"		limitations: string;\n" +
		"		module: string;\n" +
		"	};\n" +
		"\n" +
		"	const rows: Row[] = [\n" +
		"		{\n" +
		"			pattern: 'load()',\n" +
		"			when: 'Initial page data, SSR-critical content',\n" +
		"			strengths: 'SSR, preloading, type-safe, established pattern',\n" +
		"			limitations: 'Page-scoped, no interactive re-fetching',\n" +
		"			module: 'Module 9',\n" +
		"		},\n" +
		"		{\n" +
		"			pattern: 'Remote query',\n" +
		"			when: 'Interactive fetching, reactive data, component-level',\n" +
		"			strengths: 'Cached, deduplicated, reactive, type-safe',\n" +
		"			limitations: 'Experimental, requires .remote.ts files',\n" +
		"			module: 'Module 9B',\n" +
		"		},\n" +
		"		{\n" +
		"			pattern: 'Remote form',\n" +
		"			when: 'Form submissions, mutations with progressive enhancement',\n" +
		"			strengths: 'Works without JS, Valibot validation, field API',\n" +
		"			limitations: 'Experimental, form-shaped data only',\n" +
		"			module: 'Module 9B',\n" +
		"		},\n" +
		"		{\n" +
		"			pattern: 'Remote command',\n" +
		"			when: 'Side effects, mutations triggered by events',\n" +
		"			strengths: 'Simple API, single-flight support',\n" +
		"			limitations: 'Experimental, cannot call during render',\n" +
		"			module: 'Module 9B',\n" +
		"		},\n" +
		"		{\n" +
		"			pattern: '+server.ts',\n" +
		"			when: 'Public APIs, webhooks, streaming, custom headers',\n" +
		"			strengths: 'Full HTTP control, shareable endpoints',\n" +
		"			limitations: 'Manual fetch, no type inference to client',\n" +
		"			module: 'Module 9',\n" +
		"		},\n" +
		"		{\n" +
		"			pattern: 'prerender',\n" +
		"			when: 'Static data, build-time content, CDN deployment',\n" +
		"			strengths: 'Zero runtime cost, CDN-friendly',\n" +
		"			limitations: 'Stale until rebuild, limited inputs',\n" +
		"			module: 'Module 9B',\n" +
		"		},\n" +
		"	];\n" +
		"\n" +
		"	type FlowStep = {\n" +
		"		question: string;\n" +
		"		yes: string;\n" +
		"		no: string;\n" +
		"	};\n" +
		"\n" +
		"	const flowSteps: FlowStep[] = [\n" +
		"		{ question: 'Does it need SSR?', yes: 'load()', no: 'Next question' },\n" +
		"		{ question: 'Is it a form submission?', yes: 'Remote form()', no: 'Next question' },\n" +
		"		{ question: 'Is it a mutation / side effect?', yes: 'Remote command()', no: 'Next question' },\n" +
		"		{ question: 'Is it interactive data fetching?', yes: 'Remote query()', no: 'Next question' },\n" +
		"		{ question: 'Is it a public API or webhook?', yes: '+server.ts', no: 'Next question' },\n" +
		"		{ question: 'Is the data static / build-time?', yes: 'prerender()', no: 'Re-evaluate needs' },\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.14 — Choosing the Right Tool\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e SvelteKit offers multiple patterns for server-client data flow.\n" +
		"		Choosing the right one depends on SSR needs, mutation type, progressive enhancement\n" +
		"		requirements, and whether the API is public. This lesson provides a decision framework.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eDecision matrix\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"table-wrap\"\u003e\n" +
		"			\u003ctable\u003e\n" +
		"				\u003cthead\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003cth\u003ePattern\u003c/th\u003e\n" +
		"						\u003cth\u003eWhen\u003c/th\u003e\n" +
		"						\u003cth\u003eStrengths\u003c/th\u003e\n" +
		"						\u003cth\u003eLimitations\u003c/th\u003e\n" +
		"						\u003cth\u003eRef\u003c/th\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"				\u003c/thead\u003e\n" +
		"				\u003ctbody\u003e\n" +
		"					{#each rows as row}\n" +
		"						\u003ctr\u003e\n" +
		"							\u003ctd\u003e\u003ccode\u003e{row.pattern}\u003c/code\u003e\u003c/td\u003e\n" +
		"							\u003ctd\u003e{row.when}\u003c/td\u003e\n" +
		"							\u003ctd\u003e{row.strengths}\u003c/td\u003e\n" +
		"							\u003ctd\u003e{row.limitations}\u003c/td\u003e\n" +
		"							\u003ctd\u003e{row.module}\u003c/td\u003e\n" +
		"						\u003c/tr\u003e\n" +
		"					{/each}\n" +
		"				\u003c/tbody\u003e\n" +
		"			\u003c/table\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch2\u003eFlowchart guide\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"flow\"\u003e\n" +
		"			{#each flowSteps as step, i}\n" +
		"				\u003cdiv class=\"flow-step\"\u003e\n" +
		"					\u003cdiv class=\"flow-question\"\u003e\n" +
		"						\u003cspan class=\"flow-num\"\u003e{i + 1}\u003c/span\u003e\n" +
		"						{step.question}\n" +
		"					\u003c/div\u003e\n" +
		"					\u003cdiv class=\"flow-answers\"\u003e\n" +
		"						\u003cspan class=\"flow-yes\"\u003eYes: \u003cstrong\u003e{step.yes}\u003c/strong\u003e\u003c/span\u003e\n" +
		"						\u003cspan class=\"flow-no\"\u003eNo: {step.no}\u003c/span\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				{#if i \u003c flowSteps.length - 1}\n" +
		"					\u003cdiv class=\"flow-connector\"\u003e\u003c/div\u003e\n" +
		"				{/if}\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch2\u003eQuick rules of thumb\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"rules\"\u003e\n" +
		"			\u003cdiv class=\"rule\"\u003e\n" +
		"				\u003cstrong\u003eStart with \u003ccode\u003eload()\u003c/code\u003e\u003c/strong\u003e for page data. It is the established,\n" +
		"				stable pattern with full SSR support.\n" +
		"			\u003c/div\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Use <code>query()</code> for data that absolutely must be in the SSR HTML.</strong> The query fires after hydration, so the content is missing from the initial HTML source. Search engines and users on slow connections see a blank page until JavaScript loads. Use <code>load()</code> instead for SSR-critical data.</li>
		<li><strong>Use <code>load()</code> for a component-level data need deep in the tree.</strong> You must thread the data through props from the page down to the component, creating prop drilling. A remote <code>query()</code> lets the component fetch its own data without involving the page loader.</li>
		<li><strong>Use <code>command()</code> for a form submission instead of <code>form()</code>.</strong> You lose progressive enhancement. With JavaScript disabled, the form does nothing because commands require JS. The <code>form()</code> pattern works without JavaScript via standard POST.</li>
		<li><strong>Use <code>+server.ts</code> for an internal data fetch that only your own components consume.</strong> You must manually write the fetch call, parse JSON, and type both sides. A remote <code>query()</code> does this automatically with type inference and caching.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit provides six distinct patterns for server-client data flow, and choosing the right one depends on your specific requirements. <code>load()</code> is the stable, proven pattern for SSR page data. Remote <code>query()</code> excels at interactive, component-level fetching with caching and reactivity. Remote <code>form()</code> handles submissions with progressive enhancement. Remote <code>command()</code> covers event-driven mutations. <code>prerender()</code> produces static build-time data. And <code>+server.ts</code> remains essential for public APIs and webhooks.</p>
	<p class="prose">The decision flowchart is straightforward: if you need SSR, start with <code>load()</code>. If it is a form, use <code>form()</code>. If it is a mutation, use <code>command()</code>. If it is interactive data, use <code>query()</code>. If it is a public API, use <code>+server.ts</code>. If it is static, use <code>prerender()</code>. Most applications will use a combination of these patterns across different routes and components.</p>
	<p class="prose">Remember that remote functions are experimental. For production applications, start with <code>load()</code> and form actions from the stable SvelteKit API. Adopt remote functions incrementally as the API matures, using them where their strengths (type safety, caching, component-level fetching) provide the most value.</p>
	<p class="next">That wraps up Module 9B. You now have a complete toolkit for every data-fetching scenario in SvelteKit.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	h2 { margin: 0; font-size: var(--text-lg); }
	.table-wrap { overflow-x: auto; }
	table { inline-size: 100%; border-collapse: collapse; font-size: var(--text-sm); }
	th, td { padding: var(--space-sm); text-align: left; border-block-end: 1px solid var(--color-border); }
	th { font-weight: 600; background: var(--color-surface-2); position: sticky; inset-block-start: 0; }
	td { color: var(--color-text-muted); }
	.flow { display: flex; flex-direction: column; gap: 0; }
	.flow-step {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs);
	}
	.flow-question { display: flex; align-items: center; gap: var(--space-sm); font-weight: 500; }
	.flow-num {
		display: inline-flex; align-items: center; justify-content: center;
		inline-size: 1.5rem; block-size: 1.5rem; border-radius: 50%;
		background: var(--color-border); font-size: var(--text-sm); font-weight: 700;
		flex-shrink: 0;
	}
	.flow-answers { display: flex; gap: var(--space-md); font-size: var(--text-sm); padding-inline-start: 2.2rem; }
	.flow-yes { color: oklch(60% 0.15 145); }
	.flow-no { color: var(--color-text-muted); }
	.flow-connector {
		inline-size: 2px; block-size: var(--space-sm); background: var(--color-border);
		margin-inline-start: 1.4rem;
	}
	.rules { display: flex; flex-direction: column; gap: var(--space-sm); }
	.rule {
		padding: var(--space-sm) var(--space-md); background: var(--color-surface-2);
		border-radius: var(--radius-md); font-size: var(--text-sm);
		color: var(--color-text-muted); line-height: 1.6;
	}
	.rule strong { color: var(--color-text); }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
