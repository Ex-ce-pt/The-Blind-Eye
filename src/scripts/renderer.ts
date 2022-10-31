import { GameData, SEARCH_BUTTON, SEARCH_UP_BUTTON, SEARCH_DOWN_BUTTON } from "./game";
import { Box } from "./math";
import { Floor } from "./objects"

export interface RendererData {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    gameData: GameData
}

const clear = (data: RendererData) => {
    data.ctx.fillStyle = "white";
    data.ctx.fillRect(0, 0, data.canvas.width, data.canvas.height);
}

export const renderGame = (data: RendererData) => {

    clear(data);

    const transformObject = (box: Box) => new Box(data.canvas.width / 2 - data.gameData.player.box.x + box.x,
                                                    data.canvas.height / 2 + data.gameData.player.box.y - box.y,
                                                    box.width,
                                                    box.height);
    const transformButton = (box: Box) => new Box(box.x * data.canvas.width,
                                                    box.y * data.canvas.height,
                                                    box.width * data.canvas.width,
                                                    box.height * data.canvas.height);

    // Render the player
    data.ctx.fillStyle = "red";
    data.ctx.fillRect(data.canvas.width / 2 - data.gameData.player.box.width / 2,
                        data.canvas.height / 2 - data.gameData.player.box.height - 2,
                        data.gameData.player.box.width,
                        data.gameData.player.box.height);

    data.gameData.levels[data.gameData.levelIndex].objects.forEach(obj => {

        if (!(obj instanceof Floor)) return;
        
        const box = transformObject(obj.box);
        data.ctx.fillStyle = "gray";
        data.ctx.fillRect(box.x, box.y, box.width, box.height);
    });

    // Render search buttons
    const searchBox = transformButton(SEARCH_BUTTON);
    data.ctx.strokeStyle = "black";
    data.ctx.fillStyle = (data.gameData.objectMenuOpen) ? "lime" : "green";
    data.ctx.fillRect(searchBox.x, searchBox.y, searchBox.width, searchBox.height);
    data.ctx.strokeRect(searchBox.x, searchBox.y, searchBox.width, searchBox.height);
    
    
    if (!data.gameData.objectMenuOpen) return;
    

    const searchUpBox = transformButton(SEARCH_UP_BUTTON);
    data.ctx.fillStyle = "lightblue";
    data.ctx.fillRect(searchUpBox.x, searchUpBox.y, searchUpBox.width, searchUpBox.height);
    data.ctx.strokeRect(searchUpBox.x, searchUpBox.y, searchUpBox.width, searchUpBox.height);

    const searchDownBox = transformButton(SEARCH_DOWN_BUTTON);
    data.ctx.fillStyle = "lightblue";
    data.ctx.fillRect(searchDownBox.x, searchDownBox.y, searchDownBox.width, searchDownBox.height);
    data.ctx.strokeRect(searchDownBox.x, searchDownBox.y, searchDownBox.width, searchDownBox.height);
    


    const objects = data.gameData.levels[data.gameData.levelIndex].objects.filter((obj) => {
        return !(obj instanceof Floor);
    });
    const box = transformObject(objects[data.gameData.objectDisplayed % objects.length].box);
    data.ctx.strokeStyle = "grey";
    data.ctx.strokeRect(box.x, box.y, box.width, box.height);

}