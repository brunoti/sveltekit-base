import { lucia } from '$lib/auth'
import { db } from '$lib/db/drizzle'
import { type Actions, fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { message, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { verify } from '@node-rs/argon2'
import { users_table } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { LoginSchema } from './LoginSchema'

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(LoginSchema))
  return { form }
}

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(LoginSchema))
    try {
      if (!form.valid) {
        return message(form, 'Invalid form')
      }

      const user = await db.query.users_table.findFirst({
        where: eq(users_table.email, form.data.email)
      })

      const validPassword = await verify(user?.passwordHash ?? '', form.data.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      })

      if (!validPassword || !user) {
        return message(form, 'Incorrect email or password')
      }

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      })

      return redirect(302, '/')
    } catch (error) {
      return message(form, (error as Error)?.message ?? 'Something went wrong')
    }
  }
}
