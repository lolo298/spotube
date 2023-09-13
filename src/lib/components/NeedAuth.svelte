<!-- needAuth.svelte -->

<script lang="ts">
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';

	let user = $userStore;

	interface $$Slots {
		default: {
			user: User;
		};
		signedOut: object;
	}
</script>

{#if user}
	<slot {user} />
{:else}
	<slot name="signedOut" />
{/if}
