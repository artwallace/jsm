import { actor2dbase } from '../../../engine/actor2dbase.js';
import { getRandomIntFromRange } from '../../../engine/utilities.js';
import { paratrooper } from './paratrooper.js';

export class ju52 extends actor2dbase {
    imagePath = './screens/bunkerdefense/enemy/ju52-512.png';
    loaded = false;

    #speedCurrent = 0;
    #speedWhileJumping = -80;
    #speedWhileCruising = -150;
    #speedAcceleration = -10;

    #paratrooperCountLeft = 0;
    #paratrooperCountRight = 0;
    #jumpPadScreen = 100;
    #jumpPadBunker = 200;

    #paratroopers = []

    constructor(game) {
        super(game, 0, 0, 0);

        this.img = new Image();
        this.img.crossOrigin = 'anonymous';
        this.img.onload = this.onloaded.bind(this);
        this.img.src = this.imagePath;

        this.width = 512 / 5;
        this.height = 240 / 5;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
    }

    initialize() {
        super.initialize();

        //TODO: enforce a total minimum number of paratroopers, as empty planes do not make sense.
        //TODO: If the plane takes a lot of damage, the paratroopers should try to all jump before it goes down.
        this.#paratrooperCountLeft = getRandomIntFromRange(0, 3);
        this.#paratrooperCountRight = getRandomIntFromRange(0, 3);

        for (let index = 0; index < this.#paratrooperCountLeft; index++) {
            //const element = array[index];
            let p = new paratrooper(this.game);
            let preferredJumpPoint = 0;
        }
    }

    update(delta) {
        super.update(delta);

        //TODO: This is not correct. It should cruise to drop zone, then slow down, then speed up.
        if (this.#paratrooperCountLeft < 1 ||
            this.#paratrooperCountRight < 1) {
            this.#speedCurrent = this.#speedWhileCruising;
        }
        else {
            this.#speedCurrent = this.#speedWhileJumping;
        }

        this.actionFlyAcross(delta, this.#speed);

        if (this.x < -this.halfWidth) {
            this.readyForDeletion = true;
            return;
        }

        this.absOffsetX = this.x - this.halfWidth;
        this.absOffsetY = this.y - this.halfHeight;
    }

    draw(interp) {
        super.draw(interp);

        if (this.img === undefined ||
            this.img === null ||
            !this.loaded) {
            return;
        }

        this.game.view.ctx.drawImage(this.img, this.absOffsetX, this.absOffsetY, this.width, this.height);
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.game.debugInfoLevel >= 2) {
            this.game.view.ctx.fillStyle = 'rgba(0, 180, 0, 0.25)';
            this.game.view.ctx.fillRect(this.absOffsetX, this.absOffsetY, this.width, this.height);
        }

        if (this.game.debugInfoLevel >= this.game.debugInfoMaxLevel) {
            this.game.view.ctx.font = '10px Arial';
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
        }
    }

    dispose() {
        this.img = null;
        this.loaded = false;
        super.dispose();
    }

    onloaded() {
        this.loaded = true;
        this.img.onload = null;
    }
}