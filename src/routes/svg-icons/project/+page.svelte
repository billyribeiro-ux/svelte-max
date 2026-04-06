<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const reducedMotion = $derived(prefersReducedMotion.current);

	/* ── 1. Logo reveal (SI.2 + SI.5) ── */
	type Point = [number, number];

	const logoPaths: { d: string; color: string }[] = [
		{ d: 'M 10 30 C 10 30, 25 10, 45 15 C 65 20, 55 40, 35 40 C 15 40, 25 55, 45 55 C 65 55, 55 35, 75 30', color: 'oklch(62% 0.18 290)' },
		{ d: 'M 85 20 L 85 55 M 85 20 L 105 40 L 85 40', color: 'oklch(65% 0.22 270)' },
		{ d: 'M 115 20 L 115 55 M 115 20 L 135 55 M 135 20 L 135 55', color: 'oklch(60% 0.20 150)' }
	];

	let logoPathEls: SVGPathElement[] = $state([]);
	let logoLengths: number[] = $state(logoPaths.map(() => 0));
	let logoDrawn = $state(false);
	let logoAnimating = $state(false);
	const logoTweens = logoPaths.map(() => new Tween(1, { duration: 600, easing: cubicInOut }));

	$effect(() => {
		for (let i = 0; i < logoPathEls.length; i++) {
			if (logoPathEls[i]) logoLengths[i] = logoPathEls[i].getTotalLength();
		}
	});

	async function drawLogo(): Promise<void> {
		if (logoAnimating) return;
		logoAnimating = true;
		logoDrawn = false;
		const dur = reducedMotion ? 0 : 600;
		for (const t of logoTweens) t.set(1, { duration: 0 });
		for (const t of logoTweens) await t.set(0, { duration: dur });
		logoDrawn = true;
		logoAnimating = false;
	}

	function resetLogo(): void {
		if (logoAnimating) return;
		for (const t of logoTweens) t.set(1, { duration: 0 });
		logoDrawn = false;
	}

	/* ── 2. Icon morphing gallery (SI.3 + SI.4) ── */
	interface MorphPair {
		label: string;
		pathA: string;
		pathB: string;
	}

	const morphPairs: MorphPair[] = [
		{ label: 'Menu / Close', pathA: 'M3 6L21 6M3 12L21 12M3 18L21 18', pathB: 'M6 6L18 18M12 12L12 12M18 6L6 18' },
		{ label: 'Play / Pause', pathA: 'M6 4L20 12L6 20Z', pathB: 'M6 4L10 4L10 20L6 20ZM14 4L18 4L18 20L14 20Z' },
		{ label: 'Sun / Moon', pathA: 'M12 3L12 5M12 19L12 21M3 12L5 12M19 12L21 12M7 7L7 7M17 7L17 7M7 17L7 17M17 17L17 17', pathB: 'M12 3L12 5M12 19L12 21M3 12L5 12M19 12L21 12M21 12L21 12M21 12L21 12M21 12L21 12M21 12L21 12' },
		{ label: 'Arrow / Check', pathA: 'M12 5L12 19M5 12L12 5L19 12', pathB: 'M5 12L10 17L19 7M10 17L10 17M19 7L19 7' },
		{ label: 'Plus / Minus', pathA: 'M12 5L12 19M5 12L19 12', pathB: 'M12 12L12 12M5 12L19 12' },
		{ label: 'Heart / Filled', pathA: 'M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 12 4 12 5C12 4 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z', pathB: 'M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 12 4 12 5C12 4 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z' }
	];

	let morphStates: boolean[] = $state(morphPairs.map(() => false));

	function toggleMorph(index: number): void {
		morphStates[index] = !morphStates[index];
	}

	/* ── 3. Loading spinners (SI.6) ── */
	let progressValue = $state(65);
	const progressTween = new Tween(65, { duration: 400, easing: cubicOut });

	$effect(() => {
		const dur = reducedMotion ? 0 : 400;
		progressTween.set(progressValue, { duration: dur });
	});

	/* ── 4. Micro-interactions (SI.7) ── */
	let microSubmit = $state<boolean>(false);
	let microLike = $state<boolean>(false);
	let microCopy = $state<boolean>(false);
	let microDelete = $state<boolean>(false);
	let microRefresh = $state<boolean>(false);
	let microExpand = $state<boolean>(false);
	let microBookmark = $state<boolean>(false);
	let microToggle = $state<boolean>(false);

	function microTrigger(setter: (v: boolean) => void, getter: () => boolean): void {
		if (getter()) return;
		setter(true);
		setTimeout(() => setter(false), 1500);
	}

	/* ── 5. Interactive map (SI.8) ── */
	interface ContinentData { id: string; name: string; population: number; d: string; }
	const continents: ContinentData[] = [
		{ id: 'na', name: 'N. America', population: 579_000_000, d: 'M 60 40 L 95 35 L 115 50 L 120 75 L 105 95 L 85 110 L 70 100 L 55 85 L 45 60 Z' },
		{ id: 'sa', name: 'S. America', population: 423_000_000, d: 'M 90 120 L 105 115 L 115 130 L 120 160 L 110 185 L 95 195 L 80 180 L 78 150 L 82 135 Z' },
		{ id: 'eu', name: 'Europe', population: 748_000_000, d: 'M 170 35 L 195 30 L 210 40 L 205 55 L 195 65 L 180 70 L 165 60 L 160 45 Z' },
		{ id: 'af', name: 'Africa', population: 1_460_000_000, d: 'M 165 75 L 195 70 L 215 85 L 220 115 L 210 150 L 195 170 L 175 165 L 160 140 L 155 110 L 158 90 Z' },
		{ id: 'as', name: 'Asia', population: 4_750_000_000, d: 'M 210 30 L 260 25 L 290 40 L 300 65 L 290 90 L 270 100 L 245 95 L 225 85 L 215 65 L 205 45 Z' },
		{ id: 'oc', name: 'Oceania', population: 46_000_000, d: 'M 270 130 L 295 125 L 310 135 L 305 150 L 290 155 L 275 148 L 268 140 Z' }
	];
	let activeContinent = $state<string | null>(null);
	const maxPop = Math.max(...continents.map((c) => c.population));
	function mapFill(pop: number, active: boolean): string {
		const ratio = pop / maxPop;
		const l = 75 - ratio * 30 + (active ? -8 : 0);
		const c = 0.08 + ratio * 0.14;
		return `oklch(${l}% ${c} 290)`;
	}
	function formatPop(n: number): string {
		return n >= 1_000_000_000 ? `${(n / 1_000_000_000).toFixed(1)}B` : `${(n / 1_000_000).toFixed(0)}M`;
	}

	/* ── 6. Rocket animation (SI.9) ── */
	let rocketPlaying = $state(false);
	let rocketPaused = $state(false);
	let rocketProgress = $state(0);
	let rocketRafId = $state(0);
	let rocketStart = $state(0);
	let rocketPauseTime = $state(0);
	const ROCKET_DUR = 4000;

	const stars = [
		{ cx: 30, cy: 20, r: 2 }, { cx: 80, cy: 35, r: 1.5 }, { cx: 250, cy: 15, r: 2.5 },
		{ cx: 290, cy: 45, r: 1.8 }, { cx: 50, cy: 70, r: 1.2 }, { cx: 200, cy: 25, r: 2 },
		{ cx: 140, cy: 10, r: 1.5 }, { cx: 270, cy: 80, r: 1.8 }
	];
	const rStarOp = $derived(stars.map((_, i) => 0.3 + 0.7 * Math.abs(Math.sin(((rocketProgress * 3 + i * 0.4) % 1) * Math.PI))));
	const rFlameScale = $derived(rocketProgress < 0.15 ? 0 : rocketProgress < 0.25 ? (rocketProgress - 0.15) / 0.1 : 0.8 + 0.2 * Math.sin(rocketProgress * 20));
	const rFlameOp = $derived(rocketProgress < 0.15 ? 0 : 1);
	const rRocketY = $derived(rocketProgress < 0.3 ? 130 : 130 - (1 - Math.pow(1 - Math.min((rocketProgress - 0.3) / 0.7, 1), 3)) * 160);
	const rRocketScale = $derived(rocketProgress < 0.3 ? 1 : 1 - Math.min((rocketProgress - 0.3) / 0.7, 1) * 0.6);
	const rSmoke = $derived.by(() => {
		const t = rocketProgress;
		if (t < 0.2) return [];
		const count = Math.min(Math.floor((t - 0.2) * 15), 8);
		return Array.from({ length: count }, (_, i) => ({
			cx: 160 + (i % 2 === 0 ? -1 : 1) * (i * 4 + t * 30),
			cy: 175 + i * 6 + t * 20,
			r: 3 + i * 0.8,
			opacity: Math.max(0, 0.6 - i * 0.07 - (t - 0.2) * 0.3)
		}));
	});

	function rocketAnimate(ts: number): void {
		if (!rocketPlaying || rocketPaused) return;
		rocketProgress = Math.min((ts - rocketStart) / ROCKET_DUR, 1);
		if (rocketProgress < 1) rocketRafId = requestAnimationFrame(rocketAnimate);
		else rocketPlaying = false;
	}
	function rocketPlay(): void {
		if (reducedMotion) { rocketProgress = 1; return; }
		if (rocketPaused) { rocketStart = performance.now() - rocketPauseTime; rocketPaused = false; rocketPlaying = true; rocketRafId = requestAnimationFrame(rocketAnimate); return; }
		rocketProgress = 0; rocketPlaying = true; rocketPaused = false; rocketStart = performance.now(); rocketRafId = requestAnimationFrame(rocketAnimate);
	}
	function rocketPause(): void {
		if (!rocketPlaying || rocketPaused) return;
		rocketPaused = true; rocketPauseTime = performance.now() - rocketStart; cancelAnimationFrame(rocketRafId);
	}
	function rocketRestart(): void {
		cancelAnimationFrame(rocketRafId); rocketPlaying = false; rocketPaused = false; rocketProgress = 0; rocketPlay();
	}
	function rocketScrub(e: Event): void {
		cancelAnimationFrame(rocketRafId); rocketPlaying = false; rocketPaused = false;
		rocketProgress = parseFloat((e.target as HTMLInputElement).value);
	}

	onMount(() => {
		drawLogo();
		return () => cancelAnimationFrame(rocketRafId);
	});
</script>

<section class="page playground">
	<h1>Icon Playground</h1>
	<p class="concept">
		An interactive showcase composing all SVG &amp; Icon Animation concepts from lessons SI.1 through SI.10.
	</p>

	<!-- ── 1. Logo Reveal (SI.2 + SI.5) ── -->
	<div class="build section-card">
		<h2>Logo Reveal</h2>
		<div class="btn-row">
			<button type="button" onclick={drawLogo} disabled={logoAnimating}>
				{logoAnimating ? 'Drawing...' : 'Draw'}
			</button>
			<button type="button" onclick={resetLogo} disabled={logoAnimating}>Reset</button>
		</div>
		<svg viewBox="0 0 150 65" class="logo-svg" role="img" aria-label="svelte-max wordmark drawing animation">
			{#each logoPaths as p, i}
				<path d={p.d} bind:this={logoPathEls[i]} fill="none" stroke={p.color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray={logoLengths[i]} stroke-dashoffset={logoLengths[i] * logoTweens[i].current} />
			{/each}
		</svg>
	</div>

	<!-- ── 2. Icon Morphing Gallery (SI.3 + SI.4) ── -->
	<div class="build section-card">
		<h2>Icon Morphing Gallery</h2>
		<div class="morph-grid">
			{#each morphPairs as pair, i}
				<div class="morph-card">
					<button type="button" class="icon-btn" aria-label="{pair.label}: click to morph" onclick={() => toggleMorph(i)}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d={morphStates[i] ? pair.pathB : pair.pathA} class="morph-path" />
						</svg>
					</button>
					<span class="morph-label">{pair.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 3. Loading State Library (SI.6) ── -->
	<div class="build section-card">
		<h2>Loading State Library</h2>
		<div class="spinner-row">
			<!-- Circular -->
			<div class="spinner-item">
				<svg viewBox="0 0 50 50" class="mini-spinner" role="img" aria-label="Circular spinner">
					<circle cx="25" cy="25" r="20" fill="none" stroke="oklch(70% 0.03 290)" stroke-width="4" />
					{#if !reducedMotion}
						<circle cx="25" cy="25" r="20" fill="none" stroke="oklch(62% 0.18 290)" stroke-width="4" stroke-dasharray="80 126" stroke-linecap="round" class="spin-ring" />
					{:else}
						<circle cx="25" cy="25" r="20" fill="none" stroke="oklch(62% 0.18 290)" stroke-width="4" stroke-dasharray="80 126" stroke-linecap="round" />
					{/if}
				</svg>
				<span>Circular</span>
			</div>
			<!-- Dots -->
			<div class="spinner-item">
				<svg viewBox="0 0 60 20" class="mini-dots" role="img" aria-label="Dots spinner">
					<circle cx="10" cy="10" r="5" fill="oklch(62% 0.18 290)" class={reducedMotion ? '' : 'dot dot-1'} />
					<circle cx="30" cy="10" r="5" fill="oklch(62% 0.18 290)" class={reducedMotion ? '' : 'dot dot-2'} />
					<circle cx="50" cy="10" r="5" fill="oklch(62% 0.18 290)" class={reducedMotion ? '' : 'dot dot-3'} />
				</svg>
				<span>Dots</span>
			</div>
			<!-- Skeleton -->
			<div class="spinner-item">
				<svg viewBox="0 0 120 40" class="mini-skeleton" role="img" aria-label="Skeleton loader">
					<defs>
						<linearGradient id="pg-shimmer" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stop-color="oklch(80% 0.02 290 / 0)" />
							<stop offset="50%" stop-color="oklch(90% 0.02 290 / 0.4)" />
							<stop offset="100%" stop-color="oklch(80% 0.02 290 / 0)" />
						</linearGradient>
					</defs>
					<rect x="0" y="4" width="120" height="10" rx="3" fill="oklch(85% 0.02 290 / 0.3)" />
					<rect x="0" y="20" width="80" height="10" rx="3" fill="oklch(85% 0.02 290 / 0.3)" />
					{#if !reducedMotion}
						<rect x="-120" y="0" width="120" height="40" fill="url(#pg-shimmer)" class="shimmer-rect" />
					{/if}
				</svg>
				<span>Skeleton</span>
			</div>
			<!-- Progress -->
			<div class="spinner-item">
				<svg viewBox="0 0 120 20" class="mini-progress" role="img" aria-label="Progress bar at {Math.round(progressTween.current)}%">
					<rect x="2" y="2" width="116" height="16" rx="5" fill="oklch(85% 0.02 290 / 0.3)" />
					<rect x="2" y="2" width={116 * (progressTween.current / 100)} height="16" rx="5" fill="oklch(62% 0.18 290)" />
					<text x="60" y="14" text-anchor="middle" font-size="9" fill="white" font-weight="600">{Math.round(progressTween.current)}%</text>
				</svg>
				<input type="range" min="0" max="100" step="1" bind:value={progressValue} class="mini-range" />
				<span>Progress</span>
			</div>
		</div>
	</div>

	<!-- ── 4. Micro-Interaction Wall (SI.7) ── -->
	<div class="build section-card">
		<h2>Micro-Interaction Wall</h2>
		<div class="micro-grid">
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microSubmit ? 'Submitted' : 'Submit'} onclick={() => microTrigger((v) => (microSubmit = v), () => microSubmit)}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						{#if microSubmit}<path d="M5 12 L10 17 L19 7" class="check-draw" />{:else}<path d="M5 12 L12 12 M12 7 L12 17" />{/if}
					</svg>
				</button>
				<span>Submit</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microToggle ? 'Off' : 'On'} onclick={() => (microToggle = !microToggle)}>
					<svg viewBox="0 0 36 20" fill="none">
						<rect x="1" y="1" width="34" height="18" rx="9" fill={microToggle ? 'oklch(65% 0.22 150)' : 'oklch(70% 0.03 290)'} class="track-fill" />
						<circle cx={microToggle ? 26 : 10} cy="10" r="7" fill="white" class="thumb" />
					</svg>
				</button>
				<span>Toggle</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microLike ? 'Unlike' : 'Like'} onclick={() => microTrigger((v) => (microLike = v), () => microLike)}>
					<svg viewBox="0 0 24 24" class="heart-icon" class:liked={microLike} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14 12 21 12 21Z" fill={microLike ? 'oklch(60% 0.25 15)' : 'none'} stroke={microLike ? 'oklch(60% 0.25 15)' : 'currentColor'} />
					</svg>
				</button>
				<span>Like</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microCopy ? 'Copied' : 'Copy'} onclick={() => microTrigger((v) => (microCopy = v), () => microCopy)}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						{#if microCopy}<path d="M5 12 L10 17 L19 7" class="check-draw" style="stroke: oklch(65% 0.22 150);" />{:else}<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />{/if}
					</svg>
				</button>
				<span>Copy</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microDelete ? 'Deleted' : 'Delete'} onclick={() => microTrigger((v) => (microDelete = v), () => microDelete)}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class:shake={microDelete}>
						<path d="M3 6h18" /><path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
					</svg>
				</button>
				<span>Delete</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label="Refresh" onclick={() => microTrigger((v) => (microRefresh = v), () => microRefresh)}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class:rotate-once={microRefresh}>
						<path d="M1 4v6h6" /><path d="M23 20v-6h-6" /><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
					</svg>
				</button>
				<span>Refresh</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microExpand ? 'Collapse' : 'Expand'} onclick={() => (microExpand = !microExpand)}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon" class:rotated={microExpand}>
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</button>
				<span>Expand</span>
			</div>
			<div class="micro-cell">
				<button type="button" class="icon-btn" aria-label={microBookmark ? 'Unbookmark' : 'Bookmark'} onclick={() => microTrigger((v) => (microBookmark = v), () => microBookmark)}>
					<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z" fill={microBookmark ? 'oklch(62% 0.18 290)' : 'none'} stroke={microBookmark ? 'oklch(62% 0.18 290)' : 'currentColor'} />
					</svg>
				</button>
				<span>Bookmark</span>
			</div>
		</div>
	</div>

	<!-- ── 5. Interactive Infographic (SI.8) ── -->
	<div class="build section-card">
		<h2>Interactive Infographic</h2>
		<svg viewBox="0 0 340 210" class="map-svg" role="img" aria-label="Interactive world population map">
			<title>World Population Map</title>
			<desc>Click continents to see population data.</desc>
			{#each continents as c}
				{@const isActive = activeContinent === c.id}
				<path d={c.d} fill={mapFill(c.population, isActive)} stroke="oklch(95% 0.01 290)" stroke-width="1" class="continent-path" class:active={isActive} role="button" tabindex="0" aria-label="{c.name}: {formatPop(c.population)}" onclick={() => (activeContinent = activeContinent === c.id ? null : c.id)} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') activeContinent = activeContinent === c.id ? null : c.id; }} />
			{/each}
		</svg>
		<div class="map-chips">
			{#each continents as c}
				<button type="button" class="map-chip" class:active={activeContinent === c.id} onclick={() => (activeContinent = activeContinent === c.id ? null : c.id)}>
					{c.name}: {formatPop(c.population)}
				</button>
			{/each}
		</div>
	</div>

	<!-- ── 6. Rocket Animation (SI.9) ── -->
	<div class="build section-card">
		<h2>Rocket Animation</h2>
		{#if reducedMotion}
			<svg viewBox="0 0 320 200" class="rocket-svg" role="img" aria-label="Rocket launch (static)">
				<rect x="0" y="0" width="320" height="200" fill="oklch(18% 0.04 290)" rx="8" />
				{#each stars as s}<circle cx={s.cx} cy={s.cy} r={s.r} fill="oklch(95% 0.05 60)" opacity="0.9" />{/each}
				<rect x="0" y="180" width="320" height="20" fill="oklch(35% 0.06 150)" />
				<text x="160" y="110" text-anchor="middle" font-size="12" fill="oklch(80% 0.10 290)" font-weight="600">Launched!</text>
			</svg>
		{:else}
			<svg viewBox="0 0 320 200" class="rocket-svg" role="img" aria-label="Rocket launch animation">
				<rect x="0" y="0" width="320" height="200" fill="oklch(18% 0.04 290)" rx="8" />
				{#each stars as s, i}<circle cx={s.cx} cy={s.cy} r={s.r} fill="oklch(95% 0.05 60)" opacity={rStarOp[i]} />{/each}
				<rect x="0" y="180" width="320" height="20" fill="oklch(35% 0.06 150)" />
				<rect x="145" y="170" width="30" height="10" rx="2" fill="oklch(50% 0.08 290)" />
				{#each rSmoke as p}<circle cx={p.cx} cy={p.cy} r={p.r} fill="oklch(75% 0.03 290)" opacity={p.opacity} />{/each}
				<g transform="translate(160, {rRocketY}) scale({rRocketScale})">
					{#if rFlameOp > 0}
						<g transform="translate(0, 28) scale({rFlameScale})" opacity={rFlameOp}>
							<path d="M -6 0 L 0 18 L 6 0" fill="oklch(75% 0.25 60)" />
							<path d="M -3 0 L 0 12 L 3 0" fill="oklch(80% 0.25 40)" />
						</g>
					{/if}
					<rect x="-8" y="-5" width="16" height="33" rx="3" fill="oklch(90% 0.03 290)" />
					<polygon points="-8,-5 0,-20 8,-5" fill="oklch(60% 0.22 15)" />
					<circle cx="0" cy="6" r="3.5" fill="oklch(60% 0.15 220)" stroke="oklch(50% 0.10 290)" stroke-width="0.8" />
					<polygon points="-8,24 -14,32 -8,28" fill="oklch(60% 0.22 15)" />
					<polygon points="8,24 14,32 8,28" fill="oklch(60% 0.22 15)" />
				</g>
			</svg>
		{/if}
		<div class="rocket-controls">
			<div class="btn-row">
				<button type="button" onclick={rocketPlay} disabled={rocketPlaying && !rocketPaused}>{rocketPaused ? 'Resume' : 'Play'}</button>
				<button type="button" onclick={rocketPause} disabled={!rocketPlaying || rocketPaused}>Pause</button>
				<button type="button" onclick={rocketRestart}>Restart</button>
			</div>
			<input type="range" min="0" max="1" step="0.001" value={rocketProgress} oninput={rocketScrub} class="mini-range wide" />
		</div>
	</div>

	<!-- ── 8. Built With footer ── -->
	<footer class="built-with">
		<h3>Built with</h3>
		<ol class="concept-list">
			<li>SI.1 — SVG Anatomy</li>
			<li>SI.2 — Path Drawing</li>
			<li>SI.3 — Icon Systems</li>
			<li>SI.4 — Shape Morphing</li>
			<li>SI.5 — Line Art</li>
			<li>SI.6 — Loading Spinners</li>
			<li>SI.7 — Micro-Interactions</li>
			<li>SI.8 — Interactive SVG</li>
			<li>SI.9 — Lottie from Scratch</li>
			<li>SI.10 — Performance &amp; A11y</li>
		</ol>
	</footer>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.playground {
		--pg-accent: oklch(62% 0.18 290);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
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
	}
	h1 {
		color: var(--pg-accent);
	}
	h2 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}
	h3 {
		margin: 0;
	}

	/* ── Buttons ── */
	.btn-row {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.btn-row button, .rocket-controls button {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.btn-row button:hover:not(:disabled), .rocket-controls button:hover:not(:disabled) {
		background: var(--pg-accent);
		color: white;
		border-color: var(--pg-accent);
	}
	.btn-row button:disabled, .rocket-controls button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* ── Logo ── */
	.logo-svg {
		width: 100%;
		max-width: 300px;
		height: auto;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	/* ── Morph Grid ── */
	.morph-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}
	.morph-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
	}
	.morph-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.morph-path {
		transition: d 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* ── Icon buttons (shared) ── */
	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--color-text);
		transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
	}
	.icon-btn:hover {
		background: var(--color-surface);
		transform: scale(1.08);
	}
	.icon-btn svg {
		width: 28px;
		height: 28px;
	}

	/* ── Spinner row ── */
	.spinner-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
		align-items: end;
	}
	.spinner-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.mini-spinner { width: 48px; height: 48px; }
	.mini-dots { width: 60px; height: 20px; }
	.mini-skeleton { width: 120px; height: 40px; }
	.mini-progress { width: 120px; height: 20px; }
	.mini-range { width: 100%; max-width: 120px; accent-color: var(--pg-accent); }
	.mini-range.wide { max-width: 100%; }

	.spin-ring { transform-origin: center; animation: spin 1s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }

	.dot { transform-origin: center; animation: dot-pulse 1.2s ease-in-out infinite; }
	.dot-1 { animation-delay: 0ms; }
	.dot-2 { animation-delay: 200ms; }
	.dot-3 { animation-delay: 400ms; }
	@keyframes dot-pulse {
		0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
		40% { transform: scale(1); opacity: 1; }
	}

	.shimmer-rect { animation: shimmer-slide 1.8s ease-in-out infinite; }
	@keyframes shimmer-slide { 0% { transform: translateX(0); } 100% { transform: translateX(240px); } }

	/* ── Micro grid ── */
	.micro-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-sm);
	}
	.micro-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	/* Micro-interaction CSS */
	.check-draw { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw-check 400ms ease forwards; }
	@keyframes draw-check { to { stroke-dashoffset: 0; } }
	.track-fill { transition: fill 300ms ease; }
	.thumb { transition: cx 300ms cubic-bezier(0.34, 1.56, 0.64, 1); }
	.heart-icon { transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1); }
	.heart-icon.liked { transform: scale(1.2); }
	.heart-icon path { transition: fill 200ms ease, stroke 200ms ease; }
	.shake { animation: shake-anim 400ms ease; }
	@keyframes shake-anim {
		0%, 100% { transform: translateX(0); }
		20% { transform: translateX(-3px); }
		40% { transform: translateX(3px); }
		60% { transform: translateX(-2px); }
		80% { transform: translateX(2px); }
	}
	.rotate-once { animation: rotate-full 600ms ease; }
	@keyframes rotate-full { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
	.chevron-icon { transition: transform 300ms ease; }
	.chevron-icon.rotated { transform: rotate(180deg); }

	/* ── Map ── */
	.map-svg {
		width: 100%;
		max-width: 500px;
		height: auto;
		background: oklch(92% 0.02 250);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.continent-path {
		cursor: pointer;
		transition: fill 200ms ease, filter 200ms ease;
	}
	.continent-path:hover { filter: brightness(0.85); }
	.continent-path.active { stroke: oklch(40% 0.20 290); stroke-width: 2; }
	.continent-path:focus-visible { outline: 2px solid var(--pg-accent); outline-offset: 2px; }

	.map-chips {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}
	.map-chip {
		font-size: var(--text-xs);
		padding: 2px var(--space-sm);
		border: 2px solid var(--pg-accent);
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.map-chip:hover { background: var(--color-surface); }
	.map-chip.active { background: oklch(62% 0.18 290 / 0.15); color: var(--color-text); font-weight: 600; }

	/* ── Rocket ── */
	.rocket-svg {
		width: 100%;
		max-width: 500px;
		height: auto;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.rocket-controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	/* ── Footer ── */
	.built-with {
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.concept-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xs);
		list-style: decimal;
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
		.micro-grid { grid-template-columns: repeat(4, 1fr); }
		.morph-grid { grid-template-columns: repeat(3, 1fr); }
		.spinner-row { grid-template-columns: repeat(4, 1fr); }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.concept-list { grid-template-columns: 1fr 1fr; }
		.morph-grid { grid-template-columns: repeat(3, 1fr); }
		.micro-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
		.morph-grid { grid-template-columns: repeat(6, 1fr); }
		.micro-grid { grid-template-columns: repeat(8, 1fr); }
		.concept-list { grid-template-columns: repeat(3, 1fr); }
	}
</style>
