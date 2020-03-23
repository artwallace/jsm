import { level2dbase } from '../../engine/level2dbase.js';
import { background } from './background.js';
import { title } from './title.js';
import { about } from './about.js';
import { launcherbtn, btnStates, btnPosition } from './launcherbtn.js';
import { bunkerdefense } from '../bunkerdefense/bunkerdefense.js';
import { scrolltest } from '../scrolltest/scrolltest.js';
import { sidescroller } from '../sidescroller/sidescroller.js';
import { verticalshooter } from '../verticalshooter/verticalshooter.js';
import { settings } from '../settings/settings.js';


export class level extends level2dbase {
    launcherBtns = [];

    constructor(game) {
        super(game);
    }

    initialize() {
        super.initialize();

        this.setDimenions();

        this.addActor(new background(this.game));
        this.addActor(new title(this.game));

        this.addLauncherBtn(
            new launcherbtn(this.game, 0, btnPosition.MIDDLE, 'Bunker Defense demo', btnStates.ENABLED,
                function (shell) { return bunkerdefense.factory(shell); }));

        this.addLauncherBtn(
            new launcherbtn(this.game, 1, btnPosition.MIDDLE, 'Ships demo', btnStates.PARTIALLYENABLED,
                function (shell) { return scrolltest.factory(shell); }));

        this.addLauncherBtn(
            new launcherbtn(this.game, 2, btnPosition.MIDDLE, 'Sidescroller demo', btnStates.OUTOFDATE,
                function (shell) { return sidescroller.factory(shell); }));

        this.addLauncherBtn(
            new launcherbtn(this.game, 3, btnPosition.MIDDLE, 'Vertical shooter demo', btnStates.OUTOFDATE,
                function (shell) { return verticalshooter.factory(shell); }));

        this.addLauncherBtn(
            new launcherbtn(this.game, 4, btnPosition.MIDDLE, 'Settings', btnStates.ENABLED,
                function (shell) { return settings.factory(shell); }));

        this.addActor(new about(this.game, 5));
    }

    addLauncherBtn(btn) {
        if (btn === undefined ||
            btn === null ||
            btn instanceof launcherbtn !== true) {
            throw ('Invalid launcher button.');
        }

        this.launcherBtns.push(btn);
        this.addActor(btn);
    }

    update(delta) {
        super.update(delta);

        this.setDimenions();

        // if (this.world.gamepadIsButtonDown()) {
        //     this.game.stop();
        // }
    }

    setDimenions() {
        if (this.levelWidth !== this.game.view.viewWidth ||
            this.levelHeight !== this.game.view.viewHeight) {
            this.setlevelSize(this.game.view.viewWidth, this.game.view.viewHeight);
        }
    }
}