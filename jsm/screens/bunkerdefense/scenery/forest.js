import { offscreencachedactor2dbase } from '../../../engine/offscreencachedactor2dbase.js';
import { treebase } from './treebase.js';

export class forest extends offscreencachedactor2dbase {
    #trees = [];

    #treeCount = 0;
    #treeTypes = [];
    #leftBoundary = 0;
    #rightBoundary = 0;

    constructor(game, treeCount, treeTypes, leftBoundary, rightBoundary, layer) {
        super(game, 0, 0, 0);

        if (treeCount === undefined ||
            treeCount === null ||
            Number.isNaN(treeCount) ||
            leftBoundary === undefined ||
            leftBoundary === null ||
            Number.isNaN(leftBoundary) ||
            rightBoundary === undefined ||
            rightBoundary === null ||
            Number.isNaN(rightBoundary) ||
            layer === undefined ||
            layer === null ||
            Number.isNaN(layer)) {
            throw ('Invalid parameters');
        }

        this.#treeCount = treeCount;
        this.#treeTypes = treeTypes;
        this.#leftBoundary = leftBoundary;
        this.#rightBoundary = rightBoundary;
        this.layer = layer;
    }

    initialize() {
        super.initialize();

        while (this.#treeCount > 0) {
            let t = treebase.randomTreeAcrossRangeFactory(this.game, this.#treeTypes, this.#leftBoundary, this.#rightBoundary, this.game.level.groundlevel);
            this.addTree(t);
            this.#treeCount--;
        }

        //TODO: x and y should be center, not left and top
        this.width = this.#rightBoundary - this.#leftBoundary;
        this.height = 60;
        this.x = this.#leftBoundary;
        this.y = this.game.level.groundlevel - this.height;
    }

    // update(delta) {
    //     super.update(delta);

    //     if (something) {
    //         this.#requiresRefresh = true;
    //     }
    // }

    drawToOffscreenCtx() {
        super.drawToOffscreenCtx();
        
        if (this.#trees === undefined ||
            this.#trees === null) {
            throw ('Invalid trees array');
        }

        this.#trees.forEach(t => {
            if (!t.isInitialized) {
                throw 'Attempt to draw an uninitialized tree.';
            }
            t.drawToOffscreenCtx(this.offscreenCtx, this.x, this.y);
        });
    }

    addTree(tree) {
        if (tree === undefined ||
            tree === null ||
            tree instanceof treebase !== true) {
            throw ('Invalid tree');
        }
        if (!tree.isInitialized) {
            tree.preinitialize();
            tree.initialize();
            tree.postinitialize();
            if (!tree.isInitialized) {
                throw ('Encountered an tree that could not be initialized.');
            }
        }
        this.#trees.push(tree);
    }
}