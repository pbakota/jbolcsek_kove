"use strict";

class Game
{
    _engine; _renderer; _loader; _graphics; _input; _scene; _nextScene;
    _titleScene; _actionScene;
    _zone;

    constructor() {

        this._loader = new Loader();
        this._renderer = new Renderer();
        this._input = new Input();
        this._zone = new Zone();

        this._renderer.options(320, 200, 4);
        this._engine = new Engine(this, this._renderer, this._loader);
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
        })
    };

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
