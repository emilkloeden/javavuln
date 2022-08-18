
export const load = async ({ fetch, params }) => {
	const urlBase = `http://localhost:3001`;
	const { library_id } = params;
	const res = await fetch(`${urlBase}/libraries/${library_id}`);
	const library = await res.json();
	const { id, path, name, version, group_id, artifact_id, latest_version } = library;
	const projectRes = await fetch(`${urlBase}/libraries/${library_id}/projects`);
	const projects = await projectRes.json();

	const cvesRes = await fetch(`${urlBase}/libraries/${library_id}/cves`);
	const cves = await cvesRes.json();

	return {
		projects,
		cves,
		path,
		name,
		version,
		group_id,
		artifact_id,
		latest_version
	};
};
