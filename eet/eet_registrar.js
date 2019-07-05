const SIPpW = require('./sippw')
const assert = require('assert')

describe('UAC Registration', () => {
    it('guest uac registration', done => {
        const result = new SIPpW('192.168.1.149')
            .withScenario('etc/scenarios/uac_register_guest.xml')
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

    it('uac register to domain', done => {
        const result = new SIPpW('192.168.1.149')
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
