require('dotenv').config()
const { cleanLoc } = require('./utils')
const SIPpW = require('./sippw')

describe('Load testing', function() {

    this.retries(process.env.MAX_RETRIES)

    after(async () => await cleanLoc())

    it('Transactional', done => {
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
            .withScenario('scenarios/load_tests/uas_ims.xml')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallRate(process.env.MAX_RATE)
            .withCallLimit(process.env.CALL_LIMIT)
            .startAsync((error, stdout, stderr) => {
                if(error)
                  console.error(stderr)
            })

        // Send INVITE from phone-s1(2001) to phone-e1(1001)
        const result = new SIPpW(process.env.DUT_HOST)
            .withScenario('scenarios/load_tests/uac_ims.xml')
            .setVariable('requestURI', `${process.env.PHONE_E1_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
            .setVariable('from', `${process.env.PHONE_E2_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
            .setVariable('to', `${process.env.PHONE_E1_USERNAME}@${process.env.SIPPBX_DOMAIN}`)
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallRate(process.env.MAX_RATE)
            .withCallLimit(process.env.CALL_LIMIT)
            .start()

        done(result.stderr ? result : void(0))
    })

})
