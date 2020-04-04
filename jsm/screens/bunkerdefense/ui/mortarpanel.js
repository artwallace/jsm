import { gunpanelbase, panelPosition } from './gunpanelbase.js';
import { mortar } from './../bunker/mortar.js'

export class mortarpanel extends gunpanelbase {
    title = 'Mortar';
    key = 'z';
    keyCapitalized = 'Z';

    constructor(game) {
        super(game, panelPosition.LEFT);
    }

    update(delta) {
        super.update(delta);

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted &&
            !(this.game.level.bunkergun instanceof mortar)) {
            this.game.level.switchToMortar();
        }
        else if (this.game.keyboardDown &&
            (this.game.keyboardDownEvent.key === this.key ||
                this.game.keyboardDownEvent.key === this.keyCapitalized) &&
            !(this.game.level.bunkergun instanceof mortar)) {
            this.game.level.switchToMortar();
        }
    }
}