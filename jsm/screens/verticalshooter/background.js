import { actor2dbase } from '../../engine/actor2dbase.js';
import { checkIfPointIsInsideRect } from '../../engine/utilities.js';

export class background extends actor2dbase {
    gridSize = 100;
    gridColumns = 0;
    gridRows = 0;
    gridEvenColor = 'black';
    gridOffColor = 'white';
    gridHighlightColor = 'green';

    constructor(game, world) {
        super(game, world, 0, 0, 0);
        this.layer = this.world.minLayer;

        this.gridColumns = this.world.worldWidth / this.gridSize;
        this.gridRows = this.world.worldHeight / this.gridSize;

        // draw over entire world
        this.x = 0;
        this.y = 0;
        this.width = this.world.worldWidth;
        this.height = this.world.worldHeight;

        this.color = '#87CEEB';
    }

    // update(delta) {
    //     super.update(delta);
        
    //     this.gridColumns = this.world.worldWidth / this.gridSize;
    //     this.gridRows = this.world.worldHeight / this.gridSize;
    // }

    draw(interp) {
        super.draw(interp);

        // for (var col = 0; col < this.gridColumns; col++) {
        //     for (var row = 0; row < this.gridRows; row++) {
        //         this.drawSquare(col, row);
        //     }
        // }

        this.world.ctx.fillStyle = this.color;
        this.world.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawSquare(col, row) {
        let left = col * this.gridSize;
        let top = row * this.gridSize;
        let right = left + this.gridSize;
        let bottom = top + this.gridSize;
        
        if (checkIfPointIsInsideRect(this.world.mouseInWorldX, this.world.mouseInWorldY, left, top, right, bottom)) {
            this.world.ctx.fillStyle = this.gridHighlightColor;
        }
        else if ((col % 2 == 0 && row % 2 == 0) ||
            (col % 2 != 0 && row % 2 != 0)) {
                this.world.ctx.fillStyle = this.gridEvenColor;
        }
        else {
            this.world.ctx.fillStyle = this.gridOffColor;
        }
        
        this.world.ctx.fillRect(left, top, this.gridSize, this.gridSize);
    }
}