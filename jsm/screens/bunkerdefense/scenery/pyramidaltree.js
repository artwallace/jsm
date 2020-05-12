import { treebase } from './treebase.js';
import { getRandomIntFromRange, getRandomFromArray } from '../../../engine/utilities.js';

export class pyramidaltree extends treebase {
    leafColors = ['#4d8c57', '#acbf60', '#5e8c31', '#45a27d', '#5fa778', '#5da493', '#b5b35c'];
    trunkColors = ['#9b7653', '#a17a74', '#bd8260', '#832a0d', '#87421f', '#664228', '#805533'];

    #leafBaseLeft = 0;
    #leafBaseRight = 0;

    //TODO: add multiple leaf layers
    constructor(game, x, y, layer) {
        super(game, x, y, layer);

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
        this.game.view.ctx.moveTo(this.x, this.y - this.trunkHeight - this.leafHeight);
        this.game.view.ctx.lineTo(this.#leafBaseRight, this.trunkTop);
        this.game.view.ctx.lineTo(this.#leafBaseLeft, this.trunkTop);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.leafColor;
        this.game.view.ctx.fill();
    }

    static pyramidalTreeAcrossRangeFactory(game, minX, maxX, groundY, layer) {
        let tX = getRandomIntFromRange(minX, maxX);
        return new pyramidaltree(game, tX, groundY, layer);
    }
}