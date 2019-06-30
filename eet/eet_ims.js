const SIPpW = require('./sippw')
const sleep = require('sleep')

function test(dutHost, transportMode) {
    const testName = 'UAC to UAS IMS'

    new SIPpW(dutHost)
      .withScenario('etc/scenarios/uas_ims.xml')
        .withTransportMode(transportMode)
          .startAsync((error, stdout, stderr) => {
              if (error) {
                  console.error(`exec error: ${error}`)
                  return
              }
          })

    const result = new SIPpW(dutHost)
      .withScenario('etc/scenarios/uac_ims.xml')
        .withInf('etc/scenarios/uac_msg.csv')
          .withTransportMode(transportMode)
            .start()

    return { name: testName, result: result }
}

module.exports = test
