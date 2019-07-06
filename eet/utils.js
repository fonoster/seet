require('dotenv').config()
const RoutrClient = require('./routr-client')

const client = new RoutrClient(process.env.ROUTR_API_URL)
const filename = 'etc/scenarios/register_guest.csv'
const users = require('fs').readFileSync(filename, 'utf-8').split('\n').filter(Boolean);

module.exports.populateLoc = async function() {
    for (i = 1; i < process.env.MAX_ITERATIONS; i++) {
        const user = users[i]
        const uasRoute = { user: user, address: process.env.DUT_HOST, port: 5090, expires: 3600 }
        await client.withToken(process.env.ROUTR_API_TOKEN).addLocation(`sip:${user}@guest`, uasRoute)
    }
    console.log('Finished populating location table')
}

module.exports.cleanLoc = async function() {
    for (i = 1; i < process.env.MAX_ITERATIONS; i++) {
        await client.withToken(process.env.ROUTR_API_TOKEN).removeLocation(`sip:${users[i]}@guest`)
    }
}
