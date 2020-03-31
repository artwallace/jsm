import { gunbase } from './gunbase.js';
import { cannonshell } from './cannonshell.js';

export class cannon extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.

    constructor(game) {
        super(game, 0, 0, 0);

        this.barrelLength = 50;

        this.minAngleInDegrees = 30;

        this.thickness = 10;
        this.portOffset = 14;

        this.minTimeBetweenShots = 1500;//millisecs
        this.magazineSize = 4;
        this.ammoInMagazine = this.magazineSize;
        this.magazineReloadTime = 4000;//millisecs

        this.minFiringDist = 200;
    }

    spawnBullet() {
        let b = new cannonshell(this.game, this.muzzleX, this.muzzleY, this.angle, this.game.level.mouseX, this.game.level.mouseY);
        this.game.level.addActor(b);
    }
}