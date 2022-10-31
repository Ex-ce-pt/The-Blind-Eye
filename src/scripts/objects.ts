import { Box, Vec2 } from "./math";

export abstract class GameObject {
    box: Box;
    velocity: Vec2;

    constructor(box: Box) {
        this.box = box;
        this.velocity = new Vec2(0, 0);
    }

}

export class Floor extends GameObject {

    constructor(pos: Vec2, width: number) {
        super(new Box(pos.x, pos.y, width, 500));
    }

}

export class Platform extends GameObject {

    constructor(box: Box) {
        super(box);
    }

}

export class Spike extends GameObject {

    constructor(box: Box) {
        super(box);
    }

}