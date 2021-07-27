// https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
// https://web.dev/module-workers/
// https://html.spec.whatwg.org/multipage/workers.html#module-worker-example
// const worker = new Worker('worker.js', {
//     type: 'module'
// });

// you need an ArrayBuffer (or similar). Using the postMessage() won't really
// get you what you want I think. Because the json (de)serialisation process
// is a fairly time consuming one in some cases.

// But what you are probably looking for is "transferable objects". Instead of
// cloning the object(s) it changes the owner so there is no copying required.

import { gamebase } from './gamebase.js';

export class loop3 {
    worker = null;

    setup(params) {
        worker = new Worker("./loop3_updateworker.js", { type: "module" });
        worker.onmessage = this.receiveFromWorker;
        worker.sendToWorker();
    }

    sendToWorker() {
        worker.postMessage({ x: 0, y: 0 });
    }

    receiveFromWorker(e) {
        //e.data
    }
}