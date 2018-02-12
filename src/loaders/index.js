import DataLoader from 'dataloader'

const mapByProperty = (values, items, property, identity = (i) => i) => {
  return values.map(value => {
    return items.find(item => {
      return identity(item[property]) === identity(value)
    })
  })
}

const mapById = (values, items) => {
  return mapByProperty(values, items, '_id', (i) => i+'')
}

const deduplicateValues = (values) => {
  return Object.keys(values.reduce((acc, value) => {
    return { ...acc, [value+'']: 1 }
  }, {}))
}

const createLoaders = ({ models }) => {
  const loaders = {
    UserById: new DataLoader(async (ids) => {
      const { User } = models

      const users = await User.find({ _id: { $in: deduplicateValues(ids) } })

      return mapById(ids, users)
    }),

    UserByDeviceId: new DataLoader(async (deviceIds) => {
      const { User } = models

      const users = await User.find({ deviceId: { $in: deduplicateValues(deviceIds) } })

      return mapByProperty(deviceIds, users, 'deviceId')
    }),

    ConversationById: new DataLoader(async (ids) => {
      const { Conversation } = models

      const conversations = await Conversation.find({ _id: { $in: deduplicateValues(ids) } })

      return mapById(ids, conversations)
    }),

    ConversationBySlug: new DataLoader(async (slugs) => {
      const { Conversation } = models

      const conversations = await Conversation.find({ slug: { $in: deduplicateValues(slugs) } })

      return mapByProperty(slugs, conversations, 'slug')
    })
  }

  return loaders
}

export {
  createLoaders
}
