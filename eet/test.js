const colors = require('colors/safe')
const uac_register_guest = require('./eet_uac_register_guest')
const uac_register = require('./eet_uac_register')
const ims = require('./eet_ims')

const veredict = test => {
  if (test.result && test.result.status === 1) {
    console.error(`[${test.name}] => ${colors.red('failed')}`)
  } else {
    console.log(`[${test.name}] => ${colors.green('passed')}`)
  }
}

console.log('Routr EETs')
console.log('Watting for DUT')

veredict(uac_register_guest('192.168.1.149'))
veredict(uac_register('192.168.1.149'))
veredict(ims('192.168.1.149'))
