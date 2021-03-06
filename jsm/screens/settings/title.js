import { actor2dbase } from '../../engine/actor2dbase.js';

export class title extends actor2dbase {
    constructor(game) {
        super(game, 0, 0, 0);

        this.setDimenions();
    }

    update(delta) {
        super.update(delta);

        this.setDimenions();
    }

    setDimenions() {
        this.x = this.game.level.levelCenterX;
        this.y = this.game.level.levelHeight / 4;
    }

    draw() {
        super.draw();

        this.game.view.ctx.font = '48px Orbitron';
        this.game.view.ctx.fillStyle = 'green';
        this.game.view.ctx.textAlign = 'center';
        this.game.view.ctx.textBaseline = 'middle';
        this.game.view.ctx.fillText('Settings', this.x, this.y);
    }
}