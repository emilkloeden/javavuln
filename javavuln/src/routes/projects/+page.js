export const load = async ({ fetch }) => {
	const res = await fetch(`http://localhost:3001/projects`);
	const projects = await res.json();

	return {
		projects
	};
};
