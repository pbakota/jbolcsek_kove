"use strict";

class Zone {
    // private
    #zones;

    // ctor
    constructor() {
        this.clear();
    }

    clear = () => {
        this.#zones = [];
    }

    add = (zone) => {
        this.#zones.push(zone);
    }

    // (a)xis (a)ligned (b)ounding (b)ox
    #aabb = (rect1, rect2) => {
        return (
            rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y
        );
    }

    hit = (rect) => {
        var z = Zone.NONE;
        // for (var i = this.#zones.length - 1; i >= 0; --i) {
        for (var i = 0; i < this.#zones.length; ++i) {
            const zone = this.#zones[i];
            if (this.#aabb({ x: zone.x, y: zone.y, w: zone.w, h: zone.h }, rect)) {
                z = zone.t;
                break;
            }
        }
        return z;
    }

    hit_multi = (rect) => {
        var z = [];
        for (var i = 0; i < this.#zones.length; ++i) {
            const zone = this.#zones[i];
            if (this.#aabb({ x: zone.x, y: zone.y, w: zone.w, h: zone.h }, rect)) {
                z.push(zone.t);
            }
        }
        return z;
    }

    draw = (ctx) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        this.#zones.forEach(zone => {
            ctx.beginPath();
            ctx.rect(zone.x, zone.y, zone.w, zone.h);
            ctx.stroke();
        });
    }
}

Zone.NONE = 'none';
