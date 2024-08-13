import { lucia } from '$lib/auth';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const sessionId = cookies.get(lucia.sessionCookieName);
		if (sessionId) {
			await lucia.invalidateSession(sessionId);
		}

		return redirect(302, '/login');
	}
}
