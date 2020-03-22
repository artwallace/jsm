import { gunbase } from './gunbase.js';
import { cannonshell } from './cannonshell.js';

export class cannon extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.

    barrelLength = 50;

    minAngleInDegrees = 30;

    thickness = 10;
    portOffset = 14;

    minTimeBetweenShots = 1500;//millisecs
    magazineSize = 4;
    ammoInMagazine = this.magazineSize;
    magazineReloadTime = 4000;//millisecs

    constructor(game) {
        super(game, 0, 0, 0);

        this.minAngle = (-180 + this.minAngleInDegrees) * (Math.PI / 180);
        this.maxAngle = (-this.minAngleInDegrees) * (Math.PI / 180);
    }

    spawnBullet() {
        let b = new cannonshell(this.game, this.muzzleX, this.muzzleY, this.angle, this.game.level.mouseX, this.game.level.mouseY);
        this.game.level.addActor(b);
    }
}