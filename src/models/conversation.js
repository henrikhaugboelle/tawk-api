import Mongoose from 'mongoose'

module.exports = () => {
  const Schema = Mongoose.Schema({
    slug: String
  })

  return Schema
}
