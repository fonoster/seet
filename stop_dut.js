const { shutdown } = require('./eet/utils')

shutdown()
  .then()
  .catch(e => console.log(e))
