import { view2dbase } from './view2dbase.js';
import { clamp } from './utilities.js';

export class view2dscaledtofitheight extends view2dbase {
    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.markViewSizeAsNeedingUpdate();
    }

    calcLevelPlacementInView() {
    }
}
