import { actor2dbase } from '../../engine/actor2dbase.js';
import { getCenteredRectInRect } from '../../engine/utilities.js';

export class levelinfo extends actor2dbase {
    color = 'rgba(128, 128, 128, 0.25)';
    width = 250;
    height = 60;
    topPadding = 25;

    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.maxLayer - 4;

        this.calcPosition();
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fillRect(this.left, this.top, this.width, this.height);

        this.game.view.ctx.font = '32px Odibee Sans';
        this.game.view.ctx.fillStyle = 'black';
        this.game.view.ctx.textAlign = 'center';
        this.game.view.ctx.textBaseline = 'alphabetic';
        this.game.view.ctx.fillText(this.game.level.title, this.x, this.y);
    }

    calcPosition() {
        let { innerLeft, innerTop } = getCenteredRectInRect(this.width, this.height, 0, this.topPadding, this.game.level.levelWidth, this.topPadding + this.height)
        this.left = innerLeft;
        this.top = innerTop;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.x = this.left + (this.width / 2);
        this.y = this.top + (this.height / 2);
    }
}