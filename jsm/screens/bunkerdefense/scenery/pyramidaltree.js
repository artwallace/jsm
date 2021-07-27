import { treebase } from './treebase.js';
import { getRandomIntFromRange, getRandomFromArray } from '../../../engine/utilities.js';

export class pyramidaltree extends treebase {
    leafColors = ['#4d8c57', '#acbf60', '#5e8c31', '#45a27d', '#5fa778', '#5da493', '#b5b35c'];
    trunkColors = ['#9b7653', '#a17a74', '#bd8260', '#832a0d', '#87421f', '#664228', '#805533'];

    #leafBaseLeft = 0;
    #leafBaseRight = 0;

    //TODO: add multiple leaf layers
    constructor(game, x, y) {
        super(game, x, y);

        this.trunkColor = getRandomFromArray(this.trunkColors);
        this.leafColor = getRandomFromArray(this.leafColors);

        this.trunkHeight = getRandomIntFromRange(5, 10);
        this.trunkThickness = getRandomIntFromRange(2, 4);

        this.leafHeight = getRandomIntFromRange(30, 40);
        this.leafWidth = getRandomIntFromRange(15, 25);

        this.trunkTop = this.y - this.trunkHeight;

        this.#leafBaseLeft = this.x - this.leafWidth / 2;
        this.#leafBaseRight = this.x + this.leafWidth / 2;
    }

    drawToOffscreenCtx(offscreenCtx, canvasOffsetX, canvasOffsetY) {
        super.drawToOffscreenCtx(offscreenCtx);

        offscreenCtx.beginPath();
        offscreenCtx.moveTo(this.x - canvasOffsetX, this.y - canvasOffsetY);
        offscreenCtx.lineTo(this.x - canvasOffsetX, this.trunkTop - canvasOffsetY);
        offscreenCtx.closePath();
        offscreenCtx.lineWidth = this.trunkThickness;
        offscreenCtx.strokeStyle = this.trunkColor;
        offscreenCtx.stroke();

        offscreenCtx.beginPath();
        offscreenCtx.moveTo(this.x - canvasOffsetX, this.y - this.trunkHeight - this.leafHeight - canvasOffsetY);
        offscreenCtx.lineTo(this.#leafBaseRight - canvasOffsetX, this.trunkTop - canvasOffsetY);
        offscreenCtx.lineTo(this.#leafBaseLeft - canvasOffsetX, this.trunkTop - canvasOffsetY);
        offscreenCtx.closePath();
        offscreenCtx.fillStyle = this.leafColor;
        offscreenCtx.fill();
    }

    static pyramidalTreeAcrossRangeFactory(game, minX, maxX, groundY) {
        let tX = getRandomIntFromRange(minX, maxX);
        return new pyramidaltree(game, tX, groundY);
    }
}