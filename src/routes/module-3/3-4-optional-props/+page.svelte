<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import Badge from '$lib/components/Badge.svelte';

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Badge from '$lib/components/Badge.svelte';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e3.4 — Optional props and defaults\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e A \u003ccode\u003e?\u003c/code\u003e in an \u003ccode\u003einterface\u003c/code\u003e marks a prop as\n" +
		"\t\toptional. In the destructuring, you give it a default:\n" +
		"\t\t\u003ccode\u003elet {'{ tone = \"neutral\", rounded = false }'} = $props()\u003c/code\u003e. This lets consumers\n" +
		"\t\tpass only what matters — the rest falls back to sensible defaults. \u003ccode\u003eBadge\u003c/code\u003e uses\n" +
		"\t\tthis pattern: you rarely need to specify \u003ccode\u003etone\u003c/code\u003e, but when you do it overrides the\n" +
		"\t\tdefault.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"group\"\u003e\n" +
		"\t\t\t\u003cp class=\"label\"\u003eNo props — everything defaulted\u003c/p\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cBadge\u003eDefault\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge\u003eAlso default\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge\u003eAll neutral\u003c/Badge\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cp class=\"annot\"\u003eBoth \u003ccode\u003etone\u003c/code\u003e and \u003ccode\u003erounded\u003c/code\u003e fell back to their defaults.\u003c/p\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"group\"\u003e\n" +
		"\t\t\t\u003cp class=\"label\"\u003eExplicit tones — one prop provided\u003c/p\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"neutral\"\u003eneutral\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"brand\"\u003ebrand\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"success\"\u003esuccess\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"warning\"\u003ewarning\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"error\"\u003eerror\u003c/Badge\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cp class=\"annot\"\u003eOnly \u003ccode\u003etone\u003c/code\u003e was passed; \u003ccode\u003erounded\u003c/code\u003e defaulted to false.\u003c/p\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"group\"\u003e\n" +
		"\t\t\t\u003cp class=\"label\"\u003eBoth props provided\u003c/p\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"brand\" rounded\u003erounded brand\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"success\" rounded\u003erounded success\u003c/Badge\u003e\n" +
		"\t\t\t\t\u003cBadge tone=\"error\" rounded\u003erounded error\u003c/Badge\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cp class=\"annot\"\u003eBoth \u003ccode\u003etone\u003c/code\u003e and \u003ccode\u003erounded\u003c/code\u003e were explicitly overridden.\u003c/p\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e?\u003c/code\u003e in an interface marks a prop as optional.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDefaults live at the destructuring site, not inside the interface.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eConsumers can pass only what matters — the rest falls back automatically.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSensible defaults let a component feel zero-config while still being configurable.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>3.4 — Optional props and defaults</h1>
	<p class="concept">
		<strong>Concept.</strong> A <code>?</code> in an <code>interface</code> marks a prop as
		optional. In the destructuring, you give it a default:
		<code>let {'{ tone = "neutral", rounded = false }'} = $props()</code>. This lets consumers
		pass only what matters — the rest falls back to sensible defaults. <code>Badge</code> uses
		this pattern: you rarely need to specify <code>tone</code>, but when you do it overrides the
		default.
	</p>

	<div class="build">
		<div class="group">
			<p class="label">No props — everything defaulted</p>
			<div class="row">
				<Badge>Default</Badge>
				<Badge>Also default</Badge>
				<Badge>All neutral</Badge>
			</div>
			<p class="annot">Both <code>tone</code> and <code>rounded</code> fell back to their defaults.</p>
		</div>

		<div class="group">
			<p class="label">Explicit tones — one prop provided</p>
			<div class="row">
				<Badge tone="neutral">neutral</Badge>
				<Badge tone="brand">brand</Badge>
				<Badge tone="success">success</Badge>
				<Badge tone="warning">warning</Badge>
				<Badge tone="error">error</Badge>
			</div>
			<p class="annot">Only <code>tone</code> was passed; <code>rounded</code> defaulted to false.</p>
		</div>

		<div class="group">
			<p class="label">Both props provided</p>
			<div class="row">
				<Badge tone="brand" rounded>rounded brand</Badge>
				<Badge tone="success" rounded>rounded success</Badge>
				<Badge tone="error" rounded>rounded error</Badge>
			</div>
			<p class="annot">Both <code>tone</code> and <code>rounded</code> were explicitly overridden.</p>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>?</code> in an interface marks a prop as optional.</li>
		<li>Defaults live at the destructuring site, not inside the interface.</li>
		<li>Consumers can pass only what matters — the rest falls back automatically.</li>
		<li>Sensible defaults let a component feel zero-config while still being configurable.</li>
	</ul>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}

	.concept strong {
		color: var(--color-text);
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
		margin: 0;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}

	.annot {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}

	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
