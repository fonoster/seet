const SIPpW = require('./sippw')

function test(dutHost) {
    const testName = 'UAC Registration'

    const result = new SIPpW(dutHost)
      .withScenario('etc/scenarios/uac_register.xml')
        .withInf('etc/scenarios/uac_register.csv')
          .withTimeout(5000)
            .start()

    return {
      name: testName,
      result: result
    }
}

module.exports = test
