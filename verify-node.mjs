// All fixtures load fine under plain Node (no rstest involved).
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const url = p => pathToFileURL(join(import.meta.dirname, p)).toString()

// `fixtures/cjs-pkg` has a package.json WITHOUT `"type"`, so Node's native
// type stripping applies module-syntax detection and loads this as CJS.
const cjs = await import(url('fixtures/cjs-pkg/cjs-style.config.ts'))
console.log('cjs-style.config.ts ->', cjs.default)

const promiseTs = await import(url('fixtures/promise.ts'))
console.log('promise.ts ->', await promiseTs.default)

const promiseMjs = await import(url('fixtures/promise.mjs'))
console.log('promise.mjs ->', await promiseMjs.default)

console.log('\nAll fixtures load correctly under plain Node', process.version)

// Custom `module.register` hooks (mirroring @lynx-js/rspeedy's register/)
// force the ESM-syntax `.ts` inside a `"type": "commonjs"` package to load.
const { register } = await import(url('fixtures/register/index.js'))
const unregister = register()
const viaHooks = await import(url('fixtures/register/cjs-pkg/esm-config.ts'))
console.log('register hooks + esm-config.ts ->', viaHooks.default)
unregister()
