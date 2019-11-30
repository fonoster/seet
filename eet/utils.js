require('dotenv').config()
const RoutrClient = require('./routr-client')
const client = new RoutrClient(process.env.ROUTR_API_URL)

module.exports.cleanLoc = async () => {
    const response = await client.getToken(process.env.ROUTR_ADMIN_USERNAME,
        process.env.ROUTR_ADMIN_SECRET)
    if (response.status !== 200) response.err
    await client.withToken(response.data.data).evictAll()
}

module.exports.shutdown = async () => {
    const response = await client.getToken(process.env.ROUTR_ADMIN_USERNAME,
        process.env.ROUTR_ADMIN_SECRET)
    if (response.status !== 200) response.err
    await client.withToken(response.data.data).shutdown()
}
