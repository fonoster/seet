const fs = require('fs')
const lineReader = require('line-reader')
const sippEtl = require('./sipp_etl')
const jpEtl = require('./jvm_profiler_etl')
const reports = require('./reports_config.json')

this.sippEtl = sippEtl
this.jpEtl = jpEtl

function transformToJS(filenameIn, filenameOut, metric, firstSet = false) {
    const xMatrix = []
    const yMatrix = []

    if (firstSet) {
        fs.appendFileSync(filenameOut, 'var xData = []; var yData = [];',
            err => err && console.log(err))
    }

    lineReader.eachLine(filenameIn, (line, last) => {
        if (line.split('\t')[0] === metric) {
            const x = line.split('\t')[1]
            const y = line.split('\t')[2]
            xMatrix.push("'" + x + "'")
            yMatrix.push(Math.round(y, -1))
        }

        if (last) {
            fs.appendFileSync(filenameOut, 'xData.push([' + xMatrix + ']);', err => err && console.log(err))
            fs.appendFileSync(filenameOut, 'yData.push([' + yMatrix + ']);', err => err && console.log(err))
            return false; // stop reading
        }
    })
}

reports.forEach(report => {
    report.group.forEach( entry => {
        console.log('working on ' + entry.source + ' and sending it to ' + `${report.output}.tsv`)
        const etl = this[entry.etlName]
        etl(entry.source, `out/${report.output}.tsv`)
    })

    transformToJS(`out/${report.output}.tsv`, `out/${report.output}.js`, 'CPS', true)
    transformToJS(`out/${report.output}.tsv`, `out/${report.output}.js`, 'CPU')
    transformToJS(`out/${report.output}.tsv`, `out/${report.output}.js`, 'MEM')
})
