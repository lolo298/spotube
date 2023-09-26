<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { queryString } from '$lib';
	import { onMount } from 'svelte';

	export let callback: (event: MessageEvent) => void;
	export let linked = false;
	export let name: string;

	const queryParams = queryString.stringify({
		redirect: '/signin/link'
	});

	const link = {
		handle: () => {
			const popup = window.open(`/api/auth/spot?${queryParams}`, 'spotify', 'width=500,height=500');
			if (!popup) {
				throw new Error('Popup blocked');
			}
		},
		callback: (e: MessageEvent) => {
			if (!e.data?.source) {
				return;
			}
			// if(e.data.success) linked = true;
			callback(e);
		}
	};
</script>

<svelte:window on:message={link.callback} />

<Button on:click={link.handle} disabled={linked}>Link your {name} account</Button>
