import { treebase } from './treebase.js';
import { getRandomIntFromRange, getRandomFromArray } from '../../../engine/utilities.js';

export class roundtree extends treebase {
    leafColors = ['#4d8c57', '#acbf60', '#5e8c31', '#45a27d', '#5fa778', '#5da493', '#b5b35c'];
    trunkColors = ['#9b7653', '#a17a74', '#bd8260', '#832a0d', '#87421f', '#664228', '#805533'];

    #startAngle = 0;
    #endAngle = Math.PI * 2;
    leafRadius = 0;

    constructor(game, x, y) {
        super(game, x, y);

        this.trunkColor = getRandomFromArray(this.trunkColors);
        this.leafColor = getRandomFromArray(this.leafColors);

        this.trunkHeight = getRandomIntFromRange(20, 30);
        this.trunkThickness = getRandomIntFromRange(2, 4);

        this.leafRadius = getRandomIntFromRange(7, 15);

        this.trunkTop = this.y - this.trunkHeight;
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
        offscreenCtx.arc(this.x - canvasOffsetX, this.trunkTop - canvasOffsetY, this.leafRadius, this.#startAngle, this.#endAngle);
        offscreenCtx.closePath();
        offscreenCtx.fillStyle = this.leafColor;
        offscreenCtx.fill();
    }

    static roundTreeAcrossRangeFactory(game, minX, maxX, groundY) {
        let tX = getRandomIntFromRange(minX, maxX);
        return new roundtree(game, tX, groundY);
    }
}