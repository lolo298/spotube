<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { queryString } from '$lib';
	// import type { PageData } from './$types';

	// export let data: PageData;

	const queryParams = queryString.stringify({
		redirect: '/signin/link'
	});

	const spotify = {
		handle: () => {
			window.open(`/api/auth/spot?${queryParams}`, '_blank');
		},
		callback: (res: Response) => {
			console.log(res);
		}
	};
</script>

<Button on:click={spotify.handle}>Link your spotify account</Button>
<button>Link your youtube account</button>
