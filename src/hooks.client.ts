//client hooks

const { fetch: originalFetch } = window;

window.fetch = async function (input, init) {
	console.log('fetching', input, init);

	const res = await originalFetch(input, init);
	if (res.status === 401) {
		window.location.href = `/api/auth/spot?redirect=${encodeURIComponent(
			window.location.pathname
		)}`;
	}
	console.log('fetched', res);
	return res;
};
