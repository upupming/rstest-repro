// Minimal version of @lynx-js/rspeedy's `register/` (a fork of Bloomberg's
// ts-blank-space loader): registers module-customization hooks that force
// `.ts` files to be loaded as ESM regardless of the package `"type"`.
import nodeModule from 'node:module'

export function register() {
  const { port1, port2 } = new MessageChannel()

  nodeModule.register(`./hooks.js?${Date.now()}`, import.meta.url, {
    parentURL: import.meta.url,
    data: { port: port2 },
    transferList: [port2],
  })

  return function unregister() {
    port1.postMessage('deactivate')
  }
}
