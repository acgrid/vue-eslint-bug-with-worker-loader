import distribute from 'loadsh/chunk'
const threads = navigator.hardwareConcurrency || 2
const handlers = {
  distribute: (length) => { console.log(`Allocating ${length} with ${threads} threads.`) }, // eslint-disable-line
  start: (index, amount) => { console.log(`Thread #${index} started with ${amount} items.`) }, // eslint-disable-line
  finish: (index, taken) => { console.log(`Thread #${index} stopped in ${taken}ms later.`) } // eslint-disable-line
}

export function setHandlers (onDistribute, onStart, onFinish) {
  handlers.distribute = onDistribute
  handlers.start = onStart
  handlers.finish = onFinish
}

export async function parallel (worker, batch, funcBuildInput, funcHandleOutput) {
  const chunks = distribute(batch, Math.ceil(batch.length / threads))
  handlers.distribute(batch.length)
  return Promise.all(chunks.map((chunk, index) => {
    return new Promise(resolve => {
      const w = worker()
      const resolved = []
      let count = 0
      const now = performance.now()
      handlers.start(index, chunk.length)
      w.addEventListener('message', ({ data: { key, value } }) => {
        resolved[key] = value
        funcHandleOutput(key, value)
        if (++count === chunk.length) {
          handlers.finish(index, performance.now() - now)
          resolve(resolved)
          w.terminate()
        }
      })
      chunk.map(key => {
        w.postMessage({ key, value: funcBuildInput(key) })
      })
    })
  }))
}

export async function serialOfParallel (workers, batches, callbacks) {
  if (workers.length !== batches.length) throw new Error('Every worker should have its own batch.')
  for (let sequence in workers) {
    const callback = callbacks[sequence] || { input: x => x, output: () => {} }
    const result = await parallel(workers[sequence], batches[sequence], callback.input, callback.output)
    if (callback.finish) callback.finish(result)
  }
}
