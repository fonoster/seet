
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const result = new SIPpW(void(0), 5061)
        .withScenario('scenarios/sc/sip_pbx/registration_mode/authentication.xml')
        .withInf('scenarios/common/gateways.csv')
        .setInfIndex('gateways.csv', 0)
        .start()

    done(result.stderr ? result : void(0))
}
