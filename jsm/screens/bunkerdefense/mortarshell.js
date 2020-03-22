import { actor2dbase } from '../../engine/actor2dbase.js';

export class mortarshell extends actor2dbase {
    startAngle = 0;
    endAngle = Math.PI * 2;
    width = 1;
    height = 1;
    radius = 1;
    color = 'black';

    mass = 1;
    velocity = 2;

    //TODO: move to game or physics class
    gravity = 0.2;
    friction = 0.98;
    physicsFluidDensity = 1.22; //rho air (kg / m3)
    physicsGravity = 9.81; //ag earth

    constructor(game, startX, startY, startHeading) {
        super(game, startX, startY, startHeading);
    }

    update(delta) {
        super.update(delta);

        // this.actionFlyStraightAlongHeading(delta);
        this.velocity = this.actionFlyWithPhysics(delta, this.mass, this.velocity, this.friction, this.gravity);

        if ((this.x + (this.width / 2) < 0) ||
            (this.x + (this.width / 2) > this.game.level.levelWidth) ||
            (this.y + (this.height / 2) < 0) ||
            (this.y - (this.height / 2) > this.game.groundlevel)
        ) {
            this.readyForDeletion = true;
        }
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