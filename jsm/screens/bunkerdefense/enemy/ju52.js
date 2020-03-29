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
    #jumpPadBunker = 300;
    #jumpLeftMinPoint = 0;
    #jumpLeftMaxPoint = 0;
    #jumpRightMinPoint = 0;
    #jumpRightMaxPoint = 0;
    #jumpPointLeft = 0;
    #jumpPointRight = 0;

    #lastJumpTime = 0;
    #minTimeBetweenJumps = 1000;

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

        this.#jumpLeftMinPoint = this.game.level.levelLeft + this.#jumpPadScreen;
        this.#jumpLeftMaxPoint = this.game.level.bunker.x - this.#jumpPadBunker;
        this.#jumpRightMinPoint = this.game.level.bunker.x + this.#jumpPadBunker;
        this.#jumpRightMaxPoint = this.game.level.levelRight - this.#jumpPadScreen;

        //TODO: enforce a total minimum number of paratroopers, as empty planes do not make sense.
        //TODO: If the plane takes a lot of damage, the paratroopers should try to all jump before it goes down.
        this.#paratrooperCountLeft = getRandomIntFromRange(0, 3);
        this.#paratrooperCountRight = getRandomIntFromRange(0, 3);

        this.#jumpPointLeft = getRandomIntFromRange(this.#jumpLeftMinPoint, this.#jumpLeftMaxPoint);
        this.#jumpPointRight = getRandomIntFromRange(this.#jumpRightMinPoint, this.#jumpRightMaxPoint);

        // for (let index = 0; index < this.#paratrooperCountLeft; index++) {
        //     //const element = array[index];
        //     let p = new paratrooper(this.game);
        //     let preferredJumpPoint = 0;
        // }
    }

    update(delta) {
        super.update(delta);

        //TODO: This is not correct. It should cruise to drop zone, then slow down, drop everyone, then speed back up.
        if (this.#paratrooperCountLeft < 1 &&
            this.#paratrooperCountRight < 1) {
            this.#speedCurrent = this.#speedWhileCruising;
        }
        else {
            this.#speedCurrent = this.#speedWhileJumping;
        }

        this.actionFlyAcross(delta, this.#speedCurrent);

        if (this.x < -this.halfWidth) {
            this.readyForDeletion = true;
            return;
        }

        this.absOffsetX = this.x - this.halfWidth;
        this.absOffsetY = this.y - this.halfHeight;

        //TODO: This is all really basic now. Just trying to get something going.
        let time = this.game.loop.currentTime;

        if (this.x >= this.#jumpRightMinPoint &&
            this.x <= this.#jumpRightMaxPoint &&
            this.x <= this.#jumpPointRight &&
            this.#paratrooperCountRight > 0 &&
            time - this.#lastJumpTime >= this.#minTimeBetweenJumps) {
            this.#lastJumpTime = time;
            this.#paratrooperCountRight--;
            this.game.level.addActor(new paratrooper(this.game, this.x, this.y));
        }
        else if (this.x >= this.#jumpLeftMinPoint &&
            this.x <= this.#jumpLeftMaxPoint &&
            this.x <= this.#jumpPointLeft &&
            this.#paratrooperCountLeft > 0 &&
            time - this.#lastJumpTime >= this.#minTimeBetweenJumps) {
            this.#lastJumpTime = time;
            this.#paratrooperCountLeft--;
            this.game.level.addActor(new paratrooper(this.game, this.x, this.y));
        }

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

            if (this.#paratrooperCountRight > 0 &&
                this.x > this.game.level.bunker.x &&
                this.x >= this.#jumpRightMinPoint &&
                this.x <= this.#jumpRightMaxPoint) {
                this.game.view.ctx.lineWidth = 1;
                this.game.view.ctx.strokeStyle = 'orange';
                this.game.view.ctx.beginPath();
                this.game.view.ctx.moveTo(this.x, this.y);
                this.game.view.ctx.lineTo(this.x, this.y + 30);
                this.game.view.ctx.lineTo(this.#jumpPointRight, this.y + 30);
                this.game.view.ctx.moveTo(this.x, this.y);
                this.game.view.ctx.closePath();
                this.game.view.ctx.stroke();
            }
            else if (this.#paratrooperCountLeft > 0 &&
                this.x < this.game.level.bunker.x &&
                this.x >= this.#jumpLeftMinPoint &&
                this.x <= this.#jumpLeftMaxPoint) {
                this.game.view.ctx.lineWidth = 1;
                this.game.view.ctx.strokeStyle = 'orange';
                this.game.view.ctx.beginPath();
                this.game.view.ctx.moveTo(this.x, this.y);
                this.game.view.ctx.lineTo(this.x, this.y + 30);
                this.game.view.ctx.lineTo(this.#jumpPointLeft, this.y + 30);
                this.game.view.ctx.moveTo(this.x, this.y);
                this.game.view.ctx.closePath();
                this.game.view.ctx.stroke();
            }
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