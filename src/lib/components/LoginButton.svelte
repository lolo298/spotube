<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Button from './ui/button/button.svelte';

	type AvailableProviders = 'github' | 'google' | 'spotify';

	export let provider: AvailableProviders;
	export let label: string;

	let icon: string;
	let bonus: string;
	switch (provider) {
		case 'github':
			icon = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg';
			bonus = 'invert brightness-0 dark:brightness-100 dark:invert-0';
			break;
		case 'google':
			icon = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg';
			bonus = '';
			break;
		case 'spotify':
			icon = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg';
			bonus = '';
			break;
	}
</script>

<Button on:click={() => signIn(provider)}>
	<img src={icon} alt={provider} class={`w-8 ${bonus}`} />
	{label}
</Button>
