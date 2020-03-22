import { gamebase } from '../../engine/gamebase.js';
import { view2dunscaledclipped } from '../../engine/view2dunscaledclipped.js';
import { level } from './level.js';

export class splash extends gamebase {
    //TODO: See if dynamic import is implemented properly here.
    #starttime = 0;
    #minimumTimeToDisplay = 500;

    constructor(shell, maxFps) {
        super(shell, maxFps);

        this.debugInfoLevel = this.debugInfoMaxLevel;

        this.view = new view2dunscaledclipped(this);
        this.level = new level(this);

        this.#starttime = this.loop.getCurrentTime();
    }

    update() {
        super.update();

        let time = this.loop.getCurrentTime();
        let elapsedTime = time - this.#starttime;
        if (this.shell.mainmenuFactory != undefined &&
            this.shell.mainmenuFactory != null &&
            elapsedTime >= this.#minimumTimeToDisplay) {
            this.requestStop();
        }
    }
}