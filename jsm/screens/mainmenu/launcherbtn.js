import { button2dbase } from '../../engine/button2dbase.js';

//TODO: this is just quick-n-dirty.
// Partial refers to screens that are a WIP.
// Outofdate refers to screens that are not even a WIP.
// Enabled refers to screens that are converted to new system.
export const btnStates = {
    DISABLED: 'disabled',
    OUTOFDATE: 'outofdate',
    PARTIALLYENABLED: 'partial',
    ENABLED: 'enabled'
}

export const btnPosition = {
    LEFT: 'left',
    MIDDLE: 'middle',
    RIGHT: 'right'
}

export class launcherbtn extends button2dbase {
    row = 0;
    position = btnPosition.MIDDLE;

    state;

    launchfunc = null;

    colorEnabled = 'green';
    colorPartiallyEnabled = '#005000';
    colorOutOfDate = 'black';
    colorDisabled = 'red';

    constructor(game, row, position, name, btnstate, launchfunc) {
        super(game, 450, 75, 0, 0);

        if (row === undefined ||
            row === null ||
            Number.isNaN(row) ||
            row !== Math.round(row)) {
            throw ('Invalid row');
        }

        if (position === undefined ||
            position === null ||
            !(position[position] !== null)) {
            throw ('Invalid position');
        }

        if (name === undefined ||
            name === null) {
            throw ('Invalid name');
        }

        if (btnstate === undefined ||
            btnstate === null ||
            !(btnStates[btnstate] !== null)) {
            throw ('Invalid btnstate');
        }

        if (launchfunc === undefined ||
            launchfunc === null ||
            !(launchfunc instanceof Function)) {
            throw ('Invalid launchfunc');
        }

        this.row = row;
        this.position = position;

        this.text = name;

        this.state = btnstate;

        this.launchfunc = launchfunc;

        this.normalColor = '#303030';
        this.hoverColor = '#404040';

        this.textFont = '48px Odibee Sans';
    }

    update(delta) {
        super.update(delta);

        let colAdj = 0;
        switch (this.position) {
            case btnPosition.MIDDLE:
                break;
            case btnPosition.LEFT:
                colAdj = ((this.width / 2) + 10) * -1;
                break;
            case btnPosition.RIGHT:
                colAdj = ((this.width / 2) + 10);
                break;
            default:
                break;
        }

        this.x = this.game.level.levelCenterX + colAdj;
        this.y = this.game.level.levelHeight / 5 + 100 * (this.row + 1);

        switch (this.state) {
            case btnStates.PARTIALLYENABLED:
                this.textColor = this.colorPartiallyEnabled;
                break;
            case btnStates.ENABLED:
                this.textColor = this.colorEnabled;
                break;
            case btnStates.OUTOFDATE:
                this.textColor = this.colorOutOfDate;
                break;
            default:
                this.textColor = this.colorDisabled;
                break;
        }
        this.hoverTextColor = this.textColor;

        if (this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0 &&
            this.isHilighted &&
            this.state !== btnStates.OUTOFDATE) {
            this.game.launchfunc = this.launchfunc;
            this.game.requestStop();
        }
    }
}