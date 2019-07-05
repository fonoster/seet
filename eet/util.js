const colors = require('colors/safe')

module.exports.veredict = test => {
    if (test.result && test.result.stderr) {
        console.error(`[${test.name}] => ${colors.red('failed')}`)
        console.error(`${colors.yellow(test.result.stderr.toString('utf8'))}`)
    } else {
        console.log(`[${test.name}] => ${colors.green('passed')}`)
    }
}
