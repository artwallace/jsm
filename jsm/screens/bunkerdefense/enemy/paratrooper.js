import { actor2dbase } from '../../../engine/actor2dbase.js';
import { getRandomIntFromRange, checkIfRectOverlapsRect } from '../../../engine/utilities.js';

export class paratrooper extends actor2dbase {
    //TODO: Replace placeholder graphics with real ones.
    #startAngle = 0;
    #endAngle = Math.PI * 2;

    #chuteStartAngle = Math.PI * 1;
    #chuteEndAngle = Math.PI * 2;

    #color = 'black';
    #colorChute = 'gray';

    #radius = 5;
    #chuteRadius = 15;

    #chuteDist = this.#chuteRadius * 1.5;

    #freefallSpeedPerSec = 150;
    #parachureSpeedPerSec = 30;

    #chuteDeployed = false;
    #minChuteDeployDist = 150;
    #maxChuteDeployDist = 250;
    #chuteDeployDist = 0;
    #jumpOriginX = 0;
    #jumpOriginY = 0;

    constructor(game, x, y) {
        super(game, x, y, 0);

        this.#jumpOriginX = x;
        this.#jumpOriginY = y;



        this.heading = Math.PI * .5

        this.#chuteDeployDist = getRandomIntFromRange(this.#minChuteDeployDist, this.#maxChuteDeployDist);
    }

    update(delta) {
        super.update(delta);

        //TODO: handle landing on ground and marching towards the bunker.
        let speed = 0;
        if (this.#chuteDeployed) {
            speed = this.#parachureSpeedPerSec;
        }
        else {
            speed = this.#freefallSpeedPerSec;
        }

        this.y += speed / 1000 * delta;

        if (this.#chuteDeployed) {
            this.left = this.x - this.#chuteRadius;
            this.top = this.y - this.#chuteDist - this.#chuteRadius;
            this.right = this.left + this.#chuteRadius;
            this.bottom = this.y + this.#radius;

            this.width = this.#chuteRadius * 2;
            this.height = this.#radius + this.#chuteDist + this.#chuteRadius;
        }
        else {
            this.left = this.x - this.#radius;
            this.top = this.y - this.#radius;
            this.right = this.left + this.#radius;
            this.bottom = this.top + this.#radius;

            this.width = this.#radius * 2;
            this.height = this.#radius * 2;
        }

        let distFallen = this.y - this.#jumpOriginY;
        if (distFallen >= this.#chuteDeployDist) {
            this.#chuteDeployed = true;
        }

        let hitTheGround = false;

        if (this.left >= 0 &&
            this.right <= this.game.level.levelWidth &&
            this.bottom >= this.game.level.groundlevel) {
            hitTheGround = true;
        }

        if (hitTheGround ||
            !checkIfRectOverlapsRect(this.left, this.top, this.right, this.bottom, this.game.level.levelLeft, this.game.level.levelTop, this.game.level.levelRight, this.game.level.groundlevel)) {
            this.readyForDeletion = true;
        }
    }

    draw(interp) {
        super.draw(interp);

        if (this.#chuteDeployed) {
            this.game.view.ctx.lineWidth = 1;
            this.game.view.ctx.strokeStyle = 'lightgray';
            this.game.view.ctx.beginPath();
            this.game.view.ctx.moveTo(this.x, this.y);
            this.game.view.ctx.lineTo(this.x - this.#chuteRadius, this.y - this.#chuteDist);
            this.game.view.ctx.moveTo(this.x + this.#chuteRadius, this.y - this.#chuteDist);
            this.game.view.ctx.lineTo(this.x, this.y);
            this.game.view.ctx.closePath();
            this.game.view.ctx.stroke();
        }

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.#radius, this.#startAngle, this.#endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.#color;
        this.game.view.ctx.fill();

        if (this.#chuteDeployed) {
            this.game.view.ctx.beginPath();
            this.game.view.ctx.arc(this.x, this.y - this.#chuteDist, this.#chuteRadius, this.#chuteStartAngle, this.#chuteEndAngle);
            this.game.view.ctx.closePath();
            this.game.view.ctx.fillStyle = this.#colorChute;
            this.game.view.ctx.fill();
        }
    }

    drawdebug(interp) {
        if (this.game.debugInfoLevel >= 2) {
            this.game.view.ctx.fillStyle = 'rgba(0, 180, 0, 0.25)';
            this.game.view.ctx.fillRect(this.left, this.top, this.width, this.height);
        }
    }
}