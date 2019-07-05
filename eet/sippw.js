const {
    execSync,
    exec
} = require('child_process')

class SIPpW {
    constructor(remoteHost, localPort = Math.floor(Math.random() * 6000) + 5080, timeout = 20000) {
        this.opts = new Map()
        this.opts.set('-p', localPort)
        this.opts.set('-r', 1)
        this.opts.set('-m', 1)
        this.opts.set('-l', 1)
        this.cmd = `docker run --stop-timeout ${timeout} -t -p ${localPort}:${localPort} -p ${localPort}:${localPort}/udp -v $PWD:/sipp ctaloi/sipp ${remoteHost}`
        this.timeout = timeout
    }

    withScenario(scenarioFile) {
        return this.withOpt('-sf', scenarioFile)
    }

    withTraceStat() {
        return this.withOpt('-trace_stat ', '')
    }

    withTraceError() {
        return this.withOpt('-trace_err ', '')
    }

    withTraceScreen() {
        return this.withOpt('-trace_screen ', '')
    }

    withTransportMode(transportMode) {
        // TODO: Validate this entry
        return this.withOpt('-t', transportMode)
    }

    withInf(info) {
        return this.withOpt('-inf', info)
    }

    withStats(statsFile) {
        return this.withOpt('-stf', statsFile)
    }

    withCallRate(rate) {
        return this.withOpt('-r', rate)
    }

    withCallLimit(limit) {
        return this.withOpt('-l', limit)
    }

    withCallRateIncrease(rate, time) {
        this.withOpt('-rate_increase', rate)
        return this.withOpt('-fd', time)
    }

    withCallMax(maximum) {
        return this.withOpt('-m', maximum)
    }

    withOpt(key, parameter) {
        this.opts.set(key, parameter)
        return this
    }

    withTimeout(timeout) {
        this.timeout = timeout
        return this
    }

    build() {
        let opts = ''

        for (const [key, value] of this.opts) {
            opts = `${opts} ${key} ${value}`
        }

        return `${this.cmd} ${opts}`
    }

    start() {
        const cmd = this.build()
        let result
        try {
            result = execSync(cmd, {
                timeout: this.timeout
            })
        } catch (e) {
            result = e
        }

        return result
    }

    startAsync(callback) {
        const cmd = this.build()
        return exec(cmd, {
            timeout: this.timeout
        }, callback)
    }

    stop() {
        // Noop
    }
}

module.exports = SIPpW