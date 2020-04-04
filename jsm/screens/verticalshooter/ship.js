import { imageactor2dbase } from '../../engine/imageactor2dbase.js';

export class ship extends imageactor2dbase {
    constructor(game, x, y) {
        super(game, x, y, 0);

        this.imagePath = './screens/verticalshooter/Ship256.png';

        this.width = 128;
        this.height = 128;
        this.updateDimensions();
    }

    update(delta) {
        super.update(delta);

        // if (this.x < -this.width ||
        //     this.x > this.world.worldWidth + this.width ||
        //     this.y < -this.height ||
        //     this.y > this.world.worldHeight + this.height) {
        //     this.readyForDeletion = true;
        //     return;
        // }
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        // if (this.world.debugInfoLevel >= 2) {
        //     this.world.ctx.fillStyle = 'rgba(0, 180, 0, 0.25)';
        //     this.world.ctx.fillRect(this.absOffsetX, this.absOffsetY, this.width, this.height);
        // }

        // if (this.world.debugInfoLevel >= this.world.debugInfoMaxLevel) {
        //     this.world.ctx.font = '10px Arial';
        //     this.world.ctx.fillStyle = 'red';
        //     this.world.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
        // }
    }
}