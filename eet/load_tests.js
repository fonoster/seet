require('dotenv').config()
const axios = require('axios')
const {
  cleanLoc,
  ping
} = require('./utils')
const SIPpW = require('./sippw')

describe('Load testing', function() {

    this.retries(process.env.MAX_RETRIES)

    before(() => process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0')
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
        new SIPpW(void(0), enterprisePhonePort)
            .withScenario('scenarios/load_tests/uas_ims.xml')
            .withCallMax(process.env.MAX_ITERATIONS)
            .withCallRate(process.env.MAX_RATE)
            .withCallLimit(process.env.CALL_LIMIT)
            .startAsync((e, out, err) => e ? console.error(err) : void(0))

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

    // Observe the registry timer
    it.skip('HTTP load test', done => {
        async function call () {
           return await axios.get(`${process.env.ROUTR_API_URL}/system/status?token=${process.env.ROUTR_API_TOKEN}`)
        }
        for (let i=0; i < 10000; i++) {
            call()
        }
        done()
    })

})
