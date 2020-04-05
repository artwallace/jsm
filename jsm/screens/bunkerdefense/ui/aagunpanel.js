import { gunpanelbase, panelPosition } from './gunpanelbase.js';
import { aagun } from './../bunker/aagun.js'

export class aagunpanel extends gunpanelbase {
    title = 'AA Gun';
    key = 'x';
    keyCapitalized = 'X';

    constructor(game) {
        super(game, panelPosition.MIDDLE);

        this.upgradeL1Label = 'Guns';
        this.upgradeL1Level = 1;
        this.upgradeL1MaxLevel = 4;

        this.upgradeL2Label = 'Reload';
        this.upgradeL2Level = 1;
        this.upgradeL2MaxLevel = 3;

        this.upgradeR1Label = 'Ammo';
        this.upgradeR1Level = 1;
        this.upgradeR1MaxLevel = 4;

        this.upgradeR2Label = 'Damage';
        this.upgradeR2Level = 1;
        this.upgradeR2MaxLevel = 5;
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
            (this.game.keyboardDownEvent.key === this.key ||
                this.game.keyboardDownEvent.key === this.keyCapitalized) &&
            !(this.game.level.bunkergun instanceof aagun)) {
            this.game.level.switchToAagun();
        }
    }
}