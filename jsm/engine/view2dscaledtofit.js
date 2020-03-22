import { view2dbase } from './view2dbase.js';

export class view2dscaledtofit extends view2dbase {
    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.markViewSizeAsNeedingUpdate();
        this.updateViewSize();
    }

    calcLevelPlacementInView() {
        // if (!this.game.level.isInitialized) {
        //     return;
        // }

        if (this.viewWidth === undefined ||
            this.viewWidth === null ||
            Number.isNaN(this.viewWidth) ||
            this.viewHeight === undefined |
            this.viewHeight === null ||
            Number.isNaN(this.viewHeight) ||
            this.game.level.levelWidth === undefined ||
            this.game.level.levelWidth === null ||
            Number.isNaN(this.game.level.levelWidth) ||
            this.game.level.levelWidth <= 0 ||
            this.game.level.levelWidth === Infinity ||
            this.game.level.levelHeight === undefined |
            this.game.level.levelHeight === null ||
            Number.isNaN(this.game.level.levelHeight) ||
            this.game.level.levelHeight <= 0 ||
            this.game.level.levelHeight === Infinity) {
                throw ('Invalid state.');
        }

        this.scaleWidth = this.viewWidth / this.game.level.levelWidth;
        this.scaleHeight = this.viewHeight / this.game.level.levelHeight;

        if (this.scaleWidth < this.scaleHeight) {
            this.scale = this.scaleWidth;
        }
        else {
            this.scale = this.scaleHeight;
        }

        this.viewWidthInLevelCoordinates = this.viewWidth / this.scale;//was this.worldVisibleWidth
        this.viewHeightInLevelCoordinates = this.viewHeight / this.scale;//this.worldVisibleHeight

        this.pillarBoxWidth = (this.viewWidthInLevelCoordinates - this.game.level.levelWidth) / 2;
        this.letterBoxHeight = (this.viewHeightInLevelCoordinates - this.game.level.levelHeight) / 2;

        this.levelOriginInViewX = this.pillarBoxWidth * this.scale;//was worldOriginInCanvasX
        this.levelOriginInViewY = this.letterBoxHeight * this.scale;//was worldOriginInCanvasY
    }
}