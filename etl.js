const fs = require('fs')
const csv = require('fast-csv')
const moment = require('moment')
const lineReader = require('line-reader')
const Hertzy = require('hertzy')
const data = Hertzy.tune('data')
const dataFile = 'out/data.tsv'
const dataInJS = 'out/data.js'
const statsReport = 'out/stats_report.csv'  // This should be a parameter
const cpuAndMemoryFile = 'out/CpuAndMemory.json'

//fs.unlink(dataFile, () => {})
fs.unlink(dataInJS, () => {})

const fd = fs.openSync(dataFile, 'a')
const fd1 = fs.openSync(dataInJS, 'a')

data.on('data:add', data => fs.appendFile(fd, data))
data.on('data:transform', data => fs.appendFileSync(fd1, data, err => err && console.log(err)))

function etlSIPpCPSReport(file) {
    fs.createReadStream(file)
      .pipe(csv.parse({ delimiter: ';', headers: true }))
      .on('data', row => {
          let sampleTime = row['CurrentTime'].split('\t')[2].split('.')[0]
          sampleTime = moment(sampleTime * 1000).format('YYYY-MM-DD h:mm:ss')
          data.emit('data:add', 'CPS\t' + sampleTime + '\t' + row['CallRate(P)'] + '\n')
      })
    console.log('Completed CPS report')
}

function etlJVMReport(file, metricName, metricFunc) {
    lineReader.eachLine(file, (line, last) => {
        const jsonObj = JSON.parse(line)
        const elapsedTime = moment(new Date(jsonObj.epochMillis)).format('YYYY-MM-DD h:mm:ss')
        data.emit('data:add', metricName + '\t' + elapsedTime + '\t' + metricFunc(jsonObj) + '\n')
        if (last) return false
    })
    console.log('Completed ' + metricName + ' report')
}

function transformToJS(fd, metric, firstSet = false) {
    const xMatrix = []
    const yMatrix = []

    if (firstSet) {
        data.emit('data:transform', 'var xData = []; var yData = [];')
    }

    lineReader.eachLine(fd, (line, last) => {
        if (line.split('\t')[0] === metric) {
            const x = line.split('\t')[1]
            const y = line.split('\t')[2]
            xMatrix.push("'" + x + "'")
            yMatrix.push(Math.round(y, -1))
        }

        if (last) {
            data.emit('data:transform', 'xData.push([' + xMatrix + ']);')
            data.emit('data:transform', 'yData.push([' + yMatrix + ']);')
            return false; // stop reading
        }
    })
}

/*
etlJVMReport(cpuAndMemoryFile, 'CPU', jsonObj => {
    return jsonObj.systemCpuLoad > 0 ?
        (jsonObj.processCpuLoad / jsonObj.systemCpuLoad) * 100 : 0
})

etlJVMReport(cpuAndMemoryFile, 'MEM', jsonObj => {
    return jsonObj.heapMemoryCommitted > 0 ?
        (jsonObj.heapMemoryTotalUsed / jsonObj.heapMemoryCommitted) * 100 : 0
})

etlSIPpCPSReport(statsReport)
*/

transformToJS(dataFile, 'CPS', true)
transformToJS(dataFile, 'CPU')
transformToJS(dataFile, 'MEM')
