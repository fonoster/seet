require('dotenv').config()

module.exports.cleanLoc = async () => {
    const RoutrClient = require('./routr-client')
    const client = new RoutrClient(process.env.ROUTR_API_URL)
    await client.withToken(process.env.ROUTR_API_TOKEN).evictAll()
}

module.exports.noop = (done) => { done() }
