import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql'

import MessageType from '../types/message'

export default new GraphQLObjectType({
  name: 'Conversation',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve: async (conversation, args, context) => {
        const { Message } = context.models

        return Message
          .find({ conversation: conversation._id, timestamp: { $gte: Date.now() - 1000 * 60 * 30 } })
          .limit(50)
          .sort({ timestamp: 1 })
      }
    }
  })
})
