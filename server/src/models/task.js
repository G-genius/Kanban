const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { schemaOptions } = require("./modelOptions")

const taskSchema = new Schema({
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    /*author: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: ''
    },
    client: {
        type: String,
        default: ''
    },
    quickly: {
        type: Boolean,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    mark: {
        type: String,
        default: ''
    },
    width: {
        type: Number,
        default: ''
    },
    height: {
        type: Number,
        default: ''
    },
    count: {
        type: Number,
        default: ''
    },
    plan: {
        type: Boolean,
        default: ''
    },*/
    title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)