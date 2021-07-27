import { treebase } from './treebase.js';
import { getRandomIntFromRange, getRandomFromRange, getRandomFromArray, getPointFromAngle, convertFromDegreesToRadians } from '../../../engine/utilities.js';

export class palmtree extends treebase {
    leafColors = ['#4d8c57', '#acbf60', '#5e8c31', '#45a27d', '#5fa778', '#5da493', '#b5b35c'];
    trunkColors = ['#9b7653', '#a17a74', '#bd8260', '#832a0d', '#87421f', '#664228', '#805533'];

    trunkTopX = 0;
    trunkTopY = 0;

    leaves = [];

    leafOriginX = 0;
    leafOriginY = 0;

    startAngle = 0;
    endAngle = Math.PI * 2;

    constructor(game, x, y) {
        super(game, x, y);

        this.trunkColor = getRandomFromArray(this.trunkColors);

        this.trunkHeight = getRandomIntFromRange(20, 30);
        this.trunkThickness = getRandomIntFromRange(2, 4);

        this.trunkTopX = this.x;
        this.trunkTopY = this.y - this.trunkHeight;

        this.leafOriginX = this.x;
        this.leafOriginY = this.y - this.trunkHeight;

        let leafIdx = 0;
        for (let side = -1; side <= 1; side++) {
            //left side = -1
            //right side = +1
            //if zero we will just skip.
            if (side === 0) {
                continue;
            }

            for (let position = 1; position <= 3; position++) {
                // 1 = lower third
                // 2 = middle third
                // 3 = upper third
                leafIdx++;
                let leaf = this.generateLeaf(side, position);
                this.leaves[leafIdx] = leaf;
            }
        }
    }

    generateLeaf(side, position) {
        //TODO: move control points to perpendicular points projected from leaf angle.

        //left side = -1
        //right side = +1

        // position
        // 1 = lower third
        // 2 = middle third
        // 3 = upper third

        let color = getRandomFromArray(this.leafColors);

        let minAngle = 0;
        let maxAngle = 0;

        if (position === 3) {
            minAngle = 135;
            maxAngle = 165;
        }
        else if (position === 2) {
            minAngle = 165;
            maxAngle = 210;
        }
        else if (position === 1) {
            minAngle = 210;
            maxAngle = 240;
        }

        let angle = getRandomFromRange(minAngle, maxAngle);
        let angleR = convertFromDegreesToRadians(angle);
        let length = getRandomIntFromRange(10, 12);

        let tip = getPointFromAngle(this.leafOriginX, this.leafOriginY, angleR, length);
        if (side === 1) {
            //Flip the angle.
            tip.x = this.leafOriginX * 2 - tip.x;
        }
        let tipX = tip.x;
        let tipY = tip.y;

        let upperControlX = tipX + (10 * side);
        let upperControlY = tipY - 6;

        let lowerControlX = tipX + (7 * side);
        let lowerControlY = tipY - 1;

        return { color, tipX, tipY, upperControlX, upperControlY, lowerControlX, lowerControlY };
    }

    drawToOffscreenCtx(offscreenCtx, canvasOffsetX, canvasOffsetY) {
        super.drawToOffscreenCtx(offscreenCtx);

        offscreenCtx.beginPath();
        offscreenCtx.moveTo(this.x - canvasOffsetX, this.y - canvasOffsetY);
        offscreenCtx.lineTo(this.trunkTopX - canvasOffsetX, this.trunkTopY - canvasOffsetY);
        offscreenCtx.closePath();
        offscreenCtx.lineWidth = this.trunkThickness;
        offscreenCtx.strokeStyle = this.trunkColor;
        offscreenCtx.stroke();

        this.leaves.forEach(leaf => {
            offscreenCtx.fillStyle = leaf.color;
            offscreenCtx.beginPath();
            offscreenCtx.moveTo(this.leafOriginX - canvasOffsetX, this.leafOriginY - canvasOffsetY);
            offscreenCtx.quadraticCurveTo(leaf.upperControlX - canvasOffsetX, leaf.upperControlY - canvasOffsetY, leaf.tipX - canvasOffsetX, leaf.tipY - canvasOffsetY);
            offscreenCtx.quadraticCurveTo(leaf.lowerControlX - canvasOffsetX, leaf.lowerControlY - canvasOffsetY, this.leafOriginX - canvasOffsetX, this.leafOriginY - canvasOffsetY);
            offscreenCtx.closePath();
            offscreenCtx.fill();
        });
    }

    // drawdebug() {
    //     super.drawdebug();

    //     if (this.game.view.debugInfoLevel >= 2) {
    //         offscreenCtx.fillStyle = 'rgba(180, 0, 0, 0.25)';
    //         this.leaves.forEach(leaf => {
    //             offscreenCtx.beginPath();
    //             offscreenCtx.arc(leaf.upperControlX, leaf.upperControlY, 1, this.startAngle, this.endAngle);
    //             offscreenCtx.arc(leaf.lowerControlX, leaf.lowerControlY, 1, this.startAngle, this.endAngle);
    //             offscreenCtx.closePath();
    //             offscreenCtx.fill();
    //         });
    //     }
    // }

    static palmTreeAcrossRangeFactory(game, minX, maxX, groundY) {
        let tX = getRandomIntFromRange(minX, maxX);
        return new palmtree(game, tX, groundY);
    }
}