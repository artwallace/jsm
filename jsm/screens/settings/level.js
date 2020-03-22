import { level2dbase } from '../../engine/level2dbase.js';
import { background } from './background.js';
import { title } from './title.js';
import { f310 } from './f310.js';
import { backbutton } from './backbutton.js';

export class level extends level2dbase {
    backbutton;

    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.setDimenions();

        this.addActor(new background(this.game));
        this.addActor(new title(this.game));
        this.addActor(new f310(this.game));

        this.backbutton = new backbutton(this.game);
        this.addActor(this.backbutton);
    }

    update(delta) {
        super.update(delta);

        this.setDimenions();
    }

    setDimenions() {
        if (this.levelWidth !== this.game.view.viewWidth ||
            this.levelHeight !== this.game.view.viewHeight) {
            this.setlevelSize(this.game.view.viewWidth, this.game.view.viewHeight);
        }
    }
}