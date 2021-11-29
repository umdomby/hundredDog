const Router = require('express')
const router = new Router()
const routeDog = require('./routeDog')

router.use('/records', routeDog)


module.exports = router
