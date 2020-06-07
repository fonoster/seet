import * as dotenv from 'dotenv'
import registration_setup from './registration_setup'
import maintaining_registration from './maintaining_registration'
import authentication from './authentication'

dotenv.config()

describe('Test Group 1.1: Registration Mode', function () {
  this.retries(process.env.MAX_RETRIES)

  it('SC-IT.Conf.1.1.1: Registration Setup', done => registration_setup(done))
  it.skip('SC-IT.Conf.1.1.2: Registration Failure', void 0)
  it('SC-IT.Conf.1.1.3: Maintaining Registration', done =>
    maintaining_registration(done))
  it.only('SC-IT.Conf.1.1.4: Authentication', done => authentication(done))
  it.skip('SC-IT.Conf.1.1.5: TLS Server Mode', void 0)
})
