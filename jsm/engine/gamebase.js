//import { loop } from './loop.js';
import { loop } from './loop2.js';
import { shellbase } from './shellbase.js';

export class gamebase {
    shell;
    loop;
    level;
    view;

    stopRequested = false;

    #debugInfoMinLevel = 0;
    #debugInfoMaxLevel = 3;
    #debugInfoLevel = 0;
    #debugInfoLinestartX = 10;
    #debugInfoLinestartY = 20;
    #debugInfoLinestepX = 0;
    #debugInfoLinestepY = 20;
    #debugInfoLines = [];
    #debugGridSize = 100;
    #debugGridEvenColor = 'rgba(0, 0, 0, 0.01)'; //'black',
    #debugGridOddColor = 'rgba(255, 255, 255, 0.01)'; //'white';

    #mouseMoveInternalHolding = false;
    #mouseMoveInternalHoldingEvent = null;
    #mouseMoveInternal = false;
    #mouseMoveInternalEvent = null;

    #mouseDownInternalHolding = false;
    #mouseDownInternalHoldingEvent = null;
    #mouseDownInternal = false;
    #mouseDownInternalEvent = null;

    #mouseUpInternalHolding = false;
    #mouseUpInternalHoldingEvent = null;
    #mouseUpInternal = false;
    #mouseUpInternalEvent = null;

    #mouseClickInternalHolding = false;
    #mouseClickInternalHoldingEvent = null;
    #mouseClickInternal = false;
    #mouseClickInternalEvent = null;

    #mouseWheelInternalHolding = false;
    #mouseWheelInternalHoldingEvent = null;
    #mouseWheelInternal = false;
    #mouseWheelInternalEvent = null;

    #mouseContextMenuInternalHolding = false;
    #mouseContextMenuInternalHoldingEvent = null;
    #mouseContextMenuInternal = false;
    #mouseContextMenuInternalEvent = null;

    #keyboardDownInternalHolding = false;
    #keyboardDownInternalHoldingEvent = null;
    #keyboardDownInternal = false;
    #keyboardDownInternalEvent = null;

    #keyboardUpInternalHolding = false;
    #keyboardUpInternalHoldingEvent = null;
    #keyboardUpInternal = false;
    #keyboardUpInternalEvent = null;

    constructor(shell, maxFps) {
        if (shell === undefined ||
            shell === null ||
            shell instanceof shellbase !== true) {
            throw ('Invalid shell');
        }

        if (maxFps === undefined ||
            maxFps === null ||
            Number.isNaN(maxFps) ||
            maxFps < 1 ||
            maxFps > 480 ||
            maxFps !== Math.round(maxFps)) {
            throw ('Invalid maxFps');
        }

        this.shell = shell;
        this.loop = new loop(maxFps, this);
    }

    preinitialize() {
        this.view.preinitialize();
        this.level.preinitialize();
    }
    initialize() {
        this.view.initialize();
        this.level.initialize();

        //TODO: Unsure if these are still needed. probably
        this.update.bind(this);
        this.draw.bind(this);
        this.beginFrame.bind(this);
        this.endFrame.bind(this);

        this.registerEventHandlers();
    }
    postinitialize() {
        this.view.postinitialize();
        this.level.postinitialize();
    }

    dispose() {
        this.unregisterEventHandlers();
        this.level.dispose();
        this.view.dispose();
    }

    start() {
        // if (!this.isInitialized) {
        //     throw 'Attempt to start an uninitialized game.';
        // }
        this.level.start();
        this.view.start();
        this.loop.start();
    }

    stop() {
        this.loop.stop();
        this.level.stop();
        this.view.stop();
        this.shell.gameEnding();
    }

    requestStop() {
        this.stopRequested = true;
    }

    beginFrame() { }

    endFrame() { }

    preupdate(delta) {
        //loop calls this method. do not call it from anywhere else.

        if (!this.view.isInitialized) {
            throw 'Attempt to update a view that is not initialized.';
        }
        if (!this.level.isInitialized) {
            throw 'Attempt to update a level that is not initialized.';
        }

        this.copyEvents();
    }
    update(delta) {
        //loop calls this method. do not call it from anywhere else.
        this.view.update(delta);
        this.level.update(delta);
        if (this.#debugInfoLevel > 0) {
            this.updateDebugInfo();
        }
    }
    postupdate(delta) {
        //loop calls this method. do not call it from anywhere else.
        this.resetEvents();
    }

    predraw(interp) {
        //loop calls this method. do not call it from anywhere else.
        if (!this.view.isInitialized) {
            throw 'Attempt to draw a view that is not initialized.';
        }
        if (!this.level.isInitialized) {
            throw 'Attempt to draw a level that is not initialized.';
        }
    }
    draw(interp) {
        //loop calls this method. do not call it from anywhere else.
        this.view.draw(interp);
        this.level.draw(interp);
        this.view.drawLevelClipping();

        if (this.#debugInfoLevel > this.#debugInfoMinLevel) {
            this.view.setTransformToLevel();
            //this.drawBackgroundDebug(interp)
            this.level.drawDebugActors(interp);
            
            this.view.setTransformToView();
            this.drawDebugMouse();
            this.drawDebugInfo(interp);
        }
    }
    postdraw(interp) {
        //loop calls this method. do not call it from anywhere else.
    }

    updateDebugInfo() { }

    //#region Events

    registerEventHandlers() {
        // Window events
        window.onresize = this.windowResizeInternalHandler.bind(this);
        window.onorientationchange = this.orientationChangeInternalHandler.bind(this);

        // Mouse events
        window.onmousemove = this.mouseMoveInternalHandler.bind(this);
        window.onmousedown = this.mouseDownInternalHandler.bind(this);
        window.onmouseup = this.mouseUpInternalHandler.bind(this);
        window.onclick = this.mouseClickInternalHandler.bind(this);
        window.onwheel = this.mouseWheelInternalHandler.bind(this);
        window.oncontextmenu = this.mouseContextMenuInternalHandler.bind(this);

        // Keyboard events
        window.onkeydown = this.keyboardDownInternalHandler.bind(this);
        window.onkeyup = this.keyboardUpInternalHandler.bind(this);

        // Gamepad events

        // Touch events
    }

    unregisterEventHandlers() {
        // Window events
        window.onresize = null;
        window.onorientationchange = null;

        // Mouse events
        window.onmousemove = null;
        window.onmousedown = null;
        window.onmouseup = null;
        window.onclick = null;
        window.onwheel = null;
        window.oncontextmenu = null;

        // Keyboard events
        window.onkeydown = null;
        window.onkeyup = null;

        // Gamepad events

        // Touch events
    }

    // Events are held in the hold vars until the beginning of the next update.
    // Then they are copied to the publicly accessible vars.
    // This should give consistent state to all actors/levels/views regardless of when the event occurred.
    //TODO: Bad/dumb name
    //TODO: Need to think through this to see if it would allow events to be missed at certain times.
    //TODO: NEED TO INVESTIGATE MOVING TO ARRAYS OF EVENTS!!!! What would an actor do with multiple separate keystrokes, mouseclicks, etc?
    copyEvents() {
        // Mouse events
        this.#mouseMoveInternal = this.#mouseMoveInternalHolding;
        this.#mouseMoveInternalEvent = this.#mouseMoveInternalHoldingEvent;
        this.#mouseMoveInternalHolding = false;
        this.#mouseMoveInternalHoldingEvent = null;

        this.#mouseDownInternal = this.#mouseDownInternalHolding;
        this.#mouseDownInternalEvent = this.#mouseDownInternalHoldingEvent;
        this.#mouseDownInternalHolding = false;
        this.#mouseDownInternalHoldingEvent = null;

        this.#mouseUpInternal = this.#mouseUpInternalHolding;
        this.#mouseUpInternalEvent = this.#mouseUpInternalHoldingEvent;
        this.#mouseUpInternalHolding = false;
        this.#mouseUpInternalHoldingEvent = null;

        this.#mouseClickInternal = this.#mouseClickInternalHolding;
        this.#mouseClickInternalEvent = this.#mouseClickInternalHoldingEvent;
        this.#mouseClickInternalHolding = false;
        this.#mouseClickInternalHoldingEvent = null;

        this.#mouseWheelInternal = this.#mouseWheelInternalHolding;
        this.#mouseWheelInternalEvent = this.#mouseWheelInternalHoldingEvent;
        this.#mouseWheelInternalHolding = false;
        this.#mouseWheelInternalHoldingEvent = null;

        this.#mouseContextMenuInternal = this.#mouseContextMenuInternalHolding;
        this.#mouseContextMenuInternalEvent = this.#mouseContextMenuInternalHoldingEvent;
        this.#mouseContextMenuInternalHolding = false;
        this.#mouseContextMenuInternalHoldingEvent = null;

        // Keyboard events
        this.#keyboardDownInternal = this.#keyboardDownInternalHolding;
        this.#keyboardDownInternalEvent = this.#keyboardDownInternalHoldingEvent;
        this.#keyboardDownInternalHolding = false;
        this.#keyboardDownInternalHoldingEvent = null;

        this.#keyboardUpInternal = this.#keyboardUpInternalHolding;
        this.#keyboardUpInternalEvent = this.#keyboardUpInternalHoldingEvent;
        this.#keyboardUpInternalHolding = false;
        this.#keyboardUpInternalHoldingEvent = null;
    }

    resetEvents() {
        // Mouse events
        this.#mouseMoveInternal = false;
        this.#mouseMoveInternalEvent = null;

        this.#mouseDownInternal = false;
        this.#mouseDownInternalEvent = null;

        this.#mouseUpInternal = false;
        this.#mouseUpInternalEvent = null;

        this.#mouseClickInternal = false;
        this.#mouseClickInternalEvent = null;

        this.#mouseWheelInternal = false;
        this.#mouseWheelInternalEvent = null;

        this.#mouseContextMenuInternal = false;
        this.#mouseContextMenuInternalEvent = null;

        // Keyboard events
        this.#keyboardDownInternal = false;
        this.#keyboardDownInternalEvent = null;

        this.#keyboardUpInternal = false;
        this.#keyboardUpInternalEvent = null;
    }

    windowResizeInternalHandler() {
        this.view.markViewSizeAsNeedingUpdate();
    }

    orientationChangeInternalHandler() {
        this.view.markViewSizeAsNeedingUpdate();
    }

    mouseMoveInternalHandler(event) {
        this.#mouseMoveInternalHolding = true;
        this.#mouseMoveInternalHoldingEvent = event;
    }

    get mouseMove() {
        return this.#mouseMoveInternal;
    }

    get mouseMoveEvent() {
        return this.#mouseMoveInternalEvent;
    }

    mouseDownInternalHandler(event) {
        this.#mouseDownInternalHolding = true;
        this.#mouseDownInternalHoldingEvent = event;
    }

    get mouseDown() {
        return this.#mouseDownInternal;
    }

    get mouseDownEvent() {
        return this.#mouseDownInternalEvent;
    }

    mouseUpInternalHandler(event) {
        this.#mouseUpInternalHolding = true;
        this.#mouseUpInternalHoldingEvent = event;
    }

    get mouseUp() {
        return this.#mouseUpInternal;
    }

    get mouseUpEvent() {
        return this.#mouseUpInternalEvent;
    }

    mouseClickInternalHandler(event) {
        this.#mouseClickInternalHolding = true;
        this.#mouseClickInternalHoldingEvent = event;
    }

    get mouseClick() {
        return this.#mouseClickInternal;
    }

    get mouseClickEvent() {
        return this.#mouseClickInternalEvent;
    }

    mouseWheelInternalHandler(event) {
        this.#mouseWheelInternalHolding = true;
        this.#mouseWheelInternalHoldingEvent = event;
    }

    get mouseWheel() {
        return this.#mouseWheelInternal;
    }

    get mouseWheelEvent() {
        return this.#mouseWheelInternalEvent;
    }

    mouseContextMenuInternalHandler(event) {
        event.preventDefault();
        this.#mouseContextMenuInternalHolding = true;
        this.#mouseContextMenuInternalHoldingEvent = event;
    }

    get mouseContextMenu() {
        return this.#mouseContextMenuInternal;
    }

    get mouseContextMenuEvent() {
        return this.#mouseContextMenuInternalEvent;
    }

    keyboardDownInternalHandler(event) {
        this.#keyboardDownInternalHolding = true;
        this.#keyboardDownInternalHoldingEvent = event;
    }

    get keyboardDown() {
        return this.#keyboardDownInternal;
    }

    get keyboardDownEvent() {
        return this.#keyboardDownInternalEvent;
    }

    keyboardUpInternalHandler(event) {
        this.#keyboardUpInternalHolding = true;
        this.#keyboardUpInternalHoldingEvent = event;
    }

    get keyboardUp() {
        return this.#keyboardUpInternal;
    }

    get keyboardUpEvent() {
        return this.#keyboardUpInternalEvent;
    }

    updateGamepads() {
        // this.gamepads = [];

        // let connectedGamepads = navigator.getGamepads();
        // if (connectedGamepads !== null &&
        //     connectedGamepads.length > 0) {
        //     for (let i = 0; i < connectedGamepads.length; i++) {
        //         let gp = connectedGamepads[i];
        //         if (gp !== null) {
        //             this.gamepads.push(gp);
        //         }
        //     }
        // }
    }

    gamepadIsButtonDown() {
        // if (this.gamepads.length > 0) {
        //     for (let i = 0; i < this.gamepads.length; i++) {
        //         let gp = this.gamepads[i];

        //         let pb = gp.buttons.filter(b => b.pressed);
        //         if (pb !== null &&
        //             pb.length > 0) {
        //             return true;
        //         }
        //     }
        // }
    }

    touchStartHandler(e) {
        // this.game.onTouchStart(e);
    }

    touchEndHandler(e) {
        // this.game.onTouchEnd(e);
    }

    touchCancelHandler(e) {
        // this.game.onTouchCancel(e);
    }

    touchMoveHandler(e) {
        // this.game.onTouchMove(e);
        //e.preventDefault();

        //mouseLastSet = gameloopLastFrameTimeMs;

        //var touches = e.changedTouches;
        //for (var i = 0; i < touches.length; i++) {
        //    if (i = 0) {
        //        mouseX = touches[i].clientX;
        //        mouseY = touches[i].clientY;
        //    }
        //}

        //mouseInWorldX = (mouseX - worldOriginX) / scale;
        //mouseInWorldY = (mouseY - worldOriginY) / scale;
    }

    //#endregion

    //#region Debug

    get debugInfoMinLevel() {
        return this.#debugInfoMinLevel;
    }

    get debugInfoMaxLevel() {
        return this.#debugInfoMaxLevel;
    }

    get debugInfoLevel() {
        return this.#debugInfoLevel;
    }

    set debugInfoLevel(value) {
        if (value === undefined ||
            value === null ||
            Number.isNaN(value) ||
            value < this.#debugInfoMinLevel ||
            value > this.#debugInfoMaxLevel ||
            value !== Math.round(value)) {
            throw ('Invalid debugInfoLevel');
        }

        this.#debugInfoLevel = value;
    }

    debuginfoAddLine(text) {
        this.#debugInfoLines.push(text);
    }

    debugInfoClear() {
        this.#debugInfoLines = [];
    }

    updateDebugInfo() {
        this.debugInfoClear();

        if (this.#debugInfoLevel >= 1) {
            this.debuginfoAddLine('Press i key to toggle debug mode, level: ' + this.#debugInfoLevel + ' of ' + this.#debugInfoMaxLevel);
            this.debuginfoAddLine('fps: ' + Math.round(this.loop.fps) + ', avg: ' + Math.round(this.loop.fpsAvg) + ', max: ' + Math.round(this.loop.maxFps));
        }

        if (this.#debugInfoLevel >= 2) {
            //     this.debuginfoAddLine('canvas w: ' + this.canvasWidth + ' h: ' + this.canvasHeight);
            //     this.debuginfoAddLine('world w: ' + this.worldWidth + ' h: ' + this.worldHeight);
            //     this.debuginfoAddLine('world origin x: ' + Math.round(this.worldOriginInCanvasX) + ' y: ' + Math.round(this.worldOriginInCanvasY));
            //     this.debuginfoAddLine('world on canvas w: ' + Math.round(this.worldVisibleWidth) + ' h: ' + Math.round(this.worldVisibleHeight));
            //     this.debuginfoAddLine('camera x: ' + Math.round(this.cameraX) + ' y: ' + Math.round(this.cameraY));
            this.debuginfoAddLine('scale: ' + Math.round(this.view.scale * 100) + ' w: ' + Math.round(this.view.scaleWidth * 100) + ' h: ' + Math.round(this.view.scaleHeight * 100));
            this.debuginfoAddLine('actors: ' + this.level.actors.length);
        }
    }

    drawDebugInfo() {
        this.view.ctx.textAlign = 'start';
        this.view.ctx.textBaseline = 'alphabetic';
        this.view.ctx.font = '20px Arial';
        this.view.ctx.fillStyle = 'red';

        for (let i = 0; i < this.#debugInfoLines.length; i++) {
            this.drawDebugInfoLine(this.#debugInfoLines[i], i);
        }

        this.debugInfoClear();
    }

    drawDebugInfoLine(text, lineNum) {
        this.view.ctx.fillText(text, this.#debugInfoLinestartX + (lineNum * this.#debugInfoLinestepX), this.#debugInfoLinestartY + (lineNum * this.#debugInfoLinestepY));
    }

    drawBackgroundDebug(interp) {
        if (this.#debugInfoLevel < 2) {
            return;
        }

        let debugColumns = this.worldWidth / this.#debugGridSize;
        let debugRows = this.worldHeight / this.#debugGridSize;

        // draw a hazy checkered pattern over the world to assist with positioning
        for (let col = 0; col < debugColumns; col++) {
            for (let row = 0; row < debugRows; row++) {
                this.drawBackgroundDebug_square(col, row);
            }
        }
    }

    drawBackgroundDebug_square(col, row) {
        if ((col % 2 == 0 && row % 2 == 0) ||
            (col % 2 != 0 && row % 2 != 0)) {
            this.ctx.fillStyle = this.#debugGridEvenColor;
        } else {
            this.ctx.fillStyle = this.#debugGridOddColor;
        }

        this.ctx.fillRect(col * this.#debugGridSize, row * this.#debugGridSize, this.#debugGridSize, this.#debugGridSize);
    }

    drawDebugMouse() {
        if (this.#debugInfoLevel < 3) {
            return;
        }

        //mouse crosshairs
        this.view.ctx.lineWidth = 1;
        this.view.ctx.strokeStyle = 'yellow';

        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.view.mouseX, 0);
        this.view.ctx.lineTo(this.view.mouseX, this.view.viewHeight);
        this.view.ctx.moveTo(0, this.view.mouseY);
        this.view.ctx.lineTo(this.view.viewWidth, this.view.mouseY);
        this.view.ctx.closePath();
        this.view.ctx.stroke();

        let c = 'canvas x: ' + this.view.mouseX + ' y: ' + this.view.mouseY;
        let cp = 'canvas x: ' + Math.round((this.view.mouseX / this.view.viewWidth) * 100) + '% y: ' + Math.round((this.view.mouseY / this.view.viewHeight) * 100) + '%';
        let w = 'world x: ' + Math.round(this.level.mouseX) + ' y: ' + Math.round(this.level.mouseY);

        let adjX = 0;
        let adjY = 0;

        this.view.ctx.font = '12px Arial';
        this.view.ctx.fillStyle = 'red';
        this.view.ctx.textBaseline = 'alphabetic';

        if (this.view.mouseX < this.view.viewCenterX) {
            this.view.ctx.textAlign = 'start';
            adjX = 5;
        }
        else {
            this.view.ctx.textAlign = 'end';
            adjX = -5;
        }

        if (this.view.mouseY < this.view.viewCenterY) {
            adjY = 14;
        }
        else {
            adjY = -30;
        }

        this.view.ctx.fillText(c, this.view.mouseX + adjX, this.view.mouseY + adjY);
        this.view.ctx.fillText(cp, this.view.mouseX + adjX, this.view.mouseY + adjY + 12);
        this.view.ctx.fillText(w, this.view.mouseX + adjX, this.view.mouseY + adjY + 12 * 2);
    }

    //#endregion
}