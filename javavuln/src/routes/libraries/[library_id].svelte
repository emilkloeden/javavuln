<script context="module">
	export const load = async ({ fetch, params }) => {
		const { VITE_API_PORT } = import.meta.env;
		const urlBase = `http://localhost:${VITE_API_PORT}`;
		const { library_id } = params;
		const res = await fetch(`${urlBase}/libraries/${library_id}`);
		const library = await res.json();
		const { id, path, name, version, group_id, artifact_id, latest_version } = library;
		const projectRes = await fetch(`${urlBase}/libraries/${library_id}/projects`);
		const projects = await projectRes.json();

		const cvesRes = await fetch(`${urlBase}/libraries/${library_id}/cves`);
		const cves = await cvesRes.json();

		return {
			props: {
				projects,
				cves,
				path,
				name,
				version,
				group_id,
				artifact_id,
				latest_version
			}
		};
	};
</script>

<script>
	import LibrariesCVEsTable from '../../components/LibrariesCVEsTable.svelte';
	import ProjectsList from '../../components/ProjectsList.svelte';
	import LatestVersionCard from '../../components/LatestVersionCard.svelte';
	import LibrarySummaryTable from '../../components/LibrarySummaryTable.svelte';

	export let path;
	export let name;
	export let version;
	export let group_id;
	export let artifact_id;
	export let latest_version;
	export let projects;
	export let cves;
</script>

<div class="main">
	<h1>{name}</h1>
	<div class="page-body">
		<div class="three-columns">
			<div class="col">
				<h2>Summary</h2>
				<LibrarySummaryTable {group_id} {artifact_id} {version} {path} />
			</div>
			{#if projects}
				<div class="col">
					<h2>Included in projects</h2>
					<ProjectsList {projects} />
				</div>
			{/if}
			{#if latest_version}
				<div class="col">
					<LatestVersionCard {latest_version} />
				</div>
			{/if}
		</div>
		{#if cves}
			<div class="one-column">
				<h2>Vulnerabilities</h2>
				<LibrariesCVEsTable {cves} />
			</div>
		{/if}
	</div>
</div>

<style>
	.page-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
	}
	.three-columns {
		display: flex;
		justify-content: flex-start;
	}
	.col {
		width: 50%;
	}
</style>
