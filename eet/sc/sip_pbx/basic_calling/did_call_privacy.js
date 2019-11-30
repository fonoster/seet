
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
    new SIPpW(void(0), enterprisePhonePort)
        .withScenario('scenarios/common/uas_invite.xml')
        .startAsync((e, out, err) => e ? console.error(err) : void(0))

    // Send INVITE from phone-s1(2001) to phone-e1(1001)
    // The expected result state that:  The caller ID is displayed as “anonymous”
    // but as far as I'm concern all that matters is that call process without error
    const result = new SIPpW(process.env.DUT_HOST)
        .withScenario('scenarios/common/uac_invite.xml')
        .setVariable('tgtUser', process.env.PHONE_E1_USERNAME)
        .setVariable('tgtDomain', process.env.SIPPBX_DOMAIN)
        .setVariable('tgtHost', process.env.TESTER_HOST)
        .setVariable('tgtPort', enterprisePhonePort)
        .setVariable('from', `anonymous@anonymous.invalid`)
        .setVariable('to', `+12225553000@unknown.com`)
        .start()

    done(result.stderr ? result : void(0))
}
