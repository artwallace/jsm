import { gunpanelbase, panelPosition } from './gunpanelbase.js';
import { aagun } from './../bunker/aagun.js'

export class aagunpanel extends gunpanelbase {
    title = 'AA Gun';
    key = 'x';
    keyCapitalized = 'X';

    constructor(game) {
        super(game, panelPosition.MIDDLE);
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted &&
            !(this.game.level.bunkergun instanceof aagun)) {
            this.game.level.switchToAagun();
        }
        else if (this.game.keyboardDown &&
            this.game.keyboardDownEvent.key === this.key &&
            !(this.game.level.bunkergun instanceof aagun)) {
            this.game.level.switchToAagun();
        }
    }
}