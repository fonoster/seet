import SIPpW from '../../../sippw'

export default function (done: any) {
  const result = new SIPpW(void 0, 5061, 120000)
    .withScenario(
      'scenarios/sc/sip_pbx/registration_mode/registration_setup.xml'
    )
    .start()

  //done(result.stderr ? result : void 0)
}
