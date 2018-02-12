import { config } from 'dotenv'
import { createServer } from './server'

config()

const serverOptions = {
  environment: process.env.NODE_ENV
}

const start = async () => {
  const server = await createServer(serverOptions)
  await server.start()

  server.log(['info', 'server'], `Server running at: ${server.info.uri}`)
}

start()
