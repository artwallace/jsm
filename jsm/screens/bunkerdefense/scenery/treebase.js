import { actor2dbase } from '../../../engine/actor2dbase.js';
import { getRandomIntFromRange, getRandomFromArray } from '../../../engine/utilities.js';

//TODO: Need a real solution to having actors that depend on having info about other actors.
//TODO: Trees depend on knowing the ground level of the map.
//TODO: Add support for level themes, desert, forest, ice, etc.
//TODO: Add support for tree factories clumped or clustered around landmarks (such as an oasis).
//TODO: Add support for trees that lean.
//TODO: ? Add support for trees that blow in the wind?
//TODO: Add support for tree damage. Damaged trees provide less cover and concealment.
export class treebase extends actor2dbase {
    trunkColor = '';
    leafColor = '';

    trunkHeight = 0;
    trunkThickness = 0;

    constructor(game, x, y, layer) {
        super(game, x, y, 0);

        this.layer = layer;
    }

    static randomTreeAcrossRangeFactory(types, game, minX, maxX, ground, layer) {
        let treeType = getRandomFromArray(types);
        return treeType.function(game, minX, maxX, ground, layer);
    }
}