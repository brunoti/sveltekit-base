import { db } from '$lib/db/drizzle'
import { users_table, type UserInsert } from '$lib/db/schema'

export async function signUpUser(
  user: Pick<UserInsert, 'email' | 'name' | 'passwordHash'>
): Promise<string> {
  const [{ insertedId: userId }] = await db
    .insert(users_table)
    .values({
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash
    })
    .returning({ insertedId: users_table.id })

  return userId
}
