import { gameitembase } from './gameitembase.js';

export class offscreencachedgameitem2dbase extends gameitembase {
    x = 0;
    y = 0;

    constructor(game, x, y) {
        super(game);

        if (x === undefined ||
            x === null ||
            Number.isNaN(x) ||
            y === undefined ||
            y === null ||
            Number.isNaN(y)) {
            throw ('Invalid coordinates');
        }

        this.x = x;
        this.y = y;
    }

    drawToOffscreenCtx(offscreenCtx) { }
}