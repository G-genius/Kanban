const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const taskSchema = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  title: {
    type: String,
    default: 'undefined'
  },
  content: {
    type: String,
    default: 'undefined'
  },
  position: {
    type: Number
  }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)