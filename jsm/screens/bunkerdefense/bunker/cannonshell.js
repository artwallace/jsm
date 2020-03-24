import { actor2dbase } from '../../../engine/actor2dbase.js';
import { cannonexplosion } from './cannonexplosion.js';

export class cannonshell extends actor2dbase {
    startAngle = 0;
    endAngle = Math.PI * 2;
    width = 4;
    height = 4;
    radius = 4;
    color = 'black';

    startX = 0;
    startY = 0;
    detonateX = 0;
    detonateY = 0;

    constructor(game, startX, startY, startHeading, detonateX, detonateY) {
        super(game, startX, startY, startHeading);

        this.startX = startX;
        this.startY = startY;
        this.detonateX = detonateX;
        this.detonateY = detonateY;
    }

    update(delta) {
        super.update(delta);

        let haveReachedDestination = this.actionFlyStraightToPoint(delta, this.startX, this.startY, this.detonateX, this.detonateY);
        let detonate = false;

        if (haveReachedDestination) {
            this.readyForDeletion = true;
            detonate = true;
        }
        else if ((this.x + (this.width / 2) < 0) ||
            (this.x + (this.width / 2) > this.game.level.levelWidth) ||
            (this.y + (this.height / 2) < 0) ||
            (this.y - (this.height / 2) > this.game.level.levelHeight)
        ) {
            this.readyForDeletion = true;
        }

        if (detonate) {
            let explosion = new cannonexplosion(this.game, this.detonateX, this.detonateY, 0);
            this.game.level.addActor(explosion);
        }
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fill();
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.game.debugInfoLevel >= 2) {
            this.game.view.ctx.beginPath();
            this.game.view.ctx.arc(this.detonateX, this.detonateY, 3, this.startAngle, this.endAngle);
            this.game.view.ctx.closePath();
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.fill();
        }

        if (this.game.debugInfoLevel >= this.game.debugInfoMaxLevel) {
            this.game.view.ctx.font = '10px Arial';
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.textBaseline = 'alphabetic';
            this.game.view.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
        }
    }
}