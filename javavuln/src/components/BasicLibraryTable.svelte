<script>
	export let libraries;
</script>

<table class="table-striped">
	<thead>
		<tr>
			<th>Library</th>
			<th>Version</th>
			<th>groupId</th>
			<th>artifactId</th>
			<th>CVEs</th>
			<th>Highest CVSS v3 Score</th>
		</tr>
	</thead>
	<tbody>
		{#each libraries as library}
			<tr id={library.id}>
				<td><a href={`/libraries/${library.id}`}>{library.name}</a></td>
				<td>{library.version}</td>
				<td>{library.group_id}</td>
				<td>{library.artifact_id}</td>
				<td>{library.count_cves}</td>
				<td>{library.max_cvss_v3}</td>
			</tr>
		{/each}
	</tbody>
</table>
