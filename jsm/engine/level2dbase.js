import { gameitembase } from './gameitembase.js';
import { actor2dbase } from './actor2dbase.js';

export class level2dbase extends gameitembase {
    //TODO: eventually remove 'level' from these names.
    //TODO: keeping for now to prevent copy/paste errors while migrating from old system.
    levelWidth = 0;
    levelHeight = 0;
    levelLeft = 0; //Always
    levelTop = 0; //Always
    levelRight = 0; //levelLeft + levelWidth
    levelBottom = 0; //levelTop + levelHeight
    levelCenterX = 0;
    levelCenterY = 0;

    //Viewport in level coordinates
    //TODO: implement this.
    //TODO: decide if these should be handled alongside viewWidthInLevelCoordinates, viewHeightInLevelCoordinates in view2dbase.
    visibleWidth = 0;
    visibleHeight = 0;
    visibleLeft = 0;
    visibleTop = 0;
    visibleRight = 0;
    visibleBottom = 0;
    visibleCenterX = 0;
    visibleCenterY = 0;

    title = '';

    actors = [];

    minLayer = 1;
    maxLayer = 20;
    defaultLayer = 10;

    mouseX = 0;//was mouseInWorldX
    mouseY = 0;//was mouseInWorldY

    constructor(game) {
        super(game);
    }

    // initialize() {
    //     super.initialize();
    // }

    dispose() {
        this.disposeAllActors();
        super.dispose();
    }

    start() {
        if (!this.isInitialized) {
            throw 'Attempt to start an uninitialized level.';
        }
    }

    stop() { }

    beginFrame() { }

    endFrame() { }

    update(delta) {
        if (this.game.mouseMove) {
            this.updateMouseCoordinates();
        }

        if (this.game.keyboardDown) {
            switch (this.game.keyboardDownEvent.key) {
                case 'i':
                    if (this.game.debugInfoLevel < this.game.debugInfoMaxLevel) {
                        this.game.debugInfoLevel++;
                    }
                    else {
                        this.game.debugInfoLevel = this.game.debugInfoMinLevel;
                    }
                    break;
            }
        }

        this.updateActors(delta);
    }

    draw(interp) {
        this.drawActors(interp);
    }

    updateDebugInfo() { }

    setlevelSize(width, height) {
        if (width === undefined ||
            width === null ||
            Number.isNaN(width) ||
            width < 1 ||
            width !== Math.round(width) ||
            height === undefined ||
            height === null ||
            Number.isNaN(height) ||
            height < 1 ||
            height !== Math.round(height)) {
            throw ('Invalid dimensions: w=' + width + ' h=' + height);
        }

        this.levelWidth = width;
        this.levelHeight = height;

        this.levelLeft = 0; //Always
        this.levelTop = 0; //Always
        this.levelRight = this.levelLeft + this.levelWidth;
        this.levelBottom = this.levelTop + this.levelHeight;

        this.levelCenterX = this.levelLeft + (this.levelWidth / 2);
        this.levelCenterY = this.levelTop + (this.levelHeight / 2);
    }

    //#region Actors

    updateActors(delta) {
        for (let layer = this.minLayer; layer <= this.maxLayer; layer++) {
            let actorsInLayer = this.actors.filter(a =>
                a !== undefined &&
                a !== null &&
                !a.readyForDeletion &&
                a.layer === layer);

            actorsInLayer.forEach(a => {
                if (!a.isInitialized) {
                    throw 'Attempt to update an uninitialized actor.';
                }
                a.update(delta);
            });
        }
        let actorsToDel = this.actors.filter(a =>
            a !== undefined &&
            a !== null &&
            a.readyForDeletion);
        actorsToDel.forEach(a => {
            a.dispose();
        });
        this.actors = this.actors.filter(a =>
            a !== undefined &&
            a !== null &&
            !a.readyForDeletion);
    }

    drawActors(interp) {
        this.game.view.setTransformToLevel();
        for (let layer = this.minLayer; layer <= this.maxLayer; layer++) {
            let actorsInLayer = this.actors.filter(a =>
                a !== undefined &&
                a !== null &&
                !a.readyForDeletion &&
                a.layer == layer &&
                a.isVisible);
            actorsInLayer.forEach(a => {
                if (!a.isInitialized) {
                    throw 'Attempt to draw an uninitialized actor.';
                }
                a.draw(interp);
            });
        }
    }

    drawDebugActors(interp) {
        for (let layer = this.minLayer; layer <= this.maxLayer; layer++) {
            let actorsInLayer = this.actors.filter(a =>
                a !== undefined &&
                a !== null &&
                !a.readyForDeletion &&
                a.layer == layer);
            actorsInLayer.forEach(a => {
                a.drawdebug(interp);
            });
        }
    }

    addActor(actor) {
        if (actor === undefined ||
            actor === null ||
            actor instanceof actor2dbase !== true ||
            actor.game !== this.game) {
            throw ('Invalid actor');
        }
        if (!actor.isInitialized) {
            actor.preinitialize();
            actor.initialize();
            actor.postinitialize();
            if (!actor.isInitialized) {
                throw ('Encountered an actor that could not be initialized.');
            }
        }
        this.actors.push(actor);
    }

    disposeAllActors() {
        this.actors.forEach(a => {
            a.dispose();
        });
        this.actors.splice(0, this.actors.length)
    }

    //#endregion

    updateMouseCoordinates() {
        if (this.game === undefined ||
            this.game === null ||

            this.game.mouseMoveEvent === undefined ||
            this.game.mouseMoveEvent === null ||

            this.game.mouseMoveEvent.clientX === undefined ||
            this.game.mouseMoveEvent.clientX === null ||
            Number.isNaN(this.game.mouseMoveEvent.clientX) ||

            this.game.mouseMoveEvent.clientY === undefined ||
            this.game.mouseMoveEvent.clientY === null ||
            Number.isNaN(this.game.mouseMoveEvent.clientY) ||

            this.game.view.levelOriginInViewX === undefined ||
            this.game.view.levelOriginInViewX === null ||
            Number.isNaN(this.game.view.levelOriginInViewX) ||

            this.game.view.levelOriginInViewY === undefined ||
            this.game.view.levelOriginInViewY === null ||
            Number.isNaN(this.game.view.levelOriginInViewY) ||

            this.game.view.scale === undefined ||
            this.game.view.scale === null ||
            Number.isNaN(this.game.view.scale) ||
            this.game.view.scale === Infinity ||
            this.game.view.scale === 0) {
            throw ('Invalid state.');
        }

        this.mouseX = (this.game.mouseMoveEvent.clientX - this.game.view.levelOriginInViewX) / this.game.view.scale;
        this.mouseY = (this.game.mouseMoveEvent.clientY - this.game.view.levelOriginInViewY) / this.game.view.scale;
    }
}