<!-- needAuth.svelte -->

<script lang="ts">
	import { page } from '$app/stores';

	const user = $page.data.user;

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
