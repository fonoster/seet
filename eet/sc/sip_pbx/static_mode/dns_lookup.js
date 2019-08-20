
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const uasPort = 5061

    // Wait for SIP PBX to register
    new SIPpW(process.env.DUT_HOST, uasPort, 60000)
        .withScenario('scenarios/sc/common/uas_register.xml')
        .start()

    // This UAS acts as the SP
    new SIPpW(process.env.DUT_HOST, uasPort, 120000)
        .withScenario('scenarios/sc/common/uas_invite.xml')
        .startAsync((error, stdout, stderr) => {
            if(error)
              console.error(stderr)
        })

    // Send INVITE from phone-e1(1001) to phone-s1(2001)
    const result = new SIPpW(process.env.DUT_HOST)
        .withScenario('scenarios/sc/common/uac_invite.xml')
        .start()

    done(result.stderr ? result : void(0))
}
