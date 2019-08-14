
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const expires = [30, 120, 30]
    expires.forEach(expires => {
        const result = new SIPpW(process.env.DUT_HOST, 5061, 3300000)
            .withScenario('scenarios/sc/sip_pbx/registration_mode/maintaining_registration.xml')
            .setVariable('expires', expires)
            .start()
        if (result.stderr) {
            done (result)
        }
    })

    done()
}
