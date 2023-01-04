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
    #visible;

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

        this.#x = 160-4;
        this.#y = 200-64-16-40+8;

        Object.defineProperty(this, 'x', {
            get: () => { return this.#x; }
        })
        Object.defineProperty(this, 'y', {
            get: () => { return this.#y; }
        })
    }

    update = (dt) => {
        this.#mob_timer += dt;
        if(this.#mob_timer >= 1.0 && this.#mob_timer < 1.5) {
            this.#visible = true;
        } else if(this.#mob_timer >=2.0 && this.#mob_timer <= 4.0) {
            this.#delay += dt;
            if(this.#delay > 0.12) {
                this.#delay = 0;
                if(this.#mob_frame < 3)
                    this.#mob_frame ++;
            }
        }

        if(this.#mob_frame == 3) {
            if(this.#player.x < this.#x) {
                this.#x += -200*dt;
            } else if(this.#player.x > this.#x) {
                this.#x += 200*dt;
            }
        }
    }

    draw = (ctx) => {
        if(this.#visible)
            this.#mob_anim[this.#mob_frame].draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
    }
}