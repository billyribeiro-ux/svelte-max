import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import {
	listNotes,
	createNote,
	updateNote,
	deleteNote,
	login,
	logout,
	getSession
} from '$lib/server/notes';

const COOKIE = 'notes-session';

function deriveName(email: string): string {
	const base = email.split('@')[0] ?? 'friend';
	return base.charAt(0).toUpperCase() + base.slice(1);
}

export const load: PageServerLoad = ({ cookies }) => {
	const token = cookies.get(COOKIE);
	const user = getSession(token);
	return {
		user,
		notes: listNotes()
	};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim().toLowerCase();
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { action: 'login' as const, email, error: 'Enter a valid email' });
		}
		const session = login(email, deriveName(email));
		cookies.set(COOKIE, session.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24
		});
		return { action: 'login' as const, success: true };
	},

	logout: async ({ cookies }) => {
		const token = cookies.get(COOKIE);
		logout(token);
		cookies.delete(COOKIE, { path: '/' });
		return { action: 'logout' as const, success: true };
	},

	create: async ({ request, cookies }) => {
		const user = getSession(cookies.get(COOKIE));
		if (!user) return fail(401, { action: 'create' as const, error: 'You must be logged in' });
		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();
		if (!title) return fail(400, { action: 'create' as const, title, body, error: 'Title is required' });
		if (title.length > 80)
			return fail(400, { action: 'create' as const, title, body, error: 'Title must be 80 characters or fewer' });
		if (!body) return fail(400, { action: 'create' as const, title, body, error: 'Body is required' });
		createNote(user.email, title, body);
		return { action: 'create' as const, success: true };
	},

	update: async ({ request, cookies }) => {
		const user = getSession(cookies.get(COOKIE));
		if (!user) return fail(401, { action: 'update' as const, error: 'You must be logged in' });
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const title = String(form.get('title') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();
		if (!id) return fail(400, { action: 'update' as const, error: 'Missing note id' });
		if (!title || !body)
			return fail(400, { action: 'update' as const, id, error: 'Title and body are required' });
		const updated = updateNote(id, title, body, user.email);
		if (!updated) return fail(403, { action: 'update' as const, id, error: 'Not your note' });
		return { action: 'update' as const, success: true, id };
	},

	delete: async ({ request, cookies }) => {
		const user = getSession(cookies.get(COOKIE));
		if (!user) return fail(401, { action: 'delete' as const, error: 'You must be logged in' });
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const ok = deleteNote(id, user.email);
		if (!ok) return fail(403, { action: 'delete' as const, id, error: 'Not your note' });
		return { action: 'delete' as const, success: true };
	}
};
