var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/boards', require('./board'))
router.use('/sections', require('./section'))
router.use('/tasks', require('./task'))
router.use('/plates', require('./plate'))
router.use('/boards/:boardId/sections', require('./section'))
router.use('/boards/:boardId/tasks', require('./task'))
router.use('/boards/:boardId/plates', require('./plate'))

module.exports = router;
