const uac_register_guest = require('./eet_uac_register_guest')
const uac_register = require('./eet_uac_register')
const ims = require('./eet_ims')
const { veredict } = require('./util')

console.log('Routr Server EETs')
const dutHost = '192.168.1.149'
const transportMode = 't1'

//veredict(uac_register_guest(dutHost))
//veredict(uac_register(dutHost))
veredict(ims(dutHost, transportMode))
