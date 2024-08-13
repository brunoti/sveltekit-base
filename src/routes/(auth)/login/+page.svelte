<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import * as Card from '$lib/components/ui/card/index.js'
	import * as Form from '$lib/components/ui/form/index.js'
	import { Button } from '$lib/components/ui/button/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { LoginSchema } from './LoginSchema'
	import * as Alert from '$lib/components/ui/alert'

	export let data

	const form = superForm(data.form, {
		validators: zodClient(LoginSchema),
		resetForm: false
	})

	console.log(form)

	const { form: formData, delayed, message, enhance } = form
</script>

<form use:enhance method="POST">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
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
				<Button type="submit" class="w-full" loading={$delayed}>Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/sign-up" class="underline"> Sign up </a>
			</div>
		</Card.Content>
	</Card.Root>
</form>
