import { treebase } from './treebase.js';
import { getRandomIntFromRange, getRandomFromArray } from '../../../engine/utilities.js';

export class roundtree extends treebase {
    trunkColor = '#9b7653';
    leafColor = '#45a27d';

    leafColors = ['#4d8c57', '#acbf60', '#5e8c31', '#45a27d', '#5fa778', '#5da493', '#b5b35c'];
    trunkColors = ['#9b7653', '#a17a74', '#bd8260', '#832a0d', '#87421f', '#664228', '#805533'];

    trunkHeight = 0;
    trunkThickness = 0;

    startAngle = 0;
    endAngle = Math.PI * 2;
    leafRadius = 0;

    constructor(game, x, y, layer) {
        super(game, x, y, layer);

        this.trunkColor = getRandomFromArray(this.trunkColors);
        this.leafColor = getRandomFromArray(this.leafColors);

        this.trunkHeight = getRandomIntFromRange(20, 30);
        this.trunkThickness = getRandomIntFromRange(2, 4);

        this.leafRadius = getRandomIntFromRange(7, 15);
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.x, this.y);
        this.game.view.ctx.lineTo(this.x, this.y - this.trunkHeight);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.trunkThickness;
        this.game.view.ctx.strokeStyle = this.trunkColor;
        this.game.view.ctx.stroke();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y - this.trunkHeight, this.leafRadius, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.leafColor;
        this.game.view.ctx.fill();
    }

    static roundTreeAcrossRangeFactory(game, minX, maxX, groundY, layer) {
        let tX = getRandomIntFromRange(minX, maxX);
        return new roundtree(game, tX, groundY, layer);
    }
}