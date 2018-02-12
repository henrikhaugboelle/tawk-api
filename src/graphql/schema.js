import {
  GraphQLSchema
} from 'graphql'

import queryType from './query-type'
import mutationType from './mutation-type'
import subscriptionType from './subscription-type'

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  subscription: subscriptionType
})
