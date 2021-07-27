import { actor2dbase } from './actor2dbase.js';

export class offscreencachedactor2dbase extends actor2dbase {
    #offscreenCanvas = null;
    #offscreenCtx = null;

    #requiresRefresh = false;

    constructor(game, x, y) {
        super(game, x, y, 0);
    }

    initialize() {
        super.initialize();
        this.#requiresRefresh = true;
    }

    postinitialize() {
        super.postinitialize();

        if (this.width === undefined ||
            this.width === null ||
            Number.isNaN(this.width) ||
            this.width < 1 ||
            this.height === undefined ||
            this.height === null ||
            Number.isNaN(this.height) ||
            this.height < 1) {
            throw ('Invalid dimensions');
        }

        this.#offscreenCanvas = new OffscreenCanvas(this.width, this.height);
        this.#offscreenCtx = this.#offscreenCanvas.getContext('2d');
    }

    draw() {
        super.draw();

        if (this.#requiresRefresh) {
            this.drawToOffscreenCtx();
            this.#requiresRefresh = false;
        }

        this.game.view.ctx.drawImage(this.#offscreenCanvas, this.x, this.y);
    }

    drawToOffscreenCtx() {
        this.#offscreenCtx.clearRect(0, 0, this.width, this.height);
    }

    dispose() {
        super.dispose();
        this.#offscreenCanvas = null;
        this.#offscreenCtx = null;
    }

    get offscreenCanvas() {
        return this.#offscreenCanvas;
    }

    get offscreenCtx() {
        return this.#offscreenCtx;
    }

    get requiresRefresh() {
        return this.#requiresRefresh;
    }

    set requiresRefresh(value) {
        this.#requiresRefresh = value;
    }
}