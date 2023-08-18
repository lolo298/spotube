<script lang="ts">
	import { Button, Input, Label } from '$components/ui';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form?.success && goto('/');
</script>

<form method="POST" use:enhance>
	<Input type="text" name="username" placeholder="Username" />
	<Input type="password" name="password" placeholder="Password" />
	<Button type="submit">Login</Button>
	{#if !form?.success && form?.message}
		<p style="color: red;">{form?.message}</p>
	{/if}
</form>
<Button href="/signin">Don't have an account? Sign up here.</Button>
