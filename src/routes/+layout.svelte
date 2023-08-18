<script lang="ts">
	import Navbar from '$components/Navbar.svelte';
	import { userPreferencesStore, userStore } from '$lib/stores';
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import bg from '$lib/img/bg.png';

	export let data: LayoutData;
	userStore.set(data.user);
	userPreferencesStore.set(data.preferences);
</script>

<img src={bg} alt="bg" class="absolute -top-3 right-0 -z-50 h-screen w-full" />
<Navbar />
<slot />
