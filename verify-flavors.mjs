// Plain-Node baseline for the loadconfig-flavor demos: every flavor fails
// here with the SAME error rstest reports — rstest matches Node faithfully.
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const u = p =>
  pathToFileURL(join(import.meta.dirname, 'fixtures', 'loadconfig-flavors', p))
    .toString()

for (const p of [
  'cjs-syntax.config.ts',
  'commonjs-pkg/export-default.config.ts',
  'commonjs-pkg/esm-syntax.config.js',
  'enum.config.ts',
  'const-enum.config.ts',
]) {
  try {
    const m = await import(u(p))
    console.log(p, '-> OK', m.default)
  } catch (e) {
    console.log(p, '-> ERR:', e.message.split('\n')[0])
  }
}
