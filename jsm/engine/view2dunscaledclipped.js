import { view2dbase } from './view2dbase.js';

export class view2dunscaledclipped extends view2dbase {
    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.markViewSizeAsNeedingUpdate();
    }

    calcLevelPlacementInView() {
        this.scale = 1;
        this.scaleWidth = 1;
        this.scaleHeight = 1;

        this.viewWidthInLevelCoordinates = this.viewWidth;
        this.viewHeightInLevelCoordinates = this.viewHeight;

        this.levelOriginInViewX = 0;
        this.levelOriginInViewY = 0;

        this.pillarBoxWidth = 0;
        this.letterBoxHeight = 0;
    }

    mouseMoveHandler(e) {
        super.mouseMoveHandler(e);

        this.mouseInWorldX = this.mouseX;
        this.mouseInWorldY = this.mouseY;
    }
}