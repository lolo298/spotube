<script lang="ts">
	import Navbar from '$components/Navbar.svelte';
	import { userStore } from '$lib/stores';
	import '../app.postcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	userStore.set(data.user);
	console.log('layout data: ', data);
</script>

<Navbar />
<slot />
