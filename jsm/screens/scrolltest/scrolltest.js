import { gamebase } from '../../engine/gamebase.js';
import { view2dscrollable } from '../../engine/view2dscrollable.js';
import { level } from './level.js';

export class scrolltest extends gamebase {
    constructor(shell, maxFps) {
        super(shell, maxFps);

        this.debugInfoLevel = this.debugInfoMaxLevel;

        this.view = new view2dscrollable(this);
        this.level = new level(this);
    }

    static factory(shell) {
        return new scrolltest(shell, 120);
    }
}