<script lang="ts">
	import Grid, { GridItem } from 'svelte-grid-extended';
	import Track from '$lib/components/Track.svelte';
	import TrackSkeleton from '$lib/components/TrackSkeleton.svelte';
	import { asyncDebounce } from '$lib/utils/client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Input from '$components/ui/input/Input.svelte';

	export let data: PageData;

	let search: string;
	let page = 1;
	const debouncedSearch = asyncDebounce(searchSpotify, 500);
	let promise: Promise<SpotifyTracksSearch>;

	$: promise = debouncedSearch(search, page) as Promise<SpotifyTracksSearch>;

	async function searchSpotify(
		search: string,
		page: number
	): Promise<SpotifyTracksSearch | undefined> {
		if (!search) return data.tracks;
		const res = await fetch(`/api/search?q=${search}&page=${page}`);
		const searchData = await res.json();
		return searchData.tracks;
	}
</script>

<div class="flex flex-row gap-4 items-center">
	<h1>Searching the api</h1>
	<Input type="text" bind:value={search} class="w-80" />
</div>

{#await promise}
	<p>Searching...</p>
	<div class="flex flex-col gap-4">
		{#each Array(10) as _, i (i)}
			<TrackSkeleton />
		{/each}
	</div>
{:then data}
	{#if data.items.length}
		<div class="flex flex-col gap-4">
			{#each data.items as track (track.id)}
				<Track {track} />
			{/each}
		</div>

		{#if data.previous}
			<button on:click={() => page--}>Previous</button>
		{/if}

		{#if data.next}
			<button on:click={() => page++}>Next</button>
		{/if}
	{:else}
		<p>No results</p>
	{/if}
{:catch error}
	<p>Error: {error.message}</p>
{/await}
