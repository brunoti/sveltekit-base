<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import * as Card from '$lib/components/ui/card/index.js'
	import * as Form from '$lib/components/ui/form/index.js'
	import { Button } from '$lib/components/ui/button/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { SignupSchema } from './SignupSchema'
	import * as Alert from '$lib/components/ui/alert'

	export let data

	const form = superForm(data.form, {
		validators: zodClient(SignupSchema)
	})

	const { form: formData, delayed, enhance, message } = form
</script>

<form use:enhance method="POST">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if $message}
				<Alert.Root variant="destructive">
					<iconify-icon icon="mdi:alert-circle" />
					<Alert.Title>Ops!</Alert.Title>
					<Alert.Description>{$message}</Alert.Description>
				</Alert.Root>
			{/if}
			<div class="grid gap-2">
				<Form.Field {form} name="name">
					<Form.Control let:attrs>
						<Form.Label for="name">Name</Form.Label>
						<Input placeholder="Max" {...attrs} bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label for="email">Email</Form.Label>
						<Input
							placeholder="m@example.com"
							type="email"
							{...attrs}
							bind:value={$formData.email}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label for="password">Password</Form.Label>
						<Input type="password" {...attrs} bind:value={$formData.password} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="passwordConfirmation">
					<Form.Control let:attrs>
						<Form.Label for="passwordConfirmation">Password confirmation</Form.Label>
						<Input type="password" {...attrs} bind:value={$formData.passwordConfirmation} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Button type="submit" class="w-full" loading={$delayed}>Create an account</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline"> Sign in </a>
			</div>
		</Card.Content>
	</Card.Root>
</form>
