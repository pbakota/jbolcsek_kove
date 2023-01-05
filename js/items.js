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
    #granade;
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
        this.#granade = new Sprite(this.#graphics, 48 + 0, 96, 8, 16);
        this.#ladder = new Sprite(this.#graphics, 48 + 8, 96, 8, 16);
        this.#pistol = new Sprite(this.#graphics, 48 + 16, 96, 8, 16);
        this.#axe = new Sprite(this.#graphics, 48 + 24, 96, 8, 16);
        this.#spade = new Sprite(this.#graphics, 48 + 32, 96, 8, 16);
        this.#lamp = new Sprite(this.#graphics, 48 + 40, 96, 8, 16);
        this.#cross = new Sprite(this.#graphics, 48, 112, 8, 16);
        this.#the_stone = new Sprite(this.#graphics, 48 + 8, 112, 8, 16);
    }

    draw_item = (ctx, name, x, y) => {
        switch (name) {
            case 'brown_key':
                this.#brown_key.draw(ctx, x, y);
                break;
            case 'grey_key':
                this.#grey_key.draw(ctx, x, y);
                break;
            case 'yellow_key':
                this.#yellow_key.draw(ctx, x, y);
                break;
            case 'blue_key':
                this.#blue_key.draw(ctx, x, y);
                break;
            case 'purple_key':
                this.#purple_key.draw(ctx, x, y);
                break;
            case 'green_key':
                this.#green_key.draw(ctx, x, y);
                break;
            case 'flower':
                this.#flower.draw(ctx, x, y);
                break;
            case 'granade':
                this.#granade.draw(ctx, x, y);
                break;
            case 'ladder':
                this.#ladder.draw(ctx, x, y);
                break;
            case 'pistol':
                this.#pistol.draw(ctx, x, y);
                break;
            case 'spade':
                this.#spade.draw(ctx, x, y);
                break;
            case 'axe':
                this.#axe.draw(ctx, x, y);
                break;
            case 'lamp':
                this.#lamp.draw(ctx, x, y);
                break;
            case 'cross':
                this.#cross.draw(ctx, x, y);
                break;
            case 'the_stone':
                this.#the_stone.draw(ctx, x, y);
                break;
        }
    }

    draw_visible_items = (ctx, room, house) => {
        var items = Rooms[room].items;
        for (var i = 0; i < items.length; ++i) {
            var it = items[i];
            if (it.visible && (it.house == 'none' || it.house == house)) {
                this.#game.zone.add({
                    x: it.x, y: it.y, w: 8, h: 16, t: it.name
                });
                this.draw_item(ctx, it.name, it.x, it.y);
            }
        }
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


    get_item = (room, house, rect) => {
        var items = Rooms[room].items;
        for (var i = 0; i < items.length; ++i) {
            var it = items[i];
            if (this.#aabb(rect, { x: it.x, y: it.y, w: 8, h: 16 }) && it.visible && it.house == house) {
                return { index: i, name: it.name };
            }
        }
        return {};
    }

    remove_item_from_room = (room, index) => {
        Rooms[room].items.splice(index,1);
    }

    add_item_to_room = (room, item) => {
        Rooms[room].items.push(item);
    }
}

