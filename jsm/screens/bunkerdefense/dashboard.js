import { actor2dbase } from '../../engine/actor2dbase.js';

export class dashboard extends actor2dbase {
    color = 'gray';
    status = '';

    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.maxLayer - 2;

        // This is a fixed world, so it will not move.
        this.height = 100;
        this.width = this.game.level.levelWidth;

        this.left = 0;
        this.top = this.game.level.levelHeight - this.height;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;

        this.x = this.left + (this.width / 2);
        this.y = this.top + (this.height / 2);
    }

    update(delta) {
        super.update(delta);

        //this.status = this.game.bunkergun.status();
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fillRect(this.left, this.top, this.width, this.height);

        // TODO: Move to another actor?
        // Quick-n-dirty gun status.
        this.game.view.ctx.font = '20px Arial';
        this.game.view.ctx.fillStyle = 'black';
        this.game.view.ctx.textBaseline = 'top';
        //this.game.view.ctx.textAlign = 'center';
        this.game.view.ctx.fillText(this.status, this.x + 5, this.y + 5);
    }

    static getHeight() {
        return 100;
    }
}