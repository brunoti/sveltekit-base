import { lucia } from '$lib/auth'
import { db } from '$lib/db/drizzle'
import { type Actions, fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { message, setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { hash } from '@node-rs/argon2'
import { users_table } from '$lib/db/schema'
import { SignupSchema } from './SignupSchema'
import { checkIfEmailExists } from '$lib/queries/users/check-if-email-exists'
import { signUpUser } from '$lib/queries/users/sign-up-user'

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(SignupSchema))
  return { form }
}

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(SignupSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    const passwordHash = await hash(form.data.password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    })

    if (await checkIfEmailExists({ email: form.data.email })) {
      setError(form, 'email', 'Email already exists')
      return fail(400, { form })
    }

    const userId = await signUpUser({
      name: form.data.name,
      email: form.data.email,
      passwordHash
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    })

    redirect(302, '/')
  }
}
