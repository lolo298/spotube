<script lang="ts">
	import Track from '$lib/components/Track.svelte';
	import TrackSkeleton from '$lib/components/TrackSkeleton.svelte';
	import { asyncDebounce } from '$lib/utils';

	let search = '';
	let page = 1;
	const debouncedSearch = asyncDebounce(searchSpotify, 500);
	let promise: Promise<SpotifyTracksSearch>;
	export let data;

	$: console.log('test: ', data);

	$: promise = debouncedSearch(search, page) as Promise<SpotifyTracksSearch>;

	async function searchSpotify(
		search: string,
		page: number
	): Promise<SpotifyTracksSearch | undefined> {
		if (!search) return;
		const res = await fetch(`/api/search?q=${search}&page=${page}`);
		const data = await res.json();
		return data;
	}
</script>

<h1>Searching the api</h1>
<div class="search">
	<input type="text" bind:value={search} />
</div>

{#await promise}
	<p>Searching...</p>
	<div class="trackWrapper">
		{#each Array(10) as _}
			<TrackSkeleton />
		{/each}
	</div>
{:then data}
	{#if data?.tracks.items.length}
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

	.search {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
