import { actor2dbase } from './actor2dbase.js';
import { checkIfPointIsInsideRect } from './utilities.js';

export class button2dbase extends actor2dbase {
    isHilighted = false;

    normalColor = '';
    hoverColor = '';
    clickedColor = '';

    textFont = '12px Arial';
    textColor = 'black';
    hoverTextColor = 'black';
    textAlign = 'center';
    textBaseline = 'middle';
    text = 'button';

    constructor(game, width, height, x, y) {
        super(game, x, y, 0);

        this.width = width;
        this.height = height;

        this.updatePosition();
    }

    update(delta) {
        super.update(delta);

        this.updatePosition();
        this.updateHighlighted();
    }

    updatePosition() {
        this.left = this.x - this.width / 2;
        this.top = this.y - this.height / 2;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    updateHighlighted() {
        if (this.game.level.mouseX === undefined ||
            this.game.level.mouseX === null ||
            Number.isNaN(this.game.level.mouseX) ||
            this.game.level.mouseY === undefined |
            this.game.level.mouseY === null ||
            Number.isNaN(this.game.level.mouseY)) {
                throw ('Invalid mouse coordinates.');
        }

        if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.left, this.top, this.right, this.bottom)) {
            if (!this.isHilighted) {
                this.isHilighted = true;
            }
        }
        else {
            this.isHilighted = false;
        }
    }

    draw(interp) {
        super.draw(interp);

        if (this.isHilighted) {
            this.game.view.ctx.fillStyle = this.hoverColor;
        }
        else {
            this.game.view.ctx.fillStyle = this.normalColor;
        }
        this.game.view.ctx.fillRect(this.left, this.top, this.width, this.height);

        this.game.view.ctx.font = this.textFont;
        if (this.isHilighted) {
            this.game.view.ctx.fillStyle = this.hoverTextColor;
        }
        else {
            this.game.view.ctx.fillStyle = this.textColor;
        }
        this.game.view.ctx.textAlign = this.textAlign;
        this.game.view.ctx.textBaseline = this.textBaseline;
        this.game.view.ctx.fillText(this.text, this.x, this.y);
    }
}