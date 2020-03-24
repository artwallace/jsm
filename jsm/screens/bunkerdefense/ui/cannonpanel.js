import { gunpanelbase, panelPosition } from './gunpanelbase.js';

export class cannonpanel extends gunpanelbase {
    title = 'Cannon';

    constructor(game) {
        super(game, panelPosition.LEFT);
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted) {
            this.game.level.switchToCannon();
        }
    }
}