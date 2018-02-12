import Mongoose from 'mongoose'

module.exports = () => {
  const Schema = Mongoose.Schema({
    message: String,
    timestamp: Number,

    conversation: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },

    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  Schema.pre('save', function (next) {
    if (this.isNew) {
      this.timestamp = Date.now()
    }

    next()
  })

  return Schema
}
