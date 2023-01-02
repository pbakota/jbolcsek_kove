"use strict";

class TitleScene extends Scene
{
    _graphics; _title; _input;
    constructor(game) {
        super(game);

        this._graphics = this.game.graphics;
        this._input = this.game.input;
        this._title = new Sprite(this._graphics, 144, 208, 320, 200);
    }

    init = () => { };

    teardown = () => { };

    update = (dt) => {
        if (this._input.isPressed(Input.KEY_RETURN)) {
            this.game.setNextScene(Game.GAME_SCENE);
        }
    };

    draw = (ctx) => {
        this._title.draw(ctx, 0, 0);
    };
}