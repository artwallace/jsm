import { actor2dbase } from '../../../engine/actor2dbase.js';
import { getRandomIntFromRange } from '../../../engine/utilities.js';

//TODO: Vary the color
export class cloudback extends actor2dbase {
    pieces = [];
    minNumOfPieces = 6;
    maxNumOfPieces = 10;
    minPieceWidth = 50;
    maxPieceWidth = 120;
    minPieceHeight = 20;
    maxPieceHeight = 30;
    startAngle = 0;
    endAngle = Math.PI * 2;
    color = 'rgba(255, 255, 255, 0.75)';

    constructor(game, following) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.defaultLayer - 2;
        this.following = following;
        this.follow();
    }

    initialize() {
        let count = getRandomIntFromRange(this.minNumOfPieces, this.maxNumOfPieces);
        for (let index = 0; index < count; index++) {
            let pieceOffsetX = getRandomIntFromRange(-this.minPieceWidth, this.minPieceWidth);
            let pieceOffsetY = getRandomIntFromRange(-this.minPieceHeight, this.minPieceHeight);
            let radiusX = getRandomIntFromRange(this.minPieceWidth, this.maxPieceWidth);
            let radiusY = getRandomIntFromRange(this.minPieceHeight, this.maxPieceHeight);

            this.pieces[index] = { pieceOffsetX, pieceOffsetY, radiusX, radiusY };
        }
    }

    update(delta) {
        super.update(delta);

        this.follow();

        if (this.following.readyForDeletion) {
            this.readyForDeletion = true;
        }
    }

    follow() {
        this.x = this.following.x;
        this.y = this.following.y;
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.fillStyle = this.color;
        this.pieces.forEach(piece => {
            this.game.view.ctx.beginPath();
            this.game.view.ctx.ellipse(this.x + piece.pieceOffsetX, this.y + piece.pieceOffsetY, piece.radiusX, piece.radiusY, 0, this.startAngle, this.endAngle);
            this.game.view.ctx.closePath();
            this.game.view.ctx.fill();
        });
    }
}