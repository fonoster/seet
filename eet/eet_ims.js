const SIPpW = require('./sippw')
const RoutrClient = require('./routr-client')
const sleep = require('sleep')

const apiUrl = 'https://127.0.01:4567/api/v1beta1'
const apiToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.TZZ4kp5xIdYzs5RRt6_qVxJcOiLdk1IEHFMBSZ7SRENx6kyVhwfAlm-oeM4L2XFIr4evlTCxKEIKc0fZKwPcjw"

/**
 * There seems to be an issue with NIOMessageProcessorFactory that creates TCP/UDP connections issues.
 * You willl see messages like "WARN - Old socket local ip address /192.168.1.149:51842" in Routr logs
 *
 * As a workaround just change message processor factory like so: 
 * gov.nist.javax.sip.MESSAGE_PROCESSOR_FACTORY=gov.nist.javax.sip.stack.OIOMessageProcessorFactory
 */
async function test(dutHost, transportMode) {
    const testName = 'UAC to UAS IMS'
    const route = {
        user: '1002',
        address: dutHost,
        port: 5090,
        expires: 3600
    }
    const client = new RoutrClient(apiUrl)

    // Add uas to location table
    await client.withToken(apiToken).addLocation('sip:1002@sip.local', route)

    new SIPpW(dutHost, route.port, 20000)
        .withScenario('etc/scenarios/uas_ims.xml')
        .withTransportMode(transportMode)
        .withTraceError()
        .startAsync((error, stdout, stderr) => {
            if (error) {
                console.error(error)
                // TODO: End instance after
                return
            }
        })

    sleep.sleep(1)

    const result = new SIPpW(dutHost)
        .withScenario('etc/scenarios/uac_ims.xml')
        .withTraceError()
        .withTransportMode(transportMode)
        .start()

    await client.withToken(apiToken).removeLocation('sip:1002@sip.local')

    return {
        name: testName,
        result: result
    }
}

module.exports = test