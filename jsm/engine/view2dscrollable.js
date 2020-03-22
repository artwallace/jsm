import { view2dbase } from './view2dbase.js';
import { clamp } from './utilities.js';

export class view2dscrollable extends view2dbase {
    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.levelOriginInViewX = 0;
        this.levelOriginInViewY = 0;

        this.markViewSizeAsNeedingUpdate();
    }

    draw(interp) {
        super.draw(interp);
        //this.setTransformToLevel();
    }

    calcLevelPlacementInView() {
        //TODO: for now, assuming level is larger than view.

        this.scale = 1;
        this.scaleWidth = 1;
        this.scaleHeight = 1;

        this.viewWidthInLevelCoordinates = this.viewWidth;
        this.viewHeightInLevelCoordinates = this.viewHeight;

        // this.levelOriginInViewX = 0;
        // this.levelOriginInViewY = 0;

        this.pillarBoxWidth = 0;
        this.letterBoxHeight = 0;
    }

    mouseMoveHandler(e) {
        super.mouseMoveHandler(e);

        this.mouseInWorldX = this.mouseX;
        this.mouseInWorldY = this.mouseY;
    }
}