const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const sectionSchema = new Schema({

  title: {
    type: String,
    default: ''
  }
}, schemaOptions)

module.exports = mongoose.model('Section', sectionSchema)