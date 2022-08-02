<script>
	export let cvss_v3_data;
</script>

<table class="key-value">
	<thead />
	<tbody>
		<tr>
			<th>Attack Vector</th>
			<td>{cvss_v3_data.attackVector}</td>
		</tr>
		<tr>
			<th>Attack Complexity</th>
			<td>{cvss_v3_data.attackComplexity}</td>
		</tr>
		<tr>
			<th>Privileges Required</th>
			<td>{cvss_v3_data.privilegesRequired}</td>
		</tr>
		<tr>
			<th>User Interaction</th>
			<td>{cvss_v3_data.userInteraction}</td>
		</tr>
		<tr>
			<th>Confidentiality Impact</th>
			<td>{cvss_v3_data.confidentialityImpact}</td>
		</tr>
		<tr>
			<th>Availability Impact</th>
			<td>{cvss_v3_data.integrityImpact}</td>
		</tr>
		<tr>
			<th>Integrity Impact</th>
			<td>{cvss_v3_data.availabilityImpact}</td>
		</tr>
	</tbody>
</table>
