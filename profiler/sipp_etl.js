const fs = require('fs')
const moment = require('moment')

function extract(filename) {
    const result = require('fs').readFileSync(filename, 'utf-8')
        .split('\n')
        .filter(Boolean);
    return result
}

function transform(data) {
    const result = []
    for (i = 1; i < data.length; i++) {
        const row = data[i]
        let sampleTime = row.split(';')[1].split('\t')[2].split('.')[0]
        sampleTime = moment(sampleTime * 1000).format('YYYY-MM-DD h:mm:ss')
        const value = row.split(';')[6] / 1000 // We have to "descale" de number to fill the graphics
        result.push('CPS\t' + sampleTime + '\t' + value)
    }
    return result
}

function load(filename, data) {
    data.forEach(row => {
        fs.appendFileSync(filename, row + '\n', err => err && console.log(err))
    })
}

module.exports = function(filenameIn, filenameOut) {
    load(filenameOut, transform(extract(filenameIn)))
}
