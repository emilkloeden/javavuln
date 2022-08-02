<script>
	export let projects;
</script>

<ul>
	{#each projects as { id, project_name }}
		<li {id}><a href={`/projects/${id}`}>{project_name}</a></li>
	{/each}
</ul>
