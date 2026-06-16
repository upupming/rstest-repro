/*



*/

/* istanbul ignore file */

var $MATCHER$ = undefined

// Mirrors `@lynx-js/chunk-loading-webpack-plugin`'s runtime files: an empty
// license-style block comment comes FIRST, then `/* istanbul ignore file */`.
// In that real file the directive is NOT honored and the body gets instrumented
// even though the same directive as the first line (runtime-template-ignored.js)
// IS honored.
export default function runtimeTemplate() {
  var x = 1
  return x + 1
}
