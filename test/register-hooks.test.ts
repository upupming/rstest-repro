import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { expect, test } from '@rstest/core'

// @ts-expect-error plain JS fixture
import { register } from '../fixtures/register/index.js'

// `fixtures/register` mirrors @lynx-js/rspeedy's `register/`: it calls
// `module.register()` to install customization hooks that force `.ts` files
// to ESM (regardless of package `"type"`) and strip type annotations.
//
// Under plain Node this works (`node verify-node.mjs`): the ESM-syntax `.ts`
// inside a `"type": "commonjs"` package loads through the custom hooks.
test('user-registered module.register hooks apply to dynamic import', async () => {
  const unregister = register() as () => void

  try {
    const url = pathToFileURL(
      join(__dirname, '..', 'fixtures', 'register', 'cjs-pkg', 'esm-config.ts'),
    ).toString()

    const mod = await import(url) as { default: { value: number } }

    expect(mod.default).toEqual({ value: 42 })
  } finally {
    unregister()
  }
})

// Control: without the custom hooks the same import fails (same as plain
// Node — an ESM-syntax `.ts` inside a `"type": "commonjs"` package).
test('without hooks the fixture is rejected, matching plain Node', async () => {
  const url = pathToFileURL(
    join(__dirname, '..', 'fixtures', 'register', 'cjs-pkg', 'esm-config.ts'),
  ).toString()

  await expect(import(`${url}?fresh=1`)).rejects.toThrow(
    /Unexpected token 'export'/,
  )
})
