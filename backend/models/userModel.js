// here is where we put our schema and all the fields that we want the user to have

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add n email'],
    unique: true
  },
  
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
},
{
  timestamps: true // will automatically give us a created at or updated at field
})

module.exports = mongoose.model('User', userSchema)