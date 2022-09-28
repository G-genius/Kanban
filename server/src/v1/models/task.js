const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('./modelOptions')

const taskSchema = new Schema({
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    author: {
        type: String,
        default: 'undefined'
    },
    date: {
        type: String,
        default: 'undefined'
    },
    client: {
        type: String,
        default: 'undefined'
    },
    quickly: {
        type: String,
        default: 'undefined'
    },
    name: {
        type: String,
        default: 'undefined'
    },
    mark: {
        type: String,
        default: 'undefined'
    },
    width: {
        type: String,
        default: 'undefined'
    },
    height: {
        type: String,
        default: 'undefined'
    },
    count: {
        type: String,
        default: 'undefined'
    },
    plan: {
        type: String,
        default: 'undefined'
    },
    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)