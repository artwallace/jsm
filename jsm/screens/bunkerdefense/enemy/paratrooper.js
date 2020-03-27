import { actor2dbase } from '../../../engine/actor2dbase.js';
import { checkIfRectOverlapsRect } from '../../../engine/utilities.js';

export class paratrooper extends actor2dbase {
    //TODO: Replace placeholder graphics with real ones.
    startAngle = 0;
    endAngle = Math.PI * 2;

    color = 'green';

    radius = 10;

    constructor(game) {
        super(game, 0, 0, 0);

        this.width = this.radius * 2;
        this.height = this.radius * 2;

        this.heading = Math.PI * .5
    }

    update(delta) {
        super.update(delta);

        this.actionFlyStraightAlongHeading(delta);

        this.left = this.x - this.radius;
        this.top = this.y - this.radius;
        this.right = this.left + this.radius;
        this.bottom = this.top + this.radius;

        let hitTheGround = false;

        if (this.left >= 0 &&
            this.right <= this.game.level.levelWidth &&
            this.bottom >= this.game.level.groundlevel) {
            hitTheGround = true;
        }

        if (hitTheGround ||
            !checkIfRectOverlapsRect(this.left, this.top, this.right, this.bottom, this.game.level.levelLeft, this.game.level.levelTop, this.game.level.levelRight, this.game.level.groundlevel)) {
            this.readyForDeletion = true;
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
}