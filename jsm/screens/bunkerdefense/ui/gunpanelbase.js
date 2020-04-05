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
    width = 160;
    height = 80;
    #horizontalPadding = 10;

    title = '';

    isHilighted = false;
    isUpgradeL1Hilighted = false;
    isUpgradeL2Hilighted = false;
    isUpgradeR1Hilighted = false;
    isUpgradeR2Hilighted = false;

    key = '';
    keyCapitalized = '';

    #upgradePadOuterSide = 4;
    #upgradePadInnerSide = 2;
    #upgradePadTop = 26;
    #upgradeWidth = (this.width / 2) - this.#upgradePadOuterSide - this.#upgradePadInnerSide;
    #upgradeHeight = (this.height - this.#upgradePadTop - this.#upgradePadOuterSide - this.#upgradePadInnerSide - this.#upgradePadInnerSide) / 2;

    #upgradeL1Left = 0;
    #upgradeL1Top = 0;
    #upgradeL1Right = 0;
    #upgradeL1Bottom = 0;

    #upgradeL2Left = 0;
    #upgradeL2Top = 0;
    #upgradeL2Right = 0;
    #upgradeL2Bottom = 0;

    #upgradeR1Left = 0;
    #upgradeR1Top = 0;
    #upgradeR1Right = 0;
    #upgradeR1Bottom = 0;

    #upgradeR2Left = 0;
    #upgradeR2Top = 0;
    #upgradeR2Right = 0;
    #upgradeR2Bottom = 0;

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

        if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.#upgradeL1Left, this.#upgradeL1Top, this.#upgradeL1Right, this.#upgradeL1Bottom)) {
            this.isHilighted = false;
            this.isUpgradeL1Hilighted = true;
            this.isUpgradeL2Hilighted = false;
            this.isUpgradeR1Hilighted = false;
            this.isUpgradeR2Hilighted = false;
        }
        else if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.#upgradeL2Left, this.#upgradeL2Top, this.#upgradeL2Right, this.#upgradeL2Bottom)) {
            this.isHilighted = false;
            this.isUpgradeL1Hilighted = false;
            this.isUpgradeL2Hilighted = true;
            this.isUpgradeR1Hilighted = false;
            this.isUpgradeR2Hilighted = false;
        }
        else if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.#upgradeR1Left, this.#upgradeR1Top, this.#upgradeR1Right, this.#upgradeR1Bottom)) {
            this.isHilighted = false;
            this.isUpgradeL1Hilighted = false;
            this.isUpgradeL2Hilighted = false;
            this.isUpgradeR1Hilighted = true;
            this.isUpgradeR2Hilighted = false;
        }
        else if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.#upgradeR2Left, this.#upgradeR2Top, this.#upgradeR2Right, this.#upgradeR2Bottom)) {
            this.isHilighted = false;
            this.isUpgradeL1Hilighted = false;
            this.isUpgradeL2Hilighted = false;
            this.isUpgradeR1Hilighted = false;
            this.isUpgradeR2Hilighted = true;
        }
        else if (checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.left, this.top, this.right, this.bottom)) {
            this.isHilighted = true;
            this.isUpgradeL1Hilighted = false;
            this.isUpgradeL2Hilighted = false;
            this.isUpgradeR1Hilighted = false;
            this.isUpgradeR2Hilighted = false;
        }
        else {
            this.isHilighted = false;
            this.isUpgradeL1Hilighted = false;
            this.isUpgradeL2Hilighted = false;
            this.isUpgradeR1Hilighted = false;
            this.isUpgradeR2Hilighted = false;
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

        this.game.view.ctx.font = '14px Arial';
        this.game.view.ctx.fillStyle = '#222222';
        this.game.view.ctx.textAlign = 'right';
        this.game.view.ctx.textBaseline = 'top';
        this.game.view.ctx.fillText(this.key + ' key', this.right - 5, this.top + 5);

        this.drawUpgradeL1();
        this.drawUpgradeL2();
        this.drawUpgradeR1();
        this.drawUpgradeR2();
        // if (this.isHilighted) {
        //     this.game.view.ctx.fillStyle = 'red';
        // }
        // else {
        //     this.game.view.ctx.fillStyle = 'blue';
        // }
        // this.game.view.ctx.fillRect(this.#upgradeL2Left, this.#upgradeL2Top, this.#upgradeWidth, this.#upgradeHeight);
        // this.game.view.ctx.fillRect(this.#upgradeR1Left, this.#upgradeR1Top, this.#upgradeWidth, this.#upgradeHeight);
        // this.game.view.ctx.fillRect(this.#upgradeR2Left, this.#upgradeR2Top, this.#upgradeWidth, this.#upgradeHeight);
    }

    drawUpgradeL1() {
        if (this.isUpgradeL1Hilighted) {
            this.game.view.ctx.fillStyle = 'red';
        }
        else {
            this.game.view.ctx.fillStyle = 'blue';
        }
        this.game.view.ctx.fillRect(this.#upgradeL1Left, this.#upgradeL1Top, this.#upgradeWidth, this.#upgradeHeight);
    }

    drawUpgradeL2() {
        if (this.isUpgradeL2Hilighted) {
            this.game.view.ctx.fillStyle = 'red';
        }
        else {
            this.game.view.ctx.fillStyle = 'blue';
        }
        this.game.view.ctx.fillRect(this.#upgradeL2Left, this.#upgradeL2Top, this.#upgradeWidth, this.#upgradeHeight);
    }

    drawUpgradeR1() {
        if (this.isUpgradeR1Hilighted) {
            this.game.view.ctx.fillStyle = 'red';
        }
        else {
            this.game.view.ctx.fillStyle = 'blue';
        }
        this.game.view.ctx.fillRect(this.#upgradeR1Left, this.#upgradeR1Top, this.#upgradeWidth, this.#upgradeHeight);
    }

    drawUpgradeR2() {
        if (this.isUpgradeR2Hilighted) {
            this.game.view.ctx.fillStyle = 'red';
        }
        else {
            this.game.view.ctx.fillStyle = 'blue';
        }
        this.game.view.ctx.fillRect(this.#upgradeR2Left, this.#upgradeR2Top, this.#upgradeWidth, this.#upgradeHeight);
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

        this.#upgradeL1Left = this.x - this.#upgradePadInnerSide - this.#upgradeWidth;
        this.#upgradeL1Top = this.top + this.#upgradePadTop;
        this.#upgradeL1Right = this.x - this.#upgradePadInnerSide;
        this.#upgradeL1Bottom = this.#upgradeL1Top + this.#upgradeHeight;

        this.#upgradeL2Left = this.x - this.#upgradePadInnerSide - this.#upgradeWidth;
        this.#upgradeL2Top = this.bottom - this.#upgradePadOuterSide - this.#upgradeHeight;
        this.#upgradeL2Right = this.x - this.#upgradePadInnerSide;
        this.#upgradeL2Bottom = this.bottom - this.#upgradePadOuterSide;

        this.#upgradeR1Left = this.x + this.#upgradePadInnerSide;
        this.#upgradeR1Top = this.top + this.#upgradePadTop;
        this.#upgradeR1Right = this.#upgradeR1Left + this.#upgradeWidth;
        this.#upgradeR1Bottom = this.#upgradeL1Top + this.#upgradeHeight;

        this.#upgradeR2Left = this.x + this.#upgradePadInnerSide;
        this.#upgradeR2Top = this.bottom - this.#upgradePadOuterSide - this.#upgradeHeight;
        this.#upgradeR2Right = this.#upgradeR2Left + this.#upgradeWidth;
        this.#upgradeR2Bottom = this.bottom - this.#upgradePadOuterSide;
    }
}