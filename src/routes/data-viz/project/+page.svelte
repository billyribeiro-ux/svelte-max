<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// ── Temperature anomaly data (°C relative to 1901–2000 average) ──
	interface TempPoint { decade: string; year: number; anomaly: number; }
	const tempData: TempPoint[] = [
		{ decade: '1900s', year: 1900, anomaly: -0.08 },
		{ decade: '1910s', year: 1910, anomaly: -0.27 },
		{ decade: '1920s', year: 1920, anomaly: -0.18 },
		{ decade: '1930s', year: 1930, anomaly: -0.03 },
		{ decade: '1940s', year: 1940, anomaly: 0.10 },
		{ decade: '1950s', year: 1950, anomaly: -0.01 },
		{ decade: '1960s', year: 1960, anomaly: 0.02 },
		{ decade: '1970s', year: 1970, anomaly: 0.0 },
		{ decade: '1980s', year: 1980, anomaly: 0.26 },
		{ decade: '1990s', year: 1990, anomaly: 0.46 },
		{ decade: '2000s', year: 2000, anomaly: 0.63 },
		{ decade: '2010s', year: 2010, anomaly: 0.91 },
		{ decade: '2020s', year: 2020, anomaly: 1.28 }
	];

	// ── CO2 concentration data (ppm, Mauna Loa / ice core) ──
	interface CO2Point { year: number; ppm: number; }
	const co2Data: CO2Point[] = [
		{ year: 1960, ppm: 317 }, { year: 1965, ppm: 320 }, { year: 1970, ppm: 326 },
		{ year: 1975, ppm: 331 }, { year: 1980, ppm: 339 }, { year: 1985, ppm: 346 },
		{ year: 1990, ppm: 354 }, { year: 1995, ppm: 361 }, { year: 2000, ppm: 370 },
		{ year: 2005, ppm: 380 }, { year: 2010, ppm: 390 }, { year: 2015, ppm: 401 },
		{ year: 2024, ppm: 425 }
	];

	// ── Sea level rise (mm/year) ──
	interface SeaPoint { period: string; rate: number; }
	const seaData: SeaPoint[] = [
		{ period: '1993-96', rate: 2.2 }, { period: '1997-00', rate: 2.5 },
		{ period: '2001-04', rate: 2.8 }, { period: '2005-08', rate: 3.1 },
		{ period: '2009-12', rate: 3.4 }, { period: '2013-16', rate: 3.6 },
		{ period: '2017-20', rate: 4.1 }, { period: '2021-24', rate: 4.7 }
	];

	// ── Renewable energy share (%) ──
	interface RenewPoint { year: number; solar: number; wind: number; hydro: number; other: number; }
	const renewData: RenewPoint[] = [
		{ year: 2010, solar: 0.3, wind: 1.7, hydro: 16.0, other: 1.8 },
		{ year: 2011, solar: 0.5, wind: 2.0, hydro: 15.8, other: 1.9 },
		{ year: 2012, solar: 0.7, wind: 2.4, hydro: 16.2, other: 2.0 },
		{ year: 2013, solar: 0.9, wind: 2.7, hydro: 16.3, other: 2.1 },
		{ year: 2014, solar: 1.1, wind: 3.1, hydro: 16.4, other: 2.2 },
		{ year: 2015, solar: 1.3, wind: 3.5, hydro: 16.0, other: 2.3 },
		{ year: 2016, solar: 1.6, wind: 3.8, hydro: 16.2, other: 2.3 },
		{ year: 2017, solar: 1.9, wind: 4.4, hydro: 15.9, other: 2.4 },
		{ year: 2018, solar: 2.4, wind: 4.8, hydro: 15.7, other: 2.5 },
		{ year: 2019, solar: 2.8, wind: 5.3, hydro: 15.5, other: 2.6 },
		{ year: 2020, solar: 3.3, wind: 5.9, hydro: 16.0, other: 2.6 },
		{ year: 2021, solar: 3.8, wind: 6.6, hydro: 15.3, other: 2.7 },
		{ year: 2022, solar: 4.5, wind: 7.3, hydro: 14.9, other: 2.8 },
		{ year: 2023, solar: 5.5, wind: 7.8, hydro: 14.7, other: 2.8 },
		{ year: 2024, solar: 6.5, wind: 8.5, hydro: 14.8, other: 2.9 }
	];

	const renewSources = ['solar', 'wind', 'hydro', 'other'] as const;
	type RenewSource = (typeof renewSources)[number];
	const renewColors: Record<RenewSource, string> = {
		solar: 'oklch(75% 0.18 85)',
		wind: 'oklch(60% 0.18 200)',
		hydro: 'oklch(55% 0.15 250)',
		other: 'oklch(55% 0.12 145)'
	};
	const renewLabels: Record<RenewSource, string> = {
		solar: 'Solar', wind: 'Wind', hydro: 'Hydro', other: 'Other'
	};

	// ── Responsive widths ──
	let tempW = $state(0);
	let co2W = $state(0);
	let seaW = $state(0);
	let renewW = $state(0);

	// ── Tooltip state ──
	interface TooltipState { x: number; y: number; content: string; }
	let tooltip = $state<TooltipState | null>(null);
	// ── Year range for Tween-driven animation ──
	let yearSlider = $state(2024);
	const yearTween = new Tween(2024, { duration: 500, easing: cubicOut });

	$effect(() => {
		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;
		yearTween.set(yearSlider, opts);
	});

	const currentYear = $derived(Math.round(yearTween.current));

	// ── Chart helpers ──
	const chH = 220;
	const pad = { top: 24, right: 16, bottom: 36, left: 48 };

	function lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	// ── Temperature chart ──
	const filteredTemp = $derived(tempData.filter((d) => d.year <= currentYear));

	function tempPath(w: number): string {
		const pw = w - pad.left - pad.right;
		const ph = chH - pad.top - pad.bottom;
		const pts = filteredTemp;
		if (pts.length < 2) return '';
		const xMin = 1900; const xMax = 2020;
		const yMin = -0.4; const yMax = 1.6;
		return pts.map((p, i) => {
			const x = ((p.year - xMin) / (xMax - xMin)) * pw;
			const y = ph - ((p.anomaly - yMin) / (yMax - yMin)) * ph;
			return `${i === 0 ? 'M' : 'L'}${x},${y}`;
		}).join(' ');
	}

	function tempAreaPath(w: number): string {
		const pw = w - pad.left - pad.right;
		const ph = chH - pad.top - pad.bottom;
		const pts = filteredTemp;
		if (pts.length < 2) return '';
		const xMin = 1900; const xMax = 2020;
		const yMin = -0.4; const yMax = 1.6;
		const line = pts.map((p) => {
			const x = ((p.year - xMin) / (xMax - xMin)) * pw;
			const y = ph - ((p.anomaly - yMin) / (yMax - yMin)) * ph;
			return `${x},${y}`;
		});
		const firstX = ((pts[0].year - xMin) / (xMax - xMin)) * pw;
		const lastX = ((pts[pts.length - 1].year - xMin) / (xMax - xMin)) * pw;
		const baseY = ph - ((0 - yMin) / (yMax - yMin)) * ph;
		return `M${firstX},${baseY} L${line.join(' L')} L${lastX},${baseY} Z`;
	}

	// Color for temperature anomaly
	function tempHue(anomaly: number): string {
		// Blue (250) for negative, red (25) for positive, interpolate
		const t = Math.max(0, Math.min(1, (anomaly + 0.3) / 1.6));
		const hue = lerp(250, 25, t);
		const chroma = lerp(0.08, 0.2, t);
		return `oklch(55% ${chroma.toFixed(2)} ${hue.toFixed(0)})`;
	}

	// ── CO2 chart ──
	const filteredCO2 = $derived(co2Data.filter((d) => d.year <= currentYear));

	function co2Path(w: number): string {
		const pw = w - pad.left - pad.right;
		const ph = chH - pad.top - pad.bottom;
		const pts = filteredCO2;
		if (pts.length < 2) return '';
		const xMin = 1960; const xMax = 2024;
		const yMin = 310; const yMax = 440;
		return pts.map((p, i) => {
			const x = ((p.year - xMin) / (xMax - xMin)) * pw;
			const y = ph - ((p.ppm - yMin) / (yMax - yMin)) * ph;
			return `${i === 0 ? 'M' : 'L'}${x},${y}`;
		}).join(' ');
	}

	// ── Sea level chart ──
	const maxRate = Math.max(...seaData.map((d) => d.rate));

	// ── Renew stacked bar chart ──
	const filteredRenew = $derived(renewData.filter((d) => d.year <= currentYear));

	function handleTempHover(e: PointerEvent, point: TempPoint): void {
		tooltip = { x: e.clientX, y: e.clientY, content: `${point.decade}: ${point.anomaly > 0 ? '+' : ''}${point.anomaly.toFixed(2)}°C` };

	}

	function handleCO2Hover(e: PointerEvent, point: CO2Point): void {
		tooltip = { x: e.clientX, y: e.clientY, content: `${point.year}: ${point.ppm} ppm` };

	}

	function handleSeaHover(e: PointerEvent, point: SeaPoint): void {
		tooltip = { x: e.clientX, y: e.clientY, content: `${point.period}: ${point.rate} mm/yr` };

	}

	function handleRenewHover(e: PointerEvent, point: RenewPoint): void {
		const total = point.solar + point.wind + point.hydro + point.other;
		tooltip = { x: e.clientX, y: e.clientY, content: `${point.year}: ${total.toFixed(1)}% renewable` };

	}

	function clearTooltip(): void {
		tooltip = null;
	}
</script>

<section class="dashboard">
	<header class="header">
		<h1>Data Viz Project — Climate Dashboard</h1>
		<p class="subtitle">
			Four dimensions of the climate crisis — temperature, CO2, sea level, and renewable energy — visualized with pure SVG, reactive data, and smooth animation.
		</p>
	</header>

	<div class="controls">
		<label class="year-control">
			<span class="year-label">Data through:</span>
			<input type="range" min={1960} max={2024} step={1} bind:value={yearSlider} class="slider" />
			<span class="year-value">{currentYear}</span>
		</label>
	</div>

	<div class="grid">

		<!-- ═══ Temperature Anomaly ═══ -->
		<article class="card" bind:clientWidth={tempW}>
			<h2 class="card-title">Global Temperature Anomaly</h2>
			<p class="card-sub">°C relative to 1901–2000 average, by decade</p>
			{#if tempW > 0}
				{@const pw = tempW - pad.left - pad.right}
				{@const ph = chH - pad.top - pad.bottom}
				{@const yMin = -0.4}
				{@const yMax = 1.6}
				<svg
					width={tempW}
					height={chH}
					viewBox="0 0 {tempW} {chH}"
					role="img"
					aria-label="Global temperature anomaly rising from -0.08°C in 1900 to +1.28°C in 2020, exceeding the 1.5°C Paris target trajectory"
					onpointerleave={clearTooltip}
				>
					<desc>Area chart showing global temperature anomaly by decade. Values turn positive in the 1940s and accelerate sharply after the 1980s, reaching +1.28°C by the 2020s.</desc>
					<defs>
						<linearGradient id="temp-grad" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stop-color="oklch(60% 0.15 250)" stop-opacity="0.5" />
							<stop offset="70%" stop-color="oklch(60% 0.15 25)" stop-opacity="0.5" />
							<stop offset="100%" stop-color="oklch(55% 0.2 25)" stop-opacity="0.7" />
						</linearGradient>
					</defs>
					<g transform="translate({pad.left}, {pad.top})">
						<!-- Y grid -->
						<g aria-hidden="true">
							{#each [-0.4, 0, 0.4, 0.8, 1.2, 1.6] as val}
								{@const y = ph - ((val - yMin) / (yMax - yMin)) * ph}
								<line x1={0} y1={y} x2={pw} y2={y} stroke="var(--color-border)" stroke-width="0.5" />
								<text x={-6} y={y} text-anchor="end" dominant-baseline="central" fill="var(--color-text-muted)" font-size="9">
									{val > 0 ? '+' : ''}{val.toFixed(1)}
								</text>
							{/each}
						</g>

						<!-- 0°C baseline -->
						<line
							x1={0} y1={ph - ((0 - yMin) / (yMax - yMin)) * ph}
							x2={pw} y2={ph - ((0 - yMin) / (yMax - yMin)) * ph}
							stroke="var(--color-text-muted)" stroke-width="1" opacity="0.6"
							aria-hidden="true"
						/>
						<text
							x={pw + 4} y={ph - ((0 - yMin) / (yMax - yMin)) * ph}
							fill="var(--color-text-muted)" font-size="8" dominant-baseline="central"
							aria-hidden="true"
						>Pre-industrial</text>

						<!-- 1.5°C Paris target -->
						<line
							x1={0} y1={ph - ((1.5 - yMin) / (yMax - yMin)) * ph} x2={pw} y2={ph - ((1.5 - yMin) / (yMax - yMin)) * ph}
							stroke="oklch(55% 0.2 25)" stroke-width="1" stroke-dasharray="5,4"
							aria-hidden="true"
						/>
						<text x={pw + 4} y={ph - ((1.5 - yMin) / (yMax - yMin)) * ph} fill="oklch(55% 0.2 25)" font-size="8" dominant-baseline="central" aria-hidden="true">
							1.5°C Paris
						</text>

						<!-- Area fill -->
						<path d={tempAreaPath(tempW)} fill="url(#temp-grad)" />

						<!-- Line -->
						<path d={tempPath(tempW)} fill="none" stroke="oklch(50% 0.18 25)" stroke-width="2" stroke-linejoin="round" />

						<!-- Dots -->
						{#each filteredTemp as point}
							{@const x = ((point.year - 1900) / (2020 - 1900)) * pw}
							{@const y = ph - ((point.anomaly - yMin) / (yMax - yMin)) * ph}
							<circle
								cx={x} cy={y} r="4"
								fill={tempHue(point.anomaly)}
								stroke="var(--color-surface)" stroke-width="1.5"
								onpointerenter={(e: PointerEvent) => handleTempHover(e, point)}
								onpointermove={(e: PointerEvent) => handleTempHover(e, point)}
								onpointerleave={clearTooltip}
								tabindex="0"
								role="listitem"
								aria-label="{point.decade}: {point.anomaly > 0 ? '+' : ''}{point.anomaly}°C anomaly"
							/>
						{/each}

						<!-- X axis -->
						<g aria-hidden="true">
							{#each [1900, 1920, 1940, 1960, 1980, 2000, 2020] as yr}
								{@const x = ((yr - 1900) / (2020 - 1900)) * pw}
								<text x={x} y={ph + 16} text-anchor="middle" fill="var(--color-text-muted)" font-size="9">{yr}</text>
							{/each}
						</g>
					</g>
				</svg>
			{/if}
			<!-- SR table -->
			<table class="sr-only">
				<caption>Global Temperature Anomaly by Decade</caption>
				<thead><tr><th>Decade</th><th>Anomaly (°C)</th></tr></thead>
				<tbody>
					{#each tempData as d}<tr><td>{d.decade}</td><td>{d.anomaly > 0 ? '+' : ''}{d.anomaly}</td></tr>{/each}
				</tbody>
			</table>
		</article>

		<!-- ═══ CO2 Concentration ═══ -->
		<article class="card" bind:clientWidth={co2W}>
			<h2 class="card-title">CO2 Concentration</h2>
			<p class="card-sub">Atmospheric CO2 in parts per million (Keeling Curve)</p>
			{#if co2W > 0}
				{@const pw = co2W - pad.left - pad.right}
				{@const ph = chH - pad.top - pad.bottom}
				{@const yMin2 = 310}
				{@const yMax2 = 440}
				<svg
					width={co2W}
					height={chH}
					viewBox="0 0 {co2W} {chH}"
					role="img"
					aria-label="CO2 concentration rising from 317 ppm in 1960 to 425 ppm in 2024"
					onpointerleave={clearTooltip}
				>
					<desc>Line chart showing atmospheric CO2 rising steadily from about 317 ppm in 1960 to 425 ppm in 2024, crossing the 350 ppm safe limit around 1988 and the 400 ppm mark in 2013.</desc>
					<g transform="translate({pad.left}, {pad.top})">
						<!-- Y grid -->
						<g aria-hidden="true">
							{#each [320, 350, 380, 400, 420] as val}
								{@const y = ph - ((val - yMin2) / (yMax2 - yMin2)) * ph}
								<line x1={0} y1={y} x2={pw} y2={y} stroke="var(--color-border)" stroke-width="0.5" />
								<text x={-6} y={y} text-anchor="end" dominant-baseline="central" fill="var(--color-text-muted)" font-size="9">{val}</text>
							{/each}
						</g>

						<!-- 350 ppm safe limit -->
						<line x1={0} y1={ph - ((350 - yMin2) / (yMax2 - yMin2)) * ph} x2={pw} y2={ph - ((350 - yMin2) / (yMax2 - yMin2)) * ph} stroke="oklch(55% 0.18 145)" stroke-width="1" stroke-dasharray="5,4" aria-hidden="true" />
						<text x={pw + 4} y={ph - ((350 - yMin2) / (yMax2 - yMin2)) * ph} fill="oklch(55% 0.18 145)" font-size="8" dominant-baseline="central" aria-hidden="true">350 safe</text>

						<!-- 400 ppm crossed 2013 -->
						<line x1={((2013 - 1960) / (2024 - 1960)) * pw} y1={0} x2={((2013 - 1960) / (2024 - 1960)) * pw} y2={ph} stroke="oklch(55% 0.15 50)" stroke-width="1" stroke-dasharray="4,3" opacity="0.7" aria-hidden="true" />
						<text x={((2013 - 1960) / (2024 - 1960)) * pw + 4} y={12} fill="oklch(55% 0.15 50)" font-size="8" aria-hidden="true">400 ppm (2013)</text>

						<!-- Line -->
						<path d={co2Path(co2W)} fill="none" stroke="oklch(55% 0.18 170)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />

						<!-- Dots -->
						{#each filteredCO2 as point}
							{@const x = ((point.year - 1960) / (2024 - 1960)) * pw}
							{@const y = ph - ((point.ppm - yMin2) / (yMax2 - yMin2)) * ph}
							<circle
								cx={x} cy={y} r="3.5"
								fill="oklch(55% 0.18 170)"
								stroke="var(--color-surface)" stroke-width="1.5"
								onpointerenter={(e: PointerEvent) => handleCO2Hover(e, point)}
								onpointermove={(e: PointerEvent) => handleCO2Hover(e, point)}
								onpointerleave={clearTooltip}
								tabindex="0"
								role="listitem"
								aria-label="{point.year}: {point.ppm} ppm CO2"
							/>
						{/each}

						<!-- X axis -->
						<g aria-hidden="true">
							{#each [1960, 1970, 1980, 1990, 2000, 2010, 2024] as yr}
								{@const x = ((yr - 1960) / (2024 - 1960)) * pw}
								<text x={x} y={ph + 16} text-anchor="middle" fill="var(--color-text-muted)" font-size="9">{yr}</text>
							{/each}
						</g>
					</g>
				</svg>
			{/if}
			<table class="sr-only">
				<caption>Atmospheric CO2 Concentration</caption>
				<thead><tr><th>Year</th><th>CO2 (ppm)</th></tr></thead>
				<tbody>{#each co2Data as d}<tr><td>{d.year}</td><td>{d.ppm}</td></tr>{/each}</tbody>
			</table>
		</article>

		<!-- ═══ Sea Level Rise ═══ -->
		<article class="card" bind:clientWidth={seaW}>
			<h2 class="card-title">Sea Level Rise Rate</h2>
			<p class="card-sub">Global mean sea level rise in mm/year</p>
			{#if seaW > 0}
				{@const pw = seaW - pad.left - pad.right}
				{@const ph = chH - pad.top - pad.bottom}
				{@const barGap = 6}
				{@const bw = (pw - barGap * (seaData.length - 1)) / seaData.length}
				<svg
					width={seaW}
					height={chH}
					viewBox="0 0 {seaW} {chH}"
					role="img"
					aria-label="Sea level rise rate accelerating from 2.2 mm per year in 1993 to 4.7 mm per year in 2024"
					onpointerleave={clearTooltip}
				>
					<desc>Bar chart showing sea level rise rate accelerating. Each bar represents a 4-year period. The rate has more than doubled from 2.2 mm/year in 1993-96 to 4.7 mm/year in 2021-24.</desc>
					<g transform="translate({pad.left}, {pad.top})">
						<!-- Y grid -->
						<g aria-hidden="true">
							{#each [0, 1, 2, 3, 4, 5] as val}
								{@const y = ph - (val / 5.5) * ph}
								<line x1={0} y1={y} x2={pw} y2={y} stroke="var(--color-border)" stroke-width="0.5" />
								<text x={-6} y={y} text-anchor="end" dominant-baseline="central" fill="var(--color-text-muted)" font-size="9">{val}</text>
							{/each}
						</g>

						{#each seaData as point, i}
							{@const x = i * (bw + barGap)}
							{@const h = (point.rate / 5.5) * ph}
							{@const intensity = 0.3 + (point.rate / maxRate) * 0.7}
							<rect
								{x} y={ph - h} width={bw} height={h} rx="2"
								fill="oklch({(45 + intensity * 15).toFixed(0)}% {(0.1 + intensity * 0.1).toFixed(2)} 170)"
								onpointerenter={(e: PointerEvent) => handleSeaHover(e, point)}
								onpointermove={(e: PointerEvent) => handleSeaHover(e, point)}
								onpointerleave={clearTooltip}
								tabindex="0"
								role="listitem"
								aria-label="{point.period}: {point.rate} mm per year sea level rise"
							/>
							<text
								x={x + bw / 2} y={ph - h - 5}
								text-anchor="middle" fill="var(--color-text)" font-size="9" font-weight="600"
								aria-hidden="true"
							>{point.rate}</text>
							<text
								x={x + bw / 2} y={ph + 14}
								text-anchor="middle" fill="var(--color-text-muted)" font-size={seaW < 400 ? '7' : '8'}
								aria-hidden="true"
							>{point.period}</text>
						{/each}
					</g>
				</svg>
			{/if}
			<table class="sr-only">
				<caption>Sea Level Rise Rate by Period</caption>
				<thead><tr><th>Period</th><th>Rate (mm/yr)</th></tr></thead>
				<tbody>{#each seaData as d}<tr><td>{d.period}</td><td>{d.rate}</td></tr>{/each}</tbody>
			</table>
		</article>

		<!-- ═══ Renewable Energy Share ═══ -->
		<article class="card" bind:clientWidth={renewW}>
			<h2 class="card-title">Renewable Energy Share</h2>
			<p class="card-sub">% of global electricity generation</p>
			{#if renewW > 0}
				{@const pw = renewW - pad.left - pad.right}
				{@const ph = chH - pad.top - pad.bottom}
				{@const barGap = 3}
				{@const bw = Math.max((pw - barGap * (filteredRenew.length - 1)) / filteredRenew.length, 4)}
				<svg
					width={renewW}
					height={chH}
					viewBox="0 0 {renewW} {chH}"
					role="img"
					aria-label="Renewable energy share growing from 19.8% in 2010 to 32.7% in 2024, with solar and wind driving growth"
					onpointerleave={clearTooltip}
				>
					<desc>Stacked bar chart showing renewable energy share of global electricity. Hydro remains steady around 15%, while solar grows from 0.3% to 6.5% and wind from 1.7% to 8.5% between 2010 and 2024.</desc>
					<g transform="translate({pad.left}, {pad.top})">
						<!-- Y grid -->
						<g aria-hidden="true">
							{#each [0, 10, 20, 30, 40] as val}
								{@const y = ph - (val / 40) * ph}
								<line x1={0} y1={y} x2={pw} y2={y} stroke="var(--color-border)" stroke-width="0.5" />
								<text x={-6} y={y} text-anchor="end" dominant-baseline="central" fill="var(--color-text-muted)" font-size="9">{val}%</text>
							{/each}
						</g>

						{#each filteredRenew as point, i}
							{@const x = i * (bw + barGap)}
							{@const vals = [point.other, point.hydro, point.wind, point.solar]}
							{@const colors = [renewColors.other, renewColors.hydro, renewColors.wind, renewColors.solar]}
							{#each vals as v, j}
								{@const stackBelow = vals.slice(0, j).reduce((a, b) => a + b, 0)}
								{@const yBottom = ph - (stackBelow / 40) * ph}
								{@const h = (v / 40) * ph}
								<rect
									{x} y={yBottom - h} width={bw} height={h}
									fill={colors[j]}
									onpointerenter={(e: PointerEvent) => handleRenewHover(e, point)}
									onpointermove={(e: PointerEvent) => handleRenewHover(e, point)}
									onpointerleave={clearTooltip}
								/>
							{/each}
							{#if i % 3 === 0 || i === filteredRenew.length - 1}
								<text
									x={x + bw / 2} y={ph + 14}
									text-anchor="middle" fill="var(--color-text-muted)" font-size="8"
									aria-hidden="true"
								>{point.year}</text>
							{/if}
						{/each}
					</g>
				</svg>

				<div class="renew-legend">
					{#each renewSources as src}
						<span class="legend-item">
							<span class="swatch" style:background={renewColors[src]}></span>
							{renewLabels[src]}
						</span>
					{/each}
				</div>
			{/if}
			<table class="sr-only">
				<caption>Renewable Energy Share of Global Electricity</caption>
				<thead><tr><th>Year</th><th>Solar %</th><th>Wind %</th><th>Hydro %</th><th>Other %</th><th>Total %</th></tr></thead>
				<tbody>
					{#each renewData as d}
						<tr><td>{d.year}</td><td>{d.solar}</td><td>{d.wind}</td><td>{d.hydro}</td><td>{d.other}</td><td>{(d.solar + d.wind + d.hydro + d.other).toFixed(1)}</td></tr>
					{/each}
				</tbody>
			</table>
		</article>
	</div>

	<!-- Tooltip -->
	{#if tooltip}
		<div class="tooltip" style:left="{tooltip.x + 14}px" style:top="{tooltip.y - 40}px">
			{tooltip.content}
		</div>
	{/if}

	<footer class="footer">
		<p class="footer-text">
			<strong>Built with:</strong> SVG primitives, <code>$derived</code> scales, <code>Tween</code> animation,
			<code>bind:clientWidth</code>, IntersectionObserver, OKLCH color interpolation, accessible chart patterns,
			<code>prefersReducedMotion</code>
		</p>
		<p class="footer-note">
			Data sources: NASA GISS, NOAA Mauna Loa, NASA Sea Level, IEA Renewables. All values approximate.
		</p>
	</footer>
</section>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 1200px;
		margin-inline: auto;
	}

	.header {
		text-align: center;
		padding-block: var(--space-md);
	}

	h1 {
		color: oklch(55% 0.18 170);
		margin-block-end: var(--space-sm);
	}

	.subtitle {
		color: var(--color-text-muted);
		font-size: var(--text-base);
		max-inline-size: 65ch;
		margin-inline: auto;
		line-height: 1.6;
		margin-block: 0;
	}

	.controls {
		display: flex;
		justify-content: center;
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.year-control {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
		justify-content: center;
	}

	.year-label {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.slider {
		inline-size: 240px;
		accent-color: oklch(55% 0.18 170);
	}

	.year-value {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 700;
		color: oklch(55% 0.18 170);
		min-inline-size: 4ch;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
		h1 {
			font-size: var(--text-2xl);
		}
	}

	.card {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.card-title {
		font-size: var(--text-base);
		color: oklch(45% 0.15 170);
		margin: 0;
	}

	.card-sub {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.4;
	}

	svg {
		display: block;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.tooltip {
		position: fixed;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-sm);
		box-shadow: var(--shadow-md);
		pointer-events: none;
		z-index: 20;
		font-size: var(--text-sm);
		color: var(--color-text);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.renew-legend {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
		justify-content: center;
		margin-block-start: var(--space-xs);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.swatch {
		display: inline-block;
		inline-size: 10px;
		block-size: 10px;
		border-radius: 2px;
	}

	.sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.footer {
		margin-block-start: var(--space-lg);
		padding-block-start: var(--space-md);
		border-block-start: 1px solid var(--color-border);
		text-align: center;
	}

	.footer-text {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.8;
		margin: 0;
	}

	.footer-text strong {
		color: var(--color-text);
	}

	.footer-note {
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		margin-block-start: var(--space-xs);
		opacity: 0.7;
		margin-block-end: 0;
	}
</style>
