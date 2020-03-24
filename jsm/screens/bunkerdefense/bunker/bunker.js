import { actor2dbase } from '../../../engine/actor2dbase.js';

export class bunker extends actor2dbase {
    startAngle = 1 * Math.PI;
    endAngle = 2 * Math.PI;

    border = 2;

    radius = 30;
    radiusUpgrade = 10;
    radiusMax = 100;

    fillColor = 'darkgray';
    outlineColor = '#444444';

    constructor(game) {
        super(game, 0, 0, 0);

        //TODO: Add an initializeandupdate method that runs in both circumstances?
        this.calcPosition();
    }

    update(delta) {
        super.update(delta);

        //TODO: determine if this is ever going to change.
        //this.calcPosition();
    }

    draw(interp) {
        super.draw(interp);
        
        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.border;
        this.game.view.ctx.fillStyle = this.fillColor;
        this.game.view.ctx.fill();
        this.game.view.ctx.strokeStyle = this.outlineColor;
        this.game.view.ctx.stroke();
    }

    upgrade() {
        //TODO: this is a joke. do something real.
        this.radius += this.radiusUpgrade;
        if (this.radius > this.radiusMax) {
            this.radius = this.radiusMax;
        }
    }

    calcPosition() {
        let borderPstnPadding = 0;
        if (this.border > 0) {
            borderPstnPadding = this.border / 2;
        }

        this.x = this.game.level.levelCenterX;
        this.y = this.game.level.groundlevel - borderPstnPadding;
    }
}