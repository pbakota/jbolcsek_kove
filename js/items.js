"use strict";

class ItemManager {
    // private
    #game;
    #graphics;
    #brown_key;
    #grey_key;
    #yellow_key;
    #blue_key;
    #purple_key;
    #green_key;
    #flower;
    #granate;
    #ladder;
    #pistol;
    #axe;
    #spade;
    #lamp;
    #cross;
    #the_stone;

    // ctor
    constructor(game) {
        this.#game = game;
        this.#graphics = this.#game.graphics;

        this.#brown_key = new Sprite(this.#graphics, 48 + 0, 80, 8, 16);
        this.#grey_key = new Sprite(this.#graphics, 48 + 8, 80, 8, 16);
        this.#yellow_key = new Sprite(this.#graphics, 48 + 16, 80, 8, 16);
        this.#blue_key = new Sprite(this.#graphics, 48 + 24, 80, 8, 16);
        this.#purple_key = new Sprite(this.#graphics, 48 + 32, 80, 8, 16);
        this.#green_key = new Sprite(this.#graphics, 48 + 40, 80, 8, 16);
        this.#flower = new Sprite(this.#graphics, 48 + 48, 80, 8, 16);
        this.#granate = new Sprite(this.#graphics, 48 + 0, 96, 8, 16);
        this.#ladder = new Sprite(this.#graphics, 48 + 8, 96, 8, 16);
        this.#pistol = new Sprite(this.#graphics, 48 + 16, 96, 8, 16);
        this.#axe = new Sprite(this.#graphics, 48 + 24, 96, 8, 16);
        this.#spade = new Sprite(this.#graphics, 48 + 32, 96, 8, 16);
        this.#lamp = new Sprite(this.#graphics, 48 + 40, 96, 8, 16);
        this.#cross = new Sprite(this.#graphics, 48, 112, 8, 16);
        this.#the_stone = new Sprite(this.#graphics, 48 + 8, 112, 8, 16);
    }

    draw_visible_items = (ctx, room, house) => {
        var items = Rooms[room].items;
        for (var i = 0; i < items.length; ++i) {
            var it = items[i];
            if (it.visible && (it.house == 'none' || it.house == house)) {
                this.#game.zone.add({
                    x: it.x, y: it.y, w: 8, h: 16, t: it.name
                });
                switch (it.name) {
                    case 'brown_key':
                        this.#brown_key.draw(ctx, it.x, it.y);
                        break;
                    case 'grey_key':
                        this.#grey_key.draw(ctx, it.x, it.y);
                        break;
                    case 'yellow_key':
                        this.#yellow_key.draw(ctx, it.x, it.y);
                        break;
                    case 'blue_key':
                        this.#blue_key.draw(ctx, it.x, it.y);
                        break;
                    case 'purple_key':
                        this.#purple_key.draw(ctx, it.x, it.y);
                        break;
                    case 'green_key':
                        this.#green_key.draw(ctx, it.x, it.y);
                        break;
                    case 'flower':
                        this.#flower.draw(ctx, it.x, it.y);
                        break;
                    case 'granate':
                        this.#granate.draw(ctx, it.x, it.y);
                        break;
                    case 'ladder':
                        this.#ladder.draw(ctx, it.x, it.y);
                        break;
                    case 'pistol':
                        this.#pistol.draw(ctx, it.x, it.y);
                        break;
                    case 'spade':
                        this.#spade.draw(ctx, it.x, it.y);
                        break;
                    case 'axe':
                        this.#axe.draw(ctx, it.x, it.y);
                        break;
                    case 'lamp':
                        this.#lamp.draw(ctx, it.x, it.y);
                        break;
                    case 'cross':
                        this.#cross.draw(ctx, it.x, it.y);
                        break;
                    case 'the_stone':
                        this.#the_stone.draw(ctx, it.x, it.y);
                        break;
                }
            }
        }
    }
}

