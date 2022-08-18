<script>
	import ExtendedLibraryTable from '../../components/ExtendedLibraryTable.svelte';

	export let data;
	let { libraries } = data;
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
