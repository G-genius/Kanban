const Task = require('../models/task')
const Plate = require('../models/plate')

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
exports.getAll = async (req, res) => {
    try {
        const plates = await Plate.find({ user: req.user._id }).sort('-position')
        res.status(200).json(plates)
    } catch (err) {
        res.status(500).json(err)
    }
}
exports.update = async (req, res) => {
    const { plateId } = req.params
    try {
        const task = await Plate.findByIdAndUpdate(
            plateId,
            { $set: req.body }
        )
        res.status(200).json(task)
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
        for (const key in plates) {
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