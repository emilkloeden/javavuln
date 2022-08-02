<script context="module">
	export const load = async ({ fetch }) => {
		const { VITE_API_PORT } = import.meta.env;
		const res = await fetch(`http://localhost:${VITE_API_PORT}/cves`);
		const cves = await res.json();

		return {
			props: {
				cves
			}
		};
	};
</script>

<script>
	import CVEsTable from '../../components/CVEsTable.svelte';

	export let cves;
</script>

<div class="main">
	<h1>Vulnerabilities</h1>
	<CVEsTable {cves} />
</div>
