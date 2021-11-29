const Router = require('express')
const router = new Router()
const recordsController = require('../controllers/dogsController')

router.get('/all', recordsController.getAll)
router.get('/search/:title', recordsController.searchTitle)
router.get('/breed/:breed', recordsController.selectBreed)


module.exports = router
