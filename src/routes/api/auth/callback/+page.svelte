<script lang="ts">
	import { onMount } from "svelte";
import type { PageData } from "./$types";

export let data: PageData;

let {user, preferences, ...returnedData} = data;

console.log(returnedData);

onMount(() => {
  console.log(window.opener.spotify);
  window.opener.spotify.callback(returnedData);
  window.close();
});
</script>