import { actor2dbase } from '../../../engine/actor2dbase.js';
import { mortarexplosion } from './mortarexplosion.js';
import { checkIfRectOverlapsRect, clamp } from '../../../engine/utilities.js';

export class mortarshell2 extends actor2dbase {
    startAngle = 0;
    endAngle = Math.PI * 2;
    radius = 5;
    width = 10;
    height = 10;
    color = 'black';

    mass = 1;
    velocity = 2;

    //TODO: move to game or physics class
    gravity = 0.2;
    friction = 0.98;
    physicsFluidDensity = 1.22; //rho air (kg / m3)
    physicsGravity = 9.81; //ag earth
    dragCoefficient = 0.47; //Cd
    frontalProjection = Math.PI * (this.width / 2) * (this.width / 2) / (10000); //A

    velocityX = 0;
    velocityY = 0;

    constructor(game, startX, startY, startHeading) {
        super(game, startX, startY, startHeading);
    }

    update(delta) {
        super.update(delta);

        let detonate = false;

        //TODO: This is totally dependent on framerate. fix this!
        let newVelocity = this.actionFlyWithPhysicsExperimental(delta, this.mass, this.velocityX, this.velocityY, this.frontalProjection, this.dragCoefficient, this.physicsGravity, this.physicsFluidDensity);
        this.velocityX = newVelocity.velocityX;
        this.velocityY = newVelocity.velocityY;

        this.left = this.x - this.radius;
        this.top = this.y - this.radius;
        this.right = this.left + this.radius;
        this.bottom = this.top + this.radius;

        if (this.left >= 0 &&
            this.right <= this.game.level.levelWidth &&
            this.bottom >= this.game.level.groundlevel) {
            detonate = true;
        }

        if (detonate) {
            let explosion = new mortarexplosion(this.game, this.x, this.game.level.groundlevel, 0);
            this.game.level.addActor(explosion);
        }

        if (detonate ||
            !checkIfRectOverlapsRect(this.left, this.top, this.right, this.bottom, this.game.level.levelLeft, this.game.level.levelTop, this.game.level.levelRight, this.game.level.groundlevel)) {
            this.readyForDeletion = true;
        }

        // if ((this.x + this.radius < 0) ||
        //     (this.x + this.radius > this.game.level.levelWidth) ||
        //     (this.y + this.radius < 0) ||
        //     (this.y + this.radius > this.game.level.groundlevel)
        // ) {
        //     this.readyForDeletion = true;
        // }
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color;
        this.game.view.ctx.fill();
        //this.game.view.ctx.lineWidth = 1;
        //this.game.view.ctx.strokeStyle = this.color;
        //this.game.view.ctx.stroke();
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.game.debugInfoLevel >= this.game.debugInfoMaxLevel) {
            this.game.view.ctx.font = '10px Arial';
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.fillText(Math.round(this.x) + ', ' + Math.round(this.y), this.x + 5, this.y + 5);
        }
    }
}