require('dotenv').config()
const SIPpW = require('./sippw')

describe('UAC Registration', () => {
    const dutHost = process.env.DUT_HOST

    it('guest uac registration', done => {
        const result = new SIPpW(dutHost)
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

    it('uac register to domain', done => {
        const result = new SIPpW(dutHost)
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
