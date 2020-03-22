import { gameitembase } from './gameitembase.js';

export class view2dbase extends gameitembase {
    //Canvas assumes origin is top left
    //TODO: Pass in the window and canvas objects from the shell?
    canvas;
    ctx;

    viewSizeNeedsUpdate = false;

    //TODO: eventually remove 'view' from these names.
    //TODO: keeping for now to prevent copy/paste errors while migrating from old system.
    viewWidth = 0;
    viewHeight = 0;
    viewLeft = 0; //Always
    viewTop = 0; //Always
    viewRight = 0; //viewLeft + viewWidth
    viewBottom = 0; //viewTop + viewHeight
    viewCenterX = 0;
    viewCenterY = 0;

    scale = 0;
    scaleWidth = 0;
    scaleHeight = 0;

    //Represents the amount of level coordinates that would fit in the view.
    viewWidthInLevelCoordinates = 0;
    viewHeightInLevelCoordinates = 0;

    //TODO: Should these be moved to level????
    levelOriginInViewX = 0;
    levelOriginInViewY = 0;

    pillarBoxWidth = 0;
    letterBoxHeight = 0;

    backdropColor = 'black';

    mouseX = 0;
    mouseY = 0;

    constructor(game) {
        super(game);
    }

    preinitialize() {
        super.preinitialize();
        this.assignGraphicsObjectsFromHtml();
        this.setViewSize(window.innerWidth, window.innerHeight);
        this.markViewSizeAsNeedingUpdate();
    }
    initialize() {
        super.initialize();
        this.updateViewSize();
    }

    dispose() {
        this.disposeGraphicsObjects();
        super.dispose();
    }

    start() {
        if (!this.isInitialized) {
            throw 'Attempt to start an uninitialized view.';
        }
    }

    stop() { }

    beginFrame() { }

    endFrame() { }

    update(delta) {
        if (this.game.mouseMove) {
            this.updateMouseCoordinates(event);
        }

        //TODO: this is just a quick-n-dirty means to get resizing going for now.
        if (!this.viewSizeNeedsUpdate &&
            (this.viewWidth != window.innerWidth ||
                this.viewHeight != window.innerHeight)) {
            this.markViewSizeAsNeedingUpdate();
        }

        this.updateViewSize();
    }

    draw(interp) {
        if (interp === undefined ||
            interp === null ||
            Number.isNaN(interp)) {
            throw ('Invalid interp.');
        }

        if (this.ctx === undefined ||
            this.ctx === null) {
            throw ('Draw encountered nulls.');
        }

        this.setTransformToView();
        this.ctx.fillStyle = this.backdropColor;
        this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
    }

    drawLevelClipping() {
        // Debug drawing is intended to happen after this,
        // and therefore can draw outside of the visible level,
        // on top of piller/letter boxes.
        if (this.ctx === undefined ||
            this.ctx === null) {
            throw ('Draw encountered nulls.');
        }

        this.setTransformToView();
        this.ctx.fillStyle = this.backdropColor;

        if (this.letterBoxHeight > 0) {
            this.ctx.fillRect(0, 0, this.viewWidth, this.letterBoxHeight * this.scale);
            this.ctx.fillRect(0, this.viewHeight - (this.letterBoxHeight * this.scale), this.viewWidth, this.letterBoxHeight);
        }

        if (this.pillarBoxWidth > 0) {
            this.ctx.fillRect(0, 0, this.pillarBoxWidth * this.scale, this.viewHeight);
            this.ctx.fillRect(this.viewWidth - (this.pillarBoxWidth * this.scale), 0, this.viewWidth, this.viewHeight);
        }

        //Clip to world bounds
        // let region = new Path2D();
        // region.rect(this.worldOriginInCanvasX, this.worldOriginInCanvasY, this.canvasWidth - this.worldOriginInCanvasX * 2, this.canvasHeight - this.worldOriginInCanvasY * 2);
        // this.ctx.clip(region);
    }

    updateDebugInfo() { }

    assignGraphicsObjectsFromHtml() {
        this.canvas = document.querySelector('canvas');
        if (this.canvas === null) {
            throw ('Unable to find canvas');
        }

        this.ctx = this.canvas.getContext('2d');
        if (this.ctx === null) {
            throw ('Unable to get context');
        }
    }

    disposeGraphicsObjects() {
        this.canvas = null;
        this.ctx = null;
    }

    //TODO: Move to shell?
    // modifyHtmlCanvasSize() {
    //     // ensure canvas object covers entire window.
    //     this.canvas.width = this.canvasWidth;
    //     this.canvas.height = this.canvasHeight;
    // }

    setViewSize(width, height) {
        this.viewWidth = width;
        this.viewHeight = height;

        this.canvas.width = width;
        this.canvas.height = height;

        this.viewLeft = 0; //Always
        this.viewTop = 0; //Always
        this.viewRight = this.viewLeft + this.viewWidth;
        this.viewBottom = this.viewTop + this.viewHeight;

        this.viewCenterX = this.viewLeft + (this.viewWidth / 2);
        this.viewCenterY = this.viewTop + (this.viewHeight / 2);

        //this.calcLevelPlacementInView();
        //this.viewSizeNeedsUpdate = false;
    }

    updateViewSize() {
        if (this.viewSizeNeedsUpdate) {
            this.setViewSize(window.innerWidth, window.innerHeight);
            this.calcLevelPlacementInView();
            this.viewSizeNeedsUpdate = false;
        }
    }

    markViewSizeAsNeedingUpdate() {
        this.viewSizeNeedsUpdate = true;
    }

    calcLevelPlacementInView() {
        throw ('Error: this method must be overridden in derived classes.');
    }

    setTransformToView() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    setTransformToLevel() {
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.levelOriginInViewX, this.levelOriginInViewY);
    }

    updateMouseCoordinates() {
        this.mouseX = this.game.mouseMoveEvent.clientX;
        this.mouseY = this.game.mouseMoveEvent.clientY;
    }
}