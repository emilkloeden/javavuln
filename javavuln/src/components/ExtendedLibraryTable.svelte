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
			<th>Critical</th>
			<th>High</th>
			<th>Medium</th>
			<th>Low</th>
			<th>None</th>
			<th>Unknown</th>
		</tr>
	</thead>
	<tbody>
		{#each libraries as library}
			<tr id={library.id}>
				<td><a href={`/libraries/${library.id}`}>{library.name}</a></td>
				<td>{library.version || 'Unknown'}</td>
				<td>{library.group_id || ''}</td>
				<td>{library.artifact_id || ''}</td>
				<td class="center-text">{library.count_cves}</td>
				<td class="center-text">{library.max_cvss_v3 || 'N/A'}</td>
				<td class="center-text">{library.count_critical}</td>
				<td class="center-text">{library.count_high}</td>
				<td class="center-text">{library.count_medium}</td>
				<td class="center-text">{library.count_low}</td>
				<td class="center-text">{library.count_none}</td>
				<td class="center-text">{library.count_unknown}</td>
			</tr>
		{/each}
	</tbody>
</table>
