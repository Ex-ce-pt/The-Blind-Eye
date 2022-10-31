import { Vec2, Box } from "./math"
import { Floor, GameObject, Platform, Spike } from "./objects"

export enum Direction {
    LEFT,
    RIGHT
}

export class Player extends GameObject {
    facing: Direction;

    constructor() {
        super(new Box(0, 300, 100, 100));
        this.facing = Direction.RIGHT;
        this.velocity = new Vec2(0, 0);
    }

}

export class Level {
    objects: GameObject[];

    constructor(objs: GameObject[]) {
        this.objects = objs;
    }

}

export interface GameData {
    player: Player,
    levelIndex: number,
    levels: Level[],
    deltaTime: number,
    time: number,
    objectMenuOpen: boolean,
    objectDisplayed: number,
    lostEventDispatcher
}

export const SEARCH_BUTTON = new Box(0.01, 0.9, 0.09, 0.09);
export const SEARCH_UP_BUTTON = new Box(0.1, 0.9, 0.09, 0.045);
export const SEARCH_DOWN_BUTTON = new Box(0.1, 0.945, 0.09, 0.045);
const MIN_Y = -500;

export const updateGame = (data: GameData): GameData => {
    data.player.velocity.y -= 0.5;
    
    let nearestFloor = data.levels[data.levelIndex].objects.reduce((prev: number, val: GameObject): number => {
        if (val instanceof Spike) {
            if (val.box.intersects(data.player.box)) {
                data.lostEventDispatcher('lost');
            }
        } else if (val instanceof Floor || val instanceof Platform) {
            const d = data.player.box.y - val.box.y;
            if (d < 0 || !val.box.intersectsX(data.player.box)) {
                return prev;
            }
            return Math.min(d, prev);
        }
        return prev;
    }, Infinity);

    nearestFloor *= -1;

    data.player.box.x += data.player.velocity.x;
    if (nearestFloor > data.player.velocity.y) {
        data.player.box.y += nearestFloor;
        data.player.velocity.y = 0;
    } else {
        data.player.box.y += data.player.velocity.y;
    }

    if (data.player.box.y < MIN_Y) {
        data.lostEventDispatcher('lost');
    }

    return data;
}