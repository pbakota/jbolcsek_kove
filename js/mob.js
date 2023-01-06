"use strict";

class Mob
{
    // private
    #game;
    #graphics;
    #player;
    #mob_0;
    #mob_1;
    #mob_2;
    #mob_3;
    #mob_anim;
    #mob_frame;
    #mob_timer;
    #delay;
    #x;
    #y;
    #vx;
    #vy;
    #visible;
    #visible_delay;

    // ctor
    constructor(game) {
        this.#game = game;
        this.#graphics = this.#game.graphics;
        this.#player = this.#game.player;

        this.#mob_0 = new Sprite(this.#graphics, 48, 72, 8, 8);
        this.#mob_1 = new Sprite(this.#graphics, 48+8*1, 72, 8, 8);
        this.#mob_2 = new Sprite(this.#graphics, 48+8*2, 72, 8, 8);
        this.#mob_3 = new Sprite(this.#graphics, 48+8*3, 72, 8, 8);

        this.#mob_anim = [ this.#mob_0, this.#mob_1, this.#mob_2, this.#mob_3];

        this.#mob_frame = 0;
        this.#mob_timer = 0;
        this.#visible = false;
        this.#delay = 0;
        this.#visible_delay = 0.02 + Math.random() * 0.4;

        Object.defineProperty(this, 'x', {
            get: () => { return this.#x; }
        })
        Object.defineProperty(this, 'y', {
            get: () => { return this.#y; }
        })
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

    update = (dt) => {
        this.#mob_timer += dt;
        if (this.#mob_timer < this.#visible_delay) {
            if (this.#game.room == 8) {
                this.#x = 48;
                this.#y = 200 - 64 - 16 - 40 + 8;
                this.#vx = 0;
                this.#vy = 1;
            } else {
                if (this.#player.x <= 320 / 4 || this.#player.x >= 320 - (320 / 4)) {
                    // The player is on the screen side
                    this.#x = 160 + (Math.random() * 80) - 40;
                } else {
                    if (this.#player.x < 160) {
                        this.#x = 320 - (Math.random() * 80);
                    } else {
                        this.#x = Math.random() * 80;
                    }
                }
                this.#y = 200 - 64 - 16 - 40 + 8;
                this.#vx = (this.#player.x < this.#x) ? -1 : 1;
                this.#vy = 0;
            }
        } else if(this.#mob_timer >= this.#visible_delay && this.#mob_timer <= this.#visible_delay + 0.1) {
            this.#visible = true;
        } else if (this.#mob_timer >= 0.2 && this.#mob_timer <= 0.8) {
            this.#delay += dt;
            if (this.#delay > 0.02) {
                this.#delay = 0;
                if (this.#mob_frame < 3)
                    this.#mob_frame ++;
            }
        } else if (this.#mob_timer >= 1.0) {
            if (this.#mob_frame == 3) {
                this.#x += this.#vx * 150 * dt;
                this.#y += this.#vy * 150 * dt;
            }
        }
    }

    draw = (ctx) => {
        if(this.#visible)
            this.#mob_anim[this.#mob_frame].draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
    }

    hit = (rect) => {
        return (this.#aabb(rect, { x: this.#x, y: this.#y, w: 8, h: 8 }));
    }
}