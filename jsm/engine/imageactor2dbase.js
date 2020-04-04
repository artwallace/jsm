import { actor2dbase } from './actor2dbase.js';

export class imageactor2dbase extends actor2dbase {
    #loaded = false;
    #img = null;
    #imagePath = '';

    constructor(game) {
        super(game, 0, 0, 0);
    }

    initialize() {
        super.initialize();

        if (this.#imagePath === undefined ||
            this.#imagePath === null ||
            this.#imagePath === '') {
            throw ('Invalid image path');
        }

        this.#img = new Image();
        this.#img.crossOrigin = 'anonymous';
        this.#img.onload = this.onloaded.bind(this);
        this.#img.src = this.#imagePath;
    }

    // Derived classes MUST set the width and height BEFORE postinitialize is called.
    postinitialize() {
        super.postinitialize();

        if (this.width === undefined ||
            this.width === null ||
            Number.isNaN(this.width) ||
            this.width <= 0 ||
            this.height === undefined ||
            this.height === null ||
            Number.isNaN(this.height) ||
            this.height <= 0) {
            throw ('Invalid dimensions: w=' + this.width + ' h=' + this.height);
        }

        this.updateDimensions();
    }

    update(delta) {
        super.update(delta);
    }

    updateDimensions() {
        if (this.width === undefined ||
            this.width === null ||
            Number.isNaN(this.width) ||
            this.width <= 0 ||
            this.height === undefined ||
            this.height === null ||
            Number.isNaN(this.height) ||
            this.height <= 0) {
            throw ('Invalid dimensions: w=' + this.width + ' h=' + this.height);
        }

        this.left = this.x - this.width / 2;
        this.top = this.y - this.height / 2;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    draw(interp) {
        super.draw(interp);

        if (this.#img === undefined ||
            this.#img === null ||
            !this.#loaded) {
            return;
        }

        this.game.view.ctx.drawImage(this.#img, this.left, this.top, this.width, this.height);
    }

    get imagePath() {
        return this.#imagePath;
    }

    set imagePath(value) {
        this.#imagePath = value;
    }

    dispose() {
        this.#imagePath = null;
        this.#img = null;
        this.#loaded = false;
        super.dispose();
    }

    onloaded() {
        this.#img.onload = null;
        this.#loaded = true;
    }
}