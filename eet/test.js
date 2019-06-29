const uac_register_guest = require('./eet_uac_register_guest')
const uac_register = require('./eet_uac_register')
const ims = require('./eet_ims')
const { veredict } = require('./util')
//const { waitForDut } = require('./util')

console.log('Routr Server EETs')

veredict(uac_register_guest('192.168.1.149'))
veredict(uac_register('192.168.1.149'))
veredict(ims('192.168.1.149'))
