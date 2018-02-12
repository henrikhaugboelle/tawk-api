import Mongoose from 'mongoose'

module.exports = () => {
  const Schema = Mongoose.Schema({
    deviceId: String,

    identity: {
      color: String,
      animal: String
    }
  })

  Schema.virtual('displayName').get(function () {
    return `${this.identity.color} ${this.identity.animal}`
  })

  Schema.pre('save', function (next) {
    const colors = ['red', 'orange', 'purple', 'blue', 'green', 'brown', 'pink']
    const animals = ['dog', 'cat', 'tiger', 'lion', 'giraffe', 'cow', 'hourse', 'fox', 'panda', 'bear', 'mouse', 'rhinoceros', 'hippopotamus', 'rabbit', 'elephant', 'crocodile', 'chicken', 'sheep', 'monkey']

    if (this.isNew) {
      this.identity.color = colors[Math.floor(Math.random() * colors.length)]
      this.identity.animal = animals[Math.floor(Math.random() * animals.length)]
    }

    next()
  })

  return Schema
}
