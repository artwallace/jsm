import { gamebase } from './gamebase.js';

export class loop {
    #game = null;
    #stop = false;

    #previousFrameTime = 0;
    #previousFrameTimeInSecs = 0;
    #currentFrameTime = 0;
    #currentFrameTimeInSecs = 0;
    #timeSinceLastFrame = 0;

    #maxFps = 0;
    #maxUpdatesPerSec = 0;

    constructor(game, maxFps) {
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

        // this.#maxFps = maxFps;
        // this.#timestep = millisec / maxFps;
        // this.#fps = maxFps;

        this.#game = game;
    }

    initialize() {
        this.#game.beginFrame.bind(this.#game);
        this.#game.endFrame.bind(this.#game);
        this.#game.update.bind(this.#game);
        this.#game.draw.bind(this.#game);
        this.#stop = false;
    }

    start() {
        this.#stop = false;
        this.setFrameTimes(Date.now(), true);
        this.requestAnimationFrame();
    }

    stop() {
        this.#stop = true;
    }

    beginFrame() {
        this.#game.beginFrame();
    }

    endFrame() {
        this.#game.endFrame();
    }

    update(delta) {
        if (!this.#game.stopRequested) {
            this.#game.preupdate(delta);
            this.#game.update(delta);
            this.#game.postupdate(delta);

            if (this.#game.stopRequested) {
                this.#game.stop();
            }
        }
    }

    draw(interp) {
        if (!this.#game.stopRequested) {
            this.#game.predraw(interp);
            this.#game.draw(interp);
            this.#game.postdraw(interp);
        }
    }

    animateFrameCallback(timestamp) {
        this.setFrameTimes(timestamp);

        if (this.#stop) {
            return;
        }

        this.beginFrame(timestamp, this.#delta);
        this.update(this.#timestep);
        this.draw(this.#delta / this.#timestep);
        this.endFrame(this.#fps);

        this.requestAnimationFrame();
    }

    requestAnimationFrame() {
        requestAnimationFrame(this.animateFrameCallback.bind(this));
    }

    setFrameTimes(timestamp, firstFrame = false) {
        if (!firstFrame) {
            this.#previousFrameTime = this.#currentFrameTime;
        }
        else {
            this.#previousFrameTime = timestamp;
        }
        this.#currentFrameTime = timestamp;
        this.#timeSinceLastFrame = this.#currentFrameTime - this.#previousFrameTime;
    }

    get game() {
        return this.#game;
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