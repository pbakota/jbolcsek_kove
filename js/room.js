"use strict";

class Room {
    // private
    #game;
    #items;
    #graphics;
    #air;
    #water;
    #ground;
    #rock;
    #cave;
    #lava;
    #air_bkg;
    #water_bkg;
    #ground_bkg;
    #rock_bkg;
    #cave_bkg;
    #lava_bkg;
    #tree;
    #ladder;
    #ladder_head;
    #bush;
    #debris;
    #purple_out_house;
    #purple_in_house;
    #green_out_house;
    #green_in_house;
    #brown_out_house;
    #brown_in_house;
    #green_out_hut;
    #green_in_hut;
    #purple_out_hut;
    #purple_in_hut;
    #brown_out_hut;
    #brown_in_hut;
    #small_brown1_out_house;
    #small_brown1_in_house;
    #small_brown2_out_house;
    #small_brown2_in_house;
    #small_purple_out_house;
    #small_purple_in_house;
    #waterfront_left;
    #waterfront_right;
    #cave_left;
    #cave_right;
    #cave_top;
    #torch_0;
    #torch_1;
    #torch_2;
    #flower;
    #princess;
    #buddy;
    #bed;

    #water_0;
    #water_1;
    #water_2;
    #water_3;
    #water_4;
    #water_5;
    #water_6;
    #water_7;
    #water_anim;

    #opened;
    #animations;
    #torch_anim;
    #first_draw;

    // ctor
    constructor(game) {
        this.#game = game;
        this.#graphics = this.#game.graphics;

        this.#items = new ItemManager(this.#game);

        this.#air = new Sprite(this.#graphics, 16 * 0, 0, 16, 16);
        this.#water = new Sprite(this.#graphics, 16 * 1, 0, 16, 16);
        this.#ground = new Sprite(this.#graphics, 16 * 2, 0, 16, 16);
        this.#rock = new Sprite(this.#graphics, 16 * 3, 0, 16, 16);
        this.#cave = new Sprite(this.#graphics, 16 * 4, 0, 16, 16);
        this.#lava = new Sprite(this.#graphics, 16 * 5, 0, 16, 16);
        this.#bed = new Sprite(this.#graphics, 96, 0, 40, 16);

        this.#air_bkg = new Sprite(this.#graphics, 16 * 0, 8, 8, 8);
        this.#water_bkg = new Sprite(this.#graphics, 16 * 1, 8, 8, 8);
        this.#ground_bkg = new Sprite(this.#graphics, 16 * 2, 8, 8, 8);
        this.#rock_bkg = new Sprite(this.#graphics, 16 * 3, 8, 8, 8);
        this.#cave_bkg = new Sprite(this.#graphics, 16 * 4, 8, 8, 8);
        this.#lava_bkg = new Sprite(this.#graphics, 16 * 5, 8, 8, 8);

        this.#tree = new Sprite(this.#graphics, 184, 0, 64, 112);
        this.#ladder = new Sprite(this.#graphics, 248, 0, 16, 120);
        this.#ladder_head = new Sprite(this.#graphics, 248, 56 + 1, 16, 64);
        this.#bush = new Sprite(this.#graphics, 184, 112, 32, 24);
        this.#debris = new Sprite(this.#graphics, 216, 112, 32, 24);

        this.#purple_out_house = new Sprite(this.#graphics, 272, 0, 112, 64);
        this.#purple_in_house = new Sprite(this.#graphics, 272 + 112, 0, 112, 64);
        this.#green_out_house = new Sprite(this.#graphics, 272, 64, 112, 64);
        this.#green_in_house = new Sprite(this.#graphics, 272 + 112, 64, 112, 64);
        this.#brown_out_house = new Sprite(this.#graphics, 272, 128, 112, 64);
        this.#brown_in_house = new Sprite(this.#graphics, 272 + 112, 128, 112, 64);

        this.#green_out_hut = new Sprite(this.#graphics, 0, 208, 56, 64);
        this.#green_in_hut = new Sprite(this.#graphics, 56, 208, 56, 64);
        this.#purple_out_hut = new Sprite(this.#graphics, 0, 208 + 64, 56, 64);
        this.#purple_in_hut = new Sprite(this.#graphics, 56, 208 + 64, 56, 64);
        this.#brown_out_hut = new Sprite(this.#graphics, 0, 208 + 128, 56, 64);
        this.#brown_in_hut = new Sprite(this.#graphics, 56, 208 + 128, 56, 64);

        this.#small_brown1_out_house = new Sprite(this.#graphics, 0, 400, 72, 64);
        this.#small_brown1_in_house = new Sprite(this.#graphics, 72, 400, 72, 64);
        this.#small_brown2_out_house = new Sprite(this.#graphics, 0, 464, 72, 64);
        this.#small_brown2_in_house = new Sprite(this.#graphics, 72, 464, 72, 64);
        this.#small_purple_out_house = new Sprite(this.#graphics, 0, 528, 72, 64);
        this.#small_purple_in_house = new Sprite(this.#graphics, 72, 528, 72, 64);

        this.#waterfront_left = new Sprite(this.#graphics, 56, 16, 16, 16);
        this.#waterfront_right = new Sprite(this.#graphics, 56 + 16, 16, 16, 16);

        this.#water_0 = new Sprite(this.#graphics, 184 + 8 * 0, 136, 8, 8);
        this.#water_1 = new Sprite(this.#graphics, 184 + 8 * 1, 136, 8, 8);
        this.#water_2 = new Sprite(this.#graphics, 184 + 8 * 2, 136, 8, 8);
        this.#water_3 = new Sprite(this.#graphics, 184 + 8 * 3, 136, 8, 8);
        this.#water_4 = new Sprite(this.#graphics, 184 + 8 * 4, 136, 8, 8);
        this.#water_5 = new Sprite(this.#graphics, 184 + 8 * 5, 136, 8, 8);
        this.#water_6 = new Sprite(this.#graphics, 184 + 8 * 6, 136, 8, 8);
        this.#water_7 = new Sprite(this.#graphics, 184 + 8 * 7, 136, 8, 8);

        this.#cave_left = new Sprite(this.#graphics, 136, 0, 24, 136);
        this.#cave_right = new Sprite(this.#graphics, 160, 0, 24, 136);
        this.#cave_top = new Sprite(this.#graphics, 144, 408, 320, 24);

        this.#torch_0 = new Sprite(this.#graphics, 248 + 0, 120 + 8, 8, 24);
        this.#torch_1 = new Sprite(this.#graphics, 248 + 8, 120 + 8, 8, 24);
        this.#torch_2 = new Sprite(this.#graphics, 248 + 16, 120 + 8, 8, 24);

        this.#flower = new Sprite(this.#graphics, 96, 80, 8, 40);
        this.#princess = new Sprite(this.#graphics, 104, 72, 8, 48);
        this.#buddy = new Sprite(this.#graphics, 112, 80, 8, 40);

        this.#torch_anim = [this.#torch_0, this.#torch_1, this.#torch_2];
        this.#water_anim = [this.#water_0,
        this.#water_1,
        this.#water_2,
        this.#water_3,
        this.#water_4,
        this.#water_5,
        this.#water_6,
        this.#water_7
        ];

        Object.defineProperty(this, 'opened', {
            get: () => { return this.#opened }
        })

        this.#opened = {};
        this.#animations = [];
        this.#first_draw = true;
    }

    #get_tile = (name) => {
        var tile;
        switch (name) {
            case 'air': tile = this.#air_bkg; break;
            case 'water': tile = this.#water_bkg; break;
            case 'ground': tile = this.#ground_bkg; break;
            case 'rock': tile = this.#rock_bkg; break;
            case 'cave': tile = this.#cave_bkg; break;
            case 'lava': tile = this.#lava_bkg; break;
        }
        return tile;
    };

    #get_floor = (name) => {
        var tile;
        switch (name) {
            case 'air': tile = this.#air; break;
            case 'water': tile = this.#water; break;
            case 'ground': tile = this.#ground; break;
            case 'rock': tile = this.#rock; break;
            case 'cave': tile = this.#cave; break;
            case 'lava': tile = this.#lava; break;
        }
        return tile;
    };

    update = (dt) => {
        // update room animation
        if (this.#animations.length) {
            for (var i = 0; i < this.#animations.length; ++i) {
                var it = this.#animations[i];
                switch (it.name) {
                    case 'torch':
                        it.anim_timer += dt;
                        if (it.anim_timer > 0.25) {
                            it.anim_timer = 0;
                            it.anim_frame = (it.anim_frame + 1) % 3;
                        }
                        break;
                    case 'water':
                        it.anim_timer += dt;
                        if (it.anim_timer > 0.12) {
                            it.anim_timer = 0;
                            it.anim_frame = (it.anim_frame + 1) % 8;
                        }
                        break;
                }
            }
        }
    }

    leave = (room) => {

    }

    enter = (room) => {
        this.#animations = [];
        this.#first_draw = true;
    }

    draw = (ctx, room) => {
        this.#game.zone.clear();

        // back
        var back = this.#get_tile(Rooms[room].back);
        for (var j = 0; j < 25; ++j) {
            for (var i = 0; i < 40; ++i) {
                back.draw(ctx, i * 8, j * 8);
            }
        }

        // room animations
        if (this.#animations.length && !this.#first_draw) {
            for (var i = 0; i < this.#animations.length; ++i) {
                var it = this.#animations[i];
                switch (it.name) {
                    case 'torch':
                        this.#torch_anim[it.anim_frame].draw(ctx, it.x, it.y);
                        break;
                    case 'water':
                        this.#water_anim[it.anim_frame].draw(ctx, it.x, it.y);
                        break;
                }
            }
        }

        // floor
        var floor = this.#get_floor(Rooms[room].floor);
        for (var i = 0; i < 20; ++i) {
            floor.draw(ctx, i * 16, (200 - 64 - 16));
        }

        if (Rooms[room].floor == 'water' && this.#first_draw) {
            for (var i = 0; i < 40; ++i) {
                this.#animations.push({
                    x: i * 8, y: 200 - 64 - 16, anim_timer: 0, anim_frame: (i % 8), name: 'water'
                });
            }
        }

        // details
        if (Rooms[room].details.length) {
            for (var d in Rooms[room].details) {
                const x = Rooms[room].details[d].x;
                const y = Rooms[room].details[d].y;
                const ob = Rooms[room].details[d].obj;

                switch (ob) {
                    case 'purple_house':
                        if (this.#opened['purple_house_door']) {
                            this.#purple_in_house.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 96, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 8, y: y + 24, w: 4, h: 40, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 96 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            });
                            this.#items.draw_visible_items(ctx, room, 'purple_house');
                            if (room == 38) {
                                this.#bed.draw(ctx, 160, 104);
                                this.#game.zone.add({
                                    x: 160, y: 104, w: 40, h: 16, t: 'bed'
                                })
                            }
                        } else {
                            this.#purple_out_house.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 48, y: y + 24, w: 16, h: 40, t: 'purple_house_door'
                        });
                        break;
                    case 'brown_house':
                        if (this.#opened['brown_house_door']) {
                            this.#brown_in_house.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 96, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 8, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#game.zone.add({
                                x: x + 96 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#items.draw_visible_items(ctx, room, 'brown_house');
                            if (room == 43) {
                                this.#bed.draw(ctx, 160, 104);
                                this.#game.zone.add({
                                    x: 160, y: 104, w: 40, h: 16, t: 'bed'
                                })
                            }
                        } else {
                            this.#brown_out_house.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 48, y: y + 24, w: 16, h: 40, t: 'brown_house_door'
                        });
                        break;
                    case 'green_house':
                        if (this.#opened['green_house_door']) {
                            this.#green_in_house.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 96, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 8, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#game.zone.add({
                                x: x + 96 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#items.draw_visible_items(ctx, room, 'green_house');
                            if (room == 39) {
                                this.#buddy.draw(ctx, 192 - 8, 200 - 64 - 16 - 40);
                                this.#game.zone.add({
                                    x: 192 - 8, y: 200 - 64 - 16 - 40, w: 8, h: 40, t: 'buddy'
                                })
                            }
                            if (room == 61) {
                                this.#bed.draw(ctx, 160, 104);
                                this.#game.zone.add({
                                    x: 160, y: 104, w: 40, h: 16, t: 'bed'
                                })
                            }
                        } else {
                            this.#green_out_house.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 48, y: y + 24, w: 16, h: 40, t: 'green_house_door'
                        });
                        break;
                    case 'green_hut':
                        if (this.#opened['green_hut_door']) {
                            this.#green_in_hut.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 56, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 0, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#game.zone.add({
                                x: x + 48 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#items.draw_visible_items(ctx, room, 'green_hut');
                        } else {
                            this.#green_out_hut.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 8, y: y + 24, w: 16, h: 40, t: 'green_hut_door'
                        });
                        break;
                    case 'purple_hut':
                        if (this.#opened['purple_hut_door']) {
                            this.#purple_in_hut.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 56, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 0, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#game.zone.add({
                                x: x + 48 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#items.draw_visible_items(ctx, room, 'purple_hut');
                        } else {
                            this.#purple_out_hut.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 8, y: y + 24, w: 16, h: 40, t: 'purple_hut_door'
                        });
                        break;
                    case 'brown_hut':
                        if (this.#opened['brown_hut_door']) {
                            this.#brown_in_hut.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 56, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 0, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#game.zone.add({
                                x: x + 48 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#items.draw_visible_items(ctx, room, 'brown_hut');
                        } else {
                            this.#brown_out_hut.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 8, y: y + 24, w: 16, h: 40, t: 'brown_hut_door'
                        });
                        break;
                    case 'small_brown1_house':
                        if (this.#opened['small_brown1_house_door']) {
                            this.#small_brown1_in_house.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 56, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 8, y: y + 24, w: 4, h: 40, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 56 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            });
                            this.#items.draw_visible_items(ctx, room, 'small_brown1_house');
                        } else {
                            this.#small_brown1_out_house.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 40, y: y + 24, w: 16, h: 40, t: 'small_brown1_house_door'
                        });
                        break;
                    case 'small_brown2_house':
                        if (this.#opened['small_brown2_house_door']) {
                            this.#small_brown2_in_house.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 56, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 8, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#game.zone.add({
                                x: x + 56 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            })
                            this.#items.draw_visible_items(ctx, room, 'small_brown2_house');
                        } else {
                            this.#small_brown2_out_house.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 40, y: y + 24, w: 16, h: 40, t: 'small_brown2_house_door'
                        });
                        break;
                    case 'small_purple_house':
                        if (this.#opened['small_purple_house_door']) {
                            this.#small_purple_in_house.draw(ctx, x, y);
                            this.#game.zone.add({
                                x: x + 8, y: y + 16, w: 56, h: 8, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 8, y: y + 24, w: 4, h: 40, t: 'wall'
                            });
                            this.#game.zone.add({
                                x: x + 56 + 4, y: y + 24, w: 4, h: 40, t: 'wall'
                            });
                            if (room == 19) {
                                this.#ladder_head.draw(ctx, 48, 72 + 8 + 1);
                                this.#game.zone.add({
                                    x: 48, y: 72 + 8, w: 16, h: 128, t: 'ladder'
                                });
                            }
                            this.#items.draw_visible_items(ctx, room, 'small_purple_house');
                        } else {
                            this.#small_purple_out_house.draw(ctx, x, y);
                        }
                        this.#game.zone.add({
                            x: x + 40, y: y + 24, w: 16, h: 40, t: 'small_purple_house_door'
                        });
                        break;
                    case 'cave_left':
                        this.#cave_left.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 16, h: 200 - 64, t: 'wall'
                        });
                        break;
                    case 'cave_right':
                        this.#cave_right.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x + 8, y: y, w: 16, h: 200 - 64, t: 'wall'
                        });
                        break;
                    case 'cave_top':
                        this.#cave_top.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 320, h: 16, t: 'wall'
                        });
                        break;
                    case 'cave':
                        this.#cave.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 16, h: 16, t: 'cave'
                        });
                        break;
                    case 'torch':
                        if (this.#first_draw) {
                            this.#torch_0.draw(ctx, x, y);
                            this.#animations.push({
                                x: x, y: y, anim_timer: 0, anim_frame: 0, name: 'torch'
                            });
                        }
                        break;
                    case 'ladder':
                        this.#ladder.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y - 48, w: 16, h: 120 + 48, t: 'ladder'
                        });
                        break;
                    case 'ladder_head':
                        this.#ladder_head.draw(ctx, x, y + 1);
                        this.#game.zone.add({
                            x: x, y: y, w: 16, h: 120, t: 'ladder'
                        });
                        break;
                    case 'tree': this.#tree.draw(ctx, x, y); break;
                    case 'alga_flower':
                        this.#flower.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 8, h: 40, t: 'flower'
                        });
                        break;
                    case 'princess':
                        this.#princess.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 8, h: 48, t: 'princess'
                        });
                        break;
                    case 'debris':
                        this.#debris.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x + 0, y: y + 0, w: 32, h: 24, t: 'debris'
                        });
                        break;
                    case 'bush':
                        this.#bush.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x + 0, y: y + 0, w: 32, h: 24, t: 'bush'
                        });
                        break;
                    case 'waterfront_left':
                        this.#waterfront_left.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 12, h: 16, t: 'waterfront'
                        });
                        break;
                    case 'waterfront_right':
                        this.#waterfront_right.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x + 4, y: y, w: 16, h: 16, t: 'waterfront'
                        });
                        break;
                    case 'ground':
                        this.#game.zone.add({
                            x: x, y: y, w: 16, h: 16, t: 'ground'
                        });
                        break;
                    case 'lava':
                        this.#lava.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 16, h: 16, t: 'lava'
                        });
                        break;
                    case 'rock':
                        this.#rock.draw(ctx, x, y);
                        this.#game.zone.add({
                            x: x, y: y, w: 16, h: 16, t: 'rock'
                        });
                        break;
                }
                this.#items.draw_visible_items(ctx, room, 'none');
            }
        }
        // floor zones
        for (var i = 0; i < 20; ++i) {
            this.#game.zone.add({
                x: i * 16, y: (200 - 64 - 16), w: 16, h: 16, t: Rooms[room].floor
            });
        }
        // border rooms
        if (room >= 0 && room <= 11) {
            this.#game.zone.add({
                x: 0, y: -16, w: 320, h: 8, t: 'wall'
            });
        }
        if ((room % 12) == 0) {
            this.#game.zone.add({
                x: -8, y: 0, w: 8, h: 200 - 64, t: 'wall'
            });
        } else if (((room - 11) % 12) == 0) {
            this.#game.zone.add({
                x: 320, y: 0, w: 8, h: 200 - 64, t: 'wall'
            });
        }

        this.#first_draw = false;
    }
}