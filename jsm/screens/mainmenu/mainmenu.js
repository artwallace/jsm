import { gamebase } from '../../engine/gamebase.js';
import { view2dunscaledclipped } from '../../engine/view2dunscaledclipped.js';
import { level } from './level.js';

export class mainmenu extends gamebase {
    launchfunc = null;

    constructor(shell) {
        super(shell);

        this.debugInfoLevel = this.debugInfoDefaultLevel;

        this.view = new view2dunscaledclipped(this);
        this.level = new level(this);
    }

    static factory(shell) {
        return new mainmenu(shell);
    }
}