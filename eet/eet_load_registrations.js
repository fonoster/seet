require('dotenv').config()
const { cleanLoc } = require('./utils')
const SIPpW = require('./sippw')

describe('Performance test', () => {
    const dutHost = process.env.DUT_HOST

    after(async() => {
        await cleanLoc()
    })

    it('new registrations', done => {
        const result = new SIPpW(dutHost)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withCallMax(process.env.MAX_ITERATIONS)
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withTraceScreen()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

    it('update registration', done => {
        const result = new SIPpW(dutHost)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withCallMax(process.env.MAX_ITERATIONS)
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withTraceScreen()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

})
