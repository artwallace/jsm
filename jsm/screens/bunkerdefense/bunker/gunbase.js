import { actor2dbase } from '../../../engine/actor2dbase.js';
import { calcAngleInRadians, getPointFromAngle, convertFromDegreesToRadians, checkIfPointIsInsideRect } from '../../../engine/utilities.js';

export class gunbase extends actor2dbase {
    //TODO: move non-generic stuff to derived classes.

    isInFiringMode = false;
    timeOfLastShot = 0;
    minTimeBetweenShots = 0;//millisecs
    magazineSize = 0;
    ammoInMagazine = 0;
    ammoPerFire = 1;
    magazineReloadTime = 0;
    reloading = false;
    reloadStartTime = 0;

    //bunkerGunRecoilPerShotInDegrees = 0.1,
    //bunkerGunRecoilLimit = 1.0,
    barrelLength = 20;
    barrelBaseX = 0;
    barrelBaseY = 0;
    muzzleX = 0;
    muzzleY = 0;
    thickness = 5;
    portOffset = 8;
    angle = 0;
    minAngleInDegrees = 20;
    minAngle = 0;
    maxAngle = 0;
    angleToMouse = 0;

    debugMinMaxColor = 'red';
    debugAimColor = 'green';
    debugLineWidth = 1;

    constructor(game) {
        super(game, 0, 0, 0);

        this.minAngle = (-180 + this.minAngleInDegrees) * (Math.PI / 180);
        this.maxAngle = (-this.minAngleInDegrees) * (Math.PI / 180);
        this.angle = convertFromDegreesToRadians(270);
    }

    update(delta) {
        super.update(delta);

        this.checkReload();

        this.barrelBaseX = this.game.level.bunker.x;
        this.barrelBaseY = this.game.level.bunker.y - this.game.level.bunker.radius + this.portOffset;

        this.angleToMouse = calcAngleInRadians(this.barrelBaseX, this.barrelBaseY, this.game.level.mouseX, this.game.level.mouseY);

        if (this.angleToMouse >= this.minAngle &&
            this.angleToMouse <= this.maxAngle) {
            this.angle = this.angleToMouse;
        }
        else if (this.angleToMouse >= -Math.PI &&
            this.angleToMouse <= this.minAngle) {
            this.angle = this.minAngle
        }
        else if (this.angleToMouse < 0 &&
            this.angleToMouse >= this.maxAngle) {
            this.angle = this.maxAngle
        }

        this.muzzleX = this.barrelBaseX + this.barrelLength * Math.cos(this.angle);
        this.muzzleY = this.barrelBaseY + this.barrelLength * Math.sin(this.angle);

        if (!this.isInFiringMode &&
            this.game.mouseDown &&
            this.game.mouseDownEvent.button === 0 &&
            checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.game.level.levelLeft, this.game.level.levelTop, this.game.level.levelRight, this.game.level.dashboard.top)) {
            this.isInFiringMode = true;
        }
        else if (this.isInFiringMode &&
            this.game.mouseUp &&
            this.game.mouseUpEvent.button === 0) {
            this.isInFiringMode = false;
        }

        if (this.isInFiringMode &&
            !checkIfPointIsInsideRect(this.game.level.mouseX, this.game.level.mouseY, this.game.level.levelLeft, this.game.level.levelTop, this.game.level.levelRight, this.game.level.dashboard.top)) {
            this.isInFiringMode = false;
        }

        if (this.isInFiringMode) {
            this.fire();
        }
    }

    draw(interp) {
        super.draw(interp);

        this.game.view.ctx.beginPath();
        this.game.view.ctx.moveTo(this.barrelBaseX, this.barrelBaseY);
        this.game.view.ctx.lineTo(this.muzzleX, this.muzzleY);
        this.game.view.ctx.lineWidth = this.thickness;
        this.game.view.ctx.strokeStyle = 'black';
        this.game.view.ctx.stroke();
    }

    drawdebug(interp) {
        super.drawdebug(interp);

        if (this.game.debugInfoLevel >= 2) {
            //TODO: hopefully that's offscreen. come up with something better.
            let projectDistanceToBeOffCanvas = this.game.level.levelHeight + this.game.level.levelWidth;

            let { x: minX, y: minY } = getPointFromAngle(this.barrelBaseX, this.barrelBaseY, this.minAngle, projectDistanceToBeOffCanvas);
            let { x: maxX, y: maxY } = getPointFromAngle(this.barrelBaseX, this.barrelBaseY, this.maxAngle, projectDistanceToBeOffCanvas);
            let { x: aimX, y: aimY } = getPointFromAngle(this.barrelBaseX, this.barrelBaseY, this.angle, projectDistanceToBeOffCanvas);

            this.game.view.ctx.lineWidth = this.debugLineWidth;
            this.game.view.ctx.strokeStyle = this.debugMinMaxColor;


            this.game.view.ctx.beginPath();
            // min angle
            this.game.view.ctx.moveTo(this.barrelBaseX, this.barrelBaseY);
            this.game.view.ctx.lineTo(minX, minY);
            // max angle
            this.game.view.ctx.moveTo(this.barrelBaseX, this.barrelBaseY);
            this.game.view.ctx.lineTo(maxX, maxY);
            this.game.view.ctx.closePath();
            this.game.view.ctx.stroke();

            // gun aim
            this.game.view.ctx.strokeStyle = this.debugAimColor;
            this.game.view.ctx.beginPath();
            this.game.view.ctx.moveTo(this.barrelBaseX, this.barrelBaseY);
            this.game.view.ctx.lineTo(aimX, aimY);
            this.game.view.ctx.closePath();
            this.game.view.ctx.stroke();
        }
    }

    fire() {
        if (this.reloading) {
            return;
        }
        else if (this.ammoInMagazine < 1) {
            this.reloadBegin();
            return;
        }

        let time = this.game.loop.getCurrentTime();
        if (time - this.timeOfLastShot >= this.minTimeBetweenShots) {
            this.timeOfLastShot = time;
            this.ammoInMagazine -= this.ammoPerFire;
            this.spawnBullet();
        }
    }

    spawnBullet() { }

    reloadBegin() {
        if (this.reloading ||
            this.ammoInMagazine == this.magazineSize) {
            return;
        }

        this.reloading = true;
        this.reloadStartTime = this.game.loop.getCurrentTime();
        this.ammoInMagazine = 0;
        this.checkReload();
    }

    checkReload() {
        if (this.reloading) {
            let time = this.game.loop.getCurrentTime();
            if (time - this.reloadStartTime >= this.magazineReloadTime) {
                this.reload();
            }
        }
    }

    reload() {
        this.reloadStartTime = 0;
        this.reloading = false;
        this.ammoInMagazine = this.magazineSize;
    }

    status() {
        let time = this.world.loop.getCurrentTime();

        let status = 'Ammo: ' + this.ammoInMagazine + ' / ' + this.magazineSize;
        status += ', ';
        status += 'Reloading: ' + this.reloading;
        if (this.reloading) {
            status += ', Time: ';
            status += time - this.reloadStartTime;
        }

        return status;
    }
}