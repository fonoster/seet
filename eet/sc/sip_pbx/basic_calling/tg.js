require('dotenv').config()
const { cleanLoc } = require('../../../utils')
const did_call_parameters = require('./did_call_parameters')
const dod_call_parameters = require('./dod_call_parameters')
const did_call_privacy = require('./did_call_privacy')
const dod_call_privacy_a = require('./dod_call_privacy_a')
const dod_call_privacy_b = require('./dod_call_privacy_b')

describe('Test Group 1.3: Basic Call Origination(DOD) and Termination(DID)', function() {

    this.retries(process.env.MAX_RETRIES)

    after(async () => await cleanLoc())

    it('SC-IT.Conf.1.3.1: Verification of INVITE Message Parameters when Originating a DOD Call', done => dod_call_parameters(done))
    it('SC-IT.Conf.1.3.2: INVITE Message Processing when Terminating a DID Call', done => did_call_parameters(done))
    it('SC-IT.Conf.1.3.3: SIPPBX Support for Private when Processing INVITE for Terminating DID Call', done => did_call_privacy(done))
    it('SC-IT.Conf.1.3.4.a: SIPPBX Support for Private when Generating INVITE for Originating DOD Call (Part A)', done => dod_call_privacy_a(done))
    it('SC-IT.Conf.1.3.4.b: SIPPBX Support for Private when Generating INVITE for Originating DOD Call (Part B)', done => dod_call_privacy_b(done))

})
