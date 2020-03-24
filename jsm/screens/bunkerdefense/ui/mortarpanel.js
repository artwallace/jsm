import { gunpanelbase, panelPosition } from './gunpanelbase.js';

export class mortarpanel extends gunpanelbase {
    title = 'Mortar';

    constructor(game) {
        super(game, panelPosition.RIGHT);
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted) {
            this.game.level.switchToMortar();
        }
    }
}