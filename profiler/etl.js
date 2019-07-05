const fs = require('fs')
const lineReader = require('line-reader')
const sippEtl = require('./sipp_etl')
const jpEtl = require('./jvm_profiler_etl')

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

const reportTsv = 'out/stats_report.tsv'
const reportCsv = 'out/stats_report.csv'
const reportJs = 'out/stats_report.js'
const cpuAndMemory = 'out/CpuAndMemory.json'

sippEtl(reportCsv, reportTsv)
jpEtl(cpuAndMemory, reportTsv)
transformToJS(reportTsv, reportJs, 'CPS', true)
transformToJS(reportTsv, reportJs, 'CPU')
transformToJS(reportTsv, reportJs, 'MEM')