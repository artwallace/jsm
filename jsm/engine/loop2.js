import { gamebase } from './gamebase.js';

export class loop {
    #game = null;
    #stop = false;

    #maxFps = 0;
    #minimumTimeBetweenFrames = 0;

    #previousFrameHiresTimestamp = 0;
    #currentFrameHiresTimestamp = 0;
    #timeSinceLastFrame = 0;

    #previouFrameTimestampInSecs = 0;
    #currentFrameTimestampInSecs = 0;

    #framesThisSec = 0;
    #maxFpsStatEntriesToTrack = 120;
    #fpsStats = [];

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
        this.#minimumTimeBetweenFrames = 1000 / maxFps;

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
        this.setFrameTimes(window.performance.now(), true);
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

        // If not enough time has passed, skip all of this.
        if (this.#timeSinceLastFrame >= this.#minimumTimeBetweenFrames) {
            this.trackFps();
            this.beginFrame();
            this.update(this.#timeSinceLastFrame);
            this.draw(0);//TODO: remove interp?
            this.endFrame();
        }

        this.requestAnimationFrame();
    }

    requestAnimationFrame() {
        requestAnimationFrame(this.animateFrameCallback.bind(this));
    }

    setFrameTimes(timestamp, firstFrame = false) {
        let currentTimeInSecs = Date.now() / 1000 | 0;
        if (!firstFrame) {
            this.#previousFrameHiresTimestamp = this.#currentFrameHiresTimestamp;
            this.#previouFrameTimestampInSecs = this.#currentFrameTimestampInSecs;
        }
        else {
            this.#previousFrameHiresTimestamp = timestamp;
            this.#previouFrameTimestampInSecs = currentTimeInSecs;
        }

        let elapsed = timestamp - this.#previousFrameHiresTimestamp;

        if (elapsed >= this.#minimumTimeBetweenFrames) {
            this.#timeSinceLastFrame = elapsed;
            this.#currentFrameHiresTimestamp = timestamp;
            this.#currentFrameTimestampInSecs = currentTimeInSecs;
        }
    }

    trackFps() {
        if (this.#fpsStats === undefined ||
            this.#fpsStats === null) {
            throw ('Invalid FPS stats.');
        }

        let newFrame = false;
        if (this.#currentFrameTimestampInSecs !== this.#previouFrameTimestampInSecs) {
            newFrame = true;
        }

        if (!newFrame) {
            this.#framesThisSec++;
        }
        else {
            this.#fpsStats.push(this.#framesThisSec);
            if (this.#fpsStats.length > this.#maxFpsStatEntriesToTrack) {
                this.#fpsStats.shift();
            }
            this.#framesThisSec = 0;
        }
    }

    get game() {
        return this.#game;
    }

    get currentTime() {
        return this.#currentFrameHiresTimestamp;
    }

    get lastFrameTime() {
        return this.#previousFrameHiresTimestamp;
    }

    get fps() {
        if (this.#fpsStats === undefined ||
            this.#fpsStats === null) {
            throw ('Invalid FPS stats.');
        }

        if (this.#fpsStats.length === 0) {
            return 0;
        }

        return this.#fpsStats[this.#fpsStats.length - 1];
    }

    get fpsAvg() {
        if (this.#fpsStats === undefined ||
            this.#fpsStats === null) {
            throw ('Invalid FPS stats.');
        }

        if (this.#fpsStats.length === 0) {
            return 0;
        }

        let total = 0;
        for (var i = 0; i < this.#fpsStats.length; i++) {
            total += this.#fpsStats[i];
        }
        return total / this.#fpsStats.length;
    }

    get maxFps() {
        return this.#maxFps;
    }
}