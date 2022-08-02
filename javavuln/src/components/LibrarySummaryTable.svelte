<script>
	export let version;
	export let group_id;
	export let artifact_id;
	export let path;
</script>

<table class="key-value">
	<thead />
	<tbody>
		{#if version}
			<tr>
				<th>Version</th>
				<td>{version}</td>
			</tr>
		{/if}
		{#if group_id}
			<tr>
				<th>groupId</th>
				<td>{group_id}</td>
			</tr>
		{/if}
		{#if artifact_id}
			<tr>
				<th>artifactId</th>
				<td>{artifact_id}</td>
			</tr>
		{/if}
		{#if path}
			<tr>
				<th>jar path</th>
				<td>{path}</td>
			</tr>
		{/if}
	</tbody>
</table>
