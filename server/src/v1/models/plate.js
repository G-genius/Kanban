const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const plateSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    name: {
        type: String
    },
    mark: {
        type: String
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    count: {
        type: Number
    },
    planName: {
        type: String
    },
    plan: {
        type: String
    },
    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Plate', plateSchema)