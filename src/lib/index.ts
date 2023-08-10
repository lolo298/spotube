// place files you want to import through the `$lib` alias in this folder.
export const queryString = {
	stringify: (obj: Record<string, string>) => {
		return Object.keys(obj)
			.map((key) => {
				return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
			})
			.join('&');
	},
	parse: (str: string) => {
		return str.split('&').reduce((acc: Record<string, string>, cur) => {
			const [key, value] = cur.split('=');
			acc[decodeURIComponent(key)] = decodeURIComponent(value);
			return acc;
		}, {});
	}
};
