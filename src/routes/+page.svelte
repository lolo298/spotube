<script lang="ts">
	import { tweened } from 'svelte/motion';
	import NeedAuth from '$lib/components/NeedAuth.svelte';
	const value = tweened(0, {
		duration: 1000
	});

	function incValue() {
		if ($value == 0) {
			value.set(100);
		} else {
			value.set(0);
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<NeedAuth let:user>
	<div>
		<p>Logged in as {user?.name}</p>
		<a href="/api/auth/logout">Logout</a>
		<a href="/search">search</a>
	</div>

	<div slot="signedOut">
		<a href="/api/auth/spot">Login to spotify</a>
		<p>Not Logged in</p>
	</div>
</NeedAuth>

<div class="container" style="--translateX: {$value}px" />
<button on:click={incValue}>Increment</button>

<style>
	.container {
		width: 100px;
		height: 100px;
		background-color: red;
		transform: translateX(var(--translateX));
	}
</style>
