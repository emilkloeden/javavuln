export const load = async ({ fetch }) => {
	const res = await fetch(`http://localhost:3001/cves`);
	const cves = await res.json();

	return {
		cves
	};
};
