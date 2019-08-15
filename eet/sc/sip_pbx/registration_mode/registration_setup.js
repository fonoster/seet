
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const result = new SIPpW(process.env.DUT_HOST, 5061, 120000)
        .withScenario('scenarios/sc/sip_pbx/registration_mode/registration_setup.xml')
        .withTraceError()
        .withTraceMsg()
        .start()

    done(result.stderr ? result : void(0))
}
