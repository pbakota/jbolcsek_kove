"use strict";

class Player {

    _game; _dir; _kind; _x; _y; _w; _h; _anim_count; _anim_speed; _fall_anim;
    _left_anim = []; _right_anim = []; _ladder_anim = [];
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
        this._x = 148;
        this._y = 80;

        this._face = Player.FACE_LEFT;
        this.transform_to(Player.HUMAN);
    }

    transform_to = (kind) => {
        this._kind = kind;
        this._anim_count = 0;
        this._anim_speed = 0;
    }

    human_form_update = (dt) => {
        var zone = this._game.zone.hit({ x: this._x, y: this._y + 40, w: 16, h: 8 });
        // console.log(`Under player "${zone}", face=${this._face}`);
        if (!(zone == 'ground' || zone == 'waterfront' || zone == 'rock' || zone == 'ladder' || this._face == Player.FACE_LADDER)) {
            // gravity
            this._fall_anim += dt;
            if (this._fall_anim > 0.05) {
                this._fall_anim = 0;
                // this._y += 8;
            }
        } else if (zone != 'ladder' && this._face != Player.FACE_LADDER) {
            // this._y = 80;
        }
        if (this._input.isDown(Input.KEY_LEFT)) {
            if (this._face != Player.FACE_LEFT) {
                if (this._face != Player.FACE_LADDER) {
                    this._face = Player.FACE_LEFT;
                    this._anim_count = 0;
                } else {
                    if (this._y == 80) {
                        this._face = Player.FACE_LEFT;
                        this._anim_count = 0;
                        // this._y += 8;
                    }
                }
            }
            else {
                zone = this._game.zone.hit({ x: this._x - 4, y: this._y, w: 16, h: 40 });
                if (!(zone == 'wall' || zone == 'bush' || zone == 'debris')) {
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
                    if (this._y == 80) {
                        this._face = Player.FACE_RIGHT;
                        this._anim_count = 0;
                        // this._y += 8;
                    }
                }
            }
            else {
                zone = this._game.zone.hit({ x: this._x + 4, y: this._y, w: 16, h: 40 });
                if (!(zone == 'wall' || zone == 'bush' || zone == 'debris')) {
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
            zone = this._game.zone.hit({ x: this._x, y: this._y, w: 16, h: 40 });
            if (zone == 'ladder' || this._face == Player.FACE_LADDER) {
                if (this._face != Player.FACE_LADDER) {
                    this._face = Player.FACE_LADDER;
                    this._x = 48;
                    this._y = 80;
                    this._anim_count = 0;
                } else {
                    zone = this._game.zone.hit({ x: this._x, y: this._y-16, w: 8, h: 8 });
                    if (zone == 'ladder' || this._y <= 0) {
                        this._anim_speed += dt;
                        if (this._anim_speed > 0.2) {
                            this._anim_speed = 0;
                            this._anim_count = (this._anim_count + 1) % 2;
                            this._y -= 8;
                        }
                    }
                }
            }
        } else if (this._input.isDown(Input.KEY_DOWN)) {
            zone = this._game.zone.hit({ x: this._x, y: this._y, w: 16, h: 40 });
            if (zone == 'ladder' || this._face == Player.FACE_LADDER) {
                if (this._face != Player.FACE_LADDER) {
                    this._face = Player.FACE_LADDER;
                    this._x = 48;
                    this._y = 80;
                    this._anim_count = 0;
                } else {
                    zone = this._game.zone.hit({ x: this._x, y: this._y + 48, w: 8, h: 8 });
                    if (zone == 'ladder' || this._y >= 88) {
                        this._anim_speed += dt;
                        if (this._anim_speed > 0.2) {
                            this._anim_speed = 0;
                            this._anim_count = (this._anim_count + 1) % 2;
                            this._y += 8;
                        }
                    }
                }
            }
        } else {
            if (this._face != Player.FACE_LADDER) {
                this._anim_count = 0;
            }
        }
    };

    fish_form_update = (dt) => {

    };

    snowflake_form_update = (dt) => {

    };

    bird_form_update = (dt) => {

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
        ctx.rect(this._x, this._y+40, 16, 8);
        ctx.stroke();
    }

    draw = (ctx) => {
        // For debugging only
        // this.debug(ctx);
        switch (this._kind) {
            case Player.HUMAN:
                if (this._face == Player.FACE_LEFT) {
                    this._left_anim[this._anim_count].draw(ctx, this._x, this._y);
                } else if (this._face == Player.FACE_RIGHT) {
                    this._right_anim[this._anim_count].draw(ctx, this._x, this._y);
                } else if (this._face == Player.FACE_LADDER) {
                    this._ladder_anim[this._anim_count].draw(ctx, this._x, this._y);
                }
                // this.debug(ctx);
                break
            case Player.FISH:
                break
            case Player.SNOWFLAKE:
                break
            case Player.BIRD:
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
