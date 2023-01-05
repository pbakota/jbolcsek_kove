"use strict";

class ActionScene extends Scene {
    _graphics; _hud; _input; _player; _font; _initial; _hud_open; _items; _room; _tree; _purple_house;

    constructor(game) {
        super(game);

        this._graphics = this.game.graphics;
        this._input = this.game.input;

        this._font = new Font(this.game);
        this._room = new Room(this.game);

        this._player = new Player(this.game);

        // dirty hack again
        this._game.player = this._player;
        this._game.rooms = this._room;

        this._initial = true;
        this._hud_open = false; // when hud has control

        this._hud = new Hud(this.game);
        this.game.hud = this._hud;

        this._game.room = 17; // start in this room
        // this._game.room = 38; // start in this room
        this._player.x = 148;
        // this._player.x = 200;
        // this._player.x = 300;
        this._player.y = 200 - 64 - 16 - 40;
    }

    init = () => { };

    teardown = () => { };

    #change_room = (room) => {
        this._room.leave(this._game.room);
        this._game.room = room;
        this._room.enter(this._game.room);
    }

    interaction = () => {
        var zones = this._game.zone.hit_multi(this._player.player_rect);
        if (this._input.isDown(Input.KEY_SPACE) && this._input.isPressed(Input.KEY_UP)) {
            if (this._player.kind == Player.HUMAN && (zones.includes('green_house_door')
                || zones.includes('purple_house_door')
                || zones.includes('brown_house_door')
                || zones.includes('small_purple_house_door')
                || zones.includes('small_brown1_house_door')
                || zones.includes('small_brown2_house_door')
                || zones.includes('green_hut_door')
                || zones.includes('purple_hut_door')
                || zones.includes('brown_hut_door'))) {
                // Toggle 'doors'

                const door = zones.find(value => /door$/.test(value));
                // check locked doors
                switch (this._game.room) {
                    case 0:
                        if (door == 'small_purple_house_door') {
                            if (this._game.hud.active_item == 'yellow_key') {
                                this._room.flags[door] = !this._room.flags[door];
                            } else {
                                this._game.hud.set_message('         the door is locked');
                            }
                        }
                        break;
                    case 19:
                        if (door == 'small_purple_house_door') {
                            if (this._game.hud.active_item == 'brown_key') {
                                this._room.flags[door] = !this._room.flags[door];
                            } else {
                                this._game.hud.set_message('         the door is locked');
                            }
                        } else {
                            this._room.flags[door] = !this._room.flags[door];
                        }
                        break;
                    case 38:
                        if (door == 'purple_house_door') {
                            if (this._game.hud.active_item == 'purple_key') {
                                this._room.flags[door] = !this._room.flags[door];
                            } else {
                                this._game.hud.set_message('         the door is locked');
                            }
                        }
                        break;
                    case 39:
                        if (door == 'green_house_door') {
                            if (this._game.hud.active_item == 'blue_key') {
                                this._room.flags[door] = !this._room.flags[door];
                            } else {
                                this._game.hud.set_message('         the door is locked');
                            }
                        } else {
                            this._room.flags[door] = !this._room.flags[door];
                        }
                        break;
                    case 43:
                        if (door == 'brown_house_door') {
                            if (this._game.hud.active_item == 'grey_key') {
                                this._room.flags[door] = !this._room.flags[door];
                            } else {
                                this._game.hud.set_message('         the door is locked');
                            }
                        }
                        break;
                    case 61:
                        if (door == 'green_house_door') {
                            if (this._game.hud.active_item == 'green_key') {
                                this._room.flags[door] = !this._room.flags[door];
                            } else {
                                this._game.hud.set_message('         the door is locked');
                            }
                        }
                        break;
                    default:
                        this._room.flags[door] = !this._room.flags[door];
                }

                if (this._room.flags[door]) {
                    this._game.house = door.slice(0, -5);
                } else {
                    this._game.house = 'none';
                }

                if (this._game.room == 39 && this._game.house == 'green_house') {
                    this._game.hud.set_message('         dig between the two trees');
                    this._game.rooms.flags['buddy_asked'] = true;
                }
            }
        } else if (this._input.isDown(Input.KEY_SPACE) && this._input.isPressed(Input.KEY_DOWN)) {
            this._hud.open_hud();
            // Have to clear keyboard states, otherwise the 'space' button remain pressed and therefore
            // the first command will be selected without the ability to select any.
            this._input.clear();
        }
    };

    manual_change_room = () => {
        // For debugging only (navigate between rooms by keyboard)
        if (this._input.isPressed(Input.KEY_PGDOWN)) {
            // prev room
            if (this._game.room > 0) {
                this.#change_room(this._game.room - 1);
            }
            console.log(`Current room: ${this._game.room}`);
        } else if (this._input.isPressed(Input.KEY_PGUP)) {
            // next room
            if (this._game.room < 71) {
                this.#change_room(this._game.room + 1);
            }
            console.log(`Current room: ${this._game.room}`);
        }
    }

    update = (dt) => {
        // update room animation (water, torch)
        this._room.update(dt);

        if (this._game.is_over) {
            this._hud.update(dt);
            if (this._input.isPressed(Input.KEY_RETURN)) {
                location.reload();
            }
        } else if (this._initial) {
            if (this._input.isPressed(Input.KEY_RETURN)) {
                this._initial = false;
                this._hud.can_be(Player.HUMAN);
                if (this._game.cheat_is_on) {
                    this._hud.can_be(Player.FISH);
                    this._hud.can_be(Player.SNOWFLAKE);
                    this._hud.can_be(Player.BIRD);
                }
            } else {
                if (this._initial.rawKey != Input.NO_KEY) {
                    this._game.enter_cheat();
                }
            }
        } else if (this._hud.open) {
            // only hud interaction
            this._hud.update(dt);
        } else {
            this._hud.update(dt);
            this.interaction();

            if (this._game.cheat_is_on) {
                // for debugging :)
                this.manual_change_room();
            }

            this._player.update(dt);

            // exit from room
            if (this._player.x < -8) {
                // left
                this.#change_room(this._game.room - 1);
                this._player.x = 320 - this._player.width;
            } else if (this._player.x > 320 - 8) {
                // right
                this.#change_room(this._game.room + 1);
                this._player.x = 0;
            } else if (this._player.y + (this._player.height >> 1) < 0) {
                // up
                this.#change_room(this._game.room - 12);
                this._player.y = 200 - 64 - 16;
            } else if (this._player.y > 200 - 64) {
                // down
                if (this._game.room + 12 >= 72) {
                    this._game.hud.set_message('         you fell out of the world');
                    this._game.set_game_over();
                } else {
                    if (this._game.room == 34 || this._game.room == 52) {
                        this._game.hud.set_message('         you have drown');
                        this._game.set_game_over();
                    } else {
                        this.#change_room(this._game.room + 12);
                        this._player.y = -8;
                    }
                }
            }
        }
    };

    draw = (ctx) => {
        this._room.draw(ctx, this._game.room);
        this._hud.draw(ctx);

        if (this._initial) {
            this._font.print(ctx, ~~((320 - 14 * 8) / 2), 8, 'STONE OF SAGES');
            this._font.print(ctx, ~~((320 - 36 * 8) / 2), 16 + 8, 'ORIGINAL PLUS/4 GAME BY MIKLOS TIHOR');
            this._font.print(ctx, ~~((320 - 31 * 8) / 2), 16 + 24, 'JAVASCRIPT PORT BY PETER BAKOTA');

            this._font.print(ctx, ~~((320 - 22 * 8) / 2), 16 + 112 - 4, 'PRESS /ENTER/ TO START');
        } else {
            // for debugging
            // this._game.zone.debug(ctx);

            // clipping area
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, 320, 200 - 64);
            ctx.clip();
            this._player.draw(ctx);
            ctx.restore();
        }

        this._font.print(ctx, 0, 200 - 64, `${this._game.room}`);

        if (this._game.is_over) {
            this._font.print(ctx, ~~((320 - 16 * 8) / 2 + 0.5), ~~((200 - 64 - 8) / 2 + 0.5), 'THE GAME IS OVER');
            this._font.print(ctx, ~~((320 - 22 * 8) / 2), 16 + 112 - 4, 'PRESS /ENTER/ TO RESTART');
        }
    };
}
