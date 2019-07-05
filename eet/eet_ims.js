const assert = require('assert')
const sleep = require('sleep')
const SIPpW = require('./sippw')
const RoutrClient = require('./routr-client')

/**
 * There seems to be an issue with NIOMessageProcessorFactory that creates TCP/UDP connections issues.
 * You willl see messages like "WARN - Old socket local ip address /192.168.1.149:51842" in Routr logs
 *
 * As a workaround just change message processor factory like so:
 * gov.nist.javax.sip.MESSAGE_PROCESSOR_FACTORY=gov.nist.javax.sip.stack.OIOMessageProcessorFactory
 */
describe('UAC IMS', () => {

    const apiUrl = 'https://127.0.01:4567/api/v1beta1'
    const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.TZZ4kp5xIdYzs5RRt6_qVxJcOiLdk1IEHFMBSZ7SRENx6kyVhwfAlm-oeM4L2XFIr4evlTCxKEIKc0fZKwPcjw"
    const route = {
        user: '1002',
        address: '192.168.1.149',
        port: 5090,
        expires: 3600
    }
    const client = new RoutrClient(apiUrl)

    before(async() => {
        await client.withToken(apiToken).addLocation('sip:1002@sip.local', route)
    })

    after(async() => {
        await client.withToken(apiToken).removeLocation('sip:1002@sip.local')
    });

    it('uac sends message request thru proxy server', done => {

        const dutHost = route.address

        new SIPpW(dutHost, route.port, 20000)
            .withScenario('etc/scenarios/uas_ims.xml')
            .withTraceError()
            .startAsync((error, stdout, stderr) => {
                if (error) {
                    console.error(error)
                }
            })

        sleep.sleep(1)

        const result = new SIPpW(dutHost)
            .withScenario('etc/scenarios/uac_ims.xml')
            .withTraceError()
            .start()

        if (result.stderr) {
            done (result)
        } else {
            done()
        }
    })

})
