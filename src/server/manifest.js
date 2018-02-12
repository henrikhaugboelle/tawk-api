export const createManifest = ({ config, subscriptions }) => {
  return {
    server: config.server,
    register: {
      plugins: [
        {
          plugin: './plugins/connection-mongoose',
          options: config
        },
        {
          plugin: './plugins/api-ping',
          options: config,
          routes: {
            prefix: '/api'
          }
        }
      ]
    }
  }
}
