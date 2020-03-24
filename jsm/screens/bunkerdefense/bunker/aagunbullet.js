import { actor2dbase } from '../../../engine/actor2dbase.js';
// import { calcAngleInRadians, getPointFromAngle } from '../../engine/utilities.js';

export class aagunbullet extends actor2dbase {
    #startAngle = 0;
    #endAngle = Math.PI * 2;
    width = 1;
    height = 1;
    radius = 1;
    color = 'black';

    constructor(game, startX, startY, startHeading) {
        super(game, startX, startY, startHeading);
    }

    update(delta) {
        super.update(delta);

        this.actionFlyStraightAlongHeading(delta);

        //TODO: change to utility method.
        if ((this.x + (this.width / 2) < 0) ||
            (this.x + (this.width / 2) > this.game.level.levelWidth) ||
            (this.y + (this.height / 2) < 0) ||
            (this.y - (this.height / 2) > this.game.level.levelHeight)
        ) {
            this.readyForDeletion = true;
        }
    }

    draw(interp) {
        super.draw(interp);

        if (this.readyForDeletion) {
            return;
        }

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius, this.#startAngle, this.#endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fill();
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.game.debugInfoLevel >= this.game.debugInfoMaxLevel) {
            this.game.view.ctx.font = '10px Arial';
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.textBaseline = 'alphabetic';
            this.game.view.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
        }
    }
}