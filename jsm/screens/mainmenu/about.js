import { button2dbase } from '../../engine/button2dbase.js';

export class about extends button2dbase {
    #row = 0;

    constructor(game, row) {
        super(game, 450, 100, 0, 0);

        if (row === undefined ||
            row === null ||
            Number.isNaN(row) ||
            row !== Math.round(row)) {
            throw ('Invalid row');
        }

        this.text = 'https://github.com/artwallace/jsm';
        this.#row = row;

        this.textFont = '24px Arial';
        this.textColor = 'blue';
        this.hoverTextColor = 'blue';
        this.normalColor = '#ffffff00';
        this.hoverColor = '#ffffff00';

        //OLDER browsers do not support these
        this.game.view.ctx.font = this.textFont;
        let metrics = this.game.view.ctx.measureText(this.text);
        this.width = metrics.width;
        this.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        if (this.width === undefined ||
            this.width === null ||
            Number.isNaN(this.width)) {
            this.width = 350;
        }
        if (this.height === undefined ||
            this.height === null ||
            Number.isNaN(this.height)) {
            this.height = 25;
        }

        this.setDimenions();
    }

    update(delta) {
        super.update(delta);

        this.setDimenions();

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted) {
            window.open(this.text, '_blank');
        }
    }

    setDimenions() {
        this.x = this.game.level.levelCenterX;
        this.y = this.game.level.levelHeight / 5 + 100 * (this.#row + 1);
    }

    draw(interp) {
        super.draw(interp);

        //TODO: should probably make this standard in button2base, or create linkbutton2dbase.
        if (this.isHilighted) {
            this.game.view.ctx.lineWidth = 1;
            this.game.view.ctx.strokeStyle = this.hoverTextColor;
            this.game.view.ctx.beginPath();
            this.game.view.ctx.moveTo(this.left, this.bottom);
            this.game.view.ctx.lineTo(this.right, this.bottom);
            this.game.view.ctx.closePath();
            this.game.view.ctx.stroke();
        }
    }
}