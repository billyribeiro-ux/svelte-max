<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { SvelteMap, MediaQuery } from 'svelte/reactivity';

	interface Metric {
		id: string;
		label: string;
		value: number;
		target: number;
		unit: string;
	}

	interface Activity {
		id: number;
		text: string;
		at: Date;
	}

	const STORAGE_KEY = 'svelte-max:module-2:dashboard';

	const initialMetrics: Metric[] = [
		{ id: 'req', label: 'Requests served', value: 18420, target: 20000, unit: 'req' },
		{ id: 'users', label: 'Active users', value: 642, target: 800, unit: 'users' },
		{ id: 'errors', label: 'Error rate', value: 17, target: 25, unit: 'err/min' },
		{ id: 'latency', label: 'P95 latency', value: 142, target: 200, unit: 'ms' }
	];

	const initialActivities: Activity[] = [
		{ id: 1, text: 'Deployment v2.4.0 shipped to production', at: new Date(Date.now() - 60_000) },
		{
			id: 2,
			text: 'New signup from hello@studio.example',
			at: new Date(Date.now() - 120_000)
		},
		{ id: 3, text: 'Cache hit ratio climbed to 94%', at: new Date(Date.now() - 240_000) },
		{ id: 4, text: 'Scheduled backup completed', at: new Date(Date.now() - 360_000) },
		{ id: 5, text: 'Feature flag "onboarding-v3" enabled for 10%', at: new Date(Date.now() - 480_000) }
	];

	const activityMessages: string[] = [
		'New user signed up from the marketing site',
		'Edge cache warmed in eu-west',
		'Background job finished in 820ms',
		'Webhook delivered to integration partner',
		'Rate limiter released a throttled client',
		'Health check passed on all regions',
		'A/B test bucket rebalanced',
		'Daily email digest queued',
		'Analytics batch flushed to warehouse',
		'New comment posted on thread #481'
	];

	let metrics = $state<Metric[]>(initialMetrics.map((m) => ({ ...m })));

	// SvelteMap: reactive Map. Mutations trigger re-renders of readers.
	const activities = new SvelteMap<number, Activity>();
	for (const a of initialActivities) activities.set(a.id, a);

	let query = $state('');
	let paused = $state(false);

	// MediaQuery is SSR-safe — returns a fallback during SSR, real value in browser.
	const isWide = new MediaQuery('(min-width: 768px)');

	// $derived.by for multi-field computations.
	const totals = $derived.by(() => {
		const totalProgress = metrics.reduce((sum, m) => sum + m.value / m.target, 0);
		const avgProgress = metrics.length > 0 ? (totalProgress / metrics.length) * 100 : 0;
		const overTarget = metrics.filter((m) => m.value >= m.target).length;
		return {
			avgProgress: Math.round(avgProgress),
			overTarget,
			count: metrics.length
		};
	});

	// Reactive search over the live Map. Newest first.
	const filteredActivities = $derived(
		[...activities.values()]
			.filter((a) => a.text.toLowerCase().includes(query.toLowerCase()))
			.sort((a, b) => b.at.getTime() - a.at.getTime())
	);

	// Restore saved snapshot on mount. $effect only runs in the browser, so
	// `localStorage` access is inherently safe here.
	$effect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw) as { metrics?: Metric[] };
			if (Array.isArray(parsed.metrics)) {
				metrics = parsed.metrics;
			}
		} catch {
			// Corrupt storage — leave defaults in place.
		}
	});

	// Persist metrics to localStorage whenever they change. $state.snapshot
	// converts the proxy into a plain cloneable value for JSON.stringify.
	$effect(() => {
		const snapshot = $state.snapshot({ metrics });
		localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
	});

	// Interval that streams new activities in — with cleanup. Respects the
	// pause toggle by early-returning inside the tick callback.
	$effect(() => {
		const id = window.setInterval(() => {
			if (paused) return;
			const now = Date.now();
			const text = activityMessages[Math.floor(Math.random() * activityMessages.length)];
			activities.set(now, { id: now, text, at: new Date(now) });
			// Cap the map so it doesn't grow forever.
			if (activities.size > 40) {
				const oldest = [...activities.keys()].sort((a, b) => a - b)[0];
				activities.delete(oldest);
			}
		}, 5000);

		return () => window.clearInterval(id);
	});

	function bumpMetric(id: string, delta: number): void {
		metrics = metrics.map((m) => (m.id === id ? { ...m, value: Math.max(0, m.value + delta) } : m));
	}

	function clearActivities(): void {
		activities.clear();
	}

	function resetAll(): void {
		metrics = initialMetrics.map((m) => ({ ...m }));
		activities.clear();
		for (const a of initialActivities) activities.set(a.id, a);
		query = '';
		paused = false;
		localStorage.removeItem(STORAGE_KEY);
	}

	function formatTime(d: Date): string {
		return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	}

	function percent(m: Metric): number {
		return Math.min(100, Math.round((m.value / m.target) * 100));
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { SvelteMap, MediaQuery } from 'svelte/reactivity';\n" +
		"\n" +
		"\tinterface Metric {\n" +
		"\t\tid: string;\n" +
		"\t\tlabel: string;\n" +
		"\t\tvalue: number;\n" +
		"\t\ttarget: number;\n" +
		"\t\tunit: string;\n" +
		"\t}\n" +
		"\n" +
		"\tinterface Activity {\n" +
		"\t\tid: number;\n" +
		"\t\ttext: string;\n" +
		"\t\tat: Date;\n" +
		"\t}\n" +
		"\n" +
		"\tconst STORAGE_KEY = 'svelte-max:module-2:dashboard';\n" +
		"\n" +
		"\tconst initialMetrics: Metric[] = [\n" +
		"\t\t{ id: 'req', label: 'Requests served', value: 18420, target: 20000, unit: 'req' },\n" +
		"\t\t{ id: 'users', label: 'Active users', value: 642, target: 800, unit: 'users' },\n" +
		"\t\t{ id: 'errors', label: 'Error rate', value: 17, target: 25, unit: 'err/min' },\n" +
		"\t\t{ id: 'latency', label: 'P95 latency', value: 142, target: 200, unit: 'ms' }\n" +
		"\t];\n" +
		"\n" +
		"\tconst initialActivities: Activity[] = [\n" +
		"\t\t{ id: 1, text: 'Deployment v2.4.0 shipped to production', at: new Date(Date.now() - 60_000) },\n" +
		"\t\t{\n" +
		"\t\t\tid: 2,\n" +
		"\t\t\ttext: 'New signup from hello@studio.example',\n" +
		"\t\t\tat: new Date(Date.now() - 120_000)\n" +
		"\t\t},\n" +
		"\t\t{ id: 3, text: 'Cache hit ratio climbed to 94%', at: new Date(Date.now() - 240_000) },\n" +
		"\t\t{ id: 4, text: 'Scheduled backup completed', at: new Date(Date.now() - 360_000) },\n" +
		"\t\t{ id: 5, text: 'Feature flag \"onboarding-v3\" enabled for 10%', at: new Date(Date.now() - 480_000) }\n" +
		"\t];\n" +
		"\n" +
		"\tconst activityMessages: string[] = [\n" +
		"\t\t'New user signed up from the marketing site',\n" +
		"\t\t'Edge cache warmed in eu-west',\n" +
		"\t\t'Background job finished in 820ms',\n" +
		"\t\t'Webhook delivered to integration partner',\n" +
		"\t\t'Rate limiter released a throttled client',\n" +
		"\t\t'Health check passed on all regions',\n" +
		"\t\t'A/B test bucket rebalanced',\n" +
		"\t\t'Daily email digest queued',\n" +
		"\t\t'Analytics batch flushed to warehouse',\n" +
		"\t\t'New comment posted on thread #481'\n" +
		"\t];\n" +
		"\n" +
		"\tlet metrics = $state\u003cMetric[]\u003e(initialMetrics.map((m) =\u003e ({ ...m })));\n" +
		"\n" +
		"\t// SvelteMap: reactive Map. Mutations trigger re-renders of readers.\n" +
		"\tconst activities = new SvelteMap\u003cnumber, Activity\u003e();\n" +
		"\tfor (const a of initialActivities) activities.set(a.id, a);\n" +
		"\n" +
		"\tlet query = $state('');\n" +
		"\tlet paused = $state(false);\n" +
		"\n" +
		"\t// MediaQuery is SSR-safe — returns a fallback during SSR, real value in browser.\n" +
		"\tconst isWide = new MediaQuery('(min-width: 768px)');\n" +
		"\n" +
		"\t// $derived.by for multi-field computations.\n" +
		"\tconst totals = $derived.by(() =\u003e {\n" +
		"\t\tconst totalProgress = metrics.reduce((sum, m) =\u003e sum + m.value / m.target, 0);\n" +
		"\t\tconst avgProgress = metrics.length \u003e 0 ? (totalProgress / metrics.length) * 100 : 0;\n" +
		"\t\tconst overTarget = metrics.filter((m) =\u003e m.value \u003e= m.target).length;\n" +
		"\t\treturn {\n" +
		"\t\t\tavgProgress: Math.round(avgProgress),\n" +
		"\t\t\toverTarget,\n" +
		"\t\t\tcount: metrics.length\n" +
		"\t\t};\n" +
		"\t});\n" +
		"\n" +
		"\t// Reactive search over the live Map. Newest first.\n" +
		"\tconst filteredActivities = $derived(\n" +
		"\t\t[...activities.values()]\n" +
		"\t\t\t.filter((a) =\u003e a.text.toLowerCase().includes(query.toLowerCase()))\n" +
		"\t\t\t.sort((a, b) =\u003e b.at.getTime() - a.at.getTime())\n" +
		"\t);\n" +
		"\n" +
		"\t// Restore saved snapshot on mount. $effect only runs in the browser, so\n" +
		"\t// `localStorage` access is inherently safe here.\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\ttry {\n" +
		"\t\t\tconst raw = localStorage.getItem(STORAGE_KEY);\n" +
		"\t\t\tif (!raw) return;\n" +
		"\t\t\tconst parsed = JSON.parse(raw) as { metrics?: Metric[] };\n" +
		"\t\t\tif (Array.isArray(parsed.metrics)) {\n" +
		"\t\t\t\tmetrics = parsed.metrics;\n" +
		"\t\t\t}\n" +
		"\t\t} catch {\n" +
		"\t\t\t// Corrupt storage — leave defaults in place.\n" +
		"\t\t}\n" +
		"\t});\n" +
		"\n" +
		"\t// Persist metrics to localStorage whenever they change. $state.snapshot\n" +
		"\t// converts the proxy into a plain cloneable value for JSON.stringify.\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tconst snapshot = $state.snapshot({ metrics });\n" +
		"\t\tlocalStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));\n" +
		"\t});\n" +
		"\n" +
		"\t// Interval that streams new activities in — with cleanup. Respects the\n" +
		"\t// pause toggle by early-returning inside the tick callback.\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tconst id = window.setInterval(() =\u003e {\n" +
		"\t\t\tif (paused) return;\n" +
		"\t\t\tconst now = Date.now();\n" +
		"\t\t\tconst text = activityMessages[Math.floor(Math.random() * activityMessages.length)];\n" +
		"\t\t\tactivities.set(now, { id: now, text, at: new Date(now) });\n" +
		"\t\t\t// Cap the map so it doesn't grow forever.\n" +
		"\t\t\tif (activities.size \u003e 40) {\n" +
		"\t\t\t\tconst oldest = [...activities.keys()].sort((a, b) =\u003e a - b)[0];\n" +
		"\t\t\t\tactivities.delete(oldest);\n" +
		"\t\t\t}\n" +
		"\t\t}, 5000);\n" +
		"\n" +
		"\t\treturn () =\u003e window.clearInterval(id);\n" +
		"\t});\n" +
		"\n" +
		"\tfunction bumpMetric(id: string, delta: number): void {\n" +
		"\t\tmetrics = metrics.map((m) =\u003e (m.id === id ? { ...m, value: Math.max(0, m.value + delta) } : m));\n" +
		"\t}\n" +
		"\n" +
		"\tfunction clearActivities(): void {\n" +
		"\t\tactivities.clear();\n" +
		"\t}\n" +
		"\n" +
		"\tfunction resetAll(): void {\n" +
		"\t\tmetrics = initialMetrics.map((m) =\u003e ({ ...m }));\n" +
		"\t\tactivities.clear();\n" +
		"\t\tfor (const a of initialActivities) activities.set(a.id, a);\n" +
		"\t\tquery = '';\n" +
		"\t\tpaused = false;\n" +
		"\t\tlocalStorage.removeItem(STORAGE_KEY);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction formatTime(d: Date): string {\n" +
		"\t\treturn d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });\n" +
		"\t}\n" +
		"\n" +
		"\tfunction percent(m: Metric): number {\n" +
		"\t\treturn Math.min(100, Math.round((m.value / m.target) * 100));\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003c!--\n" +
		"\t\tPer-page color personality. Overriding --color-brand on a root class\n" +
		"\t\tscoped to this component gives the dashboard an amber identity without\n" +
		"\t\taffecting any other page. This foreshadows Module 6.9 where we use the\n" +
		"\t\tsame pattern at route-group scale.\n" +
		"\t--\u003e\n" +
		"\t\u003cdiv class=\"dashboard\"\u003e\n" +
		"\t\t\u003ch1\u003eModule 2 Project — Interactive Dashboard\u003c/h1\u003e\n" +
		"\n" +
		"\t\t\u003cheader class=\"topbar\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"summary\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"summary-label\"\u003eAverage progress\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"summary-value\"\u003e{totals.avgProgress}%\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"summary-sub\"\u003e\n" +
		"\t\t\t\t\t{totals.overTarget} / {totals.count} metrics at or above target\n" +
		"\t\t\t\t\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"ghost\" onclick={resetAll}\u003eReset dashboard\u003c/button\u003e\n" +
		"\t\t\u003c/header\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class={['layout', { wide: isWide.current }]}\u003e\n" +
		"\t\t\t\u003csection class=\"metrics\" aria-label=\"Metrics\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003eMetrics\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"metric-grid\"\u003e\n" +
		"\t\t\t\t\t{#each metrics as m (m.id)}\n" +
		"\t\t\t\t\t\t\u003carticle class=\"metric\"\u003e\n" +
		"\t\t\t\t\t\t\t\u003cheader class=\"metric-head\"\u003e\n" +
		"\t\t\t\t\t\t\t\t\u003cspan class=\"metric-label\"\u003e{m.label}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t\t\u003cspan class=\"metric-pct\" class:over={m.value \u003e= m.target}\u003e\n" +
		"\t\t\t\t\t\t\t\t\t{percent(m)}%\n" +
		"\t\t\t\t\t\t\t\t\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t\u003c/header\u003e\n" +
		"\t\t\t\t\t\t\t\u003cdiv class=\"metric-value\"\u003e\n" +
		"\t\t\t\t\t\t\t\t{m.value.toLocaleString()}\n" +
		"\t\t\t\t\t\t\t\t\u003cspan class=\"metric-unit\"\u003e{m.unit}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\t\u003cdiv class=\"metric-target\"\u003etarget {m.target.toLocaleString()} {m.unit}\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\t\u003cdiv class=\"bar\" aria-hidden=\"true\"\u003e\n" +
		"\t\t\t\t\t\t\t\t\u003cdiv class=\"fill\" style:width=\"{percent(m)}%\"\u003e\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\t\u003cdiv class=\"metric-actions\"\u003e\n" +
		"\t\t\t\t\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\t\t\t\t\taria-label=\"Decrease {m.label} by 10\"\n" +
		"\t\t\t\t\t\t\t\t\tonclick={() =\u003e bumpMetric(m.id, -10)}\u003e−10\u003c/button\n" +
		"\t\t\t\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\t\t\t\t\taria-label=\"Increase {m.label} by 10\"\n" +
		"\t\t\t\t\t\t\t\t\tonclick={() =\u003e bumpMetric(m.id, 10)}\u003e+10\u003c/button\n" +
		"\t\t\t\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\u003c/article\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/section\u003e\n" +
		"\n" +
		"\t\t\t\u003csection class=\"feed\" aria-label=\"Activity feed\"\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"feed-head\"\u003e\n" +
		"\t\t\t\t\t\u003ch2\u003eActivity\u003c/h2\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"feed-controls\"\u003e\n" +
		"\t\t\t\t\t\t\u003clabel class=\"toggle\"\u003e\n" +
		"\t\t\t\t\t\t\t\u003cinput type=\"checkbox\" bind:checked={paused} /\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan\u003e{paused ? 'Feed paused' : 'Pause feed'}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"ghost small\" onclick={clearActivities}\u003eClear\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\ttype=\"search\"\n" +
		"\t\t\t\t\tclass=\"search\"\n" +
		"\t\t\t\t\tplaceholder=\"Filter activities…\"\n" +
		"\t\t\t\t\tbind:value={query}\n" +
		"\t\t\t\t/\u003e\n" +
		"\t\t\t\t\u003cul class=\"feed-list\"\u003e\n" +
		"\t\t\t\t\t{#each filteredActivities as a (a.id)}\n" +
		"\t\t\t\t\t\t\u003cli class=\"feed-item\"\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan class=\"time\"\u003e{formatTime(a.at)}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan class=\"text\"\u003e{a.text}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\t\t{:else}\n" +
		"\t\t\t\t\t\t\u003cli class=\"empty\"\u003eNo activities match your filter.\u003c/li\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/ul\u003e\n" +
		"\t\t\t\u003c/section\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cfooter class=\"built\"\u003e\n" +
		"\t\t\t\u003ch3\u003eBuilt with\u003c/h3\u003e\n" +
		"\t\t\t\u003cul\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003e$state\u003c/code\u003e for typed reactive metrics and UI toggles\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003e$derived.by\u003c/code\u003e for multi-field totals computation\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003e$derived\u003c/code\u003e for the filtered, sorted activity list\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e with cleanup — streaming activity interval\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e syncing metrics to \u003ccode\u003elocalStorage\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003e$state.snapshot\u003c/code\u003e for cloneable persistence payloads\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003eSvelteMap\u003c/code\u003e as the reactive activity store\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003ccode\u003eMediaQuery\u003c/code\u003e from \u003ccode\u003esvelte/reactivity\u003c/code\u003e for layout switching\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003eClass object binding \u003ccode\u003e{'{ wide: isWide.current }'}\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003ePer-page OKLCH color personality on the \u003ccode\u003e.dashboard\u003c/code\u003e root\u003c/li\u003e\n" +
		"\t\t\t\u003c/ul\u003e\n" +
		"\t\t\u003c/footer\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<!--
		Per-page color personality. Overriding --color-brand on a root class
		scoped to this component gives the dashboard an amber identity without
		affecting any other page. This foreshadows Module 6.9 where we use the
		same pattern at route-group scale.
	-->
	<div class="dashboard">
		<h1>Module 2 Project — Interactive Dashboard</h1>

		<header class="topbar">
			<div class="summary">
				<span class="summary-label">Average progress</span>
				<span class="summary-value">{totals.avgProgress}%</span>
				<span class="summary-sub">
					{totals.overTarget} / {totals.count} metrics at or above target
				</span>
			</div>
			<button type="button" class="ghost" onclick={resetAll}>Reset dashboard</button>
		</header>

		<div class={['layout', { wide: isWide.current }]}>
			<section class="metrics" aria-label="Metrics">
				<h2>Metrics</h2>
				<div class="metric-grid">
					{#each metrics as m (m.id)}
						<article class="metric">
							<header class="metric-head">
								<span class="metric-label">{m.label}</span>
								<span class="metric-pct" class:over={m.value >= m.target}>
									{percent(m)}%
								</span>
							</header>
							<div class="metric-value">
								{m.value.toLocaleString()}
								<span class="metric-unit">{m.unit}</span>
							</div>
							<div class="metric-target">target {m.target.toLocaleString()} {m.unit}</div>
							<div class="bar" aria-hidden="true">
								<div class="fill" style:width="{percent(m)}%"></div>
							</div>
							<div class="metric-actions">
								<button
									type="button"
									aria-label="Decrease {m.label} by 10"
									onclick={() => bumpMetric(m.id, -10)}>−10</button
								>
								<button
									type="button"
									aria-label="Increase {m.label} by 10"
									onclick={() => bumpMetric(m.id, 10)}>+10</button
								>
							</div>
						</article>
					{/each}
				</div>
			</section>

			<section class="feed" aria-label="Activity feed">
				<div class="feed-head">
					<h2>Activity</h2>
					<div class="feed-controls">
						<label class="toggle">
							<input type="checkbox" bind:checked={paused} />
							<span>{paused ? 'Feed paused' : 'Pause feed'}</span>
						</label>
						<button type="button" class="ghost small" onclick={clearActivities}>Clear</button>
					</div>
				</div>
				<input
					type="search"
					class="search"
					placeholder="Filter activities…"
					bind:value={query}
				/>
				<ul class="feed-list">
					{#each filteredActivities as a (a.id)}
						<li class="feed-item">
							<span class="time">{formatTime(a.at)}</span>
							<span class="text">{a.text}</span>
						</li>
					{:else}
						<li class="empty">No activities match your filter.</li>
					{/each}
				</ul>
			</section>
		</div>

		<footer class="built">
			<h3>Built with</h3>
			<ul>
				<li><code>$state</code> for typed reactive metrics and UI toggles</li>
				<li><code>$derived.by</code> for multi-field totals computation</li>
				<li><code>$derived</code> for the filtered, sorted activity list</li>
				<li><code>$effect</code> with cleanup — streaming activity interval</li>
				<li><code>$effect</code> syncing metrics to <code>localStorage</code></li>
				<li><code>$state.snapshot</code> for cloneable persistence payloads</li>
				<li><code>SvelteMap</code> as the reactive activity store</li>
				<li><code>MediaQuery</code> from <code>svelte/reactivity</code> for layout switching</li>
				<li>Class object binding <code>{'{ wide: isWide.current }'}</code></li>
				<li>Per-page OKLCH color personality on the <code>.dashboard</code> root</li>
			</ul>
		</footer>
	</div>
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	/*
		Per-page personality: every descendant that reads --color-brand via
		var() now gets amber. Scoped to .dashboard so it never leaks.
	*/
	.dashboard {
		--color-brand: oklch(72% 0.18 60);
		--color-brand-dim: oklch(62% 0.15 60);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	h1 {
		color: var(--color-text);
	}

	.topbar {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: flex-start;
		justify-content: space-between;
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	@media (min-width: 768px) {
		.topbar {
			flex-direction: row;
			align-items: center;
		}
	}

	.summary {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.summary-label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.summary-value {
		font-size: var(--text-2xl);
		font-weight: 800;
		color: var(--color-brand);
		font-family: var(--font-mono);
	}

	.summary-sub {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
	}

	.layout.wide {
		grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
	}

	h2 {
		font-size: var(--text-lg);
		margin-block-end: var(--space-md);
	}

	.metric-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	@media (min-width: 480px) {
		.metric-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.metric-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.metric {
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-shadow: var(--shadow-sm);
		transition: transform var(--dur-fast) var(--ease-spring);
	}

	.metric:hover {
		transform: translateY(-2px);
	}

	.metric-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-sm);
	}

	.metric-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.metric-pct {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.metric-pct.over {
		color: var(--color-success);
	}

	.metric-value {
		font-size: var(--text-xl);
		font-weight: 800;
		font-family: var(--font-mono);
		color: var(--color-text);
	}

	.metric-unit {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-inline-start: var(--space-xs);
	}

	.metric-target {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.bar {
		block-size: 0.4rem;
		background: var(--color-surface-2);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.fill {
		block-size: 100%;
		background: var(--color-brand);
		transition: width var(--dur-base) var(--ease-out);
	}

	.metric-actions {
		display: flex;
		gap: var(--space-xs);
		margin-block-start: var(--space-xs);
	}

	.metric-actions button {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
	}

	.metric-actions button:hover {
		border-color: var(--color-brand);
		color: var(--color-brand);
	}

	.feed {
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.feed-head {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		justify-content: space-between;
	}

	@media (min-width: 480px) {
		.feed-head {
			flex-direction: row;
			align-items: center;
		}
	}

	.feed-head h2 {
		margin: 0;
	}

	.feed-controls {
		display: flex;
		gap: var(--space-sm);
		align-items: center;
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.toggle input {
		accent-color: var(--color-brand);
	}

	.search {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-sm);
	}

	.search:focus-visible {
		border-color: var(--color-brand);
		outline: none;
	}

	.feed-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		max-block-size: 22rem;
		overflow-y: auto;
	}

	.feed-item {
		display: flex;
		gap: var(--space-sm);
		padding: var(--space-sm);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		font-size: var(--text-sm);
		border-inline-start: 3px solid var(--color-brand);
	}

	.feed-item .time {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		flex-shrink: 0;
	}

	.feed-item .text {
		color: var(--color-text);
	}

	.empty {
		padding: var(--space-md);
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-style: italic;
	}

	.ghost {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.ghost:hover {
		border-color: var(--color-brand);
		color: var(--color-brand);
	}

	.ghost.small {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
	}

	.built {
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.built h3 {
		font-size: var(--text-lg);
		margin-block-end: var(--space-md);
	}

	.built ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	@media (min-width: 768px) {
		.built ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.built code {
		font-family: var(--font-mono);
		color: var(--color-brand);
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
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
	}
</style>
