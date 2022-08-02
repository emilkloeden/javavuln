<script context="module">
	export const load = async ({ fetch, params }) => {
		const { project_id } = params;
		const { VITE_API_PORT } = import.meta.env;
		const projectRes = await fetch(`http://localhost:${VITE_API_PORT}/projects/${project_id}`);
		const { project_name: projectName } = await projectRes.json();

		const res = await fetch(`http://localhost:${VITE_API_PORT}/projects/${project_id}/libraries`);
		const projectLibraries = await res.json();

		return {
			props: {
				projectName,
				projectLibraries
			}
		};
	};
</script>

<script>
	export let projectName;
	export let projectLibraries;
</script>

<div class="main">
	<h1>{projectName}</h1>
	<table class="table-striped">
		<thead>
			<tr>
				<th>Library</th>
				<th>Version</th>
				<th>groupId</th>
				<th>artifactId</th>
				<th>CVEs</th>
				<th>Highest CVSS v3</th>
			</tr>
		</thead>
		<tbody>
			{#each projectLibraries as library}
				<tr>
					<td><a href={`/libraries/${library.id}`}>{library.name}</a></td>
					<td>{library.version || 'Unknown'}</td>
					<td>{library.group_id || ''}</td>
					<td>{library.artifact_id || ''}</td>
					<td class="center-text">{library.count_cves}</td>
					<td class="center-text">{library.max_cvss_v3 || ''}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
