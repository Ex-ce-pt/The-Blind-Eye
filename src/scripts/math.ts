export class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vec2) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    sub(other: Vec2) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    mult(other: Vec2) {
        return new Vec2(this.x * other.x, this.y * other.y);
    }

    div(other: Vec2) {
        return new Vec2(this.x / other.x, this.y / other.y);
    }

    scale(s: number) {
        return this.mult(new Vec2(s, s));
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    unit() {
        const len = this.len();
        return this.div(new Vec2(len, len));
    }

}

export class Box {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    contains(p: Vec2) {
        return this.x <= p.x &&
                this.x + this.width >= p.x &&
                this.y <= p.y &&
                this.y + this.height >= p.y;
    }

    intersects(other: Box) {
        return this.intersectsX(other) && this.intersectsY(other);
    }

    intersectsX(other: Box) {
        return this.x + this.width >= other.x && this.x <= other.x + other.width;
    }

    intersectsY(other: Box) {
        return this.y + this.height >= other.y &&
                this.y <= other.y + other.height;
    }

}