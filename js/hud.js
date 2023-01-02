"use strict";

class Hud {
    // private
    #game;
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
    #selected_item;
    #active_item;
    #item_slot;

    // ctor
    constructor(game) {
        this.#game = game;
        this.#graphics = this.#game.graphics;
        this.#input = this.#game.input;

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
        this.#selected_item = -1;
        this.#active_item = -1;

        this.#item_slot = [];

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
                    this.#item_cursor = 0;
                }
            } else {
                // select item
                if (this.#input.isPressed(Input.KEY_LEFT)) {
                    if (this.#item_cursor > 0) {
                        this.#item_cursor--;
                    }
                } else if (this.#input.isPressed(Input.KEY_RIGHT)) {
                    if (this.#item_cursor < 4) {
                        this.#item_cursor++;
                    }
                } else if (this.#input.isPressed(Input.KEY_SPACE)) {

                    if (this.#selected_item == -1) {
                        this.#selected_item = this.#item_cursor;

                        switch (this.#selected_command) {
                            case Hud.COMMAND_TAKE: // Take
                                break;
                            case Hud.COMMAND_DROP: // Drop
                                break;
                            case Hud.COMMAND_GIVE: // Give
                                break;
                            case Hud.COMMAND_USE: // Use
                                this.#active_item = this.#selected_item;
                                break;
                            case Hud.COMMAND_MORPH: // Morph
                                break;
                            case Hud.COMMAND_GIVEUP: // Give up
                                break;
                        }
                    } else {
                        // take, drop, etc.
                        // "close" hud
                        this.#hud_open = false;
                    }
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
    }
}

Hud.COMMAND_TAKE = 0;
Hud.COMMAND_DROP = 1;
Hud.COMMAND_GIVE = 2;
Hud.COMMAND_USE = 3;
Hud.COMMAND_MORPH = 4;
Hud.COMMAND_GIVEUP = 5;
