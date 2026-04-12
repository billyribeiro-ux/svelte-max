<script lang="ts">
	// -- Capstone: PE7 Flagship --
	// Composes concepts from every module into one page.

	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Tween, Spring, prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Component imports — Module 3
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/Card.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	// Shared reactive state — Module 11
	import { CartStore } from '$lib/stores/cart.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	// SvelteSet — reactive set of bookmarked project IDs
	const bookmarkedIds = new SvelteSet<string>();

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	// Register GSAP plugin — Module 7
	gsap.registerPlugin(ScrollTrigger);

	// -- Typed data model (Modules 1, 2, 4, 10) --
	interface Project {
		id: string;
		title: string;
		description: string;
		stack: readonly string[];
		status: 'active' | 'completed' | 'archived';
		stars: number;
	}

	interface Feedback {
		id: string;
		author: string;
		text: string;
		rating: number;
		createdAt: string;
	}

	// SvelteKit data — Module 9A
	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Shared cart instance — Module 11
	const cart = new CartStore();

	// -- Reactive state — Module 2 --
	let query = $state('');
	let debouncedQuery = $state('');
	let selectedStatus = $state<'all' | Project['status']>('all');
	let feedbackDraft = $state({ author: '', text: '', rating: 5 });
	let feedbackSuccess = $state(false);
	let searchInput = $state<HTMLInputElement | null>(null);

	// Debounced search — Module 5.8 pattern
	$effect(() => {
		const q = query;
		const timer = setTimeout(() => {
			debouncedQuery = q;
		}, 300);
		return () => clearTimeout(timer);
	});

	// Filtered projects — Module 2.8 $derived.by pattern
	const visible = $derived.by(() => {
		const q = debouncedQuery.toLowerCase();
		return data.projects.filter((p: Project) => {
			const matchesQuery =
				!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
			const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
			return matchesQuery && matchesStatus;
		});
	});

	// Tween — Module 6.14
	const totalStars = $derived(data.projects.reduce((s: number, p: Project) => s + p.stars, 0));
	const tweenedStars = new Tween(0, { duration: 600, easing: cubicOut });
	$effect(() => {
		tweenedStars.target = totalStars;
	});

	// Spring — Module 6.15 (hero parallax)
	const mouseOffset = new Spring({ x: 0, y: 0 }, { stiffness: 0.04, damping: 0.4 });

	function handleHeroMouseMove(e: MouseEvent) {
		if (prefersReducedMotion.current) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
		const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
		mouseOffset.target = { x, y };
	}

	function handleHeroMouseLeave() {
		mouseOffset.target = { x: 0, y: 0 };
	}

	// Keyboard shortcut "/" to focus search — Module 4.11 pattern
	function handleGlobalKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
			e.preventDefault();
			searchInput?.focus();
		}
	}

	// GSAP ScrollTrigger — Module 7
	let statsSection = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!statsSection || prefersReducedMotion.current) return;
		const ctx = gsap.context(() => {
			gsap.from('.stat-number', {
				textContent: 0,
				duration: 1.5,
				ease: 'power2.out',
				snap: { textContent: 1 },
				scrollTrigger: {
					trigger: statsSection,
					start: 'top 80%',
					once: true
				}
			});
		}, statsSection);
		return () => ctx.revert();
	});

	// Shallow routing — Module 8.11
	const selectedProjectId = $derived((page.state as Record<string, unknown>).projectId as string | undefined);
	const selectedProject = $derived(
		selectedProjectId ? data.projects.find((p: Project) => p.id === selectedProjectId) : undefined
	);

	function openProject(project: Project) {
		pushState('', { projectId: project.id });
	}

	function closeModal() {
		history.back();
	}

	function handleModalKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}

	function handleBackdropClick(e: MouseEvent) {
		if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
			closeModal();
		}
	}

	// Focus management for modal — Module 12.8
	let modalCloseBtn = $state<HTMLButtonElement | null>(null);
	$effect(() => {
		if (selectedProject && modalCloseBtn) {
			modalCloseBtn.focus();
		}
	});

	// Feedback form reset on success
	$effect(() => {
		if (form && 'success' in form && form.success) {
			feedbackDraft = { author: '', text: '', rating: 5 };
			feedbackSuccess = true;
			const timer = setTimeout(() => {
				feedbackSuccess = false;
			}, 3000);
			return () => clearTimeout(timer);
		}
	});

	function addToCart(project: Project) {
		cart.add({ id: project.id, name: project.title, price: 9.99 });
	}

	// SEO — Module 13: JSON-LD
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'PE7 Flagship Capstone',
		description: 'Everything you learned, composed into one project.',
		author: { '@type': 'Person', name: 'PE7 Course' },
		datePublished: '2026-04-06'
	});

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function renderStars(rating: number): string {
		return '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating);
	}

	// -- Module 14: Custom Element pattern showcase --
	const customElementCode = `\u003csvelte:options customElement="pe7-button" /\u003e

\u003cscript lang="ts"\u003e
  // Props become observed attributes on the custom element.
  // Strings map directly; booleans/numbers are auto-coerced.
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  }

  let { variant = 'primary', size = 'md', disabled = false }: Props = $props();
\u003c/script\u003e

\u003c!-- Shadow DOM encapsulates styles: no CSS leakage in or out --\u003e
\u003cbutton class="btn {variant} {size}" {disabled}\u003e
  \u003cslot /\u003e
\u003c/button\u003e

\u003c!-- Usage in plain HTML (no Svelte needed): --\u003e
\u003c!-- \u003cpe7-button variant="secondary" size="lg"\u003eClick me\u003c/pe7-button\u003e --\u003e`;

	// -- Module 15: Threlte 3D teaser --
	const threlteCode = `\u003cscript\u003e
  import { Canvas, T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';

  let mounted = $state(false);

  // SSR guard — WebGL only works in the browser
  $effect(() => { mounted = true; });
\u003c/script\u003e

{#if mounted}
  \u003cCanvas\u003e
    \u003cT.PerspectiveCamera makeDefault position={[5, 5, 5]} /\u003e
    \u003cOrbitControls /\u003e
    \u003cT.DirectionalLight position={[3, 10, 7]} intensity={1.2} /\u003e
    \u003cT.AmbientLight intensity={0.4} /\u003e

    \u003cT.Mesh\u003e
      \u003cT.BoxGeometry args={[1, 1, 1]} /\u003e
      \u003cT.MeshStandardMaterial color="#e040a0" /\u003e
    \u003c/T.Mesh\u003e
  \u003c/Canvas\u003e
{/if}`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"// -- Capstone: PE7 Flagship --\n" +
		"	// Composes concepts from every module into one page.\n" +
		"\n" +
		"	import type { PageData, ActionData } from './$types';\n" +
		"	import { enhance } from '$app/forms';\n" +
		"	import { pushState } from '$app/navigation';\n" +
		"	import { page } from '$app/state';\n" +
		"	import { fly, fade } from 'svelte/transition';\n" +
		"	import { cubicOut } from 'svelte/easing';\n" +
		"	import { Tween, Spring, prefersReducedMotion } from 'svelte/motion';\n" +
		"	import gsap from 'gsap';\n" +
		"	import { ScrollTrigger } from 'gsap/ScrollTrigger';\n" +
		"\n" +
		"	// Component imports — Module 3\n" +
		"	import Button from '$lib/components/Button.svelte';\n" +
		"	import Badge from '$lib/components/Badge.svelte';\n" +
		"	import Card from '$lib/components/Card.svelte';\n" +
		"	import Avatar from '$lib/components/Avatar.svelte';\n" +
		"\n" +
		"	// Shared reactive state — Module 11\n" +
		"	import { CartStore } from '$lib/stores/cart.svelte';\n" +
		"\n" +
		"	// Register GSAP plugin — Module 7\n" +
		"	gsap.registerPlugin(ScrollTrigger);\n" +
		"\n" +
		"	// -- Typed data model (Modules 1, 2, 4, 10) --\n" +
		"	interface Project {\n" +
		"		id: string;\n" +
		"		title: string;\n" +
		"		description: string;\n" +
		"		stack: readonly string[];\n" +
		"		status: 'active' | 'completed' | 'archived';\n" +
		"		stars: number;\n" +
		"	}\n" +
		"\n" +
		"	interface Feedback {\n" +
		"		id: string;\n" +
		"		author: string;\n" +
		"		text: string;\n" +
		"		rating: number;\n" +
		"		createdAt: string;\n" +
		"	}\n" +
		"\n" +
		"	// SvelteKit data — Module 9A\n" +
		"	let { data, form }: { data: PageData; form: ActionData } = $props();\n" +
		"\n" +
		"	// Shared cart instance — Module 11\n" +
		"	const cart = new CartStore();\n" +
		"\n" +
		"	// -- Reactive state — Module 2 --\n" +
		"	let query = $state('');\n" +
		"	let debouncedQuery = $state('');\n" +
		"	let selectedStatus = $state\u003c'all' | Project['status']\u003e('all');\n" +
		"	let feedbackDraft = $state({ author: '', text: '', rating: 5 });\n" +
		"	let feedbackSuccess = $state(false);\n" +
		"	let searchInput = $state\u003cHTMLInputElement | null\u003e(null);\n" +
		"\n" +
		"	// Debounced search — Module 5.8 pattern\n" +
		"	$effect(() =\u003e {\n" +
		"		const q = query;\n" +
		"		const timer = setTimeout(() =\u003e {\n" +
		"			debouncedQuery = q;\n" +
		"		}, 300);\n" +
		"		return () =\u003e clearTimeout(timer);\n" +
		"	});\n" +
		"\n" +
		"	// Filtered projects — Module 2.8 $derived.by pattern\n" +
		"	const visible = $derived.by(() =\u003e {\n" +
		"		const q = debouncedQuery.toLowerCase();\n" +
		"		return data.projects.filter((p: Project) =\u003e {\n" +
		"			const matchesQuery =\n" +
		"				!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);\n" +
		"			const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;\n" +
		"			return matchesQuery && matchesStatus;\n" +
		"		});\n" +
		"	});\n" +
		"\n" +
		"	// Tween — Module 6.14\n" +
		"	const totalStars = $derived(data.projects.reduce((s: number, p: Project) =\u003e s + p.stars, 0));\n" +
		"	const tweenedStars = new Tween(0, { duration: 600, easing: cubicOut });\n" +
		"	$effect(() =\u003e {\n" +
		"		tweenedStars.target = totalStars;\n" +
		"	});\n" +
		"\n" +
		"	// Spring — Module 6.15 (hero parallax)\n" +
		"	const mouseOffset = new Spring({ x: 0, y: 0 }, { stiffness: 0.04, damping: 0.4 });\n" +
		"\n" +
		"	function handleHeroMouseMove(e: MouseEvent) {\n" +
		"		if (prefersReducedMotion.current) return;\n" +
		"		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();\n" +
		"		const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;\n" +
		"		const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;\n" +
		"		mouseOffset.target = { x, y };\n" +
		"	}\n" +
		"\n" +
		"	function handleHeroMouseLeave() {\n" +
		"		mouseOffset.target = { x: 0, y: 0 };\n" +
		"	}\n" +
		"\n" +
		"	// Keyboard shortcut \"/\" to focus search — Module 4.11 pattern\n" +
		"	function handleGlobalKeydown(e: KeyboardEvent) {\n" +
		"		if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {\n" +
		"			e.preventDefault();\n" +
		"			searchInput?.focus();\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	// GSAP ScrollTrigger — Module 7\n" +
		"	let statsSection = $state\u003cHTMLElement | null\u003e(null);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		if (!statsSection || prefersReducedMotion.current) return;\n" +
		"		const ctx = gsap.context(() =\u003e {\n" +
		"			gsap.from('.stat-number', {\n" +
		"				textContent: 0,\n" +
		"				duration: 1.5,\n" +
		"				ease: 'power2.out',\n" +
		"				snap: { textContent: 1 },\n" +
		"				scrollTrigger: {\n" +
		"					trigger: statsSection,\n" +
		"					start: 'top 80%',\n" +
		"					once: true\n" +
		"				}\n" +
		"			});\n" +
		"		}, statsSection);\n" +
		"		return () =\u003e ctx.revert();\n" +
		"	});\n" +
		"\n" +
		"	// Shallow routing — Module 8.11\n" +
		"	const selectedProjectId = $derived((page.state as Record\u003cstring, unknown\u003e).projectId as string | undefined);\n" +
		"	const selectedProject = $derived(\n" +
		"		selectedProjectId ? data.projects.find((p: Project) =\u003e p.id === selectedProjectId) : undefined\n" +
		"	);\n" +
		"\n" +
		"	function openProject(project: Project) {\n" +
		"		pushState('', { projectId: project.id });\n" +
		"	}\n" +
		"\n" +
		"	function closeModal() {\n" +
		"		history.back();\n" +
		"	}\n" +
		"\n" +
		"	function handleModalKeydown(e: KeyboardEvent) {\n" +
		"		if (e.key === 'Escape') closeModal();\n" +
		"	}\n" +
		"\n" +
		"	function handleBackdropClick(e: MouseEvent) {\n" +
		"		if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {\n" +
		"			closeModal();\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	// Focus management for modal — Module 12.8\n" +
		"	let modalCloseBtn = $state\u003cHTMLButtonElement | null\u003e(null);\n" +
		"	$effect(() =\u003e {\n" +
		"		if (selectedProject && modalCloseBtn) {\n" +
		"			modalCloseBtn.focus();\n" +
		"		}\n" +
		"	});\n" +
		"\n" +
		"	// Feedback form reset on success\n" +
		"	$effect(() =\u003e {\n" +
		"		if (form && 'success' in form && form.success) {\n" +
		"			feedbackDraft = { author: '', text: '', rating: 5 };\n" +
		"			feedbackSuccess = true;\n" +
		"			const timer = setTimeout(() =\u003e {\n" +
		"				feedbackSuccess = false;\n" +
		"			}, 3000);\n" +
		"			return () =\u003e clearTimeout(timer);\n" +
		"		}\n" +
		"	});\n" +
		"\n" +
		"	function addToCart(project: Project) {\n" +
		"		cart.add({ id: project.id, name: project.title, price: 9.99 });\n" +
		"	}\n" +
		"\n" +
		"	// SEO — Module 13: JSON-LD\n" +
		"	const jsonLd = JSON.stringify({\n" +
		"		'@context': 'https://schema.org',\n" +
		"		'@type': 'Article',\n" +
		"		headline: 'PE7 Flagship Capstone',\n" +
		"		description: 'Everything you learned, composed into one project.',\n" +
		"		author: { '@type': 'Person', name: 'PE7 Course' },\n" +
		"		datePublished: '2026-04-06'\n" +
		"	});\n" +
		"\n" +
		"	function formatDate(iso: string): string {\n" +
		"		return new Date(iso).toLocaleDateString('en-US', {\n" +
		"			month: 'short',\n" +
		"			day: 'numeric',\n" +
		"			year: 'numeric'\n" +
		"		});\n" +
		"	}\n" +
		"\n" +
		"	function renderStars(rating: number): string {\n" +
		"		return '\\u2605'.repeat(rating) + '\\u2606'.repeat(5 - rating);\n" +
		"	}\n" +
		"\n" +
		"	// -- Module 14: Custom Element pattern showcase --\n" +
		"	const customElementCode = `\\u003csvelte:options customElement=\"pe7-button\" /\\u003e\n" +
		"\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  // Props become observed attributes on the custom element.\n" +
		"  // Strings map directly; booleans/numbers are auto-coerced.\n" +
		"  interface Props {\n" +
		"    variant?: 'primary' | 'secondary' | 'ghost';\n" +
		"    size?: 'sm' | 'md' | 'lg';\n" +
		"    disabled?: boolean;\n" +
		"  }\n" +
		"\n" +
		"  let { variant = 'primary', size = 'md', disabled = false }: Props = $props();\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\\u003c!-- Shadow DOM encapsulates styles: no CSS leakage in or out --\\u003e\n" +
		"\\u003cbutton class=\"btn {variant} {size}\" {disabled}\\u003e\n" +
		"  \\u003cslot /\\u003e\n" +
		"\\u003c/button\\u003e\n" +
		"\n" +
		"\\u003c!-- Usage in plain HTML (no Svelte needed): --\\u003e\n" +
		"\\u003c!-- \\u003cpe7-button variant=\"secondary\" size=\"lg\"\\u003eClick me\\u003c/pe7-button\\u003e --\\u003e`;\n" +
		"\n" +
		"	// -- Module 15: Threlte 3D teaser --\n" +
		"	const threlteCode = `\\u003cscript\\u003e\n" +
		"  import { Canvas, T } from '@threlte/core';\n" +
		"  import { OrbitControls } from '@threlte/extras';\n" +
		"\n" +
		"  let mounted = $state(false);\n" +
		"\n" +
		"  // SSR guard — WebGL only works in the browser\n" +
		"  $effect(() =\u003e { mounted = true; });\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"{#if mounted}\n" +
		"  \\u003cCanvas\\u003e\n" +
		"    \\u003cT.PerspectiveCamera makeDefault position={[5, 5, 5]} /\\u003e\n" +
		"    \\u003cOrbitControls /\\u003e\n" +
		"    \\u003cT.DirectionalLight position={[3, 10, 7]} intensity={1.2} /\\u003e\n" +
		"    \\u003cT.AmbientLight intensity={0.4} /\\u003e\n" +
		"\n" +
		"    \\u003cT.Mesh\\u003e\n" +
		"      \\u003cT.BoxGeometry args={[1, 1, 1]} /\\u003e\n" +
		"      \\u003cT.MeshStandardMaterial color=\"#e040a0\" /\\u003e\n" +
		"    \\u003c/T.Mesh\\u003e\n" +
		"  \\u003c/Canvas\\u003e\n" +
		"{/if}`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003c!-- Keyboard shortcut — Module 4.11 --\u003e\n" +
		"\u003csvelte:window onkeydown={handleGlobalKeydown} /\u003e\n" +
		"\n" +
		"\u003c!-- SEO — Module 13 --\u003e\n" +
		"\u003csvelte:head\u003e\n" +
		"	\u003ctitle\u003ePE7 Flagship Capstone\u003c/title\u003e\n" +
		"	\u003cmeta name=\"description\" content=\"Everything you learned in PE7, composed into one flagship project.\" /\u003e\n" +
		"	\u003clink rel=\"canonical\" href=\"https://pe7.dev/capstone\" /\u003e\n" +
		"	\u003cmeta property=\"og:title\" content=\"PE7 Flagship Capstone\" /\u003e\n" +
		"	\u003cmeta property=\"og:description\" content=\"Everything you learned, composed into one project.\" /\u003e\n" +
		"	\u003cmeta property=\"og:type\" content=\"article\" /\u003e\n" +
		"	\u003cmeta property=\"og:url\" content=\"https://pe7.dev/capstone\" /\u003e\n" +
		"	{@html `\u003cscript type=\"application/ld+json\"\u003e${jsonLd}\\u003c/script\\u003e`}\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003c!-- Per-page OKLCH personality — Module 6.9 --\u003e\n" +
		"\u003cdiv class=\"capstone\"\u003e\n" +
		"	\u003c!-- ============ HERO SECTION ============ --\u003e\n" +
		"	\u003csection\n" +
		"		class=\"hero\"\n" +
		"		onmousemove={handleHeroMouseMove}\n" +
		"		onmouseleave={handleHeroMouseLeave}\n" +
		"		role=\"banner\"\n" +
		"		style:--offset-x=\"{mouseOffset.current.x}px\"\n" +
		"		style:--offset-y=\"{mouseOffset.current.y}px\"\n" +
		"	\u003e\n" +
		"		\u003cdiv class=\"hero-inner\"\u003e\n" +
		"			\u003ch1 class=\"hero-title\"\u003ePE7 Flagship\u003c/h1\u003e\n" +
		"			\u003cp class=\"hero-subtitle\"\u003eEverything you learned, composed into one project\u003c/p\u003e\n" +
		"			\u003cdiv class=\"hero-stats\"\u003e\n" +
		"				\u003cdiv class=\"hero-stat\"\u003e\n" +
		"					\u003cspan class=\"hero-stat-value\"\u003e{data.projects.length}\u003c/span\u003e\n" +
		"					\u003cspan class=\"hero-stat-label\"\u003eProjects\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"hero-stat\"\u003e\n" +
		"					\u003cspan class=\"hero-stat-value\"\u003e{Math.round(tweenedStars.current)}\u003c/span\u003e\n" +
		"					\u003cspan class=\"hero-stat-label\"\u003eTotal Stars\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"hero-stat\"\u003e\n" +
		"					\u003cspan class=\"hero-stat-value\"\u003e{data.feedback.length}\u003c/span\u003e\n" +
		"					\u003cspan class=\"hero-stat-label\"\u003eFeedback\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"cart-badge\"\u003e\n" +
		"				\u003cBadge tone=\"brand\" rounded\u003eCart: {cart.count} items\u003c/Badge\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/section\u003e\n" +
		"\n" +
		"	\u003c!-- ============ PROJECT GRID ============ --\u003e\n" +
		"	\u003csection class=\"projects-section\" aria-labelledby=\"projects-heading\"\u003e\n" +
		"		\u003ch2 id=\"projects-heading\" class=\"section-title\"\u003eProjects\u003c/h2\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"filters\"\u003e\n" +
		"			\u003cdiv class=\"search-wrap\"\u003e\n" +
		"				\u003clabel for=\"search-input\" class=\"sr-only\"\u003eSearch projects\u003c/label\u003e\n" +
		"				\u003cinput\n" +
		"					id=\"search-input\"\n" +
		"					bind:this={searchInput}\n" +
		"					bind:value={query}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<!-- Keyboard shortcut — Module 4.11 -->
<svelte:window onkeydown={handleGlobalKeydown} />

<!-- SEO — Module 13 -->
<svelte:head>
	<title>PE7 Flagship Capstone</title>
	<meta name="description" content="Everything you learned in PE7, composed into one flagship project." />
	<link rel="canonical" href="https://pe7.dev/capstone" />
	<meta property="og:title" content="PE7 Flagship Capstone" />
	<meta property="og:description" content="Everything you learned, composed into one project." />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://pe7.dev/capstone" />
	{@html `<script type="application/ld+json">${jsonLd}\u003c/script\u003e`}
</svelte:head>

<!-- Per-page OKLCH personality — Module 6.9 -->
<div class="capstone">
	<!-- ============ HERO SECTION ============ -->
	<section
		class="hero"
		onmousemove={handleHeroMouseMove}
		onmouseleave={handleHeroMouseLeave}
		role="banner"
		style:--offset-x="{mouseOffset.current.x}px"
		style:--offset-y="{mouseOffset.current.y}px"
	>
		<div class="hero-inner">
			<h1 class="hero-title">PE7 Flagship</h1>
			<p class="hero-subtitle">Everything you learned, composed into one project</p>
			<div class="hero-stats">
				<div class="hero-stat">
					<span class="hero-stat-value">{data.projects.length}</span>
					<span class="hero-stat-label">Projects</span>
				</div>
				<div class="hero-stat">
					<span class="hero-stat-value">{Math.round(tweenedStars.current)}</span>
					<span class="hero-stat-label">Total Stars</span>
				</div>
				<div class="hero-stat">
					<span class="hero-stat-value">{data.feedback.length}</span>
					<span class="hero-stat-label">Feedback</span>
				</div>
			</div>
			<div class="cart-badge">
				<Badge tone="brand" rounded>Cart: {cart.count} items</Badge>
			</div>
		</div>
	</section>

	<!-- ============ PROJECT GRID ============ -->
	<section class="projects-section" aria-labelledby="projects-heading">
		<h2 id="projects-heading" class="section-title">Projects</h2>

		<div class="filters">
			<div class="search-wrap">
				<label for="search-input" class="sr-only">Search projects</label>
				<input
					id="search-input"
					bind:this={searchInput}
					bind:value={query}
					type="search"
					placeholder="Search projects... (press / to focus)"
					class="search-input"
				/>
			</div>
			<div class="status-wrap">
				<label for="status-filter" class="sr-only">Filter by status</label>
				<select id="status-filter" bind:value={selectedStatus} class="status-select">
					<option value="all">All statuses</option>
					<option value="active">Active</option>
					<option value="completed">Completed</option>
					<option value="archived">Archived</option>
				</select>
			</div>
		</div>

		<!-- Template control flow — Module 4 -->
		{#if visible.length === 0}
			<p class="empty-state">No projects match your criteria. Try adjusting the filters.</p>
		{:else}
			<div class="project-grid">
				{#each visible as project, i (project.id)}
					<div
						transition:fly|global={{
							y: prefersReducedMotion.current ? 0 : 30,
							duration: prefersReducedMotion.current ? 0 : 400,
							delay: prefersReducedMotion.current ? 0 : i * 80,
							easing: cubicOut
						}}
					>
						<Card elevated>
							{#snippet header()}
								<button
									type="button"
									class="card-header-btn"
									onclick={() => openProject(project)}
									aria-label="View details for {project.title}"
								>
									<span class="card-title">{project.title}</span>
									<Badge
										tone={project.status === 'active' ? 'success' : project.status === 'completed' ? 'brand' : 'neutral'}
										rounded
									>
										{project.status}
									</Badge>
								</button>
							{/snippet}

							<p class="card-desc">{project.description}</p>
							<div class="stack-pills">
								{#each project.stack as tech (tech)}
									<Badge tone="neutral">{tech}</Badge>
								{/each}
							</div>

							{#snippet footer()}
								<div class="card-actions">
									<!-- Star form with progressive enhancement — Module 10 -->
									<form method="POST" action="?/star" use:enhance>
										<input type="hidden" name="projectId" value={project.id} />
										<button
											type="submit"
											class="star-btn"
											aria-label="Star {project.title}, currently {project.stars} stars"
										>
											<span aria-hidden="true">{'\u2605'}</span> {project.stars}
										</button>
									</form>
									<Button variant="secondary" size="sm" onclick={() => addToCart(project)}>
										Add to cart
									</Button>
								</div>
							{/snippet}
						</Card>
					</div>
				{/each}
			</div>
		{/if}
		<p class="keyboard-hint"><kbd>/</kbd> to focus search</p>
	</section>

	<!-- ============ STATS SECTION (GSAP ScrollTrigger) ============ -->
	<section class="stats-section" bind:this={statsSection} aria-labelledby="stats-heading">
		<h2 id="stats-heading" class="section-title">By the Numbers</h2>
		<div class="stats-grid">
			<div class="stat-card">
				<span class="stat-number">6</span>
				<span class="stat-label">Projects shipped</span>
			</div>
			<div class="stat-card">
				<span class="stat-number">4200</span>
				<span class="stat-label">Lines of code</span>
			</div>
			<div class="stat-card">
				<span class="stat-number">15</span>
				<span class="stat-label">Modules completed</span>
			</div>
		</div>
	</section>

	<!-- ============ FEEDBACK SECTION ============ -->
	<!-- Error boundary — Module 12.7 -->
	<svelte:boundary>
		{#snippet failed(error, reset)}
			<section class="feedback-section" aria-labelledby="feedback-heading-error">
				<h2 id="feedback-heading-error" class="section-title">Feedback</h2>
				<div class="error-fallback">
					<p>Something went wrong loading feedback.</p>
					<p class="error-detail">{error instanceof Error ? error.message : 'Unknown error'}</p>
					<Button variant="secondary" onclick={reset}>Try again</Button>
				</div>
			</section>
		{/snippet}

		<section class="feedback-section" aria-labelledby="feedback-heading">
			<h2 id="feedback-heading" class="section-title">Feedback</h2>

			<!-- Feedback form — Module 10 -->
			<form method="POST" action="?/addFeedback" use:enhance class="feedback-form">
				<div class="form-field">
					<label for="fb-author">Your name</label>
					<input
						id="fb-author"
						type="text"
						name="author"
						bind:value={feedbackDraft.author}
						required
						class="form-input"
					/>
					{#if form && 'feedbackErrors' in form && form.feedbackErrors?.author}
						<span class="field-error" role="alert">{form.feedbackErrors.author}</span>
					{/if}
				</div>

				<div class="form-field">
					<label for="fb-text">Your feedback</label>
					<textarea
						id="fb-text"
						name="text"
						bind:value={feedbackDraft.text}
						required
						rows="3"
						class="form-input"
					></textarea>
					{#if form && 'feedbackErrors' in form && form.feedbackErrors?.text}
						<span class="field-error" role="alert">{form.feedbackErrors.text}</span>
					{/if}
				</div>

				<fieldset class="rating-fieldset">
					<legend>Rating</legend>
					<div class="rating-options">
						{#each [1, 2, 3, 4, 5] as val (val)}
							<label class="rating-label">
								<input
									type="radio"
									name="rating"
									value={val}
									checked={feedbackDraft.rating === val}
									onchange={() => { feedbackDraft.rating = val; }}
								/>
								<span>{val}</span>
							</label>
						{/each}
					</div>
					{#if form && 'feedbackErrors' in form && form.feedbackErrors?.rating}
						<span class="field-error" role="alert">{form.feedbackErrors.rating}</span>
					{/if}
				</fieldset>

				<Button type="submit" variant="primary">Submit Feedback</Button>
			</form>

			<div aria-live="polite" class="form-result">
				{#if feedbackSuccess}
					<p class="success-msg" transition:fade={{ duration: prefersReducedMotion.current ? 0 : 300 }}>
						Feedback submitted successfully!
					</p>
				{/if}
			</div>

			<!-- Existing feedback -->
			<div class="feedback-list">
				{#each data.feedback as fb (fb.id)}
					<div class="feedback-card">
						<div class="feedback-header">
							<Avatar src={null} name={fb.author} size="sm" />
							<div>
								<strong class="feedback-author">{fb.author}</strong>
								<span class="feedback-date">{formatDate(fb.createdAt)}</span>
							</div>
							<span class="feedback-rating" aria-label="{fb.rating} out of 5 stars">{renderStars(fb.rating)}</span>
						</div>
						<p class="feedback-text">{fb.text}</p>
					</div>
				{/each}
			</div>
		</section>
	</svelte:boundary>

	<!-- ============ PROJECT DETAIL MODAL — Shallow routing (Module 8.11) ============ -->
	{#if selectedProject}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="modal-backdrop"
			role="dialog"
			aria-modal="true"
			aria-label="Project details for {selectedProject.title}"
			tabindex="0"
			onclick={handleBackdropClick}
			onkeydown={handleModalKeydown}
			transition:fade={{ duration: prefersReducedMotion.current ? 0 : 200 }}
		>
			<div class="modal-content">
				<button
					type="button"
					class="modal-close"
					bind:this={modalCloseBtn}
					onclick={closeModal}
					aria-label="Close project details"
				>
					{'\u2715'}
				</button>
				<h2 class="modal-title">{selectedProject.title}</h2>
				<Badge
					tone={selectedProject.status === 'active' ? 'success' : selectedProject.status === 'completed' ? 'brand' : 'neutral'}
					rounded
				>
					{selectedProject.status}
				</Badge>
				<p class="modal-desc">{selectedProject.description}</p>
				<div class="modal-stack">
					{#each selectedProject.stack as tech (tech)}
						<Badge tone="neutral">{tech}</Badge>
					{/each}
				</div>
				<p class="modal-stars">{'\u2605'} {selectedProject.stars} stars</p>
				<div class="modal-actions">
					<Button variant="primary" onclick={() => addToCart(selectedProject)}>
						Add to cart
					</Button>
					<Button variant="ghost" onclick={closeModal}>
						Close
					</Button>
				</div>
			</div>
		</div>
	{/if}

	<!-- ============ CUSTOM ELEMENT PATTERN (Module 14) ============ -->
	<section class="custom-element-section" aria-labelledby="ce-heading">
		<h2 id="ce-heading" class="section-title">Custom Element Pattern</h2>
		<p class="ce-intro">
			Svelte components can be compiled to native custom elements with a single directive.
			The Button component below could ship as <code>&lt;pe7-button&gt;</code> — usable
			in any HTML page, React app, or CMS without a Svelte runtime.
		</p>
		<pre class="code-block">{customElementCode}</pre>
		<p class="ce-note">
			<strong>Note:</strong> Shadow DOM encapsulation means styles inside the custom element
			don't leak out, and external styles don't leak in. Prop-to-attribute mapping is automatic
			for string props; use <code>reflect</code> in the options for attribute reflection.
		</p>
	</section>

	<!-- ============ 3D WITH THRELTE (Module 15) ============ -->
	<section class="threlte-section" aria-labelledby="threlte-heading">
		<h2 id="threlte-heading" class="section-title">3D with Threlte</h2>
		<p class="threlte-intro">
			Threlte brings Three.js into Svelte's declarative world. A hero 3D scene would use
			<code>&lt;Canvas&gt;</code> with nested <code>&lt;T.Mesh&gt;</code> components — all
			reactive, all composable. Below is what a minimal scene looks like in code, plus an
			SSR guard via <code>{'{#if mounted}'}</code>.
		</p>
		<pre class="code-block">{threlteCode}</pre>
		<div class="threlte-placeholder" aria-label="Placeholder for 3D scene">
			<span class="threlte-placeholder-text">3D Scene would render here (requires WebGL)</span>
		</div>
	</section>

	<!-- ============ FOOTER ============ -->
	<footer class="capstone-footer">
		<h2 class="footer-title">Built With</h2>
		<p class="footer-concepts">
			$state &middot; $derived.by &middot; $effect &middot; Svelte transitions &middot;
			Tween &middot; Spring &middot; GSAP ScrollTrigger &middot; form actions &middot;
			use:enhance &middot; {'<svelte:boundary>'} &middot; shallow routing &middot;
			{'<svelte:head>'} + JSON-LD &middot; per-page OKLCH personality &middot;
			shared CartStore &middot; prefersReducedMotion &middot; typed throughout &middot;
			Custom element patterns (Module 14) &middot; Threlte 3D concepts (Module 15)
		</p>
	</footer>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</div>

<style>
	/* Per-page OKLCH personality — Module 6.9 */
	.capstone {
		--color-brand: oklch(60% 0.20 340);
		--color-brand-dim: oklch(50% 0.17 340);

		display: flex;
		flex-direction: column;
		gap: var(--space-2xl);
		padding-block: var(--space-lg);
		padding-inline: var(--space-md);
		color: var(--color-text);
		max-inline-size: 80rem;
		margin-inline: auto;
	}

	/* -- Utility -- */
	.sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* -- Section title -- */
	.section-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin-block-end: var(--space-lg);
		color: var(--color-text);
	}

	/* ============ HERO ============ */
	.hero {
		position: relative;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding-block: var(--space-2xl);
		padding-inline: var(--space-lg);
		text-align: center;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}

	.hero-inner {
		position: relative;
		transform: translate(var(--offset-x, 0), var(--offset-y, 0));
		transition: transform var(--dur-base) var(--ease-out);
	}

	.hero-title {
		font-size: var(--text-hero);
		font-weight: 800;
		color: var(--color-brand);
		line-height: 1.1;
		margin-block-end: var(--space-sm);
	}

	.hero-subtitle {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		margin-block-end: var(--space-xl);
	}

	.hero-stats {
		display: flex;
		justify-content: center;
		gap: var(--space-xl);
		flex-wrap: wrap;
	}

	.hero-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
	}

	.hero-stat-value {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-brand);
		font-family: var(--font-mono);
	}

	.hero-stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.cart-badge {
		margin-block-start: var(--space-lg);
	}

	/* ============ PROJECTS ============ */
	.projects-section {
		display: flex;
		flex-direction: column;
	}

	.filters {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block-end: var(--space-lg);
	}

	@media (min-inline-size: 768px) {
		.filters {
			flex-direction: row;
		}
	}

	.search-wrap {
		flex: 1;
	}

	.search-input,
	.status-select,
	.form-input {
		inline-size: 100%;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		transition: border-color var(--dur-fast) var(--ease-out);

		&:focus {
			outline: 2px solid var(--color-brand);
			outline-offset: 2px;
			border-color: var(--color-brand);
		}
	}

	.status-select {
		inline-size: auto;
		min-inline-size: 10rem;
	}

	.project-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
	}

	@media (min-inline-size: 768px) {
		.project-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-inline-size: 1024px) {
		.project-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.card-header-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-sm);
		inline-size: 100%;
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 0;
		text-align: start;

		&:focus-visible {
			outline: 2px solid var(--color-brand);
			outline-offset: 2px;
		}
	}

	.card-title {
		font-weight: 700;
		font-size: var(--text-base);
	}

	.card-desc {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.stack-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.card-actions {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.star-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		background: var(--color-surface-2);
		color: var(--color-warning);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
		cursor: pointer;
		font-weight: 600;
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-surface);
			transform: scale(1.05);
		}

		&:focus-visible {
			outline: 2px solid var(--color-brand);
			outline-offset: 2px;
		}
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-lg);
		padding-block: var(--space-2xl);
	}

	.keyboard-hint {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		margin-block-start: var(--space-md);

		& kbd {
			display: inline-block;
			padding: var(--space-xs);
			background: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-sm);
			font-family: var(--font-mono);
			font-size: var(--text-xs);
			line-height: 1;
		}
	}

	/* ============ STATS ============ */
	.stats-section {
		text-align: center;
		padding-block: var(--space-2xl);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
	}

	@media (min-inline-size: 768px) {
		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xl);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.stat-number {
		font-size: var(--text-hero);
		font-weight: 800;
		color: var(--color-brand);
		font-family: var(--font-mono);
	}

	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	/* ============ FEEDBACK ============ */
	.feedback-section {
		display: flex;
		flex-direction: column;
	}

	.feedback-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		margin-block-end: var(--space-xl);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		& label {
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text);
		}
	}

	textarea.form-input {
		resize: vertical;
		font-family: inherit;
	}

	.field-error {
		font-size: var(--text-xs);
		color: var(--color-error);
		font-weight: 500;
	}

	.rating-fieldset {
		border: none;
		padding: 0;
		margin: 0;

		& legend {
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text);
			margin-block-end: var(--space-xs);
		}
	}

	.rating-options {
		display: flex;
		gap: var(--space-md);
	}

	.rating-label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		cursor: pointer;
		color: var(--color-text);
	}

	.form-result {
		min-block-size: var(--space-xl);
	}

	.success-msg {
		color: var(--color-success);
		font-weight: 600;
		font-size: var(--text-sm);
	}

	.error-fallback {
		padding: var(--space-xl);
		text-align: center;
		color: var(--color-error);

		& .error-detail {
			font-size: var(--text-sm);
			color: var(--color-text-muted);
			margin-block: var(--space-sm);
		}
	}

	.feedback-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.feedback-card {
		padding: var(--space-md) var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.feedback-header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-block-end: var(--space-sm);
		flex-wrap: wrap;
	}

	.feedback-author {
		font-size: var(--text-sm);
		color: var(--color-text);
	}

	.feedback-date {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.feedback-rating {
		margin-inline-start: auto;
		color: var(--color-warning);
		font-size: var(--text-base);
	}

	.feedback-text {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	/* ============ MODAL ============ */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: oklch(0% 0 0 / 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: var(--space-md);
	}

	.modal-content {
		position: relative;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
		max-inline-size: 32rem;
		inline-size: 100%;
		box-shadow: var(--shadow-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.modal-close {
		position: absolute;
		inset-block-start: var(--space-md);
		inset-inline-end: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		inline-size: 2rem;
		block-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--color-text);
		font-size: var(--text-sm);
		transition: background var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-surface);
		}

		&:focus-visible {
			outline: 2px solid var(--color-brand);
			outline-offset: 2px;
		}
	}

	.modal-title {
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-text);
		padding-inline-end: var(--space-xl);
	}

	.modal-desc {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.modal-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.modal-stars {
		font-size: var(--text-lg);
		color: var(--color-warning);
		font-weight: 600;
	}

	.modal-actions {
		display: flex;
		gap: var(--space-sm);
		margin-block-start: var(--space-sm);
	}

	/* ============ CUSTOM ELEMENT (Module 14) ============ */
	.custom-element-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.ce-intro,
	.ce-note,
	.threlte-intro {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		max-inline-size: 65ch;
	}

	.ce-note strong {
		color: var(--color-text);
	}

	.code-block {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		overflow-x: auto;
		line-height: 1.6;
		color: var(--color-text);
		white-space: pre;
	}

	/* ============ THRELTE (Module 15) ============ */
	.threlte-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.threlte-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		min-block-size: 14rem;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, oklch(30% 0.12 280), oklch(20% 0.10 340));
		border: 1px solid var(--color-border);
	}

	.threlte-placeholder-text {
		font-size: var(--text-sm);
		color: oklch(80% 0.05 280);
		font-style: italic;
	}

	/* ============ FOOTER ============ */
	.capstone-footer {
		text-align: center;
		padding-block: var(--space-xl);
		border-block-start: 1px solid var(--color-border);
	}

	.footer-title {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
		margin-block-end: var(--space-sm);
	}

	.footer-concepts {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.8;
		max-inline-size: 48rem;
		margin-inline: auto;
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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
	}
</style>
