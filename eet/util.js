
const veredict = test => {
  const colors = require('colors/safe')
  if (test.result && test.result.status === 1) {
    console.error(`[${test.name}] => ${colors.red('failed')}`)
  } else {
    console.log(`[${test.name}] => ${colors.green('passed')}`)
  }
}

module.exports.veredict = veredict
