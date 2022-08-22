<script>
	import LibrariesCVEsTable from '../../../components/LibrariesCVEsTable.svelte';
	import ProjectsList from '../../../components/ProjectsList.svelte';
	import LatestVersionCard from '../../../components/LatestVersionCard.svelte';
	import LibrarySummaryTable from '../../../components/LibrarySummaryTable.svelte';
	import MavenDependencyXml from '../../../components/MavenDependencyXML.svelte';

	export let data;
	let { path, name, version, group_id, artifact_id, latest_version, projects, cves } = data;
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
			{#if group_id && artifact_id && version}
				<MavenDependencyXml {group_id} {artifact_id} {version} />
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
		flex-wrap: wrap;
		gap: 2rem;
	}
	.col {
		width: 20%;
	}
	.main {
		padding-bottom: 1rem;
	}
</style>
