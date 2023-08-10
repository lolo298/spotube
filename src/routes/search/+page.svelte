<script lang="ts">
	import Track from '$lib/components/Track.svelte';
	// import debounce from 'lodash/debounce';
	import { asyncDebounce } from '$lib/utils';

	let search = '';
	let page = 1;
	let url: string;
	const debouncedSearch = asyncDebounce(searchSpotify, 500);
	let promise: Promise<SpotifyTracksSearch>;

	$: console.log(search, page, promise)

	$: url = `/api/search?q=${search}&page=${page}`;
	$: promise = debouncedSearch(search, page) as Promise<SpotifyTracksSearch>;

	async function searchSpotify(search: string, page: number): Promise<SpotifyTracksSearch | undefined> {
		if (!search) return;
		const res = await fetch(url);
		const data = await res.json();
		return data;
	}
</script>

<h1>Searching the api</h1>

<input type="text" bind:value={search} />

{#await promise}
	<p>Searching...</p>
{:then data}
	{#if data?.tracks.items.length}
	{console.log(data)}
		<div class="trackWrapper">
			{#each data?.tracks.items as track}
				<Track {track} />
			{/each}
		</div>

		{#if data.tracks.previous}
			<button on:click={() => page--}>Previous</button>
		{/if}

		{#if data.tracks.next}
			<button on:click={() => page++}>Next</button>
		{/if}
	{:else}
		<p>No results</p>
	{/if}
{:catch error}
	<p>Error: {error.message}</p>
{/await}

<style>
	.trackWrapper {
		display: flex;
		flex-direction: column;
	}
</style>
