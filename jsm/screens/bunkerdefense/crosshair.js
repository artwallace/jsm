import { actor2dbase } from '../../engine/actor2dbase.js';
import { checkIfRectOverlapsRect, clamp } from '../../engine/utilities.js';

export class crosshair extends actor2dbase {
    radius = 30;
    startAngle = 0;
    endAngle = 2 * Math.PI;

    thickness = 3;
    color = '#444444';

    halfLength = 20;
    spaceFromCenter = 10;

    topStart = 0;
    topEnd = 0;
    bottomStart = 0;
    bottomEnd = 0;

    leftStart = 0;
    leftEnd = 0;
    rightStart = 0;
    rightEnd = 0;
    
    constructor(game) {
        super(game, 0, 0, 0);
        this.layer = this.game.level.maxLayer - 3;
    }

    update(delta) {
        super.update(delta);

        this.x = clamp(this.game.level.mouseX, this.game.level.levelLeft, this.game.level.levelRight);
        this.y = clamp(this.game.level.mouseY, this.game.level.levelTop, this.game.level.dashboard.top);

        this.height = (this.halfLength + this.spaceFromCenter) * 2;
        this.width = (this.halfLength + this.spaceFromCenter) * 2;

        this.topStart = this.y - this.halfLength - this.spaceFromCenter;
        this.topEnd = this.y - this.spaceFromCenter;
        this.bottomStart = this.y + this.halfLength + this.spaceFromCenter;
        this.bottomEnd = this.y + this.spaceFromCenter;

        this.leftStart = this.x - this.halfLength - this.spaceFromCenter;
        this.leftEnd = this.x - this.spaceFromCenter;
        this.rightStart = this.x + this.halfLength + this.spaceFromCenter;
        this.rightEnd = this.x + this.spaceFromCenter;

        this.left = this.leftStart;
        this.top = this.topStart;
        this.right = this.rightStart;
        this.bottom = this.bottomStart;

        //This is no longer possible because we are clamping to level.
        // if (checkIfRectOverlapsRect(this.left, this.top, this.right, this.bottom, this.game.level.levelLeft, this.game.level.levelTop, this.game.level.levelRight, this.game.level.dashboard.top)) {
        //     this.isVisible = true;
        // }
        // else {
        //     this.isVisible = false;
        // }
    }

    draw(interp) {
        super.draw(interp);
        
        //top
        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.x, this.topStart);
        this.game.view.ctx.lineTo(this.x, this.topEnd);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = this.color;
        this.game.view.ctx.stroke();

        //bottom
        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.x, this.bottomStart);
        this.game.view.ctx.lineTo(this.x, this.bottomEnd);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = this.color;
        this.game.view.ctx.stroke();
        
        //left
        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.leftStart, this.y);
        this.game.view.ctx.lineTo(this.leftEnd, this.y);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = this.color;
        this.game.view.ctx.stroke();

        //right
        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.rightStart, this.y);
        this.game.view.ctx.lineTo(this.rightEnd, this.y);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = this.color;
        this.game.view.ctx.stroke();

        //circle
        this.game.view.ctx.beginPath();
        this.game.view.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        this.game.view.ctx.closePath();
        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = this.color;
        this.game.view.ctx.stroke();
    }
}