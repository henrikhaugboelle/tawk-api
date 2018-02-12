import Mongoose from 'mongoose'

Mongoose.Promise = global.Promise

module.exports = {
  name: 'connection-mongoose',
  register: (server, options) => {
    const connectionUri = options.mongoose.connection.authentication.uri
    const connectionOptions = options.mongoose.connection.options

    if (options.mongoose.debug) {
      Mongoose.set('debug', options.mongoose.debug)
    }

    const connection = Mongoose.createConnection(connectionUri, connectionOptions)

    connection.on('error', (error) => {
      throw error
    })

    connection.on('open', () => {
      server.log(['info', 'database'], 'Established connection to MongoDB')
    })

    Object.keys(options.mongoose.models).forEach(name => {
      const path = options.mongoose.models[name]

      options.mongoose.models[name] = connection.model(name, require(path)())
    })

    server.expose('connection', connection)
  }
}
