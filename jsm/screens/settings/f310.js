import { actor2dbase } from '../../engine/actor2dbase.js';

export class f310 extends actor2dbase {
    imagePath = './screens/settings/f310.png';
    loaded = false;

    constructor(game) {
        super(game, 0, 0, 0);

        this.img = new Image();
        this.img.crossOrigin = 'anonymous';
        this.img.onload = this.onloaded.bind(this);
        this.img.src = this.imagePath;

        this.width = 755 / 2;
        this.height = 556 / 2;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.layer = this.game.level.defaultLayer - 2;
    }

    update(delta) {
        super.update(delta);

        this.x = this.game.level.levelWidth / 2;
        this.y = this.game.level.levelHeight / 4 + this.halfWidth;

        this.absOffsetX = this.x - this.halfWidth;
        this.absOffsetY = this.y - this.halfHeight;
    }

    draw(interp) {
        super.draw(interp);

        if (this.img === null ||
            !this.loaded) {
            return;
        }

        this.game.view.ctx.drawImage(this.img, this.absOffsetX, this.absOffsetY, this.width, this.height);
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