<script>
	export let cvss_v2_data;
</script>

<table class="key-value">
	<thead />
	<tbody>
		<tr>
			<th>Access Vector</th>
			<td>{cvss_v2_data.accessVector}</td>
		</tr>
		<tr>
			<th>Access Complexity</th>
			<td>{cvss_v2_data.accessComplexity}</td>
		</tr>
		<tr>
			<th>Authentication</th>
			<td>{cvss_v2_data.authentication}</td>
		</tr>
		<tr>
			<th>Confidentiality Impact</th>
			<td>{cvss_v2_data.confidentialityImpact}</td>
		</tr>
		<tr>
			<th>Availability Impact</th>
			<td>{cvss_v2_data.integrityImpact}</td>
		</tr>
		<tr>
			<th>Integrity Impact</th>
			<td>{cvss_v2_data.availabilityImpact}</td>
		</tr>
	</tbody>
</table>
