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
        type: String
    },
    date: {
        type: String
    },
    client: {
        type: String
    },
    quickly: {
        type: Boolean,
        default: false
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
        type: Number,
    },
    planName: {
        type: String
    },
    plan: {
        type: String
    },
    nameTwo: {
        type: String,
        defaultValue: "undefined"
    },
    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)