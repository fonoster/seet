const fs = require('fs')
const csv = require('fast-csv')
const moment = require('moment')
const lineReader = require('line-reader')
const Hertzy = require('hertzy')
const data = Hertzy.tune('data')
const dataFile = 'etc/data.tsv'
const dataInJS = 'etc/data.js'
const scenarioFile = 'etc/uac_register_1_.csv'
const cpuAndMemoryFile = 'etc/CpuAndMemory.json'

fs.unlink(dataFile, () => {})
fs.unlink(dataInJS, () => {})

const fd = fs.openSync(dataFile, 'a')
const fd1 = fs.openSync(dataInJS, 'a')

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
        if (jsonObj.systemCpuLoad > 0) {
          data.emit('data:add', metricName + '\t' + elapsedTime + '\t' + metricFunc(jsonObj) + '\n')
        }
        if (last) return false
    })
    console.log('Completed ' + metricName + ' report')
}

function transformToJS(fd, metric) {
    const xMatrix = []
    const yMatrix = []

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

data.on('data:add', data => {
    fs.appendFileSync(fd, data)
})

data.on('data:transform', data => {
    fs.appendFileSync(fd1, data, (err) => {
      if (err) console.log(err)
    })
})

etlJVMReport(cpuAndMemoryFile, 'CPU', jsonObj => {
    return (jsonObj.processCpuLoad / jsonObj.systemCpuLoad) * 100
})

etlJVMReport(cpuAndMemoryFile, 'MEM', jsonObj => {
    return (jsonObj.heapMemoryTotalUsed / jsonObj.heapMemoryCommitted) * 100
})

/*
data.emit('data:transform', 'var xData = []; var yData = [];')
transformToJS(fd, 'CPS')
transformToJS(fd, 'CPU')
transformToJS(fd, 'MEM')
*/
