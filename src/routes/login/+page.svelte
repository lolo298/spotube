<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form?.success && goto('/');
</script>

<form method="POST" use:enhance>
	<input type="text" name="username" placeholder="Username" />
	<input type="password" name="password" placeholder="Password" />
	<button type="submit">Login</button>
	{#if !form?.success && form?.message}
		<p style="color: red;">{form?.message}</p>
	{/if}
</form>
<a href="/signin">Don't have an account? Sign up here.</a>
