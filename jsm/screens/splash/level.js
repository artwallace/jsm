import { level2dbase } from '../../engine/level2dbase.js';
//import { background } from './background.js';
import { title } from './title.js';

export class level extends level2dbase {
    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.setDimenions();

        //this.addActor(new background(this.game));
        this.addActor(new title(this.game));
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