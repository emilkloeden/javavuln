<script context="module">
	export const load = async ({ fetch }) => {
		const { VITE_API_PORT } = import.meta.env;
		const res = await fetch(`http://localhost:${VITE_API_PORT}/libraries`);
		const libraries = await res.json();

		return {
			props: {
				libraries
			}
		};
	};
</script>

<script>
	import ExtendedLibraryTable from '../../components/ExtendedLibraryTable.svelte';

	export let libraries;
</script>

<div class="main container">
	<h1>Libraries</h1>
	<ExtendedLibraryTable {libraries} />
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
