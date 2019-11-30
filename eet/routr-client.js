const axios = require('axios')
const btoa = require('btoa')

/**
 * Oversimplified version of a Routr API Client
 */
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

    async getToken(username, password) {
        return await axios.create({
            baseURL: `${this.apiUrl}/token`,
            headers: {'Authorization': `Basic ${btoa(username + ':' + password)}`}
        }).get()
    }

    async addLocation(addressOfRecord, route, callback) {
        return await axios.post(`${this.apiUrl}/location/${addressOfRecord}?token=${this.token}`, route)
    }

    async removeLocation(addressOfRecord, callback) {
        return await axios.delete(`${this.apiUrl}/location/${addressOfRecord}?token=${this.token}`)
    }

    async evictAll() {
        return await axios.delete(`${this.apiUrl}/location?token=${this.token}`)
    }
}

module.exports = RoutrClient
