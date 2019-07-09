require('dotenv').config()
const sleep = require('sleep')
const fs = require('fs-extra')
const path = require("path")
const { cleanLoc, populateLoc } = require('./utils')
const SIPpW = require('./sippw')
const uac_register_guest_fn = 'uac_register_guest'
const uac_ims_fn = 'uac_ims'

function register(done, self) {
    self.slow(6000)
    const result = new SIPpW(process.env.DUT_HOST)
        .withScenario(`etc/scenarios/${uac_register_guest_fn}.xml`)
        .withInf('etc/scenarios/.register_guest.csv')
        .withCallMax(process.env.MAX_ITERATIONS)
        .withCallLimit(process.env.CALL_LIMIT)
        .withCallRate(process.env.MAX_RATE)
        .withTimeout(300000)
        .withTraceScreen()
        .withTraceStat()
        .start()

    if (result.stderr) {
        done (result)
    } else {
        done()
    }
}

describe('Basic SIP scenarios', function() {
    this.retries(2)

    before(() => {
        new SIPpW(process.env.DUT_HOST, process.env.UAS_PORT)
            .withScenario('etc/scenarios/uas_ims.xml')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withTimeout(240000)  // Needs more time because is starting early than any other instance
            .startAsync((error, stdout, stderr) => {
                if(error)
                  console.error(stderr)
            })

        sleep.sleep(1)

        const data = `SEQUENTIAL,PRINTF=10000\ng%06du;${process.env.UAS_HOST}:${process.env.UAS_PORT}`

        fs.writeFileSync("etc/scenarios/.register_guest.csv", data, (err) => {
          if (err) console.log(err);
          console.log("Successfully generated .register_guest.csv");
        })
    })

    after(async function() {
        await cleanLoc()
    })

    afterEach(async function() {
        let filename = this.currentTest.title === 'user_lookup'?
          `${uac_ims_fn}`:
          `${uac_register_guest_fn}`

        // Copy report status to the out folder
        fs.copySync(path.resolve(__dirname,`../etc/scenarios/${filename}_1_.csv`),
          path.resolve(__dirname,`../out/${this.currentTest.title}.csv`))

        // Copy the screen result to the out folder
        fs.copySync(path.resolve(__dirname,`../etc/scenarios/${filename}_1_screen.log`),
          path.resolve(__dirname,`../out/${this.currentTest.title}_screen.log`))
    })

    it.only('new_registrations', done => register(done, this))

    it('update_registrations', done => register(done, this))

    it.only('user_lookup', function(done) {
        this.slow(30000)

        const result = new SIPpW(process.env.DUT_HOST)
            .withScenario(`etc/scenarios/${uac_ims_fn}.xml`)
            .withInf('etc/scenarios/.register_guest.csv')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallLimit(process.env.CALL_LIMIT)
            .withCallRate(process.env.MAX_RATE)
            .withTraceScreen()
            .withTraceStat()
            .withTimeout(120000)
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })
})
