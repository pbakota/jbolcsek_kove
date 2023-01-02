"use strict";

class Scene {
    _game;
    constructor(game) {
        this._game = game;

        Object.defineProperty(this, 'game', {
            get: () => {
                return this._game;
            }
        });
    }

    // virtual methods
    init = () => { };
    teardown = () => { };
    update = (dt) => { };
    draw = (ctx) => { };
}