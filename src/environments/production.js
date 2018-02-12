const common = require('./common')

const config = { ...common }

config.server.debug.log = ['error', 'warning']

module.exports = config
