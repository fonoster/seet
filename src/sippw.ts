import * as child from 'child_process'

class SIPpW {
  //opts: Map<string, string>
  opts: any
  cmd: string
  timeout: number

  constructor (
    remoteHost: string,
    localPort: number = Math.floor(Math.random() * 6000) + 5080,
    timeout: number = 60000
  ) {
    this.opts = new Map()
    this.opts.set('-p', `${localPort}`)
    this.opts.set('-m', '1')
    this.opts.set('-d', '1')
    this.opts.set('-t', 't1')
    this.opts.set('-trace_err', '')
    this.opts.set('-trace_msg', '')
    this.opts.set('-timeout', `${timeout}`)
    // this.cmd = `docker run --rm -t -p ${localPort}:${localPort} -p ${localPort}:${localPort}/udp -v $PWD:/sipp ctaloi/sipp ${remoteHost}`
    this.cmd = remoteHost ? `sipp ${remoteHost}` : 'sipp'
    this.timeout = timeout
  }

  setUsername (username: string) {
    return this.withOpt('-au', username)
  }

  setPassword (password: string) {
    return this.withOpt('-ap', password)
  }

  withScenario (scenarioFile: string) {
    return this.withOpt('-sf', scenarioFile)
  }

  withReportFreq (fd: string) {
    return this.withOpt('-fd ', fd)
  }

  withTraceStat () {
    return this.withOpt('-trace_stat ', '')
  }

  withTraceScreen () {
    return this.withOpt('-trace_screen ', '')
  }

  withTransportMode (transportMode: string) {
    // TODO: Validate this entry
    return this.withOpt('-t', transportMode)
  }

  withInf (info: string) {
    return this.withOpt('-inf', info)
  }

  setInfIndex (info: string, index: number) {
    return this.withOpt('-infindex', `${info} ${index}`)
  }

  setVariable (variable: string, value: string) {
    return this.withOpt(`-set ${variable}`, value)
  }

  withStats (statsFile: string) {
    return this.withOpt('-stf', statsFile)
  }

  withCallRate (rate: number) {
    return this.withOpt('-r', rate)
  }

  withCallLimit (limit: number) {
    return this.withOpt('-l', limit)
  }

  withCallRateIncrease (rate: number, time: number) {
    this.withOpt('-rate_increase', rate)
    return this.withOpt('-fd', time)
  }

  withCallMax (maximum: number) {
    return this.withOpt('-m', maximum)
  }

  withOpt (key: string, parameter: string | number) {
    this.opts.set(key, `${parameter}`)
    return this
  }

  withTimeout (timeout: number) {
    this.timeout = timeout
    return this
  }

  build (): string {
    let opts = ''

    for (const [key, value] of this.opts) {
      opts = `${opts} ${key} ${value}`
    }
    return `${this.cmd} ${opts} `
  }

  start (): string {
    const cmd = this.build()

    let result: string
    try {
      result = child
        .execSync(cmd, {
          timeout: this.timeout,
          stdio: 'pipe'
        })
        .toString()
    } catch (e) {
      throw e
    }

    // Give it some time to close the port
    const sleep = require('system-sleep')
    sleep(5000)

    return result
  }

  startAsync (callback) {
    const cmd = this.build()
    return child.exec(
      cmd,
      {
        timeout: this.timeout
      },
      callback
    )
  }

  stop () {
    // Noop
  }
}

export default SIPpW
