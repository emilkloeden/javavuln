<script>
	import CVEsTable from '../../components/CVEsTable.svelte';
	export let data;
	let { cves } = data;
</script>

<div class="main">
	<h1>Vulnerabilities</h1>
	<CVEsTable {cves} />
</div>
