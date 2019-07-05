const axios = require('axios')

class RoutrClient {

    constructor(apiUrl) {
        // TODO: Only for testing
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
        this.apiUrl = apiUrl
    }

    withToken(token) {
        this.token = token
        return this
    }

    async addLocation(addressOfRecord, route, callback) {
        return await axios.post(`${this.apiUrl}/location/${addressOfRecord}?token=${this.token}`, route)
    }

    async removeLocation(addressOfRecord, callback) {
        return await axios.delete(`${this.apiUrl}/location/${addressOfRecord}?token=${this.token}`)
    }
}

module.exports = RoutrClient
