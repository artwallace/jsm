import { gunpanelbase, panelPosition } from './gunpanelbase.js';

export class aagunpanel extends gunpanelbase {
    title = 'AA Gun';

    constructor(game) {
        super(game, panelPosition.MIDDLE);
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted) {
            this.game.level.switchToAagun();
        }
    }
}