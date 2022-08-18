export const load = async ({ fetch }) => {
	const res = await fetch(`http://localhost:3001`);
	const { projects, libraries, vulnerabilities } = await res.json();

	return {
		projects,
		libraries,
		vulnerabilities
	};
};
