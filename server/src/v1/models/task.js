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
    }, //currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" + currentDate.getFullYear() + "  " + currentTime
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
    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)