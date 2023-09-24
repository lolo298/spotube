<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { queryString } from '$lib';
	import { onMount } from 'svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;

	const queryParams = queryString.stringify({
		redirect: '/signin/link'
	});

	const spotify = {
		handle: () => {
			window.open(`/api/auth/spot?${queryParams}`, 'spotify', 'width=500,height=500');
		},
		callback: (res: Response) => {
			console.log(res);
		}
	};
onMount(() => {
	window.spotify = spotify;
});
</script>

<Button on:click={spotify.handle}>Link your spotify account</Button>
<button>Link your youtube account</button>
