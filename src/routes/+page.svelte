<script>
	import { enhance } from "$app/forms"
	import { Button } from "$lib/components/ui/button"
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form use:enhance method="POST" action="?/logout">
	<Button type="submit">Logout</Button>
</form>
