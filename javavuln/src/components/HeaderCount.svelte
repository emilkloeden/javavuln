<script>
	export let header;
	export let value;
	export let href;
</script>

<a {href} class="header-box-item">
	<h1 class="huge">{value}</h1>
	<h1>{header}</h1>
</a>

<style>
	h1 {
		margin: 0;
		padding: 0;
	}
	.header-box-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--bg-accent-color);
		background: linear-gradient(-45deg, var(--second-accent-color), #fff, var(--accent-color));
		padding: 2rem;
		width: 100%;
		border-radius: 5rem;
		box-shadow: 5px 5px 0 0 var(--second-accent-color);
		text-decoration: none;
		color: var(--accent-color);
	}
	.header-box-item:visited {
		color: var(--accent-color);
	}
	.header-box-item:hover {
		background: linear-gradient(-45deg, var(--accent-color), #fff, var(--second-accent-color));
		box-shadow: 5px 5px 5px 0px var(--accent-color);
		color: var(--dark-gray-color);
	}

	.huge {
		font-size: 5rem;
		text-align: left;
		margin: 0;
		padding: 0;
	}
</style>
