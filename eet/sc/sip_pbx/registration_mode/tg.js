require('dotenv').config()
const { cleanLoc } = require('../../../utils')
const registration_setup = require('./registration_setup')
const maintaining_registration = require('./maintaining_registration')

function noop(done) { done() }

describe('Test Group 1.1: Registration Mode', function() {
    after(async () => await cleanLoc())

    it('SC-IT.Conf.1.1.1: Registration Setup', done => registration_setup(done))
    it('SC-IT.Conf.1.1.2: Registration Failure (Noop)', done => noop(done))
    it('SC-IT.Conf.1.1.3: Maintaining Registration', done => maintaining_registration(done, this))
    //it('SC-IT.Conf.1.1.4: Authentication (Noop)', done => noop(done))
    //it('SC-IT.Conf.1.1.5: TLS Server Mode (Noop)', done => noop(done))

})
