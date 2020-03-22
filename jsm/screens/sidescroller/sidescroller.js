import { gamebase } from '../../engine/gamebase.js';
// import { world2dzoomedheight } from '../../engine/world2dzoomedheight.js';
// import { world2dfixedheight } from '../../engine/world2dfixedheight.js';
import { background } from './background.js';

export class sidescroller extends gamebase {
    constructor(shell, maxFps) {
        super(shell);

        this.world = new world2dzoomedheight(maxFps, this, 5000, 700, 1600);
    }

    static factory(shell) {
        return new sidescroller(shell, 120);
    }

    initialize() {
        super.initialize();

        this.world.debugInfoLevel = this.world.debugInfoMaxLevel;

        this.world.mousePstnStaleAfter = 2000; //2 secs

        this.backgroundActor = new background(this, this.world);
        this.world.addActor(this.backgroundActor);
    }

    update(delta) {
        super.update(delta);

        this.world.moveCameraToFollowMouse(delta);
    }

    onKeyDown() {
        super.onKeyDown();

        switch (event.key) {
            case 'b':
                this.stop();
                break;
        }
    }
}