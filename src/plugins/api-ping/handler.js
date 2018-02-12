module.exports = () => {
  return {
    ping: {
      handler: async (request) => {
        const { params, query, payload, headers } = request

        return {
          params,
          query,
          payload,
          headers
        }
      }
    }
  }
}

