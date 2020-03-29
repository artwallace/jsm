import { gunbase } from './gunbase.js';
import { aagunbullet } from './aagunbullet.js';

export class aagun extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.

    

    minTimeBetweenShots = 50;//millisecs
    magazineSize = 30;
    ammoInMagazine = this.magazineSize;
    magazineReloadTime = 1500;//millisecs

    barrelCount = 2;
    maxBarrelCount = 4;

    constructor(game) {
        super(game, 0, 0, 0);

        //TODO: use util func
        //TODO: code duplicated in base class
        // this.minAngle = (-180 + this.minAngleInDegrees) * (Math.PI / 180);
        // this.maxAngle = (-this.minAngleInDegrees) * (Math.PI / 180);

        this.minAngleInDegrees = -2;
        this.barrel1X = 0;
        this.barrel2X = 0;
    }

    initialize() {
        super.initialize();
    }
    
    spawnBullet() {
        let b = new aagunbullet(this.game, this.muzzleX, this.muzzleY, this.angle);
        this.game.level.addActor(b);
    }
}