<!-- needAuth.svelte -->

<script lang="ts">
	import { userStore } from '$lib/stores';

	const user = $userStore;

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
