const SIPpW = require('./sippw')
const sleep = require('sleep')

function test(dutHost) {
    const testName = 'UAC to UAS IMS'
    const uasPort = 7000

    new SIPpW(dutHost, uasPort)
      .withScenario('etc/scenarios/uas_ims.xml')
        .withTimeout(30000)
          .startAsync((error, stdout, stderr) => {
              if (error) {
                  console.error(`exec error: ${error}`)
                  return
              }
          })

    const result = new SIPpW(`${dutHost}:${uasPort}`)
      .withScenario('etc/scenarios/uac_ims.xml')
        .withInf('etc/scenarios/uac_register.csv')
          .withTimeout(30000)
            .start()

    return { name: testName, result: result }
}

module.exports = test
