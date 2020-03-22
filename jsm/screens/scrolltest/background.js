import { actor2dbase } from '../../engine/actor2dbase.js';
import { checkIfPointIsInsideRect } from '../../engine/utilities.js';

export class background extends actor2dbase {
    gridSize = 100;
    gridColumns = 0;
    gridRows = 0;
    gridEvenColor = 'black';
    gridOffColor = 'white';
    gridHighlightColor = 'green';

    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.minLayer;

        this.setDimenions();
    }

    update(delta) {
        super.update(delta);
    }

    setDimenions() {
        this.x = 0;
        this.y = 0;
        this.width = this.game.level.levelWidth;
        this.height = this.game.level.levelHeight;

        this.gridColumns = this.game.level.levelWidth / this.gridSize;
        this.gridRows = this.game.level.levelHeight / this.gridSize;
    }

    draw(interp) {
        super.draw(interp);

        for (var col = 0; col < this.gridColumns; col++) {
            for (var row = 0; row < this.gridRows; row++) {
                this.drawSquare(col, row);
            }
        }
    }

    drawSquare(col, row) {
        let left = col * this.gridSize;
        let top = row * this.gridSize;
        let right = (col + 1) * this.gridSize;
        let bottom = (row + 1) * this.gridSize;

        if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, left, top, right - 1, bottom - 1)) {
            this.game.view.ctx.fillStyle = this.gridHighlightColor;
        }
        else if ((col % 2 == 0 && row % 2 == 0) ||
            (col % 2 != 0 && row % 2 != 0)) {
            this.game.view.ctx.fillStyle = this.gridEvenColor;
        }
        else {
            this.game.view.ctx.fillStyle = this.gridOffColor;
        }

        this.game.view.ctx.fillRect(left, top, this.gridSize, this.gridSize);
    }
}