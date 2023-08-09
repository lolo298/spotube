<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened, spring } from 'svelte/motion';
	const value = tweened(0, {
    duration: 1000,
  });

	function incValue() {
		if($value == 0) {
      value.set(100);
    } else {
      value.set(0);
    }
	}

	export let data;
	let user:User = data.user;


</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if user}
	<p>Logged in as {user.display_name}</p>
{:else}
	<p>Not logged in</p>
{/if}
<a href="/api/auth/spot">Login to spotify</a>

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
