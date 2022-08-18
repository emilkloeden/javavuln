<script>
	export let group_id;
	export let artifact_id;
	export let version;
</script>

<div>
	<h2>Maven dependency XML</h2>
	<pre><code
			>{`<dependency>
	<groupId>${group_id}</groupId>
	<artifactId>${artifact_id}</artifactId>
	<version>${version}</version>
</dependency>`}</code
		></pre>
</div>

<style>
	h2 {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
	pre {
		color: var(--accent-color);
		background-color: var(--bg-accent-color);
	}
</style>
