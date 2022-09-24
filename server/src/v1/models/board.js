const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const boardSchema = new Schema({

  title: {
    type: String,
    default: 'Untitled'
  }
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema)