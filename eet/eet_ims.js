require('dotenv').config()
const sleep = require('sleep')
const SIPpW = require('./sippw')
const { populateLoc, cleanLoc } = require('./utils')

/**
 * There seems to be an issue with NIOMessageProcessorFactory that creates TCP/UDP connections issues.
 * You willl see messages like "WARN - Old socket local ip address /192.168.1.149:51842" in Routr logs
 *
 * As a workaround just change message processor factory like so:
 * gov.nist.javax.sip.MESSAGE_PROCESSOR_FACTORY=gov.nist.javax.sip.stack.OIOMessageProcessorFactory
 */
describe('UAC IMS', function() {
    this.retries(2)

    before(async function() {
       await populateLoc(1, process.env.UAS_PORT)

       new SIPpW(process.env.DUT_HOST, process.env.UAS_PORT)
           .withScenario('etc/scenarios/uas_ims.xml')
           .withTraceError()
           .startAsync((error, stdout, stderr) => {
               if (error) {
                   console.error(error)
               }
           })

       sleep.sleep(1)
    })
    after(async() => await cleanLoc(1))

    it('message_uac_to_uas', function(done) {
        this.slow(6000)

        const result = new SIPpW(process.env.DUT_HOST)
            .withScenario('etc/scenarios/uac_ims.xml')
            .withInf('etc/scenarios/register_guest.csv')
            .withTraceError()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

})
