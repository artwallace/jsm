import { offscreencachedactor2dbase } from '../../../engine/offscreencachedactor2dbase.js';
import { getRandomIntFromRange } from '../../../engine/utilities.js';

//TODO: Vary the color
export class cloud extends offscreencachedactor2dbase {
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

    constructor(game, x, y) {
        super(game, x, y, 0);
        this.layer = this.game.level.defaultLayer + 2;
    }

    initialize() {
        super.initialize();

        let count = getRandomIntFromRange(this.#minNumOfPieces, this.#maxNumOfPieces);
        for (let index = 0; index < count; index++) {
            let pieceOffsetX = getRandomIntFromRange(-this.#minPieceWidth, this.#minPieceWidth);
            let pieceOffsetY = getRandomIntFromRange(-this.#minPieceHeight, this.#minPieceHeight);
            let radiusX = getRandomIntFromRange(this.#minPieceWidth, this.#maxPieceWidth);
            let radiusY = getRandomIntFromRange(this.#minPieceHeight, this.#maxPieceHeight);

            this.#pieces[index] = { pieceOffsetX, pieceOffsetY, radiusX, radiusY };
        }

        this.width = this.#maxPieceWidth * 3;
        this.height = this.#maxPieceHeight * 3;
    }

    update(delta) {
        super.update(delta);

        this.actionFlyAcross(delta, 40);

        if (this.x > this.game.level.levelWidth + (this.#maxPieceWidth * 2)) {
            this.readyForDeletion = true;
        }
    }

    drawToOffscreenCtx() {
        super.drawToOffscreenCtx();

        if (this.#pieces === undefined ||
            this.#pieces === null) {
            throw ('Invalid pieces array');
        }

        // this.offscreenCtx.fillStyle = 'rgba(0, 180, 0, 0.25)';
        // this.offscreenCtx.fillRect(0, 0, this.width, this.height);

        this.offscreenCtx.fillStyle = this.color;
        this.#pieces.forEach(piece => {
            this.offscreenCtx.beginPath();
            this.offscreenCtx.ellipse(piece.pieceOffsetX + (this.width / 2), piece.pieceOffsetY + (this.height / 2), piece.radiusX, piece.radiusY, 0, this.#startAngle, this.#endAngle);
            this.offscreenCtx.closePath();
            this.offscreenCtx.fill();
        });
    }
}