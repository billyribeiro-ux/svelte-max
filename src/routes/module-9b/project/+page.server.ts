import type { Actions } from './$types';
import * as v from 'valibot';

const FeedbackSchema = v.object({
	name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
	email: v.pipe(v.string(), v.email('Must be a valid email')),
	rating: v.pipe(
		v.string(),
		v.transform((val) => Number(val)),
		v.number(),
		v.minValue(1, 'Rating must be 1-5'),
		v.maxValue(5, 'Rating must be 1-5')
	),
	comment: v.pipe(v.string(), v.minLength(5, 'Comment must be at least 5 characters')),
});

type FeedbackEntry = {
	id: string;
	name: string;
	email: string;
	rating: number;
	comment: string;
	createdAt: string;
};

const feedbackStore: FeedbackEntry[] = [];

export const actions: Actions = {
	submit: async ({ request }) => {
		const formData = await request.formData();
		const raw = Object.fromEntries(formData);

		const result = v.safeParse(FeedbackSchema, raw);
		if (!result.success) {
			const errors: Record<string, string> = {};
			for (const issue of result.issues) {
				const key = issue.path?.[0] && 'key' in issue.path[0] ? String(issue.path[0].key) : 'general';
				if (!errors[key]) errors[key] = issue.message;
			}
			return { success: false as const, errors, values: raw };
		}

		const entry: FeedbackEntry = {
			id: crypto.randomUUID(),
			name: result.output.name,
			email: result.output.email,
			rating: result.output.rating,
			comment: result.output.comment,
			createdAt: new Date().toISOString(),
		};

		feedbackStore.push(entry);

		return {
			success: true as const,
			entry,
			errors: null,
			values: null,
		};
	},
};
