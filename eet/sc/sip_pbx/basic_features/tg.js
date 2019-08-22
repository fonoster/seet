require('dotenv').config()
const { cleanLoc } = require('../../../utils')

describe('Test Group 1.4: Basic Features', function() {

    this.retries(process.env.MAX_RETRIES)

    after(async () => await cleanLoc())

    it.skip('SC-IT.Conf.1.4.1: Call Forwarding', void(0))
    it.skip('SC-IT.Conf.1.4.2: Blind Call Transfer - Transferor in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.3: Blind Call Transfer - Transferee in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.4: Blind Call Transfer – Transferee and Transfer-To in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.5: Attended Call Transfer – Transferor in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.6: Blind Call Transfer – Transferor and Transferee in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.7: Blind Call Transfer – Transferor and Transfer-to in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.8: Blind Call Transfer – Transferee and Transfer-to in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.9: Blind Call Transfer with Early Media – Transferee and Transfer-to in SIP-PBX', void(0))
    it.skip('SC-IT.Conf.1.4.10: Emergency Call Dial Plan', void(0))

})
