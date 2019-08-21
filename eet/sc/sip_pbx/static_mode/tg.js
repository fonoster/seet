require('dotenv').config()
const { cleanLoc, noop } = require('../../../utils')
const dns_lookup = require('./dns_lookup')

describe('Test Group 1.2: Static Mode', function() {

    after(async () => await cleanLoc())

    it('SC-IT.Conf.1.2.1: SP-SSE Address Acquisition by SIP-PBX', done => dns_lookup(done))
    it('SC-IT.Conf.1.2.2: Static Mode Failure Detection (Noop)', done => noop(done))
    it('SC-IT.Conf.1.2.3: TLS Authentication (Noop)', done => noop(done))

})
