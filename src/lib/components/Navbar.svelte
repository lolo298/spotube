<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$components/ui';
</script>

<nav class="sticky top-0 w-full h-14 flex items-center">
	<h1 class="text-2xl font-bold ml-4">Spotube</h1>
	<div class="flex-grow">
		<ul class="flex justify-end items-center gap-4">
			{#if $page.data.user}
				<li>
					<Button href="/search">Search</Button>
				</li>
				<li>
					<Button href="/profile">Profile</Button>
				</li>
				<li>
					<Button href="/api/auth/logout">Logout</Button>
				</li>
			{/if}
		</ul>
	</div>
</nav>
