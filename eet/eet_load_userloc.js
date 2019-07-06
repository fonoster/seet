require('dotenv').config()
const { cleanLoc, populateLoc } = require('./utils')
const sleep = require('sleep')
const SIPpW = require('./sippw')

describe('Userloc Performance Test', () => {
    const dutHost = process.env.DUT_HOST
    const port = 5090

    before(async() => await populateLoc())
    after(async() => await cleanLoc())

    it('user location lookup (message request)', done => {

        new SIPpW(dutHost, port)
            .withScenario('etc/scenarios/uas_ims.xml')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .startAsync((error, stdout, stderr) => {
                if(error)
                  console.log(stderr)
            })

        sleep.sleep(1)

        const result = new SIPpW(dutHost)
            .withScenario('etc/scenarios/uac_ims.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withTimeout(60000)
            .withTraceScreen()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })
})
