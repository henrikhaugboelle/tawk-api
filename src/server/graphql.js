import { graphqlHapi } from 'graphql-server-hapi'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { createLoaders } from '../loaders'

export const setupGraphQL = async ({ server, config, schema, subscriptions }) => {
  const createContext = (context = {}) => {
    context = {
      ...context,
      server: server,
      config: config,
      models: config.mongoose.models,
      loaders: createLoaders({ models: config.mongoose.models }),
      subscriptions: subscriptions
    }

    return context
  }

  const formatError = (error) => {
    server.log(['error', ...error.path], error)

    return {
      message: error.message
    }
  }

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions(request) {
        return {
          schema,
          formatError,
          context: createContext()
        }
      }
    }
  })

  SubscriptionServer.create({
    schema: schema,
    execute: execute,
    subscribe(schema, document, rootValue, contextValue, variableValues, operationName) {
      return subscribe(schema, document, rootValue, createContext(contextValue), variableValues, operationName)
    },
    onOperation(message, params) {
      return {
        ...params,
        formatError
      }
    }
  }, {
    server: server.listener,
    path: '/subscriptions'
  })
}
