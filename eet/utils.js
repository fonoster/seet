require('dotenv').config()
const RoutrClient = require('./routr-client')

const client = new RoutrClient(process.env.ROUTR_API_URL)
const filename = 'etc/scenarios/register_guest.csv'
const users = require('fs').readFileSync(filename, 'utf-8').split('\n').filter(Boolean);

module.exports.populateLoc = async function(maxIterations = process.env.MAX_ITERATIONS, port = 5090) {
    for (i = 1; i <= maxIterations; i++) {
        const user = users[i]
        const uasRoute = { user: user, address: process.env.DUT_HOST, port: port, expires: 3600 }
        await client.withToken(process.env.ROUTR_API_TOKEN).addLocation(`sip:${user}@guest`, uasRoute)
    }
}

module.exports.cleanLoc = async function(maxIterations = process.env.MAX_ITERATIONS) {
    for (i = 1; i <= maxIterations; i++) {
        await client.withToken(process.env.ROUTR_API_TOKEN).removeLocation(`sip:${users[i]}@guest`)
    }
}
