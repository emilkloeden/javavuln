
export const load = async ({ fetch, params }) => {
	const { cve } = params;
	const urlBase = `http://localhost:3001`;
	const res = await fetch(`${urlBase}/cves/${cve}`);
	const cveDetails = await res.json();
	const {
		description,
		published_date,
		severity,
		cvss_v3,
		last_modified_date,
		cvss_v3_data,
		cvss_v2_data,
		references
	} = cveDetails;

	const cveLibrariesRes = await fetch(`${urlBase}/cves/${cve}/libraries`);
	const cveLibraries = await cveLibrariesRes.json();

	const cveProjectsRes = await fetch(`${urlBase}/cves/${cve}/projects`);
	const cveProjects = await cveProjectsRes.json();

	return {
		cve,
		description,
		published_date,
		severity,
		cvss_v3,
		last_modified_date,
		cvss_v3_data,
		cvss_v2_data,
		references,
		cveLibraries,
		cveProjects
	};
};
