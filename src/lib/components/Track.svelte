<script lang="ts">
	export let track: SpotifyTrack;
</script>

<div class="track">
	<img src={track.album.images[2].url} alt={track.name} />
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

	img {
		border-radius: 15%;
		width: 50px;
		height: 50px;
	}

	.text {
		width: 100%;
		height: 20px;
	}
</style>
