import { button2dbase } from '../../engine/button2dbase.js';

export class backbutton extends button2dbase {
    constructor(game) {
        super(game, 450, 75, 0, 0);

        this.normalColor = '#303030';
        this.hoverColor = '#404040';

        this.textFont = '48px Odibee Sans';
        this.text = 'back to main menu';
    }

    update(delta) {
        super.update(delta);

        this.x = this.game.level.levelCenterX;
        this.y = this.game.level.levelHeight / 4 + 100 * 4;

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted) {
            this.game.requestStop();
        }
    }
}