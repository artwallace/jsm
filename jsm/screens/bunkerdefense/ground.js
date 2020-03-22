import { actor2dbase } from '../../engine/actor2dbase.js';
import { dashboard } from './dashboard.js';

//TODO: Better to just hardcode dashboard height into this height to reduce dependencies? Make height 125?
export class ground extends actor2dbase {
    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.minLayer;

        // draw ground over sky, draw underneath dashboard so there is no visible seam.
        this.width = this.game.level.levelWidth;
        this.height = 25;

        this.x = 0;
        this.y = this.game.level.levelHeight - this.height - dashboard.getHeight();

        this.color = '#EDC9AF';
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}