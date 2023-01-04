"use strict";

class Player {

    _game; _dir; _kind; _x; _y; _w; _h; _anim_count; _anim_speed; _fall_anim; _hud;
    _left_anim = []; _right_anim = []; _ladder_anim = []; _bird_left_anim; _bird_right_anim; _bird_speed; _falling; _height_counter; _bullet; _bullet_x; _bullet_y; _bullet_fired; _bullet_vx;
    constructor(game) {
        this._game = game;

        this._graphics = this._game.graphics;
        this._input = this._game.input;
        this._hud = this._game.hud;

        this._bullet = new Sprite(this._graphics, 48, 32, 7, 8);

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

        Object.defineProperty(this, 'bullet_fired', {
            get: () => {
                return this._bullet_fired;
            },
            set: (value) => {
                this._bullet_fired = value;
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
        this._falling = false;
        this._height_counter = 0;

        this._face = Player.FACE_LEFT;
        this.transform_to(Player.HUMAN);

        this._bullet_fired = false;
        this._bullet_x = 0;
        this._bullet_y = 0;
        this._bullet_vx = 0;
        this._bullet_timer = 0;
    }

    use_pistol = () => {
        if (this._bullet_fired) return;

        this._bullet_fired = true;
        if (this._face == Player.FACE_USE_LEFT) {
            // fire left
            this._bullet_x = this._x - 8;
            this._bullet_y = this._y + 8;
            this._bullet_vx = -1;

        } else if (this._face == Player.FACE_USE_RIGHT) {
            // fire right
            this._bullet_x = this._x + 16;
            this._bullet_y = this._y + 8;
            this._bullet_vx = 1;
        }
    }

    use_axe = () => {
        const check_rect = { x: this._face == Player.FACE_USE_RIGHT ? this._x + 16 : this._x - 16, y: this._y, w: 8, h: 40 };
        if (this._game.room == 18) {
            var zones = this._game.zone.hit_multi(check_rect);
            if (zones.includes('tree')) {
                this._game.rooms.flags['tree_cut'] = true;
            }
        } else if (this._game.room == 37) {
            var zones = this._game.zone.hit_multi(check_rect);
            if (zones.includes('alga_flower')) {
                this._game.rooms.flags['flower_cut'] = true;
            }
        }
    }

    use_ladder = () => {
        if (this._game.room == 18 && this._game.rooms.flags['tree_cut']) {
            var zones = this._game.zone.hit_multi({ x: this._face == Player.FACE_USE_RIGHT ? this._x + 16 : this._x - 16, y: this._y, w: 8, h: 40 });
            if (zones.includes('tree')) {
                this._game.rooms.flags['ladder_put'] = true;
            }
        }
    }

    transform_to = (kind) => {
        // ignore if already in that form
        if (this._kind == kind)
            return;

        // player cooridinates rounded to 8 pixel boundary
        const rx = (this._x + 4) & 0xfffffff8;
        const ry = (this._y + 0) & 0xfffffff8;

        switch (kind) {
            case Player.HUMAN:
                if (this._kind == Player.SNOWFLAKE) {
                    if (this._face == Player.FACE_LEFT) {
                        this._x = rx - 8 - 4;
                        this._y = 200 - 64 - 16 - 40;
                    } else if (this._face == Player.FACE_RIGHT) {
                        this._x = rx + 8 + 4;
                        this._y = 200 - 64 - 16 - 40;
                    }
                } else if (this._kind == Player.FISH) {
                    if (this._game.room == 13) {
                        this._x = this._x - 4;
                    } else if (this._game.room == 16) {
                        this._x = this._x + 32 - 8;
                    } else if (this._game.room == 34 || this._game.room == 52) {
                        if (this._x < 160) {
                            this._x = this._x;
                        } else {
                            this._x = this._x + 32 - 8;
                        }
                    }
                    var zones = this._game.zone.hit_multi({ x: this._x, y: this._y, w: 32, h: 16 });
                    this._y = (zones.includes('water') && (this._game.room == 16 || this._game.room == 13 || this._game.room == 34 || this._game.room == 52) ? 80 + 16 : 80);
                } else if (this._kind == Player.BIRD) {
                    this._falling = true;
                }
                break;
            case Player.SNOWFLAKE:
                if (this._face == Player.FACE_LEFT) {
                    this._x = rx - 16;
                    this._y = 200 - 64 - 16;
                    this._face = Player.FACE_RIGHT;
                } else if (this._face == Player.FACE_RIGHT) {
                    this._x = rx + 8;
                    this._y = 200 - 64 - 16;
                    this._face = Player.FACE_LEFT;
                }
                var zones = this._game.zone.hit_multi({ x: this._x, y: this._y, w: 16, h: 16 });
                if (!zones.includes('lava')) {
                    this._y = 200 - 64 - 16 - 16;
                    console.log('You have frozen!');
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
                    this._x = this._x < 160 ? this._x : this._x - 24;
                    this._y = this._y + 40 - 16;
                } else {
                    this._y = this.y + 40 - 16;
                }
                var zones = this._game.zone.hit_multi({ x: this._x, y: this._y, w: 32, h: 16 });
                if (!zones.includes('water')) {
                    console.log('You have drown!');
                }
                break;
        }
        this._kind = kind;
        this._anim_count = 0;
        this._anim_speed = 0;
    }

    use_item = () => {
        switch (this._game.hud.active_item) {
            case 'pistol':
                this.use_pistol();
                break;
            case 'axe':
                this.use_axe();
                break;
            case 'ladder':
                this.use_ladder();
                break;
        }
    }

    human_form_update = (dt) => {
        // gravity
        if (this._face != Player.FACE_LADDER) {
            var zones = this._game.zone.hit_multi({ x: this._x + 4, y: this._y + 40 - 1, w: 8, h: 8 });
            // console.log(zones);
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
            } else if (this._falling) {
                this._falling = false;
                this._y = (zones.includes('water') ? 80 + 16 : 80);
                if (this._height_counter > 5) {
                    console.log('You have died!');
                }
            }
        }

        if (this._input.isDown(Input.KEY_SPACE)) {
            if (this._input.isPressed(Input.KEY_LEFT)) {
                this._face = Player.FACE_USE_LEFT;
                this.use_item();
            } else if (this._input.isPressed(Input.KEY_RIGHT)) {
                this._face = Player.FACE_USE_RIGHT;
                this.use_item();
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
                zones = this._game.zone.hit_multi({ x: this._x, y: this._y + 40 + 8, w: 16, h: 8 });
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
        var zones = this._game.zone.hit_multi({ x: this._x, y: this._y, w: 32, h: 16 });
        if (!(zones.includes('water') || (this._game.room >= 25 && this._game.room <= 28)) || (this._game.room >= 37 && this._game.room <= 40)) {
            return;
        }
        if (this._input.isDown(Input.KEY_LEFT)) {
            if (this._face != Player.FACE_LEFT) {
                this._face = Player.FACE_LEFT;
            }
            var zones = this._game.zone.hit_multi({ x: this._x, y: this._y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('waterfront'))) {
                this._x -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_RIGHT)) {
            if (this._face != Player.FACE_RIGHT) {
                this._face = Player.FACE_RIGHT;
            }
            var zones = this._game.zone.hit_multi({ x: this._x + 32, y: this._y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('waterfront'))) {
                this._x += dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_UP)) {
            if (!(this._game.room >= 13 && this._game.room <= 16) && !(this._game.room == 34 || this._game.room == 52)) {
                this._y -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_DOWN)) {
            if (!(this._game.room == 34 || this._game.room == 52)) {
                var zones = this._game.zone.hit_multi({ x: this._x, y: this._y + 8 + 2, w: 16, h: 8 });
                if (!zones.includes('rock')) {
                    this._y += dt * 100;
                }
            }
        }
    };

    snowflake_form_update = (dt) => {
        var zones = this._game.zone.hit_multi({ x: this._x, y: this._y, w: 16, h: 16 });
        var back = this._game.rooms.get(this._game.room).back;
        if (!(zones.includes('lava') || back == 'lava')) {
            return;
        }
        if (this._input.isDown(Input.KEY_LEFT)) {
            this._face = Player.FACE_LEFT;
            var zones = this._game.zone.hit_multi({ x: this._x - 4, y: this._y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock'))) {
                this._x -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_RIGHT)) {
            this._face = Player.FACE_RIGHT;
            var zones = this._game.zone.hit_multi({ x: this._x + 16, y: this._y, w: 4, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock'))) {
                this._x += dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_UP)) {
            var zones = this._game.zone.hit_multi({ x: this._x, y: this._y - 4, w: 16, h: 8 });
            if (!(zones.includes('wall') || zones.includes('rock') || back == 'cave') && (zones.includes('lava') || back == 'lava')) {
                this._y -= dt * 100;
            }
        } else if (this._input.isDown(Input.KEY_DOWN)) {
            console.log(zones);
            var zones = this._game.zone.hit_multi({ x: this._x, y: this._y + 16, w: 16, h: 4 });
            if (!(zones.includes('wall') || zones.includes('rock')) && (zones.includes('lava') || back == 'lava' || this._y + 16 >= 200 - 64)) {
                this._y += dt * 100;
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

        if (this._bullet_fired) {
            this._bullet_x += dt * this._bullet_vx * 100;
            if (this._bullet_x < -8 || this._bullet_x > 320) {
                this._bullet_fired = false;
            }

            if (this._bullet_fired) {
                // check if mob was hit
                if (this._game.rooms.mob) {
                    this._game.rooms.mob_hit({ x: this._bullet_x, y: this._bullet_y, w: 8, h: 8 });
                }
            }
        }
    };

    // for debugging detection zone below player
    debug = (ctx) => {
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        // ctx.rect(this._x, this._y+40, 16, 8);
        const r = { x: this._x + 16, y: this._y, w: 8, h: 40 };
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

        if (this._bullet_fired) {
            this._bullet.draw(ctx, this._bullet_x, this._bullet_y);
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
