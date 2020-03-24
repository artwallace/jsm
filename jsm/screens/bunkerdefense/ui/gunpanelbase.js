import { actor2dbase } from '../../../engine/actor2dbase.js';
import { checkIfPointIsInsideRect } from '../../../engine/utilities.js';

export const panelPosition = {
    LEFT: 'left',
    MIDDLE: 'middle',
    RIGHT: 'right'
}

export class gunpanelbase extends actor2dbase {
    position = panelPosition.MIDDLE;

    color = '#707070';
    hoverColor = '#696969';
    width = 150;
    height = 70;
    #horizontalPadding = 15;

    title = '';

    isHilighted = false;

    constructor(game, position) {
        super(game, 0, 0, 0);

        if (position === undefined ||
            position === null ||
            panelPosition[position] === null) {
            throw ('Invalid position');
        }

        this.layer = this.game.level.maxLayer - 1;

        this.position = position;

        this.calcPosition();
    }

    update(delta) {
        super.update(delta);
        this.updateHighlighted();
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
            this.game.view.ctx.fillStyle = this.color;
        }
        this.game.view.ctx.fillRect(this.left, this.top, this.width, this.height);

        this.game.view.ctx.font = '20px Odibee Sans';
        this.game.view.ctx.fillStyle = 'black';
        this.game.view.ctx.textAlign = 'center';
        this.game.view.ctx.textBaseline = 'top';
        this.game.view.ctx.fillText(this.title, this.x, this.top + 5);
    }

    calcPosition() {
        switch (this.position) {
            case panelPosition.LEFT:
                this.x = this.game.level.dashboard.x - (this.width) - this.#horizontalPadding;
                break;
            case panelPosition.MIDDLE:
                this.x = this.game.level.dashboard.x;
                break;
            case panelPosition.RIGHT:
                this.x = this.game.level.dashboard.x + (this.width) + this.#horizontalPadding;
                break;
        }
        this.y = this.game.level.dashboard.y;

        this.left = this.x - (this.width / 2);
        this.top = this.y - (this.height / 2);
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }
}