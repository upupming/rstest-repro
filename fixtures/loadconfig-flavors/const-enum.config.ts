const enum Mode {
  Dev = 'dev',
  Prod = 'prod',
}

export default {
  source: { entry: Mode.Dev as string },
}
