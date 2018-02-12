import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import ConversationType from './types/conversation'
import UserType from './types/user'

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    conversation: {
      type: new GraphQLNonNull(ConversationType),
      args: {
        slug: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (root, args, context) => {
        const { Conversation } = context.models
        const { ConversationBySlug } = context.loaders

        const { slug } = args

        let conversation = await ConversationBySlug.load(slug)

        if (!conversation) {
          conversation = await Conversation.create({ slug })
        }

        return conversation
      }
    },

    user: {
      type: new GraphQLNonNull(UserType),
      args: {
        deviceId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (root, args, context) => {
        const { User } = context.models
        const { UserByDeviceId } = context.loaders

        const { deviceId } = args

        let user = await UserByDeviceId.load(deviceId)

        if (!user) {
          user = await User.create({ deviceId })
        }

        return user
      }
    }
  })
})
