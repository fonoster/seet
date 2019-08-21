require('dotenv').config()
const { cleanLoc } = require('../../../utils')
const registration_setup = require('./registration_setup')
const maintaining_registration = require('./maintaining_registration')
const authentication = require('./authentication')

describe('Test Group 1.1: Registration Mode', function() {
    this.retries(4)

    after(async () => await cleanLoc())

    it('SC-IT.Conf.1.1.1: Registration Setup', done => registration_setup(done))
    it.skip('SC-IT.Conf.1.1.2: Registration Failure', void(0))
    it('SC-IT.Conf.1.1.3: Maintaining Registration', done => maintaining_registration(done))
    it('SC-IT.Conf.1.1.4: Authentication', done => authentication(done))
    it.skip('SC-IT.Conf.1.1.5: TLS Server Mode', void(0))

})
