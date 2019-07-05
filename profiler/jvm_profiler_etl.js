const fs = require('fs')
const moment = require('moment')

const cpuMetric = jsonObj => jsonObj.systemCpuLoad > 0 ?
    (jsonObj.processCpuLoad / jsonObj.systemCpuLoad) * 100 : 0

const memMetric = jsonObj => jsonObj.heapMemoryCommitted > 0 ?
    (jsonObj.heapMemoryTotalUsed / jsonObj.heapMemoryCommitted) * 100 : 0

function extract(filename) {
    const result = require('fs').readFileSync(filename, 'utf-8')
        .split('\n')
        .filter(Boolean);
    return result
}

function transform(data) {
    const result = []
    for (i = 0; i < data.length; i++) {
        const jsonObj = JSON.parse(data[i])
        const elapsedTime = moment(new Date(jsonObj.epochMillis)).format('YYYY-MM-DD h:mm:ss')
        result.push('CPU' + '\t' + elapsedTime + '\t' + cpuMetric(jsonObj))
        result.push('MEM' + '\t' + elapsedTime + '\t' + memMetric(jsonObj))
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