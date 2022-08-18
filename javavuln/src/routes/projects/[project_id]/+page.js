
export const load = async ({ fetch, params }) => {
	const { project_id } = params;
	const projectRes = await fetch(`http://localhost:3001/projects/${project_id}`);
	const { project_name: projectName } = await projectRes.json();

	const res = await fetch(`http://localhost:3001/projects/${project_id}/libraries`);
	const projectLibraries = await res.json();

	return {
		projectName,
		projectLibraries
	};
};
