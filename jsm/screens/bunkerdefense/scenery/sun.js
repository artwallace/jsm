import { actor2dbase } from '../../../engine/actor2dbase.js';
import { getRandomIntFromRange } from '../../../engine/utilities.js';

export class sun extends actor2dbase {
    //TODO: add sunlight rays that slowly rotate.
    //TODO: vary the color.
    startAngle = 0;
    endAngle = Math.PI * 2;

    color = '#f9d71c';

    radius = 0;

    constructor(game) {
        super(game, 0, 0, 0);

        this.layer = this.game.level.defaultLayer - 4;

        let worldMinL = 100;
        let worldMaxR = this.game.level.levelWidth - 100;
        let worldMinT = 25;
        let worldMaxB = 200;

        this.x = getRandomIntFromRange(worldMinL, worldMaxR);
        this.y = getRandomIntFromRange(worldMinT, worldMaxB);

        let minRadius = 40;
        let maxRadius = 80;

        this.radius = getRandomIntFromRange(minRadius, maxRadius);
        this.width = this.radius * 2;
        this.height = this.radius * 2;
    }

    // update(delta) {
    //     super.update(delta);
    // }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fill();
    }
}