
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const enterprisePhonePort = 5062

    // Register phone-e1 to DUT
    new SIPpW(process.env.DUT_HOST, enterprisePhonePort)
        .withScenario('scenarios/common/uac_register.xml')
        .setUsername(process.env.PHONE_E1_USERNAME)
        .setPassword(process.env.COMMON_SECRET)
        .setVariable('username', process.env.PHONE_E1_USERNAME)
        .setVariable('domain', process.env.SIPPBX_DOMAIN)
        .start()

    // UA acts as the enterprise phone
    new SIPpW(process.env.DUT_HOST, enterprisePhonePort)
        .withScenario('scenarios/common/uas_invite.xml')
        .startAsync((error, stdout, stderr) => {
            if(error)
              console.error(stderr)
        })

    // Send INVITE from phone-s1(2001) to phone-e1(1001)
    const result = new SIPpW(process.env.DUT_HOST)
        .withScenario('scenarios/common/uac_invite.xml')
        .setVariable('tgtUser', process.env.PHONE_E1_USERNAME)
        .setVariable('tgtDomain', process.env.SIPPBX_DOMAIN)
        .setVariable('tgtHost', process.env.DUT_HOST)
        .setVariable('tgtPort', enterprisePhonePort)        
        .setVariable('from', `"+1303661001@${process.env.SP_DOMAIN};user=phone"`)
        .setVariable('to', "+12225553000@unknown.com")
        .start()

    done(result.stderr ? result : void(0))
}
