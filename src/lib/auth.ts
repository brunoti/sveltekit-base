import { Lucia } from 'lucia'
import { LibSQLAdapter as Adapter } from '@lucia-auth/adapter-sqlite'
import { client } from '$lib/db/drizzle'
import { omit } from 'remeda'
import type { UserSelect } from '$lib/db/schema'
import { dev } from '$app/environment'

const adapter = new Adapter(client, {
  user: 'users',
  session: 'sessions'
})

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attr: UserSelect) => omit(attr, ['passwordHash', 'id'])
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: UserSelect
  }
}
