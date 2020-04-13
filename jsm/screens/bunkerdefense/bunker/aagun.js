import { gunbase } from './gunbase.js';
import { aagunbullet } from './aagunbullet.js';
import { getPointFromAngle } from '../../../engine/utilities.js';

export class aagun extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.
    startAngle = 0;
    endAngle = Math.PI * 2;

    #barrelCount = 2;
    #maxBarrelCount = 4;

    #barrel1baseX = 0;
    #barrel1baseY = 0;
    #barrel2baseX = 0;
    #barrel2baseY = 0;
    #barrel3baseX = 0;
    #barrel3baseY = 0;
    #barrel4baseX = 0;
    #barrel4baseY = 0;

    #muzzle1X = 0;
    #muzzle1Y = 0;
    #muzzle2X = 0;
    #muzzle2Y = 0;
    #muzzle3X = 0;
    #muzzle3Y = 0;
    #muzzle4X = 0;
    #muzzle4Y = 0;

    #barrelbaseOffsetX = 6;

    #testX = 0;
    #testY = 0;

    constructor(game) {
        super(game, 0, 0, 0);

        this.minAngleInDegrees = 0;
        this.minTimeBetweenShots = 50;//millisecs
        this.magazineSize = 80;
        this.ammoInMagazine = this.magazineSize;
        this.magazineReloadTime = 1500;//millisecs

        this.minFiringDist = 50;

        this.thickness = 3;
    }
    
    // initialize() {
    // }

    update(delta) {
        super.update(delta);

        let baseY = this.game.level.bunker.y - this.game.level.bunker.radius + this.portOffset;

        this.#barrel1baseX = this.game.level.bunker.x - this.#barrelbaseOffsetX / 2;
        this.#barrel1baseY = baseY;

        this.#barrel2baseX = this.game.level.bunker.x + this.#barrelbaseOffsetX / 2;
        this.#barrel2baseY = baseY;

        this.#barrel3baseX = this.game.level.bunker.x - this.#barrelbaseOffsetX * 2;
        this.#barrel3baseY = baseY;

        this.#barrel4baseX = this.game.level.bunker.x + this.#barrelbaseOffsetX * 2;
        this.#barrel4baseY = baseY;

        this.#muzzle1X = this.#barrel1baseX + this.barrelLength * Math.cos(this.angle);
        this.#muzzle1Y = this.#barrel1baseY + this.barrelLength * Math.sin(this.angle);

        this.#muzzle2X = this.#barrel2baseX + this.barrelLength * Math.cos(this.angle);
        this.#muzzle2Y = this.#barrel2baseY + this.barrelLength * Math.sin(this.angle);

        this.#muzzle3X = this.#barrel3baseX + this.barrelLength * Math.cos(this.angle);
        this.#muzzle3Y = this.#barrel3baseY + this.barrelLength * Math.sin(this.angle);

        this.#muzzle4X = this.#barrel4baseX + this.barrelLength * Math.cos(this.angle);
        this.#muzzle4Y = this.#barrel4baseY + this.barrelLength * Math.sin(this.angle);

        let { x: tX, y: tY } = getPointFromAngle(this.game.level.bunker.x, this.game.level.bunker.y, this.angle, this.game.level.bunker.radius + 5);
        
        this.#testX = tX;
        this.#testY = tY;
    }

    draw() {
        //super.draw();

        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = 'black';

        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.#barrel1baseX, this.#barrel1baseY);
        this.game.view.ctx.lineTo(this.#muzzle1X, this.#muzzle1Y);
        this.game.view.ctx.moveTo(this.#barrel2baseX, this.#barrel2baseY);
        this.game.view.ctx.lineTo(this.#muzzle2X, this.#muzzle2Y);
        this.game.view.ctx.moveTo(this.#barrel3baseX, this.#barrel3baseY);
        this.game.view.ctx.lineTo(this.#muzzle3X, this.#muzzle3Y);
        this.game.view.ctx.moveTo(this.#barrel4baseX, this.#barrel4baseY);
        this.game.view.ctx.lineTo(this.#muzzle4X, this.#muzzle4Y);
        this.game.view.ctx.closePath();
        this.game.view.ctx.stroke();
    }

    drawdebug() {
        super.drawdebug();

        if (this.game.debugInfoLevel >= 2) {
            this.game.view.ctx.beginPath();
            this.game.view.ctx.arc(this.#testX, this.#testY, 3, this.startAngle, this.endAngle);
            this.game.view.ctx.closePath();
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.fill();
        }
    }

    spawnBullet() {
        let b = new aagunbullet(this.game, this.muzzleX, this.muzzleY, this.angle);
        this.game.level.addActor(b);
    }
}