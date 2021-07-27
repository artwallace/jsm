import { shellbase } from './engine/shellbase.js';
import { splash } from './screens/splash/splash.js';
//import { mainmenu } from './screens/mainmenu/mainmenu.js';

export class shell extends shellbase {
    game;
    mainmenuFactory = null;

    constructor() {
        super();
    }

    start() {
        import('./screens/mainmenu/mainmenu.js')
            .then(module => {
                this.mainmenuFactory = function (shell) { return module.mainmenu.factory(shell) };
            });
        //this.startMainMenu();
        this.startSplashScreen();
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
        else if (this.mainmenuFactory != null) {
            this.game = this.mainmenuFactory(this);
            // this.game.launchfunc = null;
            this.game.preinitialize();
            this.game.initialize();
            this.game.postinitialize();
            this.game.start();
        }
        else {
            //this.startMainMenu();
            this.startSplashScreen();
        }
    }

    // startMainMenu() {
    //     this.game = new mainmenu(this);
    //     this.game.preinitialize();
    //     this.game.initialize();
    //     this.game.postinitialize();
    //     this.game.start();
    // }

    startSplashScreen() {
        this.game = new splash(this);
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