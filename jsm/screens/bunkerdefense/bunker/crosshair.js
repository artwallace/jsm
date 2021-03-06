import { actor2dbase } from '../../../engine/actor2dbase.js';
import { clamp } from '../../../engine/utilities.js';

export class crosshair extends actor2dbase {
    #radius = 30;
    #startAngle = 0;
    #endAngle = 2 * Math.PI;

    #ammoRadius = this.#radius + 5;
    #ammoHalfCircumference = this.#ammoRadius * Math.PI;
    #ammoStartAngle = 0;
    #ammoEndAngle = Math.PI;

    #ammoDisplay = [];

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

        this.updateAmmo();
    }

    updateAmmo() {
        this.#ammoDisplay = [];

        if (this.game.level.bunkergun.ammoInMagazine < 1) {
            return;
        }

        let maxAmmoLength = this.#ammoHalfCircumference / this.game.level.bunkergun.magazineSize;
        let spacerLength = clamp(maxAmmoLength * .1, 0, 3);
        let spacerTotalLength = spacerLength * (this.game.level.bunkergun.magazineSize - 1);
        let ammoTotalLength = this.#ammoHalfCircumference - spacerTotalLength;
        let ammoLength = ammoTotalLength / this.game.level.bunkergun.magazineSize;
        let emptyAmmoCount = this.game.level.bunkergun.magazineSize - this.game.level.bunkergun.ammoInMagazine;

        for (let index = 1; index <= this.game.level.bunkergun.ammoInMagazine - 1; index++) {
            this.#ammoDisplay.push(ammoLength, spacerLength);
        }
        this.#ammoDisplay.push(ammoLength, 0);

        if (emptyAmmoCount > 0) {
            this.#ammoDisplay.push(0, (ammoLength + spacerLength) * (emptyAmmoCount + 1));
        }
    }

    draw() {
        super.draw();

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

        //ammo counter
        if (this.#ammoDisplay.length > 0) {
            this.game.view.ctx.beginPath();
            this.game.view.ctx.arc(this.x, this.y, this.#ammoRadius, this.#ammoStartAngle, this.#ammoEndAngle);
            this.game.view.ctx.moveTo(this.x, this.y);
            this.game.view.ctx.closePath();
            this.game.view.ctx.setLineDash(this.#ammoDisplay);
            this.game.view.ctx.stroke();
            this.game.view.ctx.setLineDash([]);
        }
    }
}