import { level2dbase } from '../../engine/level2dbase.js';
import { background } from './background.js';
// import { title } from './title.js';
// import { backbutton } from './backbutton.js';
import { clamp } from '../../engine/utilities.js';

export class level extends level2dbase {
    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.setlevelSize(6000, 3000);

        this.addActor(new background(this.game));
        // this.addActor(new title(this.game));
        // this.addActor(new f310(this.game));

        // this.backbutton = new backbutton(this.game);
        // this.addActor(this.backbutton);
    }

    mouseDownHandler(event) {
        super.mouseDownHandler(event);

        this.focusOntoPoint(this.mouseX, this.mouseY);
    }

    focusOntoPoint(x, y) {
        //TODO: not correct at all!!!!!!!!!!!!!!!!!!
        let fX = clamp(x, this.levelLeft, this.levelRight - this.game.view.viewWidthInLevelCoordinates)
        let fY = clamp(y, this.levelTop, this.levelBottom - this.game.view.viewHeightInLevelCoordinates)

        this.game.view.levelOriginInViewX = -fX;
        this.game.view.levelOriginInViewY = -fY;
    }
}