import { actor2dbase } from '../../../engine/actor2dbase.js';

export class background extends actor2dbase {
    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.minLayer;

        // draw sky over entire world
        this.x = 0;
        this.y = 0;
        this.width = this.game.level.levelWidth;
        this.height = this.game.level.levelHeight;

        this.color = '#87CEEB';
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}