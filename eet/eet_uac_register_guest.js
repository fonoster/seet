const SIPpW = require('./sippw')

function test(dutHost) {
    const testName = 'UAC Guest registration'

    const result = new SIPpW(dutHost)
      .withScenario('etc/scenarios/uac_register_guest.xml')
        .withInf('etc/scenarios/uac_register_guest.csv')
          .withTimeout(5000)
            .start()

    return {
      name: testName,
      result: result
    }
}

module.exports = test
