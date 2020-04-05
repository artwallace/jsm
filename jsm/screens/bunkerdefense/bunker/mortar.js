import { gunbase } from './gunbase.js';
import { mortarshell2 } from './mortarshell2.js';

export class mortar extends gunbase {
    //TODO: move non-generic stuff from base to here and other derived classes.

    constructor(game) {
        super(game, 0, 0, 0);

        this.minAngleInDegrees = 50;

        this.barrelLength = 25;
        this.thickness = 7;

        this.minTimeBetweenShots = 500;//millisecs
        this.magazineSize = 3;
        this.ammoInMagazine = this.magazineSize;
        this.magazineReloadTime = 1000;//millisecs

        this.minFiringDist = 100;
    }
    
    spawnBullet() {
        let b = new mortarshell2(this.game, this.muzzleX, this.muzzleY, this.angle);
        b.velocityX = -(this.muzzleX - this.game.level.mouseX) / 15;// / 100;
        b.velocityY = -(this.muzzleY - this.game.level.mouseY) / 15;// / 100;
        this.game.level.addActor(b);
    }
}