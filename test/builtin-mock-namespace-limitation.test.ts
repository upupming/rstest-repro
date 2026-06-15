import { expect, rstest, test } from '@rstest/core'

// Mocking a Node builtin DOES work on the current canary (contrary to the
// older 0.10.3 belief). The real, narrower limitation: when you set the return
// value from the test body via `rstest.mocked(...).mockReturnValue(...)`, the
// source module must read the builtin through its `default` export. If the
// source reads a NAMESPACE named export, the test-body mock does not reach it
// (the automocked namespace named export and `default` are different refs).
rstest.mock('node:os', { mock: true })

const fakeNets = {
  eth0: [{ address: '1.2.3.4', family: 'IPv4', internal: false, netmask: '', mac: '', cidr: null }],
}

test('default export: mockReturnValue set in the test body REACHES src', async () => {
  const { default: os } = await import('node:os')
  rstest.mocked(os.networkInterfaces).mockReturnValue(fakeNets as never)
  const { getFirstAddress } = await import('../src/get-networks-default.js')
  expect(await getFirstAddress()).toBe('1.2.3.4')
})

test('namespace named export: the same mockReturnValue does NOT reach src', async () => {
  const { default: os } = await import('node:os')
  rstest.mocked(os.networkInterfaces).mockReturnValue(fakeNets as never)
  const { getFirstAddress } = await import('../src/get-networks-namespace.js')
  // src never sees 1.2.3.4 — it gets the auto-stub (undefined) and throws.
  await expect(getFirstAddress()).rejects.toThrow(
    'Cannot convert undefined or null to object',
  )
})
