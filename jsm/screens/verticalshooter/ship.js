import { actor2dbase } from '../../engine/actor2dbase.js';

export class ship extends actor2dbase {
    imagePath = './screens/verticalshooter/Ship256.png';
    loaded = false;

    constructor(game, world, x, y) {
        super(game, world, x, y, 0);

        this.img = new Image();
        this.img.crossOrigin = 'anonymous';
        this.img.onload = this.onloaded.bind(this);
        this.img.src = this.imagePath;

        this.width = 128;
        this.height = 128;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
    }

    update(delta) {
        super.update(delta);

        if (this.x < -this.width ||
            this.x > this.world.worldWidth + this.width ||
            this.y < -this.height ||
            this.y > this.world.worldHeight + this.height) {
            this.readyForDeletion = true;
            return;
        }

        this.absOffsetX = this.x - this.halfWidth;
        this.absOffsetY = this.y - this.halfHeight;
    }

    draw(interp) {
        super.draw(interp);

        if (this.img === null ||
            !this.loaded) {
            return;
        }

        this.world.ctx.drawImage(this.img, this.absOffsetX, this.absOffsetY, this.width, this.height);
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.world.debugInfoLevel >= 2) {
            this.world.ctx.fillStyle = 'rgba(0, 180, 0, 0.25)';
            this.world.ctx.fillRect(this.absOffsetX, this.absOffsetY, this.width, this.height);
        }

        if (this.world.debugInfoLevel >= this.world.debugInfoMaxLevel) {
            this.world.ctx.font = '10px Arial';
            this.world.ctx.fillStyle = 'red';
            this.world.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
        }
    }

    dispose() {
        this.img = null;
        this.loaded = false;
        super.dispose();
    }

    onloaded() {
        this.loaded = true;
        this.img.onload = null;
    }
}