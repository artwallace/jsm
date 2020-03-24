import { gunbase } from './gunbase.js';
import { mortarshell2 } from './mortarshell2.js';

export class mortar extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.

    minAngleInDegrees = 50;

    minTimeBetweenShots = 50;//millisecs
    magazineSize = 1;
    ammoInMagazine = this.magazineSize;
    magazineReloadTime = 200;//millisecs

    constructor(game) {
        super(game, 0, 0, 0);

        this.minAngle = (-180 + this.minAngleInDegrees) * (Math.PI / 180);
        this.maxAngle = (-this.minAngleInDegrees) * (Math.PI / 180);
    }
    
    spawnBullet() {
        let b = new mortarshell2(this.game, this.muzzleX, this.muzzleY, this.angle);
        b.velocityX = -(this.muzzleX - this.game.level.mouseX) / 15;// / 100;
        b.velocityY = -(this.muzzleY - this.game.level.mouseY) / 15;// / 100;
        this.game.level.addActor(b);
    }
}