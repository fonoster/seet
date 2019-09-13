
module.exports = function(done) {
    const SIPpW = require('../../../sippw')

    // This UAS acts as the SP
    new SIPpW(process.env.DUT_HOST, 5061, 120000)
        .withScenario('scenarios/sc/sip_pbx/basic_calling/dod_call_privacy_a.xml')
        .startAsync((error, stdout, stderr) => {
            if(error)
              console.error(stderr)
        })

    // Send INVITE from phone-e1(1001) to phone-s1(2001)
    const result = new SIPpW(process.env.DUT_HOST)
        .withScenario('scenarios/common/uac_invite.xml')
        .setVariable('requestURI', `${process.env.PHONE_S1_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
        .setVariable('from', `${process.env.PHONE_E2_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
        .setVariable('to', `${process.env.PHONE_S1_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
        .start()

    done(result.stderr ? result : void(0))
}
