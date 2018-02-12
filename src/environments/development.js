const common = require('./common')

const config = { ...common }

config.server.debug.log = ['error', 'warning', 'info', 'verbose']

module.exports = config
