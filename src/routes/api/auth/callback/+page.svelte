<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user, preferences, ...returnedData } = data;

	onMount(() => {
		window.opener.postMessage(returnedData, window.location.origin);
		// window.opener.spotify.callback(returnedData);
		window.close();
	});
</script>
