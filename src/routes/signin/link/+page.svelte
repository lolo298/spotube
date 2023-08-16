<script lang="ts">
	import { queryString } from '$lib';
	import type { PageData } from './$types';

	// export let data: PageData;

	const queryParams = queryString.stringify({
		redirect: '/signin/link'
	});
</script>

<a href="/api/auth/spot?{queryParams}">Link your spotify account</a>
<button>Link your youtube account</button>
