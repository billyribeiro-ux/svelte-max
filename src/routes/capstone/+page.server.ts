import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

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

// In-memory stores seeded with demo data
const projects = new Map<string, Project>([
	[
		'p1',
		{
			id: 'p1',
			title: 'Reactive Dashboard',
			description: 'Real-time analytics dashboard built with $state and $derived runes.',
			stack: ['Svelte 5', 'D3', 'TypeScript'],
			status: 'active',
			stars: 12
		}
	],
	[
		'p2',
		{
			id: 'p2',
			title: 'Motion Gallery',
			description: 'Image gallery featuring Spring physics and GSAP scroll animations.',
			stack: ['Svelte 5', 'GSAP', 'OKLCH'],
			status: 'completed',
			stars: 24
		}
	],
	[
		'p3',
		{
			id: 'p3',
			title: 'Form Wizard',
			description: 'Multi-step form with progressive enhancement and server validation.',
			stack: ['SvelteKit', 'Zod', 'use:enhance'],
			status: 'active',
			stars: 8
		}
	],
	[
		'p4',
		{
			id: 'p4',
			title: 'E-Commerce Store',
			description: 'Full-featured store with cart state, checkout flow, and SSR.',
			stack: ['SvelteKit', 'Stripe', 'CartStore'],
			status: 'completed',
			stars: 31
		}
	],
	[
		'p5',
		{
			id: 'p5',
			title: 'Dev Blog',
			description: 'MDsveX-powered blog with SEO, JSON-LD, and Open Graph support.',
			stack: ['SvelteKit', 'MDsveX', 'SEO'],
			status: 'archived',
			stars: 15
		}
	],
	[
		'p6',
		{
			id: 'p6',
			title: 'Component Library',
			description: 'Accessible, theme-aware component library with scoped OKLCH tokens.',
			stack: ['Svelte 5', 'OKLCH', 'A11y'],
			status: 'active',
			stars: 19
		}
	]
]);

const feedback: Feedback[] = [
	{
		id: 'f1',
		author: 'Ada Lovelace',
		text: 'This capstone brilliantly composes every module concept into a cohesive whole.',
		rating: 5,
		createdAt: '2026-03-15T10:30:00Z'
	},
	{
		id: 'f2',
		author: 'Grace Hopper',
		text: 'The progressive enhancement and SSR-safe patterns are production-grade.',
		rating: 4,
		createdAt: '2026-03-20T14:15:00Z'
	},
	{
		id: 'f3',
		author: 'Alan Turing',
		text: 'Elegant use of Spring physics and GSAP ScrollTrigger together.',
		rating: 5,
		createdAt: '2026-04-01T09:00:00Z'
	}
];

export const load: PageServerLoad = () => ({
	projects: [...projects.values()],
	feedback
});

export const actions: Actions = {
	star: async ({ request }) => {
		const form = await request.formData();
		const projectId = String(form.get('projectId') ?? '').trim();
		const project = projects.get(projectId);
		if (!project) {
			return fail(400, { starError: 'Project not found' });
		}
		project.stars++;
		return { success: true, projectId };
	},

	addFeedback: async ({ request }) => {
		const form = await request.formData();
		const author = String(form.get('author') ?? '').trim();
		const text = String(form.get('text') ?? '').trim();
		const ratingRaw = Number(form.get('rating'));

		const errors: Record<string, string> = {};
		if (!author) errors.author = 'Author name is required';
		if (!text) errors.text = 'Feedback text is required';
		if (!Number.isInteger(ratingRaw) || ratingRaw < 1 || ratingRaw > 5) {
			errors.rating = 'Rating must be between 1 and 5';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { feedbackErrors: errors, author, text, rating: ratingRaw });
		}

		feedback.push({
			id: `f${Date.now()}`,
			author,
			text,
			rating: ratingRaw,
			createdAt: new Date().toISOString()
		});

		return { success: true };
	}
};
