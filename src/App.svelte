<script lang="ts">

    import GamePanel from "./components/GamePanel.svelte";


	let lostYet = false;
	
	const handleLost = (): void => {
		lostYet = true;
	}
	
</script>

<main>
	
	{#if lostYet}

	<div>You lost! Reload the page to play again.</div>

	{:else}

	<GamePanel on:lost={handleLost} />

	{/if}

</main>

<style>
	
	main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div {
		font-size: 56px;
	}

</style>