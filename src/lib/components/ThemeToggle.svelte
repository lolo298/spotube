<script lang="ts">
	import { onMount } from 'svelte';
	import { isTheme } from '$lib';
	import { userPreferencesStore } from '$lib/stores';
	import IconCheckbox from '$components/IconCheckbox.svelte';
	import { Sun, Moon } from '$components/icons/';
	import { browser } from '$app/environment';

	// $: console.trace($userPreferencesStore.theme);

	$: if (browser) {
		document.body.classList.remove('light', 'dark');
		document.querySelector('html')?.classList.remove('light', 'dark');
		document.querySelector('html')?.classList.add($userPreferencesStore.theme);
	}
	function handleToggle(e: CustomEvent) {
		const checked = e.detail;
		const newTheme = checked ? 'dark' : 'light';
		// userPreferencesStore.set(newTheme);
		$userPreferencesStore.theme = newTheme;
	}

	function handleThemeInit() {
		return $userPreferencesStore.theme === 'dark';
	}
</script>

<IconCheckbox on:toggle={handleToggle} init={handleThemeInit}>
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
