<div class="track">
	<div class="circle" />
	<div class="text" />
</div>

<style>
	.track {
		--gradient: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.circle {
		border-radius: 15%;
		width: 50px;
		height: 50px;
		background: var(--gradient);
		background-size: 200% 200%;
		animation: load 1.5s linear infinite;
	}
	.text {
		width: 100%;
		height: 20px;
		background: var(--gradient);
		background-size: 200% 200%;
		animation: load 1.5s linear infinite;
	}

	@keyframes load {
		to {
			background-position: -200% 0;
		}
	}
</style>
