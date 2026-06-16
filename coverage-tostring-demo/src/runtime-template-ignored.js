/* istanbul ignore file */
// Same template, but explicitly opted out of coverage instrumentation via the
// standard istanbul directive. `babel-plugin-istanbul` (vitest's istanbul
// provider) honors this and leaves the file un-instrumented; the question this
// demo answers is whether rstest's `swc-plugin-coverage-instrument` does too.
export default function runtimeTemplate() {
  var x = 1
  return x + 1
}
