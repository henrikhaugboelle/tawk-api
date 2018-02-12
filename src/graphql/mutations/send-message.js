import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLError
} from 'graphql'

import MessageType from '../types/message'

export default {
  name: 'SendMessage',
  type: MessageType,
  args: {
    conversationId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    message: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, args, context) => {
    const { userId, conversationId, message } = args
    const { UserById, ConversationById } = context.loaders
    const { Message } = context.models

    const [user, conversation] = await Promise.all([
      UserById.load(userId),
      ConversationById.load(conversationId)
    ])

    const errors = []

    if (!user) {
      errors.push({ key: 'general', message: 'User not found' })
    }

    if (!conversation) {
      errors.push({ key: 'general', message: 'Conversation not found' })
    }

    if (!message.trim()) {
      errors.push({ key: 'message', message: 'Message must not be empty' })
    }

    if (errors.length) {
      throw new GraphQLError(JSON.stringify(errors))
    }

    const newMessage = await Message.create({
      user: user._id,
      conversation: conversation._id,
      message: message
    })

    context.subscriptions.publish('messageAdded', {
      messageAdded: {
        ...newMessage.toJSON(),
        params: {
          slug: conversation.slug
        }
      }
    })

    return newMessage
  }
}
