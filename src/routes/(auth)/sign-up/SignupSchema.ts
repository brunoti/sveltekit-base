import { z } from 'zod'

export const SignupSchema = z
	.object({
		name: z.string().min(2).default(''),
		email: z.string().email().default(''),
		password: z.string().min(6).default(''),
		passwordConfirmation: z.string().min(6).default('')
	})
	.superRefine(({ password, passwordConfirmation }, ctx) => {
		if (password !== passwordConfirmation) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['passwordConfirmation']
			})
		}
	})
