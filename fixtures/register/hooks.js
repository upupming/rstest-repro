// Forces `.ts` to ESM and strips a known marker type annotation, mirroring
// what a ts-blank-space-based loader does.
const state = { active: true, port: null }

export function initialize(data) {
  state.port = data.port
  data.port.on('message', (message) => {
    if (message === 'deactivate') state.active = false
  })
}

export async function load(url, context, nextLoad) {
  if (!state.active || !url.includes('.ts')) {
    return nextLoad(url, context)
  }

  const result = await nextLoad(url, { ...context, format: 'module' })
  const source = result.source.toString().replaceAll(': number', '')

  return {
    format: 'module',
    shortCircuit: true,
    source: source + '\n//# sourceURL=' + url,
  }
}
