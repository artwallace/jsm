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