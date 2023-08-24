<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	export const csr = true;

	interface $$Props {
		init?: () => boolean;
		checked?: boolean;
	}

	interface $$Events {
		toggle: CustomEvent<boolean>;
	}

	type Dispatcher<TEvents extends Record<keyof TEvents, CustomEvent>> = {
		[Property in keyof TEvents]: TEvents[Property]['detail'];
	};

	const dispatcher = createEventDispatcher<Dispatcher<$$Events>>();
	export let checked: boolean;

	function change(event: Event) {
		checked = (event.target as HTMLInputElement).checked;
		dispatcher('toggle', checked);
	}
</script>

<input type="checkbox" id="toggle" class="hidden" bind:checked on:change={change} />
<label for="toggle" class="w-10 h-10">
	<div class:hidden={!checked}>
		<slot name="checked" class={!checked && 'hidden'} />
	</div>
	<div class:hidden={checked}>
		<slot name="unchecked" class={checked && 'hidden'} />
	</div>
</label>
