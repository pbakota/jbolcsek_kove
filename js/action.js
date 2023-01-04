"use strict";

class ActionScene extends Scene {
    _graphics; _hud; _input; _player; _font; _initial; _hud_open; _items; _room; _tree; _purple_house;

    constructor(game) {
        super(game);

        this._graphics = this.game.graphics;
        this._input = this.game.input;

        this._font = new Font(this.game);
        this._room = new Room(this.game);

        this._game.room = 17; // start in this room
        // this._game.room = 61; // start in this room
        this._player = new Player(this.game);

        // dirty hack again
        this._game.player = this._player;
        this._game.rooms = this._room;

        this._initial = true;
        this._hud_open = false; // when hud has control

        this._hud = new Hud(this.game);
    }

    drawRoom = (ctx) => {
    };

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
                || zones.includes('brown_hut_door')))
            {
                // Toggle 'door'
                const door = zones.find(value => /door$/.test(value));
                this._room.opened[door] = !this._room.opened[door];
                if (this._room.opened[door]) {
                    this._game.house = door.slice(0, -5);
                } else {
                    this._game.house = 'none';
                }
            }
        } else if (this._input.isDown(Input.KEY_SPACE) && this._input.isPressed(Input.KEY_DOWN)) {
            this._hud.open_hud();
            // Have to clear keyboard states, otherwise the 'space' button remain pressed and therefore
            // the first command will be selected without the ability to select any.
            this._input.clear();
        }
    };

    debug = () => {
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

        if (this._initial) {
            if (this._input.isPressed(Input.KEY_RETURN)) {
                this._initial = false;
                this._hud.can_be(Player.HUMAN);
                this._hud.can_be(Player.FISH);
                this._hud.can_be(Player.SNOWFLAKE);
                this._hud.can_be(Player.BIRD);
            }
        } else if (this._hud.open) {
            // only hud interaction
            this._hud.update(dt);
        } else {
            this._hud.update(dt);
            this.interaction();

            // for debugging
            this.debug();

            this._player.update(dt);

            // exit from room
            if (this._player.x < -8) {
                // left
                this.#change_room(this._game.room - 1);
                this._player.x = 320 - this._player.width;
                if (this._player.kind == Player.SNOWFLAKE) {
                    this._player.y = 200 - 64 - 16;
                }
            } else if (this._player.x > 320 - 8) {
                // right
                this.#change_room(this._game.room + 1);
                this._player.x = 0;
            } else if (this._player.y < -32) {
                // up
                this.#change_room(this._game.room - 12);
                this._player.y = 200 - 64 - 16;
            } else if (this._player.y > 200 - 64) {
                // down
                if (this._game.room + 12 >= 72) {
                    console.log('Out of mapr');
                } else {
                    if (this._game.room != 6) {
                        // in room 6 there is a ladder head but in below room there is no ladder until we cut off the tree and put the ladder
                        this.#change_room(this._game.room + 12);
                        if (this._player.kind == Player.SNOWFLAKE) {
                            this._player.y = -8;
                        } else {
                            this._player.y = -24;
                        }
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

        this._font.print(ctx, 0, 200-64, `${this._game.room}`);
    };
}
