<script>
	export let severity;
</script>

{#if severity}
	<span class={`severity ${severity.toLowerCase()}`}>{severity}</span>
{/if}

<style>
	.severity {
		color: white;
		width: 100%;
		text-align: center;
		padding: 0.25em 1em;
	}
	.critical {
		background-color: red;
	}
	.high {
		background-color: orangered;
	}
	.medium {
		background-color: aqua;
	}
	.low {
		background-color: green;
	}
	.unknown,
	.none {
		color: black;
	}
</style>
