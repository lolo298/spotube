<script lang="ts">
	export let track: SpotifyTrack;
</script>

<div class="track">
	<div class="relative">
		<img
			src="/Spotify_Icon_RGB_Green.png"
			alt="spotify"
			class="absolute w-3 aspect-square bottom-0 right-0 bg-white rounded-full"
		/>
		<img src={track.album.images[2].url} alt={track.name} class="w-12 aspect-square rounded-lg" />
	</div>
	<div class="text">
		{#if track.explicit}
			<span>EXPLICIT</span>
		{/if}
		{track.name} by {track.artists[0].name}
	</div>
</div>

<style>
	.track {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.text {
		width: 100%;
		height: 20px;
	}
</style>
