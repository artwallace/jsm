import { gunpanelbase, panelPosition } from './gunpanelbase.js';
import { cannon } from './../bunker/cannon.js'

export class cannonpanel extends gunpanelbase {
    title = 'Cannon';
    key = 'c';
    keyCapitalized = 'C';

    constructor(game) {
        super(game, panelPosition.RIGHT);
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted &&
            !(this.game.level.bunkergun instanceof cannon)) {
            this.game.level.switchToCannon();
        }
        else if (this.game.keyboardDown &&
            this.game.keyboardDownEvent.key === this.key &&
            !(this.game.level.bunkergun instanceof cannon)) {
            this.game.level.switchToCannon();
        }
    }
}