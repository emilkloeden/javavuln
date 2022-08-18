<script>
	import SeverityLabel from './SeverityLabel.svelte';

	export let cves;
	export const accent_color = '#820C0C';
</script>

<table class="table-striped">
	<thead>
		<tr>
			<th>CVE</th>
			<th colspan="3">Description</th>
			<th>Published Date</th>
			<th>Severity</th>
			<th>CVSS V3</th>
		</tr>
	</thead>
	<tbody>
		{#each cves as { cve, direct, description, published_date, severity, cvss_v3 }}
			<tr id={cve}>
				<td><a href={`/cves/${cve}`}>{cve}</a></td>
				<td colspan="3">{description || ''}</td>
				<td class="center-text">{published_date?.slice(0, 10) || ''}</td>
				<td class="center-text"><SeverityLabel {severity} /></td>
				<td class="center-text">{cvss_v3 || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	:root {
		font-size: 0.9rem;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	}
	* {
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	}
	table,
	th,
	td {
		border: 1px solid var(--bg-accent-color);
		border-collapse: collapse;
	}
	th {
		font-weight: 900;
	}

	tbody tr:nth-child(odd) {
		background-color: var(--bg-accent-color);
	}

	.true,
	.false {
		color: white;
		width: 100%;
		text-align: center;
		padding: 0.25em 1em;
	}
	.true {
		background: green;
	}
	.false {
		background-color: orangered;
	}
</style>
