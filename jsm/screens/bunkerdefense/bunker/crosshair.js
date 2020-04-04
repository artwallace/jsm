import { actor2dbase } from '../../../engine/actor2dbase.js';
import { clamp } from '../../../engine/utilities.js';

export class crosshair extends actor2dbase {
    #radius = 30;
    #startAngle = 0;
    #endAngle = 2 * Math.PI;

    #thickness = 3;
    #color = '#444444';
    #colorBadAim = '#44444444';

    #halfLength = 20;
    #spaceFromCenter = 10;

    #topStart = 0;
    #topEnd = 0;
    #bottomStart = 0;
    #bottomEnd = 0;

    #leftStart = 0;
    #leftEnd = 0;
    #rightStart = 0;
    #rightEnd = 0;

    #aimAllowsFiring = false;

    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.maxLayer - 3;
    }

    update(delta) {
        super.update(delta);

        this.x = clamp(this.game.level.mouseX, this.game.level.levelLeft, this.game.level.levelRight);
        this.y = clamp(this.game.level.mouseY, this.game.level.levelTop, this.game.level.dashboard.top);

        this.height = (this.#halfLength + this.#spaceFromCenter) * 2;
        this.width = (this.#halfLength + this.#spaceFromCenter) * 2;

        this.#topStart = this.y - this.#halfLength - this.#spaceFromCenter;
        this.#topEnd = this.y - this.#spaceFromCenter;
        this.#bottomStart = this.y + this.#halfLength + this.#spaceFromCenter;
        this.#bottomEnd = this.y + this.#spaceFromCenter;

        this.#leftStart = this.x - this.#halfLength - this.#spaceFromCenter;
        this.#leftEnd = this.x - this.#spaceFromCenter;
        this.#rightStart = this.x + this.#halfLength + this.#spaceFromCenter;
        this.#rightEnd = this.x + this.#spaceFromCenter;

        this.left = this.#leftStart;
        this.top = this.#topStart;
        this.right = this.#rightStart;
        this.bottom = this.#bottomStart;

        if (this.game.level.bunkergun.isAimWithinFiringArc()) {
            this.#aimAllowsFiring = true;
        }
        else {
            this.#aimAllowsFiring = false;
        }
    }

    draw(interp) {
        super.draw(interp);
        
        this.game.view.ctx.lineWidth = this.#thickness;
        if (this.#aimAllowsFiring) {
            this.game.view.ctx.strokeStyle = this.#color;
        }
        else {
            this.game.view.ctx.strokeStyle = this.#colorBadAim;
        }

        this.game.view.ctx.beginPath();
        //top
        this.game.view.ctx.moveTo(this.x, this.#topStart);
        this.game.view.ctx.lineTo(this.x, this.#topEnd);
        //bottom
        this.game.view.ctx.moveTo(this.x, this.#bottomStart);
        this.game.view.ctx.lineTo(this.x, this.#bottomEnd);
        //left
        this.game.view.ctx.moveTo(this.#leftStart, this.y);
        this.game.view.ctx.lineTo(this.#leftEnd, this.y);
        //right
        this.game.view.ctx.moveTo(this.#rightStart, this.y);
        this.game.view.ctx.lineTo(this.#rightEnd, this.y);
        //circle
        this.game.view.ctx.arc(this.x, this.y, this.#radius, this.#startAngle, this.#endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.stroke();
    }
}