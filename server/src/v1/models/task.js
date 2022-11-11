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
    name2: {
        type: String
    },
    name3: {
        type: String
    },
    mark: {
        type: String
    },
    mark2: {
        type: String
    },
    mark3: {
        type: String
    },
    width: {
        type: Number
    },
    width2: {
        type: Number
    },
    width3: {
        type: Number
    },
    height: {
        type: Number
    },
    height2: {
        type: Number
    },
    height3: {
        type: Number
    },
    count: {
        type: Number,
    },
    count2: {
        type: Number,
    },
    count3: {
        type: Number,
    },
    planName: {
        type: String
    },
    planName2: {
        type: String
    },
    planName3: {
        type: String
    },
    plan: {
        type: String
    },
    plan2: {
        type: String
    },
    plan3: {
        type: String
    },

    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)