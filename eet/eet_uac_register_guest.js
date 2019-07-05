const SIPpW = require('./sippw')

function test(dutHost, transportMode) {
    const testName = 'UAC Guest registration'

    const result = new SIPpW(dutHost)
        .withScenario('etc/scenarios/uac_register_guest.xml')
        .withTransportMode(transportMode)
        .start()

    return {
        name: testName,
        result: result
    }
}

module.exports = test
