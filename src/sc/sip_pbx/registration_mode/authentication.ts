import SIPpW from '../../../sippw'

export default function (done: any) {
  const result = new SIPpW(void 0, 5061)
    .withScenario('scenarios/sc/sip_pbx/registration_mode/authentication.xml')
    .withInf('scenarios/common/gateways.csv')
    .setInfIndex('gateways.csv', 0)
    .start()

  done(result ? result : void 0)
}
