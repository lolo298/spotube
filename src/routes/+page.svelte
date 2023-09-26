<script lang="ts">
	import { userPreferencesStore, userStore } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	userStore.set(data.user);
	userPreferencesStore.set(data.preferences);
</script>

<p>Spotube is a client for streaming music from your Spotify and YouTube accounts.</p>
