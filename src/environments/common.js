module.exports = {
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || '0.0.0.0',
    routes: {
      cors: true,
      validate: {
        options: {
          stripUnknown: true,
          abortEarly: false,
          convert: true
        }
      }
    },
    debug: {
      log: []
    }
  },
  mongoose: {
    debug: process.env.MONGOOSE_DEBUG,
    connection: {
      authentication: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI
      },
      options: {
        server: {
          auto_reconnect: true
        }
      }
    },
    models: {
      User: `${__dirname}/../models/user`,
      Conversation: `${__dirname}/../models/conversation`,
      Message: `${__dirname}/../models/message`
    }
  },
  hash: {
    secret: 'ba297d3abe90132dd3a70275df948623b00d2c51'
  }
}
