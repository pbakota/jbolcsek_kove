"use strict";

class Player {

    _game; _dir; _kind; _x; _y; _w; _h; _anim_count; _anim_speed; _fall_anim;
    _left_anim = []; _right_anim = []; _ladder_anim = []; _bird_left_anim; _bird_right_anim; _bird_speed; _falling; _height_counter;
    constructor(game) {
        this._game = game;

        this._graphics = this._game.graphics;
        this._input = this._game.input;

        this._right_0 = new Sprite(this._graphics, 0, 128, 16, 40);
        this._right_1 = new Sprite(this._graphics, 16, 128, 16, 40);
        this._right_2 = new Sprite(this._graphics, 32, 128, 16, 40);

        this._left_0 = new Sprite(this._graphics, 0, 168, 16, 40);
        this._left_1 = new Sprite(this._graphics, 16, 168, 16, 40);
        this._left_2 = new Sprite(this._graphics, 32, 168, 16, 40);

        this._use_left = new Sprite(this._graphics, 0, 24, 24, 40);
        this._use_right = new Sprite(this._graphics, 24, 24, 24, 40);

        this._snowflake = new Sprite(this._graphics, 48, 144, 16, 16);

        this._fish_left = new Sprite(this._graphics, 48, 128, 40, 16);
        this._fish_right = new Sprite(this._graphics, 88, 128, 40, 16);

        this._bird_left_0 = new Sprite(this._graphics, 48, 160, 16, 40);
        this._bird_left_1 = new Sprite(this._graphics, 64, 160, 16, 40);
        this._bird_left_2 = new Sprite(this._graphics, 80, 160, 16, 40);
        this._bird_right_0 = new Sprite(this._graphics, 96, 160, 16, 40);
        this._bird_right_1 = new Sprite(this._graphics, 112, 160, 16, 40);
        this._bird_right_2 = new Sprite(this._graphics, 128, 160, 16, 40);

        this._on_ladder_1 = new Sprite(this._graphics, 0, 72, 16, 48);
        this._on_ladder_2 = new Sprite(this._graphics, 16, 72, 16, 48);

        this._left_anim = [this._left_0, this._left_1, this._left_0, this._left_2];
        this._right_anim = [this._right_0, this._right_1, this._right_0, this._right_2];
        this._ladder_anim = [this._on_ladder_1, this._on_ladder_2];

        this._bird_left_anim = [this._bird_left_0, this._bird_left_1, this._bird_left_2, this._bird_left_1];
        this._bird_right_anim = [this._bird_right_0, this._bird_right_1, this._bird_right_2, this._bird_right_1];

        Object.defineProperty(this, 'x', {
            get: () => { return this._x; },
            set: (value) => { this._x = value; }
        });

        Object.defineProperty(this, 'y', {
            get: () => { return this._y; },
            set: (value) => { this._y = value; }
        });

        Object.defineProperty(this, 'player_rect', {
            get: () => { return { x: this._x, y: this._y, w: 16, h: 40 } }
        });

        Object.defineProperty(this, 'kind', {
            get: () => {
                return this._kind;
            }
        })

        Object.defineProperty(this, 'face', {
            get: () => {
                return this._face;
            }
        })

        Object.defineProperty(this, 'width', {
            get: () => {
                switch (this._kind) {
                    case Player.HUMAN: return 16;
                    case Player.FISH: return 40;
                    case Player.SNOWFLAKE: return 16;
                    case Player.BIRD: return 16;
                }
            }
        })

        Object.defineProperty(this, 'height', {
            get: () => {
                switch (this._kind) {
                    case Player.HUMAN: return 40;
                    case Player.FISH: return 16;
                    case Player.SNOWFLAKE: return 16;
                    case Player.BIRD: return 40;
                }
            }
        })

        this._fall_anim = 0;
        this._bird_speed = 0;
        this._x = 148;
        // this._x = 32;
        this._y = 80;
        this._falling = false;
        this._height_counter = 0;

        this._face = Player.FACE_LEFT;
        this.transform_to(Player.HUMAN);
    }

    transform_to = (kind) => {
        switch (kind) {
            case Player.HUMAN:
                // when tranform to human it is important to have y coordinate rounded to 8 pixel boundary
                if (this._kind == Player.SNOWFLAKE) {
                    if (this._game.room == 46 || this._game.room == 48) {
                        if (this._x < 160) {
                            var zones = this._game.zone.hit_multi({ x: this._x - 16, y: this._y, w: 16, h: 16 });
                            // left side
                            if (zones.includes('rock')) {
                                this._x = 92;
                                this._y = 80;
                                this._face = Player.FACE_USE_LEFT;
                            } else {
                                console.log('You have burn in the lava!');
                            }
                        } else if (this._x > 160) {
                            var zones = this._game.zone.hit_multi({ x: this._x + 16, y: this._y, w: 16, h: 16 });
                            // right side
                            if (zones.includes('rock')) {
                                this._x = 216;
                                this._y = 80;
                                this._face = Player.FACE_USE_RIGHT;
                            }
                            else {
                                console.log('You have burn in the lava!');
                            }
                        }
                    } else if (this._game.room == 56 || this._game.room == 60) {
                        var zones = this._game.zone.hit_multi({ x: this._x - 16, y: this._y, w: 16, h: 16 });
                        // left side
                        if (zones.includes('rock')) {
                            this._x = 256;
                            this._y = 80;
                            this._face = Player.FACE_USE_LEFT;
                        } else {
                            console.log('You have burn in the lava!');
                        }
                    } else if (this._game.room == 61) {
                        var zones = this._game.zone.hit_multi({ x: this._x + 16, y: this._y, w: 16, h: 16 });
                        // right side
                        if (zones.includes('rock')) {
                            this._x = 48;
                            this._y = 80;
                            this._face = Player.FACE_USE_RIGHT;
                        }
                        else {
                            console.log('You have burn in the lava!');
                        }
                    }
                } else if (this._kind == Player.FISH) {
                    if (this._face == Player.FACE_RIGHT) {
                        this._x = this._x + 16 + 8;
                        this._y = ((this._game.room == 16 || this._game.room == 13 || this._game.room == 34 || this._game.room == 52) ?  80 +  16 : 80);
                    } else if (this._face == Player.FACE_LEFT) {
                        this._x = this._x - 16 + 12;
                        this._y = ((this._game.room == 16 || this._game.room == 13 || this._game.room == 34 || this._game.room == 52) ?  80 +  16 : 80);
                    }
                }
                break;
            case Player.SNOWFLAKE:
                if (this._game.room == 46 || this._game.room == 48) {
                    if (this._x > 160) {
                        var zones = this._game.zone.hit_multi({ x: this._x - 16, y: this._y + 40, w: 16, h: 16 });
                        if (zones.includes('lava')) {
                            this._x = 200;
                            this._y = 96 + 24;
                        } else {
                            console.log('You have freezed!')
                        }
                    } else {
                        var zones = this._game.zone.hit_multi({ x: this._x + 16, y: this._y + 40, w: 16, h: 16 });
                        if (zones.includes('lava')) {
                            this._x = 104;
                            this._y = 96 + 24;
                        } else {
                            console.log('You have freezed!')
                        }
                    }
                } else if (this._game.room == 56) {
                    this._x = 272;
                    this._y = 96 + 24;
                } else if (this._game.room == 61) {
                    var zones = this._game.zone.hit_multi({ x: this._x - 16, y: this._y + 40, w: 16, h: 16 });
                    // left side
                    if (zones.includes('lava')) {
                        this._x = 32;
                        this._y = 120;
                    } else {
                        console.log('You have freezed!');
                    }
                }
                break;
            case Player.FISH:
                if (this._game.room == 13) {
                    this._x = 16;
                    this._y = 120;
                } else if (this._game.room == 16) {
                    this._x = 260;
                    this._y = 120;
                } else if (this._game.room == 34 || this._game.room == 52) {
                    this._x = ((this._x > 120) ? 176 : 104);
                    this._y = 120;
                } else {
                    this._y = this.y + 40 - 16;
                }
                break;
        }
        this._kind = kind;
        this._anim_count = 0;
        this._anim_speed = 0;
    }

    human_form_update = (dt) => {
        // gravity
        if (this._face != Player.FACE_LADDER) {
            var zones = this._game.zone.hit_multi({ x: this._x + 4, y: this._y + 40, w: 8, h: 8 });
            if (!(zones.includes('ground') || zones.includes('waterfront') || zones.includes('rock'))) {
                this._fall_anim += dt;
                if (this._fall_anim > 0.05) {
                    this._fall_anim = 0;
                    this._y += 8; // remove this line to turn off gravity
                    console.log('FALLING');
                    if (!this._falling) {
                        this._height_counter = 0;
                        this._falling = true;
                    } else {
                        this._height_counter++;
                    }
                }
            } else if(this._falling) {
                this._falling = false;
                this._y = ((this._game.room == 16 || this._game.room == 34 || this._game.room == 13 || this._game.room == 52) ? 80 + 16 : 80);
                if (this._height_counter > 5) {
                    console.log('You have died!');
                }
            }
        }

        if (this._input.isDown(Input.KEY_SPACE)) {
            if (this._input.isPressed(Input.KEY_LEFT)) {
                console.log('Use item to left');
                this._face = Player.FACE_USE_LEFT;

            } else if (this._input.isPressed(Input.KEY_RIGHT)) {
                console.log('Use item to right');
                this._face = Player.FACE_USE_RIGHT;
            }
        } else {
            // Reset from use face
            if (this._face == Player.FACE_USE_LEFT) {
                this._face = Player.FACE_LEFT;
            } else if (this._face == Player.FACE_USE_RIGHT) {
                this._face = Player.FACE_RIGHT;
            }

            if (this._input.isDown(Input.KEY_LEFT)) {
                if (this._face != Player.FACE_LEFT) {
                    if (this._face != Player.FACE_LADDER) {
                        this._face = Player.FACE_LEFT;
                        this._anim_count = 0;
                    } else {
                        // checking the room number here is a dirty hack, but however I tried I could
                        // not find a proper solution which works for avery case. Room 19 is the room
                        // where we have a ladder in the house which makes this as an edge case
                        // because the ladder head is shorter than usual and therefore
                        // the cooridinates for step away from ladder does not match.
                        if (this._y == (this._game.room == 19 ? 80 : 80 - 8)) {
                            this._face = Player.FACE_LEFT;
                            this._anim_count = 0;
                            this._y += (this._game.room == 19 ? 0 : 8);
                        }
                    }
                }
                else {
                    zones = this._game.zone.hit_multi({ x: this._x - 4, y: this._y + 40 - 8, w: 8, h: 8 });
                    if (zones.includes('waterfront') || zones.includes('rock')) {
                        this._y = 80;
                    }
                    zones = this._game.zone.hit({ x: this._x - 4, y: this._y, w: 16, h: 40 });
                    if (!(zones == 'wall' || zones == 'bush' || zones == 'debris')) {
                        this._anim_speed += dt;
                        if (this._anim_speed > 0.1) {
                            this._anim_speed = 0;
                            this._anim_count = (this._anim_count + 1) % 4;
                            this._x += -4;
                        }
                    } else {
                        this._anim_count = 0;
                        this._anim_speed = 0;
                    }
                }
            } else if (this._input.isDown(Input.KEY_RIGHT)) {
                if (this._face != Player.FACE_RIGHT) {
                    if (this._face != Player.FACE_LADDER) {
                        this._face = Player.FACE_RIGHT;
                        this._anim_count = 0;
                    } else {
                        if (this._y == (this._game.room == 19 ? 80 : 80 - 8)) {
                            this._face = Player.FACE_RIGHT;
                            this._anim_count = 0;
                            this._y += (this._game.room == 19 ? 0 : 8);
                        }
                    }
                }
                else {
                    zones = this._game.zone.hit_multi({ x: this._x + 8, y: this._y + 40 - 8, w: 8, h: 8 });
                    if (zones.includes('waterfront') || zones.includes('rock')) {
                        this._y = 80;
                    }
                    zones = this._game.zone.hit({ x: this._x + 4, y: this._y, w: 16, h: 40 });
                    if (!(zones == 'wall' || zones == 'bush' || zones == 'debris')) {
                        this._anim_speed += dt;
                        if (this._anim_speed > 0.1) {
                            this._anim_speed = 0;
                            this._anim_count = (this._anim_count + 1) % 4;
                            this._x += 4;
                        }
                    } else {
                        this._anim_count = 0;
                        this._anim_speed = 0;
                    }
                }
            } else if (this._input.isDown(Input.KEY_UP)) {
                zones = this._game.zone.hit_multi({ x: this._x, y: this._y - 8 - 1, w: 16, h: 8 });
                if (zones.includes('ladder')) {
                    if (this._face != Player.FACE_LADDER) {
                        this._face = Player.FACE_LADDER;
                        this._x = 48;
                        this._y = (this._game.room == 19 ? 80 : 80 - 8);
                        this._anim_count = 0;
                    } else {
                        this._anim_speed += dt;
                        if (this._anim_speed > 0.2) {
                            this._anim_speed = 0;
                            this._anim_count = (this._anim_count + 1) % 2;
                            this._y -= 8;
                        }
                    }
                }
            } else if (this._input.isDown(Input.KEY_DOWN)) {
                zones = this._game.zone.hit({ x: this._x, y: this._y + 40 + 8, w: 16, h: 8 });
                if (zones.includes('ladder')) {
                    if (this._face != Player.FACE_LADDER) {
                        this._face = Player.FACE_LADDER;
                        this._x = 48;
                        this._y = 80;
                        this._anim_count = 0;
                    } else {
                        this._anim_speed += dt;
                        if (this._anim_speed > 0.2) {
                            this._anim_speed = 0;
                            this._anim_count = (this._anim_count + 1) % 2;
                            this._y += 8;
                        }
                    }
                }
            } else {
                if (this._face != Player.FACE_LADDER) {
                    this._anim_count = 0;
                }
            }
        }
    };

    fish_form_update = (dt) => {
        if (this._input.isDown(Input.KEY_LEFT)) {
            if (this._face != Player.FACE_LEFT) {
                this._face = Player.FACE_LEFT;
            }
            var zones = this._game.zone.hit_multi({ x: this._x - 8, y: this._y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('waterfront'))) {
                this._x -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_RIGHT)) {
            if (this._face != Player.FACE_RIGHT) {
                this._face = Player.FACE_RIGHT;
            }
            var zones = this._game.zone.hit_multi({ x: this._x + 40, y: this._y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('waterfront'))) {
                this._x += dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_UP)) {
            if (!(this._game.room >= 13 && this._game.room <= 16) && !(this._game.room == 34 || this._game.room == 52)) {
                this._y -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_DOWN)) {
            if (!(this._game.room == 34 || this._game.room == 52)) {
                var zones = this._game.zone.hit_multi({ x: this._x, y: this._y+8+2, w: 16, h: 8 });
                if (!zones.includes('rock')) {
                    this._y += dt * 100;
                }
            }
        }
    };

    snowflake_form_update = (dt) => {
        if (this._input.isDown(Input.KEY_LEFT)) {
            var zones = this._game.zone.hit_multi({ x: this._x - 8, y: this._y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock')) || zones.includes('lava')) {
                this._x -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_RIGHT)) {
            var zones = this._game.zone.hit_multi({ x: this._x + 16, y: this._y, w: 4, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock')) || zones.includes('lava')) {
                this._x += dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_UP)) {
            if (!(this._game.room == 46 || this._game.room == 56 || this._game.room == 48)) {
                var zones = this._game.zone.hit_multi({ x: this._x + 4, y: this._y - 4, w: 8, h: 8 });
                if (!(zones.includes('wall') || zones.includes('rock')) || zones.includes('lava')) {
                    this._y -= dt * 100;
                }
            }
        } else if (this._input.isDown(Input.KEY_DOWN)) {
            if (this._game.room != 56) {
                var zones = this._game.zone.hit_multi({ x: this._x + 4, y: this._y + 16, w: 8, h: 4 });
                if (!(zones.includes('wall') || zones.includes('rock')) || zones.includes('lava')) {
                    this._y += dt * 100;
                }
            }
        }
    };

    bird_form_update = (dt) => {
        this._anim_speed += dt;
        if (this._anim_speed > 0.2) {
            this._anim_speed = 0;
            this._anim_count = (this._anim_count + 1) % 4;
        }

        if (this._input.isDown(Input.KEY_LEFT)) {
            if (this._face != Player.FACE_LEFT) {
                this._face = Player.FACE_LEFT;
            }
            var zones = this._game.zone.hit({ x: this._x - 8, y: this._y, w: 8, h: 40 });
            if (!zones.includes('wall')) {
                this._x -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_RIGHT)) {
            if (this._face != Player.FACE_RIGHT) {
                this._face = Player.FACE_RIGHT;
            }
            var zones = this._game.zone.hit({ x: this._x + 16, y: this._y, w: 8, h: 40 });
            if (!zones.includes('wall')) {
                this._x += dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_UP)) {
            var zones = this._game.zone.hit_multi({ x: this._x, y: this._y - 8, w: 16, h: 8 });
            if (!zones.includes('wall') || zones.includes('ladder') || zones.includes('cave')) {
                this._y -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_DOWN)) {
            var zones = this._game.zone.hit_multi({ x: this._x + 4, y: this._y + 40, w: 8, h: 4 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('ground')) || zones.includes('ladder') || zones.includes('cave')) {
                this._y += dt * 100;
            } else {
                this._y = ((this._game.room == 13 || this._game.room == 16 || this._game.room == 34 || this._game.room == 52) ? 80 + 16 : 80);
            }
        }
    };

    update = (dt) => {
        switch (this._kind) {
            case Player.HUMAN:
                this.human_form_update(dt);
                break;
            case Player.FISH:
                this.fish_form_update(dt);
                break;
            case Player.SNOWFLAKE:
                this.snowflake_form_update(dt);
                break;
            case Player.BIRD:
                this.bird_form_update(dt);
                break;
        }
    };

    // for debugging detection zone below player
    debug = (ctx) => {
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        // ctx.rect(this._x, this._y+40, 16, 8);
        const r = { x: this._x+4, y: this._y + 40 - 16, w: 16, h: 16 };
        ctx.rect(r.x, r.y, r.w, r.h);
        ctx.stroke();
    }

    draw = (ctx) => {
        // For debugging only
        // this.debug(ctx);
        switch (this._kind) {
            case Player.HUMAN:
                if (this._face == Player.FACE_LEFT) {
                    this._left_anim[this._anim_count].draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                } else if (this._face == Player.FACE_RIGHT) {
                    this._right_anim[this._anim_count].draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                } else if (this._face == Player.FACE_LADDER) {
                    this._ladder_anim[this._anim_count].draw(ctx, this._x, this._y);
                } else if (this._face == Player.FACE_USE_LEFT) {
                    this._use_left.draw(ctx, ~~((this._x - 8) + 0.5), ~~(this._y + 0.5));
                } else if (this._face == Player.FACE_USE_RIGHT) {
                    this._use_right.draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                }
                // this.debug(ctx);
                break
            case Player.FISH:
                if (this._face == Player.FACE_LEFT) {
                    this._fish_left.draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                } else if (this._face == Player.FACE_RIGHT) {
                    this._fish_right.draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                }
                break
            case Player.SNOWFLAKE:
                this._snowflake.draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                break
            case Player.BIRD:
                if (this._face == Player.FACE_LEFT) {
                    this._bird_left_anim[this._anim_count].draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                } else if (this._face == Player.FACE_RIGHT) {
                    this._bird_right_anim[this._anim_count].draw(ctx, ~~(this._x + 0.5), ~~(this._y + 0.5));
                }
                break
        }
    };
}

Player.GRAVITY = 100;

Player.HUMAN = 0;
Player.FISH = 1;
Player.SNOWFLAKE = 2;
Player.BIRD = 3;

Player.FACE_LEFT = 0;
Player.FACE_RIGHT = 1;
Player.FACE_LADDER = 2;
Player.FACE_USE_LEFT = 3;
Player.FACE_USE_RIGHT = 4;
