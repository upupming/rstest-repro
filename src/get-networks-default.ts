// SOURCE reads the builtin via the DEFAULT export (the live CJS exports object).
export async function getFirstAddress(): Promise<string | undefined> {
  const { default: os } = await import('node:os')
  const nets = os.networkInterfaces()
  return Object.values(nets)[0]?.[0]?.address
}
