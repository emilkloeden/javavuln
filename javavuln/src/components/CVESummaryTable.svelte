<script>
	export let cvss_v3;
	export let cvss_v2_data;
	export let published_date;
	export let last_modified_date;
</script>

<table class="key-value">
	<thead />
	<tbody />
	{#if cvss_v3}
		<tr>
			<th>CVSS v3 Score</th><td>{cvss_v3}</td>
		</tr>
	{:else if cvss_v2_data}
		<tr>
			<th>CVSS v2 Score</th><td>{cvss_v2_data.baseScore}</td>
		</tr>
	{/if}
	{#if published_date}
		<tr>
			<th>Published</th><td>{published_date}</td>
		</tr>
	{/if}
	{#if last_modified_date}
		<tr>
			<th>Updated</th>
			<td>{last_modified_date}</td>
		</tr>
	{/if}
</table>
