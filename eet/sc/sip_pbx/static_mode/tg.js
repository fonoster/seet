require('dotenv').config()
const { cleanLoc } = require('../../../utils')
const dns_lookup = require('./dns_lookup')

describe('Test Group 1.2: Static Mode', function() {

    this.retries(process.env.MAX_RETRIES)

    after(async () => await cleanLoc())

    it.only('SC-IT.Conf.1.2.1: SP-SSE Address Acquisition by SIP-PBX', done => dns_lookup(done))
    it.skip('SC-IT.Conf.1.2.2: Static Mode Failure Detection', void(0))
    it.skip('SC-IT.Conf.1.2.3: TLS Authentication', void(0))

})
