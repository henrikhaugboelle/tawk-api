import { withFilter } from 'graphql-subscriptions'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import MessageType from './types/message'

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    messageAdded: {
      type: MessageType,
      args: {
        slug: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      subscribe: withFilter(
        (root, args, context) => {
          return context.subscriptions.asyncIterator('messageAdded')
        },
        (payload, variables) => {
          return payload && payload.messageAdded.params.slug === variables.slug
        }
      )
    }
  })
})
