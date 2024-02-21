<script>
	import { page } from '$app/stores';
	import LoginButton from '$lib/components/LoginButton.svelte';

	page.subscribe((value) => {
		if (value.data.session?.user) {
			console.log(value.data.session.user);
		} else {
			console.log('Not signed in.');
		}
	});
</script>

<LoginButton provider="github" label="Sign in with GitHub" />
<LoginButton provider="google" label="Sign in with Google" />
<LoginButton provider="spotify" label="Sign in with Spotify" />
