import Glue from 'glue'
import { PubSub } from 'graphql-subscriptions'

import { createManifest } from './server/manifest'
import { createOptions } from './server/options'

import { setupGraphQL } from './server/graphql'

import schema from './graphql/schema'

const subscriptions = new PubSub()

export const createServer = async ({ environment }) => {
  const config = require(`./environments/${environment}`)

  const manifest = createManifest({ config, subscriptions })
  const options = createOptions({ config })

  const server = await Glue.compose(manifest, options)

  await setupGraphQL({ server, config, schema, subscriptions })

  return server
}
