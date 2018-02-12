import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql'

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    identity: {
      type: new GraphQLObjectType({
        name: 'UserIdentity',
        fields: () => ({
          color: {
            type: GraphQLString
          },
          animal: {
            type: GraphQLString
          }
        })
      })
    }
  })
})
