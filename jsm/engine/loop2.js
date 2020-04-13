import { gamebase } from './gamebase.js';

export class loop {
    #game = null;
    #stop = false;

    #previousFrameTimestampHires = 0;
    #currentFrameTimestampHires = 0;
    #timeSinceLastFrame = 0;

    #previousFrameTimestampInSecs = 0;
    #currentFrameTimestampInSecs = 0;

    #framesThisSec = 0;
    #maxFpsStatEntriesToTrack = 120;
    #fpsStats = [];
    #fpsFirstFrameComplete = false;

    constructor(game) {
        if (game === undefined ||
            game === null ||
            game instanceof gamebase !== true) {
            throw ('Invalid game');
        }

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
        this.setInitialFrameTimes();
        this.updateFrameTimes(this.#previousFrameTimestampHires);
        this.trackFps();
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

    draw() {
        if (!this.#game.stopRequested) {
            this.#game.predraw();
            this.#game.draw();
            this.#game.postdraw();
        }
    }

    animateFrameCallback(timestamp) {
        if (this.#stop) {
            return;
        }

        this.updateFrameTimes(timestamp);

        this.trackFps();
        this.beginFrame();
        this.update(this.#timeSinceLastFrame);
        this.draw();
        this.endFrame();

        this.requestAnimationFrame();
    }

    requestAnimationFrame() {
        requestAnimationFrame(this.animateFrameCallback.bind(this));
    }

    setInitialFrameTimes() {
        let initial = window.performance.now();
        let initialInSecs = Math.floor(initial / 1000);

        this.#previousFrameTimestampHires = initial;
        this.#previousFrameTimestampInSecs = initialInSecs;

        this.#currentFrameTimestampHires = initial;
        this.#currentFrameTimestampInSecs = initialInSecs;

        this.#timeSinceLastFrame = 0;
    }

    updateFrameTimes(timestamp) {
        if (timestamp === undefined ||
            timestamp === null ||
            Number.isNaN(timestamp) ||
            timestamp < 0) {
            throw ('Invalid timestamp');
        }

        if (this.#previousFrameTimestampHires === undefined ||
            this.#previousFrameTimestampHires === null ||
            Number.isNaN(this.#previousFrameTimestampHires) ||
            this.#previousFrameTimestampHires < 0) {
            throw ('Invalid previous frame timestamp');
        }

        this.#timeSinceLastFrame = timestamp - this.#previousFrameTimestampHires;

        this.#previousFrameTimestampHires = this.#currentFrameTimestampHires;
        this.#previousFrameTimestampInSecs = this.#currentFrameTimestampInSecs;

        this.#currentFrameTimestampHires = timestamp;
        this.#currentFrameTimestampInSecs = Math.floor(timestamp / 1000);
    }

    trackFps() {
        if (this.#fpsStats === undefined ||
            this.#fpsStats === null) {
            throw ('Invalid FPS stats.');
        }

        this.#framesThisSec++;

        if (this.#currentFrameTimestampInSecs > this.#previousFrameTimestampInSecs) {
            if (this.#fpsFirstFrameComplete) {
                this.#fpsStats.push(this.#framesThisSec);
                if (this.#fpsStats.length > this.#maxFpsStatEntriesToTrack) {
                    this.#fpsStats.shift();
                }
            }
            else {
                this.#fpsFirstFrameComplete = true;
            }
            this.#framesThisSec = 0;
        }
    }

    get game() {
        return this.#game;
    }

    get currentTime() {
        return this.#currentFrameTimestampHires;
    }

    get currentTimeInSeconds() {
        return this.#currentFrameTimestampInSecs;
    }

    get lastFrameTime() {
        return this.#previousFrameTimestampHires;
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
}