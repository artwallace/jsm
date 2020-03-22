import { actor2dbase } from '../../engine/actor2dbase.js';
import { getRandomIntFromRange, getRandomFromRange, getRandomFromArray } from '../../engine/utilities.js';

export class mountain extends actor2dbase {
    //TODO: make color lighter for mountains that are on top.
    color = '';

    colors = ['#888888', '#909090', '#989898', '#A0A0A0', '#A8A8A8', '#A9A9A9'];

    constructor(game) {
        super(game, 0, 0, 0);

        this.layer = this.game.level.defaultLayer - 5;

        let worldMinL = 100;
        let worldMaxR = this.game.level.levelWidth - 100;

        this.x = getRandomIntFromRange(worldMinL, worldMaxR);
        this.y = this.game.level.groundlevel;

        let widthMulti = getRandomFromRange(1.5, 2.5);
        this.height = getRandomIntFromRange(100, 400);
        this.width = this.height * widthMulti;

        this.color = getRandomFromArray(this.colors);
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.x, this.y - this.height);
        this.game.view.ctx.lineTo(this.x + this.width / 2, this.y);
        this.game.view.ctx.lineTo(this.x - this.width / 2, this.y);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fill();
    }
}