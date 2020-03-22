import { gameitembase } from './gameitembase.js';

export class actor2dbase extends gameitembase {
    readyForDeletion = false;

    x = 0;
    y = 0;
    heading = 0;
    width = 0;
    height = 0;
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    layer = 0;

    isVisible = true;

    //TODO: need to define what xy represent (topleft, center or remain actor-specific).
    constructor(game, x, y, heading) {
        super(game);

        if (x === undefined ||
            x === null ||
            Number.isNaN(x) ||
            y === undefined ||
            y === null ||
            Number.isNaN(y) ||
            heading === undefined ||
            heading === null ||
            Number.isNaN(heading)) {
            throw ('Invalid coordinates');
        }

        this.x = x;
        this.y = y;
        this.heading = heading;

        this.layer = this.game.level.defaultLayer;
    }

    update(delta) { }

    draw(interp) { }

    drawdebug(interp) { }

    //TODO: add simple positioning methods, eg setPstnAtCenterOfBox, etc

    actionFlyAcross(delta, direction) {
        // This is level x coordinates per second.
        // positive is left to right.
        // negatiuve is right to left.
        this.x += direction / 1000 * delta;
    }

    actionFlyStraightAlongHeading(delta) {
        //TODO: make movement based on physics
        this.x += Math.cos(this.heading) * delta;
        this.y += Math.sin(this.heading) * delta;
    }

    actionFlyStraightToPoint(delta, startX, starty, destX, destY) {
        //TODO: make movement based on physics and time
        let reachedPoint = false;

        let dirX = 0; //Can be -1, 0 or +1
        let dirY = 0; //Can be -1, 0 or +1

        if (destX < startX) {
            dirX = -1;
        }
        else {
            dirX = 1;
        }

        if (destY < starty) {
            dirY = -1;
        }
        else {
            dirY = 1;
        }

        this.x += delta * Math.cos(this.heading);
        this.y += delta * Math.sin(this.heading);

        let reachedX = false;
        let reachedY = false;

        if (dirX == -1 && this.x <= destX) {
            reachedX = true;
        } else if (dirX == 1 && this.x >= destX) {
            reachedX = true;
        }
        else if (dirX == 0) {
            reachedX = true;
        }

        if (dirY == -1 && this.y <= destY) {
            reachedY = true;
        } else if (dirY == 1 && this.y >= destY) {
            reachedY = true;
        }
        else if (dirY == 0) {
            reachedY = true;
        }

        if (reachedX && reachedY) {
            reachedPoint = true;
        }

        return reachedPoint;
    }

    actionFlyWithPhysics(delta, mass, velocity, friction, gravity) {
        //TODO: Not correct yet

        velocity = velocity * friction;

        this.x += Math.cos(this.heading) * (this.velocity * delta);//friction * delta * 
        this.y += (Math.sin(this.heading) * (this.velocity * delta) + (gravity * mass));//  * friction * 

        return velocity;
    }

    actionFlyWithPhysicsExperimental(delta, mass, velocityX, velocityY, frontalProjection, dragCoefficient, gravity, fluidDensity) {
        // https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
        // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        // -0.5 means applies in the opposite direction of movement
        let Fx = -0.5 * dragCoefficient * frontalProjection * fluidDensity * velocityX * velocityX * velocityX / Math.abs(velocityX);
        let Fy = -0.5 * dragCoefficient * frontalProjection * fluidDensity * velocityY * velocityY * velocityY / Math.abs(velocityY);

        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);

        // Calculate acceleration ( F = ma )
        let ax = Fx / mass;
        let ay = gravity + (Fy / mass);

        // Integrate to get velocity
        velocityX += ax / delta;//frameRate, delta probably isn't correct here!!!!!!!!
        velocityY += ay / delta;//frameRate, delta probably isn't correct here!!!!!!!!

        // Integrate to get position
        this.x += velocityX;// * delta;// * 100frameRate, delta probably isn't correct here!!!!!!!!
        this.y += velocityY;// * delta;// * 100frameRate, delta probably isn't correct here!!!!!!!!

        return { velocityX, velocityY };
    }

    actionRotateInPlace(delta) {
        //this.x -= 1;
    }
}