<script context="module">
	export const load = async ({ fetch }) => {
		const { VITE_API_PORT } = import.meta.env;
		const res = await fetch(`http://localhost:${VITE_API_PORT}/projects`);
		const projects = await res.json();

		return {
			props: {
				projects
			}
		};
	};
</script>

<script>
	export let projects;
</script>

<div class="main">
	<h1>Projects</h1>
	<table class="table-striped">
		<thead>
			<tr>
				<th>Project</th>
				<th>Libraries</th>
				<th>CVEs</th>
				<th>Highest CVSS v3 Score</th>
				<th>Critical</th>
				<th>High</th>
				<th>Medium</th>
				<th>Low</th>
				<th>None</th>
				<th>Unknown</th>
			</tr>
		</thead>
		<tbody>
			{#each projects as project}
				<tr id={project.id}>
					<td><a href={`/projects/${project.id}`}>{project.project_name}</a></td>
					<td class="center-text">{project.count_dependencies}</td>
					<td class="center-text">{project.count_cves}</td>
					<td class="center-text">{project.max_cvss_v3}</td>
					<td class="center-text">{project.count_critical}</td>
					<td class="center-text">{project.count_high}</td>
					<td class="center-text">{project.count_medium}</td>
					<td class="center-text">{project.count_low}</td>
					<td class="center-text">{project.count_none}</td>
					<td class="center-text">{project.count_unknown}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
