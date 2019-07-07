require('dotenv').config()
const { cleanLoc, populateLoc } = require('./utils')
const sleep = require('sleep')
const SIPpW = require('./sippw')

describe('Userloc Performance Test', () => {

    before(async() => await populateLoc())
    after(async() => await cleanLoc())

    it('user location lookup (message request)', done => {

        new SIPpW(process.env.DUT_HOST, process.env.UAS_PORT)
            .withScenario('etc/scenarios/uas_ims.xml')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .startAsync((error, stdout, stderr) => {
                if(error)
                  console.log(stderr)
            })

        sleep.sleep(1)

        const result = new SIPpW(process.env.DUT_HOST)
            .withScenario('etc/scenarios/uac_ims.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withTimeout(60000)
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
