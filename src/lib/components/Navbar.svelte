<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$components/ui';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import { onMount } from 'svelte';
	import NeedAuth from './NeedAuth.svelte';
	import { goto } from '$app/navigation';

	let sentinel: HTMLDivElement;
	let nav: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						nav.classList.remove('bg-gray-900', 'sticky');
					} else {
						nav.classList.add('bg-gray-900', 'sticky');
					}
				});
			},
			{
				rootMargin: '0px',
				threshold: 0,
				root: document
			}
		);

		observer.observe(sentinel);
	});

	function logout() {
		fetch('/api/auth/logout', {
			method: 'DELETE'
		}).then(() => {
			window.location.href = '/';
		});
	}
</script>

<div class="sentinel invisible w-full" style="height: 1px;" bind:this={sentinel} />
<nav class=" z-10 p-4 top-0 w-full h-20 flex items-center" bind:this={nav}>
	<h1 class="text-2xl font-bold ml-4">Spotube</h1>
	<div class="flex-grow">
		<ul class="flex justify-end items-center gap-4">
			<NeedAuth>
				<svelte:fragment>
					<li>
						<Button href="/search">Search</Button>
					</li>
					<li>
						<Button href="/profile">Profile</Button>
					</li>
					<li>
						<Button on:click={logout}>Logout</Button>
					</li>
				</svelte:fragment>
				<svelte:fragment slot="signedOut">
					<li>
						<Button href="/signin">Sign In</Button>
					</li>
					<li>
						<Button href="/login">Login</Button>
					</li>
				</svelte:fragment>
			</NeedAuth>
			<li>
				<ThemeToggle />
			</li>
		</ul>
	</div>
</nav>
