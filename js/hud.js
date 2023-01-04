"use strict";

class Hud {
    // private
    #game;
    #player;
    #graphics;
    #input;
    #human;
    #fish;
    #snowflake;
    #bird_0;
    #bird_1;
    #bird_2;
    #hud;
    #font;
    #can_be_human;
    #can_be_snowflake;
    #can_be_fish;
    #can_be_bird;
    #bird_anim;
    #anim_speed;
    #anim_count;
    #hud_open;
    #command_cursor;
    #selected_command;
    #item_cursor;
    #morph_cursor;
    #morph_cursor_pos;
    #selected_item;
    #active_item;
    #item_slot;
    #all_pickable_items;

    // ctor
    constructor(game) {
        this.#game = game;
        this.#graphics = this.#game.graphics;
        this.#input = this.#game.input;
        this.#player = this.#game.player;

        this.#hud = new Sprite(this.#graphics, 144, 432, 320, 64);
        this.#font = new Font(this.#game);

        this.#human = new Sprite(this.#graphics, 0, 128, 16, 40);
        this.#snowflake = new Sprite(this.#graphics, 48, 144, 16, 16);
        this.#fish = new Sprite(this.#graphics, 88, 128, 40, 16);
        this.#bird_0 = new Sprite(this.#graphics, 96, 160, 16, 40);
        this.#bird_1 = new Sprite(this.#graphics, 112, 160, 16, 40);
        this.#bird_2 = new Sprite(this.#graphics, 128, 160, 16, 40);

        this.#can_be_human = false;
        this.#can_be_snowflake = false;
        this.#can_be_fish = false;
        this.#can_be_bird = false;

        this.#hud_open = false;
        this.#anim_speed = 0;
        this.#anim_count = 0;
        this.#bird_anim = [
            this.#bird_0,
            this.#bird_1,
            this.#bird_2,
            this.#bird_1
        ];

        this.#command_cursor = 0;
        this.#selected_command = -1;
        this.#item_cursor = -1;
        this.#morph_cursor = -1;
        this.#selected_item = -1;
        this.#active_item = -1;

        this.#morph_cursor_pos = [120, 152, 184, 208]
        this.#item_slot = [
            'empty','empty','empty','empty','empty'
        ];

        this.#all_pickable_items = [
            'brown_key',
            'grey_key',
            'yellow_key',
            'blue_key',
            'purple_key',
            'green_key',
            'flower',
            'granate',
            'ladder',
            'pistol',
            'axe',
            'spade',
            'lamp',
            'cross',
        ];

        Object.defineProperty(this, 'open', {
            get: () => {
                return this.#hud_open;
            },
            set: (value) => {
                this.#hud_open = value;
            }
        })
    }

    open_hud = () => {
        this.#hud_open = true;
        this.#selected_command = -1;
        this.#item_cursor = -1;
        this.#morph_cursor = -1;
    }

    update = (dt) => {
        if (this.#hud_open) {
            // hud interaction

            if (this.#input.isPressed(Input.KEY_ESCAPE)) {
                this.#hud_open = false;
                return;
            }
            if (this.#selected_command == -1) {
                // select command
                if (this.#input.isPressed(Input.KEY_DOWN)) {
                    if (this.#command_cursor < 5) {
                        this.#command_cursor++;
                    }
                } else if (this.#input.isPressed(Input.KEY_UP)) {
                    if (this.#command_cursor > 0) {
                        this.#command_cursor--;
                    }
                } else if (this.#input.isPressed(Input.KEY_SPACE)) {
                    this.#selected_command = this.#command_cursor;
                    switch (this.#selected_command) {
                        case Hud.COMMAND_TAKE: // Take
                        case Hud.COMMAND_DROP: // Drop
                        case Hud.COMMAND_GIVE: // Give
                        case Hud.COMMAND_USE: // Use
                            this.#item_cursor = 0;
                            break;
                        case Hud.COMMAND_MORPH: // Morph
                            this.#morph_cursor = 0;
                            break;
                        case Hud.COMMAND_GIVEUP: // Give up
                            console.log('** GIVE UP!!');
                            this.#hud_open = false;
                            break;
                    }
                }
            } else {
                if (this.#input.isPressed(Input.KEY_LEFT)) {
                    if (this.#item_cursor > 0) {
                        this.#item_cursor--;
                    }
                    if (this.#morph_cursor > 0) {
                        this.#morph_cursor--;
                    }
                } else if (this.#input.isPressed(Input.KEY_RIGHT)) {
                    if (this.#item_cursor >= 0 && this.#item_cursor < 4) {
                        this.#item_cursor++;
                    }
                    if (this.#morph_cursor >= 0 && this.#morph_cursor < 3) {
                        this.#morph_cursor++;
                    }
                } else if (this.#input.isPressed(Input.KEY_SPACE)) {

                    // execute command
                    switch (this.#selected_command) {
                        case Hud.COMMAND_TAKE: // Take
                            if (this.#item_slot[this.#item_cursor] == 'empty' && this.#game.player.kind == Player.HUMAN) {
                                this.#take_item(this.#item_cursor);
                            }
                            break;
                        case Hud.COMMAND_DROP: // Drop
                            if (this.#item_slot[this.#item_cursor] != 'empty' && this.#game.player.kind == Player.HUMAN) {
                                this.#drop_item(this.#item_cursor);
                            }
                            break;
                        case Hud.COMMAND_GIVE: // Give
                            if (this.#item_slot[this.#item_cursor] != 'empty' && this.#game.player.kind == Player.HUMAN) {
                                this.#give_item(this.#item_cursor);
                            }
                            break;
                        case Hud.COMMAND_USE: // Use
                            if (this.#item_slot[this.#item_cursor] != 'empty' && this.#game.player.kind == Player.HUMAN) {
                                this.#use_item(this.#item_cursor);
                            }
                            break;
                        case Hud.COMMAND_MORPH: // Morph
                            switch (this.#morph_cursor) {
                                case 0: // Human
                                    this.#game.player.transform_to(Player.HUMAN);
                                    break;
                                case 1: // Fish
                                    this.#game.player.transform_to(Player.FISH);
                                    break;
                                case 2: // Snowflake
                                    this.#game.player.transform_to(Player.SNOWFLAKE);
                                    break;
                                case 3: // Bird
                                    this.#game.player.transform_to(Player.BIRD);
                                    break;
                            }
                            break;
                        case Hud.COMMAND_GIVEUP: // Give up
                            break;
                    }

                    // close hud after when command is executed
                    this.#hud_open = false;
                }
            }
        }

        // animate bird
        this.#anim_speed += dt;
        if (this.#anim_speed > 0.2) {
            this.#anim_speed = 0;
            this.#anim_count = (this.#anim_count + 1) % 4;
        }
    }

    #take_item = (slot) => {
        if (this.#game.player.face == Player.FACE_LEFT) {
            var item = this.#game.rooms.items.get_item(this.#game.room, this.#game.house, { x: this.#player.x-4, y: this.#player.y + 40 - 16, w: 16, h: 16 });
            if (this.#all_pickable_items.includes(item.name)) {
                this.#item_slot[slot] = item.name;
                this.#game.rooms.items.remove_item_from_room(this.#game.room, item.index);
            }
        } else if (this.#game.player.face == Player.FACE_RIGHT) {
            var item = this.#game.rooms.items.get_item(this.#game.room, this.#game.house, { x: this.#player.x+4, y: this.#player.y + 40 - 16, w: 16, h: 16 });
            if (this.#all_pickable_items.includes(item.name)) {
                this.#item_slot[slot] = item.name;
                this.#game.rooms.items.remove_item_from_room(this.#game.room, item.index);
            }
        }
    }

    #drop_item = (slot) => {
        if (this.#game.player.face == Player.FACE_LEFT) {
            const item = {
                x: this.#game.player.x+4, y: this.#player.y + 40 - 16,
                name: this.#item_slot[slot],
                visible: true,
                house: this.#game.house,
            };
            this.#item_slot[slot] = 'empty';
            this.#game.rooms.items.add_item_to_room(this.#game.room, item);
        } else if (this.#game.player.face == Player.FACE_RIGHT) {
            const item = {
                x: this.#game.player.x+4, y: this.#player.y + 40-16,
                name: this.#item_slot[slot],
                visible: true,
                house: this.#game.house,
            };
            this.#item_slot[slot] = 'empty';
            this.#game.rooms.items.add_item_to_room(this.#game.room, item);
        }
    }

    #give_item = (slot) => {
        if (this.#game.player.face == Player.FACE_LEFT) {

        } else if (this.#game.player.face == Player.FACE_RIGHT) {

        }
    }

    #use_item = (slot) => {
        this.#active_item = slot;
    }

    can_be = (kind) => {
        switch (kind) {
            case Player.HUMAN:
                this.#can_be_human = true;
                break;
            case Player.FISH:
                this.#can_be_fish = true;
                break;
            case Player.SNOWFLAKE:
                this.#can_be_snowflake = true;
                break;
            case Player.BIRD:
                this.#can_be_bird = true;
                break;
        }
    }

    draw = (ctx) => {
        this.#hud.draw(ctx, 0, 200 - 64);
        this.#font.print(ctx, 16, 200 - 64 + 8 + 0 * 8, 'TAKE');
        this.#font.print(ctx, 16, 200 - 64 + 8 + 1 * 8, 'DROP');
        this.#font.print(ctx, 16, 200 - 64 + 8 + 2 * 8, 'GIVE');
        this.#font.print(ctx, 16, 200 - 64 + 8 + 3 * 8, 'USE');
        this.#font.print(ctx, 16, 200 - 64 + 8 + 4 * 8, 'MORPH');
        this.#font.print(ctx, 16, 200 - 64 + 8 + 5 * 8, 'GIVE UP');

        this.#font.print(ctx, 136, 200 - 64 + 8, 'OXYGEN:9');

        if (this.#hud_open) {
            if (this.#command_cursor >= 0) {
                this.#font.print(ctx, 8, 200 - 64 + 8 + this.#command_cursor * 8, '>');
            }

            if (this.#item_cursor >= 0) {
                this.#font.print(ctx, 240 + this.#item_cursor * 16, 200 - 64 + 56, '^');
            }

            if (this.#morph_cursor >= 0) {
                this.#font.print(ctx, this.#morph_cursor_pos[this.#morph_cursor], 200 - 64 + 56 - 8, '^');
            }
        }

        if (this.#active_item >= 0)
            this.#font.print(ctx, 240 + this.#active_item * 16, 200 - 64 + 56 - 8, '^');

        if (this.#can_be_human)
            this.#human.draw(ctx, 120 - 4, 200 - 64 + 8);

        if (this.#can_be_fish)
            this.#fish.draw(ctx, 136, 200 - 64 + 32);

        if (this.#can_be_snowflake)
            this.#snowflake.draw(ctx, 184, 200 - 64 + 32);

        if (this.#can_be_bird)
            this.#bird_anim[this.#anim_count].draw(ctx, 208, 200 - 64 + 8);

        for (var i in this.#item_slot) {
            var it = this.#item_slot[i];
            if (it != 'empty') {
                this.#game.rooms.items.draw_item(ctx, it, 240 + i * 16, 200-64 + 32);
            }
        }
    }
}

Hud.COMMAND_TAKE = 0;
Hud.COMMAND_DROP = 1;
Hud.COMMAND_GIVE = 2;
Hud.COMMAND_USE = 3;
Hud.COMMAND_MORPH = 4;
Hud.COMMAND_GIVEUP = 5;
