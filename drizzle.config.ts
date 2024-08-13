import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:./src/lib/db/db.sqlite'
	},
	verbose: true,
	strict: true
})
