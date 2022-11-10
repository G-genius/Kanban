const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const plateSchema = new Schema({
    

    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Plate', plateSchema)