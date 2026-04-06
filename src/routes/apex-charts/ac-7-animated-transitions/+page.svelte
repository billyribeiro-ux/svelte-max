<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { onMount } from 'svelte';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	let chartContainers: HTMLDivElement[] = $state([]);
	let reducedMotion = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const handler = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
		mq.addEventListener('change', handler);

		if (!reducedMotion) {
			initScrollAnimations();
		}

		return () => mq.removeEventListener('change', handler);
	});

	async function initScrollAnimations(): Promise<void> {
		const gsapModule = await import('gsap');
		const gsap = gsapModule.default;
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		chartContainers.forEach((el, i) => {
			if (!el) return;
			gsap.fromTo(
				el,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					delay: i * 0.15,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: el,
						start: 'top 85%',
						once: true,
					},
				}
			);
		});
	}

	/* ── Chart 1: Animated bar chart ── */
	const barOptions: Record<string, unknown> = {
		chart: {
			type: 'bar',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: {
				enabled: true,
				speed: 800,
				animateGradually: { enabled: true, delay: 120 },
				dynamicAnimation: { enabled: true, speed: 350 },
			},
		},
		series: [{
			name: 'Revenue',
			data: [44, 55, 67, 83, 49, 72, 61, 78, 90, 55, 68, 74],
		}],
		colors: [PE7_COLORS[0]],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			labels: { style: { fontSize: '11px' } },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `$${val}K`,
				style: { fontSize: '11px' },
			},
		},
		plotOptions: {
			bar: { borderRadius: 4, columnWidth: '55%' },
		},
		dataLabels: { enabled: false },
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
			strokeDashArray: 3,
		},
		theme: { mode: 'dark' },
	};

	/* ── Chart 2: Animated line chart ── */
	const lineOptions: Record<string, unknown> = {
		chart: {
			type: 'line',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: {
				enabled: true,
				speed: 1200,
				animateGradually: { enabled: true, delay: 100 },
				dynamicAnimation: { enabled: true, speed: 400 },
			},
		},
		series: [
			{ name: 'Desktop', data: [30, 40, 35, 50, 49, 60, 70, 65, 80, 75, 85, 90] },
			{ name: 'Mobile', data: [20, 25, 30, 35, 40, 50, 55, 60, 58, 65, 70, 78] },
		],
		colors: [PE7_COLORS[1], PE7_COLORS[2]],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			labels: { style: { fontSize: '11px' } },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `${val}K`,
				style: { fontSize: '11px' },
			},
		},
		stroke: { curve: 'smooth', width: 2.5 },
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
			strokeDashArray: 3,
		},
		theme: { mode: 'dark' },
	};

	/* ── Chart 3: Animated area chart ── */
	const areaOptions: Record<string, unknown> = {
		chart: {
			type: 'area',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: {
				enabled: true,
				speed: 1000,
				animateGradually: { enabled: true, delay: 80 },
				dynamicAnimation: { enabled: true, speed: 400 },
			},
		},
		series: [
			{ name: 'Organic', data: [15, 20, 25, 30, 28, 35, 40, 38, 45, 50, 55, 60] },
			{ name: 'Paid', data: [10, 12, 18, 22, 20, 28, 30, 32, 35, 38, 42, 48] },
			{ name: 'Social', data: [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 35] },
		],
		colors: [PE7_COLORS[4], PE7_COLORS[3], PE7_COLORS[5]],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			labels: { style: { fontSize: '11px' } },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `${val}K`,
				style: { fontSize: '11px' },
			},
		},
		stroke: { curve: 'smooth', width: 2 },
		fill: {
			type: 'gradient',
			gradient: { shadeIntensity: 0.3, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] },
		},
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
			strokeDashArray: 3,
		},
		theme: { mode: 'dark' },
	};

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';
  import { onMount } from 'svelte';

  const PE7_COLORS = ['#7c5cfc','#3ba676','#e8a830','#d94f4f','#5b9bd5','#9b59b6'] as const;

  let chartContainers: HTMLDivElement[] = $state([]);
  let reducedMotion = $state(false);

  onMount(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = mq.matches;
    const handler = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
    mq.addEventListener('change', handler);
    if (!reducedMotion) initScrollAnimations();
    return () => mq.removeEventListener('change', handler);
  });

  async function initScrollAnimations(): Promise<void> {
    const gsapModule = await import('gsap');
    const gsap = gsapModule.default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    chartContainers.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7,
          delay: i * 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });
  }

  const barOptions: Record<string, unknown> = {
    chart: {
      type: 'bar', toolbar: { show: false }, fontFamily: 'inherit',
      background: 'transparent',
      animations: {
        enabled: true, speed: 800,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    series: [{ name: 'Revenue', data: [44,55,67,83,49,72,61,78,90,55,68,74] }],
    colors: ['#7c5cfc'],
    xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    theme: { mode: 'dark' },
  };

  // ... lineOptions and areaOptions follow same pattern
<\/script>

<section class="page">
  <h1>AC.7 — Chart Animation Choreography</h1>
  <div class="build chart-entrance" bind:this={chartContainers[0]}>
    <h4>Monthly Revenue — Animated bars</h4>
    <ApexChart options={barOptions} height="300px" />
  </div>
  <!-- ... additional charts ... -->
</section>`;
</script>

<section class="page">
	<h1>AC.7 — Chart Animation Choreography</h1>

	<p class="concept">
		<strong>Concept.</strong> ApexCharts has built-in animation:
		<code>chart.animations.enabled</code>, <code>animateGradually</code> (bars appear one by one),
		and <code>dynamicAnimation</code> (smooth transitions on data change). For page-level
		choreography, use GSAP to fade in chart containers on scroll, then let ApexCharts handle the
		internal animation. The two animation layers complement each other — GSAP controls
		<em>when</em> the chart appears; ApexCharts controls <em>how</em> the data draws.
		<code>prefersReducedMotion</code> disables GSAP entrance but keeps charts rendered statically.
	</p>

	{#if reducedMotion}
		<p class="motion-note">Reduced motion detected — scroll animations disabled, charts render statically.</p>
	{/if}

	<div
		class="build chart-entrance"
		class:no-motion={reducedMotion}
		bind:this={chartContainers[0]}
	>
		<h4>Monthly Revenue — Animated bars (animateGradually)</h4>
		<ApexChart options={barOptions} height="300px" />
	</div>

	<div
		class="build chart-entrance"
		class:no-motion={reducedMotion}
		bind:this={chartContainers[1]}
	>
		<h4>Traffic Trends — Line animation (two series)</h4>
		<ApexChart options={lineOptions} height="300px" />
	</div>

	<div
		class="build chart-entrance"
		class:no-motion={reducedMotion}
		bind:this={chartContainers[2]}
	>
		<h4>Traffic Sources — Stacked area with gradient fill</h4>
		<ApexChart options={areaOptions} height="300px" />
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>animateGradually</code> staggers bar/column rendering — each bar appears with a delay.</li>
		<li><code>dynamicAnimation</code> smoothly transitions when data changes (e.g., filtering).</li>
		<li>GSAP <code>ScrollTrigger</code> controls <em>when</em> the chart container becomes visible.</li>
		<li>Two animation layers: GSAP for entrance, ApexCharts for internal data drawing.</li>
		<li><code>prefers-reduced-motion</code> should disable GSAP transitions while keeping charts readable.</li>
	</ul>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;

		& strong { color: var(--color-text); }
		& em { font-style: italic; }
	}

	h1 {
		text-wrap: balance;
	}

	h3 {
		text-wrap: balance;
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}

	h4 {
		text-wrap: balance;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding-inline: var(--space-xs);
		border-radius: var(--radius-xs);
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
		margin-block: var(--space-lg);
	}

	.chart-entrance {
		opacity: 0;
		transform: translateY(40px);
		transition: none;

		&.no-motion {
			opacity: 1;
			transform: none;
		}
	}

	.motion-note {
		font-size: var(--text-sm);
		color: var(--color-warning);
		font-weight: 600;
		margin: 0;
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

	/* ── Having issues ── */
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

	/* ── Responsive ── */
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
