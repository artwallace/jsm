import { button2dbase } from '../../engine/button2dbase.js';

export class backbutton extends button2dbase {
    constructor(game) {
        super(game, 280, 50, 0, 0);

        this.layer = this.game.level.maxLayer - 1;

        this.normalColor = '#707070';
        this.hoverColor = '#696969';

        this.textFont = '30px Odibee Sans';
        this.text = 'back to main menu';

        // This is a fixed world, will not move.
        this.x = this.game.level.levelWidth - (this.width / 2) - 25;
        this.y = this.game.level.levelHeight - this.height;

        this.updatePosition();
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted) {
            this.game.requestStop();
        }
    }
}