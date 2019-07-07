require('dotenv').config()
const { cleanLoc } = require('./utils')
const SIPpW = require('./sippw')

describe('UAS Registration Performance Test', () => {

    after(async() => await cleanLoc())

    it('new registrations', done => {
        const result = new SIPpW(process.env.DUT_HOST)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withCallMax(process.env.MAX_ITERATIONS)
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withTraceScreen()
            .withTraceStat()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

    it('update registration', done => {
        const result = new SIPpW(process.env.DUT_HOST)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withCallMax(process.env.MAX_ITERATIONS)
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withTraceScreen()
            .withTraceStat()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

})
