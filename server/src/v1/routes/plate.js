const router = require('express').Router({ mergeParams: true })
const {param, body} = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const plateController = require("../controllers/plate");
const taskController = require("../controllers/task");

router.post(
    '/',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),
    body('taskId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('invalid task id')
        } else return Promise.resolve()
    }),
    validation.validate,
    tokenHandler.verifyToken,
    plateController.create
)
router.get(
    '/',
    tokenHandler.verifyToken,
    plateController.getAll
)
router.put(
    '/:plateId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),
    param('plateId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('invalid plate id')
        } else return Promise.resolve()
    }),
    validation.validate,
    tokenHandler.verifyToken,
    plateController.update
)
router.delete(
    '/:plateId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),
    param('plateId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('invalid plate id')
        } else return Promise.resolve()
    }),
    validation.validate,
    tokenHandler.verifyToken,
    plateController.delete
)

module.exports = router