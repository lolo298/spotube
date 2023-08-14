<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="POST">
	<input type="text" name="username" placeholder="Username" value={form?.username ?? ''} />
	<input type="email" name="email" placeholder="Email" value={form?.email ?? ''} />
	<input type="password" name="password" placeholder="Password" />
	<input type="password" name="password2" placeholder="Confirm Password" />
	<button type="submit">Create my account</button>
	{#if !form?.success && form?.message}
		<p style="color: red;">{form?.message}</p>
	{/if}
</form>
<a href="/login">Already have an account? Login here.</a>
