
export const promiseChainify = promises =>
  promises.reduce(
    (promiseAcc, promise) =>
      promiseAcc.then(result => promise.then(response=>response.json()).then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  )
