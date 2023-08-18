<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	interface $$Props extends SVGAttributes<SVGElementTagNameMap['svg']> {
		class?: string;
	}
</script>

<svg xmlns="http://www.w3.org/2000/svg" {...$$restProps} viewBox="0 0 100 100">
	<circle cx="50" cy="50" r="10" fill="transparent" />
	<g>
		<line
			x1="50"
			y1="20"
			x2="50"
			y2="10"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="50"
			y1="90"
			x2="50"
			y2="80"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="20"
			y1="50"
			x2="10"
			y2="50"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="90"
			y1="50"
			x2="80"
			y2="50"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="30"
			y1="30"
			x2="20"
			y2="20"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="70"
			y1="70"
			x2="80"
			y2="80"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="30"
			y1="70"
			x2="20"
			y2="80"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<line
			x1="70"
			y1="30"
			x2="80"
			y2="20"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</g>
</svg>
