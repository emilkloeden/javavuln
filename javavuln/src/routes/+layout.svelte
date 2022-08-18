<script>
	import Sidebar from '../components/Sidebar.svelte';
</script>

<main>
	<Sidebar />
	<slot />
</main>

<style>
	main {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 0;
		margin: 0;
	}
</style>
