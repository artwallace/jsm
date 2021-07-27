import { getRandomFromArray } from '../../../engine/utilities.js';
import { offscreencachedgameitem2dbase } from '../../../engine/offscreencachedgameitem2dbase.js';

//TODO: Need a real solution to having actors that depend on having info about other actors.
//TODO: Trees depend on knowing the ground level of the map.
//TODO: Add support for level themes, desert, forest, ice, etc.
//TODO: Add support for tree factories clumped or clustered around landmarks (such as an oasis).
//TODO: Add support for trees that lean.
//TODO: ? Add support for trees that blow in the wind?
//TODO: Add support for tree damage. Damaged trees provide less cover and concealment.

//Note: trees are not actors for performance reasons- forests are.
//Trees are like the pieces of clouds.
export class treebase extends offscreencachedgameitem2dbase {
    trunkColor = '';
    leafColor = '';

    trunkHeight = 0;
    trunkThickness = 0;
    trunkTop = 0;

    constructor(game, x, y) {
        super(game, x, y);
    }

    static randomTreeAcrossRangeFactory(game, types, minX, maxX, ground) {
        let treeType = getRandomFromArray(types);
        return treeType.function(game, minX, maxX, ground);
    }
}