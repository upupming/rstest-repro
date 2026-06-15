// SOURCE reads the builtin via the NAMESPACE named export — same shape as
// lynx-stack's findIp before it was changed to read the `default` export.
export async function getFirstAddress(): Promise<string | undefined> {
  const os = await import('node:os')
  const nets = os.networkInterfaces()
  return Object.values(nets)[0]?.[0]?.address
}
