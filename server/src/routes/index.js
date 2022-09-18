var router = require('express').Router();

router.use('/auth', require('./auth'))
router.use('/sections', require('./section'))

module.exports = router;
