
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const expires = [30, 120, 30]
    const errors = []
    expires.forEach(expires => {
        result = new SIPpW(process.env.DUT_HOST, 5061, 3300000)
            .withScenario('scenarios/sc/sip_pbx/registration_mode/maintaining_registration.xml')
            .setVariable('expires', expires)
            .start()
        if (result.stderr) {
            errors.push(result.stderr)
        }
    })

    done(errors.length > 0 ? errors : void(0))
}
