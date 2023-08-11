const router = require('express').Router()
const senate = require('../../controllers/admin/house_of_senate')
// const role = require('../../middleware/role')

router.get('/addSen', senate.addSen)
router.get('/updateSenator/:id',  senate.update)
router.post('/addSen', senate.addSenator)
router.get('/senHome', senate.senHome)
router.post('/updateSen', senate.updateSen)


module.exports = router