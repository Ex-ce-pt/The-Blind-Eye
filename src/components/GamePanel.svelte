<script lang="ts">

    import { RendererData, renderGame } from "../scripts/renderer"
    import { createEventDispatcher, onMount } from "svelte"
    import { updateGame, Player, Level, SEARCH_BUTTON, SEARCH_UP_BUTTON, SEARCH_DOWN_BUTTON } from "../scripts/game";
    import { Floor, Platform, Spike } from "../scripts/objects";
    import { Box, Vec2 } from "../scripts/math";

    let thisObj: HTMLElement;
    // @ts-ignore
    let data: RendererData = {};
    let prevTime: number;
    let lostEventDispatcher = createEventDispatcher();

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (data.gameData.objectMenuOpen) return;

        if (e.code === "Space") {
            if (data.gameData.player.velocity.y === 0) {
                data.gameData.player.velocity.y += 15;
            }
        } else if (e.code === "ArrowRight") {
            data.gameData.player.velocity.x = 10;
        } else if (e.code === "ArrowLeft") {
            data.gameData.player.velocity.x = -10;
        }
    }
    
    const handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
            data.gameData.player.velocity.x = 0;
        }
    }

    const handleClick = (e: MouseEvent): void => {
        const p = new Vec2(e.clientX, e.clientY).div(new Vec2(data.canvas.width, data.canvas.height));
        if (SEARCH_BUTTON.contains(p)){
            data.gameData.objectMenuOpen = !data.gameData.objectMenuOpen;
            data.gameData.objectDisplayed = 0;
        } else if (SEARCH_UP_BUTTON.contains(p)) {
            data.gameData.objectDisplayed++;
        } else if (SEARCH_DOWN_BUTTON.contains(p)) {
            data.gameData.objectDisplayed--;
        }
    }

    const update = () => {
        const time = new Date().getTime();
        data.gameData.deltaTime = time - prevTime;
        data.gameData.time += data.gameData.deltaTime;
        prevTime = time;
        
        updateGame(data.gameData);
        renderGame(data);
        requestAnimationFrame(update);
    }

    const handleResize = () => {
        data.canvas.width = window.innerWidth;
        data.canvas.height = window.innerHeight;
    }

    onMount(() => {
        handleResize();

        data.ctx = data.canvas.getContext('2d');
        data.ctx.imageSmoothingEnabled = false;

        data.gameData = {
            player: new Player(),
            levelIndex: 0,
            deltaTime: 0,
            time: 0,
            objectMenuOpen: false,
            objectDisplayed: 0,
            lostEventDispatcher: lostEventDispatcher,
            levels: [
                new Level([
                    new Floor(new Vec2(-100, 0), 500),
                    new Floor(new Vec2(1300, 0), 500),
                    new Platform(new Box(600, 0, 500, 100)),
                    new Platform(new Box(200, 300, 500, 100)),
                    new Spike(new Box(1500, 75, 75, 75))
                ])
            ]
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("click", handleClick);

        setTimeout(() => requestAnimationFrame(update), 1000);
    });

</script>

<main bind:this={thisObj}>

    <canvas
        bind:this={data.canvas}>Your browser doesn't support canvas!</canvas>

</main>

<svelte:window on:resize={handleResize} />

<style>

    main {
        width: 100%;
        height: 100%;
    }

</style>