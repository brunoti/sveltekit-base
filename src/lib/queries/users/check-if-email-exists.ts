import { db } from '$lib/db/drizzle'
import { users_table } from '$lib/db/schema'
import { eq } from 'drizzle-orm'

export async function checkIfEmailExists({ email }: { email: string }): Promise<boolean> {
  const [{ id } = { id: null }] = await db
    .select({ id: users_table.id })
    .from(users_table)
    .where(eq(users_table.email, email))

  return !!id
}
