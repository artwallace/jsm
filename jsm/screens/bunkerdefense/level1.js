import { level2dbase } from '../../engine/level2dbase.js';
import { background } from './scenery/background.js';
import { ground } from './scenery/ground.js';
import { dashboard } from './ui/dashboard.js';
import { levelinfo } from './ui/levelinfo.js';
import { bunker } from './bunker/bunker.js';
import { aagun } from './bunker/aagun.js';
import { cannon } from './bunker/cannon.js';
import { mortar } from './bunker/mortar.js';
import { crosshair } from './bunker/crosshair.js';
import { cloud } from './scenery/cloud.js';
import { cloudback } from './scenery/cloudback.js';
import { ju52 } from './enemy/ju52.js';
import { sun } from './scenery/sun.js';
import { mountain } from './scenery/mountain.js';
import { roundtree } from './scenery/roundtree.js';
import { pyramidaltree } from './scenery/pyramidaltree.js';
import { ovaltree } from './scenery/ovaltree.js';
import { palmtree } from './scenery/palmtree.js';
import { cappedtree } from './scenery/cappedtree.js';
import { backbutton } from './ui/backbutton.js';
import { aagunpanel } from './ui/aagunpanel.js';
import { cannonpanel } from './ui/cannonpanel.js';
import { mortarpanel } from './ui/mortarpanel.js';
import { getRandomIntFromRange, checkIfPointIsInsideRect } from '../../engine/utilities.js';
import { forest } from './scenery/forest.js';

export class level1 extends level2dbase {
    groundlevel = 0;

    constructor(game) {
        super(game);
        this.title = 'Level 1';
    }

    preinitialize() {
        super.preinitialize();
        this.setlevelSize(2000, 1000);
    }
    initialize() {
        super.initialize();

        this.addActor(new background(this.game));

        this.ground = new ground(this.game);
        this.addActor(this.ground);

        this.dashboard = new dashboard(this.game);
        this.addActor(this.dashboard);

        this.calcGroundLevel();

        let mountains = getRandomIntFromRange(0, 4);
        for (let index = 0; index < mountains; index++) {
            this.addActor(new mountain(this.game));
        }

        this.game.levelinfo = new levelinfo(this.game);
        this.addActor(this.game.levelinfo);

        this.bunker = new bunker(this.game);
        this.addActor(this.bunker);

        this.bunkergun = new aagun(this.game);
        this.addActor(this.bunkergun);

        this.crosshair = new crosshair(this.game);
        this.addActor(this.crosshair);

        this.backbutton = new backbutton(this.game);
        this.addActor(this.backbutton);

        this.addActor(new aagunpanel(this.game));
        this.addActor(new cannonpanel(this.game));
        this.addActor(new mortarpanel(this.game));

        this.addActor(new sun(this.game));

        let clouds = getRandomIntFromRange(4, 8);
        for (let index = 0; index < clouds; index++) {
            this.spawnCloud(0 + 100, this.levelWidth - 100, 50, 300);
        }

        this.spawnForests();

        this.spawnRandomJunkForTesting = true;
    }

    update(delta) {
        super.update(delta);

        if (checkIfPointIsInsideRect(this.mouseX, this.mouseY, this.levelLeft, this.levelTop, this.levelRight, this.dashboard.top)) {
            this.game.view.canvas.style.cursor = 'none';
        }
        else {
            this.game.view.canvas.style.cursor = 'auto';
        }

        //TODO: determine if this is ever going to change.
        // this.calcGroundLevel();

        if (this.spawnRandomJunkForTesting) {
            let readyToSpawnCloud = getRandomIntFromRange(1, 1000);
            if (readyToSpawnCloud > 996) {
                this.spawnCloud(-210, -200, 50, 300);
            }

            let readyToSpawnJu52 = getRandomIntFromRange(1, 1000);
            if (readyToSpawnJu52 > 998) {
                this.spawnJu52(this.levelWidth + 100, this.levelWidth + 150, 50, 320);
            }
        }

        //TODO: most of these should be moved to the actors. Maybe not junkForTesting
        if (this.game.keyboardDown) {
            switch (this.game.keyboardDownEvent.key) {
                case 'u':
                    this.bunker.upgrade();
                    break;
                case 'g':
                    this.switchGuns();
                    break;
                case 't':
                    this.spawnRandomJunkForTesting = !this.spawnRandomJunkForTesting;
                    break;
            }
        }
    }

    stop() {
        this.game.view.canvas.style.cursor = 'auto';
    }

    spawnCloud(minX, maxX, minY, maxY) {
        let x = getRandomIntFromRange(minX, maxX);
        let y = getRandomIntFromRange(minY, maxY)
        let cloud1 = new cloud(this.game, x, y);
        this.addActor(cloud1);

        // let cloudback1 = new cloudback(this.game, cloud1);
        // cloudback1.initialize();
        // this.addActor(cloudback1);
    }

    spawnJu52(minX, maxX, minY, maxY) {
        let ju52a = new ju52(this.game);
        ju52a.x = getRandomIntFromRange(minX, maxX);
        ju52a.y = getRandomIntFromRange(minY, maxY);
        this.addActor(ju52a);
    }

    spawnForests() {
        let worldPadding = 20;
        let bunkerPadding = 150;

        let leftMin = worldPadding;
        let leftMax = this.bunker.x - bunkerPadding;
        let rightMin = this.bunker.x + bunkerPadding;
        let rightMax = this.levelWidth - worldPadding;

        //TODO: this should be specified by the level's theme, eg desert, etc
        let treetypes = [
            { name: roundtree.name, function(game, minX, maxX, groundY) { return roundtree.roundTreeAcrossRangeFactory(game, minX, maxX, groundY); } },
            { name: pyramidaltree.name, function(game, minX, maxX, groundY) { return pyramidaltree.pyramidalTreeAcrossRangeFactory(game, minX, maxX, groundY); } },
            { name: ovaltree.name, function(game, minX, maxX, groundY) { return ovaltree.ovalTreeAcrossRangeFactory(game, minX, maxX, groundY); } },
            { name: cappedtree.name, function(game, minX, maxX, groundY) { return cappedtree.cappedTreeAcrossRangeFactory(game, minX, maxX, groundY); } },
            // { name: palmtree.name, function(game, minX, maxX, groundY) { return palmtree.palmTreeAcrossRangeFactory(game, minX, maxX, groundY); } }
        ];

        this.addActor(new forest(this.game, getRandomIntFromRange(10, 30), treetypes, leftMin, leftMax, this.defaultLayer - 1));
        this.addActor(new forest(this.game, getRandomIntFromRange(10, 30), treetypes, leftMin, leftMax, this.defaultLayer + 1));
        this.addActor(new forest(this.game, getRandomIntFromRange(10, 30), treetypes, rightMin, rightMax, this.defaultLayer - 1));
        this.addActor(new forest(this.game, getRandomIntFromRange(10, 30), treetypes, rightMin, rightMax, this.defaultLayer + 1));
    }

    //TODO: Move to a request model so that this happens with consistent timing.
    switchGuns() {
        this.bunkergun.readyForDeletion = true;

        if (this.bunkergun instanceof aagun) {
            this.bunkergun = new cannon(this.game);
        }
        else if (this.bunkergun instanceof cannon) {
            this.bunkergun = new mortar(this.game);
        }
        else {
            this.bunkergun = new aagun(this.game);
        }

        this.addActor(this.bunkergun);
    }

    //TODO: Move to a request model so that this happens with consistent timing.
    switchToAagun() {
        this.bunkergun.readyForDeletion = true;
        this.bunkergun = new aagun(this.game);
        this.addActor(this.bunkergun);
    }

    //TODO: Move to a request model so that this happens with consistent timing.
    switchToCannon() {
        this.bunkergun.readyForDeletion = true;
        this.bunkergun = new cannon(this.game);
        this.addActor(this.bunkergun);
    }

    //TODO: Move to a request model so that this happens with consistent timing.
    switchToMortar() {
        this.bunkergun.readyForDeletion = true;
        this.bunkergun = new mortar(this.game);
        this.addActor(this.bunkergun);
    }

    calcGroundLevel() {
        //TODO: Need a real solution to having actors that depend on having info about other actors.
        this.groundlevel = this.levelHeight - this.ground.height - this.dashboard.height;
    }
}