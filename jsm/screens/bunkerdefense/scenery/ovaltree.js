import { treebase } from './treebase.js';
import { getRandomIntFromRange, getRandomFromArray } from '../../../engine/utilities.js';

export class ovaltree extends treebase {
    leafColors = ['#4d8c57', '#acbf60', '#5e8c31', '#45a27d', '#5fa778', '#5da493', '#b5b35c'];
    trunkColors = ['#9b7653', '#a17a74', '#bd8260', '#832a0d', '#87421f', '#664228', '#805533'];

    #startAngle = 0;
    #endAngle = Math.PI * 2;
    #leafRadiusX = 0;
    #leafRadiusY = 0;

    constructor(game, x, y, layer) {
        super(game, x, y, layer);

        this.trunkColor = getRandomFromArray(this.trunkColors);
        this.leafColor = getRandomFromArray(this.leafColors);

        this.trunkHeight = getRandomIntFromRange(20, 30);
        this.trunkThickness = getRandomIntFromRange(2, 4);

        this.#leafRadiusX = getRandomIntFromRange(8, 14);
        this.#leafRadiusY = getRandomIntFromRange(10, 15);

        this.trunkTop = this.y - this.trunkHeight;
    }

    draw() {
        super.draw();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.x, this.y);
        this.game.view.ctx.lineTo(this.x, this.trunkTop);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.trunkThickness;
        this.game.view.ctx.strokeStyle = this.trunkColor;
        this.game.view.ctx.stroke();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.ellipse(this.x, this.trunkTop, this.#leafRadiusX, this.#leafRadiusY, 0, this.#startAngle, this.#endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.leafColor;
        this.game.view.ctx.fill();
    }

    static ovalTreeAcrossRangeFactory(game, minX, maxX, groundY, layer) {
        let tX = getRandomIntFromRange(minX, maxX);
        return new ovaltree(game, tX, groundY, layer);
    }
}