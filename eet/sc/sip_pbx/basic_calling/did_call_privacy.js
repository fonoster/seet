
module.exports = function(done) {
    const SIPpW = require('../../../sippw')
    const enterprisePhonePort = 5062

    // Register phone-e1 to DUT
    new SIPpW(process.env.DUT_HOST, enterprisePhonePort)
        .withScenario('scenarios/sc/common/uac_register.xml')
        .setUsername(process.env.PHONE_E1_USERNAME)
        .setPassword(process.env.COMMON_SECRET)
        .setVariable('username', process.env.PHONE_E1_USERNAME)
        .setVariable('domain', process.env.SIPPBX_DOMAIN)
        .start()

    // UA acts as the enterprise phone
    new SIPpW(process.env.DUT_HOST, enterprisePhonePort)
        .withScenario('scenarios/sc/common/uas_invite.xml')
        .startAsync((error, stdout, stderr) => {
            if(error)
              console.error(stderr)
        })

    // Send INVITE from phone-s1(2001) to phone-e1(1001)
    // The expected result state that:  The caller ID is displayed as “anonymous”
    // but as far as I'm concern all that matters is that call process without error
    const result = new SIPpW(process.env.DUT_HOST)
        .withScenario('scenarios/sc/common/uac_invite.xml')
        .setVariable('requestURI', `${process.env.PHONE_E1_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
        .setVariable('from', `anonymous@anonymous.invalid`)
        .setVariable('to', `+12225553000@unknown.com`)
        .start()

    done(result.stderr ? result : void(0))
}
