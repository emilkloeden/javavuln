<script context="module">
	export const load = async ({ fetch, params }) => {
		const { cve } = params;
		const { VITE_API_PORT } = import.meta.env;
		const urlBase = `http://localhost:${VITE_API_PORT}`;
		const res = await fetch(`${urlBase}/cves/${cve}`);
		const cveDetails = await res.json();
		const {
			description,
			published_date,
			severity,
			cvss_v3,
			last_modified_date,
			cvss_v3_data,
			cvss_v2_data,
			references
		} = cveDetails;

		const cveLibrariesRes = await fetch(`${urlBase}/cves/${cve}/libraries`);
		const cveLibraries = await cveLibrariesRes.json();

		const cveProjectsRes = await fetch(`${urlBase}/cves/${cve}/projects`);
		const cveProjects = await cveProjectsRes.json();

		return {
			props: {
				cve,
				description,
				published_date,
				severity,
				cvss_v3,
				last_modified_date,
				cvss_v3_data,
				cvss_v2_data,
				references,
				cveLibraries,
				cveProjects
			}
		};
	};
</script>

<script>
	import CVSSV3Table from '../../components/CVSSV3Table.svelte';
	import CVSSV2Table from '../../components/CVSSV2Table.svelte';
	import BasicLibraryTable from '../../components/BasicLibraryTable.svelte';
	import ProjectsList from '../../components/ProjectsList.svelte';
	import SeverityLabel from '../../components/SeverityLabel.svelte';
	import CveSummaryTable from '../../components/CVESummaryTable.svelte';

	export let cve;
	export let description;
	export let published_date;
	export let severity;
	export let cvss_v3;
	export let last_modified_date;
	export let cvss_v3_data;
	export let cvss_v2_data;
	export let references;
	export let cveLibraries;
	export let cveProjects;
</script>

<div class="main container">
	<div class="page-head">
		<h1>{cve}</h1>
		<h1><SeverityLabel {severity} /></h1>
	</div>
	<div class="page-body">
		{#if description}
			<div class="container">
				<h2>Description</h2>
				<p>{description}</p>
			</div>
		{/if}
		<div class="three-columns">
			<div class="col">
				<h2>Summary</h2>
				<CveSummaryTable {cvss_v3} {cvss_v2_data} {published_date} {last_modified_date} />
			</div>
			<div class="col">
				<h2>Vulnerable Projects</h2>
				<ProjectsList projects={cveProjects} />
			</div>
			<div class="col">
				{#if cvss_v3_data}
					<h2>CVSS v3</h2>
					<CVSSV3Table {cvss_v3_data} />
				{:else if cvss_v2_data}
					<h2>CVSS v2</h2>
					<CVSSV2Table {cvss_v2_data} />
				{/if}
			</div>
		</div>
		<div>
			<h2>Vulnerable Libraries</h2>
			<BasicLibraryTable libraries={cveLibraries} />
		</div>
		{#if references}
			<div class="container">
				<h2>References</h2>
				<ul>
					{#each references as { name, url }}
						<li><a href={url}>{name === 'N/A' ? url : name}</a></li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

<style>
	.main {
		width: calc(100% - 12rem);
	}
	.page-head {
		display: flex;
		justify-content: space-between;
	}
	.page-body {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
	}
	.three-columns {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
	}
	.col {
		max-width: 50%;
	}
	.container {
		max-width: 80rem;
	}
</style>
