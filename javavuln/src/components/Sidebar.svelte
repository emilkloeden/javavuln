<div class="sidebar">
	<div class="logo">
		<a href="/">
			<h2 class="accent-color">Java</h2>
			<h2 class="second-accent-color">Vuln</h2></a
		>
	</div>
	<nav>
		<ul>
			<li><a href="/projects">Projects</a></li>
			<li><a href="/libraries">Libraries</a></li>
			<li><a href="/cves">Vulnerabilities</a></li>
		</ul>
	</nav>
</div>

<style>
	.sidebar {
		position: fixed;
		max-width: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 1rem;
		padding-top: 1rem;
		padding-right: 0rem;
		margin-right: 2rem;
		height: 100vh;
	}
	.logo {
		text-align: center;
	}
	.logo a {
		text-decoration: none;
	}
	nav {
		padding: 0;
		margin: 0;
	}
	ul {
		width: 100%;
	}
	li {
		list-style: none;
		padding: 1.25rem 1rem;
		text-align: end;
		width: 100%;
	}
	li:hover,
	li:focus-within {
		background-color: var(--bg-accent-color);
	}
	.accent-color {
		color: var(--accent-color);
	}
	.second-accent-color {
		color: var(--second-accent-color);
	}
</style>
