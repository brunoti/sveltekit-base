import { text, integer, sqliteTable as table } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import type { z } from 'zod'

export const users_table = table('users', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`current_timestamp`),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  deactivatedAt: integer('deactivated_at', { mode: 'timestamp' })
})

export const UserSelect = createSelectSchema(users_table)
export type UserSelect = z.infer<typeof UserSelect>

export const UserInsert = createInsertSchema(users_table)
export type UserInsert = z.infer<typeof UserInsert>

export const sessions_table = table('sessions', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users_table.id),
  expiresAt: integer('expires_at').notNull()
})
