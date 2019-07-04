const SIPpW = require('./sippw')
const sleep = require('sleep')

function test(dutHost, transportMode) {
    const testName = 'UAC to UAS IMS'

    new SIPpW(dutHost)
      .withScenario('etc/scenarios/uas_ims.xml')
        .withTransportMode(transportMode)
            .withOpt('-trace_err', '')
              .startAsync((error, stdout, stderr) => {
                  if (error) {
                      //console.error(error)
                      // TODO: End instance after
                      return
                  }
              })

    sleep.sleep(3)

    const result = new SIPpW(dutHost)
      .withScenario('etc/scenarios/uac_ims.xml')
        .withInf('etc/scenarios/uac_ims.csv')
          .withOpt('-trace_err', '')
            .withTransportMode(transportMode)
              .start()

    return { name: testName, result: result }
}

module.exports = test
