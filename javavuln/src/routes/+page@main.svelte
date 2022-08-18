<script>
	import HeaderCount from '../components/HeaderCount.svelte';
	export let data;
	let { projects, libraries, vulnerabilities } = data;
</script>

<div class="page">
	<div class="hero">
		<h1 class="accent-color">Java</h1>
		<h1 class="second-accent-color">Vuln</h1>
	</div>
	<div class="page-body">
		<HeaderCount header="Projects" value={projects} href="/projects" />
		<HeaderCount header="Libraries" value={libraries} href="/libraries" />
		<HeaderCount header="Vulnerabilities" value={vulnerabilities} href="/cves" />
	</div>
</div>

<style>
	.page {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.hero,
	.page-body {
		height: 100%;
		display: f;
	}
	.page-body {
		display: flex;
		justify-content: center;
		gap: 4rem;
		margin-left: 3rem;
		margin-right: 3rem;
	}
	.hero {
		text-align: center;
		/* background-color: var(--second-accent-color); */
		min-height: 20rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.hero h1 {
		line-height: 1.2em;
		font-size: 5rem;
		margin: 0;
		padding: 0;
		display: block;
	}
	.accent-color {
		color: var(--accent-color);
	}
	.second-accent-color {
		color: var(--second-accent-color);
	}
</style>
