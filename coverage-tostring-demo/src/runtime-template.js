// A "runtime template": its function BODY is extracted via
// `Function.prototype.toString()` and emitted as standalone code into a bundle.
// This is exactly what webpack/rspack's `Template.getFunctionContent(fn)` does,
// and how plugins such as `@lynx-js/chunk-loading-webpack-plugin` ship runtime.
//
// The function is intentionally NEVER called here — it is only `.toString()`d.
export default function runtimeTemplate() {
  var x = 1
  return x + 1
}
