<!-- needAuth.svelte -->

<script lang="ts">
	import { page } from "$app/stores";

  const user = $page.data.user;

  interface $$Slots {
    default: {
      user: User;
    };
    signedOut: {};
  }

</script>

{#if user}
  <slot user={user}/>
{:else}
  <slot name="signedOut" />
{/if}