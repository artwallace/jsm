import { gamebase } from './gamebase.js';

export class gameitembase {
    #game = null;
    #isInitialized = false;
    #disposed = false;

    constructor(game) {
        if (game === undefined ||
            game === null ||
            game instanceof gamebase !== true) {
            throw ('Invalid game');
        }

        this.#game = game;
    }

    get game() {
        return this.#game;
    }

    // I don't think this is necessary but I am trying to establish a pattern
    preinitialize() { }
    initialize() { }
    postinitialize() {
        this.#isInitialized = true;
    }

    get isInitialized() {
        return this.#isInitialized;
    }

    dispose() {
        this.#disposed = true;
        this.#game = null;
    }

    get isDisposed() {
        return this.#disposed;
    }
}