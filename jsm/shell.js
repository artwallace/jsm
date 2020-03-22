import { shellbase } from './engine/shellbase.js';
import { mainmenu } from './screens/mainmenu/mainmenu.js';

export class shell extends shellbase {
    game;

    constructor() {
        super();
    }

    start() {
        this.startMainMenu();
    }

    gameEnding() {
        this.game.dispose();

        if (this.game.launchfunc !== undefined &&
            this.game.launchfunc !== null) {
            this.game = this.game.launchfunc(this);
            this.game.launchfunc = null;
            this.game.preinitialize();
            this.game.initialize();
            this.game.postinitialize();
            this.game.start();
        }
        else {
            this.startMainMenu();
        }
    }

    startMainMenu() {
        this.game = new mainmenu(this, 60);
        this.game.preinitialize();
        this.game.initialize();
        this.game.postinitialize();
        this.game.start();
    }
}

// Alternate start method
// export function startshell() {
//     let s = new shell();
//     s.start();
// }

let s = new shell();
s.start();