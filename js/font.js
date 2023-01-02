"use strict";

class Font
{
    _game; _graphics; _font = {};
    constructor(game) {
        this._game = game;
        this._graphics = this._game.graphics;

        this._font[' '] = new Sprite(this._graphics, 144 + 0 * 8, 496, 8, 8);
        this._font['A'] = new Sprite(this._graphics, 144 + 1 * 8, 496, 8, 8);
        this._font['B'] = new Sprite(this._graphics, 144 + 2 * 8, 496, 8, 8);
        this._font['C'] = new Sprite(this._graphics, 144 + 3 * 8, 496, 8, 8);
        this._font['D'] = new Sprite(this._graphics, 144 + 4 * 8, 496, 8, 8);
        this._font['E'] = new Sprite(this._graphics, 144 + 5 * 8, 496, 8, 8);
        this._font['F'] = new Sprite(this._graphics, 144 + 6 * 8, 496, 8, 8);
        this._font['G'] = new Sprite(this._graphics, 144 + 7 * 8, 496, 8, 8);
        this._font['H'] = new Sprite(this._graphics, 144 + 8 * 8, 496, 8, 8);
        this._font['I'] = new Sprite(this._graphics, 144 + 9 * 8, 496, 8, 8);
        this._font['J'] = new Sprite(this._graphics, 144 + 10 * 8, 496, 8, 8);
        this._font['K'] = new Sprite(this._graphics, 144 + 11 * 8, 496, 8, 8);
        this._font['L'] = new Sprite(this._graphics, 144 + 12 * 8, 496, 8, 8);
        this._font['M'] = new Sprite(this._graphics, 144 + 13 * 8, 496, 8, 8);
        this._font['N'] = new Sprite(this._graphics, 144 + 14 * 8, 496, 8, 8);
        this._font['O'] = new Sprite(this._graphics, 144 + 15 * 8, 496, 8, 8);
        this._font['P'] = new Sprite(this._graphics, 144 + 16 * 8, 496, 8, 8);
        this._font['Q'] = new Sprite(this._graphics, 144 + 17 * 8, 496, 8, 8);
        this._font['R'] = new Sprite(this._graphics, 144 + 18 * 8, 496, 8, 8);
        this._font['S'] = new Sprite(this._graphics, 144 + 19 * 8, 496, 8, 8);
        this._font['T'] = new Sprite(this._graphics, 144 + 20 * 8, 496, 8, 8);
        this._font['U'] = new Sprite(this._graphics, 144 + 21 * 8, 496, 8, 8);
        this._font['V'] = new Sprite(this._graphics, 144 + 22 * 8, 496, 8, 8);
        this._font['W'] = new Sprite(this._graphics, 144 + 23 * 8, 496, 8, 8);
        this._font['X'] = new Sprite(this._graphics, 144 + 24 * 8, 496, 8, 8);
        this._font['Y'] = new Sprite(this._graphics, 144 + 25 * 8, 496, 8, 8);
        this._font['Z'] = new Sprite(this._graphics, 144 + 26 * 8, 496, 8, 8);
        this._font[':'] = new Sprite(this._graphics, 144 + 27 * 8, 496, 8, 8);
        this._font['0'] = new Sprite(this._graphics, 144 + 28 * 8, 496, 8, 8);
        this._font['1'] = new Sprite(this._graphics, 144 + 29 * 8, 496, 8, 8);
        this._font['2'] = new Sprite(this._graphics, 144 + 30 * 8, 496, 8, 8);
        this._font['3'] = new Sprite(this._graphics, 144 + 31 * 8, 496, 8, 8);
        this._font['4'] = new Sprite(this._graphics, 144 + 32 * 8, 496, 8, 8);
        this._font['5'] = new Sprite(this._graphics, 144 + 33 * 8, 496, 8, 8);
        this._font['6'] = new Sprite(this._graphics, 144 + 34 * 8, 496, 8, 8);
        this._font['7'] = new Sprite(this._graphics, 144 + 35 * 8, 496, 8, 8);
        this._font['8'] = new Sprite(this._graphics, 144 + 36 * 8, 496, 8, 8);
        this._font['9'] = new Sprite(this._graphics, 144 + 37 * 8, 496, 8, 8);
        this._font['^'] = new Sprite(this._graphics, 144 + 38 * 8, 496, 8, 8);
        this._font['>'] = new Sprite(this._graphics, 144 + 39 * 8, 496, 8, 8);
        this._font['/'] = new Sprite(this._graphics, 144 + 40 * 8, 496, 8, 8);
    }

    print = (ctx, x, y, txt) => {
        txt = txt.toUpperCase();
        for (var i = 0; i < txt.length; ++i) {
            var c = txt.charAt(i);
            if (this._font[c]) {
                this._font[c].draw(ctx, x + i * 8, y);
            } else {
                console.log(`undefined ${c}`);
            }
        }
    }
}