<script lang="ts">
	import AccountLink from '$components/AccountLink.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import { queryString } from '$lib';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	console.log(data);
	const linked = data.linkedAccounts;

	const queryParams = queryString.stringify({
		redirect: '/signin/link'
	});

	const spotify = {
		handle: () => {
			window.open(`/api/auth/spot?${queryParams}`, 'spotify', 'width=500,height=500');
		},
		callback: (e: MessageEvent) => {
			console.log(e);
		}
	};

	const youtube = {
		handle: () => {
			window.open(`/api/auth/spot?${queryParams}`, 'spotify', 'width=500,height=500');
		},
		callback: (e: MessageEvent) => {
			console.log(e);
		}
	};

	console.warn(linked);
</script>

<AccountLink
	name="spotify"
	callback={spotify.callback}
	linked={linked.find((a) => a.type === data.accountType.SPOTIFY) !== undefined}
/>
<AccountLink
	name="youtube"
	callback={youtube.callback}
	linked={linked.find((a) => a.type === data.accountType.YOUTUBE) !== undefined}
/>
