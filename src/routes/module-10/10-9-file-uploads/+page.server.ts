import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const file = form.get('avatar');

		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { error: 'Select a file first' });
		}
		if (file.size > MAX_BYTES) {
			return fail(400, {
				error: `File too large (${(file.size / 1024).toFixed(0)} KB > 2 MB limit)`
			});
		}
		if (!ALLOWED.includes(file.type)) {
			return fail(400, { error: `Unsupported MIME type: ${file.type}` });
		}

		const buf = await file.arrayBuffer();
		const hashBuf = await crypto.subtle.digest('SHA-256', buf);
		const hash = Array.from(new Uint8Array(hashBuf))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('')
			.slice(0, 16);

		return {
			success: true,
			meta: {
				name: file.name,
				sizeBytes: file.size,
				type: file.type,
				hash
			}
		};
	}
};
