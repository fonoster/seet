require('dotenv').config()
const SIPpW = require('./sippw')

describe('UAC Registration', function() {
    this.retries(2)

    it('register_guest_uac', function(done) {
        this.slow(6000)
        const result = new SIPpW(process.env.DUT_HOST)
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

    it('register_uac', function(done) {
        this.slow(6000)
        const result = new SIPpW(process.env.DUT_HOST)
            .withScenario('etc/scenarios/uac_register.xml')
            .withInf('etc/scenarios/register.csv')
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })
})
