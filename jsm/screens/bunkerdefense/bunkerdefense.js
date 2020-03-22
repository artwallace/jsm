import { gamebase } from '../../engine/gamebase.js';
import { view2dscaledtofit } from '../../engine/view2dscaledtofit.js';
import { level1 } from './level1.js';

export class bunkerdefense extends gamebase {
    constructor(shell, maxFps) {
        super(shell, maxFps);

        this.debugInfoLevel = this.debugInfoMaxLevel;

        //TODO: This order matters for now.
        //TODO: view requires size info from the level.
        //TODO: A technique or pattern must be added for objects that depend on other objects.
        //TODO: Levels and actors will also need to know about other actors, viewports, positions relative to screen, etc.
        this.level = new level1(this);
        this.view = new view2dscaledtofit(this);
    }

    static factory(shell) {
        return new bunkerdefense(shell, 120);
    }
}