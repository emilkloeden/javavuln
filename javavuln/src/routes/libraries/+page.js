export const load = async ({ fetch }) => {
	console.log(`trying to fetch: 'http://localhost:3001/libraries'`)
	const res = await fetch(`http://localhost:3001/libraries`);
	const libraries = await res.json();
	console.log(`fetched 'http://localhost:3001/libraries'`)
	console.log(`returned ${res.status}`)
	return {
		libraries
	};
};
