import { actor2dbase } from '../../../engine/actor2dbase.js';
import { getRandomIntFromRange } from '../../../engine/utilities.js';

//TODO: Vary the color
export class cloud extends actor2dbase {
    #pieces = [];
    #minNumOfPieces = 1;
    #maxNumOfPieces = 7;
    #minPieceWidth = 40;
    #maxPieceWidth = 85;
    #minPieceHeight = 15;
    #maxPieceHeight = 25;
    #startAngle = 0;
    #endAngle = Math.PI * 2;
    color = 'rgba(255, 255, 255, 0.75)';

    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.defaultLayer + 2;
    }

    initialize() {
        let count = getRandomIntFromRange(this.#minNumOfPieces, this.#maxNumOfPieces);
        for (let index = 0; index < count; index++) {
            let pieceOffsetX = getRandomIntFromRange(-this.#minPieceWidth, this.#minPieceWidth);
            let pieceOffsetY = getRandomIntFromRange(-this.#minPieceHeight, this.#minPieceHeight);
            let radiusX = getRandomIntFromRange(this.#minPieceWidth, this.#maxPieceWidth);
            let radiusY = getRandomIntFromRange(this.#minPieceHeight, this.#maxPieceHeight);

            this.#pieces[index] = { pieceOffsetX, pieceOffsetY, radiusX, radiusY };
        }
    }

    update(delta) {
        super.update(delta);

        this.actionFlyAcross(delta, 40);

        if (this.x > this.game.level.levelWidth + (this.#maxPieceWidth * 2)) {
            this.readyForDeletion = true;
        }
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.fillStyle = this.color;
        this.#pieces.forEach(piece => {
            this.game.view.ctx.beginPath();
            this.game.view.ctx.ellipse(this.x + piece.pieceOffsetX, this.y + piece.pieceOffsetY, piece.radiusX, piece.radiusY, 0, this.#startAngle, this.#endAngle);
            this.game.view.ctx.closePath();
            this.game.view.ctx.fill();
        });
    }
}