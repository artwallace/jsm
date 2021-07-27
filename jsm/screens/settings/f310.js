import { imageactor2dbase } from '../../engine/imageactor2dbase.js';

export class f310 extends imageactor2dbase {
    constructor(game) {
        super(game);

        this.imagePath = './screens/settings/f310.png';

        this.width = 755 / 2;
        this.height = 556 / 2;
        this.updateDimensions();

        this.layer = this.game.level.defaultLayer - 2;
    }

    update(delta) {
        super.update(delta);

        this.x = this.game.level.levelWidth / 2;
        this.y = (this.game.level.levelHeight / 4) + (this.width / 2);
        this.updateDimensions();
    }
}