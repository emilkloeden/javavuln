<script>
	import Highlight from 'svelte-highlight';
	import xml from 'svelte-highlight/languages/xml';
	import github from 'svelte-highlight/styles/github';

	export let group_id;
	export let artifact_id;
	export let version;

	const code = `<dependency>
	<groupId>${group_id}</groupId>
	<artifactId>${artifact_id}</artifactId>
	<version>${version}</version>
</dependency>`;
</script>

<svelte:head>
	{@html github}
</svelte:head>

<div>
	<h2>Maven dependency XML</h2>
	<Highlight language={xml} {code} />
</div>

<style>
	h2 {
		margin-top: 0.5rem;
		/* margin-bottom: 0.5rem; */
	}
</style>
