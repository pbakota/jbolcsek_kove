"use strict";

class Player {

    // private
    #game;
    #graphics;
    #input;
    #kind;
    #face;
    #oxygen;
    #oxygen_timer;
    #x;
    #y;
    #anim_count;
    #anim_speed;
    #fall_anim;
    #left_anim = [];
    #right_anim = [];
    #ladder_anim = [];
    #bird_left_anim;
    #bird_right_anim;

    #dead_player;
    #right_1;
    #right_2;
    #right_0;
    #left_0;
    #left_1;
    #left_2;
    #use_left;
    #use_right;
    #snowflake;
    #fish_left;
    #fish_right;
    #bird_left_0;
    #bird_left_1;
    #bird_left_2;
    #bird_right_0;
    #bird_right_1;
    #bird_right_2;
    #on_ladder_1;
    #on_ladder_2;

    #falling;
    #height_counter;
    #bullet;
    #bullet_x;
    #bullet_y;
    #bullet_fired;
    #bullet_vx;

    #granade;
    #granade_x;
    #granade_y;
    #granade_vx;
    #granade_vy;
    #granade_threw;

    #explode;
    #exploding;
    #exploding_x;
    #exploding_y;
    #exploding_timer;

    // ctor
    constructor(game) {
        this.#game = game;

        this.#graphics = this.#game.graphics;
        this.#input = this.#game.input;

        this.#bullet = new Sprite(this.#graphics, 48, 32, 7, 8);
        this.#granade = new Sprite(this.#graphics, 48, 40, 8, 8);
        this.#explode = new Sprite(this.#graphics, 32, 72, 16, 16);

        this.#dead_player = new Sprite(this.#graphics, 80, 64, 40, 8);

        this.#right_0 = new Sprite(this.#graphics, 0, 128, 16, 40);
        this.#right_1 = new Sprite(this.#graphics, 16, 128, 16, 40);
        this.#right_2 = new Sprite(this.#graphics, 32, 128, 16, 40);

        this.#left_0 = new Sprite(this.#graphics, 0, 168, 16, 40);
        this.#left_1 = new Sprite(this.#graphics, 16, 168, 16, 40);
        this.#left_2 = new Sprite(this.#graphics, 32, 168, 16, 40);

        this.#use_left = new Sprite(this.#graphics, 0, 24, 24, 40);
        this.#use_right = new Sprite(this.#graphics, 24, 24, 24, 40);

        this.#snowflake = new Sprite(this.#graphics, 48, 144, 16, 16);

        this.#fish_left = new Sprite(this.#graphics, 48, 128, 40, 16);
        this.#fish_right = new Sprite(this.#graphics, 88, 128, 40, 16);

        this.#bird_left_0 = new Sprite(this.#graphics, 48, 160, 16, 40);
        this.#bird_left_1 = new Sprite(this.#graphics, 64, 160, 16, 40);
        this.#bird_left_2 = new Sprite(this.#graphics, 80, 160, 16, 40);
        this.#bird_right_0 = new Sprite(this.#graphics, 96, 160, 16, 40);
        this.#bird_right_1 = new Sprite(this.#graphics, 112, 160, 16, 40);
        this.#bird_right_2 = new Sprite(this.#graphics, 128, 160, 16, 40);

        this.#on_ladder_1 = new Sprite(this.#graphics, 0, 72, 16, 48);
        this.#on_ladder_2 = new Sprite(this.#graphics, 16, 72, 16, 48);

        this.#left_anim = [this.#left_0, this.#left_1, this.#left_0, this.#left_2];
        this.#right_anim = [this.#right_0, this.#right_1, this.#right_0, this.#right_2];
        this.#ladder_anim = [this.#on_ladder_1, this.#on_ladder_2];

        this.#bird_left_anim = [this.#bird_left_0, this.#bird_left_1, this.#bird_left_2, this.#bird_left_1];
        this.#bird_right_anim = [this.#bird_right_0, this.#bird_right_1, this.#bird_right_2, this.#bird_right_1];

        Object.defineProperty(this, 'x', {
            get: () => { return this.#x; },
            set: (value) => { this.#x = value; }
        });

        Object.defineProperty(this, 'y', {
            get: () => { return this.#y; },
            set: (value) => { this.#y = value; }
        });

        Object.defineProperty(this, 'player_rect', {
            get: () => { return { x: this.#x, y: this.#y, w: 16, h: 40 } }
        });

        Object.defineProperty(this, 'kind', {
            get: () => {
                return this.#kind;
            }
        });

        Object.defineProperty(this, 'face', {
            get: () => {
                return this.#face;
            },
            set: (value) => {
                this.#face = value;
            }
        });

        Object.defineProperty(this, 'oxygen', {
            get: () => {
                return this.#oxygen;
            }
        });

        Object.defineProperty(this, 'bullet_fired', {
            get: () => {
                return this.#bullet_fired;
            },
            set: (value) => {
                this.#bullet_fired = value;
            }
        });

        Object.defineProperty(this, 'width', {
            get: () => {
                switch (this.#kind) {
                    case Player.HUMAN: return 16;
                    case Player.FISH: return 40;
                    case Player.SNOWFLAKE: return 16;
                    case Player.BIRD: return 16;
                }
            }
        })

        Object.defineProperty(this, 'height', {
            get: () => {
                switch (this.#kind) {
                    case Player.HUMAN: return 40;
                    case Player.FISH: return 16;
                    case Player.SNOWFLAKE: return 16;
                    case Player.BIRD: return 40;
                }
            }
        })


        this.#oxygen = 9;
        this.#oxygen_timer = 0;

        this.#fall_anim = 0;
        this.#falling = false;
        this.#height_counter = 0;

        this.#face = Player.FACE_LEFT;
        this.transform_to(Player.HUMAN);

        this.#bullet_fired = false;
        this.#bullet_x = 0;
        this.#bullet_y = 0;
        this.#bullet_vx = 0;

        this.#granade_threw = false;
        this.#granade_x = 0;
        this.#granade_y = 0;
        this.#granade_vx = 0;
        this.#granade_vy = 0;

        this.#exploding = false;
        this.#exploding_x = 0;
        this.#exploding_y = 0;
        this.#exploding_timer = 0;
    }

    clear_tools = () => {
        this.#bullet_fired = false;
        this.#exploding = false;
        this.#granade_threw = false;
    };

    use_pistol = () => {
        if (this.#bullet_fired) return;

        this.#bullet_fired = true;
        if (this.#face == Player.FACE_USE_LEFT) {
            // fire left
            this.#bullet_x = this.#x - 8;
            this.#bullet_y = this.#y + 8;
            this.#bullet_vx = -1;

        } else if (this.#face == Player.FACE_USE_RIGHT) {
            // fire right
            this.#bullet_x = this.#x + 16;
            this.#bullet_y = this.#y + 8;
            this.#bullet_vx = 1;
        }
    }

    use_axe = () => {
        const check_rect = { x: this.#face == Player.FACE_USE_RIGHT ? this.#x + 16 : this.#x - 16, y: this.#y, w: 8, h: 40 };
        if (this.#game.room == 18) {
            var zones = this.#game.zone.hit_multi(check_rect);
            if (zones.includes('tree')) {
                this.#game.rooms.flags['tree_cut'] = true;
            }
        } else if (this.#game.room == 37) {
            var zones = this.#game.zone.hit_multi(check_rect);
            if (zones.includes('alga_flower')) {
                this.#game.rooms.flags['flower_cut'] = true;
                var flower = Rooms[37].items.find(e => e.name == 'flower');
                flower.visible = true;
            }
        }
    }

    use_ladder = () => {
        if (this.#game.room == 18 && this.#game.rooms.flags['tree_cut']) {
            var zones = this.#game.zone.hit_multi({ x: this.#face == Player.FACE_USE_RIGHT ? this.#x + 16 : this.#x - 16, y: this.#y, w: 8, h: 40 });
            if (zones.includes('tree')) {
                this.#game.rooms.flags['ladder_put'] = true;
                this.#game.hud.remove_active_item();
            }
        }
    }

    throw_granade = () => {
        this.#granade_x = this.#face == Player.FACE_USE_LEFT ? this.#x - 8 : this.#x + 16;
        this.#granade_y = this.#y + 10;
        this.#granade_vx =  this.#face == Player.FACE_USE_LEFT ? -1 : 1;
        this.#granade_vy = -30;
        this.#granade_threw = true;
        if(!this.#game.cheat_is_on) {
            this.#game.hud.remove_active_item();
        }
    }

    update_granade = (dt) => {
        if(this.#granade_threw) {
            this.#granade_vy += 1;
            this.#granade_x += this.#granade_vx * dt * 45;
            this.#granade_y += dt * this.#granade_vy;
            if(this.#granade_y > 200-64-16-8) {
                var zones = this.#game.zone.hit_multi({x: this.#granade_x, y: this.#granade_y - 8, w: 8, h: 8});
                if(zones.includes('bush_hit') || zones.includes('debris_hit')) {
                    console.log(`${zones} hit with granade`);
                }
                this.#exploding = true;
                this.#exploding_x = this.#granade_x - 4;
                this.#exploding_y = this.#granade_y - 4;
                this.#exploding_timer = 0;
                this.#granade_threw = false;
            }
        }

        if(this.#exploding) {
            this.#exploding_timer += dt;
            if(this.#exploding_timer > 0.5) {
                this.#exploding = false;
                var zones = this.#game.zone.hit_multi({x: this.#granade_x, y: this.#granade_y - 8, w: 8, h: 8});
                if(zones.includes('bush_hit') || zones.includes('debris_hit')) {
                    this.#game.rooms.remove_detail(this.#game.room, zones.includes('bush_hit') ? 'bush' : 'debris');
                }
            }
        }
    }

    use_spade = () => {
        if(!this.#game.rooms.flags['lamp_found']) {
            var zones = this.#game.zone.hit_multi({x: this.#x, y: this.#y, w: 16, h: 40});
            if(zones.includes('dig-place')) {
                var lamp = Rooms[18].items.find(e => e.name == 'lamp');
                lamp.visible = true;
                this.#game.rooms.flags['lamp_found'] = true;
            }
        }
    }

    transform_to = (kind) => {
        // ignore if already in that form
        if (this.#kind == kind)
            return;

        // player cooridinates rounded to 8 pixel boundary
        const rx = (this.#x + 4) & 0xfffffff8;
        const ry = (this.#y + 0) & 0xfffffff8;

        switch (kind) {
            case Player.HUMAN:
                if (this.#kind == Player.SNOWFLAKE) {
                    if (this.#face == Player.FACE_LEFT) {
                        this.#x = rx - 8 - 4;
                        this.#y = 200 - 64 - 16 - 40;
                    } else if (this.#face == Player.FACE_RIGHT) {
                        this.#x = rx + 8 + 4;
                        this.#y = 200 - 64 - 16 - 40;
                    }
                } else if (this.#kind == Player.FISH) {
                    if (this.#game.room == 13) {
                        this.#x = this.#x - 4;
                    } else if (this.#game.room == 16) {
                        this.#x = this.#x + 32 - 8;
                    } else if (this.#game.room == 34 || this.#game.room == 52) {
                        if (this.#x < 160) {
                            this.#x = this.#x;
                        } else {
                            this.#x = this.#x + 32 - 8;
                        }
                    }
                    this.#falling = true;
                    var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 40, h: 16 });
                    if((zones.includes('water') && (this.#game.room == 16 || this.#game.room == 13 || this.#game.room == 34 || this.#game.room == 52))) {
                        this.#y = 80 + 16;
                    } else if(this.#y + 40 >= 200-64-16) {
                        this.#y =  80;
                    } else {
                        this.#falling = true;
                    }
                } else if (this.#kind == Player.BIRD) {
                    this.#falling = true;
                }
                break;
            case Player.SNOWFLAKE:
                if (this.#face == Player.FACE_LEFT) {
                    this.#x = rx - 16;
                    this.#y = 200 - 64 - 16;
                    this.#face = Player.FACE_RIGHT;
                } else if (this.#face == Player.FACE_RIGHT) {
                    this.#x = rx + 8;
                    this.#y = 200 - 64 - 16;
                    this.#face = Player.FACE_LEFT;
                }
                var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 16, h: 16 });
                if (!zones.includes('lava') && !this.#game.cheat_is_on) {
                    this.#y = 200 - 64 - 16 - 16;
                    this.#game.hud.set_message('         you have frozen');
                    this.#game.set_game_over();
                }
                break;
            case Player.FISH:
                if (this.#game.room == 13) {
                    this.#x = 16;
                    this.#y = 120;
                } else if (this.#game.room == 16) {
                    this.#x = 260;
                    this.#y = 120;
                } else if (this.#game.room == 34 || this.#game.room == 52) {
                    this.#x = this.#x < 160 ? this.#x : this.#x - 24;
                    this.#y = this.#y + 40 - 16;
                } else {
                    this.#y = this.y + 40 - 16;
                }
                var back = this.#game.rooms.get(this.#game.room).back;
                var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 32, h: 16 });
                if (!zones.includes('water') && back != 'water' && !this.#game.cheat_is_on) {
                    this.#game.hud.set_message('         you have drown');
                    this.#game.set_game_over();
                } else {
                    this.#oxygen = 9;
                }
                break;
        }
        this.#kind = kind;
        this.#anim_count = 0;
        this.#anim_speed = 0;
    }

    use_item = () => {
        switch (this.#game.hud.active_item) {
            case 'pistol':
                this.use_pistol();
                break;
            case 'axe':
                this.use_axe();
                break;
            case 'ladder':
                this.use_ladder();
                break;
            case 'granade':
                this.throw_granade();
                break;
            case 'spade':
                this.use_spade();
                break;
        }
    }

    human_form_update = (dt) => {
        if(!this.#game.cheat_is_on) {
            var back = this.#game.rooms.get(this.#game.room).back;
            if(back == 'water' && this.#game.house == 'none') {
                this.#oxygen_timer += dt;
                if(this.#oxygen_timer > 1) {
                    this.#oxygen_timer = 0;
                    this.#oxygen --;

                    if(this.#oxygen == 0) {
                        this.#face = Player.FACE_DEAD;
                        this.#x = this.#x - 20;
                        this.#y = 200-64-16-8;
                        this.#game.hud.set_message('         out of oxygen! you have drown');
                        this.#game.set_game_over();
                        return;
                    }
                }
            } else if(back == 'lava') {
                this.#face = Player.FACE_DEAD;
                this.#x = this.#x - 20;
                this.#y = 200-64-16-8;
                this.#game.hud.set_message('         you have burned in the lava');
                this.#game.set_game_over();
                return;
            }
        }

        // gravity
        if (this.#face != Player.FACE_LADDER) {
            var zones = this.#game.zone.hit_multi({ x: this.#x + 4, y: this.#y + 40 - 1, w: 8, h: 8 });
            // console.log(zones);
            if (!(zones.includes('ground') || zones.includes('waterfront') || zones.includes('rock'))) {
                this.#fall_anim += dt;
                if (this.#fall_anim > 0.05) {
                    this.#fall_anim = 0;
                    this.#y += 8; // remove this line to turn off gravity
                    if (!this.#falling) {
                        this.#height_counter = 0;
                        this.#falling = true;
                    } else {
                        this.#height_counter++;
                    }
                }
            } else if (this.#falling) {
                this.#falling = false;
                this.#y = (zones.includes('water') ? 80 + 16 : 80);
                if(!this.#game.cheat_is_on) {
                    if (this.#height_counter > 5) {
                        this.#game.hud.set_message('         you have fall from height');
                        this.#face = Player.FACE_DEAD;
                        this.#x = this.#x - 20;
                        this.#y = 200-64-16-8;
                        this.#game.set_game_over();
                        return;
                    }
                }
            }
        }

        if (this.#input.isDown(Input.KEY_SPACE)) {
            if (this.#input.isPressed(Input.KEY_LEFT)) {
                this.#face = Player.FACE_USE_LEFT;
                this.use_item();
            } else if (this.#input.isPressed(Input.KEY_RIGHT)) {
                this.#face = Player.FACE_USE_RIGHT;
                this.use_item();
            }

        } else {
            // Reset from use face
            if (this.#face == Player.FACE_USE_LEFT) {
                this.#face = Player.FACE_LEFT;
            } else if (this.#face == Player.FACE_USE_RIGHT) {
                this.#face = Player.FACE_RIGHT;
            }

            if (this.#input.isDown(Input.KEY_LEFT)) {
                if (this.#face != Player.FACE_LEFT) {
                    if (this.#face != Player.FACE_LADDER) {
                        this.#face = Player.FACE_LEFT;
                        this.#anim_count = 0;
                    } else {
                        // checking the room number here is a dirty hack, but however I tried I could
                        // not find a proper solution which works for avery case. Room 19 is the room
                        // where we have a ladder in the house which makes this as an edge case
                        // because the ladder head is shorter than usual and therefore
                        // the cooridinates for step away from ladder does not match.
                        if (this.#y == (this.#game.room == 19 ? 80 : 80 - 8)) {
                            this.#face = Player.FACE_LEFT;
                            this.#anim_count = 0;
                            this.#y += (this.#game.room == 19 ? 0 : 8);
                        }
                    }
                }
                else {
                    zones = this.#game.zone.hit_multi({ x: this.#x - 4, y: this.#y + 40 - 8, w: 8, h: 8 });
                    if (zones.includes('waterfront') || zones.includes('rock')) {
                        this.#y = 80;
                    }
                    zones = this.#game.zone.hit({ x: this.#x - 4, y: this.#y, w: 16, h: 40 });
                    if (!(zones == 'wall' || zones == 'bush' || zones == 'debris')) {
                        this.#anim_speed += dt;
                        if (this.#anim_speed > 0.1) {
                            this.#anim_speed = 0;
                            this.#anim_count = (this.#anim_count + 1) % 4;
                            this.#x += -4;
                        }
                    } else {
                        this.#anim_count = 0;
                        this.#anim_speed = 0;
                    }
                }
            } else if (this.#input.isDown(Input.KEY_RIGHT)) {
                if (this.#face != Player.FACE_RIGHT) {
                    if (this.#face != Player.FACE_LADDER) {
                        this.#face = Player.FACE_RIGHT;
                        this.#anim_count = 0;
                    } else {
                        if (this.#y == (this.#game.room == 19 ? 80 : 80 - 8)) {
                            this.#face = Player.FACE_RIGHT;
                            this.#anim_count = 0;
                            this.#y += (this.#game.room == 19 ? 0 : 8);
                        }
                    }
                }
                else {
                    zones = this.#game.zone.hit_multi({ x: this.#x + 8, y: this.#y + 40 - 8, w: 8, h: 8 });
                    if (zones.includes('waterfront') || zones.includes('rock')) {
                        this.#y = 80;
                    }
                    zones = this.#game.zone.hit({ x: this.#x + 4, y: this.#y, w: 16, h: 40 });
                    if (!(zones == 'wall' || zones == 'bush' || zones == 'debris')) {
                        this.#anim_speed += dt;
                        if (this.#anim_speed > 0.1) {
                            this.#anim_speed = 0;
                            this.#anim_count = (this.#anim_count + 1) % 4;
                            this.#x += 4;
                        }
                    } else {
                        this.#anim_count = 0;
                        this.#anim_speed = 0;
                    }
                }
            } else if (this.#input.isDown(Input.KEY_UP)) {
                zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y - 8 - 1, w: 16, h: 8 });
                if (zones.includes('ladder')) {
                    if (this.#face != Player.FACE_LADDER) {
                        this.#face = Player.FACE_LADDER;
                        this.#x = 48;
                        this.#y = (this.#game.room == 19 ? 80 : 80 - 8);
                        this.#anim_count = 0;
                    } else {
                        this.#anim_speed += dt;
                        if (this.#anim_speed > 0.08) {
                            this.#anim_speed = 0;
                            this.#anim_count = (this.#anim_count + 1) % 2;
                            this.#y -= 8;
                        }
                    }
                } else {
                    zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 16, h: 40 });
                    if (zones.includes('bed')) {
                        if (this.#face == Player.FACE_BED) {
                            this.#face = Player.FACE_LEFT;
                        }
                    }
                }
            } else if (this.#input.isDown(Input.KEY_DOWN)) {
                zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y + 40 + 8, w: 16, h: 8 });
                if (zones.includes('ladder')) {
                    if (this.#face != Player.FACE_LADDER) {
                        this.#face = Player.FACE_LADDER;
                        this.#x = 48;
                        this.#y = 80;
                        this.#anim_count = 0;
                    } else {
                        this.#anim_speed += dt;
                        if (this.#anim_speed > 0.08) {
                            this.#anim_speed = 0;
                            this.#anim_count = (this.#anim_count + 1) % 2;
                            this.#y += 8;
                        }
                    }
                } else {
                    zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 16, h: 40 });
                    if (zones.includes('bed')) {
                        if (this.#face != Player.FACE_BED) {
                            this.#face = Player.FACE_BED;
                            switch (this.#game.room) {
                                case 38:
                                    this.#game.hud.can_be(Player.SNOWFLAKE);
                                    break;
                                case 43:
                                    this.#game.hud.can_be(Player.FISH);
                                    break;
                                case 61:
                                    this.#game.hud.can_be(Player.BIRD);
                                    break;
                            }
                        }
                    }
                }
            } else {
                if (this.#face != Player.FACE_LADDER) {
                    this.#anim_count = 0;
                }
            }
        }
    };

    fish_form_update = (dt) => {
        var back = this.#game.rooms.get(this.#game.room).back;
        var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 32, h: 16 });
        if (!(zones.includes('water') || back == 'water')) {
            return;
        }
        if (this.#input.isDown(Input.KEY_LEFT)) {
            this.#face = Player.FACE_LEFT;
            var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('waterfront'))) {
                this.#x -= dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_RIGHT)) {
            this.#face = Player.FACE_RIGHT;
            var zones = this.#game.zone.hit_multi({ x: this.#x + 32, y: this.#y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('waterfront'))) {
                this.#x += dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_UP)) {
            var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y - 16, w: 32, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock')) && (zones.includes('water') || back == 'water')) {
                this.#y -= dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_DOWN)) {
            var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 32, h: 16+1 });
            if (!(this.#game.room == 34 || this.#game.room == 52) && !(zones.includes('wall') || zones.includes('rock')) && (zones.includes('water') || back == 'water')) {
                this.#y += dt * 100;
            }
        }
    };

    snowflake_form_update = (dt) => {
        var back = this.#game.rooms.get(this.#game.room).back;
        var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y, w: 16, h: 16 });
        if (!(zones.includes('lava') || back == 'lava')) {
            return;
        }
        if (this.#input.isDown(Input.KEY_LEFT)) {
            this.#face = Player.FACE_LEFT;
            var zones = this.#game.zone.hit_multi({ x: this.#x - 4, y: this.#y, w: 8, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock'))) {
                this.#x -= dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_RIGHT)) {
            this.#face = Player.FACE_RIGHT;
            var zones = this.#game.zone.hit_multi({ x: this.#x + 16, y: this.#y, w: 4, h: 16 });
            if (!(zones.includes('wall') || zones.includes('rock'))) {
                this.#x += dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_UP)) {
            var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y - 4, w: 16, h: 8 });
            if (!(zones.includes('wall') || zones.includes('rock') || back == 'cave') && (zones.includes('lava') || back == 'lava')) {
                this.#y -= dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_DOWN)) {
            var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y + 16, w: 16, h: 4 });
            if (!(zones.includes('wall') || zones.includes('rock')) && (zones.includes('lava') || back == 'lava' || this.#y + 16 >= 200 - 64)) {
                this.#y += dt * 100;
            }
        }
    };

    bird_form_update = (dt) => {
        this.#anim_speed += dt;
        if (this.#anim_speed > 0.2) {
            this.#anim_speed = 0;
            this.#anim_count = (this.#anim_count + 1) % 4;
        }

        if (this.#input.isDown(Input.KEY_LEFT)) {
            if (this.#face != Player.FACE_LEFT) {
                this.#face = Player.FACE_LEFT;
            }
            var zones = this.#game.zone.hit({ x: this.#x - 8, y: this.#y, w: 8, h: 40 });
            if (!zones.includes('wall')) {
                this.#x -= dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_RIGHT)) {
            if (this.#face != Player.FACE_RIGHT) {
                this.#face = Player.FACE_RIGHT;
            }
            var zones = this.#game.zone.hit({ x: this.#x + 16, y: this.#y, w: 8, h: 40 });
            if (!zones.includes('wall')) {
                this.#x += dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_UP)) {
            var zones = this.#game.zone.hit_multi({ x: this.#x, y: this.#y - 8, w: 16, h: 8 });
            if (!zones.includes('wall') || zones.includes('ladder') || zones.includes('cave')) {
                this.#y -= dt * 100;
            }
        } else if (this.#input.isDown(Input.KEY_DOWN)) {
            var zones = this.#game.zone.hit_multi({ x: this.#x + 4, y: this.#y + 40, w: 8, h: 4 });
            if (!(zones.includes('wall') || zones.includes('rock') || zones.includes('ground')) || zones.includes('ladder') || zones.includes('cave')) {
                this.#y += dt * 100;
            } else {
                this.#y = ((this.#game.room == 13 || this.#game.room == 16 || this.#game.room == 34 || this.#game.room == 52) ? 80 + 16 : 80);
            }
        }
    };

    update = (dt) => {
        if (this.#game.rooms.is_dark_room(this.#game.room) || (this.#game.is_over)) return;

        switch (this.#kind) {
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

        if (this.#bullet_fired) {
            this.#bullet_x += dt * this.#bullet_vx * 100;
            if (this.#bullet_x < -8 || this.#bullet_x > 320) {
                this.#bullet_fired = false;
            }

            if (this.#bullet_fired) {
                // check if mob was hit
                if (this.#game.rooms.mob) {
                    this.#game.rooms.mob_hit({ x: this.#bullet_x, y: this.#bullet_y, w: 8, h: 8 });
                }
            }
        }

        this.update_granade(dt);
    };

    // for debugging detection zone below player
    debug = (ctx) => {
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        // ctx.rect(this._x, this._y+40, 16, 8);
        const r = {x: this.#x, y: this.#y, w: 16, h: 40};
        ctx.rect(r.x, r.y, r.w, r.h);
        ctx.stroke();
    }

    draw = (ctx) => {

        if(this.#game.rooms.is_dark_room(this.#game.room)) return;

        // For debugging only
        // this.debug(ctx);
        switch (this.#kind) {
            case Player.HUMAN:
                if (this.#face == Player.FACE_LEFT) {
                    this.#left_anim[this.#anim_count].draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                } else if (this.#face == Player.FACE_RIGHT) {
                    this.#right_anim[this.#anim_count].draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                } else if (this.#face == Player.FACE_LADDER) {
                    this.#ladder_anim[this.#anim_count].draw(ctx, this.#x, this.#y);
                } else if (this.#face == Player.FACE_USE_LEFT) {
                    this.#use_left.draw(ctx, ~~((this.#x - 8) + 0.5), ~~(this.#y + 0.5));
                } else if (this.#face == Player.FACE_USE_RIGHT) {
                    this.#use_right.draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                } else if(this.#face == Player.FACE_DEAD) {
                    this.#dead_player.draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                } else if(this.#face == Player.FACE_BED) {
                    this.#dead_player.draw(ctx, 160,200-64-16-8-16);
                }
                break
            case Player.FISH:
                if (this.#face == Player.FACE_LEFT) {
                    this.#fish_left.draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                } else if (this.#face == Player.FACE_RIGHT) {
                    this.#fish_right.draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                }
                break
            case Player.SNOWFLAKE:
                this.#snowflake.draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                break
            case Player.BIRD:
                if (this.#face == Player.FACE_LEFT) {
                    this.#bird_left_anim[this.#anim_count].draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                } else if (this.#face == Player.FACE_RIGHT) {
                    this.#bird_right_anim[this.#anim_count].draw(ctx, ~~(this.#x + 0.5), ~~(this.#y + 0.5));
                }
                break
        }

        if (this.#bullet_fired) {
            this.#bullet.draw(ctx, this.#bullet_x, this.#bullet_y);
        }

        if(this.#granade_threw) {
            this.#granade.draw(ctx, ~~(this.#granade_x+0.5), ~~(this.#granade_y+0.5));
        }

        if(this.#exploding) {
            this.#explode.draw(ctx, ~~(this.#exploding_x+0.5), ~~(this.#exploding_y+0.5));
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
Player.FACE_DEAD = 5;
Player.FACE_BED = 6;