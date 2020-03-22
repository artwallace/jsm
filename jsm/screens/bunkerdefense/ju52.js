import { actor2dbase } from '../../engine/actor2dbase.js';

export class ju52 extends actor2dbase {
    imagePath = './screens/bunkerdefense/ju52-512.png';
    loaded = false;

    constructor(game) {
        super(game, 0, 0, 0);

        this.img = new Image();
        this.img.crossOrigin = 'anonymous';
        this.img.onload = this.onloaded.bind(this);
        this.img.src = this.imagePath;

        this.width = 512 / 5;
        this.height = 240 / 5;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
    }

    update(delta) {
        super.update(delta);

        this.actionFlyAcross(delta, -200);

        if (this.x < -this.halfWidth) {
            this.readyForDeletion = true;
            return;
        }

        this.absOffsetX = this.x - this.halfWidth;
        this.absOffsetY = this.y - this.halfHeight;
    }

    draw(interp) {
        super.draw(interp);

        if (this.img === undefined ||
            this.img === null ||
            !this.loaded) {
            return;
        }

        this.game.view.ctx.drawImage(this.img, this.absOffsetX, this.absOffsetY, this.width, this.height);
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.game.debugInfoLevel >= 2) {
            this.game.view.ctx.fillStyle = 'rgba(0, 180, 0, 0.25)';
            this.game.view.ctx.fillRect(this.absOffsetX, this.absOffsetY, this.width, this.height);
        }

        if (this.game.debugInfoLevel >= this.game.debugInfoMaxLevel) {
            this.game.view.ctx.font = '10px Arial';
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
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