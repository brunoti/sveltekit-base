import { lucia } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event,  resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		if (!event.route.id?.startsWith('/(auth)')) {
			return redirect(302, '/login');
		}

		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;

	if (event.route.id?.startsWith('/(auth)') && user) {
		return redirect(302, '/');
	}

	return resolve(event);
};
