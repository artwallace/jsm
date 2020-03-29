import { gunbase } from './gunbase.js';
import { aagunbullet } from './aagunbullet.js';

export class aagun extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.

    constructor(game) {
        super(game, 0, 0, 0);

        this.minAngleInDegrees = 0;
        this.minTimeBetweenShots = 50;//millisecs
        this.magazineSize = 30;
        this.ammoInMagazine = this.magazineSize;
        this.magazineReloadTime = 1500;//millisecs

        this.barrelCount = 2;
        this.maxBarrelCount = 4;

        this.barrel1X = 0;
        this.barrel2X = 0;

        this.minFiringDist = 50;
    }
    
    spawnBullet() {
        let b = new aagunbullet(this.game, this.muzzleX, this.muzzleY, this.angle);
        this.game.level.addActor(b);
    }
}