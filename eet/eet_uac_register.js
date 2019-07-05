const SIPpW = require('./sippw')

function test(dutHost, transportMode) {
    const testName = 'UAC Registration'

    const result = new SIPpW(dutHost)
        .withScenario('etc/scenarios/uac_register.xml')
        .withTraceError()
        .withInf('etc/scenarios/register.csv')
        .withTransportMode(transportMode)
        .start()

    return {
        name: testName,
        result: result
    }
}

module.exports = test
