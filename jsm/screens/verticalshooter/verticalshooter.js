import { gamebase } from '../../engine/gamebase.js';
// import { world2dzoomedwidth } from '../../engine/world2dzoomedwidth.js';
// import { world2dfixedwidth } from '../../engine/world2dfixedwidth.js';
import { background } from './background.js';
import { ship } from './ship.js';

export class verticalshooter extends gamebase {
    constructor(shell) {
        super(shell);

        this.world = new world2dzoomedwidth(this, 1000, 5000, 1400);
    }

    static factory(shell) {
        return new verticalshooter(shell);
    }

    initialize() {
        super.initialize();

        this.world.debugInfoLevel = this.world.debugInfoMaxLevel;

        this.world.mousePstnStaleAfter = 2000; //2 secs

        //TODO: Switch to focus instead of manipulating the camera.
        // Start at the bottom of the world.
        this.world.cameraX = 0;
        this.world.cameraY = this.world.worldVisibleHeight - this.world.worldHeight;

        this.background = new background(this, this.world);
        this.world.addActor(this.background);

        this.ship = new ship(this, this.world, this.world.worldWidth / 2, this.world.worldHeight - 200);
        this.world.addActor(this.ship);
    }

    update(delta) {
        super.update(delta);

        //this.world.moveCameraToFollowMouse(delta);
    }

    onKeyDown() {
        super.onKeyDown();

        switch (event.key) {
            case 'b':
                this.stop();
                break;
            case 'w':
                if (this.ship.y > this.world.worldHeight - 250) {
                    this.ship.y -= 3;
                }
                else {
                    this.world.cameraY += 3;
                }
                break;
            case 's':
                if (this.ship.y < this.world.worldVisibleBottom - 50) {
                    this.ship.y += 2;
                }
                break;
            case 'a':
                this.ship.x -= 5;
                break;
            case 'd':
                this.ship.x += 5;
                break;
        }
    }
}