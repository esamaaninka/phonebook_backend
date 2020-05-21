const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true) // to remove  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB.net')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB.net:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true
    },
    number: {
      type: String,
      minlength: 8,
      required: true,
      //unique: true
    }
})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)