<script lang="ts">
	import NeedAuth from '$lib/components/NeedAuth.svelte';

</script>

<NeedAuth let:user>
		<p>Logged in as {user?.name}</p>

	<div slot="signedOut">
		<p>Not Logged in</p>
	</div>
</NeedAuth>