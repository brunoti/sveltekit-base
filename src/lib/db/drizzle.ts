import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { resolve } from 'node:path'
import * as schema from './schema'

export const client = createClient({
  url: `file:${resolve(import.meta.dirname, 'db.sqlite')}`
})

export const db = drizzle(client, {
  schema: schema
})

export type DbSchema = typeof schema
export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]
