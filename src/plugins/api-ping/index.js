module.exports = {
  name: 'api-ping',
  register: (server, options) => {
    const handler = require('./handler')(server, options)

    server.route({
      method: '*',
      path: '/ping',
      config: handler.ping
    })
  }
}
