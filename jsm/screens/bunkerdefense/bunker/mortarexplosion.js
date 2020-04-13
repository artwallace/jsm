import { actor2dbase } from '../../../engine/actor2dbase.js';
// import { calcAngleInRadians, getPointFromAngle } from '../../engine/utilities.js';

export class mortarexplosion extends actor2dbase {
    startAngle = Math.PI * 1;
    endAngle = Math.PI * 2;
    width = 1;
    height = 1;
    radius = 1;
    color5 = 'black';
    radius5 = 30;
    color4 = 'red';
    radius4 = 25;
    color3 = 'orange';
    radius3 = 20;
    color2 = 'yellow';
    radius2 = 15;
    color1 = 'white';
    radius1 = 10;
    duration = 1000;//millisecs
    percent = 0;
    scale = 0;

    constructor(game, startX, startY, startHeading) {
        super(game, startX, startY, startHeading);

        this.startTime = this.game.loop.currentTime;
    }

    update(delta) {
        super.update(delta);

        let time = this.game.loop.currentTime;
        this.percent = (time - this.startTime) / this.duration;
        this.scale = 1 - this.percent;

        if (time - this.startTime >= this.duration) {
            this.readyForDeletion = true;
        }
    }

    draw() {
        super.draw();

        if (this.readyForDeletion) {
            return;
        }

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius5 * this.scale, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color5;
        this.game.view.ctx.fill();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius4 * this.scale, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color4;
        this.game.view.ctx.fill();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius3 * this.scale, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color3;
        this.game.view.ctx.fill();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius2 * this.scale, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color2;
        this.game.view.ctx.fill();

        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius1 * this.scale, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.fillStyle = this.color1;
        this.game.view.ctx.fill();
    }

    drawdebug() {
        super.drawdebug();

        if (this.game.debugInfoLevel >= this.game.debugInfoMaxLevel) {
            this.game.view.ctx.font = '20px Arial';
            this.game.view.ctx.fillStyle = 'red';
            this.game.view.ctx.textBaseline = 'alphabetic';
            this.game.view.ctx.fillText(this.percent.toFixed(2), this.x + 5, this.y + 5);
        }
    }
}