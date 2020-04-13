import { actor2dbase } from '../../engine/actor2dbase.js';

export class title extends actor2dbase {
    #lastupdatetime = 0;
    #minTimeBetweenProgressUpdates = 200;
    #progressCount = 0;
    #minprogressCount = 1;
    #maxprogressCount = 3;

    #progressText = '';
    #progressHeader = 'Loading';
    #progressIndicator = '.';

    #font = '48px Bangers';

    #maxHalfAdjust = 0;

    constructor(game) {
        super(game, 0, 0, 0);

        this.setDimenions();
    }

    initialize() {
        super.initialize();

        let maxText = this.#progressHeader + this.#progressIndicator.repeat(this.#maxprogressCount);

        this.game.view.ctx.font = this.#font;
        let maxWidth = this.game.view.ctx.measureText(maxText).width;
        this.#maxHalfAdjust = maxWidth / 2;
    }

    update(delta) {
        super.update(delta);

        this.setDimenions();

        let time = this.game.loop.currentTime;
        let elapsedTime = time - this.#lastupdatetime;
        if (elapsedTime >= this.#minTimeBetweenProgressUpdates) {
            this.#lastupdatetime = time;
            if (this.#progressCount < this.#maxprogressCount) {
                this.#progressCount++;
            }
            else {
                this.#progressCount = this.#minprogressCount;
            }
        }

        this.#progressText = this.#progressHeader + this.#progressIndicator.repeat(this.#progressCount);
    }

    setDimenions() {
        this.x = this.game.level.levelCenterX;
        this.y = this.game.level.levelCenterY;
    }

    draw() {
        super.draw();

        this.game.view.ctx.font = this.#font;
        this.game.view.ctx.fillStyle = 'green';
        this.game.view.ctx.textAlign = 'left';
        this.game.view.ctx.textBaseline = 'middle';
        this.game.view.ctx.fillText(this.#progressText, this.x - this.#maxHalfAdjust, this.y);
    }
}