// Adapted from:
// https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
// TODO: There seems to be a bug where you have to set the fps to double what you really want.

import { gamebase } from './gamebase.js';

const millisec = 1000;
const fpsHardMax = 240;

export class loop {
    #lastFrameTimeMs = 0;
    #delta = 0;
    #timestep = 0;
    #maxFps = 0;
    #fps = 0;
    #framesThisSecond = 0;
    #lastFpsUpdate = 0;
    #currentTime = 0;

    #stop = false;

    constructor(maxFps, game) {
        if (game === undefined ||
            game === null ||
            game instanceof gamebase !== true) {
            throw ('Invalid game');
        }

        if (maxFps === undefined ||
            maxFps === null ||
            Number.isNaN(maxFps) ||
            maxFps < 1 ||
            maxFps > 480 ||
            maxFps !== Math.round(maxFps)) {
            throw ('Invalid maxFps');
        }

        this.#maxFps = maxFps;
        this.#timestep = millisec / maxFps;
        this.#fps = maxFps;

        this.game = game;
    }

    initialize() {
        this.game.beginFrame.bind(this.game);
        this.game.endFrame.bind(this.game);
        this.game.update.bind(this.game);
        this.game.draw.bind(this.game);
        this.#stop = false;
    }

    start() {
        this.#stop = false;
        this.requestAnimationFrame();
    }

    stop() {
        this.#stop = true;
    }

    beginFrame() {
        this.game.beginFrame();
    }

    endFrame() {
        this.game.endFrame();
    }

    update(delta) {
        if (!this.game.stopRequested) {
            this.game.preupdate(delta);
            this.game.update(delta);
            this.game.postupdate(delta);

            if (this.game.stopRequested) {
                this.game.stop();
            }
        }
    }

    draw(interp) {
        if (!this.game.stopRequested) {
            this.game.predraw(interp);
            this.game.draw(interp);
            this.game.postdraw(interp);
        }
    }

    panic() {
        this.#delta = 0;
    }

    animateFrameCallback(timestamp) {
        if (this.#stop) {
            return;
        }

        this.#currentTime = timestamp;

        // Throttle the frame rate.    
        if (timestamp < this.#lastFrameTimeMs + (millisec / this.#maxFps)) {
            this.requestAnimationFrame();
            return;
        }

        this.#delta += timestamp - this.#lastFrameTimeMs;
        this.#lastFrameTimeMs = timestamp;

        this.beginFrame(timestamp, this.#delta);

        if (timestamp > this.#lastFpsUpdate + millisec) {
            // TODO: look up where these numbers come from.
            this.#fps = 0.25 * this.#framesThisSecond + 0.75 * this.#fps;
            this.#lastFpsUpdate = timestamp;
            this.#framesThisSecond = 0;
        }

        this.#framesThisSecond++;

        let numUpdateSteps = 0;
        while (this.#delta >= this.#timestep) {
            this.update(this.#timestep);
            this.#delta -= this.#timestep;
            if (++numUpdateSteps >= fpsHardMax) {
                this.panic();
                break;
            }
        }

        this.draw(this.#delta / this.#timestep);

        this.endFrame(this.#fps);

        this.requestAnimationFrame();
    }

    requestAnimationFrame() {
        requestAnimationFrame(this.animateFrameCallback.bind(this));
    }

    get currentTime() {
        return this.#currentTime;
    }

    get lastFrameTime() {
        return this.#lastFrameTimeMs;
    }

    get fps() {
        return this.#fps;
    }

    get maxFps() {
        return this.#maxFps;
    }
}