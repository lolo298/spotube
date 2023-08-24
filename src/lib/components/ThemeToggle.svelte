<script lang="ts">
	import { browser } from '$app/environment';

	import IconCheckbox from '$components/IconCheckbox.svelte';
	import { Sun, Moon } from '$components/icons/';
	import { userPreferencesStore } from '$lib/stores';
	import { get } from 'svelte/store';

	let checked: boolean = $userPreferencesStore.theme === 'dark';

	$: console.log($userPreferencesStore);

	$: if (browser) {
		if (checked) {
			$userPreferencesStore.theme = 'dark';
		} else {
			$userPreferencesStore.theme = 'light';
		}

		fetch('/api/preferences', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify($userPreferencesStore)
		});

		document.querySelector('html')?.classList.remove('dark', 'light');
		document.querySelector('html')?.classList.add($userPreferencesStore.theme);
	}
</script>

<IconCheckbox bind:checked>
	<span slot="checked">
		<Moon
			width="32px"
			height="32px"
			class="stroke-slate-500 hover:stroke-slate-300 cursor-pointer"
			stroke-width="52px"
		/>
	</span>
	<span slot="unchecked">
		<Sun
			width="32px"
			height="32px"
			class="stroke-slate-400 hover:stroke-slate-600 cursor-pointer"
			stroke-width="8px"
		/>
	</span>
</IconCheckbox>
