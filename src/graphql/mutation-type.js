import {
  GraphQLObjectType
} from 'graphql'

import sendMessage from './mutations/send-message'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    sendMessage
  })
})
