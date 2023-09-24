<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Input, Label, Button } from '$components/ui';
	import type { ActionData } from './$types';
	import { userPreferencesStore } from '$lib/stores';

	export let form: ActionData;
	$: console.log(form);
	$: if (form?.success) {
		goto('/signin/link');
	} else {

	}
</script>

<form
method="POST"
use:enhance={({ formElement }) =>{
	console.log(form);
	return async ({ update }) => {
		formElement.reset();
		await update();
	}
}}
class="flex flex-col gap-4 p-6 dark:bg-gray-800 bg-opacity-50 rounded-md w-1/4"
>
<span class="text-red-500 text-xs">{form?.message ?? ''}</span>
	<div>
		<Label for="username" class="text-slate-400 text-xs">Username</Label>
		<Input type="text" name="username" value={form?.data?.username ?? ""} />
		<Label for="username" class="text-red-500 text-xs">{form?.errors?.username ?? ''}</Label>
	</div>

	<div>
		<Label for="email" class="text-slate-400 text-xs">Email</Label>
		<Input type="email" name="email" value={form?.data?.email ?? ''} />
		<Label for="email" class="text-red-500 text-xs">{form?.errors?.email ?? ''}</Label>
	</div>

	<div>
		<Label for="password" class="text-slate-400 text-xs">Password</Label>
		<Input type="password" name="password" />
		<Label for="password" class="text-red-500 text-xs">{form?.errors?.password ?? ''}</Label>
	</div>

	<div>
		<Label for="passwordConfirm" class="text-slate-400 text-xs">Confirm Password</Label>
		<Input type="password" name="passwordConfirm" />
		<Label for="passwordConfirm" class="text-red-500 text-xs"
			>{form?.errors?.passwordConfirm ?? ''}</Label
		>
	</div>

	<Button type="submit">Create my account</Button>
	<a href="/login" class="text-xs text-cyan-700 dark:text-cyan-300"
		>Already have an account? Login here.</a
	>
</form>
