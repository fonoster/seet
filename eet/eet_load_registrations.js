require('dotenv').config()
const { cleanLoc } = require('./utils')
const SIPpW = require('./sippw')

describe('UAS Registration Performance Test', function() {
    this.retries(2)

    after(async() => await cleanLoc())

    it('new registrations', function(done)  {
        this.slow(6000)
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

    it('update registration', function(done) {
        this.slow(6000)
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
