require('dotenv').config()
const SIPpW = require('./sippw')

describe('UAC Registration', function() {
    this.retries(2)

    it('guest uac registration', function(done) {
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

    it('uac register to domain', function(done) {
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
