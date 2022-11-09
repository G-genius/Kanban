const Task = require('../models/task')
const Plate = require('../models/plate')
const Section = require("../models/section");

exports.create = async (req, res) => {
    const { taskId } = req.body
    try {
        const task = await Task.findById(taskId)
        const platesCount = await Plate.find({ task: taskId }).count()
        const plate = await Plate.create({
            task: taskId,
            position: platesCount > 0 ? platesCount : 0
        })
        plate._doc.task = task
        res.status(201).json(plate)
    } catch (err) {
        res.status(500).json(err)
    }
}
exports.delete = async (req, res) => {
    const { plateId } = req.params
    try {
        const currentPlate = await Plate.findById(plateId)
        await Plate.deleteOne({ _id: plateId })
        const plates = await Plate.find({ task: currentPlate.task }).sort('postition')
        for (const key in tasks) {
            await Plate.findByIdAndUpdate(
                plates[key].id,
                { $set: { position: key } }
            )
        }
        res.status(200).json('deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}