"use strict";

class Game
{
    _engine; _renderer; _loader; _graphics; _input; _scene; _nextScene;
    _titleScene; _actionScene; _current_room; _active_item; _player; _room; _current_house; _hud;
    _zone; _game_over; _game_cheat_is_on; _cheat_char_index; _cheat_text; _game_success;
    _snapshot_char_index; _snapshot_text; _snapshot; _player_start_x; _player_start_y; _player_face;
    _all_keys_char_index; _all_keys_text; _game_all_keys_is_on;

    constructor() {

        this._loader = new Loader();
        this._renderer = new Renderer();
        this._input = new Input();
        this._zone = new Zone();

        this._renderer.options(320, 200, 4);
        this._engine = new Engine(this, this._renderer, this._loader);

        this._game_over = false;
    }

    run = () => {
        this._engine.run();
        console.log('Loading assets.');
        this._loader.load('graphics', 'assets/bolcsek_kove.png');

        Object.defineProperty(this, 'graphics', {
            get: () => {
                return this._graphics;
            }
        });

        Object.defineProperty(this, 'input', {
            get: () => {
                return this._input;
            }
        });

        Object.defineProperty(this, 'zone', {
            get: () => {
                return this._zone;
            }
        });

        Object.defineProperty(this, 'rooms', {
            get: () => {
                return this._room;
            },
            set: (value) => {
                this._room = value;
            }
        });

        Object.defineProperty(this, 'hud', {
            get: () => {
                return this._hud;
            },
            set: (value) => {
                this._hud = value;
            }
        });

        Object.defineProperty(this, 'player', {
            get: () => {
                return this._player;
            },
            set: (value) => {
                this._player = value;
            }
        });

        Object.defineProperty(this, 'room', {
            get: () => {
                return this._current_room;
            },
            set: (value) => {
                this._current_room = value;
            }
        });

        Object.defineProperty(this, 'house', {
            get: () => {
                return this._current_house;
            },
            set: (value) => {
                this._current_house = value;
            }
        });

        Object.defineProperty(this, 'active_item', {
            get: () => {
                return this._active_item;
            },
            set: (value) => {
                this._active_item = value;
            }
        });

        Object.defineProperty(this, 'is_over', {
            get: () => {
                return this._game_over;
            }
        });

        Object.defineProperty(this, 'is_success', {
            get: () => {
                return this._game_success;
            }
        });

        Object.defineProperty(this, 'cheat_is_on', {
            get: () => {
                return this._game_cheat_is_on;
            }
        });

        Object.defineProperty(this, 'snapshot_is_on', {
            get: () => {
                return this._game_snapshot_is_on;
            }
        });

        Object.defineProperty(this, 'all_keys_is_on', {
            get: () => {
                return this._game_all_keys_is_on;
            }
        });

        this._cheat_char_index = 0;
        this._cheat_text = [
            'KeyA',
            'KeyB',
            'KeyR',
            'KeyA',
            'KeyK',
            'KeyA',
            'KeyD',
            'KeyA',
            'KeyB',
            'KeyR',
            'KeyA'
        ];

        this._snapshot_char_index = 0;
        this._snapshot_text = [
            'KeyS',
            'KeyN',
            'KeyA',
            'KeyP',
            'KeyS',
            'KeyH',
            'KeyO',
            'KeyT'
        ];

        this._all_keys_char_index = 0;
        this._all_keys_text = [
            'KeyA',
            'KeyL',
            'KeyL',
            'KeyK',
            'KeyE',
            'KeyY',
            'KeyS'
        ];

        this._game_snapshot_is_on = false;
        this._game_cheat_is_on = false;
        this._game_all_keys_is_on = false;
        this._current_house = 'none';

        this._snapshot = {};
    };

    save_player_position = () => {
        this._player_start_x = this._player.x;
        this._player_start_y = this._player.y;
        this._player_start_face = this._player.face;
    }

    save_snapshot = (room) => {
        console.log('saving snapshot');
        this._snapshot = {
            room: room,
            house: this._current_house,
            player: {
                x: this._player_start_x,
                y: this._player_start_y,
                face: this._player_start_face,
            },
            rooms: JSON.stringify(Rooms),
            slots: [
                this._hud.slots[0],
                this._hud.slots[1],
                this._hud.slots[2],
                this._hud.slots[3],
                this._hud.slots[4],
            ],
            active_item: this._hud.active_item,
            flags: JSON.stringify(this._room.flags),
            mob: JSON.stringify(this._room.mob),
        };
    }

    load_snapshot = () => {
        console.log('loading snapshot');
        if(this._snapshot != {}) {
            this._player.x = this._snapshot.player.x;
            this._player.y = this._snapshot.player.y;
            this._player.face = this._snapshot.player.face;
            this._current_room = this._snapshot.room;
            this._current_house = this._snapshot.house;
            this._hud.slots[0] = this._snapshot.slots[0];
            this._hud.slots[1] = this._snapshot.slots[1];
            this._hud.slots[2] = this._snapshot.slots[2];
            this._hud.slots[3] = this._snapshot.slots[3];
            this._hud.slots[4] = this._snapshot.slots[4];
            this._hud.active_item = this._snapshot.active_item;
            Rooms = JSON.parse(this._snapshot.rooms);
            this._room.flags = JSON.parse(this._snapshot.flags);
            this._room.mob = JSON.parse(this._snapshot.mob);

            this._game_over = false;
            this._game_success = false;
            this._hud.set_message('        snapshot restored');
        }
    }

    enter_cheat = () => {
        var c = this._input.rawKey();
        if(c != Input.NO_KEY) {
            // console.log(`c=${c}, next_char=${this._cheat_text[this._cheat_char_index]}`);
            if(c == this._cheat_text[this._cheat_char_index]) {
                this._cheat_char_index ++;
                if(this._cheat_char_index == this._cheat_text.length) {
                    this._game_cheat_is_on = true;
                    console.log('cheats are enabled');
                }
            }
            if(c == this._snapshot_text[this._snapshot_char_index]) {
                this._snapshot_char_index ++;
                if(this._snapshot_char_index == this._snapshot_text.length) {
                    this._game_snapshot_is_on = true;
                    console.log('snapshots are enabled');
                }
            }
            if(c == this._all_keys_text[this._all_keys_char_index]) {
                this._all_keys_char_index ++;
                if(this._all_keys_char_index == this._all_keys_text.length) {
                    this._game_all_keys_is_on = true;
                    console.log('all doors are unlocked');
                }
            }
        }
    }

    ready = () => {
        console.log('Game ready.');
        this._graphics = this._loader.get('graphics');

        this._actionScene = new ActionScene(this);
        this._nextScene = this._titleScene = new TitleScene(this);
    };

    setNextScene = (scene) => {
        switch (scene) {
            case Game.GAME_SCENE:
                this._nextScene = this._actionScene;
        }
    };

    set_game_over = () => {
        this._game_over = true;
    }

    set_game_success = () => {
        this._game_success = true;
        this.set_game_over();
    }

    update = (dt) => {
        if (this._nextScene) {
            if(this._scene)
                this._scene.teardown();

            this._scene = this._nextScene;
            this._nextScene = undefined;

            this._scene.init();
        }

        if (this._scene) {
            this._scene.update(dt);
        }
    };

    draw = (ctx) => {
        if (this._scene) {
            this._scene.draw(ctx);
        }
    };

    pause = () => {

    };

    restore = () => {

    };
}
