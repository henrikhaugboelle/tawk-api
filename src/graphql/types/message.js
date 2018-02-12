import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql'

import UserType from '../types/user'

export default new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    message: {
      type: new GraphQLNonNull(GraphQLString)
    },
    timestamp: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: async (message, args, context) => {
        return context.loaders.UserById.load(message.user)
      }
    }
  })
})
