//import tagsRouter from './tagsRouter'
const router = require('express').Router();

router.use('/task', require('./tasksRouter'))
//apiRouter.use('/tag', tagsRouter)

module.exports = router;